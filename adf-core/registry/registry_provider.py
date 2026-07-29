"""Registry provider adapters — wrap ``packages.repository`` backends."""

from __future__ import annotations

from abc import ABC, abstractmethod
from pathlib import Path
from typing import Any

from packages.package import Package
from packages.repository import (
    GitHubPackageRepository,
    GitLabPackageRepository,
    LocalPackageRepository,
    MockCloudPackageRepository,
    PackageRepository,
    PrivatePackageRepository,
)


class RegistryProvider(ABC):
    """Provider facade over a ``PackageRepository`` (no duplicated fetch logic)."""

    name: str = "abstract"

    def __init__(self, repository: PackageRepository) -> None:
        self.repository = repository

    def list(self) -> list[dict[str, Any]]:
        return self.repository.list()

    def search(self, query: str = "", *, package_type: str | None = None) -> list[dict[str, Any]]:
        return self.repository.search(query, package_type=package_type)

    def get(self, package_id: str) -> Package:
        return self.repository.get(package_id)

    @abstractmethod
    def describe(self) -> dict[str, Any]:
        """Return provider capability metadata."""


class LocalRegistryProvider(RegistryProvider):
    """Local filesystem registry provider."""

    name = "local"

    def __init__(self, root: Path | str) -> None:
        super().__init__(LocalPackageRepository(root))
        self.root = Path(root)

    def describe(self) -> dict[str, Any]:
        return {
            "name": self.name,
            "kind": "local",
            "root": str(self.root),
            "networked": False,
            "enabled": True,
        }


class GitHubRegistryProvider(RegistryProvider):
    """GitHub registry provider (architected)."""

    name = "github"

    def __init__(self, org: str = "YoghaLabs") -> None:
        super().__init__(GitHubPackageRepository(org=org))
        self.org = org

    def describe(self) -> dict[str, Any]:
        return {
            "name": self.name,
            "kind": "github",
            "org": self.org,
            "networked": False,
            "enabled": False,
        }


class GitLabRegistryProvider(RegistryProvider):
    """GitLab registry provider (architected)."""

    name = "gitlab"

    def __init__(self) -> None:
        super().__init__(GitLabPackageRepository())

    def describe(self) -> dict[str, Any]:
        return {
            "name": self.name,
            "kind": "gitlab",
            "networked": False,
            "enabled": False,
        }


class EnterpriseRegistryProvider(RegistryProvider):
    """Enterprise / private registry provider (architected)."""

    name = "enterprise"

    def __init__(self, base_url: str = "") -> None:
        super().__init__(PrivatePackageRepository(base_url))
        self.base_url = base_url

    def describe(self) -> dict[str, Any]:
        return {
            "name": self.name,
            "kind": "enterprise",
            "base_url": self.base_url,
            "networked": False,
            "enabled": False,
        }


class MockCloudRegistryProvider(RegistryProvider):
    """Future cloud registry stand-in (empty catalog, no network)."""

    name = "cloud"

    def __init__(self) -> None:
        super().__init__(MockCloudPackageRepository())

    def describe(self) -> dict[str, Any]:
        return {
            "name": self.name,
            "kind": "cloud",
            "networked": False,
            "enabled": False,
            "mock": True,
        }
