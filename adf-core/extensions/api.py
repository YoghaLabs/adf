"""Public extension API — the only surface third-party plugins should use."""

from __future__ import annotations

from pathlib import Path
from typing import Any, Callable

from contracts.plugin import (
    AbstractPlugin,
    BasePlugin,
    PluginConfig,
    PluginContext,
    PluginMetadata,
)
from events.bus import Event, EventBus, EventHandler
from hooks.registry import HookRegistry
from plugins.manager import PluginManager


class ExtensionAPI:
    """Stable facade for extensions: contracts, events, hooks, plugin manager.

    Runtime internals (concrete engines/managers) must not be imported by
    third-party plugins. Publish only curated services via ``PluginContext``.
    """

    def __init__(
        self,
        *,
        repo_root: Path,
        plugin_manager: PluginManager,
        event_bus: EventBus,
        hooks: HookRegistry,
        services: dict[str, Any] | None = None,
    ) -> None:
        """Bind extension collaborators."""
        self.repo_root = Path(repo_root).resolve()
        self.plugins = plugin_manager
        self.events = event_bus
        self.hooks = hooks
        self._services = dict(services or {})

    def build_context(self, *, build: str, version: str, branch: str) -> PluginContext:
        """Create a PluginContext with published services only."""
        return PluginContext(
            repo_root=self.repo_root,
            build=build,
            version=version,
            branch=branch,
            services=dict(self._services),
        )

    def publish_service(self, name: str, service: Any) -> None:
        """Publish a safe service for plugins (not RuntimeEngine itself)."""
        self._services[name] = service

    def subscribe(self, event_name: str, handler: EventHandler) -> None:
        """Subscribe to a lifecycle/custom event."""
        self.events.subscribe(event_name, handler)

    def on_hook(self, hook_name: str, handler: Callable[..., Any]) -> None:
        """Register a hook handler."""
        self.hooks.register(hook_name, handler)

    def emit(self, event_name: str, **payload: Any) -> Event:
        """Emit an event through the public bus."""
        return self.events.publish(event_name, payload)


# Re-exports for ``from extensions import ...``
__all__ = [
    "AbstractPlugin",
    "BasePlugin",
    "ExtensionAPI",
    "PluginConfig",
    "PluginContext",
    "PluginMetadata",
    "PluginManager",
]
