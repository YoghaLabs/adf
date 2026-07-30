# ADR-018 — Production Release Principles

## Title

Production Release Principles

## Status

Accepted

## Context

ADF completed cumulative builds BUILD-001…019. BUILD-020 produces a demonstrable
Release Candidate. Without explicit freeze rules, agents may keep inventing
platforms or mutating APIs, undermining enterprise trust.

## Decision

1. **Architecture is frozen for v1.** No new top-level folders, no new platforms,
   no redesign in BUILD-020 or subsequent RC patches without a new major program.
2. **Documentation becomes authoritative.** `adf-docs/` + release notes define
   operator truth for RC1; changes require CHANGELOG entries.
3. **v1.0 marks API stability intent.** Service Layer / public SDK contracts should
   not break within `1.x` without deprecation policy. Studio presentation caches
   are not public API.
4. **RC ≠ GA.** Signing, notarization, and numeric coverage gates may remain open
   until `1.0.0` GA while RC1 stays demo/packaging complete.

## Consequences

- Safe demos and packaging
- Clear stop after BUILD-020
- Predictable upgrade story via `MIGRATION_GUIDE.md`

## Alternatives Considered

| Alternative | Why rejected |
|-------------|--------------|
| Keep shipping new platforms in 020 | Violates mission |
| Treat fixtures as stable public API | Couples consumers to demo data |
| Skip docs freeze | Breaks enterprise adoption narrative |

## References

- `adf-docs/RELEASE_NOTES.md`
- `release/PRODUCTION_REVIEW.md`
- BUILD-020

## Future Impact

GA (`1.0.0`) closes signing/coverage gates on this frozen architecture.
