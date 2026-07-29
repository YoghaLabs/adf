"""PackageManager — public APM facade (CLI wraps this API only)."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from packages.cache import PackageCache
from packages.dependency import is_valid_version
from packages.installer import PackageInstaller
from packages.lockfile import LockEntry, LockFileStore
from packages.manifest import AdfPackageError, PackageManifest, parse_package_manifest
from packages.package import Package
from packages.registry import RegistryClient
from packages.resolver import DependencyResolver


class PackageManager:
    """Install, remove, update, search, and verify ADF packages.

    Responsibilities: install, remove, update, upgrade, search, list, validate, verify.
    """

    def __init__(
        self,
        repo_root: Path | str,
        *,
        registry: RegistryClient | None = None,
        cache: PackageCache | None = None,
        offline: bool = False,
    ) -> None:
        """Create a package manager bound to a repository root."""
        self.repo_root = Path(repo_root).resolve()
        self.apm_root = self.repo_root / ".adf" / "apm"
        self.registry_root = self.repo_root / "release" / "apm-registry"
        self.install_root = self.apm_root / "installed"
        self.cache = cache or PackageCache(self.apm_root / "cache", offline=offline)
        self.registry = registry or RegistryClient(self.registry_root)
        self.installer = PackageInstaller(self.install_root, self.cache)
        self.locks = LockFileStore(self.repo_root)
        self.resolver = DependencyResolver()
        self.apm_root.mkdir(parents=True, exist_ok=True)
        self.registry_root.mkdir(parents=True, exist_ok=True)

    def validate(self, target: Path | str | PackageManifest | Package) -> list[str]:
        """Validate a package manifest / package path."""
        errors: list[str] = []
        if isinstance(target, Package):
            manifest = target.manifest
        elif isinstance(target, PackageManifest):
            manifest = target
        else:
            try:
                manifest = parse_package_manifest(target)
            except AdfPackageError as exc:
                return [str(exc)]
        if not is_valid_version(manifest.version):
            errors.append(f"invalid version: {manifest.version}")
        if not manifest.name.strip():
            errors.append("name is required")
        if not manifest.id.strip():
            errors.append("id is required")
        for dep_id, constraint in manifest.dependencies.items():
            if not str(dep_id).strip():
                errors.append("dependency id is empty")
            c = str(constraint or "*").strip()
            if c in {"*", "latest"}:
                continue
            cleaned = c.lstrip("^~><= ")
            if cleaned and not is_valid_version(cleaned):
                errors.append(f"invalid dependency constraint for {dep_id}: {constraint}")
        return errors

    def verify(self, package_id: str | None = None) -> dict[str, Any]:
        """Verify installed package(s) against lockfile and checksum field if present."""
        lock = self.locks.load()
        results: list[dict[str, Any]] = []
        ids = [package_id] if package_id else list(lock.packages.keys())
        if package_id and package_id not in lock.packages:
            # also allow verify by scanning install dir
            installed = {row["id"]: row for row in self.installer.list_installed()}
            if package_id not in installed:
                raise AdfPackageError(f"cannot verify unknown package: {package_id}")
            ids = [package_id]
        ok = True
        for pkg_id in ids:
            entry = lock.packages.get(pkg_id)
            paths = self.installer.find_installed(pkg_id)
            if not paths:
                ok = False
                results.append({"id": pkg_id, "ok": False, "error": "not installed"})
                continue
            path = paths[0]
            try:
                manifest = parse_package_manifest(path)
            except AdfPackageError as exc:
                ok = False
                results.append({"id": pkg_id, "ok": False, "error": str(exc)})
                continue
            version_ok = True
            if entry and entry.version != manifest.version:
                version_ok = False
                ok = False
            checksum_ok = True
            if manifest.checksum:
                actual = self.installer.checksum_tree(path)
                checksum_ok = actual == manifest.checksum
                if not checksum_ok:
                    ok = False
            results.append(
                {
                    "id": pkg_id,
                    "ok": version_ok and checksum_ok,
                    "version": manifest.version,
                    "path": str(path),
                    "checksum_ok": checksum_ok,
                    "locked_version": entry.version if entry else None,
                }
            )
        return {"ok": ok, "results": results}

    def search(self, query: str = "", *, package_type: str | None = None) -> list[dict[str, Any]]:
        """Search the registry."""
        return self.registry.search(query, package_type=package_type)

    def list(self, *, installed: bool = False) -> list[dict[str, Any]]:
        """List registry packages or installed packages."""
        if installed:
            return self.installer.list_installed()
        return self.registry.list()

    def install(self, package_id: str, *, overwrite: bool = False) -> dict[str, Any]:
        """Resolve dependencies and install a package from the registry."""
        if self.cache.offline:
            # Offline: only install if present in cache or already resolvable from registry disk.
            pass
        root_pkg = self.registry.get(package_id)
        errors = self.validate(root_pkg)
        if errors:
            raise AdfPackageError(f"invalid package {package_id}: {'; '.join(errors)}")

        plan = self.resolver.resolve(
            root_pkg.manifest,
            lookup=self.registry.get_manifest,
            installed=self.locks.installed_versions(),
        )
        installed_report: list[dict[str, Any]] = []
        lock = self.locks.load()
        for node in plan.nodes:
            pkg = self.registry.get(node.package_id)
            already = lock.packages.get(node.package_id)
            if already and already.version == pkg.version and not overwrite:
                continue
            report = self.installer.install(
                pkg,
                overwrite=overwrite or already is not None,
            )
            installed_report.append(report)
            lock.packages[pkg.id] = LockEntry(
                id=pkg.id,
                name=pkg.name,
                version=pkg.version,
                type=pkg.type,
                path=report["path"],
                dependencies=dict(pkg.manifest.dependencies),
            )
            lock.tree[pkg.id] = list(pkg.manifest.dependencies.keys())
        self.locks.save(lock)
        return {
            "ok": True,
            "package": root_pkg.id,
            "version": root_pkg.version,
            "plan": [
                {"id": n.package_id, "version": n.version, "depends_on": n.depends_on}
                for n in plan.nodes
            ],
            "installed": installed_report,
            "lockfile": str(self.locks.path),
        }

    def remove(self, package_id: str) -> dict[str, Any]:
        """Remove an installed package and update the lockfile."""
        lock = self.locks.load()
        # Refuse remove if others depend on it.
        dependents = [
            key for key, entry in lock.packages.items() if package_id in entry.dependencies
        ]
        if dependents:
            raise AdfPackageError(
                f"cannot remove '{package_id}': required by {', '.join(sorted(dependents))}"
            )
        report = self.installer.remove(package_id)
        lock.packages.pop(package_id, None)
        lock.tree.pop(package_id, None)
        self.locks.save(lock)
        return report

    def update(self, package_id: str) -> dict[str, Any]:
        """Reinstall the registry version of a package (refresh in place)."""
        return self.install(package_id, overwrite=True)

    def upgrade(self, package_id: str | None = None) -> dict[str, Any]:
        """Upgrade one package or all locked packages from the registry."""
        lock = self.locks.load()
        targets = [package_id] if package_id else list(lock.packages.keys())
        if not targets:
            return {"ok": True, "upgraded": [], "message": "nothing to upgrade"}
        upgraded: list[dict[str, Any]] = []
        for pkg_id in targets:
            upgraded.append(self.install(pkg_id, overwrite=True))
        return {"ok": True, "upgraded": upgraded}

    def cache_stats(self) -> dict[str, Any]:
        """Return cache statistics."""
        return self.cache.stats()

    def cache_clear(self) -> dict[str, Any]:
        """Clear the local APM cache."""
        return {"ok": True, "cleared": self.cache.clear()}
