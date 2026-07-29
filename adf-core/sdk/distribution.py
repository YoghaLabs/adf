"""SDK distribution facade."""

from __future__ import annotations

from typing import Any

from services.distribution_service import DistributionService


class DistributionClient:
    """Public distribution operations."""

    def __init__(self, service: DistributionService) -> None:
        self._service = service

    def status(self) -> dict[str, Any]:
        return self._service.status().to_dict()

    def package(self, source: str, *, name: str, version: str, kind: str = "zip") -> dict[str, Any]:
        return self._service.package(source, name=name, version=version, kind=kind).to_dict()

    def bundle(self, source: str, *, name: str, version: str, kind: str = "portable") -> dict[str, Any]:
        return self._service.bundle(source, name=name, version=version, kind=kind).to_dict()

    def offline_snapshot(self, *, incremental: bool = True) -> dict[str, Any]:
        return self._service.offline_snapshot(incremental=incremental).to_dict()
