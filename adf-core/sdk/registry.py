"""SDK registry facade."""

from __future__ import annotations

from typing import Any

from services.registry_service import RegistryService


class RegistryClient:
    """Public registry operations for Studio/SDK."""

    def __init__(self, service: RegistryService) -> None:
        self._service = service

    def status(self) -> dict[str, Any]:
        return self._service.status().to_dict()

    def list(self) -> dict[str, Any]:
        return self._service.list().to_dict()

    def search(self, query: str = "", **kwargs: Any) -> dict[str, Any]:
        return self._service.search(query, **kwargs).to_dict()

    def providers(self) -> dict[str, Any]:
        return self._service.providers().to_dict()

    def verify(self, package_id: str | None = None) -> dict[str, Any]:
        return self._service.verify(package_id).to_dict()

    def sync(self, *, incremental: bool = True) -> dict[str, Any]:
        return self._service.sync(incremental=incremental).to_dict()

    def install(self, package_id: str, *, overwrite: bool = False) -> dict[str, Any]:
        return self._service.install(package_id, overwrite=overwrite).to_dict()

    def publish(self, source: str, *, publisher_id: str = "YoghaLabs", overwrite: bool = False) -> dict[str, Any]:
        return self._service.publish(source, publisher_id=publisher_id, overwrite=overwrite).to_dict()
