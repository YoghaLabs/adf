"""Registry client — local by default, remote backends prepared."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from packages.manifest import AdfPackageError, PackageManifest
from packages.package import Package
from packages.repository import (
    GitHubPackageRepository,
    GitLabPackageRepository,
    LocalPackageRepository,
    MockCloudPackageRepository,
    PackageRepository,
    PrivatePackageRepository,
)


class RegistryClient:
    """Aggregate package repositories with a primary local registry."""

    def __init__(
        self,
        local_root: Path | str,
        *,
        enable_github: bool = False,
        enable_gitlab: bool = False,
        enable_private: bool = False,
        enable_enterprise: bool = False,
        enable_cloud: bool = False,
        private_url: str = "",
    ) -> None:
        """Create a registry client.

        Remote backends are constructed for architecture readiness but remain
        disabled unless explicitly enabled (still raise until networked builds).
        """
        self.local = LocalPackageRepository(local_root)
        self.repos: list[PackageRepository] = [self.local]
        self._github = GitHubPackageRepository()
        self._gitlab = GitLabPackageRepository()
        self._private = PrivatePackageRepository(private_url)
        self._cloud = MockCloudPackageRepository()
        if enable_github:
            self.repos.append(self._github)
        if enable_gitlab:
            self.repos.append(self._gitlab)
        if enable_private or enable_enterprise:
            self.repos.append(self._private)
        if enable_cloud:
            self.repos.append(self._cloud)

    def list(self) -> list[dict[str, Any]]:
        """List packages across enabled repositories."""
        rows: list[dict[str, Any]] = []
        seen: set[str] = set()
        for repo in self.repos:
            for row in repo.list():
                if row["id"] in seen:
                    continue
                seen.add(row["id"])
                rows.append(row)
        return rows

    def search(self, query: str = "", *, package_type: str | None = None) -> list[dict[str, Any]]:
        """Search enabled repositories."""
        rows: list[dict[str, Any]] = []
        seen: set[str] = set()
        for repo in self.repos:
            for row in repo.search(query, package_type=package_type):
                if row["id"] in seen:
                    continue
                seen.add(row["id"])
                rows.append(row)
        return rows

    def get(self, package_id: str) -> Package:
        """Resolve a package id from the first matching repository."""
        errors: list[str] = []
        for repo in self.repos:
            try:
                return repo.get(package_id)
            except AdfPackageError as exc:
                errors.append(f"{repo.name}: {exc}")
        raise AdfPackageError(
            f"package '{package_id}' not found; tried: {'; '.join(errors) or 'none'}"
        )

    def get_manifest(self, package_id: str) -> PackageManifest:
        """Return only the manifest for a package id."""
        return self.get(package_id).manifest
