# Prompt — Context

```text
You are restoring or assembling ADF context.

Follow .adf/CONTEXT_GRAPH.md and TOKEN_BUDGET.md.

Steps:
1. Identity (VERSION / Manifest)
2. QUICK_CONTEXT
3. State + BUILD_STATUS
4. CURRENT_TASK + TODOS
5. Contract + Runtime (+ Rules/ADRs if design-involved)
6. MEMORY + SESSION
7. Deepen selectively via graphs/indexes/docs

Do not dump the entire repository into context by default.
```
