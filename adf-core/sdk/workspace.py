"""SDK workspace facade (Studio-ready)."""

from __future__ import annotations

from typing import Any

from services.workspace_service import WorkspaceService


class WorkspaceAPI:
    """Public workspace layout/readiness operations."""

    def __init__(self, service: WorkspaceService) -> None:
        self._service = service

    def describe(self) -> dict[str, Any]:
        return self._service.describe().to_dict()

    def readiness(self) -> dict[str, Any]:
        return self._service.readiness().to_dict()
