# Memory System

## Why

ADF separates durable facts from session chatter so resume quality does not depend on a single vendor chat window.

## Components

| File | Role |
|------|------|
| `.adf/MEMORY.md` | Durable cross-session facts |
| `.adf/SESSION.md` | Latest handoff notes |
| `.adf/TODOS.md` | Checklist truth |
| `.adf/DECISION_LOG.md` | Short decision journal |
| `.adf/adr/` | Full architecture rationale |

## Practices

- Keep MEMORY small and stable
- Refresh SESSION at handoff
- Promote design choices to ADRs

## Related

- `PROJECT_LIFECYCLE.md`
- `.adf/AI_RUNTIME.md`
