# BUILD-003 Spec

## Title

Knowledge Architecture & ADR System

## Goal

Transform ADF into a self-documenting system where important architectural decisions are traceable and every AI can understand **why**.

## Create in `.adf/`

`ADR_INDEX.md`, `GLOSSARY.md`, `KNOWLEDGE_GRAPH.md`, `CONTEXT_GRAPH.md`, `DEPENDENCY_GRAPH.md`, `PROJECT_TIMELINE.md`, `MILESTONES.md`, `RISK_REGISTER.md`, `TECH_STACK.md`

## Create in `.adf/adr/`

- `ADR-001-Repository-Structure.md`
- `ADR-002-Build-Lifecycle.md`
- `ADR-003-AI-Runtime.md`

Each with: Title, Status, Context, Decision, Consequences, Alternatives Considered, References, Future Impact.

## Update

`PROJECT_STATE`, `PROJECT_MANIFEST`, `BUILD_HISTORY`, `BUILD_STATUS`, `MODULE_INDEX`, `FILE_INDEX`, `MEMORY`, `SESSION`, `TODOS` (+ related indexes/context as needed)

## Create `bootstrap/BUILD-003/`

README, MASTER_PROMPT, BUILD_SPEC, ACCEPTANCE, REVIEW, CHANGELOG, MIGRATION

## Create prompts

`knowledge.md`, `adr.md`, `documentation.md`, `context.md`, `bootstrap.md`

## Create adf-docs

`KNOWLEDGE_ARCHITECTURE.md`, `ADR_GUIDE.md`, `CONTEXT_ENGINE.md`, `MEMORY_SYSTEM.md`, `PROJECT_LIFECYCLE.md`

## Also

- Update README (Architecture Evolution)
- Update ROADMAP (BUILD-001/002 done; BUILD-003 highlighted then completed)
- Bump `VERSION` to `0.3.0-alpha`

## Non-Goals

- Context Engine implementation (BUILD-004)
- Runtime/GUI code
- Folder redesign
