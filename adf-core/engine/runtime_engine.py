"""RuntimeEngine orchestrates ADF boot and high-level workflow entry."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from core.checkpoint_manager import CheckpointManager
from core.session_manager import SessionManager
from core.state_manager import StateManager
from engine.bootstrap_engine import BootstrapEngine
from engine.context_engine import ContextEngine
from engine.memory_engine import MemoryEngine
from runtime.config import RuntimeConfig
from runtime.constants import ENGINE_BUILD, PACKAGE_VERSION


class RuntimeEngine:
    """Top-level Runtime Engine facade for BUILD-005.

    Public API focuses on boot, status, and wiring subordinate engines.
    """

    def __init__(self, repo_root: Path | str) -> None:
        """Create engines and managers for ``repo_root``."""
        self.config = RuntimeConfig.from_repo_root(repo_root)
        self.state = StateManager(self.config.repo_root)
        self.sessions = SessionManager(self.config.repo_root)
        self.checkpoints = CheckpointManager(self.config.repo_root)
        self.context = ContextEngine(self.config.repo_root)
        self.memory = MemoryEngine(self.config.repo_root)
        self.bootstrap = BootstrapEngine(self.config.repo_root)

    def boot(self) -> dict[str, Any]:
        """Run a minimal boot: validate layout, load state, open session.

        Returns:
            Boot report with identity, validation errors, and session id.
        """
        bootstrap_report = self.bootstrap.verify_layout()
        state = self.state.load()
        errors = self.state.validate(state)
        session = self.sessions.create(
            build=str(state.get("build") or ENGINE_BUILD),
            operator_state="RESTORE",
        )
        return {
            "ok": bootstrap_report["ok"] and not errors,
            "package_version": PACKAGE_VERSION,
            "engine_build": ENGINE_BUILD,
            "state": state,
            "validation_errors": errors,
            "bootstrap": bootstrap_report,
            "session_id": session["id"],
        }

    def status(self) -> dict[str, Any]:
        """Return current derived/persisted state and validation summary."""
        state = self.state.load()
        return {
            "state": state,
            "validation_errors": self.state.validate(state),
            "package_version": PACKAGE_VERSION,
        }

    def doctor(self) -> dict[str, Any]:
        """Run health checks for locked layout and SSOT presence."""
        layout = self.bootstrap.verify_layout()
        state = self.state.load()
        errors = self.state.validate(state)
        return {
            "ok": layout["ok"] and not errors,
            "layout": layout,
            "validation_errors": errors,
        }
