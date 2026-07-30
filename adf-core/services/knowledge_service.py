"""KnowledgeService — orchestrates KnowledgeEngine."""

from __future__ import annotations

from engine.knowledge_engine import KnowledgeEngine
from services.contracts import BaseService, ServiceContext, ServiceMetadata, ServiceResult


class KnowledgeService(BaseService):
    """Service facade over KnowledgeEngine."""

    metadata = ServiceMetadata(
        name="knowledge",
        version="0.10.0",
        description="Knowledge layer service",
        service_type="knowledge",
    )

    def __init__(self, engine: KnowledgeEngine) -> None:
        super().__init__()
        self.engine = engine

    def on_boot(self, context: ServiceContext) -> ServiceResult:
        return ServiceResult.success(message="knowledge service ready")

    def snapshot(self) -> ServiceResult:
        return ServiceResult.success(self.engine.snapshot())

    def list_adrs(self) -> ServiceResult:
        adrs = self.engine.list_adrs()
        return ServiceResult.success({"adrs": adrs, "count": len(adrs)})
