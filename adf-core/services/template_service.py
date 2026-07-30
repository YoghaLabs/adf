"""TemplateService — orchestrates TemplateManager."""

from __future__ import annotations

from pathlib import Path
from typing import Any, Mapping

from services.contracts import BaseService, ServiceContext, ServiceMetadata, ServiceResult
from templates.engine import TemplateManager


class TemplateService(BaseService):
    """Service facade over TemplateManager."""

    metadata = ServiceMetadata(
        name="template",
        version="0.10.0",
        description="Template engine service",
        service_type="template",
    )

    def __init__(self, manager: TemplateManager) -> None:
        super().__init__()
        self.manager = manager

    def on_boot(self, context: ServiceContext) -> ServiceResult:
        return ServiceResult.success(message="template service ready")

    def list(self) -> ServiceResult:
        rows = self.manager.list()
        return ServiceResult.success({"templates": rows, "count": len(rows)})

    def discover(self, root: Path | str | None = None) -> ServiceResult:
        names = self.manager.discover(root)
        return ServiceResult.success({"discovered": names})

    def validate(self, target: Path | str) -> ServiceResult:
        errors = self.manager.validate(target)
        return ServiceResult(ok=not errors, data={"errors": errors})

    def render(
        self,
        name: str,
        destination: Path | str,
        overrides: Mapping[str, Any] | None = None,
        *,
        overwrite: bool = False,
    ) -> ServiceResult:
        paths = self.manager.render(name, destination, overrides, overwrite=overwrite)
        return ServiceResult.success({"written": [str(p) for p in paths]})
