"""Typing protocols for plugin-related components."""

from __future__ import annotations

from typing import Any, Protocol, runtime_checkable

from contracts.plugin import PluginContext, PluginMetadata


@runtime_checkable
class PluginProtocol(Protocol):
    """Structural protocol for plugin-like objects."""

    metadata: PluginMetadata

    def validate(self) -> list[str]:
        """Return validation errors."""

    def on_load(self, context: PluginContext) -> None:
        """Load the plugin."""

    def on_unload(self) -> None:
        """Unload the plugin."""


@runtime_checkable
class EventHandlerProtocol(Protocol):
    """Structural protocol for event handlers."""

    def __call__(self, event: Any) -> None:
        """Handle an event."""
