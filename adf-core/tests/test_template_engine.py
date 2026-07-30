"""Pytest suite for Template Engine (BUILD-007)."""

from __future__ import annotations

from pathlib import Path

import pytest
import yaml

from templates.engine import TemplateManager
from templates.manifest import parse_manifest, parse_manifest_dict
from templates.variables import AdfTemplateError, VariableResolver


def _write_template(root: Path, name: str, *, variables: dict | None = None) -> Path:
    package = root / name
    files = package / "files"
    files.mkdir(parents=True)
    manifest = {
        "schema_version": "1.0",
        "metadata": {
            "name": name,
            "version": "0.1.0",
            "description": f"{name} test template",
            "author": "YoghaLabs",
            "tags": ["test"],
            "build": "BUILD-007",
        },
        "variables": variables or {"project_name": "demo", "author": "Tester"},
        "dependencies": [],
        "capabilities": ["scaffold"],
        "outputs": ["README.md"],
        "permissions": ["write-files"],
        "inherits": None,
        "plugin_compatibility": ["template"],
    }
    (package / "template.yaml").write_text(
        yaml.safe_dump(manifest, sort_keys=False),
        encoding="utf-8",
    )
    (files / "README.md").write_text(
        "# {{project_name}}\n\nAuthor: {{author}}\n",
        encoding="utf-8",
    )
    return package


def test_manifest_parsing(tmp_path: Path) -> None:
    package = _write_template(tmp_path, "sample")
    manifest = parse_manifest(package / "template.yaml")
    assert manifest.name == "sample"
    assert manifest.schema_version == "1.0"
    assert "scaffold" in manifest.capabilities
    assert manifest.plugin_compatibility == ["template"]


def test_manifest_schema_rejection() -> None:
    with pytest.raises(Exception):
        parse_manifest_dict({"schema_version": "9.0", "metadata": {"name": "x", "version": "1"}})


def test_template_loading(tmp_path: Path) -> None:
    package = _write_template(tmp_path, "loadme")
    manager = TemplateManager(search_paths=[tmp_path])
    loaded = manager.load(package)
    assert loaded.name == "loadme"
    assert manager.list()[0]["name"] == "loadme"


def test_template_validation(tmp_path: Path) -> None:
    package = _write_template(tmp_path, "valid")
    manager = TemplateManager()
    assert manager.validate(package) == []
    bad = tmp_path / "bad"
    bad.mkdir()
    errors = manager.validate(bad)
    assert errors
    assert any("template.yaml" in e for e in errors)


def test_variable_resolution() -> None:
    resolver = VariableResolver(strict=True)
    assert resolver.resolve("Hi {{project_name}}", {"project_name": "ADF"}) == "Hi ADF"
    nested = resolver.resolve("{{meta.author}}", {"meta": {"author": "Yogha"}})
    assert nested == "Yogha"
    with pytest.raises(AdfTemplateError):
        resolver.resolve("{{missing}}", {})


def test_render_and_discover(tmp_path: Path) -> None:
    _write_template(tmp_path, "foundation")
    manager = TemplateManager(search_paths=[tmp_path])
    discovered = manager.discover(tmp_path)
    assert "foundation" in discovered
    out = tmp_path / "out"
    written = manager.render("foundation", out, {"project_name": "Nova"})
    assert written
    readme = (out / "README.md").read_text(encoding="utf-8")
    assert "Nova" in readme
    assert "Tester" in readme
