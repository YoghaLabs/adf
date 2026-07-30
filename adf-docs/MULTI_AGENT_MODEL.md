# Multi-Agent Model

**Build:** BUILD-017 · **Status:** Architecture / data model only

## Intent

Model a future multi-agent workflow without executing it:

```
Planner AI
    │
    ▼
Architect AI
    │
    ├──────────────┐
    ▼              ▼
Backend AI    Frontend AI
    │              │
    └──────┬───────┘
           ▼
        QA AI
           │
           ▼
  Documentation AI
           │
           ▼
      Release AI
```

## What exists now

- `MultiAgentNode` type (`id`, `label`, `role`, `description`, `next`)
- Fixture `MULTI_AGENT_MODEL`
- SDK `collaboration.multiAgentModel`
- Studio panel (read-only)

## What does **not** exist

- Automatic handoffs
- Planner-driven execution
- Background agent runners

Automation may land after ADF v1.0 on this model foundation.
