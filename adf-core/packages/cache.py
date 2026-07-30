"""Local package cache (download / metadata / package / offline)."""

from __future__ import annotations

import json
import shutil
from pathlib import Path
from typing import Any

from packages.manifest import AdfPackageError


class PackageCache:
    """Filesystem cache for APM.

    Layout under ``root``:
    - ``download/`` — archived/copied source snapshots
    - ``metadata/`` — JSON metadata blobs
    - ``packages/`` — unpacked package trees keyed by id/version
    """

    def __init__(self, root: Path | str, *, offline: bool = False) -> None:
        """Create a cache rooted at ``root``."""
        self.root = Path(root)
        self.offline = offline
        self.download_dir = self.root / "download"
        self.metadata_dir = self.root / "metadata"
        self.packages_dir = self.root / "packages"
        for path in (self.download_dir, self.metadata_dir, self.packages_dir):
            path.mkdir(parents=True, exist_ok=True)

    def package_path(self, package_id: str, version: str) -> Path:
        """Return cache path for an unpacked package."""
        safe = package_id.replace("/", "__")
        return self.packages_dir / safe / version

    def has_package(self, package_id: str, version: str) -> bool:
        """Return True if package tree is cached."""
        return (self.package_path(package_id, version) / "package.yaml").is_file()

    def put_package(self, package_id: str, version: str, source: Path) -> Path:
        """Copy a package directory into the cache."""
        dest = self.package_path(package_id, version)
        if dest.exists():
            shutil.rmtree(dest)
        shutil.copytree(source, dest)
        return dest

    def get_package(self, package_id: str, version: str) -> Path:
        """Return cached package path or raise."""
        path = self.package_path(package_id, version)
        if not (path / "package.yaml").is_file():
            raise AdfPackageError(f"package not in cache: {package_id}@{version}")
        return path

    def put_metadata(self, key: str, payload: dict[str, Any]) -> Path:
        """Store metadata JSON."""
        path = self.metadata_dir / f"{key.replace('/', '__')}.json"
        path.write_text(json.dumps(payload, indent=2, sort_keys=True), encoding="utf-8")
        return path

    def get_metadata(self, key: str) -> dict[str, Any] | None:
        """Load metadata JSON if present."""
        path = self.metadata_dir / f"{key.replace('/', '__')}.json"
        if not path.is_file():
            return None
        return json.loads(path.read_text(encoding="utf-8"))

    def put_download(self, name: str, source: Path) -> Path:
        """Cache a downloaded file/directory snapshot."""
        dest = self.download_dir / name
        if source.is_dir():
            if dest.exists():
                shutil.rmtree(dest)
            shutil.copytree(source, dest)
        else:
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, dest)
        return dest

    def clear(self) -> dict[str, int]:
        """Clear all cache buckets."""
        counts = {"download": 0, "metadata": 0, "packages": 0}
        for label, path in (
            ("download", self.download_dir),
            ("metadata", self.metadata_dir),
            ("packages", self.packages_dir),
        ):
            if path.exists():
                shutil.rmtree(path)
            path.mkdir(parents=True, exist_ok=True)
            counts[label] = 0
        return counts

    def stats(self) -> dict[str, Any]:
        """Return simple cache statistics."""
        def _count(path: Path) -> int:
            if not path.exists():
                return 0
            return sum(1 for p in path.rglob("*") if p.is_file())

        return {
            "root": str(self.root),
            "offline": self.offline,
            "download_files": _count(self.download_dir),
            "metadata_files": _count(self.metadata_dir),
            "package_files": _count(self.packages_dir),
        }
