# RESUME ME

Copy-paste this block into a **new AI chat** when continuing ADF work after a pause, token limit, or model switch.

```text
Resume ADF from repo SSOT. Do not ask me to re-explain prior builds.

1. Read .adf/QUICK_CONTEXT.md
2. Read .adf/HANDOFF.md
3. Read .adf/ACTIVITY_LOG.md
4. Follow .adf/RESUME_PROTOCOL.md
5. Summarize status in ≤5 lines
6. Wait for my next BUILD master prompt (do not start the next BUILD yourself)
```

## Current snapshot (update when builds finish)

- Version: `0.9.0-alpha`
- Last completed: **BUILD-009** (APM)
- Do not start: **BUILD-010** until explicit master prompt

## After the AI summarizes

Then send your next instruction, for example:

- Architecture review of BUILD-009
- `# ADF v1.0 — MASTER PROMPT BUILD-010` (when ready)
- Or any scoped fix/question

## Related files

| File | Why |
|------|-----|
| `.adf/QUICK_CONTEXT.md` | 30-second status |
| `.adf/HANDOFF.md` | Full continuity pack |
| `.adf/ACTIVITY_LOG.md` | What we already did |
| `prompts/resume.md` | Longer resume operator prompt |
