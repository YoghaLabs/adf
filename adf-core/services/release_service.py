"""ReleaseService — orchestrates ReleaseManager."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from distribution.release_manager import ReleaseManager
from services.contracts import BaseService, ServiceContext, ServiceMetadata, ServiceResult


class ReleaseService(BaseService):
    """Service facade over ReleaseManager."""

    metadata = ServiceMetadata(
        name="release",
        version="0.12.0",
        description="Release management service",
        service_type="release",
    )

    def __init__(self, manager: ReleaseManager) -> None:
        super().__init__()
        self.manager = manager

    def on_boot(self, context: ServiceContext) -> ServiceResult:
        return ServiceResult.success(message="release service ready")

    def channels(self) -> ServiceResult:
        return ServiceResult.success({"channels": self.manager.channels()})

    def list(self, *, channel: str | None = None) -> ServiceResult:
        rows = self.manager.list_releases(channel=channel)
        return ServiceResult.success({"releases": rows, "count": len(rows)})

    def create(
        self,
        source: Path | str,
        *,
        version: str,
        channel: str = "alpha",
        name: str = "adf",
        notes: str = "",
        kinds: list[str] | None = None,
    ) -> ServiceResult:
        result = self.manager.create_release(
            source,
            name=name,
            version=version,
            channel=channel,
            notes=notes,
            kinds=kinds,
        )
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def publish(self, version: str, *, channel: str = "alpha") -> ServiceResult:
        result = self.manager.publish_release(version, channel=channel)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def promote(
        self,
        version: str,
        *,
        source_channel: str,
        target_channel: str,
    ) -> ServiceResult:
        result = self.manager.promote_channel(
            version, source_channel=source_channel, target_channel=target_channel
        )
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def archive(self, version: str, *, channel: str = "alpha") -> ServiceResult:
        result = self.manager.archive_release(version, channel=channel)
        return ServiceResult(ok=bool(result.get("ok")), data=result)
