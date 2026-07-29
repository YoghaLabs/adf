# Package Registry

**Classes:** `RegistryManager`, `RegistryClient` (catalog)  
**Module:** `adf-core/registry/`  
**Installer dependency:** `packages.registry.RegistryClient` + `PackageManager`

## Backends / Providers

| Backend | Status |
|---------|--------|
| Local (`release/apm-registry`) | Enabled |
| GitHub | Architected, not networked |
| GitLab | Architected, not networked |
| Enterprise | Architected, not networked |
| Cloud (mock) | Empty catalog stand-in |

Local packages are directories containing `package.yaml`.

See also: `REGISTRY.md`, `MARKETPLACE.md`, ADR-009.
