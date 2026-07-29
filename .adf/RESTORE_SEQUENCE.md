# Restore Sequence

## Why

A fixed sequence prevents “smart” AIs from skipping contract/state reads and inventing work.

## Mandatory Order

1. Confirm repo root (`.adf/`, `VERSION`, `README.md`)
2. Read `VERSION` + `PROJECT_MANIFEST.md`
3. Read `QUICK_CONTEXT.md`
4. Read `PROJECT_STATE.md` + `BUILD_STATUS.md`
5. Read `CURRENT_TASK.md` + `TODOS.md`
6. Accept `AI_CONTRACT.md` (+ `ARCHITECTURE_RULES.md` if editing structure/design)
7. Read `AI_RUNTIME.md` + `CONTEXT_ENGINE.md` (engine awareness)
8. Read `SESSION.md` + `MEMORY.md`
9. If design/architecture involved: `ADR_INDEX.md` (+ relevant ADRs)
10. Deepen via `CONTEXT_GRAPH.md` / indexes only as needed
11. Emit restore summary (see `CONTEXT_PIPELINE.md` outputs)
12. Enter state machine at **ANALYZE** (or **PLAN** if mission already clear)

## Example (Standard Pack)

```text
OK root
VERSION 0.4.0-alpha / BUILD-004
QUICK_CONTEXT matches state
CURRENT_TASK in scope
Contract accepted
Session notes read
→ Ready to ANALYZE remaining BUILD-004 items
```

## Failure Handling

| Failure | Action |
|---------|--------|
| Missing SSOT file | Restore/repair foundation before feature work |
| Identity mismatch | Fix VERSION/state/quick context first |
| Unknown BUILD drift | Stop; align CURRENT_TASK and BUILD_STATUS |

## Related

- `BOOT_SEQUENCE_V2.md`
- `RESUME_PROTOCOL.md`
- `AI_BOOT.md` (legacy detailed boot; V2 is engine-aligned)
