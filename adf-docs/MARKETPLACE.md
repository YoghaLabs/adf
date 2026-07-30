# Marketplace

## Purpose

Marketplace is a **presentation layer** over the Registry.

It never duplicates install logic. Browse/search/favorites/collections live here;
install/update/publish delegate to `RegistryManager` → `PackageManager`.

## Types

- `MarketplaceManager`
- `MarketplaceItem`
- `MarketplaceCategory`
- `MarketplaceSearch`
- `MarketplaceFeatured`
- `MarketplaceCollection`
- `MarketplacePublisher`

## Studio surface

`MarketplaceManager.studio_api()` exposes browse, search, install, update, publish,
favorites, and collections.

## Related

- `REGISTRY.md`
- `PUBLIC_API.md`
- ADR-009
