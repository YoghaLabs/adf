"""Pytest suite for Registry & Marketplace (BUILD-011)."""

from __future__ import annotations

from pathlib import Path

import yaml

from adf import MarketplaceClient, PublisherClient, RegistryClient
from registry.marketplace import MarketplaceManager
from registry.registry_manager import RegistryManager
from registry.registry_provider import (
    EnterpriseRegistryProvider,
    GitHubRegistryProvider,
    GitLabRegistryProvider,
    LocalRegistryProvider,
    MockCloudRegistryProvider,
)
from registry.security import PackageSecurity
from services.service_manager import ServiceManager


def _write_pkg(root: Path, *, pkg_id: str, version: str = "1.0.0", pkg_type: str = "plugin") -> Path:
    path = root / pkg_id
    path.mkdir(parents=True, exist_ok=True)
    data = {
        "schema_version": "1.0",
        "name": pkg_id,
        "id": pkg_id,
        "version": version,
        "author": "YoghaLabs",
        "description": f"{pkg_id} package",
        "type": pkg_type,
        "engine": "adf-core>=0.8.0",
        "license": "MIT",
        "dependencies": {},
        "capabilities": ["test"],
        "entrypoint": "",
        "checksum": "",
        "signature": "",
    }
    (path / "package.yaml").write_text(yaml.safe_dump(data), encoding="utf-8")
    (path / "payload.txt").write_text(f"{pkg_id}@{version}\n", encoding="utf-8")
    return path


def _mini_repo(tmp_path: Path) -> Path:
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
        "ADF\n\nVersion:\n0.11.0-alpha\n\nCurrent Build:\nBUILD-011\n\nBranch:\ndevelop\n",
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
    ):
        (adf / name).write_text(f"# {name}\n", encoding="utf-8")
    registry = tmp_path / "release" / "apm-registry"
    registry.mkdir(parents=True)
    _write_pkg(registry, pkg_id="alpha", pkg_type="plugin")
    _write_pkg(registry, pkg_id="beta", pkg_type="template")
    return tmp_path


def test_registry_providers(tmp_path: Path) -> None:
    root = _mini_repo(tmp_path)
    local = LocalRegistryProvider(root / "release" / "apm-registry")
    assert local.describe()["kind"] == "local"
    assert len(local.list()) == 2
    assert GitHubRegistryProvider().describe()["name"] == "github"
    assert GitLabRegistryProvider().describe()["name"] == "gitlab"
    assert EnterpriseRegistryProvider().describe()["name"] == "enterprise"
    assert MockCloudRegistryProvider().list() == []


def test_marketplace_search_and_featured(tmp_path: Path) -> None:
    root = _mini_repo(tmp_path)
    manager = RegistryManager(root)
    manager.index.upsert("alpha", verified=True, featured=True, downloads=10, stars=3, tags=["demo"])
    market = MarketplaceManager(manager)
    assert len(market.browse()) == 2
    featured = market.search.featured()
    assert featured and featured[0].id == "alpha"
    popular = market.search.popular()
    assert popular[0].id == "alpha"
    found = market.search.search("alpha")
    assert len(found) == 1
    assert any(c.id == "plugin" for c in market.categories())


def test_publisher_and_publish(tmp_path: Path) -> None:
    root = _mini_repo(tmp_path)
    manager = RegistryManager(root)
    src = _write_pkg(tmp_path / "src", pkg_id="gamma", pkg_type="generator")
    result = manager.publish(src, publisher_id="YoghaLabs", overwrite=True)
    assert result["ok"] is True
    profile = manager.publishers.get("YoghaLabs")
    assert profile is not None
    assert "gamma" in profile.packages
    assert any(row["id"] == "gamma" for row in manager.list())


def test_verification_security(tmp_path: Path) -> None:
    root = _mini_repo(tmp_path)
    manager = RegistryManager(root)
    pkg = manager.client.get("alpha")
    security = PackageSecurity()
    report = security.verify_package(pkg)
    assert report["ok"] is True
    assert report["trusted_publisher"] is True
    checksum = security.package_tree_checksum(pkg.root)
    assert len(checksum) == 64


def test_sync_mirror(tmp_path: Path) -> None:
    root = _mini_repo(tmp_path)
    manager = RegistryManager(root)
    first = manager.sync(incremental=False)
    assert first["ok"] is True
    assert first["count_copied"] >= 2
    second = manager.sync(incremental=True)
    assert second["ok"] is True
    assert second["count_skipped"] >= 2
    assert manager.syncer.offline_ready()["ok"] is True


def test_services_and_sdk(tmp_path: Path) -> None:
    root = _mini_repo(tmp_path)
    # Avoid full RuntimeEngine template discovery: use RegistryManager directly via services wiring
    # through ServiceManager on real repo for SDK smoke, and local manager for service assertions.
    manager = RegistryManager(root)
    market = MarketplaceManager(manager)
    from services.marketplace_service import MarketplaceService
    from services.publisher_service import PublisherService
    from services.registry_service import RegistryService

    registry_svc = RegistryService(manager)
    market_svc = MarketplaceService(market)
    publisher_svc = PublisherService(manager)
    assert registry_svc.list().ok
    assert market_svc.browse().ok
    assert publisher_svc.get("YoghaLabs").ok

    # SDK facades
    assert isinstance(RegistryClient(registry_svc).list()["data"]["count"], int)
    assert MarketplaceClient(market_svc).browse()["ok"] is True
    assert PublisherClient(publisher_svc).list()["ok"] is True


def test_install_via_registry(tmp_path: Path) -> None:
    root = _mini_repo(tmp_path)
    manager = RegistryManager(root)
    result = manager.install("alpha", overwrite=True)
    assert result.get("ok") is True
    installed = manager.package_manager.list(installed=True)
    assert any(row["id"] == "alpha" for row in installed)


def test_service_manager_registers_marketplace() -> None:
    # Use real repo so RuntimeEngine can discover templates.
    repo = Path(__file__).resolve().parents[2]
    sm = ServiceManager(repo)
    sm.configure_defaults()
    names = {row["name"] for row in sm.list()}
    assert {"registry", "marketplace", "publisher"}.issubset(names)
    assert sm.registry().providers().ok
    assert sm.marketplace().studio().ok
