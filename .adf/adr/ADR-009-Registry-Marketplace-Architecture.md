# ADR-009 — Registry & Marketplace Architecture

## Title

Registry & Marketplace Architecture

## Status

Accepted

## Context

ADF needs a single source of truth for installable assets across local, GitHub,
GitLab, enterprise, and future cloud backends. A marketplace UX is required for
Studio without duplicating Package Manager install logic.

## Decision

1. **Registry is the source of truth** for package identity, providers, index metadata,
   publish, sync, and verification orchestration (`RegistryManager`).
2. **Marketplace is presentation only** (`MarketplaceManager`) — browse/search/shelves/
   favorites/collections; install/update/publish delegate to the Registry.
3. **Package Manager depends on Registry** for resolution/install. Registry does not
   re-implement dependency resolution or installer internals.
4. Providers wrap existing `packages.repository` backends (no duplicated fetch logic).
5. Component runtime `Registry` (BUILD-005) remains in the same Python package namespace
   but is a separate concept from the package catalog registry.

## Consequences

- One catalog contract for CLI/SDK/Studio
- Local-first today; remote providers ready without API churn
- Marketplace can evolve UI metadata without touching install pipelines

## Alternatives Considered

| Alternative | Why rejected |
|-------------|--------------|
| Marketplace owns install | Duplicates APM; drifts from CLI |
| PackageManager owns marketplace UX | Couples installer to presentation |
| New top-level folder | Violates locked repository architecture |

## References

- `adf-docs/REGISTRY.md`
- `adf-docs/MARKETPLACE.md`
- BUILD-009 APM, BUILD-010 Service Layer, BUILD-011

## Future Impact

Networked GitHub/GitLab/enterprise/cloud providers and signed package PKI land in
distribution builds without changing the service/SDK surfaces.
