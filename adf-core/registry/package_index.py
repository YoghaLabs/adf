"""Package index — marketplace metadata store over registry packages."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from packages.metadata import normalize_package_type
from registry.metadata import PackageMarketplaceMeta, enrich_row, utc_now_iso


class PackageIndex:
    """Persist and merge marketplace metadata without owning package bytes."""

    def __init__(self, store_path: Path | str) -> None:
        self.store_path = Path(store_path)
        self.store_path.parent.mkdir(parents=True, exist_ok=True)
        self._data: dict[str, dict[str, Any]] = {}
        self.load()

    def load(self) -> dict[str, dict[str, Any]]:
        """Load index JSON from disk."""
        if self.store_path.is_file():
            raw = json.loads(self.store_path.read_text(encoding="utf-8"))
            if isinstance(raw, dict):
                self._data = {str(k): dict(v) for k, v in raw.items() if isinstance(v, dict)}
            else:
                self._data = {}
        else:
            self._data = {}
        return self._data

    def save(self) -> Path:
        """Persist index JSON."""
        payload = json.dumps(self._data, indent=2, sort_keys=True) + "\n"
        self.store_path.write_text(payload, encoding="utf-8")
        return self.store_path

    def get_meta(self, package_id: str) -> PackageMarketplaceMeta | None:
        """Return stored marketplace metadata for a package id."""
        row = self._data.get(package_id)
        if not row:
            return None
        return PackageMarketplaceMeta(
            package_id=package_id,
            rating=float(row.get("rating") or 0.0),
            downloads=int(row.get("downloads") or 0),
            stars=int(row.get("stars") or 0),
            verified=bool(row.get("verified") or False),
            maintainer=str(row.get("maintainer") or ""),
            license=str(row.get("license") or "MIT"),
            created=str(row.get("created") or ""),
            updated=str(row.get("updated") or ""),
            compatibility=str(row.get("compatibility") or "adf-core>=0.8.0"),
            tags=[str(t) for t in (row.get("tags") or [])],
            category=normalize_package_type(str(row.get("category") or "plugin")),
            featured=bool(row.get("featured") or False),
            publisher=str(row.get("publisher") or ""),
        )

    def upsert(
        self,
        package_id: str,
        *,
        rating: float | None = None,
        downloads: int | None = None,
        stars: int | None = None,
        verified: bool | None = None,
        maintainer: str | None = None,
        license: str | None = None,
        tags: list[str] | None = None,
        category: str | None = None,
        featured: bool | None = None,
        publisher: str | None = None,
        compatibility: str | None = None,
    ) -> PackageMarketplaceMeta:
        """Create or update marketplace metadata for a package."""
        current = self.get_meta(package_id) or PackageMarketplaceMeta(package_id=package_id)
        if rating is not None:
            current.rating = float(rating)
        if downloads is not None:
            current.downloads = int(downloads)
        if stars is not None:
            current.stars = int(stars)
        if verified is not None:
            current.verified = bool(verified)
        if maintainer is not None:
            current.maintainer = maintainer
        if license is not None:
            current.license = license
        if tags is not None:
            current.tags = list(tags)
        if category is not None:
            current.category = normalize_package_type(category)
        if featured is not None:
            current.featured = bool(featured)
        if publisher is not None:
            current.publisher = publisher
        if compatibility is not None:
            current.compatibility = compatibility
        if not current.created:
            current.created = utc_now_iso()
        current.updated = utc_now_iso()
        self._data[package_id] = current.to_dict()
        self.save()
        return current

    def decorate(self, rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
        """Attach marketplace metadata to registry rows."""
        return [enrich_row(row, self.get_meta(str(row.get("id") or ""))) for row in rows]
