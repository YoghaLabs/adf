"""Pytest suite for Bootstrap Generator (BUILD-008)."""

from __future__ import annotations

from pathlib import Path

import pytest
import yaml

from generator.filesystem import (
    AdfGeneratorError,
    AtomicWrite,
    DirectoryWriter,
    FileSystem,
    FileWriter,
    SafeOverwrite,
)
from generator.manager import GeneratorManager
from generator.project_manifest import ProjectManifest
from generator.writer import Writer
from templates.engine import TemplateManager


def _seed_templates(root: Path) -> TemplateManager:
    """Create a tiny foundation+generic pair for unit tests."""
    foundation = root / "foundation"
    files = foundation / "files"
    files.mkdir(parents=True)
    (foundation / "template.yaml").write_text(
        yaml.safe_dump(
            {
                "schema_version": "1.0",
                "metadata": {
                    "name": "foundation",
                    "version": "0.1.0",
                    "description": "base",
                    "build": "BUILD-008",
                },
                "variables": {
                    "project_name": "demo",
                    "author": "Tester",
                    "version": "0.1.0-alpha",
                },
                "capabilities": ["scaffold", "adf-operating-set"],
                "outputs": [
                    "README.md",
                    "VERSION",
                    ".adf/PROJECT_STATE.md",
                    ".adf/PROJECT_MANIFEST.md",
                    ".adf/CURRENT_TASK.md",
                    ".adf/MEMORY.md",
                    ".adf/SESSION.md",
                    ".adf/TODOS.md",
                    ".adf/HANDOFF.md",
                    ".adf/BOOTSTRAP.md",
                ],
                "permissions": ["write-files"],
                "plugin_compatibility": ["generator"],
            }
        ),
        encoding="utf-8",
    )
    (files / "README.md").write_text("# {{project_name}}\n", encoding="utf-8")
    (files / "VERSION").write_text("{{version}}\n", encoding="utf-8")
    adf = files / ".adf"
    adf.mkdir()
    for name in (
        "PROJECT_STATE.md",
        "PROJECT_MANIFEST.md",
        "CURRENT_TASK.md",
        "MEMORY.md",
        "SESSION.md",
        "TODOS.md",
        "HANDOFF.md",
        "BOOTSTRAP.md",
    ):
        (adf / name).write_text(f"# {name}\n\nProject {{{{project_name}}}}\n", encoding="utf-8")

    generic = root / "generic"
    gfiles = generic / "files"
    gfiles.mkdir(parents=True)
    (generic / "template.yaml").write_text(
        yaml.safe_dump(
            {
                "schema_version": "1.0",
                "metadata": {
                    "name": "generic",
                    "version": "0.1.0",
                    "description": "generic",
                    "build": "BUILD-008",
                },
                "variables": {"project_name": "demo"},
                "capabilities": ["scaffold"],
                "outputs": ["README.md", ".adf/PROJECT_STATE.md"],
                "inherits": "foundation",
                "plugin_compatibility": ["generator"],
            }
        ),
        encoding="utf-8",
    )
    (gfiles / "docs").mkdir()
    (gfiles / "docs" / "OVERVIEW.md").write_text("Overview {{project_name}}\n", encoding="utf-8")

    manager = TemplateManager(search_paths=[root])
    manager.discover(root)
    return manager


def test_filesystem_abstraction(tmp_path: Path) -> None:
    fs = FileSystem()
    target = tmp_path / "proj"
    target.mkdir()
    (target / "marker.txt").write_text("x", encoding="utf-8")
    with pytest.raises(AdfGeneratorError):
        fs.guard_destination(target, overwrite=False)
    fs.guard_destination(target, overwrite=True)

    dirs = DirectoryWriter(dry_run=True)
    dirs.ensure(tmp_path / "ghost")
    assert not (tmp_path / "ghost").exists()

    policy = SafeOverwrite(overwrite=False)
    with pytest.raises(AdfGeneratorError):
        policy.require(target / "marker.txt")

    path = tmp_path / "atomic.txt"
    AtomicWrite.write_text(path, "hello")
    assert path.read_text(encoding="utf-8") == "hello"
    writer = FileWriter(overwrite=True)
    writer.write_text(path, "world")
    assert path.read_text(encoding="utf-8") == "world"


def test_writer_and_manifest(tmp_path: Path) -> None:
    writer = Writer(dry_run=False, overwrite=False)
    path = writer.write_text(tmp_path / "a.txt", "hello")
    assert path.read_text(encoding="utf-8") == "hello"
    manifest = ProjectManifest(name="demo", destination=tmp_path)
    assert manifest.project_root == (tmp_path / "demo").resolve()
    assert manifest.variables()["project_name"] == "demo"
    assert manifest.template == "generic"


def test_manifest_and_variable_resolution(tmp_path: Path) -> None:
    templates = _seed_templates(tmp_path / "templates")
    manager = GeneratorManager(templates=templates)
    result = manager.validate(
        {
            "name": "nova",
            "template": "generic",
            "destination": str(tmp_path / "out"),
        }
    )
    assert result["ok"] is True


def test_generator_dry_run(tmp_path: Path) -> None:
    templates = _seed_templates(tmp_path / "templates")
    manager = GeneratorManager(templates=templates)
    dest = tmp_path / "out"
    dest.mkdir()
    result = manager.dry_run(
        {
            "name": "alpha",
            "template": "generic",
            "destination": str(dest),
        }
    )
    assert result["ok"] is True
    assert result["dry_run"] is True
    assert result["file_count"] > 0
    assert not (dest / "alpha").exists()


def test_generator_creates_project(tmp_path: Path) -> None:
    templates = _seed_templates(tmp_path / "templates")
    manager = GeneratorManager(templates=templates)
    dest = tmp_path / "out"
    dest.mkdir()
    result = manager.init_project("beta", dest, template="generic", overwrite=False)
    assert result["ok"] is True
    root = dest / "beta"
    assert (root / ".adf" / "PROJECT_STATE.md").is_file()
    assert (root / ".adf" / "HANDOFF.md").is_file()
    assert (root / ".adf" / "BOOTSTRAP.md").is_file()
    assert (root / "docs" / "OVERVIEW.md").is_file()
    assert "beta" in (root / "README.md").read_text(encoding="utf-8")


def test_overwrite_protection(tmp_path: Path) -> None:
    templates = _seed_templates(tmp_path / "templates")
    manager = GeneratorManager(templates=templates)
    dest = tmp_path / "out"
    dest.mkdir()
    manager.init_project("gamma", dest, template="generic")
    with pytest.raises(AdfGeneratorError):
        manager.init_project("gamma", dest, template="generic", overwrite=False)


def test_rollback(tmp_path: Path) -> None:
    templates = _seed_templates(tmp_path / "templates")
    manager = GeneratorManager(templates=templates)
    dest = tmp_path / "out"
    dest.mkdir()
    result = manager.init_project("delta", dest, template="generic")
    assert result["ok"] is True
    root = dest / "delta"
    assert root.exists()
    rolled = manager.rollback()
    assert rolled["ok"] is True
    assert not (root / "README.md").exists()
