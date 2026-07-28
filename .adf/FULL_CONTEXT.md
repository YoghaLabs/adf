# Full Context

Use this document when a task needs deeper orientation than `QUICK_CONTEXT.md`. Prefer quick context first to conserve tokens.

## Identity

- **Product:** ADF — AI Development Framework
- **Repository:** `adf`
- **Org:** YoghaLabs
- **License:** MIT
- **Version:** `0.1.0-alpha`
- **Branch:** `develop`

## Active Delivery Unit

- **Build:** BUILD-001 — Repository Foundation
- **Status:** Completed
- **Mission:** Establish locked structure and operating documentation only (done)
- **Stop rule:** Do not continue into BUILD-002 unless explicitly instructed with a new mission

## Architecture Lock

Top-level folders (exact):

`.adf/`, `adf-core/`, `adf-studio/`, `adf-docs/`, `adf-examples/`, `adf-templates/`, `bootstrap/`, `prompts/`, `testing/`, `tools/`, `release/`

Root files:

`README.md`, `LICENSE`, `CHANGELOG.md`, `VERSION`, `ROADMAP.md`, `CONTRIBUTING.md`, `.gitignore`

## Philosophy (Compressed)

- AI-first, documentation-first, cumulative builds
- Never delete docs, never rename locked folders, never ship placeholders
- Always keep `PROJECT_STATE`, `CHANGELOG`, and `TODOS` current

## Package Reality in BUILD-001

| Package | Reality now |
|---------|-------------|
| `.adf`, `bootstrap`, `prompts`, `adf-docs` | Primary deliverables with full docs |
| `adf-core`, `adf-studio`, examples, templates, testing, tools, release | Purpose README only; implementation later |

## Roadmap Horizon

BUILD-001 foundation → BUILD-002 knowledge hardening → bootstrap/prompt formalization → `adf-core` at BUILD-005 → Studio from BUILD-013 → v1.0 gate at BUILD-020. Details in `ROADMAP.md`.

## How to Resume

Follow `.adf/AI_BOOT.md` exactly. Use `prompts/resume.md` if you need a session prompt wrapper.

## How to Hand Off

Use `prompts/handoff.md` and update `SESSION.md`, state, todos, and changelog as needed.

## Knowledge Map

See `KNOWLEDGE_INDEX.md` for file roles. See `DEPENDENCY_INDEX.md` for external/runtime dependency posture (minimal in BUILD-001).

## Token Guidance

See `TOKEN_BUDGET.md`. Load full context only when quick context is insufficient for the task.
