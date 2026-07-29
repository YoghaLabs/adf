"""RuntimeEngine orchestrates ADF boot via PluginManager and events/hooks."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from core.checkpoint_manager import CheckpointManager
from core.session_manager import SessionManager
from core.state_manager import StateManager
from engine.bootstrap_engine import BootstrapEngine
from engine.context_engine import ContextEngine
from engine.memory_engine import MemoryEngine
from events.bus import ON_BOOT, ON_LOAD, EventBus
from extensions.api import ExtensionAPI
from hooks.registry import AFTER_BOOT, BEFORE_BOOT, HookRegistry
from plugins.builtin import BUILTIN_PLUGIN_FACTORIES
from plugins.manager import PluginManager
from registry.registry import Registry
from runtime.config import RuntimeConfig
from runtime.constants import ENGINE_BUILD, PACKAGE_VERSION


class RuntimeEngine:
    """Top-level Runtime Engine facade (plugin-based from BUILD-006).

    Concrete plugin classes are never instantiated here — PluginManager
    discovers factories and loads plugins through contracts.
    """

    def __init__(self, repo_root: Path | str) -> None:
        """Create engines, buses, and discover built-in plugins."""
        self.config = RuntimeConfig.from_repo_root(repo_root)
        self.state = StateManager(self.config.repo_root)
        self.sessions = SessionManager(self.config.repo_root)
        self.checkpoints = CheckpointManager(self.config.repo_root)
        self.context = ContextEngine(self.config.repo_root)
        self.memory = MemoryEngine(self.config.repo_root)
        self.bootstrap = BootstrapEngine(self.config.repo_root)

        self.registry = Registry()
        self.events = EventBus()
        self.hooks = HookRegistry()
        self.plugins = PluginManager()
        self.extensions = ExtensionAPI(
            repo_root=self.config.repo_root,
            plugin_manager=self.plugins,
            event_bus=self.events,
            hooks=self.hooks,
        )
        # Publish only safe services — not RuntimeEngine itself.
        self.extensions.publish_service("state", self.state)
        self.extensions.publish_service("context", self.context)
        self.extensions.publish_service("memory", self.memory)
        self.extensions.publish_service("bootstrap", self.bootstrap)
        self.extensions.publish_service("registry", self.registry)

        state = self.state.load()
        plugin_context = self.extensions.build_context(
            build=str(state.get("build") or ENGINE_BUILD),
            version=str(state.get("version") or PACKAGE_VERSION),
            branch=str(state.get("branch") or "develop"),
        )
        self.plugins.set_context(plugin_context)
        self.plugins.discover(BUILTIN_PLUGIN_FACTORIES)
        for row in self.plugins.list():
            self.registry.register_plugin(row["name"], self.plugins.get(row["name"]))

    def boot(self) -> dict[str, Any]:
        """Run boot with hooks/events and plugin loading via PluginManager."""
        self.hooks.run(BEFORE_BOOT, engine="runtime")
        self.events.publish(ON_BOOT, {"phase": "start"})

        bootstrap_report = self.bootstrap.verify_layout()
        state = self.state.load()
        errors = self.state.validate(state)

        loaded = self.plugins.load_enabled()
        self.events.publish(ON_LOAD, {"plugins": loaded})

        session = self.sessions.create(
            build=str(state.get("build") or ENGINE_BUILD),
            operator_state="RESTORE",
        )

        report = {
            "ok": bootstrap_report["ok"] and not errors,
            "package_version": PACKAGE_VERSION,
            "engine_build": ENGINE_BUILD,
            "state": state,
            "validation_errors": errors,
            "bootstrap": bootstrap_report,
            "session_id": session["id"],
            "plugins_loaded": loaded,
        }
        self.hooks.run(AFTER_BOOT, report=report)
        self.events.publish(ON_BOOT, {"phase": "complete", "ok": report["ok"]})
        return report

    def status(self) -> dict[str, Any]:
        """Return current derived/persisted state and plugin summary."""
        state = self.state.load()
        return {
            "state": state,
            "validation_errors": self.state.validate(state),
            "package_version": PACKAGE_VERSION,
            "plugins": self.plugins.list(),
        }

    def doctor(self) -> dict[str, Any]:
        """Run health checks for locked layout, SSOT, and plugins."""
        layout = self.bootstrap.verify_layout()
        state = self.state.load()
        errors = self.state.validate(state)
        plugin_errors = self.plugins.validate()
        plugin_ok = all(not errs for errs in plugin_errors.values())
        return {
            "ok": layout["ok"] and not errors and plugin_ok,
            "layout": layout,
            "validation_errors": errors,
            "plugin_validation": plugin_errors,
        }
