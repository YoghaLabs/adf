"""GeneratorService — orchestrates GeneratorManager."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from generator.manager import GeneratorManager
from services.contracts import BaseService, ServiceContext, ServiceMetadata, ServiceResult


class GeneratorService(BaseService):
    """Service facade over GeneratorManager."""

    metadata = ServiceMetadata(
        name="generator",
        version="0.10.0",
        description="Project generation service",
        service_type="generator",
    )

    def __init__(self, manager: GeneratorManager) -> None:
        super().__init__()
        self.manager = manager

    def on_boot(self, context: ServiceContext) -> ServiceResult:
        return ServiceResult.success(message="generator ready")

    def init_project(self, name: str, destination: str | Path = ".", **kwargs: Any) -> ServiceResult:
        """Initialize a project via GeneratorManager."""
        result = self.manager.init_project(name, destination, **kwargs)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def generate(self, manifest: dict[str, Any], **kwargs: Any) -> ServiceResult:
        """Generate from a manifest mapping."""
        result = self.manager.generate(manifest, **kwargs)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def dry_run(self, manifest: dict[str, Any]) -> ServiceResult:
        """Preview generation."""
        result = self.manager.dry_run(manifest)
        return ServiceResult(ok=bool(result.get("ok")), data=result)

    def validate(self, manifest: dict[str, Any]) -> ServiceResult:
        """Validate generation inputs."""
        result = self.manager.validate(manifest)
        return ServiceResult(ok=bool(result.get("ok")), data=result)
