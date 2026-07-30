"""RegistryService — orchestrates RegistryManager."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from registry.registry_manager import RegistryManager
from services.contracts import BaseService, ServiceContext, ServiceMetadata, ServiceResult


class RegistryService(BaseService):
    """Service facade over RegistryManager."""

    metadata = ServiceMetadata(
        name="registry",
        version="0.11.0",
        description="Package registry orchestration service",
        service_type="registry",
    )

    def __init__(self, manager: RegistryManager) -> None:
        super().__init__()
        self.manager = manager

    def on_boot(self, context: ServiceContext) -> ServiceResult:
        return ServiceResult.success(message="registry service ready")

    def status(self) -> ServiceResult:
        return ServiceResult.success(self.manager.status())

    def list(self) -> ServiceResult:
        rows = self.manager.list()
        return ServiceResult.success({"packages": rows, "count": len(rows)})

    def search(self, query: str = "", **kwargs: Any) -> ServiceResult:
        rows = self.manager.search(query, **kwargs)
        return ServiceResult.success({"packages": rows, "count": len(rows)})

    def providers(self) -> ServiceResult:
        return ServiceResult.success({"providers": self.manager.providers()})

    def publish(
        self,
        source: Path | str,
        *,
        publisher_id: str = "YoghaLabs",
        overwrite: bool = False,
    ) -> ServiceResult:
        result = self.manager.publish(source, publisher_id=publisher_id, overwrite=overwrite)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def verify(self, package_id: str | None = None) -> ServiceResult:
        result = self.manager.verify(package_id)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def sync(self, *, incremental: bool = True) -> ServiceResult:
        result = self.manager.sync(incremental=incremental)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def install(self, package_id: str, *, overwrite: bool = False) -> ServiceResult:
        result = self.manager.install(package_id, overwrite=overwrite)
        return ServiceResult(ok=bool(result.get("ok")), data=result)
