"""SDK generator facade."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from services.generator_service import GeneratorService


class GeneratorAPI:
    """Public project generation operations."""

    def __init__(self, service: GeneratorService) -> None:
        self._service = service

    def init(
        self,
        name: str,
        destination: str | Path = ".",
        **kwargs: Any,
    ) -> dict[str, Any]:
        return self._service.init_project(name, destination, **kwargs).to_dict()

    def generate(self, manifest: dict[str, Any], **kwargs: Any) -> dict[str, Any]:
        return self._service.generate(manifest, **kwargs).to_dict()

    def dry_run(self, manifest: dict[str, Any]) -> dict[str, Any]:
        return self._service.dry_run(manifest).to_dict()

    def validate(self, manifest: dict[str, Any]) -> dict[str, Any]:
        return self._service.validate(manifest).to_dict()
