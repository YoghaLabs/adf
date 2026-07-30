"""SDK package facade."""

from __future__ import annotations

from typing import Any

from services.package_service import PackageService


class PackageAPI:
    """Public APM operations."""

    def __init__(self, service: PackageService) -> None:
        self._service = service

    def install(self, package_id: str, *, overwrite: bool = False) -> dict[str, Any]:
        return self._service.install(package_id, overwrite=overwrite).to_dict()

    def remove(self, package_id: str) -> dict[str, Any]:
        return self._service.remove(package_id).to_dict()

    def update(self, package_id: str) -> dict[str, Any]:
        return self._service.update(package_id).to_dict()

    def search(self, query: str = "", *, package_type: str | None = None) -> dict[str, Any]:
        return self._service.search(query, package_type=package_type).to_dict()

    def list(self, *, installed: bool = False) -> dict[str, Any]:
        return self._service.list(installed=installed).to_dict()

    def verify(self, package_id: str | None = None) -> dict[str, Any]:
        return self._service.verify(package_id).to_dict()

    def cache_stats(self) -> dict[str, Any]:
        return self._service.cache_stats().to_dict()

    def cache_clear(self) -> dict[str, Any]:
        return self._service.cache_clear().to_dict()
