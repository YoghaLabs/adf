"""RuntimeService — orchestrates RuntimeEngine."""

from __future__ import annotations

from typing import Any

from engine.runtime_engine import RuntimeEngine
from services.contracts import BaseService, ServiceContext, ServiceMetadata, ServiceResult


class RuntimeService(BaseService):
    """Service facade over RuntimeEngine."""

    metadata = ServiceMetadata(
        name="runtime",
        version="0.10.0",
        description="Runtime engine orchestration service",
        service_type="runtime",
    )

    def __init__(self, engine: RuntimeEngine) -> None:
        """Bind to an existing RuntimeEngine."""
        super().__init__()
        self.engine = engine

    def on_boot(self, context: ServiceContext) -> ServiceResult:
        return ServiceResult.success({"repo_root": str(context.repo_root)}, message="runtime ready")

    def boot_runtime(self) -> ServiceResult:
        """Boot the underlying runtime engine."""
        report = self.engine.boot()
        return ServiceResult(ok=bool(report.get("ok")), data=report)

    def doctor(self) -> ServiceResult:
        """Run doctor checks."""
        report = self.engine.doctor()
        return ServiceResult(ok=bool(report.get("ok")), data=report)

    def status(self) -> ServiceResult:
        """Return runtime status."""
        return ServiceResult.success(self.engine.status())

    def version(self) -> ServiceResult:
        """Return package version info."""
        from runtime.constants import PACKAGE_NAME, PACKAGE_VERSION

        return ServiceResult.success({"package": PACKAGE_NAME, "version": PACKAGE_VERSION})

    def resume(self) -> ServiceResult:
        """Return resume protocol skeleton (state + checkpoint + plugins)."""
        from runtime.exceptions import AdfError

        state = self.engine.state.load()
        checkpoint = None
        try:
            checkpoint = self.engine.checkpoints.restore()
        except AdfError:
            checkpoint = None
        return ServiceResult.success(
            {
                "message": "Resume skeleton: run full AI Resume Protocol via .adf docs",
                "state": state,
                "checkpoint": checkpoint,
                "plugins": self.engine.plugins.list(),
            }
        )
