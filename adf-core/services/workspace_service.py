"""WorkspaceService — stable Studio-oriented workspace API."""

from __future__ import annotations

from pathlib import Path

from engine.runtime_engine import RuntimeEngine
from runtime.constants import LOCKED_TOP_LEVEL
from services.contracts import BaseService, ServiceContext, ServiceMetadata, ServiceResult


class WorkspaceService(BaseService):
    """Describe the ADF workspace layout for Studio and SDK clients."""

    metadata = ServiceMetadata(
        name="workspace",
        version="0.10.0",
        description="Workspace layout and readiness service",
        service_type="workspace",
    )

    def __init__(self, repo_root: Path | str, engine: RuntimeEngine) -> None:
        super().__init__()
        self.repo_root = Path(repo_root)
        self.engine = engine

    def on_boot(self, context: ServiceContext) -> ServiceResult:
        return ServiceResult.success(message="workspace service ready")

    def describe(self) -> ServiceResult:
        """Return locked folder presence and bootstrap layout report."""
        present: dict[str, bool] = {}
        for name in LOCKED_TOP_LEVEL:
            present[name] = (self.repo_root / name).exists()
        layout = self.engine.bootstrap.verify_layout()
        return ServiceResult.success(
            {
                "repo_root": str(self.repo_root),
                "locked_folders": present,
                "layout": layout,
            }
        )

    def readiness(self) -> ServiceResult:
        """Studio readiness: layout + doctor summary."""
        doctor = self.engine.doctor()
        describe = self.describe().data
        return ServiceResult(
            ok=bool(doctor.get("ok")),
            data={"doctor": doctor, "workspace": describe},
        )
