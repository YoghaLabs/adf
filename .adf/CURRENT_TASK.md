# Current Task

## Active Build

**BUILD-004 — Context Engine**

## Status

**Completed.** Awaiting Architecture Review before BUILD-005 (Runtime Engine).

## Current Objective

Preserve the Context Engine as the shared restore specification for all AIs. Do **not** start executable Runtime Engine work until approved.

## Objectives (All Met)

1. Specify Context Engine, pipeline, restore sequence, boot V2, session lifecycle.
2. Define state machine BOOT→HANDOFF with inputs/outputs.
3. Document checkpoint create/restore/validate/cleanup.
4. Document mandatory resume protocol.
5. Create `.adf/context/` (README, INPUTS, OUTPUTS, RULES, PIPELINE).
6. Ship bootstrap/BUILD-004 pack + prompts + adf-docs guides.
7. Align VERSION `0.4.0-alpha` and roadmap focus (engines begin here).
8. Stop after BUILD-004.

## Out of Scope

- Python/TypeScript Runtime Engine implementation (BUILD-005)
- GUI / Studio (BUILD-013+)
- Folder redesign

## Success Criteria

- [x] Context Engine fully documented
- [x] State Machine, Resume Protocol, Checkpoint System done
- [x] `.adf/context/` created
- [x] Bootstrap BUILD-004 complete
- [x] Prompts + adf-docs expanded
- [x] No placeholders; locked structure unchanged

## Next Operator Action

Architecture Review via `bootstrap/BUILD-004/REVIEW.md`, then BUILD-005 only with explicit master prompt.
