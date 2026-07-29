"""SDK plugin facade."""

from __future__ import annotations

from typing import Any

from services.plugin_service import PluginService


class PluginAPI:
    """Public plugin operations."""

    def __init__(self, service: PluginService) -> None:
        self._service = service

    def list(self) -> dict[str, Any]:
        return self._service.list().to_dict()

    def info(self, name: str) -> dict[str, Any]:
        return self._service.info(name).to_dict()

    def enable(self, name: str) -> dict[str, Any]:
        return self._service.enable(name).to_dict()

    def disable(self, name: str) -> dict[str, Any]:
        return self._service.disable(name).to_dict()

    def validate(self, name: str | None = None) -> dict[str, Any]:
        return self._service.validate(name).to_dict()
