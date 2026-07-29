"""Distribution release / artifact manifests."""

from __future__ import annotations

import json
from dataclasses import asdict, dataclass, field
from pathlib import Path
from typing import Any

from distribution.release_channel import ReleaseChannel, parse_channel
from runtime.exceptions import AdfError


class AdfDistributionError(AdfError):
    """Distribution platform failures."""


@dataclass
class ArtifactRef:
    """Reference to a built distribution artifact."""

    name: str
    kind: str
    path: str
    checksum: str = ""
    size: int = 0

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass
class ReleaseManifest:
    """Release identity and artifact catalog."""

    name: str
    version: str
    channel: str
    build: str = ""
    created: str = ""
    notes: str = ""
    artifacts: list[ArtifactRef] = field(default_factory=list)
    checksum: str = ""
    signature: str = ""
    enterprise: bool = False
    offline: bool = False

    def to_dict(self) -> dict[str, Any]:
        return {
            "name": self.name,
            "version": self.version,
            "channel": self.channel,
            "build": self.build,
            "created": self.created,
            "notes": self.notes,
            "artifacts": [a.to_dict() for a in self.artifacts],
            "checksum": self.checksum,
            "signature": self.signature,
            "enterprise": self.enterprise,
            "offline": self.offline,
        }

    @property
    def channel_enum(self) -> ReleaseChannel:
        return parse_channel(self.channel)


def load_manifest(path: Path | str) -> ReleaseManifest:
    """Load a release manifest JSON file."""
    file_path = Path(path)
    if not file_path.is_file():
        raise AdfDistributionError(f"release manifest not found: {file_path}")
    data = json.loads(file_path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise AdfDistributionError("release manifest must be a JSON object")
    artifacts = [
        ArtifactRef(
            name=str(item.get("name") or ""),
            kind=str(item.get("kind") or ""),
            path=str(item.get("path") or ""),
            checksum=str(item.get("checksum") or ""),
            size=int(item.get("size") or 0),
        )
        for item in (data.get("artifacts") or [])
        if isinstance(item, dict)
    ]
    return ReleaseManifest(
        name=str(data.get("name") or "adf"),
        version=str(data.get("version") or ""),
        channel=str(data.get("channel") or "alpha"),
        build=str(data.get("build") or ""),
        created=str(data.get("created") or ""),
        notes=str(data.get("notes") or ""),
        artifacts=artifacts,
        checksum=str(data.get("checksum") or ""),
        signature=str(data.get("signature") or ""),
        enterprise=bool(data.get("enterprise")),
        offline=bool(data.get("offline")),
    )


def save_manifest(manifest: ReleaseManifest, path: Path | str) -> Path:
    """Persist a release manifest."""
    file_path = Path(path)
    file_path.parent.mkdir(parents=True, exist_ok=True)
    file_path.write_text(
        json.dumps(manifest.to_dict(), indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
    )
    return file_path
