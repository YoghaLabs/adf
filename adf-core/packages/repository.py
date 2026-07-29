"""Package repository backends (local first; remote-ready)."""

from __future__ import annotations

from abc import ABC, abstractmethod
from pathlib import Path
from typing import Any

from packages.metadata import PACKAGE_MANIFEST_FILENAME
from packages.manifest import (
    AdfPackageError,
    parse_package_manifest,
)
from packages.package import Package


class PackageRepository(ABC):
    """Abstract package repository."""

    name: str = "abstract"

    @abstractmethod
    def search(self, query: str = "", *, package_type: str | None = None) -> list[dict[str, Any]]:
        """Search packages in this repository."""

    @abstractmethod
    def get(self, package_id: str) -> Package:
        """Fetch a package by id."""

    @abstractmethod
    def list(self) -> list[dict[str, Any]]:
        """List all packages."""


class LocalPackageRepository(PackageRepository):
    """Filesystem repository of package directories each containing ``package.yaml``."""

    name = "local"

    def __init__(self, root: Path | str) -> None:
        self.root = Path(root)
        self.root.mkdir(parents=True, exist_ok=True)

    def _iter_packages(self) -> list[Package]:
        found: list[Package] = []
        if not self.root.is_dir():
            return found
        for child in sorted(self.root.iterdir()):
            if not child.is_dir():
                continue
            manifest_path = child / PACKAGE_MANIFEST_FILENAME
            if not manifest_path.is_file():
                continue
            try:
                manifest = parse_package_manifest(manifest_path)
            except AdfPackageError:
                continue
            found.append(Package(root=child, manifest=manifest))
        return found

    def list(self) -> list[dict[str, Any]]:
        return [
            {
                "id": pkg.id,
                "name": pkg.name,
                "version": pkg.version,
                "type": pkg.type,
                "description": pkg.manifest.description,
                "repository": self.name,
                "root": str(pkg.root),
            }
            for pkg in self._iter_packages()
        ]

    def search(self, query: str = "", *, package_type: str | None = None) -> list[dict[str, Any]]:
        q = query.strip().lower()
        rows = self.list()
        if package_type:
            rows = [row for row in rows if row["type"] == package_type]
        if not q:
            return rows
        return [
            row
            for row in rows
            if q in row["id"].lower()
            or q in row["name"].lower()
            or q in str(row.get("description", "")).lower()
        ]

    def get(self, package_id: str) -> Package:
        for pkg in self._iter_packages():
            if pkg.id == package_id or pkg.name == package_id:
                return pkg
        raise AdfPackageError(f"package not found in local registry: {package_id}")

    def publish_path(self, package_id: str) -> Path:
        """Return the directory path where a package id would live."""
        return self.root / package_id


class GitHubPackageRepository(PackageRepository):
    """Placeholder remote adapter (not networked in BUILD-009)."""

    name = "github"

    def __init__(self, org: str = "YoghaLabs") -> None:
        self.org = org

    def search(self, query: str = "", *, package_type: str | None = None) -> list[dict[str, Any]]:
        raise AdfPackageError(
            "GitHub registry is architected but not enabled in BUILD-009 (local only)"
        )

    def get(self, package_id: str) -> Package:
        raise AdfPackageError(
            "GitHub registry is architected but not enabled in BUILD-009 (local only)"
        )

    def list(self) -> list[dict[str, Any]]:
        return []


class GitLabPackageRepository(PackageRepository):
    """Placeholder remote adapter (not networked in BUILD-009)."""

    name = "gitlab"

    def search(self, query: str = "", *, package_type: str | None = None) -> list[dict[str, Any]]:
        raise AdfPackageError(
            "GitLab registry is architected but not enabled in BUILD-009 (local only)"
        )

    def get(self, package_id: str) -> Package:
        raise AdfPackageError(
            "GitLab registry is architected but not enabled in BUILD-009 (local only)"
        )

    def list(self) -> list[dict[str, Any]]:
        return []


class PrivatePackageRepository(PackageRepository):
    """Placeholder private registry adapter."""

    name = "private"

    def __init__(self, base_url: str = "") -> None:
        self.base_url = base_url

    def search(self, query: str = "", *, package_type: str | None = None) -> list[dict[str, Any]]:
        raise AdfPackageError(
            "Private registry is architected but not enabled in BUILD-009 (local only)"
        )

    def get(self, package_id: str) -> Package:
        raise AdfPackageError(
            "Private registry is architected but not enabled in BUILD-009 (local only)"
        )

    def list(self) -> list[dict[str, Any]]:
        return []
