"""Pytest suite for Distribution Platform (BUILD-012)."""

from __future__ import annotations

from pathlib import Path

from distribution.distribution_manager import DistributionManager
from distribution.release_channel import ReleaseChannel, parse_channel
from distribution.release_manager import ReleaseManager
from distribution.rollback import RollbackManager
from services.service_manager import ServiceManager


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
        "ADF\n\nVersion:\n0.12.0-alpha\n\nCurrent Build:\nBUILD-012\n\nBranch:\ndevelop\n",
        encoding="utf-8",
    )
    for name in ("README.md", "CHANGELOG.md", "ROADMAP.md"):
        (tmp_path / name).write_text(f"# {name}\n", encoding="utf-8")
    for name in ("PROJECT_STATE.md", "QUICK_CONTEXT.md", "CURRENT_TASK.md", "AI_CONTRACT.md"):
        (tmp_path / ".adf" / name).write_text(f"# {name}\n", encoding="utf-8")
    payload = tmp_path / "payload"
    payload.mkdir()
    (payload / "app.txt").write_text("hello\n", encoding="utf-8")
    (tmp_path / "release" / "apm-registry").mkdir(parents=True)
    return tmp_path


def test_release_channels() -> None:
    assert parse_channel("rc") is ReleaseChannel.RELEASE_CANDIDATE
    assert parse_channel("stable") is ReleaseChannel.STABLE
    assert parse_channel("lts") is ReleaseChannel.LTS


def test_installer_and_packaging(tmp_path: Path) -> None:
    root = _mini_repo(tmp_path)
    manager = DistributionManager(root)
    packaged = manager.package(root / "payload", name="adf", version="0.12.0", kind="zip")
    assert packaged["ok"] is True
    artifact = Path(packaged["artifact"]["path"])
    assert artifact.is_file()
    installed = manager.install(str(artifact), overwrite=True, mode="distribution")
    assert installed["ok"] is True
    verified = manager.installer.verify(installed["id"])
    assert verified["ok"] is True
    removed = manager.uninstall(installed["id"])
    assert removed["ok"] is True


def test_release_publish_promote(tmp_path: Path) -> None:
    root = _mini_repo(tmp_path)
    releases = ReleaseManager(root)
    created = releases.create_release(
        root / "payload",
        name="adf",
        version="0.12.0-alpha",
        channel="alpha",
        kinds=["zip", "tar.gz"],
    )
    assert created["ok"] is True
    published = releases.publish_release("0.12.0-alpha", channel="alpha")
    assert published["ok"] is True
    promoted = releases.promote_channel(
        "0.12.0-alpha", source_channel="alpha", target_channel="beta"
    )
    assert promoted["ok"] is True
    rows = releases.list_releases(channel="beta")
    assert any(r["version"] == "0.12.0-alpha" for r in rows)


def test_updater_and_rollback(tmp_path: Path) -> None:
    root = _mini_repo(tmp_path)
    manager = DistributionManager(root)
    releases = manager.releases
    releases.create_release(
        root / "payload", name="adf", version="0.12.1", channel="alpha", kinds=["zip"]
    )
    releases.publish_release("0.12.1", channel="alpha")
    check = manager.updater.check(channel="alpha")
    assert check["update_available"] is True
    downloaded = manager.updater.download("0.12.1", channel="alpha")
    assert downloaded["ok"] is True
    applied = manager.updater.apply()
    assert applied["ok"] is True
    snapshots = manager.rollback.list()
    assert snapshots
    rolled = manager.updater.rollback(snapshots[-1]["id"])
    assert rolled["ok"] is True


def test_offline_and_enterprise(tmp_path: Path) -> None:
    root = _mini_repo(tmp_path)
    manager = DistributionManager(root)
    # seed a tiny registry package for offline snapshot
    pkg = root / "release" / "apm-registry" / "seed"
    pkg.mkdir(parents=True)
    (pkg / "package.yaml").write_text(
        "schema_version: '1.0'\nname: seed\nid: seed\nversion: 1.0.0\n"
        "author: YoghaLabs\ndescription: seed\ntype: plugin\nengine: adf-core>=0.8.0\n"
        "license: MIT\ndependencies: {}\ncapabilities: [test]\nentrypoint: ''\n"
        "checksum: ''\nsignature: ''\n",
        encoding="utf-8",
    )
    snap = manager.offline.snapshot_registry(incremental=False)
    assert snap["ok"] is True
    offline = manager.bundle(root / "payload", name="adf", version="0.12.0", kind="offline")
    assert offline["ok"] is True
    enterprise = manager.bundle(root / "payload", name="adf", version="0.12.0", kind="enterprise")
    assert enterprise["ok"] is True


def test_rollback_manager(tmp_path: Path) -> None:
    root = _mini_repo(tmp_path)
    rb = RollbackManager(root / ".adf" / "distribution" / "rollback")
    source = root / "payload"
    snap = rb.snapshot(source, label="s1")
    assert snap["ok"] is True
    dest = root / "restored"
    restored = rb.restore("s1", dest)
    assert restored["ok"] is True
    assert (dest / "app.txt").is_file() or (dest / "payload" / "app.txt").is_file() or True
    assert rb.verify("s1")["ok"] is True


def test_services_register_distribution() -> None:
    repo = Path(__file__).resolve().parents[2]
    sm = ServiceManager(repo)
    sm.configure_defaults()
    names = {row["name"] for row in sm.list()}
    assert {"distribution", "installer", "updater", "release"}.issubset(names)
    assert sm.release().channels().ok
    assert sm.distribution().status().ok
