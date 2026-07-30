"""Enterprise distribution profiles and bundles."""

from __future__ import annotations

import json
from dataclasses import asdict, dataclass, field
from pathlib import Path
from typing import Any

from distribution.bundle_builder import BundleBuilder
from distribution.manifest import ArtifactRef
from registry.metadata import utc_now_iso


@dataclass
class EnterpriseConfiguration:
    """Enterprise configuration defaults."""

    org: str = "enterprise"
    channel: str = "stable"
    offline_default: bool = True
    require_signature: bool = True
    allow_marketplace: bool = False
    update_policy: str = "manual"

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass
class EnterpriseDeploymentProfile:
    """Named deployment profile for enterprise installs."""

    id: str
    label: str
    configuration: EnterpriseConfiguration = field(default_factory=EnterpriseConfiguration)
    targets: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "label": self.label,
            "configuration": self.configuration.to_dict(),
            "targets": list(self.targets),
            "updated": utc_now_iso(),
        }


@dataclass
class EnterpriseManifest:
    """Enterprise release manifest wrapper."""

    name: str
    version: str
    profile: EnterpriseDeploymentProfile
    notes: str = ""

    def to_dict(self) -> dict[str, Any]:
        return {
            "name": self.name,
            "version": self.version,
            "notes": self.notes,
            "profile": self.profile.to_dict(),
            "created": utc_now_iso(),
        }


class EnterpriseDistributor:
    """Build enterprise bundles and persist deployment profiles."""

    def __init__(self, repo_root: Path | str) -> None:
        self.repo_root = Path(repo_root).resolve()
        self.root = self.repo_root / ".adf" / "distribution" / "enterprise"
        self.root.mkdir(parents=True, exist_ok=True)
        self.profiles_dir = self.root / "profiles"
        self.profiles_dir.mkdir(parents=True, exist_ok=True)
        self.bundles = BundleBuilder(self.root / "bundles")

    def save_profile(self, profile: EnterpriseDeploymentProfile) -> Path:
        path = self.profiles_dir / f"{profile.id}.json"
        path.write_text(json.dumps(profile.to_dict(), indent=2, sort_keys=True) + "\n", encoding="utf-8")
        return path

    def load_profile(self, profile_id: str) -> EnterpriseDeploymentProfile:
        path = self.profiles_dir / f"{profile_id}.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        cfg = data.get("configuration") or {}
        return EnterpriseDeploymentProfile(
            id=str(data.get("id") or profile_id),
            label=str(data.get("label") or profile_id),
            configuration=EnterpriseConfiguration(
                org=str(cfg.get("org") or "enterprise"),
                channel=str(cfg.get("channel") or "stable"),
                offline_default=bool(cfg.get("offline_default", True)),
                require_signature=bool(cfg.get("require_signature", True)),
                allow_marketplace=bool(cfg.get("allow_marketplace", False)),
                update_policy=str(cfg.get("update_policy") or "manual"),
            ),
            targets=[str(t) for t in (data.get("targets") or [])],
        )

    def ensure_default_profile(self) -> EnterpriseDeploymentProfile:
        path = self.profiles_dir / "default.json"
        if path.is_file():
            return self.load_profile("default")
        profile = EnterpriseDeploymentProfile(id="default", label="Default Enterprise")
        self.save_profile(profile)
        return profile

    def build_bundle(
        self,
        source: Path | str,
        *,
        name: str,
        version: str,
        profile_id: str = "default",
    ) -> ArtifactRef:
        profile = (
            self.load_profile(profile_id)
            if (self.profiles_dir / f"{profile_id}.json").is_file()
            else self.ensure_default_profile()
        )
        return self.bundles.build_enterprise(
            source,
            name=name,
            version=version,
            profile=profile.to_dict(),
        )

    def write_manifest(self, manifest: EnterpriseManifest) -> Path:
        path = self.root / f"{manifest.name}-{manifest.version}-enterprise-manifest.json"
        path.write_text(json.dumps(manifest.to_dict(), indent=2, sort_keys=True) + "\n", encoding="utf-8")
        return path
