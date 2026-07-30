"""UpdaterService — orchestrates UpdateManager."""

from __future__ import annotations

from distribution.updater import UpdateManager
from services.contracts import BaseService, ServiceContext, ServiceMetadata, ServiceResult


class UpdaterService(BaseService):
    """Service facade over UpdateManager."""

    metadata = ServiceMetadata(
        name="updater",
        version="0.12.0",
        description="Distribution update service",
        service_type="updater",
    )

    def __init__(self, manager: UpdateManager) -> None:
        super().__init__()
        self.manager = manager

    def on_boot(self, context: ServiceContext) -> ServiceResult:
        return ServiceResult.success(message="updater service ready")

    def check(self, *, channel: str | None = None) -> ServiceResult:
        result = self.manager.check(channel=channel)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def download(self, version: str, *, channel: str | None = None) -> ServiceResult:
        result = self.manager.download(version, channel=channel)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def apply(self, *, overwrite: bool = True) -> ServiceResult:
        result = self.manager.apply(overwrite=overwrite)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def rollback(self, snapshot_id: str | None = None) -> ServiceResult:
        result = self.manager.rollback(snapshot_id)
        return ServiceResult(ok=bool(result.get("ok")), data=result)
