# BUILD-002 Spec

## Title

AI Runtime & Repository Intelligence

## Goal

Make `.adf/` sufficient for any AI to resume ADF without relying on prior chat.

## Update Existing (Expand, Do Not Wipe)

- `PROJECT_MANIFEST.md`, `PROJECT_STATE.md`, `CURRENT_TASK.md`, `PROJECT_DNA.md`
- `AI_CONTRACT.md`, `AI_BOOT.md`, `QUICK_CONTEXT.md`, `FULL_CONTEXT.md`
- `TODOS.md`, `CHANGE_HISTORY.md`, `SESSION.md`, `MEMORY.md`

## Create in `.adf/`

| File | Why |
|------|-----|
| `AI_RUNTIME.md` | Define operate loop |
| `WORKFLOW.md` | Define idea→release lifecycle |
| `BUILD_HISTORY.md` | Ledger of completed builds |
| `BUILD_STATUS.md` | Live BUILD-001…020 board |
| `REPOSITORY_MAP.md` | Folder purpose/owner/future |
| `MODULE_INDEX.md` | Module purpose map |
| `FILE_INDEX.md` | Important markdown catalog |
| `ARCHITECTURE_RULES.md` | Immutable rules |
| `NAMING_CONVENTION.md` | Naming rules |
| `DOCUMENTATION_STANDARD.md` | Writing rules |

## Create in `bootstrap/BUILD-002/`

`MASTER_PROMPT.md`, `BUILD_SPEC.md`, `ACCEPTANCE.md`, `REVIEW.md`, `CHANGELOG.md`

## Create in `prompts/`

`architecture.md`, `planning.md`, `review.md`, `release.md`, `generator.md`

## Create in `adf-docs/`

`AI_RUNTIME.md`, `BUILD_SYSTEM.md`, `WORKFLOW.md`, `BEST_PRACTICES.md`

## Project State Expansion

Track: Current Version, Current Build, Completed Builds, Pending Builds, Current Sprint, Current Milestone, Current Branch, Current Objective.

## Non-Goals

- Bootstrap automation scripts (BUILD-003)
- `adf-core` runtime code (BUILD-005)
- Studio GUI (BUILD-013+)
