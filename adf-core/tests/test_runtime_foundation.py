"""Pytest suite for adf-core Runtime Engine foundation."""

from __future__ import annotations

import json
from pathlib import Path

import pytest

from core.state_manager import StateManager
from engine.runtime_engine import RuntimeEngine
from loader.project_loader import ProjectLoader
from loader.prompt_loader import PromptLoader
from registry.registry import Registry
from runtime.exceptions import AdfRegistryError


def _make_mini_repo(tmp_path: Path) -> Path:
    """Create a minimal ADF-like tree for unit tests."""
    for name in (
        ".adf",
        "adf-core",
        "adf-studio",
        "adf-docs",
        "adf-examples",
        "adf-templates",
        "bootstrap",
        "prompts",
        "testing",
        "tools",
        "release",
    ):
        (tmp_path / name).mkdir()

    (tmp_path / "VERSION").write_text(
        "ADF\n\nVersion:\n0.5.0-alpha\n\nCurrent Build:\nBUILD-005\n\nBranch:\ndevelop\n",
        encoding="utf-8",
    )
    for name in ("README.md", "CHANGELOG.md", "ROADMAP.md"):
        (tmp_path / name).write_text(f"# {name}\n", encoding="utf-8")

    adf = tmp_path / ".adf"
    for name in (
        "PROJECT_STATE.md",
        "QUICK_CONTEXT.md",
        "CURRENT_TASK.md",
        "AI_CONTRACT.md",
        "CONTEXT_ENGINE.md",
        "BUILD_STATUS.md",
        "TODOS.md",
    ):
        (adf / name).write_text(f"# {name}\n", encoding="utf-8")

    (tmp_path / "prompts" / "build.md").write_text("# Prompt — Build\n\nbody\n", encoding="utf-8")
    return tmp_path


def test_registry_register_find_remove_list() -> None:
    registry = Registry()
    registry.register("state", object())
    assert registry.list() == ["state"]
    assert registry.find("state") is not None
    registry.remove("state")
    assert registry.list() == []
    with pytest.raises(AdfRegistryError):
        registry.find("state")


def test_prompt_and_project_loader(tmp_path: Path) -> None:
    root = _make_mini_repo(tmp_path)
    prompts = PromptLoader(root)
    assert "build" in prompts.list()
    assert "Prompt — Build" in prompts.load("build")

    project = ProjectLoader(root)
    identity = project.identity()
    assert identity["version"] == "0.5.0-alpha"
    assert identity["build"] == "BUILD-005"
    assert "QUICK_CONTEXT" in project.load_markdown(".adf/QUICK_CONTEXT.md")


def test_state_manager_load_save_validate(tmp_path: Path) -> None:
    root = _make_mini_repo(tmp_path)
    manager = StateManager(root)
    state = manager.load()
    assert state["version"] == "0.5.0-alpha"
    assert manager.validate(state) == []

    state["operator_state"] = "RESTORE"
    path = manager.save(state)
    assert path.is_file()
    reloaded = json.loads(path.read_text(encoding="utf-8"))
    assert reloaded["operator_state"] == "RESTORE"


def test_runtime_engine_boot_and_doctor(tmp_path: Path) -> None:
    root = _make_mini_repo(tmp_path)
    engine = RuntimeEngine(root)
    doctor = engine.doctor()
    assert doctor["ok"] is True
    boot = engine.boot()
    assert boot["ok"] is True
    assert boot["session_id"].startswith("sess-")
    pack = engine.context.assemble("quick")
    assert pack["pack"] == "quick"
    assert "VERSION" in pack["files"]
