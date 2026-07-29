"""In-memory component and plugin registry."""

from __future__ import annotations

from typing import Any

from runtime.exceptions import AdfRegistryError


class Registry:
    """Register and look up named runtime components and plugins.

    Public API: ``register``, ``find``, ``remove``, ``list``,
    plus ``register_plugin`` / ``list_plugins`` for plugin entries.
    """

    def __init__(self) -> None:
        """Create an empty registry."""
        self._items: dict[str, Any] = {}
        self._plugins: dict[str, Any] = {}

    def register(self, name: str, component: Any) -> None:
        """Register a component under ``name``."""
        key = name.strip()
        if not key:
            raise AdfRegistryError("Component name must be non-empty")
        if key in self._items:
            raise AdfRegistryError(f"Component already registered: {key}")
        self._items[key] = component

    def register_plugin(self, name: str, plugin: Any) -> None:
        """Register a plugin object under the plugin namespace."""
        key = name.strip()
        if not key:
            raise AdfRegistryError("Plugin name must be non-empty")
        if key in self._plugins:
            raise AdfRegistryError(f"Plugin already registered: {key}")
        self._plugins[key] = plugin
        # Also expose under plugin:<name> in the generic map when free.
        alias = f"plugin:{key}"
        if alias not in self._items:
            self._items[alias] = plugin

    def find(self, name: str) -> Any:
        """Return a registered component."""
        key = name.strip()
        if key in self._plugins:
            return self._plugins[key]
        if key not in self._items:
            raise AdfRegistryError(f"Component not found: {key}")
        return self._items[key]

    def remove(self, name: str) -> None:
        """Remove a registered component or plugin."""
        key = name.strip()
        if key in self._plugins:
            del self._plugins[key]
            self._items.pop(f"plugin:{key}", None)
            return
        if key not in self._items:
            raise AdfRegistryError(f"Component not found: {key}")
        del self._items[key]

    def list(self) -> list[str]:
        """Return registered component names sorted alphabetically."""
        return sorted(self._items.keys())

    def list_plugins(self) -> list[str]:
        """Return registered plugin names."""
        return sorted(self._plugins.keys())
