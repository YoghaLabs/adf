# Orchestration Platform

**Build:** BUILD-018 · **Version:** `0.18.0-alpha`

## Purpose

Unify prior ADF layers into a planned **AI Orchestration Platform**.

Orchestration includes workflow, pipeline, stages, artifacts, review/approval gates,
assignments, and execution **planning**.

## Hard locks

- **No AI automation**
- **No autonomous execution**
- Studio = presentation only: UI → SDK → Service Layer → Core

Workflow is one part of orchestration — not the whole platform.

## Surfaces

| Area | Responsibility |
|------|----------------|
| Workflow | Definitions, templates, instances, execution plans |
| Pipeline | Stages, history, metrics |
| Artifacts | Requirements → release package flow |
| Gates | Review + approval |
| Visual | Board / kanban / timeline / dependency / graph |
| Execution view | Current / upcoming / completed / blocked (planned) |

## Related

- `WORKFLOW_ENGINE.md`
- `PIPELINE_ENGINE.md`
- `ARTIFACT_FLOW.md`
- `APPROVAL_SYSTEM.md`
- ADR-016
