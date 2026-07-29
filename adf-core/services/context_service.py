"""ContextService — orchestrates ContextEngine."""

from __future__ import annotations

from engine.context_engine import ContextEngine
from services.contracts import BaseService, ServiceContext, ServiceMetadata, ServiceResult


class ContextService(BaseService):
    """Service facade over ContextEngine."""

    metadata = ServiceMetadata(
        name="context",
        version="0.10.0",
        description="Context pack assembly service",
        service_type="context",
    )

    def __init__(self, engine: ContextEngine) -> None:
        super().__init__()
        self.engine = engine

    def on_boot(self, context: ServiceContext) -> ServiceResult:
        return ServiceResult.success(message="context service ready")

    def assemble(self, pack: str = "standard") -> ServiceResult:
        payload = self.engine.assemble(pack)
        return ServiceResult.success(
            {
                "pack": payload["pack"],
                "summary": payload["summary"],
                "files": list(payload["files"].keys()),
                "missing": payload["missing"],
            }
        )
