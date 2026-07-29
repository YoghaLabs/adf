# Resume Protocol

## Why

Every supported AI must resume identically. This protocol is mandatory — not advisory.

## Inputs

| Input | Source |
|-------|--------|
| Identity | `VERSION`, `PROJECT_MANIFEST.md` |
| Snapshot | `QUICK_CONTEXT.md` |
| Truth | `PROJECT_STATE.md`, `BUILD_STATUS.md` |
| Mission | `CURRENT_TASK.md`, `TODOS.md` |
| Continuity | `SESSION.md`, `MEMORY.md` |
| Law | `AI_CONTRACT.md`, `ARCHITECTURE_RULES.md` |
| Engine | `CONTEXT_ENGINE.md`, `RESTORE_SEQUENCE.md` |
| Optional depth | ADRs, graphs, `FULL_CONTEXT.md` |

## Mandatory Reading Order

Follow `RESTORE_SEQUENCE.md` (do not reorder).

## Mandatory Validation

1. `VERSION` == version fields in `PROJECT_STATE` / `QUICK_CONTEXT`
2. `CURRENT_TASK` BUILD id == `PROJECT_STATE` current build (or explicitly completing handoff)
3. Next-build stop rule respected
4. No placeholder intent in active mission
5. Locked top-level folders unchanged

If validation fails: **stop implementation**, repair SSOT, record note in `SESSION.md`.

## Mandatory State Update (before meaningful edits)

Emit a short restore summary, then set mental/logical state machine position:

`BOOT → RESTORE → ANALYZE` (then PLAN…)

## Outputs

| Output | Destination |
|--------|-------------|
| Restore summary | Chat (operator-visible) |
| Session continuity | Update `SESSION.md` when work proceeds/ends |
| Task truth | Update `TODOS.md` / `CURRENT_TASK.md` as work completes |
| Optional checkpoint | `SESSION.md` checkpoint block |

## Example Resume

```text
RESUME PROTOCOL
Read: VERSION → QUICK_CONTEXT → STATE → TASK → CONTRACT → ENGINE → SESSION
Validate: 0.4.0-alpha / BUILD-004 aligned — OK
Checkpoint: CP-…-mid → resume at PLAN
Output: Ready to implement remaining Context Engine docs
```

## Non-Negotiables

- Do not skip restore because “I was here yesterday”
- Do not use only README as restore
- Do not start BUILD-00N+1 during resume of BUILD-00N

## Related

- `BOOT_SEQUENCE_V2.md`
- `STATE_MACHINE.md`
- `prompts/restore.md`
- `adf-docs/AI_RESTORE_GUIDE.md`
