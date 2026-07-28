# Current Task

## Active Build

**BUILD-002 — AI Runtime & Repository Intelligence**

## Status

**Completed.** Awaiting Architecture Review before BUILD-003.

## Current Objective

Preserve `.adf/` as the Single Source of Truth so any AI can resume ADF using only `.adf` (plus root `VERSION` / contracts referenced from there). Do **not** start BUILD-003 until review approval.

## Objectives (All Met)

1. Expand existing `.adf` docs so identity, state, DNA, contracts, boot, context, todos, history, session, and memory support AI runtime continuity.
2. Create AI runtime and workflow documentation (`AI_RUNTIME.md`, `WORKFLOW.md`).
3. Create build tracking (`BUILD_HISTORY.md`, `BUILD_STATUS.md`).
4. Create repository intelligence maps (`REPOSITORY_MAP.md`, `MODULE_INDEX.md`, `FILE_INDEX.md`).
5. Create immutable standards (`ARCHITECTURE_RULES.md`, `NAMING_CONVENTION.md`, `DOCUMENTATION_STANDARD.md`).
6. Add `bootstrap/BUILD-002/` specification pack.
7. Add prompts: architecture, planning, review, release, generator.
8. Add `adf-docs` pages: AI runtime, build system, workflow, best practices.
9. Bump version identity to `0.2.0-alpha` consistently.
10. Stop after BUILD-002 — no BUILD-003 implementation.

## Out of Scope (Respected)

- Redesigning or renaming locked top-level folders
- Deleting or overwriting BUILD-001 documentation (expand only)
- Executable bootstrap automation (BUILD-003)
- Runtime code in `adf-core` (BUILD-005)
- GUI work in `adf-studio` (BUILD-013+)

## Success Criteria

- [x] `.adf` is the SSOT for project intelligence
- [x] A new AI can understand the project from `.adf` alone
- [x] Builds are documented in `BUILD_HISTORY.md` and `BUILD_STATUS.md`
- [x] Documentation and architecture standards are written
- [x] `bootstrap/BUILD-002/` contains the BUILD-002 pack
- [x] No empty/placeholder markdown
- [x] Locked folder structure unchanged

## Why This Task File Exists

Chat is ephemeral. `CURRENT_TASK.md` pins the mission boundary so agents do not invent new work mid-session.

## Next Operator Action

1. Human Architecture Review of BUILD-002
2. Optional: `prompts/audit.md` / `prompts/review.md`
3. Start BUILD-003 only with an explicit new master prompt
