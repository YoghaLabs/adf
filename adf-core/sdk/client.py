"""SDKClient — primary programmatic entrypoint for ADF."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from loader.project_loader import ProjectLoader
from runtime.exceptions import AdfError
from sdk.distribution import DistributionClient
from sdk.generator import GeneratorAPI
from sdk.installer import InstallerClient
from sdk.marketplace import MarketplaceClient
from sdk.package import PackageAPI
from sdk.plugin import PluginAPI
from sdk.project import ProjectAPI
from sdk.publisher import PublisherClient
from sdk.registry import RegistryClient
from sdk.release import ReleaseClient
from sdk.runtime import RuntimeAPI
from sdk.template import TemplateAPI
from sdk.updater import UpdaterClient
from sdk.workspace import WorkspaceAPI
from services.contracts import ServiceResult
from services.service_manager import ServiceManager


def _default_root(explicit: Path | str | None = None) -> Path:
    if explicit is not None:
        return Path(explicit).resolve()
    try:
        return ProjectLoader.find_root().repo_root
    except AdfError:
        return Path.cwd().resolve()


class SDKClient:
    """Stable public client for CLI-alternative integrations and ADF Studio.

    Responsibilities: boot, shutdown, runtime, packages, generator, templates,
    plugins, projects, workspace.
    """

    def __init__(self, repo_root: Path | str | None = None) -> None:
        """Create a client bound to an ADF repository root."""
        self.repo_root = _default_root(repo_root)
        self.manager = ServiceManager(self.repo_root)
        self._configured = False

    def _ensure(self) -> ServiceManager:
        if not self._configured:
            self.manager.configure_defaults()
            self._configured = True
        return self.manager

    def boot(self) -> dict[str, Any]:
        """Configure defaults and boot all services + runtime engine."""
        result = self._ensure().boot()
        return result.to_dict()

    def shutdown(self) -> dict[str, Any]:
        """Shut down registered services."""
        result = self._ensure().shutdown()
        return result.to_dict()

    def health(self) -> dict[str, Any]:
        """Aggregate service health."""
        return self._ensure().health().to_dict()

    def services(self) -> list[dict[str, Any]]:
        """List registered services."""
        return self._ensure().list()

    def runtime(self) -> RuntimeAPI:
        """Access RuntimeService via typed SDK facade."""
        return RuntimeAPI(self._ensure().runtime())

    def packages(self) -> PackageAPI:
        """Access PackageService via typed SDK facade."""
        return PackageAPI(self._ensure().package())

    def generator(self) -> GeneratorAPI:
        """Access GeneratorService via typed SDK facade."""
        return GeneratorAPI(self._ensure().generator())

    def templates(self) -> TemplateAPI:
        """Access TemplateService via typed SDK facade."""
        return TemplateAPI(self._ensure().template())

    def plugins(self) -> PluginAPI:
        """Access PluginService via typed SDK facade."""
        return PluginAPI(self._ensure().plugin())

    def projects(self) -> ProjectAPI:
        """Access ProjectService via typed SDK facade."""
        return ProjectAPI(self._ensure().project())

    def workspace(self) -> WorkspaceAPI:
        """Access WorkspaceService via typed SDK facade."""
        return WorkspaceAPI(self._ensure().workspace())

    def marketplace(self) -> MarketplaceClient:
        """Access MarketplaceService via typed SDK facade."""
        return MarketplaceClient(self._ensure().marketplace())

    def registry(self) -> RegistryClient:
        """Access RegistryService via typed SDK facade."""
        return RegistryClient(self._ensure().registry())

    def publisher(self) -> PublisherClient:
        """Access PublisherService via typed SDK facade."""
        return PublisherClient(self._ensure().publisher())

    def distribution(self) -> DistributionClient:
        """Access DistributionService via typed SDK facade."""
        return DistributionClient(self._ensure().distribution())

    def installer(self) -> InstallerClient:
        """Access InstallerService via typed SDK facade."""
        return InstallerClient(self._ensure().installer())

    def updater(self) -> UpdaterClient:
        """Access UpdaterService via typed SDK facade."""
        return UpdaterClient(self._ensure().updater())

    def release(self) -> ReleaseClient:
        """Access ReleaseService via typed SDK facade."""
        return ReleaseClient(self._ensure().release())

    def result(self, service_result: ServiceResult) -> dict[str, Any]:
        """Normalize a ServiceResult for callers."""
        return service_result.to_dict()
