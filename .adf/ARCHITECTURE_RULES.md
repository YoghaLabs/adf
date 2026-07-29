# Architecture Rules

Immutable repository rules for ADF. **Why:** without immutables, every agent “improves” structure and destroys resumability.

## Immutable Rules

1. **Never redesign** the locked top-level architecture during normal BUILDs.
2. **Never duplicate** authoritative truth without a canonical owner — link to SSOT instead of copying status into ad-hoc files.
3. **Never move** or rename locked top-level folders.
4. **Always cumulative** — extend prior builds; do not erase foundation docs to make space.
5. **Never delete documentation** — deprecate in place and update indexes.
6. **Never create placeholders** — every file must contain meaningful, why-aware content.
7. **`.adf` is SSOT** for AI runtime intelligence.
8. **One BUILD at a time** — do not silently start the next BUILD.
9. **Root `VERSION` leads version identity** — changelog and state must follow it.
10. **New top-level folders are forbidden** unless an explicit architecture-change BUILD authorizes them (rare, deliberate).
11. **No architecture change without an ADR** (from BUILD-003 through BUILD-020) — record under `.adf/adr/` and index in `ADR_INDEX.md`.

## Allowed Changes

- Add files inside existing locked folders
- Expand existing documentation
- Update state/tracking files to match reality
- Add per-BUILD packs under `bootstrap/BUILD-00N/`
- Implement deferred modules when their BUILD arrives

## Disallowed Changes

- Renaming `adf-core` → something else “clearer”
- Creating parallel roots like `docs/` or `src/` at top level
- Rewriting BUILD-001 docs from scratch instead of expanding them
- Shipping empty stubs “to fill later”

## Enforcement

- Human Architecture Review at BUILD gates
- `prompts/audit.md` / `prompts/review.md`
- Future automated checks in BUILD-003/011

## Related

- `AI_CONTRACT.md`
- `NAMING_CONVENTION.md`
- `REPOSITORY_MAP.md`
- `bootstrap/BUILD_CONTRACT.md`
