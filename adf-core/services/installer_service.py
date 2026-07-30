"""InstallerService — orchestrates InstallerManager."""

from __future__ import annotations

from distribution.installer import InstallerManager
from services.contracts import BaseService, ServiceContext, ServiceMetadata, ServiceResult


class InstallerService(BaseService):
    """Service facade over InstallerManager."""

    metadata = ServiceMetadata(
        name="installer",
        version="0.12.0",
        description="Distribution/package installer service",
        service_type="installer",
    )

    def __init__(self, manager: InstallerManager) -> None:
        super().__init__()
        self.manager = manager

    def on_boot(self, context: ServiceContext) -> ServiceResult:
        return ServiceResult.success(message="installer service ready")

    def install(self, target: str, *, overwrite: bool = False, mode: str = "auto") -> ServiceResult:
        result = self.manager.install(target, overwrite=overwrite, mode=mode)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def repair(self, install_id: str) -> ServiceResult:
        result = self.manager.repair(install_id)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def verify(self, target: str | None = None) -> ServiceResult:
        result = self.manager.verify(target)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def uninstall(self, install_id: str, *, package: bool = False) -> ServiceResult:
        result = self.manager.uninstall(install_id, package=package)
        return ServiceResult(ok=bool(result.get("ok")), data=result)
