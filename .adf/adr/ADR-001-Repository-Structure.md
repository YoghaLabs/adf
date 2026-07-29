# ADR-001 — Repository Structure

## Title

Locked top-level repository structure for ADF

## Status

Accepted

## Context

ADF must remain resumable across many AI tools and human contributors. If each session invents new top-level folders or renames packages, handoff breaks, indexes rot, and cumulative builds become impossible. BUILD-001 therefore needed a durable structural contract before runtime code existed.

**Why this mattered:** structure is the first thing every AI discovers; instability here multiplies into documentation and tooling chaos.

## Decision

Freeze the top-level layout:

```text
.adf/  adf-core/  adf-studio/  adf-docs/  adf-examples/  adf-templates/
bootstrap/  prompts/  testing/  tools/  release/
```

Rules:

- Do not add new top-level folders in normal BUILDs
- Do not rename or move locked folders
- Expand only inside existing trees

## Consequences

- Positive: stable paths for SSOT, prompts, bootstrap packs, and future tooling
- Positive: Architecture Reviews can fail changes that violate the lock
- Negative: occasional inconvenience when a new concern appears — must fit an existing owner or wait for a rare architecture-change BUILD + new ADR
- Negative: early package scaffolds exist before implementation (intentional)

## Alternatives Considered

| Alternative | Why rejected |
|-------------|--------------|
| Free-form folders per BUILD | Destroys resumability and indexing |
| Monorepo `src/` + `docs/` only | Hides AI operating files; weak SSOT boundary |
| Rename packages for “clarity” later | Breaks links, history, and agent habits |

## References

- `.adf/ARCHITECTURE_RULES.md`
- `.adf/REPOSITORY_MAP.md`
- `adf-docs/ARCHITECTURE.md`
- BUILD-001 foundation commits

## Future Impact

All later builds (including Studio and core runtime) must land under these names. Any structural exception requires a new ADR and explicit Architecture Review.
