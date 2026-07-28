# Project State

## Snapshot

| Field | Value |
|-------|-------|
| Current Version | `0.2.0-alpha` |
| Current Build | `BUILD-002` |
| Build Name | AI Runtime & Repository Intelligence |
| Status | `Completed` |
| Completed Builds | `BUILD-001`, `BUILD-002` |
| Pending Builds | `BUILD-003` … `BUILD-020` |
| Current Sprint | Alpha foundation — AI runtime SSOT |
| Current Milestone | Repository intelligence complete; await Architecture Review before BUILD-003 |
| Current Branch | `develop` |
| Current Objective | Keep `.adf` as SSOT; do not start BUILD-003 until approved |
| Next Build | `BUILD-003` |
| Last updated | 2026-07-29 |

## Why This File Matters

`PROJECT_STATE.md` is the live dashboard. If chat history is lost, this file plus `CURRENT_TASK.md` and `BUILD_STATUS.md` tell the next AI what is true **right now**.

## Completed Builds

| Build | Version | Result |
|-------|---------|--------|
| BUILD-001 | `0.1.0-alpha` | Repository foundation locked and documented |
| BUILD-002 | `0.2.0-alpha` | AI runtime SSOT + repository intelligence docs |

Detail: `BUILD_HISTORY.md`.

## Pending Builds (Summary)

BUILD-003 (bootstrap automation) through BUILD-020 (v1.0 gate). See `BUILD_STATUS.md` and `ROADMAP.md`.

## BUILD-002 Checklist

- [x] Expand existing `.adf` operating docs for SSOT clarity
- [x] Add AI runtime, workflow, maps, indexes, and standards files
- [x] Add build tracking (`BUILD_HISTORY`, `BUILD_STATUS`)
- [x] Add `bootstrap/BUILD-002/` specification pack
- [x] Expand `prompts/` and `adf-docs/` for runtime/workflow
- [x] Align `VERSION`, changelog, and README status table
- [x] Stop without starting BUILD-003

## Blockers

None for BUILD-002 delivery. **Gate:** Architecture Review of BUILD-002 before BUILD-003.

## State Update Rules

When status changes, update this file and also:

1. Root `VERSION`
2. `CHANGELOG.md`
3. `TODOS.md`
4. `CURRENT_TASK.md` (if objectives change)
5. `BUILD_STATUS.md` / `BUILD_HISTORY.md` (when builds advance)
6. `CHANGE_HISTORY.md` (for meaningful milestones)
7. `QUICK_CONTEXT.md`
