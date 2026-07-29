# ADF — AI Development Framework

**Version:** `0.7.0-alpha` (see root `VERSION`)  
**Branch:** `develop`  
**Current Build:** `BUILD-007` — Template Engine + Manifest System

ADF is an AI-first development framework that keeps project knowledge, architecture decisions, build state, and AI operating contracts inside the repository. Humans and AI agents share the same source of truth so work can pause, hand off, and resume without losing context.

## What is ADF

ADF is not only a code toolkit. It is a **structured operating system for AI-assisted software development**:

- **Documentation-first** — contracts and architecture live before implementation.
- **Cumulative builds** — progress advances through numbered BUILD increments.
- **AI-resumable** — `.adf/` files tell the next AI exactly how to continue.
- **Architecture-locked** — top-level folders are fixed; agents must not invent new ones.

Use ADF when you need repeatable, auditable, multi-session AI development with explicit state and handoff.

## Repository Structure

```text
adf/
├── .adf/              # Operating context for AI + humans (state, contracts, memory)
├── adf-core/          # Runtime core (implementation starts BUILD-005)
├── adf-studio/        # GUI / Studio (starts BUILD-013)
├── adf-docs/          # Human-facing documentation
├── adf-examples/      # Curated examples
├── adf-templates/     # Project and artifact templates
├── bootstrap/         # Boot contracts and sequence
├── prompts/           # Prompt library (build, resume, handoff, audit)
├── testing/           # Test harness and contract tests
├── tools/             # Developer and automation tools
└── release/           # Release packaging and checklists
```

Root files:

| File | Role |
|------|------|
| `README.md` | Project entry point |
| `LICENSE` | MIT license |
| `CHANGELOG.md` | Versioned change history |
| `VERSION` | Project version, current build, and branch |
| `ROADMAP.md` | BUILD-001 → BUILD-020 plan |
| `CONTRIBUTING.md` | Contribution rules |
| `.gitignore` | Ignored artifacts and secrets |

## Build Roadmap

ADF advances through **BUILD-001 to BUILD-020**. Each BUILD has a fixed mission.

| Build | Status |
|-------|--------|
| BUILD-001 | ✅ |
| BUILD-002 | ✅ |
| BUILD-003 | ✅ |
| BUILD-004 | ✅ |
| BUILD-005 | ✅ |
| BUILD-006 | ✅ |
| BUILD-007 | ✅ |
| BUILD-008 | ⏳ |
| BUILD-009 | ⏳ |
| BUILD-010 | ⏳ |
| BUILD-011 | ⏳ |
| BUILD-012 | ⏳ |
| BUILD-013 | ⏳ |
| BUILD-014 | ⏳ |
| BUILD-015 | ⏳ |
| BUILD-016 | ⏳ |
| BUILD-017 | ⏳ |
| BUILD-018 | ⏳ |
| BUILD-019 | ⏳ |
| BUILD-020 | ⏳ |

Legend: ✅ completed · ⏳ pending

Mission detail for each BUILD lives in `ROADMAP.md`.

## Architecture Evolution

ADF grows by **additive layers**, not redesign:

```text
BUILD-001  Repository Foundation (locked structure)
    ↓
BUILD-002  AI Runtime SSOT (`.adf` operate loop)
    ↓
BUILD-003  Knowledge Architecture & ADR (why-traceable decisions)
    ↓
BUILD-004  Context Engine (shared restore — first engine, spec)
    ↓
BUILD-005  Runtime Engine Foundation (executable `adf-core`)
    ↓
BUILD-006  Plugin & Extension Engine ← current
    ↓
BUILD-007  Task & State Machine — next
    ↓
… through BUILD-020 (Studio + v1.0 gate)
```

**Permanent rules:** architecture changes require ADRs; all AIs share Context Engine restore; new capabilities prefer plugins.

## How to Start

1. Clone the repository and check out `develop`.
2. Read `adf-docs/GETTING_STARTED.md`.
3. Read `.adf/QUICK_CONTEXT.md` for the shortest current snapshot.
4. If you are an AI agent, follow `.adf/AI_BOOT.md` before making changes.
5. Confirm active work in `.adf/CURRENT_TASK.md` and `.adf/PROJECT_STATE.md`.
6. Do not start the next BUILD until the current BUILD is finished and handed off.

Runtime commands and Studio UI are not part of BUILD-001. This build establishes the foundation only.

## How BUILD Works

A **BUILD** is a scoped, cumulative delivery unit:

1. **Mission locked** — the BUILD prompt defines exact deliverables.
2. **Architecture locked** — folder names and top-level layout do not change.
3. **Docs required** — every deliverable includes useful documentation (no placeholders).
4. **State updated** — `PROJECT_STATE`, `CHANGELOG`, and `TODOS` are updated as work completes.
5. **Handoff ready** — when finished, the repo must be resumable via `.adf/AI_BOOT.md`.
6. **Stop rule** — do not continue into the next BUILD unless explicitly instructed.

Suggested prompt entry points live in `prompts/` (`build.md`, `resume.md`, `handoff.md`, `audit.md`).

## Quality Rules (Always)

From `.adf/AI_CONTRACT.md`:

- Never delete documentation
- Never skip architecture
- Never rename folders
- Never create placeholders
- Always update `PROJECT_STATE`, `CHANGELOG`, and `TODOS` when status changes

## License

MIT — see `LICENSE`.
