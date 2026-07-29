"""SDK runtime facade."""

from __future__ import annotations

from typing import Any

from services.runtime_service import RuntimeService


class RuntimeAPI:
    """Public runtime operations."""

    def __init__(self, service: RuntimeService) -> None:
        self._service = service

    def boot(self) -> dict[str, Any]:
        return self._service.boot_runtime().to_dict()

    def doctor(self) -> dict[str, Any]:
        return self._service.doctor().to_dict()

    def status(self) -> dict[str, Any]:
        return self._service.status().to_dict()

    def version(self) -> dict[str, Any]:
        return self._service.version().to_dict()

    def resume(self) -> dict[str, Any]:
        return self._service.resume().to_dict()
