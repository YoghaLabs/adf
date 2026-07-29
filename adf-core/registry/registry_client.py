"""Package registry client — orchestrates providers; delegates installs to APM."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from packages.manifest import AdfPackageError
from packages.package import Package
from packages.registry import RegistryClient as PackagesRegistryClient
from registry.package_index import PackageIndex
from registry.registry_provider import (
    EnterpriseRegistryProvider,
    GitHubRegistryProvider,
    GitLabRegistryProvider,
    LocalRegistryProvider,
    MockCloudRegistryProvider,
    RegistryProvider,
)
from registry.search import RegistrySearch


class RegistryClient:
    """Central registry client used by Marketplace and Package Manager consumers.

    Wraps ``packages.registry.RegistryClient`` for package resolution and adds
    provider describe/list + marketplace index decoration.
    """

    def __init__(
        self,
        local_root: Path | str,
        *,
        index: PackageIndex | None = None,
        packages_client: PackagesRegistryClient | None = None,
        enable_github: bool = False,
        enable_gitlab: bool = False,
        enable_enterprise: bool = False,
        enable_cloud: bool = False,
        enterprise_url: str = "",
    ) -> None:
        self.local_root = Path(local_root)
        self.packages = packages_client or PackagesRegistryClient(
            self.local_root,
            enable_github=enable_github,
            enable_gitlab=enable_gitlab,
            enable_enterprise=enable_enterprise,
            enable_cloud=enable_cloud,
            private_url=enterprise_url,
        )
        self.index = index or PackageIndex(self.local_root.parent.parent / ".adf" / "apm" / "marketplace" / "index.json")
        self.providers: dict[str, RegistryProvider] = {
            "local": LocalRegistryProvider(self.local_root),
            "github": GitHubRegistryProvider(),
            "gitlab": GitLabRegistryProvider(),
            "enterprise": EnterpriseRegistryProvider(enterprise_url),
            "cloud": MockCloudRegistryProvider(),
        }
        self.search_engine = RegistrySearch(self.catalog)

    def catalog(self) -> list[dict[str, Any]]:
        """Return decorated package rows from the packages registry client."""
        return self.index.decorate(self.packages.list())

    def list(self) -> list[dict[str, Any]]:
        return self.catalog()

    def search(self, query: str = "", *, package_type: str | None = None) -> list[dict[str, Any]]:
        if package_type:
            return self.search_engine.search(query, category=package_type)
        return self.search_engine.search(query)

    def get(self, package_id: str) -> Package:
        return self.packages.get(package_id)

    def get_manifest(self, package_id: str) -> Any:
        return self.packages.get_manifest(package_id)

    def providers_status(self) -> list[dict[str, Any]]:
        return [provider.describe() for provider in self.providers.values()]

    def provider(self, name: str) -> RegistryProvider:
        if name not in self.providers:
            raise AdfPackageError(f"unknown registry provider: {name}")
        return self.providers[name]
