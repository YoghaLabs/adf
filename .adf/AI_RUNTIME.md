# AI Runtime

## Why This File Exists

ADF must work across Cursor, ChatGPT, Claude, Codex, OpenCode, and future agents. Chat memory is not portable. **`.adf/` is the runtime**: files an AI must read and write to operate the project correctly.

## Operating Loop

```text
Boot
  → Read Manifest
  → Read State
  → Read Todos
  → Read Current Task
  → Read Memory (+ Session)
  → Resume
  → Execute
  → Update State
  → Commit (when required)
  → Handoff
```

### 1. Boot

Follow `AI_BOOT.md` in order. Do not skip contract acceptance.

### 2. Read Manifest

`PROJECT_MANIFEST.md` (+ root `VERSION`) answers: what project, what version, what build, what branch, where SSOT lives.

### 3. Read State

`PROJECT_STATE.md` + `BUILD_STATUS.md` answer: what is true now, what is completed, what is pending, what milestone/gate exists.

### 4. Read Todos

`TODOS.md` answers: remaining checklist items for the active build and queued work.

### 5. Read Current Task

`CURRENT_TASK.md` answers: mission boundary, out-of-scope, success criteria.

### 6. Read Memory

`MEMORY.md` for durable facts; `SESSION.md` for the latest handoff notes.

### 7. Resume

Summarize status in a few lines, then continue only unfinished in-scope work. Use `prompts/resume.md` when helpful.

### 8. Execute

Implement the active BUILD only. Obey `AI_CONTRACT.md` and `ARCHITECTURE_RULES.md`. Prefer additive changes. No placeholders.

### 9. Update State

Whenever reality changes, update the canonical files (`PROJECT_STATE`, `TODOS`, `CHANGELOG`, build tracking, `SESSION`, etc.). Stale SSOT is a defect.

### 10. Commit

When git is requested or required by the BUILD pack: small, reviewable commits with BUILD-scoped messages.

### 11. Handoff

Update `SESSION.md` and related files so the next AI can boot without tribal knowledge. Use `prompts/handoff.md`.

## SSOT Rule

If information exists both in chat and in `.adf`, **`.adf` wins** after it has been updated. If chat has newer truth, write it into `.adf` immediately.

## Minimum Readable Set (Cold Start)

1. `QUICK_CONTEXT.md`
2. `PROJECT_STATE.md`
3. `CURRENT_TASK.md`
4. `AI_CONTRACT.md`
5. `AI_RUNTIME.md` (this file)

Then deepen via indexes only as needed.

## Related

- `WORKFLOW.md` — product lifecycle around the runtime loop
- `TOKEN_BUDGET.md` — how much to load
- `adf-docs/AI_RUNTIME.md` — human-oriented explanation
