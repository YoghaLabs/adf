"""PluginService — orchestrates PluginManager."""

from __future__ import annotations

from plugins.manager import PluginManager
from services.contracts import BaseService, ServiceContext, ServiceMetadata, ServiceResult


class PluginService(BaseService):
    """Service facade over PluginManager."""

    metadata = ServiceMetadata(
        name="plugin",
        version="0.10.0",
        description="Plugin management service",
        service_type="plugin",
    )

    def __init__(self, manager: PluginManager) -> None:
        super().__init__()
        self.manager = manager

    def on_boot(self, context: ServiceContext) -> ServiceResult:
        return ServiceResult.success(message="plugin service ready")

    def list(self) -> ServiceResult:
        rows = self.manager.list()
        return ServiceResult.success({"plugins": rows, "count": len(rows)})

    def info(self, name: str) -> ServiceResult:
        return ServiceResult.success(self.manager.info(name))

    def enable(self, name: str) -> ServiceResult:
        self.manager.enable(name)
        return ServiceResult.success({"enabled": name})

    def disable(self, name: str) -> ServiceResult:
        self.manager.disable(name)
        return ServiceResult.success({"disabled": name})

    def validate(self, name: str | None = None) -> ServiceResult:
        report = self.manager.validate(name)
        ok = all(not errs for errs in report.values())
        return ServiceResult(ok=ok, data={"plugin_validation": report})
