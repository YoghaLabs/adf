# Module Index

Describes every module package. **Why:** prevents agents from implementing features in the wrong package or inventing alternate homes.

## adf-core

- **Purpose:** Runtime APIs for project load, state I/O, context assembly, build gates.
- **Why separate:** executable behavior must not be mixed into docs or Studio UI.
- **Status:** README only until BUILD-005.
- **Depends on:** `.adf` contracts as data; later test harness.

## adf-studio

- **Purpose:** Human GUI for status, context, and build/prompt runners.
- **Why separate:** UX concerns evolve independently from core runtime.
- **Status:** README only until BUILD-013.
- **Depends on:** `adf-core` (future), `prompts/`, `.adf` files.

## adf-docs

- **Purpose:** Human-readable product, architecture, runtime, and practice guides.
- **Why separate:** teaching humans without overloading AI SSOT files.
- **Status:** Active since BUILD-001; expanded in BUILD-002 and BUILD-003 (knowledge guides).
- **Depends on:** `.adf` for truth; must not contradict SSOT.

## adf-examples

- **Purpose:** Concrete demonstrations of correct ADF usage.
- **Why separate:** examples can evolve without changing core contracts.
- **Status:** README only until BUILD-010.

## adf-templates

- **Purpose:** Starters that emit locked architecture + useful docs.
- **Why separate:** generation concerns vs runtime vs docs.
- **Status:** README only until BUILD-009.

## testing

- **Purpose:** Prove structure, docs integrity, contracts, and later runtime behavior.
- **Why separate:** verification must remain independent of production packages.
- **Status:** README only until BUILD-011.

## tools

- **Purpose:** Maintainer utilities (validators, helpers) that are not core public runtime.
- **Why separate:** keeps `adf-core` lean.
- **Status:** README only until BUILD-008 (automation helpers); not the home of ADR/knowledge docs.

## release

- **Purpose:** Versioning/packaging/checklists for distribution.
- **Why separate:** ship process is not feature development.
- **Status:** README only until BUILD-012+.

## Cross-cutting: `.adf`, `bootstrap`, `prompts`

These are not “feature modules” but **operating subsystems**. See `REPOSITORY_MAP.md`, `FILE_INDEX.md`, and `DEPENDENCY_GRAPH.md`.

### `.adf` Knowledge Layer (BUILD-003)

Includes ADR store (`.adf/adr/`), graphs, glossary, timeline, milestones, risk register, and tech stack. Consumed by future Context Engine and Studio.
