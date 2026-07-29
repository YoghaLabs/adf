# Checkpoint System

## Why

Git commits capture file snapshots; checkpoints capture **operator continuity** (where the AI was in the state machine, what remains, what was validated). They reduce context loss when sessions end mid-BUILD.

Checkpoints are **documented records** in SSOT (primarily `SESSION.md` and optional dated notes). Executable checkpoint stores arrive with Runtime Engine (BUILD-005+).

## Checkpoint Creation

### Inputs

- Current BUILD / VERSION / branch
- State machine position
- Done / remaining lists
- Validation notes
- Risks / blockers

### Procedure

1. Complete or pause IMPLEMENT/VERIFY cleanly if possible
2. Write a checkpoint block into `SESSION.md` (mandatory)
3. Optionally reference id: `CP-YYYY-MM-DD-BUILD-00N-<slug>`
4. Update `TODOS.md` to match reality
5. If status changed, update `PROJECT_STATE.md`

### Example

```markdown
### Checkpoint CP-2026-07-29-BUILD-004-mid
- State machine: VERIFY
- Done: CONTEXT_ENGINE + PIPELINE + RESTORE_SEQUENCE
- Remaining: prompts + adf-docs finalize
- Validation: locked folders unchanged
- Next: resume at PLAN for remaining docs
```

## Checkpoint Restore

### Inputs

- Latest `SESSION.md` checkpoint block
- `PROJECT_STATE` / `CURRENT_TASK` / `TODOS`

### Procedure

1. Run full `RESTORE_SEQUENCE.md` first (never restore checkpoint alone)
2. Read latest checkpoint
3. Resume state machine at the recorded state (usually PLAN or IMPLEMENT)
4. Re-validate identity and BUILD scope

## Checkpoint Validation

| Check | Pass condition |
|-------|----------------|
| Identity | Checkpoint BUILD/VERSION matches SSOT or explains bump |
| Scope | Remaining items ⊆ CURRENT_TASK |
| Architecture | No unlock/rename proposals without ADR |
| Freshness | Not contradicted by newer commits/state |

## Checkpoint Cleanup

- Keep the latest checkpoint in `SESSION.md`
- Older checkpoints may be summarized into `CHANGE_HISTORY.md` / `BUILD_HISTORY.md` when a BUILD completes
- Do not delete historical evidence from `CHANGE_HISTORY` / ADRs
- Do not invent a new top-level `checkpoints/` folder (locked architecture)

## Related

- `SESSION_LIFECYCLE.md`
- `prompts/checkpoint.md`
- `adf-docs/CHECKPOINT_SYSTEM.md`
