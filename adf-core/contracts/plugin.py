"""Plugin and extension contracts for third-party and built-in plugins."""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any


@dataclass(frozen=True)
class PluginMetadata:
    """Immutable metadata describing a plugin."""

    name: str
    version: str
    description: str
    plugin_type: str
    author: str = "YoghaLabs"
    enabled: bool = True


@dataclass
class PluginConfig:
    """Mutable configuration for a plugin instance."""

    options: dict[str, Any] = field(default_factory=dict)
    enabled: bool = True

    def get(self, key: str, default: Any = None) -> Any:
        """Return a config option."""
        return self.options.get(key, default)


@dataclass
class PluginContext:
    """Execution context provided to plugins (no RuntimeEngine internals).

    Third-party plugins should depend only on this context and contracts.
    """

    repo_root: Path
    build: str
    version: str
    branch: str
    services: dict[str, Any] = field(default_factory=dict)

    def service(self, name: str) -> Any:
        """Fetch a published extension service by name."""
        if name not in self.services:
            raise KeyError(f"Unknown extension service: {name}")
        return self.services[name]


class BasePlugin(ABC):
    """Abstract base class all ADF plugins must inherit."""

    metadata: PluginMetadata

    def __init__(self, config: PluginConfig | None = None) -> None:
        """Initialize plugin with optional config."""
        self.config = config or PluginConfig()
        self._loaded = False
        self._context: PluginContext | None = None

    @property
    def name(self) -> str:
        """Plugin unique name from metadata."""
        return self.metadata.name

    @property
    def is_loaded(self) -> bool:
        """Whether the plugin has been loaded."""
        return self._loaded

    @abstractmethod
    def validate(self) -> list[str]:
        """Return validation errors (empty list means valid)."""

    def on_register(self, context: PluginContext) -> None:
        """Called when the plugin is registered."""
        self._context = context

    def on_load(self, context: PluginContext) -> None:
        """Load plugin resources."""
        self._context = context
        self._loaded = True

    def on_unload(self) -> None:
        """Unload plugin resources."""
        self._loaded = False

    def execute(self, action: str, **kwargs: Any) -> dict[str, Any]:
        """Optional action dispatcher for plugin-specific work."""
        return {"plugin": self.name, "action": action, "ok": True, "kwargs": kwargs}


class AbstractPlugin(BasePlugin):
    """Convenience abstract plugin with default validate()."""

    def validate(self) -> list[str]:
        """Validate metadata and enabled flag."""
        errors: list[str] = []
        if not self.metadata.name.strip():
            errors.append("plugin name is empty")
        if not self.metadata.version.strip():
            errors.append("plugin version is empty")
        if not self.metadata.plugin_type.strip():
            errors.append("plugin type is empty")
        return errors
