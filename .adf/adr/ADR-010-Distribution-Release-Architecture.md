# ADR-010 — Distribution & Release Architecture

## Title

Distribution & Release Architecture

## Status

Accepted

## Context

ADF needs a complete backend distribution platform before Studio: installers,
updaters, release channels, packaging, offline and enterprise bundles. Package
Manager already installs packages; Marketplace presents registry catalog. Mixing
release lifecycle into those layers would couple unrelated concerns.

## Decision

1. **Release Manager exists** to own create/publish/promote/archive across
   mandatory channels (development → alpha → beta → rc → stable → lts).
2. **Distribution is separated** from Registry/Marketplace/APM as the release
   and artifact orchestration layer (`adf-core/distribution/`).
3. **Update Manager is independent** so channel updates/rollbacks do not entangle
   per-package APM updates.
4. **Release channels are mandatory** to make promotion and support policy explicit.
5. Installer may delegate package installs to PackageManager (no duplicated APM logic).

## Consequences

- Clear service/SDK surfaces for Studio later
- Offline/enterprise bundles share builders without forking APM
- Channel promotion is policy-checked

## Alternatives Considered

| Alternative | Why rejected |
|-------------|--------------|
| Put releases inside PackageManager | Couples package install to product release lifecycle |
| Marketplace owns updates | Presentation layer must not manage binaries |
| Single “stable-only” channel | Blocks staged rollout and LTS policy |

## References

- `adf-docs/DISTRIBUTION.md`
- BUILD-009 APM, BUILD-011 Registry/Marketplace, BUILD-012

## Future Impact

Desktop bundles and networked signed releases can extend builders/signature
abstraction without redesigning services.
