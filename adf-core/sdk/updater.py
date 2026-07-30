"""SDK updater facade."""

from __future__ import annotations

from typing import Any

from services.updater_service import UpdaterService


class UpdaterClient:
    """Public updater operations."""

    def __init__(self, service: UpdaterService) -> None:
        self._service = service

    def check(self, *, channel: str | None = None) -> dict[str, Any]:
        return self._service.check(channel=channel).to_dict()

    def download(self, version: str, *, channel: str | None = None) -> dict[str, Any]:
        return self._service.download(version, channel=channel).to_dict()

    def apply(self, *, overwrite: bool = True) -> dict[str, Any]:
        return self._service.apply(overwrite=overwrite).to_dict()

    def rollback(self, snapshot_id: str | None = None) -> dict[str, Any]:
        return self._service.rollback(snapshot_id).to_dict()
