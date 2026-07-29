"""PublisherService — orchestrates publisher profiles and publish flows."""

from __future__ import annotations

from pathlib import Path

from registry.registry_manager import RegistryManager
from services.contracts import BaseService, ServiceContext, ServiceMetadata, ServiceResult


class PublisherService(BaseService):
    """Service facade for publisher profiles and publication."""

    metadata = ServiceMetadata(
        name="publisher",
        version="0.11.0",
        description="Publisher profile and publish service",
        service_type="publisher",
    )

    def __init__(self, manager: RegistryManager) -> None:
        super().__init__()
        self.manager = manager

    def on_boot(self, context: ServiceContext) -> ServiceResult:
        return ServiceResult.success(message="publisher service ready")

    def list(self) -> ServiceResult:
        rows = self.manager.publishers.list()
        return ServiceResult.success({"publishers": rows, "count": len(rows)})

    def get(self, publisher_id: str) -> ServiceResult:
        profile = self.manager.publishers.get(publisher_id)
        if profile is None:
            profile = self.manager.publishers.ensure(publisher_id)
        return ServiceResult.success(profile.to_dict())

    def publish(
        self,
        source: Path | str,
        *,
        publisher_id: str = "YoghaLabs",
        overwrite: bool = False,
    ) -> ServiceResult:
        result = self.manager.publish(source, publisher_id=publisher_id, overwrite=overwrite)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def packages(self, publisher_id: str) -> ServiceResult:
        rows = self.manager.by_publisher(publisher_id)
        return ServiceResult.success({"packages": rows, "count": len(rows)})
