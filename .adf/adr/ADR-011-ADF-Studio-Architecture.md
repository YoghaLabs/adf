# ADR-011 — ADF Studio Architecture

## Title

ADF Studio Architecture

## Status

Accepted

## Context

Phase 3 needs a Desktop Control Center for Workspace, Projects, Marketplace,
Runtime, Knowledge, Release, and Settings. Embedding business logic in the GUI
would fork policy already owned by the Service Layer (ADR-008) and invite drift
from CLI/SDK consumers.

## Decision

1. **Studio contains no business logic.** React pages and Zustand stores only
   orchestrate presentation state and call SDK adapters.
2. **SDK adapters are mandatory.** All Studio → Core traffic goes through
   TypeScript clients (`RuntimeClient`, `GeneratorClient`, `PackageClient`,
   `MarketplaceClient`, `RegistryClient`, `ReleaseClient`, …) over a bridge that
   returns `ServiceEnvelope`-shaped results.
3. **Services remain backend-only.** Domain rules stay in Python
   `adf-core/services/` and engines. Studio never reimplements PackageManager,
   ReleaseManager, registry policy, or install validation.
4. **Tauri + Vite React** hosts the desktop shell; Studio is a control center,
   not an IDE.

## Consequences

- One policy surface for CLI, SDK, plugins, and Studio
- UI can evolve without changing Core contracts
- Fixtures enable Studio development before the native bridge is fully wired

## Alternatives Considered

| Alternative | Why rejected |
|-------------|--------------|
| Put install/update rules in React | Duplicates APM/distribution; breaks ADR-008 |
| Call engines from Tauri Rust | Bypasses Service Layer; hard to keep parity with CLI |
| Next.js App Router as desktop host | Awkward with Tauri webview; Vite + React Router fits |

## References

- `adf-docs/STUDIO_ARCHITECTURE.md`
- ADR-008 Service Layer Architecture
- BUILD-013

## Future Impact

Native Tauri invoke replacing fixtures, deeper Session/Knowledge UX (BUILD-014+),
without relocating business logic into the GUI.
