"""SDK project facade (Studio-ready)."""

from __future__ import annotations

from typing import Any

from services.project_service import ProjectService


class ProjectAPI:
    """Public project identity/status operations."""

    def __init__(self, service: ProjectService) -> None:
        self._service = service

    def info(self) -> dict[str, Any]:
        return self._service.info().to_dict()

    def state(self) -> dict[str, Any]:
        return self._service.state().to_dict()
