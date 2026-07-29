"""Registry search engine."""

from __future__ import annotations

from typing import Any, Callable

from packages.metadata import normalize_package_type


class RegistrySearch:
    """Search / facet helpers over decorated registry rows."""

    def __init__(self, catalog_provider: Callable[[], list[dict[str, Any]]]) -> None:
        self._catalog_provider = catalog_provider

    def _catalog(self) -> list[dict[str, Any]]:
        return list(self._catalog_provider())

    def search(
        self,
        query: str = "",
        *,
        category: str | None = None,
        tags: list[str] | None = None,
        verified_only: bool = False,
        publisher: str | None = None,
    ) -> list[dict[str, Any]]:
        """Full-text-ish search with optional facets."""
        q = query.strip().lower()
        rows = self._catalog()
        if category:
            cat = normalize_package_type(category)
            rows = [r for r in rows if normalize_package_type(str(r.get("category") or r.get("type"))) == cat]
        if publisher:
            pub = publisher.strip().lower()
            rows = [
                r
                for r in rows
                if pub in str(r.get("publisher") or "").lower()
                or pub in str(r.get("author") or "").lower()
                or pub in str(r.get("maintainer") or "").lower()
            ]
        if verified_only:
            rows = [r for r in rows if bool(r.get("verified"))]
        if tags:
            wanted = {t.lower() for t in tags}
            rows = [
                r
                for r in rows
                if wanted.intersection({str(t).lower() for t in (r.get("tags") or [])})
            ]
        if not q:
            return rows
        return [
            r
            for r in rows
            if q in str(r.get("id", "")).lower()
            or q in str(r.get("name", "")).lower()
            or q in str(r.get("description", "")).lower()
            or q in str(r.get("publisher", "")).lower()
            or any(q in str(t).lower() for t in (r.get("tags") or []))
        ]

    def featured(self) -> list[dict[str, Any]]:
        """Return featured packages (falls back to verified)."""
        rows = [r for r in self._catalog() if bool(r.get("featured"))]
        if rows:
            return rows
        return self.verified()

    def popular(self) -> list[dict[str, Any]]:
        """Sort by downloads then stars."""
        return sorted(
            self._catalog(),
            key=lambda r: (int(r.get("downloads") or 0), int(r.get("stars") or 0)),
            reverse=True,
        )

    def newest(self) -> list[dict[str, Any]]:
        """Sort by updated/created timestamps descending."""
        return sorted(
            self._catalog(),
            key=lambda r: str(r.get("updated") or r.get("created") or ""),
            reverse=True,
        )

    def verified(self) -> list[dict[str, Any]]:
        """Return verified packages."""
        return [r for r in self._catalog() if bool(r.get("verified"))]

    def publisher(self, name: str) -> list[dict[str, Any]]:
        """Filter by publisher/maintainer/author."""
        return self.search(publisher=name)

    def tags(self, *tag_values: str) -> list[dict[str, Any]]:
        """Filter by tags."""
        return self.search(tags=list(tag_values))
