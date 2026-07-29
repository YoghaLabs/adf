# Session Lifecycle

## Why

A “session” is the unit of AI work between handoffs. Without a lifecycle, agents neither open cleanly nor close cleanly — causing context loss.

## Lifecycle

```text
OPEN
  → RESTORE (Context Engine)
  → WORK (ANALYZE → … → VERIFY)
  → CHECKPOINT (optional but recommended)
  → COMMIT (when required)
  → HANDOFF / CLOSE
```

## OPEN

- New chat / new agent / resumed IDE agent
- Must run Boot V2 + Restore Sequence before edits

## WORK

Follow `STATE_MACHINE.md`. Stay inside `CURRENT_TASK` scope.

## CHECKPOINT

Create when:

- Switching operators
- Ending a long session mid-BUILD
- Before risky refactors (future runtime)

See `CHECKPOINTS.md`.

## HANDOFF / CLOSE

Mandatory updates:

1. `SESSION.md`
2. `TODOS.md` (truthful)
3. `PROJECT_STATE.md` if status changed
4. `CHANGELOG.md` / build tracking if shippable changes landed

## Example Close Note

```text
Session closed:
- Done: Context Engine specs + bootstrap pack
- Remaining: Architecture Review; no BUILD-005
- Checkpoint: CP-2026-07-29-BUILD-004-close
```

## Related

- `RESUME_PROTOCOL.md`
- `prompts/session.md`
- `adf-docs/SESSION_MANAGEMENT.md`
