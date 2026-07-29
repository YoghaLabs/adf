# ADR-008 — Service Layer Architecture

## Title

Service Layer Architecture

## Status

Accepted

## Context

ADF Core Engines (Runtime, Context, Knowledge, Template, Generator, Package, Plugin)
are independent implementation units. CLI historically called engines/managers directly.
ADF Studio and a public SDK need a stable orchestration boundary that does not leak
engine internals or duplicate business logic.

## Decision

1. **Engines remain independent.** Each engine/manager owns its domain logic and storage.
2. **Services orchestrate.** `adf-core/services/` provides facades (`RuntimeService`,
   `GeneratorService`, `PackageService`, …) that call engines without re-implementing them.
3. **ServiceManager** registers services and owns lifecycle (`register`, `unregister`,
   `get`, `list`, `health`, `boot`, `shutdown`).
4. **SDK depends on services.** `SDKClient` and SDK modules wrap services only.
5. **Studio uses SDK.** `WorkspaceService`, `ProjectService`, `ServiceManager`, and
   `SDKClient` form the Studio-ready surface.
6. **CLI and plugins** must not call engines directly; plugins receive `ServiceManager`
   via ExtensionAPI key `"services"`.

## Consequences

- One orchestration contract for CLI / SDK / Studio / plugins
- Engines can evolve internally without breaking public imports
- Business logic stays in engines; services stay thin

## Alternatives Considered

| Alternative | Why rejected |
|-------------|--------------|
| Expose engines as public API | Couples Studio/CLI to internals; hard to version |
| Duplicate logic in SDK | Violates SSOT and drifts from CLI behavior |
| Studio talks to files only | Skips validation, plugins, and package integrity |

## References

- `adf-docs/SERVICE_LAYER.md`
- `adf-docs/SDK_GUIDE.md`
- `adf-docs/PUBLIC_API.md`
- BUILD-010

## Future Impact

Marketplace (BUILD-011) and Studio (BUILD-013+) consume this layer without new engine
bindings in UI code.
