"""Publisher profiles, verification, trust, and signatures."""

from __future__ import annotations

import json
from dataclasses import asdict, dataclass, field
from pathlib import Path
from typing import Any

from registry.metadata import utc_now_iso


@dataclass
class PublisherSignature:
    """Opaque publisher signing metadata."""

    algorithm: str = "sha256-opaque"
    value: str = ""
    created: str = ""

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass
class PublisherVerification:
    """Publisher verification status."""

    verified: bool = False
    method: str = "manual"
    verified_at: str = ""
    notes: str = ""

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass
class PublisherTrust:
    """Trust score / flags for a publisher."""

    level: str = "community"  # community | trusted | official
    score: int = 0
    trusted: bool = False

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass
class PublisherProfile:
    """Public publisher profile."""

    id: str
    name: str
    email: str = ""
    homepage: str = ""
    verification: PublisherVerification = field(default_factory=PublisherVerification)
    trust: PublisherTrust = field(default_factory=PublisherTrust)
    signature: PublisherSignature = field(default_factory=PublisherSignature)
    packages: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "homepage": self.homepage,
            "verification": self.verification.to_dict(),
            "trust": self.trust.to_dict(),
            "signature": self.signature.to_dict(),
            "packages": list(self.packages),
        }


class PublisherStore:
    """Filesystem store for publisher profiles."""

    def __init__(self, root: Path | str) -> None:
        self.root = Path(root)
        self.root.mkdir(parents=True, exist_ok=True)

    def _path(self, publisher_id: str) -> Path:
        safe = publisher_id.replace("/", "__").lower()
        return self.root / f"{safe}.json"

    def get(self, publisher_id: str) -> PublisherProfile | None:
        path = self._path(publisher_id)
        if not path.is_file():
            return None
        data = json.loads(path.read_text(encoding="utf-8"))
        verification = data.get("verification") or {}
        trust = data.get("trust") or {}
        signature = data.get("signature") or {}
        return PublisherProfile(
            id=str(data.get("id") or publisher_id),
            name=str(data.get("name") or publisher_id),
            email=str(data.get("email") or ""),
            homepage=str(data.get("homepage") or ""),
            verification=PublisherVerification(
                verified=bool(verification.get("verified")),
                method=str(verification.get("method") or "manual"),
                verified_at=str(verification.get("verified_at") or ""),
                notes=str(verification.get("notes") or ""),
            ),
            trust=PublisherTrust(
                level=str(trust.get("level") or "community"),
                score=int(trust.get("score") or 0),
                trusted=bool(trust.get("trusted")),
            ),
            signature=PublisherSignature(
                algorithm=str(signature.get("algorithm") or "sha256-opaque"),
                value=str(signature.get("value") or ""),
                created=str(signature.get("created") or ""),
            ),
            packages=[str(p) for p in (data.get("packages") or [])],
        )

    def save(self, profile: PublisherProfile) -> Path:
        path = self._path(profile.id)
        path.write_text(json.dumps(profile.to_dict(), indent=2, sort_keys=True) + "\n", encoding="utf-8")
        return path

    def list(self) -> list[dict[str, Any]]:
        rows: list[dict[str, Any]] = []
        for path in sorted(self.root.glob("*.json")):
            data = json.loads(path.read_text(encoding="utf-8"))
            if isinstance(data, dict):
                rows.append(data)
        return rows

    def ensure(self, publisher_id: str, *, name: str | None = None) -> PublisherProfile:
        existing = self.get(publisher_id)
        if existing:
            return existing
        profile = PublisherProfile(id=publisher_id, name=name or publisher_id)
        if publisher_id.lower() in {"yoghalabs", "adf"}:
            profile.verification = PublisherVerification(
                verified=True, method="builtin", verified_at=utc_now_iso()
            )
            profile.trust = PublisherTrust(level="official", score=100, trusted=True)
        self.save(profile)
        return profile


class RegistryPublisher:
    """Publish packages into the local registry and update publisher profiles."""

    def __init__(self, store: PublisherStore, local_registry_root: Path | str) -> None:
        self.store = store
        self.local_root = Path(local_registry_root)
        self.local_root.mkdir(parents=True, exist_ok=True)

    def publish(
        self,
        source: Path | str,
        *,
        publisher_id: str,
        overwrite: bool = False,
    ) -> dict[str, Any]:
        """Copy a package directory into the local registry."""
        import shutil

        from packages.manifest import parse_package_manifest

        src = Path(source)
        manifest = parse_package_manifest(src)
        dest = self.local_root / manifest.id
        if dest.exists() and not overwrite:
            from packages.manifest import AdfPackageError

            raise AdfPackageError(f"package already published: {manifest.id}")
        if dest.exists():
            shutil.rmtree(dest)
        shutil.copytree(src, dest)
        profile = self.store.ensure(publisher_id, name=publisher_id)
        if manifest.id not in profile.packages:
            profile.packages.append(manifest.id)
        self.store.save(profile)
        return {
            "ok": True,
            "package_id": manifest.id,
            "version": manifest.version,
            "destination": str(dest),
            "publisher": profile.to_dict(),
        }
