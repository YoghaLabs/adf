"""Plugin manager — discovery, registration, load lifecycle."""

from __future__ import annotations

from pathlib import Path
from typing import Any, Callable, Iterable

from contracts.plugin import BasePlugin, PluginConfig, PluginContext
from runtime.exceptions import AdfError


class AdfPluginError(AdfError):
    """Plugin system failures."""


PluginFactory = Callable[[], BasePlugin]


class PluginManager:
    """Manage plugin lifecycle without RuntimeEngine knowing concrete classes.

    Responsibilities: discover, register, unregister, load, unload, reload,
    list, validate.
    """

    def __init__(self) -> None:
        """Create an empty plugin manager."""
        self._plugins: dict[str, BasePlugin] = {}
        self._factories: dict[str, PluginFactory] = {}
        self._disabled: set[str] = set()
        self._context: PluginContext | None = None

    def set_context(self, context: PluginContext) -> None:
        """Publish the shared plugin context used on load/register."""
        self._context = context

    def discover(self, factories: Iterable[PluginFactory]) -> list[str]:
        """Discover plugins from factories and register them (unloaded).

        Returns:
            Names of discovered plugins.
        """
        names: list[str] = []
        for factory in factories:
            plugin = factory()
            self.register(plugin, factory=factory)
            names.append(plugin.name)
        return names

    def register(
        self,
        plugin: BasePlugin,
        *,
        factory: PluginFactory | None = None,
    ) -> None:
        """Register a plugin instance.

        Raises:
            AdfPluginError: If the name is already registered.
        """
        name = plugin.name
        if name in self._plugins:
            raise AdfPluginError(f"Plugin already registered: {name}")
        errors = plugin.validate()
        if errors:
            raise AdfPluginError(f"Invalid plugin {name}: {'; '.join(errors)}")
        self._plugins[name] = plugin
        if factory is not None:
            self._factories[name] = factory
        if self._context is not None:
            plugin.on_register(self._context)

    def unregister(self, name: str) -> None:
        """Unload (if needed) and remove a plugin."""
        plugin = self._require(name)
        if plugin.is_loaded:
            plugin.on_unload()
        del self._plugins[name]
        self._factories.pop(name, None)
        self._disabled.discard(name)

    def load(self, name: str) -> BasePlugin:
        """Load a registered plugin.

        Raises:
            AdfPluginError: If disabled, missing, or context unset.
        """
        if name in self._disabled:
            raise AdfPluginError(f"Plugin is disabled: {name}")
        plugin = self._require(name)
        if self._context is None:
            raise AdfPluginError("PluginContext is not set")
        if not plugin.is_loaded:
            plugin.on_load(self._context)
        return plugin

    def unload(self, name: str) -> None:
        """Unload a loaded plugin."""
        plugin = self._require(name)
        if plugin.is_loaded:
            plugin.on_unload()

    def reload(self, name: str) -> BasePlugin:
        """Unload and load a plugin again (recreate via factory when available)."""
        factory = self._factories.get(name)
        was_disabled = name in self._disabled
        plugin = self._require(name)
        if plugin.is_loaded:
            plugin.on_unload()
        if factory is not None:
            new_plugin = factory()
            errors = new_plugin.validate()
            if errors:
                raise AdfPluginError(f"Invalid plugin {name}: {'; '.join(errors)}")
            self._plugins[name] = new_plugin
            self._factories[name] = factory
            if self._context is not None:
                new_plugin.on_register(self._context)
            if was_disabled:
                self._disabled.add(name)
                new_plugin.config.enabled = False
                return new_plugin
            return self.load(name)
        if was_disabled:
            return plugin
        return self.load(name)

    def list(self) -> list[dict[str, Any]]:
        """List registered plugins with status."""
        rows: list[dict[str, Any]] = []
        for name, plugin in sorted(self._plugins.items()):
            rows.append(
                {
                    "name": name,
                    "type": plugin.metadata.plugin_type,
                    "version": plugin.metadata.version,
                    "loaded": plugin.is_loaded,
                    "enabled": name not in self._disabled and plugin.config.enabled,
                    "description": plugin.metadata.description,
                }
            )
        return rows

    def validate(self, name: str | None = None) -> dict[str, list[str]]:
        """Validate one or all plugins."""
        targets = [name] if name else list(self._plugins)
        result: dict[str, list[str]] = {}
        for item in targets:
            plugin = self._require(item)
            result[item] = plugin.validate()
        return result

    def enable(self, name: str) -> None:
        """Enable a previously disabled plugin."""
        self._require(name)
        self._disabled.discard(name)
        self._plugins[name].config.enabled = True

    def disable(self, name: str) -> None:
        """Disable a plugin (unload if loaded)."""
        plugin = self._require(name)
        if plugin.is_loaded:
            plugin.on_unload()
        self._disabled.add(name)
        plugin.config.enabled = False

    def get(self, name: str) -> BasePlugin:
        """Return a registered plugin instance."""
        return self._require(name)

    def info(self, name: str) -> dict[str, Any]:
        """Return detailed plugin info."""
        plugin = self._require(name)
        return {
            "name": plugin.metadata.name,
            "version": plugin.metadata.version,
            "type": plugin.metadata.plugin_type,
            "description": plugin.metadata.description,
            "author": plugin.metadata.author,
            "loaded": plugin.is_loaded,
            "enabled": name not in self._disabled and plugin.config.enabled,
            "config": dict(plugin.config.options),
        }

    def load_enabled(self) -> list[str]:
        """Load all enabled plugins; return loaded names."""
        loaded: list[str] = []
        for name, plugin in self._plugins.items():
            if name in self._disabled or not plugin.config.enabled:
                continue
            self.load(name)
            loaded.append(name)
        return loaded

    def _require(self, name: str) -> BasePlugin:
        if name not in self._plugins:
            raise AdfPluginError(f"Plugin not found: {name}")
        return self._plugins[name]
