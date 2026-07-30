# Pipeline Engine

**Build:** BUILD-018

## Components

- `PipelineManager`
- `PipelineStage`
- `PipelineExecution` (`autonomous: false`)
- `PipelineHistory`
- `PipelineMetrics`

## Stages

Planning · Architecture · Backend · Frontend · Testing · Documentation · Release · Custom

## Stage states

Pending · Ready · Running · Blocked · Review · Approved · Rejected · Completed · Cancelled

## Transitions

Next · Previous · Rollback · Restart · Skip · Retry

Policy lives in the Service Layer; Studio only displays envelopes.
