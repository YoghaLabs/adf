"""ProjectService — project identity/status for Studio/SDK."""

from __future__ import annotations

from pathlib import Path

from core.state_manager import StateManager
from services.contracts import BaseService, ServiceContext, ServiceMetadata, ServiceResult


class ProjectService(BaseService):
    """Expose project identity and state for Studio/SDK consumers."""

    metadata = ServiceMetadata(
        name="project",
        version="0.10.0",
        description="Project identity and state service",
        service_type="project",
    )

    def __init__(self, repo_root: Path | str, state: StateManager) -> None:
        super().__init__()
        self.repo_root = Path(repo_root)
        self.state = state

    def on_boot(self, context: ServiceContext) -> ServiceResult:
        return ServiceResult.success(message="project service ready")

    def info(self) -> ServiceResult:
        """Return VERSION + state snapshot."""
        version_path = self.repo_root / "VERSION"
        version_text = (
            version_path.read_text(encoding="utf-8") if version_path.is_file() else ""
        )
        state = self.state.load()
        return ServiceResult.success(
            {
                "repo_root": str(self.repo_root),
                "version_file": version_text,
                "state": state,
                "validation_errors": self.state.validate(state),
            }
        )

    def state(self) -> ServiceResult:
        """Return persisted project state only."""
        state = self.state.load()
        return ServiceResult.success({"state": state})
