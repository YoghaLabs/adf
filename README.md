# ADF — AI Development Framework

**Version:** `1.0.0-rc1` (see root `VERSION`)  
**Branch:** `develop` (merge to `main` after each completed phase)  
**Engineering:** BUILD-001 … BUILD-020 ✅ — Production Release Candidate  
**Legal:** `/legal` ✅ · **Business:** BUSINESS-001–004 ✅ · Next BUSINESS-005


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
├── release/           # Release packaging and checklists
├── legal/             # Copyright, license, EULA, trademarks, conduct
└── business/          # Business Strategy SSOT (ADF-v1.0 package)
```

Root files:

| File | Role |
|------|------|
| `README.md` | Project entry point |
| `LICENSE` | Legacy root license file (see Legal Package) |
| `CHANGELOG.md` | Versioned change history |
| `VERSION` | Project version, current build, and branch |
| `ROADMAP.md` | BUILD-001 → BUILD-020 plan |
| `CONTRIBUTING.md` | Contribution rules (see also `legal/CONTRIBUTING.md`) |
| `.gitignore` | Ignored artifacts and secrets |

## Progress

| Track | Status |
|-------|--------|
| Engineering BUILD-001 … 020 | ✅ Complete (`1.0.0-rc1`) |
| Legal Package (`/legal`) | ✅ Initialized |
| Business BUSINESS-001 Foundation | ✅ Complete |
| Business BUSINESS-002 Executive | ✅ Complete |
| Business BUSINESS-003 Product Strategy | ✅ Complete |
| Business BUSINESS-004 Market Analysis | ✅ Complete |
| Business BUSINESS-005 … 011 | ⏳ Next: Business Model (not started) |
| Product Validation-001 Quick Start | ✅ Complete |
| GA `1.0.0` (signing / coverage / Quick Start wizard gate) | ⏳ Release gate (not a new BUILD) |

**Workflow:** finish work on `develop` → update this progress → merge `develop` into `main`.

## Build Roadmap

ADF engineering advanced through **BUILD-001 to BUILD-020** in four locked phases (see `ROADMAP.md`).

| Phase | Scope | Status |
|-------|--------|--------|
| 1 Engine Foundation | BUILD-001 … 008 | ✅ |
| 2 Platform & Distribution | BUILD-009 … 012 | ✅ |
| 3 User Experience | BUILD-013 … 016 | ✅ |
| 4 Production | BUILD-017 … 020 | ✅ RC1 |

| Build | Status |
|-------|--------|
| BUILD-001 … BUILD-020 | ✅ |
| BUILD-021+ | Not opened — use Business / GA gates instead |

Legend: ✅ completed · ⏳ pending

## Architecture Evolution

ADF grew by **additive layers**, not redesign:

```text
BUILD-001  Repository Foundation (locked structure)
    ↓
BUILD-002 … 008  Engines (AI Runtime → Generator)
    ↓
BUILD-009 … 012  Distribution (APM, SDK, Marketplace, Installer)
    ↓
BUILD-013 … 016  Studio UX (Core, Workspace, Visual, Runtime)
    ↓
BUILD-017  Collaboration (AI as Participant)
    ↓
BUILD-018  Orchestration (planning only)
    ↓
BUILD-019  Enterprise Governance
    ↓
BUILD-020  Production RC1 (`1.0.0-rc1`) ← engineering complete
    ↓
Legal Package + BUSINESS-001 … 011  (post-RC1 business layer)
```

**Permanent rules:** architecture changes require ADRs; all AIs share Context Engine restore; new capabilities prefer plugins; do not invent BUILD-021 without a new program charter.

## How to Start

**Fast path (humans):** [`adf-docs/quickstart/README.md`](adf-docs/quickstart/README.md)

```bash
git clone https://github.com/YoghaLabs/adf.git
cd adf
./install          # Windows: .\install.ps1
python -m adf doctor --root .
python -m adf studio
```

1. Clone the repository and check out `develop` (or `main` for the latest merged release line).
2. Follow **Quick Start** (`adf-docs/quickstart/`), then `adf-docs/GETTING_STARTED.md` / `RELEASE_NOTES.md` as needed.
3. Read `.adf/QUICK_CONTEXT.md` for the shortest current snapshot.
4. If you are an AI agent, follow `.adf/AI_BOOT.md` before making changes.
5. Confirm active work in `.adf/CURRENT_TASK.md`, `.adf/PROJECT_STATE.md`, and `business/ADF-v1.0/BUSINESS_STATE.md`.
6. Do not start the next BUILD or BUSINESS phase until explicitly instructed.
7. After a phase completes on `develop`, update README progress and merge into `main`.

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

## Business Strategy

Business strategy for ADF v1.0 lives in **`business/ADF-v1.0/`**.

This package is the **Business SSOT** for investors, enterprise customers, partners,
internal management, sales, marketing, and future team members.

| Item | Path |
|------|------|
| Package README | [`business/ADF-v1.0/README.md`](business/ADF-v1.0/README.md) |
| Business roadmap | [`business/ADF-v1.0/BUSINESS_ROADMAP.md`](business/ADF-v1.0/BUSINESS_ROADMAP.md) |
| Business rules | [`business/ADF-v1.0/BUSINESS_RULES.md`](business/ADF-v1.0/BUSINESS_RULES.md) |
| Document template | [`business/ADF-v1.0/DOCUMENT_TEMPLATE.md`](business/ADF-v1.0/DOCUMENT_TEMPLATE.md) |

**Current business phase:** BUSINESS-004 Market Analysis ✅ (`B1.3.0`)  
**Next:** BUSINESS-005 Business Model — not started  
**Structure:** LOCKED (`00-Executive` … `10-Launch` + `assets`)  
**Executive Package:** [`business/ADF-v1.0/00-Executive/`](business/ADF-v1.0/00-Executive/)  
**Product Strategy:** [`business/ADF-v1.0/01-Product/`](business/ADF-v1.0/01-Product/)  
**Market Analysis:** [`business/ADF-v1.0/02-Market/`](business/ADF-v1.0/02-Market/)

| Business phase | Status |
|----------------|--------|
| BUSINESS-001 Foundation | ✅ |
| BUSINESS-002 Executive | ✅ |
| BUSINESS-003 Product | ✅ |
| BUSINESS-004 Market | ✅ |
| BUSINESS-005 Business Model | ⏳ |
| BUSINESS-006 Sales | ⏳ |
| BUSINESS-007 Marketing | ⏳ |
| BUSINESS-008 Investor | ⏳ |
| BUSINESS-009 Enterprise | ⏳ |
| BUSINESS-010 Operations + Legal | ⏳ |
| BUSINESS-011 Launch | ⏳ |

Business follows Product. Business must not contradict Engineering. Engineering must not contradict Business.

## Legal

ADF legal documentation for Community Edition lives in **`/legal`**:

| Document | Path |
|----------|------|
| Copyright | [`legal/COPYRIGHT.md`](legal/COPYRIGHT.md) |
| License (ADF Community License) | [`legal/LICENSE.md`](legal/LICENSE.md) |
| Notice | [`legal/NOTICE.md`](legal/NOTICE.md) |
| Authors | [`legal/AUTHORS.md`](legal/AUTHORS.md) |
| Trademark (™) | [`legal/TRADEMARK.md`](legal/TRADEMARK.md) |
| EULA | [`legal/EULA.md`](legal/EULA.md) |
| Third-party notices | [`legal/THIRD_PARTY.md`](legal/THIRD_PARTY.md) |
| Contributing | [`legal/CONTRIBUTING.md`](legal/CONTRIBUTING.md) |
| Code of Conduct | [`legal/CODE_OF_CONDUCT.md`](legal/CODE_OF_CONDUCT.md) |

Copyright (c) 2026 Yogha Prayoto. All Rights Reserved.  
Commercial use requires permission from the copyright holder.
