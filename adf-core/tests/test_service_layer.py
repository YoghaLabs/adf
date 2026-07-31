"""Pytest suite for Service Layer and Public SDK (BUILD-010)."""

from __future__ import annotations

import json
from pathlib import Path

import pytest

from adf import GeneratorService, PackageService, RuntimeService, SDKClient
from adf.cli import main as cli_main
from services.contracts import ServiceException, ServiceResult
from services.service_manager import ServiceManager


def _seed_minimal_repo(root: Path) -> None:
    """Create a minimal ADF-like layout for service tests."""
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
        (root / name).mkdir(parents=True, exist_ok=True)

    (root / "VERSION").write_text(
        "ADF\n\nVersion:\n0.10.0-alpha\n\nCurrent Build:\nBUILD-010\n\nBranch:\ndevelop\n",
        encoding="utf-8",
    )
    for name in ("README.md", "CHANGELOG.md", "ROADMAP.md"):
        (root / name).write_text(f"# {name}\n", encoding="utf-8")

    adf = root / ".adf"
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
    (root / "prompts" / "build.md").write_text("# Prompt — Build\n\nbody\n", encoding="utf-8")


def test_service_registration(tmp_path: Path) -> None:
    _seed_minimal_repo(tmp_path)
    manager = ServiceManager(tmp_path)
    manager.configure_defaults()
    names = {row["name"] for row in manager.list()}
    assert {
        "runtime",
        "generator",
        "package",
        "template",
        "plugin",
        "context",
        "knowledge",
        "project",
        "workspace",
    }.issubset(names)
    with pytest.raises(ServiceException):
        manager.register(manager.runtime())


def test_service_lifecycle(tmp_path: Path) -> None:
    _seed_minimal_repo(tmp_path)
    manager = ServiceManager(tmp_path)
    boot = manager.boot()
    assert boot.ok
    health = manager.health()
    assert health.ok
    assert manager.runtime().is_booted
    shut = manager.shutdown()
    assert shut.ok
    assert not manager.runtime().is_booted


def test_sdk_client(tmp_path: Path) -> None:
    _seed_minimal_repo(tmp_path)
    client = SDKClient(tmp_path)
    boot = client.boot()
    assert boot["ok"] is True
    version = client.runtime().version()
    assert version["ok"] is True
    assert "1.0.0" in version["data"]["version"]
    workspace = client.workspace().describe()
    assert workspace["ok"] is True
    assert client.projects().info()["ok"] is True
    assert client.shutdown()["ok"] is True


def test_public_api_exports() -> None:
    assert issubclass(RuntimeService, object)
    assert issubclass(PackageService, object)
    assert issubclass(GeneratorService, object)
    assert SDKClient is not None


def test_runtime_service(tmp_path: Path) -> None:
    _seed_minimal_repo(tmp_path)
    manager = ServiceManager(tmp_path)
    manager.configure_defaults()
    result = manager.runtime().version()
    assert result.ok
    assert result.data["package"] == "adf-core"
    status = manager.runtime().status()
    assert status.ok


def test_generator_service(tmp_path: Path) -> None:
    _seed_minimal_repo(tmp_path)
    # Point templates at real repo templates if available; else validate-only path.
    repo = Path(__file__).resolve().parents[2]
    manager = ServiceManager(repo)
    manager.configure_defaults()
    manifest = {
        "name": "demo-svc",
        "template": "generic",
        "author": "YoghaLabs",
        "version": "0.1.0-alpha",
        "destination": str(tmp_path),
    }
    validated = manager.generator().validate(manifest)
    assert isinstance(validated, ServiceResult)
    assert validated.ok
    dry = manager.generator().dry_run(manifest)
    assert dry.ok


def test_package_service() -> None:
    repo = Path(__file__).resolve().parents[2]
    manager = ServiceManager(repo)
    manager.configure_defaults()
    listed = manager.package().list()
    assert listed.ok
    assert "packages" in listed.data
    search = manager.package().search("")
    assert search.ok


def test_template_service() -> None:
    repo = Path(__file__).resolve().parents[2]
    manager = ServiceManager(repo)
    manager.configure_defaults()
    listed = manager.template().list()
    assert listed.ok
    assert listed.data["count"] >= 1


def test_cli_integration(tmp_path: Path, capsys: pytest.CaptureFixture[str]) -> None:
    _seed_minimal_repo(tmp_path)
    code = cli_main(["version", "--root", str(tmp_path)])
    assert code == 0
    out = json.loads(capsys.readouterr().out)
    assert out["ok"] is True
    assert "version" in out["data"]

    code = cli_main(["status", "--root", str(tmp_path)])
    assert code == 0
    status = json.loads(capsys.readouterr().out)
    assert status["ok"] is True
