# ADR-007 — ADF Package Management Architecture

## Title

ADF Package Management Architecture (APM)

## Status

Accepted

## Context

ADF needs to distribute templates, plugins, generators, prompt/bootstrap/docs packs,
and future Studio extensions without hardcoding them into the runtime.

## Decision

1. Everything installable is a **package** with `package.yaml`.
2. `PackageManager` is the public API; CLI only wraps it.
3. Local registry is default (`release/apm-registry`); GitHub/GitLab/private adapters
   are prepared but not networked in BUILD-009.
4. Installs land under `.adf/apm/installed/{type}/{id}` with cache + `adf.lock`.
5. Dependency resolution uses semver constraints with cycle detection.

## Consequences

- New capabilities ship as packages, not core forks
- Lockfile enables reproducible installs
- Offline mode can use cache when configured

## Alternatives Considered

| Alternative | Why rejected |
|-------------|--------------|
| Hardcoded builtin lists in RuntimeEngine | Not extensible; violates package-based mission |
| npm/pip only | Does not cover templates/prompts/bootstrap packs uniformly |

## References

- `adf-docs/PACKAGE_MANAGER.md`
- BUILD-006 plugins, BUILD-007 templates, BUILD-008 generator

## Future Impact

Remote registries and signed packages (checksum/signature fields already in manifest).
