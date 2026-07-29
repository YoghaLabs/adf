# Build System

## Why ADF Uses Numbered Builds

Large AI efforts fail when scope is infinite. ADF slices delivery into **BUILD-001 → BUILD-020**, each with a mission, acceptance bar, and stop rule.

## Properties of a BUILD

- Cumulative (adds to prior work)
- Architecture-preserving (no locked-folder redesign)
- Documented (bootstrap pack + `.adf` tracking)
- Reviewable (diff + acceptance + optional Architecture Review)

## Tracking

| Artifact | Role |
|----------|------|
| `ROADMAP.md` | Planned missions |
| `.adf/BUILD_STATUS.md` | Live status board |
| `.adf/BUILD_HISTORY.md` | Completed ledger |
| `bootstrap/BUILD-00N/` | Spec pack for that BUILD |
| Root `VERSION` | Version/build/branch identity |

## Current

See root `VERSION` and `.adf/BUILD_STATUS.md`.

## Related

- `WORKFLOW.md`
- `.adf/ARCHITECTURE_RULES.md`
