# Context Engine Outputs

## Why

If restore has no explicit outputs, operators cannot tell whether the AI actually restored or merely started coding.

## Required Outputs (every successful restore)

| Output | Form | Example |
|--------|------|---------|
| Identity line | text | `adf @ 0.4.0-alpha / BUILD-004 / develop` |
| Status line | text | `State=Completed; Next=BUILD-005 (gated)` |
| Mission line | text | objective from CURRENT_TASK |
| Pack used | Quick\|Standard\|Deep | `Pack=Standard` |
| State machine entry | text | `Entering ANALYZE` |
| Blockers | text or `None` | from STATE/SESSION |

## Optional Outputs

- Checkpoint id restored
- Files prioritized for next PLAN
- Validation warnings

## Side Effects (SSOT writes)

Restore itself is mostly read-only. Writes happen when work proceeds:

| Event | Outputs to update |
|-------|-------------------|
| Work progressed | `TODOS.md`, `SESSION.md` |
| Status changed | `PROJECT_STATE.md`, `BUILD_STATUS.md`, `QUICK_CONTEXT.md` |
| Session end | checkpoint block + handoff fields |
| BUILD complete | `BUILD_HISTORY.md`, `CHANGELOG.md`, `VERSION` as needed |

## Example Output Block

```text
CONTEXT ENGINE OUTPUT
Identity: adf @ 0.4.0-alpha / BUILD-004 / develop
Status: In Progress → goals remaining in CURRENT_TASK
Mission: Finalize Context Engine specification
Pack: Standard
Validation: OK
Next state: ANALYZE
Blockers: None
```
