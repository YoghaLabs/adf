# Handoff — AI Continuity Pack

**Purpose:** Next AI/operator can resume without re-explaining the project from scratch.  
**Last handoff:** 2026-07-30  
**Author of handoff:** Quadran + Cursor agent (session ending before BUILD-009)

---

## 30-second identity

| Field | Value |
|-------|-------|
| Repo | `adf` (YoghaLabs) — https://github.com/YoghaLabs/adf |
| Branch | `develop` (synced with `origin/develop`) |
| Version | `0.9.0-alpha` (root `VERSION`) |
| Current phase | Phase 2 — Platform & Distribution |
| Current build | **BUILD-009** — ADF Package Manager (completed) |
| Next build | **BUILD-010** — SDK & Public API (**NOT STARTED**) |
| Roadmap | **LOCKED** — `ROADMAP.md` phases 1–4 |
| Main | Previously merged through BUILD-006 era; develop is integration branch |

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

Then optionally deepen: `BUILD_HISTORY.md`, `bootstrap/BUILD-008/`, ADR-006, `adf-docs/PROJECT_GENERATOR.md`.

**Do not** ask the user to re-explain BUILD-001…008 unless SSOT is missing/corrupt.

---

## Completed (do not redo)

### Phase 1 — Engine Foundation ✅

| Build | Theme | Status |
|-------|-------|--------|
| BUILD-001 | Repository Foundation | ✅ |
| BUILD-002 | AI Runtime | ✅ |
| BUILD-003 | Knowledge Architecture | ✅ |
| BUILD-004 | Context Engine | ✅ |
| BUILD-005 | Runtime Engine | ✅ |
| BUILD-006 | Plugin Engine | ✅ |
| BUILD-007 | Template Engine | ✅ |
| BUILD-008 | Generator Engine | ✅ |

### Phase 2 — Platform & Distribution (in progress)

| Build | Theme | Status |
|-------|-------|--------|
| BUILD-009 | ADF Package Manager | ✅ |
| BUILD-010 | SDK & Public API | ⏳ |
| BUILD-011 | Marketplace & Registry | ⏳ |
| BUILD-012 | Installer & Distribution | ⏳ |

### BUILD-008 capabilities now live

- `GeneratorManager`: `generate` / `validate` / `dry_run` / `build` / `write` / `rollback`
- CLI: `adf init`, `adf new`, `adf generate`, `adf dry-run`, `adf validate`, `adf doctor`
- Templates under `adf-templates/`: `foundation`, `generic`, `python`, `fastapi`, `laravel`, `nextjs`
- ADR-006: generation must be manifest-driven (no hardcoded project trees in Python)
- Tests: **22 passed** (last known green on finalize)

---

## Hard rules (locked)

- Top-level folders are **LOCKED** (ADR-001) — never rename/add/delete top-level dirs
- Documentation is SSOT; **no placeholders**
- Cumulative builds only; **do not combine** two builds into one commit series
- Master prompts may **supersede** older ROADMAP labels (see each `bootstrap/BUILD-00N/MIGRATION.md`)
- Architecture changes need ADRs
- **STOP at build boundary** unless user explicitly launches the next BUILD

---

## Remaining / next

1. Optional: Architecture Review of BUILD-009 (`bootstrap/BUILD-009/REVIEW.md`)
2. Wait for user master prompt for **BUILD-010 — SDK & Public API**
3. Respect locked roadmap in `ROADMAP.md` (do not invent alternate BUILD themes)

---

## How the human continues after switching AI

Open **`.adf/RESUME_ME.md`** and paste the copy-block into the new AI chat.

Short form (same content lives in `RESUME_ME.md`):

```text
Resume ADF from repo SSOT. Do not ask me to re-explain prior builds.

1. Read .adf/QUICK_CONTEXT.md
2. Read .adf/HANDOFF.md
3. Read .adf/ACTIVITY_LOG.md
4. Follow .adf/RESUME_PROTOCOL.md
5. Summarize status in ≤5 lines
6. Wait for my next BUILD master prompt (do not start the next BUILD yourself)
```

---

## Risks / notes for next agent

- An early BUILD-008 slice used a Python scaffolder; later refinement moved structure into templates (ADR-006). Prefer TemplateManager/GeneratorManager paths.
- `main` was merged earlier for BUILD-001…006 era; active work continues on `develop`. Confirm with user before merging again.
- Windows PowerShell: use `;` not `&&`; heredoc bash style does not work — write scripts to files when needed.
- Push to `origin/develop` may need user approval in Cursor smart mode.

---

## Verification commands

```bash
cd adf-core
python -m pytest -q
python adf.py version
python adf.py doctor --root ..
python adf.py dry-run demo --template generic --destination %TEMP% --root ..
```
