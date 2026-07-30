"""Package registry / marketplace metadata models (BUILD-011).

Coexists with the component ``Registry`` in ``registry.registry``.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from typing import Any

from packages.metadata import MARKETPLACE_CATEGORIES, normalize_package_type

PACKAGE_CATEGORIES = MARKETPLACE_CATEGORIES


@dataclass
class PackageMarketplaceMeta:
    """Marketplace presentation metadata for a registry package."""

    package_id: str
    rating: float = 0.0
    downloads: int = 0
    stars: int = 0
    verified: bool = False
    maintainer: str = ""
    license: str = "MIT"
    created: str = ""
    updated: str = ""
    compatibility: str = "adf-core>=0.8.0"
    tags: list[str] = field(default_factory=list)
    category: str = "plugin"
    featured: bool = False
    publisher: str = ""

    def to_dict(self) -> dict[str, Any]:
        """Serialize metadata."""
        return asdict(self)


def utc_now_iso() -> str:
    """Return current UTC timestamp in ISO-8601 form."""
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def enrich_row(row: dict[str, Any], meta: PackageMarketplaceMeta | None = None) -> dict[str, Any]:
    """Merge registry list row with marketplace metadata."""
    category = normalize_package_type(str(row.get("type") or "plugin"))
    base = PackageMarketplaceMeta(
        package_id=str(row.get("id") or ""),
        maintainer=str(row.get("author") or (meta.maintainer if meta else "")),
        license=str(row.get("license") or (meta.license if meta else "MIT")),
        category=category,
        compatibility=str(
            row.get("engine") or (meta.compatibility if meta else "adf-core>=0.8.0")
        ),
        publisher=str(row.get("author") or (meta.publisher if meta else "")),
    )
    if meta is not None:
        for key, value in meta.to_dict().items():
            if key == "package_id":
                continue
            if value not in ("", 0, 0.0, False, None, []):
                setattr(base, key, value)
        if meta.category:
            base.category = normalize_package_type(meta.category)
    payload = dict(row)
    payload.update(base.to_dict())
    payload["category"] = base.category
    return payload
