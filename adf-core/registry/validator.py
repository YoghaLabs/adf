"""Registry / marketplace package validators."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from packages.manager import PackageManager
from packages.manifest import AdfPackageError, PackageManifest, parse_package_manifest
from packages.metadata import PACKAGE_TYPES, normalize_package_type
from packages.package import Package


class RegistryValidator:
    """Validate packages for registry publication (delegates to PackageManager)."""

    def __init__(self, package_manager: PackageManager) -> None:
        self.package_manager = package_manager

    def validate(self, target: Path | str | PackageManifest | Package) -> list[str]:
        """Return validation errors (empty means OK)."""
        errors = list(self.package_manager.validate(target))
        try:
            if isinstance(target, Package):
                pkg_type = target.type
            elif isinstance(target, PackageManifest):
                pkg_type = target.type
            else:
                pkg_type = parse_package_manifest(target).type
        except AdfPackageError as exc:
            return [str(exc)]
        if pkg_type not in PACKAGE_TYPES:
            errors.append(f"unsupported package type: {pkg_type}")
        return errors

    def validate_capabilities(self, manifest: PackageManifest) -> list[str]:
        """Ensure capabilities are a non-empty list of strings when required."""
        errors: list[str] = []
        for cap in manifest.capabilities:
            if not str(cap).strip():
                errors.append("empty capability entry")
        return errors

    def normalize_category(self, pkg_type: str) -> str:
        return normalize_package_type(pkg_type)

    def report(self, target: Path | str) -> dict[str, Any]:
        errors = self.validate(target)
        return {"ok": not errors, "errors": errors}
