# Context Pipeline

## Why

Restore is not a single file read. It is a **pipeline**: collect inputs, validate, assemble context packs, emit outputs the operator can act on, then update state.

## Pipeline Overview

```text
INPUTS
  → VALIDATE
  → ASSEMBLE (Quick | Standard | Deep)
  → EMIT OUTPUTS
  → ENTER STATE MACHINE (ANALYZE…)
  → ON EXIT: UPDATE SSOT + optional CHECKPOINT
```

## Stages

### 1. Inputs

See `.adf/context/INPUTS.md`.

Examples: `VERSION`, `QUICK_CONTEXT`, `PROJECT_STATE`, `BUILD_STATUS`, `CURRENT_TASK`, `TODOS`, `SESSION`, `MEMORY`, ADRs (if design-involved).

### 2. Validate

- Identity matches across `VERSION` / `PROJECT_STATE` / `QUICK_CONTEXT`
- Active BUILD aligns with `CURRENT_TASK`
- Locked architecture still intact (spot-check top-level folders)
- No contradictory “next build” pointers

**Why:** acting on desynced SSOT is worse than asking for clarification.

### 3. Assemble

| Pack | When | Contents (normative minimum) |
|------|------|-------------------------------|
| Quick | Tiny fix / status check | VERSION + QUICK_CONTEXT + CURRENT_TASK |
| Standard | Normal BUILD work | Quick + STATE + BUILD_STATUS + TODOS + CONTRACT + RUNTIME |
| Deep | Architecture / audit / handoff | Standard + DNA + ADRs + graphs + FULL_CONTEXT as needed |

Respect `TOKEN_BUDGET.md` and `CONTEXT_GRAPH.md`.

### 4. Outputs

See `.adf/context/OUTPUTS.md`.

Example operator output after restore:

```text
Restored: adf @ 0.4.0-alpha / BUILD-004 / develop
State: Completed | Next: BUILD-005 (gated)
Mission: <from CURRENT_TASK>
Risks: <from SESSION / RISK_REGISTER if any>
Ready for: ANALYZE | PLAN | IMPLEMENT (per STATE_MACHINE)
```

### 5. Handoff / Checkpoint

Before ending a session, update SSOT and optionally create a checkpoint record (see `CHECKPOINTS.md`).

## Related

- `RESTORE_SEQUENCE.md`
- `context/PIPELINE.md`
- `RESUME_PROTOCOL.md`
