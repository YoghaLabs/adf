# Full Context

Use this document when a task needs deeper orientation than `QUICK_CONTEXT.md`. Prefer quick context first to conserve tokens.

## Identity

- **Product:** ADF — AI Development Framework
- **Repository:** `adf`
- **Org:** YoghaLabs
- **License:** MIT
- **Version:** `0.2.0-alpha`
- **Branch:** `develop`
- **SSOT:** `.adf/`

## Active Delivery Unit

- **Build:** BUILD-002 — AI Runtime & Repository Intelligence
- **Status:** Completed
- **Mission:** Make `.adf` a complete AI runtime SSOT with maps, standards, build tracking, workflow, and bootstrap pack
- **Stop rule:** Do not continue into BUILD-003 unless Architecture Review approves and an explicit mission starts

## Architecture Lock

Top-level folders (exact):

`.adf/`, `adf-core/`, `adf-studio/`, `adf-docs/`, `adf-examples/`, `adf-templates/`, `bootstrap/`, `prompts/`, `testing/`, `tools/`, `release/`

Root files:

`README.md`, `LICENSE`, `CHANGELOG.md`, `VERSION`, `ROADMAP.md`, `CONTRIBUTING.md`, `.gitignore`

## Philosophy (Compressed)

- AI-first, documentation-first, cumulative builds
- Never delete docs, never rename/move locked folders, never ship placeholders
- Always keep `PROJECT_STATE`, `CHANGELOG`, `TODOS`, and build tracking current
- Explain **why**, not only **what**

## Package Reality After BUILD-002

| Package | Reality now |
|---------|-------------|
| `.adf` | SSOT for AI runtime + repository intelligence |
| `bootstrap` | Shared boot docs + `BUILD-002/` pack |
| `prompts` | build/resume/handoff/audit + architecture/planning/review/release/generator |
| `adf-docs` | Product docs + AI runtime / build system / workflow / best practices |
| `adf-core`, `adf-studio`, examples, templates, testing, tools, release | Purpose README only; implementation later |

## Roadmap Horizon

BUILD-001 foundation → BUILD-002 AI runtime SSOT → BUILD-003 bootstrap automation → prompt formalization → `adf-core` at BUILD-005 → Studio from BUILD-013 → v1.0 gate at BUILD-020.

## How to Resume

Follow `.adf/AI_BOOT.md` and operate per `.adf/AI_RUNTIME.md`. Use `prompts/resume.md` if you need a session prompt wrapper.

## How to Hand Off

Use `prompts/handoff.md` and update `SESSION.md`, state, todos, changelog, and build tracking as needed.

## Knowledge Map

- Roles: `KNOWLEDGE_INDEX.md`
- Files: `FILE_INDEX.md`
- Modules: `MODULE_INDEX.md`
- Folders: `REPOSITORY_MAP.md`
- Dependencies: `DEPENDENCY_INDEX.md`

## Token Guidance

See `TOKEN_BUDGET.md`. Load full context only when quick context is insufficient for the task.
