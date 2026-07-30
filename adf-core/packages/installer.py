"""Install / remove package trees into the local APM install root."""

from __future__ import annotations

import hashlib
import shutil
from pathlib import Path
from typing import Any

from packages.cache import PackageCache
from packages.metadata import PACKAGE_MANIFEST_FILENAME
from packages.manifest import AdfPackageError, parse_package_manifest
from packages.package import Package


class PackageInstaller:
    """Copy verified packages into the install directory and cache."""

    def __init__(
        self,
        install_root: Path | str,
        cache: PackageCache,
    ) -> None:
        self.install_root = Path(install_root)
        self.cache = cache
        self.install_root.mkdir(parents=True, exist_ok=True)

    def target_path(self, package: Package) -> Path:
        """Compute install path: ``{install_root}/{type}/{id}``."""
        return self.install_root / package.type / package.id

    def install(self, package: Package, *, overwrite: bool = False) -> dict[str, Any]:
        """Install a package from its source root."""
        dest = self.target_path(package)
        if dest.exists() and not overwrite:
            raise AdfPackageError(f"package already installed: {package.id} ({dest})")
        if dest.exists() and overwrite:
            shutil.rmtree(dest)

        # Cache then copy to install root.
        cached = self.cache.put_package(package.id, package.version, package.root)
        self.cache.put_metadata(
            package.id,
            {
                "id": package.id,
                "version": package.version,
                "type": package.type,
                "cached": str(cached),
            },
        )
        self.cache.put_download(f"{package.id}-{package.version}", package.root)
        shutil.copytree(cached, dest)
        return {
            "ok": True,
            "id": package.id,
            "version": package.version,
            "type": package.type,
            "path": str(dest),
            "cached": str(cached),
        }

    def remove(self, package_id: str, package_type: str | None = None) -> dict[str, Any]:
        """Remove an installed package directory."""
        matches = list(self.find_installed(package_id, package_type=package_type))
        if not matches:
            raise AdfPackageError(f"package not installed: {package_id}")
        removed: list[str] = []
        for path in matches:
            shutil.rmtree(path)
            removed.append(str(path))
        return {"ok": True, "id": package_id, "removed": removed}

    def find_installed(
        self,
        package_id: str,
        *,
        package_type: str | None = None,
    ) -> list[Path]:
        """Locate installed package directories by id."""
        found: list[Path] = []
        if not self.install_root.is_dir():
            return found
        type_dirs = (
            [self.install_root / package_type]
            if package_type
            else [p for p in self.install_root.iterdir() if p.is_dir()]
        )
        for type_dir in type_dirs:
            candidate = type_dir / package_id
            if (candidate / PACKAGE_MANIFEST_FILENAME).is_file():
                found.append(candidate)
        return found

    def list_installed(self) -> list[dict[str, Any]]:
        """List installed packages."""
        rows: list[dict[str, Any]] = []
        if not self.install_root.is_dir():
            return rows
        for type_dir in sorted(self.install_root.iterdir()):
            if not type_dir.is_dir():
                continue
            for pkg_dir in sorted(type_dir.iterdir()):
                manifest_path = pkg_dir / PACKAGE_MANIFEST_FILENAME
                if not manifest_path.is_file():
                    continue
                try:
                    manifest = parse_package_manifest(manifest_path)
                except AdfPackageError:
                    continue
                rows.append(
                    {
                        "id": manifest.id,
                        "name": manifest.name,
                        "version": manifest.version,
                        "type": manifest.type,
                        "path": str(pkg_dir),
                    }
                )
        return rows

    @staticmethod
    def checksum_tree(root: Path) -> str:
        """Compute a stable sha256 over file relative paths + contents."""
        digest = hashlib.sha256()
        files = sorted(p for p in Path(root).rglob("*") if p.is_file())
        for path in files:
            rel = path.relative_to(root).as_posix().encode("utf-8")
            digest.update(rel)
            digest.update(path.read_bytes())
        return digest.hexdigest()
