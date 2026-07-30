"""MarketplaceService — orchestrates MarketplaceManager."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from registry.marketplace import MarketplaceManager
from services.contracts import BaseService, ServiceContext, ServiceMetadata, ServiceResult


class MarketplaceService(BaseService):
    """Service facade over MarketplaceManager (presentation + install delegation)."""

    metadata = ServiceMetadata(
        name="marketplace",
        version="0.11.0",
        description="Marketplace presentation service",
        service_type="marketplace",
    )

    def __init__(self, manager: MarketplaceManager) -> None:
        super().__init__()
        self.manager = manager

    def on_boot(self, context: ServiceContext) -> ServiceResult:
        return ServiceResult.success(message="marketplace service ready")

    def browse(self) -> ServiceResult:
        items = [i.to_dict() for i in self.manager.browse()]
        return ServiceResult.success({"items": items, "count": len(items)})

    def search(self, query: str = "", **kwargs: Any) -> ServiceResult:
        items = [i.to_dict() for i in self.manager.search.search(query, **kwargs)]
        return ServiceResult.success({"items": items, "count": len(items)})

    def featured(self) -> ServiceResult:
        return ServiceResult.success(self.manager.featured_shelf().to_dict())

    def popular(self) -> ServiceResult:
        items = [i.to_dict() for i in self.manager.search.popular()]
        return ServiceResult.success({"items": items, "count": len(items)})

    def newest(self) -> ServiceResult:
        items = [i.to_dict() for i in self.manager.search.newest()]
        return ServiceResult.success({"items": items, "count": len(items)})

    def categories(self) -> ServiceResult:
        cats = [c.to_dict() for c in self.manager.categories()]
        return ServiceResult.success({"categories": cats})

    def install(self, package_id: str, *, overwrite: bool = False) -> ServiceResult:
        result = self.manager.install(package_id, overwrite=overwrite)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def update(self, package_id: str) -> ServiceResult:
        result = self.manager.update(package_id)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def publish(
        self,
        source: Path | str,
        *,
        publisher_id: str = "YoghaLabs",
        overwrite: bool = False,
    ) -> ServiceResult:
        result = self.manager.publish(str(source), publisher_id=publisher_id, overwrite=overwrite)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def favorite(self, package_id: str) -> ServiceResult:
        return ServiceResult.success(self.manager.favorite(package_id))

    def favorites(self) -> ServiceResult:
        items = [i.to_dict() for i in self.manager.favorites()]
        return ServiceResult.success({"items": items, "count": len(items)})

    def collections(self) -> ServiceResult:
        return ServiceResult.success({"collections": self.manager.collections()})

    def studio(self) -> ServiceResult:
        return ServiceResult.success(self.manager.studio_api())
