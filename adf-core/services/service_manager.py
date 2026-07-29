"""ServiceManager — register and lifecycle-manage ADF services."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from runtime.constants import ENGINE_BUILD, PACKAGE_VERSION
from services.contracts import BaseService, ServiceContext, ServiceException, ServiceResult


class ServiceManager:
    """Orchestration registry for services (CLI/SDK/Studio entrypoint).

    Responsibilities: register, unregister, get, list, health, boot, shutdown.
    """

    def __init__(self, repo_root: Path | str) -> None:
        """Create an empty service manager for ``repo_root``."""
        self.repo_root = Path(repo_root).resolve()
        self._services: dict[str, BaseService] = {}
        self._context: ServiceContext | None = None
        self._booted = False
        # Engine holders populated by ``configure_defaults``.
        self.runtime_engine: Any | None = None

    def register(self, service: BaseService) -> None:
        """Register a service instance."""
        name = service.name
        if name in self._services:
            raise ServiceException(f"service already registered: {name}")
        self._services[name] = service

    def unregister(self, name: str) -> None:
        """Unregister a service by name."""
        if name not in self._services:
            raise ServiceException(f"service not registered: {name}")
        service = self._services.pop(name)
        if service.is_booted:
            service.shutdown()

    def get(self, name: str) -> BaseService:
        """Return a registered service."""
        if name not in self._services:
            raise ServiceException(f"unknown service: {name}")
        return self._services[name]

    def list(self) -> list[dict[str, Any]]:
        """List registered services."""
        rows: list[dict[str, Any]] = []
        for name, service in sorted(self._services.items()):
            rows.append(
                {
                    "name": name,
                    "version": service.metadata.version,
                    "description": service.metadata.description,
                    "type": service.metadata.service_type,
                    "booted": service.is_booted,
                }
            )
        return rows

    def health(self) -> ServiceResult:
        """Aggregate health across services."""
        reports: dict[str, Any] = {}
        ok = True
        for name, service in self._services.items():
            result = service.health()
            reports[name] = result.to_dict()
            ok = ok and result.ok
        return ServiceResult(ok=ok, data={"services": reports, "manager_booted": self._booted})

    def boot(self) -> ServiceResult:
        """Boot all registered services (and underlying runtime engines if configured)."""
        if self.runtime_engine is None:
            self.configure_defaults()
        assert self.runtime_engine is not None
        state = self.runtime_engine.state.load()
        self._context = ServiceContext(
            repo_root=self.repo_root,
            build=str(state.get("build") or ENGINE_BUILD),
            version=str(state.get("version") or PACKAGE_VERSION),
            branch=str(state.get("branch") or "develop"),
        )
        results: dict[str, Any] = {}
        ok = True
        for name, service in self._services.items():
            result = service.boot(self._context)
            results[name] = result.to_dict()
            ok = ok and result.ok
        runtime_boot = self.runtime_engine.boot()
        results["runtime_engine"] = runtime_boot
        ok = ok and bool(runtime_boot.get("ok"))
        self._booted = ok
        return ServiceResult(ok=ok, data={"boot": results})

    def shutdown(self) -> ServiceResult:
        """Shut down all services in reverse registration order."""
        results: dict[str, Any] = {}
        for name in reversed(list(self._services.keys())):
            results[name] = self._services[name].shutdown().to_dict()
        self._booted = False
        return ServiceResult.success({"shutdown": results})

    def configure_defaults(self) -> None:
        """Wire default services to existing engines/managers (no duplicated logic)."""
        from distribution.distribution_manager import DistributionManager
        from engine.knowledge_engine import KnowledgeEngine
        from engine.runtime_engine import RuntimeEngine
        from registry.marketplace import MarketplaceManager
        from registry.registry_manager import RegistryManager
        from services.context_service import ContextService
        from services.distribution_service import DistributionService
        from services.generator_service import GeneratorService
        from services.installer_service import InstallerService
        from services.knowledge_service import KnowledgeService
        from services.marketplace_service import MarketplaceService
        from services.package_service import PackageService
        from services.plugin_service import PluginService
        from services.project_service import ProjectService
        from services.publisher_service import PublisherService
        from services.registry_service import RegistryService
        from services.release_service import ReleaseService
        from services.runtime_service import RuntimeService
        from services.template_service import TemplateService
        from services.updater_service import UpdaterService
        from services.workspace_service import WorkspaceService

        engine = RuntimeEngine(self.repo_root)
        knowledge = KnowledgeEngine(self.repo_root)
        self.runtime_engine = engine

        registry_manager = RegistryManager(self.repo_root, package_manager=engine.packages)
        marketplace_manager = MarketplaceManager(registry_manager)
        distribution_manager = DistributionManager(
            self.repo_root, package_manager=engine.packages
        )
        self.registry_manager = registry_manager
        self.marketplace_manager = marketplace_manager
        self.distribution_manager = distribution_manager

        # Clear and re-register defaults if empty / first configure.
        defaults = [
            RuntimeService(engine),
            GeneratorService(engine.generator),
            PackageService(engine.packages),
            TemplateService(engine.templates),
            PluginService(engine.plugins),
            ContextService(engine.context),
            KnowledgeService(knowledge),
            ProjectService(self.repo_root, engine.state),
            WorkspaceService(self.repo_root, engine),
            RegistryService(registry_manager),
            MarketplaceService(marketplace_manager),
            PublisherService(registry_manager),
            DistributionService(distribution_manager),
            InstallerService(distribution_manager.installer),
            UpdaterService(distribution_manager.updater),
            ReleaseService(distribution_manager.releases),
        ]
        for service in defaults:
            if service.name not in self._services:
                self.register(service)

        # Publish ServiceManager to plugins via ExtensionAPI.
        engine.extensions.publish_service("services", self)
        engine.registry.register("services", self)
        engine.extensions.publish_service("registry_manager", registry_manager)
        engine.extensions.publish_service("marketplace", marketplace_manager)
        engine.extensions.publish_service("distribution", distribution_manager)
        engine.registry.register("registry_manager", registry_manager)
        engine.registry.register("marketplace", marketplace_manager)
        engine.registry.register("distribution", distribution_manager)

    def runtime(self) -> Any:
        """Typed accessor for RuntimeService."""
        from services.runtime_service import RuntimeService

        service = self.get("runtime")
        if not isinstance(service, RuntimeService):
            raise ServiceException("runtime service missing")
        return service

    def generator(self) -> Any:
        """Typed accessor for GeneratorService."""
        from services.generator_service import GeneratorService

        service = self.get("generator")
        if not isinstance(service, GeneratorService):
            raise ServiceException("generator service missing")
        return service

    def package(self) -> Any:
        """Typed accessor for PackageService."""
        from services.package_service import PackageService

        service = self.get("package")
        if not isinstance(service, PackageService):
            raise ServiceException("package service missing")
        return service

    def template(self) -> Any:
        """Typed accessor for TemplateService."""
        from services.template_service import TemplateService

        service = self.get("template")
        if not isinstance(service, TemplateService):
            raise ServiceException("template service missing")
        return service

    def plugin(self) -> Any:
        """Typed accessor for PluginService."""
        from services.plugin_service import PluginService

        service = self.get("plugin")
        if not isinstance(service, PluginService):
            raise ServiceException("plugin service missing")
        return service

    def context(self) -> Any:
        """Typed accessor for ContextService."""
        from services.context_service import ContextService

        service = self.get("context")
        if not isinstance(service, ContextService):
            raise ServiceException("context service missing")
        return service

    def knowledge(self) -> Any:
        """Typed accessor for KnowledgeService."""
        from services.knowledge_service import KnowledgeService

        service = self.get("knowledge")
        if not isinstance(service, KnowledgeService):
            raise ServiceException("knowledge service missing")
        return service

    def project(self) -> Any:
        """Typed accessor for ProjectService."""
        from services.project_service import ProjectService

        service = self.get("project")
        if not isinstance(service, ProjectService):
            raise ServiceException("project service missing")
        return service

    def workspace(self) -> Any:
        """Typed accessor for WorkspaceService."""
        from services.workspace_service import WorkspaceService

        service = self.get("workspace")
        if not isinstance(service, WorkspaceService):
            raise ServiceException("workspace service missing")
        return service

    def registry(self) -> Any:
        """Typed accessor for RegistryService."""
        from services.registry_service import RegistryService

        service = self.get("registry")
        if not isinstance(service, RegistryService):
            raise ServiceException("registry service missing")
        return service

    def marketplace(self) -> Any:
        """Typed accessor for MarketplaceService."""
        from services.marketplace_service import MarketplaceService

        service = self.get("marketplace")
        if not isinstance(service, MarketplaceService):
            raise ServiceException("marketplace service missing")
        return service

    def publisher(self) -> Any:
        """Typed accessor for PublisherService."""
        from services.publisher_service import PublisherService

        service = self.get("publisher")
        if not isinstance(service, PublisherService):
            raise ServiceException("publisher service missing")
        return service

    def distribution(self) -> Any:
        """Typed accessor for DistributionService."""
        from services.distribution_service import DistributionService

        service = self.get("distribution")
        if not isinstance(service, DistributionService):
            raise ServiceException("distribution service missing")
        return service

    def installer(self) -> Any:
        """Typed accessor for InstallerService."""
        from services.installer_service import InstallerService

        service = self.get("installer")
        if not isinstance(service, InstallerService):
            raise ServiceException("installer service missing")
        return service

    def updater(self) -> Any:
        """Typed accessor for UpdaterService."""
        from services.updater_service import UpdaterService

        service = self.get("updater")
        if not isinstance(service, UpdaterService):
            raise ServiceException("updater service missing")
        return service

    def release(self) -> Any:
        """Typed accessor for ReleaseService."""
        from services.release_service import ReleaseService

        service = self.get("release")
        if not isinstance(service, ReleaseService):
            raise ServiceException("release service missing")
        return service
