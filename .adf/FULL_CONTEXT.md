# Full Context

Use this document when a task needs deeper orientation than `QUICK_CONTEXT.md`. Prefer quick context first to conserve tokens.

## Identity

- **Product:** ADF — AI Development Framework
- **Repository:** `adf`
- **Org:** YoghaLabs
- **License:** MIT
- **Version:** `0.3.0-alpha`
- **Branch:** `develop`
- **SSOT:** `.adf/`
- **ADR store:** `.adf/adr/`

## Active Delivery Unit

- **Build:** BUILD-003 — Knowledge Architecture & ADR System
- **Status:** Completed
- **Mission:** Make design rationale recoverable via ADRs and knowledge graphs
- **Stop rule:** Do not continue into BUILD-004 unless Architecture Review approves and an explicit mission starts

## Architecture Lock

Top-level folders (exact):

`.adf/`, `adf-core/`, `adf-studio/`, `adf-docs/`, `adf-examples/`, `adf-templates/`, `bootstrap/`, `prompts/`, `testing/`, `tools/`, `release/`

Root files:

`README.md`, `LICENSE`, `CHANGELOG.md`, `VERSION`, `ROADMAP.md`, `CONTRIBUTING.md`, `.gitignore`

## Philosophy (Compressed)

- AI-first, documentation-first, cumulative builds, knowledge-first rationale
- Never delete docs, never rename/move locked folders, never ship placeholders
- No architecture change without ADR (from BUILD-003 through BUILD-020)
- Always keep `PROJECT_STATE`, `CHANGELOG`, `TODOS`, and build tracking current

## Package Reality After BUILD-003

| Package | Reality now |
|---------|-------------|
| `.adf` | SSOT + Knowledge/ADR layer |
| `bootstrap` | Shared boot docs + BUILD-002/003 packs |
| `prompts` | Expanded operator library including knowledge/ADR/context |
| `adf-docs` | Product + runtime + knowledge guides |
| Deferred modules | Purpose README only |

## Roadmap Horizon

Foundation → AI Runtime SSOT → Knowledge/ADR → **Context Engine (next)** → core → Studio → v1.0 gate.

## How to Resume

Follow `.adf/AI_BOOT.md`, deepen via `CONTEXT_GRAPH.md`, read ADRs when design is involved.

## Knowledge Map

See `KNOWLEDGE_INDEX.md`, `FILE_INDEX.md`, `KNOWLEDGE_GRAPH.md`.

## Token Guidance

See `TOKEN_BUDGET.md`. Load full context only when quick context is insufficient.
