# Prompt — Workflow

Use when extending orchestration workflows in ADF Studio.

## Rules

- Workflow owns lifecycle; does not execute agents
- `WorkflowExecutionPlan.executable` stays `false` until a future build unlocks execution
- Path: UI → SDK → Service Layer → Core
- Studio = presentation only
