# Current Task

## Active Build

**BUILD-005 — Runtime Engine Foundation**

## Status

**Completed.** Awaiting Architecture Review before BUILD-006.

## Current Objective

Preserve the first executable Runtime Engine in `adf-core`. Do **not** start BUILD-006 until review approval.

## Objectives (All Met)

1. Initialize `adf-core` as a Python package with locked subpackage layout.
2. Implement Runtime/Context/Memory/Bootstrap engines and core managers.
3. Implement Registry, PromptLoader, ProjectLoader with markdown loading.
4. Provide CLI skeleton commands.
5. Add pytest suite.
6. Ship bootstrap pack, prompts, and docs.
7. Align identity to `0.5.0-alpha` / BUILD-005.
8. Stop after BUILD-005.

## Out of Scope

- Full Context Engine hardening (BUILD-006+)
- Studio GUI (BUILD-013+)
- Folder redesign / deleting docs

## Next Operator Action

Architecture Review via `bootstrap/BUILD-005/REVIEW.md`, then BUILD-006 only with explicit master prompt.
