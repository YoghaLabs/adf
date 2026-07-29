"""Pytest suite for Bootstrap Generator (BUILD-008)."""

from __future__ import annotations

from pathlib import Path

import pytest
import yaml

from generator.filesystem import AdfGeneratorError, FileSystem
from generator.project_generator import GeneratorManager
from generator.project_manifest import ProjectManifest
from generator.writer import Writer
from templates.engine import TemplateManager


def _seed_templates(root: Path) -> TemplateManager:
    package = root / "foundation"
    files = package / "files"
    files.mkdir(parents=True)
    manifest = {
        "schema_version": "1.0",
        "metadata": {
            "name": "foundation",
            "version": "0.1.0",
            "description": "test",
            "build": "BUILD-008",
        },
        "variables": {
            "project_name": "demo",
            "author": "Tester",
            "version": "0.1.0-alpha",
        },
        "capabilities": ["scaffold"],
        "outputs": ["README.md", "VERSION"],
        "permissions": ["write-files"],
        "plugin_compatibility": ["generator"],
    }
    (package / "template.yaml").write_text(yaml.safe_dump(manifest), encoding="utf-8")
    (files / "README.md").write_text("# {{project_name}}\n", encoding="utf-8")
    (files / "VERSION").write_text("{{version}}\n", encoding="utf-8")
    manager = TemplateManager(search_paths=[root])
    manager.discover(root)
    return manager


def test_filesystem_guard(tmp_path: Path) -> None:
    fs = FileSystem()
    target = tmp_path / "proj"
    target.mkdir()
    (target / "marker.txt").write_text("x", encoding="utf-8")
    with pytest.raises(AdfGeneratorError):
        fs.guard_destination(target, overwrite=False)
    fs.guard_destination(target, overwrite=True)


def test_writer_and_manifest(tmp_path: Path) -> None:
    writer = Writer(dry_run=False, overwrite=False)
    path = writer.write_text(tmp_path / "a.txt", "hello")
    assert path.read_text(encoding="utf-8") == "hello"
    manifest = ProjectManifest(name="demo", destination=tmp_path)
    assert manifest.project_root == (tmp_path / "demo").resolve()
    assert manifest.variables()["project_name"] == "demo"


def test_generator_dry_run(tmp_path: Path) -> None:
    templates = _seed_templates(tmp_path / "templates")
    manager = GeneratorManager(templates=templates)
    dest = tmp_path / "out"
    dest.mkdir()
    result = manager.init_project(
        "alpha",
        dest,
        dry_run=True,
        overwrite=False,
    )
    assert result["ok"] is True
    assert result["dry_run"] is True
    # Dry-run must not create the project directory on disk via real writes.
    # ensure_dir in dry_run does not mkdir.
    assert not (dest / "alpha").exists()


def test_generator_creates_project(tmp_path: Path) -> None:
    templates = _seed_templates(tmp_path / "templates")
    manager = GeneratorManager(templates=templates)
    dest = tmp_path / "out"
    dest.mkdir()
    result = manager.init_project("beta", dest, overwrite=False)
    assert result["ok"] is True
    root = dest / "beta"
    assert (root / ".adf" / "PROJECT_STATE.md").is_file()
    assert (root / "prompts" / "build.md").is_file()
    assert (root / "bootstrap" / "BOOT_SEQUENCE.md").is_file()
    assert "beta" in (root / "README.md").read_text(encoding="utf-8")


def test_overwrite_protection(tmp_path: Path) -> None:
    templates = _seed_templates(tmp_path / "templates")
    manager = GeneratorManager(templates=templates)
    dest = tmp_path / "out"
    dest.mkdir()
    manager.init_project("gamma", dest)
    with pytest.raises(AdfGeneratorError):
        manager.init_project("gamma", dest, overwrite=False)
