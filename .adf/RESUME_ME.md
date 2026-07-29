# RESUME ME

Copy-paste this block into a **new AI chat** when continuing ADF work after a pause, token limit, or model switch.

```text
Resume ADF from repo SSOT. Do not ask me to re-explain prior builds.

1. Read .adf/QUICK_CONTEXT.md
2. Read .adf/HANDOFF.md
3. Read .adf/ACTIVITY_LOG.md
4. Read ROADMAP.md (LOCKED phases 1–4)
5. Follow .adf/RESUME_PROTOCOL.md
6. Summarize status in ≤5 lines
7. Wait for my next BUILD master prompt (do not start the next BUILD yourself)
```

## Current snapshot (update when builds finish)

- Version: `0.10.0-alpha`
- Phase: **2 — Platform & Distribution**
- Last completed: **BUILD-010** (Service Layer & Public SDK)
- Next: **BUILD-011** (Marketplace & Registry) — not started
- Do not start BUILD-011 until explicit master prompt

## After the AI summarizes

Then send your next instruction, for example:

- Architecture review of BUILD-010
- `# ADF v1.0 — MASTER PROMPT BUILD-011` (Marketplace & Registry)
- Or any scoped fix/question

## Related files

| File | Why |
|------|-----|
| `ROADMAP.md` | Locked phase/build plan |
| `.adf/QUICK_CONTEXT.md` | 30-second status |
| `.adf/HANDOFF.md` | Full continuity pack |
| `.adf/ACTIVITY_LOG.md` | What we already did |
