"""Marketplace presentation layer over the Registry (no install logic)."""

from __future__ import annotations

from dataclasses import asdict, dataclass, field
from typing import Any

from packages.metadata import MARKETPLACE_CATEGORIES, normalize_package_type
from registry.registry_manager import RegistryManager


@dataclass
class MarketplaceCategory:
    """Marketplace category descriptor."""

    id: str
    label: str
    count: int = 0

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass
class MarketplaceItem:
    """Presentation DTO for a registry package."""

    id: str
    name: str
    version: str
    category: str
    description: str = ""
    publisher: str = ""
    rating: float = 0.0
    downloads: int = 0
    stars: int = 0
    verified: bool = False
    featured: bool = False
    tags: list[str] = field(default_factory=list)
    license: str = "MIT"
    compatibility: str = ""

    @classmethod
    def from_row(cls, row: dict[str, Any]) -> MarketplaceItem:
        return cls(
            id=str(row.get("id") or ""),
            name=str(row.get("name") or row.get("id") or ""),
            version=str(row.get("version") or ""),
            category=normalize_package_type(str(row.get("category") or row.get("type") or "plugin")),
            description=str(row.get("description") or ""),
            publisher=str(row.get("publisher") or row.get("author") or row.get("maintainer") or ""),
            rating=float(row.get("rating") or 0.0),
            downloads=int(row.get("downloads") or 0),
            stars=int(row.get("stars") or 0),
            verified=bool(row.get("verified")),
            featured=bool(row.get("featured")),
            tags=[str(t) for t in (row.get("tags") or [])],
            license=str(row.get("license") or "MIT"),
            compatibility=str(row.get("compatibility") or row.get("engine") or ""),
        )

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass
class MarketplaceCollection:
    """Named collection of marketplace item ids."""

    id: str
    title: str
    item_ids: list[str] = field(default_factory=list)
    description: str = ""

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass
class MarketplaceFeatured:
    """Featured shelf."""

    title: str
    items: list[MarketplaceItem] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {"title": self.title, "items": [i.to_dict() for i in self.items]}


class MarketplaceSearch:
    """Marketplace search facade over RegistryManager search."""

    def __init__(self, registry: RegistryManager) -> None:
        self.registry = registry

    def search(self, query: str = "", **kwargs: Any) -> list[MarketplaceItem]:
        return [MarketplaceItem.from_row(r) for r in self.registry.search(query, **kwargs)]

    def featured(self) -> list[MarketplaceItem]:
        return [MarketplaceItem.from_row(r) for r in self.registry.featured()]

    def popular(self) -> list[MarketplaceItem]:
        return [MarketplaceItem.from_row(r) for r in self.registry.popular()]

    def newest(self) -> list[MarketplaceItem]:
        return [MarketplaceItem.from_row(r) for r in self.registry.newest()]

    def verified(self) -> list[MarketplaceItem]:
        return [MarketplaceItem.from_row(r) for r in self.registry.verified()]


class MarketplacePublisher:
    """Publisher view for marketplace UI."""

    def __init__(self, registry: RegistryManager) -> None:
        self.registry = registry

    def list(self) -> list[dict[str, Any]]:
        return self.registry.publishers.list()

    def get(self, publisher_id: str) -> dict[str, Any] | None:
        profile = self.registry.publishers.get(publisher_id)
        return profile.to_dict() if profile else None

    def packages(self, publisher_id: str) -> list[MarketplaceItem]:
        return [MarketplaceItem.from_row(r) for r in self.registry.by_publisher(publisher_id)]


class MarketplaceManager:
    """Presentation-only marketplace API for Studio/SDK/CLI browse flows.

    Install/update always go through RegistryManager → PackageManager.
    """

    def __init__(self, registry: RegistryManager) -> None:
        self.registry = registry
        self.search = MarketplaceSearch(registry)
        self.publisher = MarketplacePublisher(registry)
        self._favorites: set[str] = set()
        self._collections: dict[str, MarketplaceCollection] = {
            "essentials": MarketplaceCollection(
                id="essentials",
                title="Essentials",
                description="Core demo packages",
            )
        }

    def browse(self) -> list[MarketplaceItem]:
        return [MarketplaceItem.from_row(r) for r in self.registry.list()]

    def categories(self) -> list[MarketplaceCategory]:
        counts: dict[str, int] = {c: 0 for c in MARKETPLACE_CATEGORIES}
        for row in self.registry.list():
            cat = normalize_package_type(str(row.get("category") or row.get("type") or ""))
            if cat in counts:
                counts[cat] += 1
        return [
            MarketplaceCategory(id=cid, label=cid.replace("-", " ").title(), count=count)
            for cid, count in counts.items()
        ]

    def featured_shelf(self) -> MarketplaceFeatured:
        return MarketplaceFeatured(title="Featured", items=self.search.featured())

    def install(self, package_id: str, *, overwrite: bool = False) -> dict[str, Any]:
        return self.registry.install(package_id, overwrite=overwrite)

    def update(self, package_id: str) -> dict[str, Any]:
        return self.registry.package_manager.update(package_id)

    def publish(self, source: str, *, publisher_id: str = "YoghaLabs", overwrite: bool = False) -> dict[str, Any]:
        return self.registry.publish(source, publisher_id=publisher_id, overwrite=overwrite)

    def favorite(self, package_id: str) -> dict[str, Any]:
        self._favorites.add(package_id)
        return {"ok": True, "favorites": sorted(self._favorites)}

    def unfavorite(self, package_id: str) -> dict[str, Any]:
        self._favorites.discard(package_id)
        return {"ok": True, "favorites": sorted(self._favorites)}

    def favorites(self) -> list[MarketplaceItem]:
        items = {i.id: i for i in self.browse()}
        return [items[i] for i in sorted(self._favorites) if i in items]

    def collections(self) -> list[dict[str, Any]]:
        # Keep essentials collection synced to current catalog ids.
        essentials = self._collections["essentials"]
        essentials.item_ids = [i.id for i in self.browse()[:5]]
        return [c.to_dict() for c in self._collections.values()]

    def studio_api(self) -> dict[str, Any]:
        """Stable Studio surface map."""
        return {
            "browse": True,
            "search": True,
            "install": True,
            "update": True,
            "publish": True,
            "favorites": True,
            "collections": True,
            "categories": [c.to_dict() for c in self.categories()],
        }
