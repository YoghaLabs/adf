"""Package security — checksum, signature, trust, capabilities."""

from __future__ import annotations

import hashlib
from pathlib import Path
from typing import Any

from packages.manifest import PackageManifest, parse_package_manifest
from packages.package import Package


class PackageSecurity:
    """Security checks for registry packages (local-capable verification)."""

    def __init__(self, trusted_publishers: set[str] | None = None) -> None:
        self.trusted_publishers = {p.lower() for p in (trusted_publishers or {"yoghalabs"})}

    @staticmethod
    def file_checksum(path: Path, *, algorithm: str = "sha256") -> str:
        """Compute hex digest for a file."""
        digest = hashlib.new(algorithm)
        with path.open("rb") as handle:
            for chunk in iter(lambda: handle.read(65536), b""):
                digest.update(chunk)
        return digest.hexdigest()

    @staticmethod
    def package_tree_checksum(root: Path) -> str:
        """Deterministic checksum over package.yaml + sorted relative file digests."""
        paths = sorted(p for p in root.rglob("*") if p.is_file())
        hasher = hashlib.sha256()
        for path in paths:
            rel = path.relative_to(root).as_posix()
            hasher.update(rel.encode("utf-8"))
            hasher.update(b"\0")
            hasher.update(PackageSecurity.file_checksum(path).encode("utf-8"))
            hasher.update(b"\0")
        return hasher.hexdigest()

    def verify_checksum(self, package: Package | Path, expected: str | None = None) -> dict[str, Any]:
        """Validate checksum field when present."""
        pkg_path = package.root if isinstance(package, Package) else Path(package)
        manifest = package.manifest if isinstance(package, Package) else parse_package_manifest(pkg_path)
        expected_value = (expected or manifest.checksum or "").strip()
        actual = self.package_tree_checksum(pkg_path)
        if not expected_value:
            return {
                "ok": True,
                "skipped": True,
                "reason": "no checksum declared",
                "actual": actual,
            }
        ok = expected_value.lower() == actual.lower() or expected_value.lower() == f"sha256:{actual}".lower()
        return {"ok": ok, "expected": expected_value, "actual": actual, "skipped": False}

    def verify_signature(self, manifest: PackageManifest) -> dict[str, Any]:
        """Signature field presence check (full crypto deferred to distribution builds)."""
        signature = (manifest.signature or "").strip()
        if not signature:
            return {"ok": True, "skipped": True, "reason": "no signature declared"}
        # Accept non-empty opaque signatures in BUILD-011; networked PKI later.
        return {"ok": True, "skipped": False, "signature_present": True}

    def is_trusted_publisher(self, publisher: str) -> bool:
        return publisher.strip().lower() in self.trusted_publishers

    def validate_permissions(self, manifest: PackageManifest) -> dict[str, Any]:
        """Capabilities act as declared package permissions."""
        caps = [str(c).strip() for c in manifest.capabilities if str(c).strip()]
        return {"ok": True, "capabilities": caps, "permissions": caps}

    def verify_package(self, package: Package | Path) -> dict[str, Any]:
        """Run checksum + signature + trust + capabilities checks."""
        pkg = package if isinstance(package, Package) else None
        path = package.root if isinstance(package, Package) else Path(package)
        manifest = pkg.manifest if pkg else parse_package_manifest(path)
        publisher = manifest.author
        checksum = self.verify_checksum(pkg or path)
        signature = self.verify_signature(manifest)
        permissions = self.validate_permissions(manifest)
        trusted = self.is_trusted_publisher(publisher)
        ok = bool(checksum.get("ok")) and bool(signature.get("ok")) and bool(permissions.get("ok"))
        return {
            "ok": ok,
            "package_id": manifest.id,
            "publisher": publisher,
            "trusted_publisher": trusted,
            "checksum": checksum,
            "signature": signature,
            "permissions": permissions,
        }
