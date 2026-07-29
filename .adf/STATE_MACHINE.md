# State Machine

## Why

Without explicit repository-operator states, AIs jump to IMPLEMENT, skip VERIFY, or commit without handoff. The state machine makes legal transitions visible and reviewable.

## States

```text
BOOT
  ↓
RESTORE
  ↓
ANALYZE
  ↓
PLAN
  ↓
IMPLEMENT
  ↓
VERIFY
  ↓
COMMIT
  ↓
HANDOFF
```

## State Definitions

| State | Purpose | Entry inputs | Exit outputs |
|-------|---------|--------------|--------------|
| **BOOT** | Recognize repo + engine | root files | boot OK / fail |
| **RESTORE** | Run Context Engine restore | SSOT files | restore summary |
| **ANALYZE** | Understand gap vs CURRENT_TASK | restore summary + tree | findings |
| **PLAN** | Bound next edits | findings | plan + file list |
| **IMPLEMENT** | Make additive changes | plan | changed files |
| **VERIFY** | Check acceptance / locks / no placeholders | changes | pass/fail notes |
| **COMMIT** | Record git history when required | verified changes | commit SHAs |
| **HANDOFF** | Update SSOT for next AI | session results | SESSION/TODOS/state updated |

## Transition Rules

- Do not IMPLEMENT before PLAN (except trivial typo fixes noted in SESSION)
- Do not COMMIT before VERIFY for BUILD-scoped work
- Do not start next BUILD during HANDOFF
- On VERIFY fail → return to PLAN or IMPLEMENT (not BOOT unless SSOT broken)
- On missing SSOT → remain in RESTORE until repaired

## Example Transition Trace

```text
BOOT → RESTORE → ANALYZE (BUILD-004 gaps)
→ PLAN (add STATE_MACHINE + CHECKPOINTS)
→ IMPLEMENT → VERIFY (acceptance checklist)
→ COMMIT → HANDOFF
```

## Mapping to Product Workflow

Idea/Specification happen before or within PLAN for BUILD packs. Review/Approval align with VERIFY/HANDOFF gates. See `WORKFLOW.md`.

## Related

- `CHECKPOINTS.md`
- `RESUME_PROTOCOL.md`
- `adf-docs/STATE_MACHINE.md`
