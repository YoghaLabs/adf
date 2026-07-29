"""RegistryManager — source of truth orchestration for installable assets."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from packages.manager import PackageManager
from registry.cache import RegistryCache
from registry.package_index import PackageIndex
from registry.publisher import PublisherStore, RegistryPublisher
from registry.registry_client import RegistryClient
from registry.security import PackageSecurity
from registry.sync import RegistrySync
from registry.validator import RegistryValidator


class RegistryManager:
    """Own registry orchestration; PackageManager remains the installer.

    Responsibilities: catalog, search facets, publish, verify, sync, provider status.
    Install/remove/update always delegate to ``PackageManager``.
    """

    def __init__(
        self,
        repo_root: Path | str,
        *,
        package_manager: PackageManager | None = None,
    ) -> None:
        self.repo_root = Path(repo_root).resolve()
        self.package_manager = package_manager or PackageManager(self.repo_root)
        self.registry_root = self.package_manager.registry_root
        self.index = PackageIndex(self.repo_root / ".adf" / "apm" / "marketplace" / "index.json")
        self.client = RegistryClient(self.registry_root, index=self.index)
        # Keep PackageManager registry client in sync with local root.
        self.package_manager.registry = self.client.packages
        self.validator = RegistryValidator(self.package_manager)
        self.security = PackageSecurity()
        self.cache = RegistryCache(cache=self.package_manager.cache)
        self.publishers = PublisherStore(self.repo_root / ".adf" / "apm" / "publishers")
        self.publisher = RegistryPublisher(self.publishers, self.registry_root)
        mirror = self.repo_root / ".adf" / "apm" / "mirror"
        self.syncer = RegistrySync(self.registry_root, mirror)

    def list(self) -> list[dict[str, Any]]:
        return self.client.list()

    def search(self, query: str = "", **kwargs: Any) -> list[dict[str, Any]]:
        return self.client.search_engine.search(query, **kwargs)

    def featured(self) -> list[dict[str, Any]]:
        return self.client.search_engine.featured()

    def popular(self) -> list[dict[str, Any]]:
        return self.client.search_engine.popular()

    def newest(self) -> list[dict[str, Any]]:
        return self.client.search_engine.newest()

    def verified(self) -> list[dict[str, Any]]:
        return self.client.search_engine.verified()

    def by_publisher(self, name: str) -> list[dict[str, Any]]:
        return self.client.search_engine.publisher(name)

    def by_tags(self, *tags: str) -> list[dict[str, Any]]:
        return self.client.search_engine.tags(*tags)

    def providers(self) -> list[dict[str, Any]]:
        return self.client.providers_status()

    def install(self, package_id: str, *, overwrite: bool = False) -> dict[str, Any]:
        return self.package_manager.install(package_id, overwrite=overwrite)

    def verify(self, package_id: str | None = None) -> dict[str, Any]:
        """Combine PackageManager verify with optional security scan."""
        base = self.package_manager.verify(package_id)
        security_rows: list[dict[str, Any]] = []
        if package_id:
            try:
                pkg = self.client.get(package_id)
                security_rows.append(self.security.verify_package(pkg))
            except Exception as exc:  # noqa: BLE001 — surface soft failure
                security_rows.append({"ok": False, "error": str(exc), "package_id": package_id})
        return {**base, "security": security_rows}

    def publish(self, source: Path | str, *, publisher_id: str = "YoghaLabs", overwrite: bool = False) -> dict[str, Any]:
        errors = self.validator.validate(source)
        if errors:
            return {"ok": False, "errors": errors}
        result = self.publisher.publish(source, publisher_id=publisher_id, overwrite=overwrite)
        from packages.manifest import parse_package_manifest

        manifest = parse_package_manifest(source)
        self.index.upsert(
            manifest.id,
            maintainer=publisher_id,
            publisher=publisher_id,
            license=manifest.license,
            category=manifest.type,
            compatibility=manifest.engine,
            verified=publisher_id.lower() in {"yoghalabs", "adf"},
            tags=list(manifest.capabilities),
        )
        return result

    def sync(self, *, incremental: bool = True) -> dict[str, Any]:
        return self.syncer.sync(incremental=incremental)

    def status(self) -> dict[str, Any]:
        return {
            "registry_root": str(self.registry_root),
            "providers": self.providers(),
            "packages": len(self.list()),
            "offline_mirror": self.syncer.offline_ready(),
            "cache": self.cache.stats(),
        }
