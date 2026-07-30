"""DistributionManager — orchestration entrypoint for BUILD-012."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from distribution.bundle_builder import BundleBuilder
from distribution.checksum import ChecksumManager
from distribution.enterprise import EnterpriseDistributor
from distribution.installer import InstallerManager
from distribution.offline import OfflineDistributor
from distribution.package_builder import PackageBuilder
from distribution.portable import PortableDistributor
from distribution.release_channel import CHANNEL_POLICIES
from distribution.release_manager import ReleaseManager
from distribution.rollback import RollbackManager
from distribution.signature import SignatureManager
from distribution.updater import UpdateManager
from packages.manager import PackageManager


class DistributionManager:
    """Compose installer, updater, release, packaging, offline, and enterprise flows."""

    def __init__(
        self,
        repo_root: Path | str,
        *,
        package_manager: PackageManager | None = None,
    ) -> None:
        self.repo_root = Path(repo_root).resolve()
        self.package_manager = package_manager or PackageManager(self.repo_root)
        self.installer = InstallerManager(self.repo_root, package_manager=self.package_manager)
        self.updater = UpdateManager(self.repo_root, installer=self.installer)
        self.releases = ReleaseManager(self.repo_root)
        self.packages = PackageBuilder(self.repo_root / "release" / "dist" / ".build")
        self.bundles = BundleBuilder(self.repo_root / "release" / "dist" / ".build")
        self.portable = PortableDistributor(self.repo_root / "release" / "dist" / ".build")
        self.offline = OfflineDistributor(self.repo_root)
        self.enterprise = EnterpriseDistributor(self.repo_root)
        self.rollback = RollbackManager(self.repo_root / ".adf" / "distribution" / "rollback")
        self.checksums = ChecksumManager()
        self.signatures = SignatureManager()

    def status(self) -> dict[str, Any]:
        return {
            "repo_root": str(self.repo_root),
            "channels": [p.to_dict() for p in CHANNEL_POLICIES.values()],
            "releases": self.releases.list_releases(),
            "offline": self.offline.status(),
            "update": self.updater.check(),
            "package_kinds": self.packages.list_kinds(),
        }

    def install(self, target: str, **kwargs: Any) -> dict[str, Any]:
        return self.installer.install(target, **kwargs)

    def uninstall(self, install_id: str, **kwargs: Any) -> dict[str, Any]:
        return self.installer.uninstall(install_id, **kwargs)

    def update_check(self, **kwargs: Any) -> dict[str, Any]:
        return self.updater.check(**kwargs)

    def package(
        self,
        source: str | Path,
        *,
        name: str,
        version: str,
        kind: str = "zip",
    ) -> dict[str, Any]:
        artifact = self.packages.build(source, name=name, version=version, kind=kind)
        return {"ok": True, "artifact": artifact.to_dict()}

    def bundle(
        self,
        source: str | Path,
        *,
        name: str,
        version: str,
        kind: str = "portable",
    ) -> dict[str, Any]:
        kind_key = kind.strip().lower()
        if kind_key == "portable":
            artifact = self.portable.build(source, name=name, version=version)
        elif kind_key == "offline":
            return self.offline.build_offline_bundle(source, name=name, version=version)
        elif kind_key == "enterprise":
            artifact = self.enterprise.build_bundle(source, name=name, version=version)
        elif kind_key == "desktop":
            artifact = self.bundles.build_desktop(source, name=name, version=version)
        else:
            artifact = self.packages.build(source, name=name, version=version, kind=kind_key)
        return {"ok": True, "artifact": artifact.to_dict()}
