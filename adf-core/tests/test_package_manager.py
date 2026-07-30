"""Pytest suite for ADF Package Manager (BUILD-009)."""

from __future__ import annotations

from pathlib import Path

import pytest
import yaml

from packages.cache import PackageCache
from packages.dependency import SemVer, is_valid_version, satisfies
from packages.lockfile import LockFileStore
from packages.manager import PackageManager
from packages.manifest import AdfPackageError, parse_package_dict, parse_package_manifest
from packages.resolver import DependencyResolver


def _write_pkg(
    root: Path,
    *,
    pkg_id: str,
    version: str,
    pkg_type: str = "plugin",
    deps: dict | None = None,
) -> Path:
    path = root / pkg_id
    path.mkdir(parents=True, exist_ok=True)
    data = {
        "schema_version": "1.0",
        "name": pkg_id,
        "id": pkg_id,
        "version": version,
        "author": "YoghaLabs",
        "description": f"{pkg_id} test package",
        "type": pkg_type,
        "engine": "adf-core>=0.8.0",
        "license": "MIT",
        "dependencies": deps or {},
        "capabilities": ["test"],
        "entrypoint": "",
        "checksum": "",
        "signature": "",
    }
    (path / "package.yaml").write_text(yaml.safe_dump(data), encoding="utf-8")
    (path / "payload.txt").write_text(f"{pkg_id}@{version}\n", encoding="utf-8")
    return path


def test_manifest_parsing(tmp_path: Path) -> None:
    pkg = _write_pkg(tmp_path, pkg_id="alpha", version="1.2.3")
    manifest = parse_package_manifest(pkg)
    assert manifest.id == "alpha"
    assert manifest.version == "1.2.3"
    with pytest.raises(AdfPackageError):
        parse_package_dict({"name": "x", "id": "x", "version": "1.0.0", "type": "nope"})


def test_version_validation() -> None:
    assert is_valid_version("1.0.0")
    assert is_valid_version("0.9.0-alpha")
    assert SemVer.parse("1.2.3").major == 1
    assert satisfies("1.2.5", "^1.2.0")
    assert not satisfies("2.0.0", "^1.2.0")
    assert satisfies("1.2.9", "~1.2.3")


def test_dependency_resolution_and_cycle(tmp_path: Path) -> None:
    registry = tmp_path / "registry"
    _write_pkg(registry, pkg_id="base", version="1.0.0")
    _write_pkg(registry, pkg_id="app", version="1.0.0", deps={"base": "^1.0.0"})
    manager = PackageManager(tmp_path, offline=True)
    # Point registry to our temp registry by replacing client root packages
    from packages.registry import RegistryClient

    manager.registry = RegistryClient(registry)
    plan = manager.resolver.resolve(
        manager.registry.get_manifest("app"),
        lookup=manager.registry.get_manifest,
    )
    assert plan.ids() == ["base", "app"]

    # Circular
    _write_pkg(registry, pkg_id="a", version="1.0.0", deps={"b": "*"})
    _write_pkg(registry, pkg_id="b", version="1.0.0", deps={"a": "*"})
    with pytest.raises(AdfPackageError, match="circular"):
        DependencyResolver().resolve(
            manager.registry.get_manifest("a"),
            lookup=manager.registry.get_manifest,
        )


def test_install_lockfile_and_cache(tmp_path: Path) -> None:
    registry = tmp_path / "registry"
    _write_pkg(registry, pkg_id="base", version="1.0.0")
    _write_pkg(
        registry,
        pkg_id="app",
        version="1.1.0",
        pkg_type="template",
        deps={"base": "^1.0.0"},
    )
    from packages.registry import RegistryClient

    manager = PackageManager(tmp_path)
    manager.registry = RegistryClient(registry)
    manager.registry_root = registry

    result = manager.install("app")
    assert result["ok"] is True
    assert (tmp_path / "adf.lock").is_file()
    lock = LockFileStore(tmp_path).load()
    assert "app" in lock.packages
    assert "base" in lock.packages
    assert manager.cache.has_package("app", "1.1.0")

    listed = manager.list(installed=True)
    ids = {row["id"] for row in listed}
    assert ids == {"app", "base"}

    verified = manager.verify()
    assert verified["ok"] is True


def test_cache_clear(tmp_path: Path) -> None:
    cache = PackageCache(tmp_path / "cache")
    src = tmp_path / "src"
    src.mkdir()
    (src / "package.yaml").write_text("name: x\n", encoding="utf-8")
    cache.put_package("x", "1.0.0", src)
    assert cache.has_package("x", "1.0.0")
    cache.clear()
    assert not cache.has_package("x", "1.0.0")
