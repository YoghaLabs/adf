# Workflow Engine

**Build:** BUILD-018

## Components

- `WorkflowManager`
- `WorkflowDefinition`
- `WorkflowTemplate`
- `WorkflowInstance`
- `WorkflowState`
- `WorkflowExecutionPlan` (`executable: false`)

## Lifecycle ownership

Workflow owns orchestration lifecycle state (draft → planned → active → completed).
It does **not** start autonomous AI runs.

## Studio

Presentation helpers under `features/orchestration/workflow/`.
SDK: `WorkflowClient`.
