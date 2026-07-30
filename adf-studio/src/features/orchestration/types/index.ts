/** Orchestration types — presentation contracts only (BUILD-018).
 *  Orchestration ≠ autonomous execution. No AI automation in this build.
 *  Models workflow, pipeline, stages, artifacts, gates, and execution plans.
 */

export type StageKind =
  | "planning"
  | "architecture"
  | "backend"
  | "frontend"
  | "testing"
  | "documentation"
  | "release"
  | "custom";

export type StageState =
  | "pending"
  | "ready"
  | "running"
  | "blocked"
  | "review"
  | "approved"
  | "rejected"
  | "completed"
  | "cancelled";

export type TransitionKind =
  | "next"
  | "previous"
  | "rollback"
  | "restart"
  | "skip"
  | "retry";

export type ArtifactKind =
  | "requirements"
  | "architecture_docs"
  | "source_code"
  | "tests"
  | "documentation"
  | "release_package";

export type ReviewGateKind =
  | "code"
  | "architecture"
  | "qa"
  | "documentation"
  | "release";

export type ApprovalDecision =
  | "approve"
  | "reject"
  | "request_changes"
  | "escalate";

export type DependencyKind =
  | "stage"
  | "artifact"
  | "participant"
  | "knowledge";

export type VisualViewMode = "board" | "kanban" | "timeline" | "dependency" | "graph";

export type WorkflowDefinition = {
  id: string;
  name: string;
  description: string;
  templateId?: string;
  stageKinds: StageKind[];
  version: string;
};

export type WorkflowTemplate = {
  id: string;
  name: string;
  description: string;
  stageKinds: StageKind[];
};

export type WorkflowState = "draft" | "planned" | "active" | "paused" | "completed" | "cancelled";

export type WorkflowInstance = {
  id: string;
  definitionId: string;
  workspaceId: string;
  projectId: string;
  title: string;
  state: WorkflowState;
  currentStageId: string | null;
  participantIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type WorkflowExecutionPlan = {
  id: string;
  workflowId: string;
  orderedStageIds: string[];
  notes: string;
  plannedAt: string;
  /** Planning only — not executed in BUILD-018. */
  executable: false;
};

export type PipelineStage = {
  id: string;
  pipelineId: string;
  kind: StageKind;
  label: string;
  state: StageState;
  assigneeId?: string;
  order: number;
  reviewGate?: ReviewGateKind;
  artifactIds: string[];
  dependencyIds: string[];
};

export type PipelineExecution = {
  id: string;
  pipelineId: string;
  status: "planned" | "idle" | "blocked" | "complete";
  currentStageId: string | null;
  startedAt?: string;
  finishedAt?: string;
  /** Never auto-runs in BUILD-018. */
  autonomous: false;
};

export type PipelineHistoryEntry = {
  id: string;
  pipelineId: string;
  stageId: string;
  transition: TransitionKind;
  at: string;
  note: string;
};

export type PipelineMetrics = {
  pipelineId: string;
  totalStages: number;
  completedStages: number;
  blockedStages: number;
  reviewStages: number;
  progressPercent: number;
};

export type Pipeline = {
  id: string;
  workflowId: string;
  name: string;
  workspaceId: string;
  projectId: string;
  stageIds: string[];
  status: PipelineExecution["status"];
};

export type OrchestrationArtifact = {
  id: string;
  kind: ArtifactKind;
  title: string;
  stageId: string;
  producerId: string;
  status: "draft" | "ready" | "approved" | "rejected";
  ref: string;
};

export type OrchestrationDependency = {
  id: string;
  kind: DependencyKind;
  fromId: string;
  toId: string;
  label: string;
};

export type ReviewGate = {
  id: string;
  kind: ReviewGateKind;
  stageId: string;
  status: "open" | "passed" | "failed";
  reviewerIds: string[];
};

export type ApprovalGate = {
  id: string;
  stageId: string;
  reviewGateId: string;
  decision?: ApprovalDecision;
  actorId?: string;
  note?: string;
  at?: string;
};

export type StageAssignment = {
  id: string;
  stageId: string;
  assigneeId: string;
  assignerId: string;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  workload: number;
};

export type TransitionRecord = {
  id: string;
  stageId: string;
  kind: TransitionKind;
  at: string;
  actorId: string;
};

export type ExecutionView = {
  pipelineId: string;
  current: PipelineStage | null;
  upcoming: PipelineStage[];
  completed: PipelineStage[];
  blocked: PipelineStage[];
};

export type IntegrationLink = {
  id: string;
  target:
    | "workspace"
    | "projects"
    | "participants"
    | "knowledge"
    | "runtime"
    | "visual"
    | "collaboration"
    | "marketplace";
  label: string;
  path: string;
  status: "linked" | "planned";
};

export type OrchestrationOverview = {
  workflowCount: number;
  activePipelines: number;
  openApprovals: number;
  artifactCount: number;
  blockedStages: number;
  plannedOnly: true;
};
