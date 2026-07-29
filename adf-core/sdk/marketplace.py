"""SDK marketplace facade."""

from __future__ import annotations

from typing import Any

from services.marketplace_service import MarketplaceService


class MarketplaceClient:
    """Public marketplace operations for Studio/SDK."""

    def __init__(self, service: MarketplaceService) -> None:
        self._service = service

    def browse(self) -> dict[str, Any]:
        return self._service.browse().to_dict()

    def search(self, query: str = "", **kwargs: Any) -> dict[str, Any]:
        return self._service.search(query, **kwargs).to_dict()

    def featured(self) -> dict[str, Any]:
        return self._service.featured().to_dict()

    def popular(self) -> dict[str, Any]:
        return self._service.popular().to_dict()

    def install(self, package_id: str, *, overwrite: bool = False) -> dict[str, Any]:
        return self._service.install(package_id, overwrite=overwrite).to_dict()

    def update(self, package_id: str) -> dict[str, Any]:
        return self._service.update(package_id).to_dict()

    def publish(self, source: str, *, publisher_id: str = "YoghaLabs", overwrite: bool = False) -> dict[str, Any]:
        return self._service.publish(source, publisher_id=publisher_id, overwrite=overwrite).to_dict()

    def favorites(self) -> dict[str, Any]:
        return self._service.favorites().to_dict()

    def favorite(self, package_id: str) -> dict[str, Any]:
        return self._service.favorite(package_id).to_dict()

    def collections(self) -> dict[str, Any]:
        return self._service.collections().to_dict()

    def studio(self) -> dict[str, Any]:
        return self._service.studio().to_dict()
