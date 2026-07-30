"""Registry cache — delegates to ``packages.cache.PackageCache``."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from packages.cache import PackageCache


class RegistryCache:
    """Thin facade over APM package cache (no duplicated storage logic)."""

    def __init__(self, cache: PackageCache | None = None, root: Path | str | None = None) -> None:
        if cache is not None:
            self.cache = cache
        elif root is not None:
            self.cache = PackageCache(root)
        else:
            raise ValueError("RegistryCache requires cache or root")

    def stats(self) -> dict[str, Any]:
        return self.cache.stats()

    def clear(self) -> dict[str, Any]:
        return self.cache.clear()

    def has_package(self, package_id: str, version: str) -> bool:
        return self.cache.has_package(package_id, version)

    def put_metadata(self, key: str, payload: dict[str, Any]) -> Path:
        return self.cache.put_metadata(key, payload)

    def get_metadata(self, key: str) -> dict[str, Any] | None:
        return self.cache.get_metadata(key)
