# Handoff — AI Continuity Pack

**Purpose:** Next AI/operator can resume without re-explaining the project from scratch.  
**Last handoff:** 2026-07-30  
**Author of handoff:** Quadran + Cursor agent (BUILD-010 complete)

---

## 30-second identity

| Field | Value |
|-------|-------|
| Repo | `adf` (YoghaLabs) — https://github.com/YoghaLabs/adf |
| Branch | `develop` |
| Version | `0.10.0-alpha` (root `VERSION`) |
| Current phase | Phase 2 — Platform & Distribution |
| Current build | **BUILD-010** — Service Layer & Public SDK (completed) |
| Next build | **BUILD-011** — Marketplace & Registry (**NOT STARTED**) |
| Roadmap | **LOCKED** — `ROADMAP.md` phases 1–4 |
| Orchestration | Service Layer only; engines independent |

---

## What the next AI must read first (in order)

1. `.adf/QUICK_CONTEXT.md`
2. `.adf/HANDOFF.md` ← this file
3. `.adf/ACTIVITY_LOG.md`
4. `.adf/PROJECT_STATE.md`
5. `.adf/CURRENT_TASK.md`
6. `.adf/SESSION.md` + `.adf/TODOS.md` + `.adf/MEMORY.md`
7. Root `VERSION`, `ROADMAP.md`, `CHANGELOG.md`
8. Accept `.adf/AI_CONTRACT.md` + `.adf/ARCHITECTURE_RULES.md`

Then optionally deepen: `bootstrap/BUILD-010/`, ADR-008, `adf-docs/SERVICE_LAYER.md`, `adf-docs/PUBLIC_API.md`.

**Do not** ask the user to re-explain BUILD-001…010 unless SSOT is missing/corrupt.

---

## Hard stops

- Do **not** start BUILD-011 until an explicit master prompt.
- Do **not** rename locked top-level folders.
- CLI/SDK/Studio/Plugins must use services — never engines directly.
