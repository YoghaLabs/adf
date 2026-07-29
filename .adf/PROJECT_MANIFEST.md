# Project Manifest

| Field | Value |
|-------|-------|
| Repository | `adf` |
| Full name | AI Development Framework |
| Organization | YoghaLabs |
| Version | `0.6.0-alpha` |
| Current build | `BUILD-006` |
| Primary branch | `develop` |
| License | MIT |
| Status | Plugin & Extension Engine |
| SSOT root | `.adf/` |
| ADR root | `.adf/adr/` |
| Context Engine | `.adf/CONTEXT_ENGINE.md` + `.adf/context/` |
| Runtime package | `adf-core/` (Python, plugin-based) |

## Product Summary

ADF is an AI-first development framework that stores architecture, build state, knowledge, and AI operating contracts inside the repository so humans and agents can collaborate across sessions without losing context.

**Why this manifest exists:** any AI (Cursor, ChatGPT, Claude, Codex, OpenCode, and others) must identify the project from `.adf` alone before touching code or docs elsewhere.

## Single Source of Truth

`.adf/` is the **SSOT** for runtime intelligence:

| Need | Canonical file |
|------|----------------|
| Who/what is this repo | `PROJECT_MANIFEST.md` |
| Live status | `PROJECT_STATE.md` + `BUILD_STATUS.md` |
| What to do now | `CURRENT_TASK.md` + `TODOS.md` |
| How AI must behave | `AI_CONTRACT.md` + `AI_RUNTIME.md` |
| How to resume | `RESUME_PROTOCOL.md` + `BOOT_SEQUENCE_V2.md` |
| Context engine | `CONTEXT_ENGINE.md` + `context/` |
| Operator states | `STATE_MACHINE.md` + `CHECKPOINTS.md` |
| Why the project exists | `PROJECT_DNA.md` |
| Where things live | `REPOSITORY_MAP.md` + `MODULE_INDEX.md` + `FILE_INDEX.md` |
| Why decisions were made | `ADR_INDEX.md` + `.adf/adr/` |
| How knowledge relates | `KNOWLEDGE_GRAPH.md` + `CONTEXT_GRAPH.md` + `DEPENDENCY_GRAPH.md` |
| Immutable rules | `ARCHITECTURE_RULES.md` |

Human docs in `adf-docs/` explain the product; `.adf/` operates the project.

## Locked Top-Level Layout

```text
.adf/
adf-core/
adf-studio/
adf-docs/
adf-examples/
adf-templates/
bootstrap/
prompts/
testing/
tools/
release/
```

Do not add or rename top-level folders.

## Package Roles

| Path | Role | First implementation BUILD |
|------|------|----------------------------|
| `.adf/` | SSOT + Knowledge/ADR + Context Engine specs | BUILD-001…004 |
| `bootstrap/` | Boot contracts & per-BUILD packs | BUILD-001+ packs |
| `prompts/` | Prompt library | BUILD-001…004 |
| `adf-docs/` | Human documentation | BUILD-001…004 (later BUILD-016) |
| `adf-core/` | Runtime Engine (executable Python package) | BUILD-005 |
| `adf-templates/` | Templates | BUILD-009 |
| `adf-examples/` | Examples | BUILD-010 |
| `testing/` | Test harness | BUILD-011 |
| `release/` | Release pipeline | BUILD-012 |
| `adf-studio/` | GUI | BUILD-013 |
| `tools/` | Utilities | BUILD-008 (+ later automation) |

## Canonical Documents

- Vision & philosophy: `PROJECT_DNA.md`
- Live status: `PROJECT_STATE.md`
- Build tracking: `BUILD_HISTORY.md`, `BUILD_STATUS.md`
- Active work: `CURRENT_TASK.md`
- Agent rules: `AI_CONTRACT.md`, `AI_RUNTIME.md`
- Resume procedure: `RESUME_PROTOCOL.md`, `BOOT_SEQUENCE_V2.md`, `AI_BOOT.md`
- Context Engine: `CONTEXT_ENGINE.md`, `CONTEXT_PIPELINE.md`, `context/`
- State machine / checkpoints: `STATE_MACHINE.md`, `CHECKPOINTS.md`, `SESSION_LIFECYCLE.md`
- Workflow: `WORKFLOW.md`
- Short snapshot: `QUICK_CONTEXT.md`
- Maps & indexes: `REPOSITORY_MAP.md`, `MODULE_INDEX.md`, `FILE_INDEX.md`
- Knowledge layer: `ADR_INDEX.md`, `KNOWLEDGE_GRAPH.md`, `CONTEXT_GRAPH.md`, `DEPENDENCY_GRAPH.md`, `GLOSSARY.md`, `PROJECT_TIMELINE.md`, `MILESTONES.md`, `RISK_REGISTER.md`, `TECH_STACK.md`
- Standards: `ARCHITECTURE_RULES.md`, `NAMING_CONVENTION.md`, `DOCUMENTATION_STANDARD.md`
