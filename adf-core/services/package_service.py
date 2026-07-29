"""PackageService — orchestrates PackageManager."""

from __future__ import annotations

from packages.manager import PackageManager
from services.contracts import BaseService, ServiceContext, ServiceMetadata, ServiceResult


class PackageService(BaseService):
    """Service facade over PackageManager (APM)."""

    metadata = ServiceMetadata(
        name="package",
        version="0.10.0",
        description="ADF Package Manager service",
        service_type="package",
    )

    def __init__(self, manager: PackageManager) -> None:
        super().__init__()
        self.manager = manager

    def on_boot(self, context: ServiceContext) -> ServiceResult:
        return ServiceResult.success(message="package service ready")

    def install(self, package_id: str, *, overwrite: bool = False) -> ServiceResult:
        result = self.manager.install(package_id, overwrite=overwrite)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def remove(self, package_id: str) -> ServiceResult:
        return ServiceResult.success(self.manager.remove(package_id))

    def update(self, package_id: str) -> ServiceResult:
        result = self.manager.update(package_id)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def search(self, query: str = "", *, package_type: str | None = None) -> ServiceResult:
        rows = self.manager.search(query, package_type=package_type)
        return ServiceResult.success({"packages": rows, "count": len(rows)})

    def list(self, *, installed: bool = False) -> ServiceResult:
        rows = self.manager.list(installed=installed)
        return ServiceResult.success(
            {"packages": rows, "count": len(rows), "installed": installed}
        )

    def verify(self, package_id: str | None = None) -> ServiceResult:
        result = self.manager.verify(package_id)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def cache_stats(self) -> ServiceResult:
        return ServiceResult.success(self.manager.cache_stats())

    def cache_clear(self) -> ServiceResult:
        return ServiceResult.success(self.manager.cache_clear())
