"""Built-in ADF plugins."""

from __future__ import annotations

from typing import Any

from contracts.plugin import AbstractPlugin, PluginMetadata


class ContextPlugin(AbstractPlugin):
    """Assists context pack assembly capabilities."""

    metadata = PluginMetadata(
        name="context",
        version="0.6.0",
        description="Context restoration and pack assembly plugin",
        plugin_type="context",
    )

    def execute(self, action: str, **kwargs: Any) -> dict[str, Any]:
        return {
            "plugin": self.name,
            "action": action,
            "ok": True,
            "supports": ["assemble", "restore"],
            "kwargs": kwargs,
        }


class PromptPlugin(AbstractPlugin):
    """Exposes prompt-library related capabilities."""

    metadata = PluginMetadata(
        name="prompt",
        version="0.6.0",
        description="Prompt library integration plugin",
        plugin_type="prompt",
    )


class TemplatePlugin(AbstractPlugin):
    """Template generation extension point."""

    metadata = PluginMetadata(
        name="template",
        version="0.6.0",
        description="Template system plugin (adf-templates)",
        plugin_type="template",
    )


class GeneratorPlugin(AbstractPlugin):
    """Artifact generator extension point."""

    metadata = PluginMetadata(
        name="generator",
        version="0.6.0",
        description="Generator plugin for scaffolds and docs",
        plugin_type="generator",
    )


class AuditPlugin(AbstractPlugin):
    """Audit and integrity checks extension point."""

    metadata = PluginMetadata(
        name="audit",
        version="0.6.0",
        description="Audit plugin for contract and structure checks",
        plugin_type="audit",
    )


class StudioPlugin(AbstractPlugin):
    """Future Studio GUI bridge plugin."""

    metadata = PluginMetadata(
        name="studio",
        version="0.6.0",
        description="ADF Studio integration plugin",
        plugin_type="studio",
    )


class TestingPlugin(AbstractPlugin):
    """Testing harness integration plugin."""

    metadata = PluginMetadata(
        name="testing",
        version="0.6.0",
        description="Testing framework plugin",
        plugin_type="testing",
    )


class BootstrapPlugin(AbstractPlugin):
    """Bootstrap pack / layout verification plugin."""

    metadata = PluginMetadata(
        name="bootstrap",
        version="0.6.0",
        description="Bootstrap and layout verification plugin",
        plugin_type="bootstrap",
    )


BUILTIN_PLUGIN_FACTORIES = (
    ContextPlugin,
    PromptPlugin,
    TemplatePlugin,
    GeneratorPlugin,
    AuditPlugin,
    StudioPlugin,
    TestingPlugin,
    BootstrapPlugin,
)
