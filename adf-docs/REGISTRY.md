# Registry

## Purpose

The **Registry** is the source of truth for installable ADF assets.

`RegistryManager` orchestrates providers, index, search, publish, verify, and sync.
`PackageManager` remains the installer — it depends on the registry for resolution.

## Location

`adf-core/registry/` (also hosts the BUILD-005 component `Registry`)

## Providers

| Provider | Status |
|----------|--------|
| LocalRegistryProvider | Enabled (`release/apm-registry`) |
| GitHubRegistryProvider | Architected |
| GitLabRegistryProvider | Architected |
| EnterpriseRegistryProvider | Architected |
| MockCloudRegistryProvider | Empty mock (future cloud) |

## Related

- `MARKETPLACE.md`
- `REGISTRY_API.md`
- ADR-009
