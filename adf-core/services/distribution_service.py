"""DistributionService — orchestrates DistributionManager."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from distribution.distribution_manager import DistributionManager
from services.contracts import BaseService, ServiceContext, ServiceMetadata, ServiceResult


class DistributionService(BaseService):
    """Service facade over DistributionManager."""

    metadata = ServiceMetadata(
        name="distribution",
        version="0.12.0",
        description="Distribution platform orchestration service",
        service_type="distribution",
    )

    def __init__(self, manager: DistributionManager) -> None:
        super().__init__()
        self.manager = manager

    def on_boot(self, context: ServiceContext) -> ServiceResult:
        return ServiceResult.success(message="distribution service ready")

    def status(self) -> ServiceResult:
        return ServiceResult.success(self.manager.status())

    def package(
        self,
        source: Path | str,
        *,
        name: str,
        version: str,
        kind: str = "zip",
    ) -> ServiceResult:
        result = self.manager.package(source, name=name, version=version, kind=kind)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def bundle(
        self,
        source: Path | str,
        *,
        name: str,
        version: str,
        kind: str = "portable",
    ) -> ServiceResult:
        result = self.manager.bundle(source, name=name, version=version, kind=kind)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def offline_snapshot(self, *, incremental: bool = True) -> ServiceResult:
        result = self.manager.offline.snapshot_registry(incremental=incremental)
        return ServiceResult(ok=bool(result.get("ok")), data=result)
