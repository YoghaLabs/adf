"""SDK release facade."""

from __future__ import annotations

from typing import Any

from services.release_service import ReleaseService


class ReleaseClient:
    """Public release management operations."""

    def __init__(self, service: ReleaseService) -> None:
        self._service = service

    def channels(self) -> dict[str, Any]:
        return self._service.channels().to_dict()

    def list(self, *, channel: str | None = None) -> dict[str, Any]:
        return self._service.list(channel=channel).to_dict()

    def create(
        self,
        source: str,
        *,
        version: str,
        channel: str = "alpha",
        name: str = "adf",
        notes: str = "",
        kinds: list[str] | None = None,
    ) -> dict[str, Any]:
        return self._service.create(
            source, version=version, channel=channel, name=name, notes=notes, kinds=kinds
        ).to_dict()

    def publish(self, version: str, *, channel: str = "alpha") -> dict[str, Any]:
        return self._service.publish(version, channel=channel).to_dict()

    def promote(self, version: str, *, source_channel: str, target_channel: str) -> dict[str, Any]:
        return self._service.promote(
            version, source_channel=source_channel, target_channel=target_channel
        ).to_dict()

    def archive(self, version: str, *, channel: str = "alpha") -> dict[str, Any]:
        return self._service.archive(version, channel=channel).to_dict()
