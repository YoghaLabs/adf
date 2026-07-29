# ADR-002 — Build Lifecycle

## Title

Cumulative numbered BUILD lifecycle (BUILD-001 → BUILD-020)

## Status

Accepted

## Context

Unbounded AI missions invite redesign loops and unfinished mega-prompts. ADF needed a delivery unit that is scoped, reviewable, and stoppable.

**Why this mattered:** without lifecycle boundaries, agents “helpfully” start the next feature before the current contract is solid.

## Decision

Deliver ADF through numbered **BUILD** increments:

1. Each BUILD has a mission, acceptance criteria, and stop rule
2. Builds are cumulative — extend, do not erase
3. Per-BUILD packs live under `bootstrap/BUILD-00N/`
4. Status is tracked in `BUILD_STATUS.md` and ledgered in `BUILD_HISTORY.md`
5. Version identity updates via root `VERSION` + `CHANGELOG.md`
6. Do not auto-start the next BUILD after completion

Lifecycle path: Idea → Specification → Implementation → Review → Approval → Release (see `WORKFLOW.md`).

## Consequences

- Positive: auditable progress and clear Architecture Review gates
- Positive: AI handoff has an explicit “done” condition
- Negative: slower than improvisational coding for tiny tweaks
- Negative: roadmap rows may be refined as missions clarify (content may shift; folder lock does not)

## Alternatives Considered

| Alternative | Why rejected |
|-------------|--------------|
| Continuous unstructured commits only | No mission boundary; weak review story |
| Milestone tags without BUILD packs | Insufficient operator guidance for AIs |
| Single “v1 prompt” to build everything | Non-resumable; high drift risk |

## References

- `.adf/WORKFLOW.md`
- `.adf/BUILD_STATUS.md`
- `.adf/BUILD_HISTORY.md`
- `adf-docs/BUILD_SYSTEM.md`
- `bootstrap/BUILD_CONTRACT.md`

## Future Impact

BUILD-004+ (Context Engine, runtime, Studio) must ship as BUILD packs with acceptance and review artifacts. Skipping the lifecycle is a process defect.
