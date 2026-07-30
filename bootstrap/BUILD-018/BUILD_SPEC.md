# BUILD-018 Spec

## Create

`adf-studio/src/features/orchestration/` with workflow, pipeline, stages,
artifacts, transitions, review, approval, execution, planner, visual, stores,
services, types.

## Engines

WorkflowManager (+ definition/template/instance/state/plan)  
PipelineManager (+ stage/execution/history/metrics)

## State / SDK

WorkflowStore · PipelineStore · ArtifactStore · ExecutionStore · ApprovalStore  

WorkflowClient · PipelineClient · ArtifactClient · ExecutionClient · ApprovalClient

## Out of scope

AI automation · autonomous execution · agent runners
