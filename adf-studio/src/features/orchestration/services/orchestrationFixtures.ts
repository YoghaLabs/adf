import type {
  ApprovalGate,
  IntegrationLink,
  OrchestrationArtifact,
  OrchestrationDependency,
  OrchestrationOverview,
  Pipeline,
  PipelineExecution,
  PipelineHistoryEntry,
  PipelineMetrics,
  PipelineStage,
  ReviewGate,
  StageAssignment,
  TransitionRecord,
  WorkflowDefinition,
  WorkflowExecutionPlan,
  WorkflowInstance,
  WorkflowTemplate,
} from "@/features/orchestration/types";

/** Presentation fixtures — orchestration model only, no autonomous execution. */

export const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: "tpl-full-delivery",
    name: "Full Delivery",
    description: "Planning → Release with review gates (planned only)",
    stageKinds: [
      "planning",
      "architecture",
      "backend",
      "frontend",
      "testing",
      "documentation",
      "release",
    ],
  },
  {
    id: "tpl-docs-only",
    name: "Documentation Pass",
    description: "Custom documentation-focused template",
    stageKinds: ["planning", "documentation", "release"],
  },
];

export const WORKFLOW_DEFINITIONS: WorkflowDefinition[] = [
  {
    id: "wf-def-adf-v1",
    name: "ADF v1 Delivery Orchestration",
    description: "Unifies collaboration participants into a planned pipeline",
    templateId: "tpl-full-delivery",
    stageKinds: WORKFLOW_TEMPLATES[0]!.stageKinds,
    version: "0.18.0-alpha",
  },
];

export const WORKFLOW_INSTANCES: WorkflowInstance[] = [
  {
    id: "wf-inst-001",
    definitionId: "wf-def-adf-v1",
    workspaceId: "ws-adf",
    projectId: "proj-adf",
    title: "BUILD-018 Orchestration Plan",
    state: "planned",
    currentStageId: "stage-architecture",
    participantIds: [
      "human-yogha",
      "ai-planner",
      "ai-architect",
      "ai-backend",
      "ai-frontend",
      "ai-qa",
      "ai-docs",
      "ai-release",
    ],
    createdAt: "2026-07-30T10:00:00.000Z",
    updatedAt: "2026-07-30T16:00:00.000Z",
  },
];

export const EXECUTION_PLANS: WorkflowExecutionPlan[] = [
  {
    id: "plan-001",
    workflowId: "wf-inst-001",
    orderedStageIds: [
      "stage-planning",
      "stage-architecture",
      "stage-backend",
      "stage-frontend",
      "stage-testing",
      "stage-docs",
      "stage-release",
    ],
    notes: "Execution planning only — no autonomous run in BUILD-018",
    plannedAt: "2026-07-30T15:30:00.000Z",
    executable: false,
  },
];

export const PIPELINES: Pipeline[] = [
  {
    id: "pipe-001",
    workflowId: "wf-inst-001",
    name: "ADF Delivery Pipeline",
    workspaceId: "ws-adf",
    projectId: "proj-adf",
    stageIds: [
      "stage-planning",
      "stage-architecture",
      "stage-backend",
      "stage-frontend",
      "stage-testing",
      "stage-docs",
      "stage-release",
    ],
    status: "planned",
  },
];

export const STAGES: PipelineStage[] = [
  {
    id: "stage-planning",
    pipelineId: "pipe-001",
    kind: "planning",
    label: "Planning",
    state: "completed",
    assigneeId: "ai-planner",
    order: 1,
    artifactIds: ["art-req"],
    dependencyIds: [],
  },
  {
    id: "stage-architecture",
    pipelineId: "pipe-001",
    kind: "architecture",
    label: "Architecture",
    state: "review",
    assigneeId: "ai-architect",
    order: 2,
    reviewGate: "architecture",
    artifactIds: ["art-arch"],
    dependencyIds: ["dep-stage-plan-arch"],
  },
  {
    id: "stage-backend",
    pipelineId: "pipe-001",
    kind: "backend",
    label: "Backend",
    state: "ready",
    assigneeId: "ai-backend",
    order: 3,
    reviewGate: "code",
    artifactIds: ["art-src-be"],
    dependencyIds: ["dep-stage-arch-be", "dep-participant-be"],
  },
  {
    id: "stage-frontend",
    pipelineId: "pipe-001",
    kind: "frontend",
    label: "Frontend",
    state: "ready",
    assigneeId: "ai-frontend",
    order: 4,
    reviewGate: "code",
    artifactIds: ["art-src-fe"],
    dependencyIds: ["dep-stage-arch-fe"],
  },
  {
    id: "stage-testing",
    pipelineId: "pipe-001",
    kind: "testing",
    label: "Testing",
    state: "pending",
    assigneeId: "ai-qa",
    order: 5,
    reviewGate: "qa",
    artifactIds: ["art-tests"],
    dependencyIds: ["dep-stage-be-qa", "dep-stage-fe-qa"],
  },
  {
    id: "stage-docs",
    pipelineId: "pipe-001",
    kind: "documentation",
    label: "Documentation",
    state: "pending",
    assigneeId: "ai-docs",
    order: 6,
    reviewGate: "documentation",
    artifactIds: ["art-docs"],
    dependencyIds: ["dep-stage-qa-docs", "dep-knowledge"],
  },
  {
    id: "stage-release",
    pipelineId: "pipe-001",
    kind: "release",
    label: "Release",
    state: "blocked",
    assigneeId: "ai-release",
    order: 7,
    reviewGate: "release",
    artifactIds: ["art-pkg"],
    dependencyIds: ["dep-stage-docs-rel"],
  },
];

export const PIPELINE_EXECUTIONS: PipelineExecution[] = [
  {
    id: "pex-001",
    pipelineId: "pipe-001",
    status: "planned",
    currentStageId: "stage-architecture",
    autonomous: false,
  },
];

export const PIPELINE_HISTORY: PipelineHistoryEntry[] = [
  {
    id: "ph-1",
    pipelineId: "pipe-001",
    stageId: "stage-planning",
    transition: "next",
    at: "2026-07-30T12:00:00.000Z",
    note: "Planning stage marked complete (manual plan)",
  },
  {
    id: "ph-2",
    pipelineId: "pipe-001",
    stageId: "stage-architecture",
    transition: "next",
    at: "2026-07-30T14:00:00.000Z",
    note: "Entered architecture review gate",
  },
];

export const ORCHESTRATION_ARTIFACTS: OrchestrationArtifact[] = [
  {
    id: "art-req",
    kind: "requirements",
    title: "Orchestration requirements",
    stageId: "stage-planning",
    producerId: "ai-planner",
    status: "approved",
    ref: "docs://requirements/orch",
  },
  {
    id: "art-arch",
    kind: "architecture_docs",
    title: "ADR-016 draft",
    stageId: "stage-architecture",
    producerId: "ai-architect",
    status: "ready",
    ref: "docs://adr/016",
  },
  {
    id: "art-src-be",
    kind: "source_code",
    title: "Service orchestration envelopes",
    stageId: "stage-backend",
    producerId: "ai-backend",
    status: "draft",
    ref: "code://adf-core/orchestration",
  },
  {
    id: "art-src-fe",
    kind: "source_code",
    title: "Studio orchestration UI",
    stageId: "stage-frontend",
    producerId: "ai-frontend",
    status: "draft",
    ref: "code://adf-studio/orchestration",
  },
  {
    id: "art-tests",
    kind: "tests",
    title: "Orchestration Vitest suite",
    stageId: "stage-testing",
    producerId: "ai-qa",
    status: "draft",
    ref: "test://orchestration",
  },
  {
    id: "art-docs",
    kind: "documentation",
    title: "ORCHESTRATION_PLATFORM.md",
    stageId: "stage-docs",
    producerId: "ai-docs",
    status: "draft",
    ref: "docs://ORCHESTRATION_PLATFORM",
  },
  {
    id: "art-pkg",
    kind: "release_package",
    title: "0.18.0-alpha package plan",
    stageId: "stage-release",
    producerId: "ai-release",
    status: "draft",
    ref: "release://0.18.0-alpha",
  },
];

export const DEPENDENCIES: OrchestrationDependency[] = [
  {
    id: "dep-stage-plan-arch",
    kind: "stage",
    fromId: "stage-planning",
    toId: "stage-architecture",
    label: "Planning → Architecture",
  },
  {
    id: "dep-stage-arch-be",
    kind: "stage",
    fromId: "stage-architecture",
    toId: "stage-backend",
    label: "Architecture → Backend",
  },
  {
    id: "dep-stage-arch-fe",
    kind: "stage",
    fromId: "stage-architecture",
    toId: "stage-frontend",
    label: "Architecture → Frontend",
  },
  {
    id: "dep-stage-be-qa",
    kind: "stage",
    fromId: "stage-backend",
    toId: "stage-testing",
    label: "Backend → Testing",
  },
  {
    id: "dep-stage-fe-qa",
    kind: "stage",
    fromId: "stage-frontend",
    toId: "stage-testing",
    label: "Frontend → Testing",
  },
  {
    id: "dep-stage-qa-docs",
    kind: "stage",
    fromId: "stage-testing",
    toId: "stage-docs",
    label: "Testing → Documentation",
  },
  {
    id: "dep-stage-docs-rel",
    kind: "stage",
    fromId: "stage-docs",
    toId: "stage-release",
    label: "Documentation → Release",
  },
  {
    id: "dep-participant-be",
    kind: "participant",
    fromId: "ai-backend",
    toId: "stage-backend",
    label: "Backend AI assigned",
  },
  {
    id: "dep-knowledge",
    kind: "knowledge",
    fromId: "knowledge-graph",
    toId: "stage-docs",
    label: "Knowledge pack required",
  },
  {
    id: "dep-artifact-arch",
    kind: "artifact",
    fromId: "art-arch",
    toId: "stage-backend",
    label: "Architecture docs required",
  },
];

export const REVIEW_GATES: ReviewGate[] = [
  {
    id: "rg-arch",
    kind: "architecture",
    stageId: "stage-architecture",
    status: "open",
    reviewerIds: ["human-yogha", "ai-architect"],
  },
  {
    id: "rg-code-be",
    kind: "code",
    stageId: "stage-backend",
    status: "open",
    reviewerIds: ["human-yogha"],
  },
  {
    id: "rg-qa",
    kind: "qa",
    stageId: "stage-testing",
    status: "open",
    reviewerIds: ["ai-qa"],
  },
  {
    id: "rg-docs",
    kind: "documentation",
    stageId: "stage-docs",
    status: "open",
    reviewerIds: ["ai-docs"],
  },
  {
    id: "rg-rel",
    kind: "release",
    stageId: "stage-release",
    status: "open",
    reviewerIds: ["human-yogha", "ai-release"],
  },
];

export const APPROVAL_GATES: ApprovalGate[] = [
  {
    id: "ag-1",
    stageId: "stage-planning",
    reviewGateId: "rg-arch",
    decision: "approve",
    actorId: "human-yogha",
    note: "Planning artifacts accepted",
    at: "2026-07-30T12:05:00.000Z",
  },
  {
    id: "ag-2",
    stageId: "stage-architecture",
    reviewGateId: "rg-arch",
    decision: "request_changes",
    actorId: "human-yogha",
    note: "Clarify separation of orchestration vs execution",
    at: "2026-07-30T15:00:00.000Z",
  },
];

export const STAGE_ASSIGNMENTS: StageAssignment[] = [
  {
    id: "sa-1",
    stageId: "stage-architecture",
    assigneeId: "ai-architect",
    assignerId: "human-yogha",
    priority: "high",
    dueDate: "2026-07-31",
    workload: 3,
  },
  {
    id: "sa-2",
    stageId: "stage-backend",
    assigneeId: "ai-backend",
    assignerId: "ai-planner",
    priority: "medium",
    workload: 5,
  },
  {
    id: "sa-3",
    stageId: "stage-frontend",
    assigneeId: "ai-frontend",
    assignerId: "ai-planner",
    priority: "medium",
    workload: 5,
  },
];

export const TRANSITIONS: TransitionRecord[] = [
  {
    id: "tr-1",
    stageId: "stage-planning",
    kind: "next",
    at: "2026-07-30T12:00:00.000Z",
    actorId: "human-yogha",
  },
  {
    id: "tr-2",
    stageId: "stage-architecture",
    kind: "retry",
    at: "2026-07-30T15:10:00.000Z",
    actorId: "ai-architect",
  },
];

export const INTEGRATIONS: IntegrationLink[] = [
  { id: "int-ws", target: "workspace", label: "Workspace", path: "/workspace", status: "linked" },
  { id: "int-proj", target: "projects", label: "Projects", path: "/projects", status: "linked" },
  {
    id: "int-part",
    target: "participants",
    label: "Participants",
    path: "/collaboration",
    status: "linked",
  },
  { id: "int-know", target: "knowledge", label: "Knowledge", path: "/visual/knowledge", status: "linked" },
  { id: "int-rt", target: "runtime", label: "Runtime Dashboard", path: "/runtime", status: "linked" },
  { id: "int-vis", target: "visual", label: "Visual Intelligence", path: "/visual", status: "linked" },
  {
    id: "int-collab",
    target: "collaboration",
    label: "Collaboration",
    path: "/collaboration",
    status: "linked",
  },
  {
    id: "int-mkt",
    target: "marketplace",
    label: "Marketplace",
    path: "/marketplace",
    status: "linked",
  },
];

export function getPipelineMetrics(pipelineId = "pipe-001"): PipelineMetrics {
  const stages = STAGES.filter((s) => s.pipelineId === pipelineId);
  const completed = stages.filter((s) => s.state === "completed").length;
  const blocked = stages.filter((s) => s.state === "blocked").length;
  const review = stages.filter((s) => s.state === "review").length;
  return {
    pipelineId,
    totalStages: stages.length,
    completedStages: completed,
    blockedStages: blocked,
    reviewStages: review,
    progressPercent: stages.length ? Math.round((completed / stages.length) * 100) : 0,
  };
}

export function getOrchestrationOverview(): OrchestrationOverview {
  return {
    workflowCount: WORKFLOW_INSTANCES.length,
    activePipelines: PIPELINES.filter((p) => p.status !== "complete").length,
    openApprovals: APPROVAL_GATES.filter((a) => !a.decision || a.decision === "request_changes")
      .length,
    artifactCount: ORCHESTRATION_ARTIFACTS.length,
    blockedStages: STAGES.filter((s) => s.state === "blocked").length,
    plannedOnly: true,
  };
}

export function getExecutionView(pipelineId = "pipe-001") {
  const stages = STAGES.filter((s) => s.pipelineId === pipelineId).sort((a, b) => a.order - b.order);
  const current = stages.find((s) => s.state === "running" || s.state === "review") ?? null;
  return {
    pipelineId,
    current,
    upcoming: stages.filter((s) => s.state === "pending" || s.state === "ready"),
    completed: stages.filter((s) => s.state === "completed" || s.state === "approved"),
    blocked: stages.filter((s) => s.state === "blocked" || s.state === "rejected"),
  };
}
