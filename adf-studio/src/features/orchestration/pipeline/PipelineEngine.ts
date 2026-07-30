import type {
  Pipeline,
  PipelineExecution,
  PipelineHistoryEntry,
  PipelineMetrics,
  PipelineStage,
  StageState,
  TransitionKind,
} from "@/features/orchestration/types";

/** Presentation helpers — pipeline model only (no autonomous run). */

export class PipelineStageView {
  constructor(public readonly stage: PipelineStage) {}

  get isBlocked(): boolean {
    return this.stage.state === "blocked" || this.stage.state === "rejected";
  }

  get needsReview(): boolean {
    return this.stage.state === "review";
  }
}

export class PipelineExecutionView {
  constructor(public readonly execution: PipelineExecution) {}

  get isAutonomous(): false {
    return this.execution.autonomous;
  }
}

export class PipelineHistoryView {
  constructor(public readonly entries: PipelineHistoryEntry[]) {}

  latest(): PipelineHistoryEntry | undefined {
    return [...this.entries].sort((a, b) => b.at.localeCompare(a.at))[0];
  }
}

export class PipelineMetricsView {
  constructor(public readonly metrics: PipelineMetrics) {}
}

export class PipelineManager {
  constructor(
    private pipelines: Pipeline[],
    private stages: PipelineStage[],
    private executions: PipelineExecution[],
    private history: PipelineHistoryEntry[],
  ) {}

  list(): Pipeline[] {
    return [...this.pipelines];
  }

  stagesFor(pipelineId: string): PipelineStage[] {
    return this.stages
      .filter((s) => s.pipelineId === pipelineId)
      .sort((a, b) => a.order - b.order);
  }

  byState(state: StageState): PipelineStage[] {
    return this.stages.filter((s) => s.state === state);
  }

  execution(pipelineId: string): PipelineExecution | undefined {
    return this.executions.find((e) => e.pipelineId === pipelineId);
  }

  historyFor(pipelineId: string): PipelineHistoryEntry[] {
    return this.history.filter((h) => h.pipelineId === pipelineId);
  }

  canTransition(_kind: TransitionKind, stage: PipelineStage): boolean {
    // Presentation guard only — Service Layer owns real transition policy.
    return stage.state !== "cancelled";
  }
}
