"""SDK template facade."""

from __future__ import annotations

from pathlib import Path
from typing import Any, Mapping

from services.template_service import TemplateService


class TemplateAPI:
    """Public template operations."""

    def __init__(self, service: TemplateService) -> None:
        self._service = service

    def list(self) -> dict[str, Any]:
        return self._service.list().to_dict()

    def discover(self, root: Path | str | None = None) -> dict[str, Any]:
        return self._service.discover(root).to_dict()

    def validate(self, target: Path | str) -> dict[str, Any]:
        return self._service.validate(target).to_dict()

    def render(
        self,
        name: str,
        destination: Path | str,
        overrides: Mapping[str, Any] | None = None,
        *,
        overwrite: bool = False,
    ) -> dict[str, Any]:
        return self._service.render(
            name, destination, overrides, overwrite=overwrite
        ).to_dict()
