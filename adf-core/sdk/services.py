"""SDK service-manager helpers."""

from __future__ import annotations

from typing import Any

from services.service_manager import ServiceManager


class ServicesAPI:
    """Expose ServiceManager operations for advanced/Studio callers."""

    def __init__(self, manager: ServiceManager) -> None:
        self._manager = manager

    def list(self) -> list[dict[str, Any]]:
        return self._manager.list()

    def health(self) -> dict[str, Any]:
        return self._manager.health().to_dict()

    def get(self, name: str) -> Any:
        return self._manager.get(name)

    @property
    def manager(self) -> ServiceManager:
        """Underlying ServiceManager (plugins/Studio may register custom services)."""
        return self._manager
