"""Pytest suite for plugin architecture (BUILD-006)."""

from __future__ import annotations

from pathlib import Path

import pytest

from contracts.plugin import AbstractPlugin, PluginMetadata
from events.bus import ON_BOOT, EventBus
from hooks.registry import AFTER_BOOT, BEFORE_BOOT, HookRegistry
from plugins.builtin import ContextPlugin
from plugins.manager import AdfPluginError, PluginManager
from contracts.plugin import PluginContext


def _context(tmp_path: Path) -> PluginContext:
    return PluginContext(
        repo_root=tmp_path,
        build="BUILD-006",
        version="0.6.0-alpha",
        branch="develop",
        services={},
    )


def test_plugin_registration_and_loading(tmp_path: Path) -> None:
    manager = PluginManager()
    manager.set_context(_context(tmp_path))
    manager.register(ContextPlugin(), factory=ContextPlugin)
    assert manager.list()[0]["name"] == "context"
    loaded = manager.load("context")
    assert loaded.is_loaded is True
    manager.unload("context")
    assert loaded.is_loaded is False


def test_plugin_validation(tmp_path: Path) -> None:
    class BadPlugin(AbstractPlugin):
        metadata = PluginMetadata(
            name="",
            version="",
            description="bad",
            plugin_type="",
        )

    manager = PluginManager()
    manager.set_context(_context(tmp_path))
    with pytest.raises(AdfPluginError):
        manager.register(BadPlugin())


def test_event_dispatch() -> None:
    bus = EventBus()
    seen: list[str] = []

    def handler(event: object) -> None:
        seen.append(getattr(event, "name"))

    bus.subscribe(ON_BOOT, handler)
    bus.publish(ON_BOOT, {"ok": True})
    assert seen == [ON_BOOT]
    assert len(bus.history()) == 1


def test_hook_execution() -> None:
    hooks = HookRegistry()
    trace: list[str] = []
    hooks.register(BEFORE_BOOT, lambda **_: trace.append("before"))
    hooks.register(AFTER_BOOT, lambda **_: trace.append("after"))
    hooks.run(BEFORE_BOOT)
    hooks.run(AFTER_BOOT)
    assert trace == ["before", "after"]


def test_plugin_enable_disable(tmp_path: Path) -> None:
    manager = PluginManager()
    manager.set_context(_context(tmp_path))
    manager.discover([ContextPlugin])
    manager.disable("context")
    with pytest.raises(AdfPluginError):
        manager.load("context")
    manager.enable("context")
    assert manager.load("context").is_loaded is True
