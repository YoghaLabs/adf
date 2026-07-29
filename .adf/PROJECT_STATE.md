# Project State

## Snapshot

| Field | Value |
|-------|-------|
| Current Version | `0.3.0-alpha` |
| Current Build | `BUILD-003` |
| Build Name | Knowledge Architecture & ADR System |
| Status | `Completed` |
| Completed Builds | `BUILD-001`, `BUILD-002`, `BUILD-003` |
| Pending Builds | `BUILD-004` … `BUILD-020` |
| Current Sprint | Alpha — Knowledge Layer |
| Current Milestone | M2 Decisions traceable; await Architecture Review before BUILD-004 |
| Current Branch | `develop` |
| Current Objective | Preserve ADR discipline; do not start BUILD-004 until review approval |
| Next Build | `BUILD-004` (Context Engine) |
| Last updated | 2026-07-29 |

## Why This File Matters

`PROJECT_STATE.md` is the live dashboard. If chat history is lost, this file plus `CURRENT_TASK.md` and `BUILD_STATUS.md` tell the next AI what is true **right now**.

## Completed Builds

| Build | Version | Result |
|-------|---------|--------|
| BUILD-001 | `0.1.0-alpha` | Repository foundation locked and documented |
| BUILD-002 | `0.2.0-alpha` | AI runtime SSOT + repository intelligence docs |
| BUILD-003 | `0.3.0-alpha` | Knowledge architecture, graphs, ADR system |

Detail: `BUILD_HISTORY.md`.

## Pending Builds (Summary)

BUILD-004 (Context Engine) through BUILD-020 (v1.0 gate). See `BUILD_STATUS.md` and `ROADMAP.md`.

## BUILD-003 Checklist

- [x] Create `.adf/adr/` with ADR-001, ADR-002, ADR-003
- [x] Add knowledge architecture files (graphs, glossary, timeline, risks, tech stack, milestones)
- [x] Update state/manifest/history/indexes/memory/session/todos
- [x] Add `bootstrap/BUILD-003/` pack
- [x] Expand prompts and `adf-docs` knowledge guides
- [x] Update README Architecture Evolution + ROADMAP statuses
- [x] Stop without starting BUILD-004

## Blockers

None for BUILD-003 delivery. **Gate:** Architecture Review of BUILD-003 before BUILD-004.

## Permanent Rule (from BUILD-003)

All architecture changes require a new ADR. See `ADR_INDEX.md`.

## State Update Rules

When status changes, update this file and also:

1. Root `VERSION`
2. `CHANGELOG.md`
3. `TODOS.md`
4. `CURRENT_TASK.md` (if objectives change)
5. `BUILD_STATUS.md` / `BUILD_HISTORY.md`
6. `CHANGE_HISTORY.md` / `PROJECT_TIMELINE.md` / `MILESTONES.md` when milestones move
7. `QUICK_CONTEXT.md`
