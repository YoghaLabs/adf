# Context Graph

How an AI restores project context without prior chat.

**Why:** cold-start quality determines whether ADF is actually multi-agent or just well-foldered docs.

## Restore Flow

```text
VERSION / Manifest
        ↓
QUICK_CONTEXT
        ↓
PROJECT_STATE + BUILD_STATUS
        ↓
CURRENT_TASK + TODOS
        ↓
AI_CONTRACT + AI_RUNTIME (+ ARCHITECTURE_RULES)
        ↓
MEMORY + SESSION
        ↓
Deepen only as needed:
  DNA · ADRs · Knowledge/Context/Dependency graphs
  FILE/MODULE/REPO maps · FULL_CONTEXT · adf-docs
```

## Layers

| Layer | Files | Purpose |
|-------|-------|---------|
| Identity | `VERSION`, `PROJECT_MANIFEST` | Who/what/where |
| Snapshot | `QUICK_CONTEXT` | Minimal now |
| Truth | `PROJECT_STATE`, `BUILD_STATUS`, `BUILD_HISTORY` | What is complete/pending |
| Mission | `CURRENT_TASK`, `TODOS`, bootstrap pack | What to do |
| Law | `AI_CONTRACT`, `ARCHITECTURE_RULES`, ADRs | What is allowed |
| Continuity | `MEMORY`, `SESSION` | What not to forget |
| Depth | graphs, indexes, `FULL_CONTEXT`, docs | Why/how details |

## Token Discipline

Follow `TOKEN_BUDGET.md`:

1. Prefer Quick path for routine edits
2. Load ADRs when changing design or justifying architecture
3. Load graphs when explaining or auditing relationships
4. Avoid dumping entire `adf-docs/` by default

## Failure Modes

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Agent invents new folders | Skipped rules/ADRs | Re-boot; read ADR-001 |
| Agent starts wrong BUILD | Stale task/status | Sync state + task |
| Agent contradicts docs | Docs vs SSOT drift | Prefer `.adf`; patch docs |

## Related

- `AI_BOOT.md`
- `KNOWLEDGE_GRAPH.md`
- `adf-docs/CONTEXT_ENGINE.md`
