"""SDK publisher facade."""

from __future__ import annotations

from typing import Any

from services.publisher_service import PublisherService


class PublisherClient:
    """Public publisher operations for Studio/SDK."""

    def __init__(self, service: PublisherService) -> None:
        self._service = service

    def list(self) -> dict[str, Any]:
        return self._service.list().to_dict()

    def get(self, publisher_id: str) -> dict[str, Any]:
        return self._service.get(publisher_id).to_dict()

    def publish(self, source: str, *, publisher_id: str = "YoghaLabs", overwrite: bool = False) -> dict[str, Any]:
        return self._service.publish(source, publisher_id=publisher_id, overwrite=overwrite).to_dict()

    def packages(self, publisher_id: str) -> dict[str, Any]:
        return self._service.packages(publisher_id).to_dict()
