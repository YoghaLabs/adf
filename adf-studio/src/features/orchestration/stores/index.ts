import { create } from "zustand";
import type {
  ApprovalGate,
  ExecutionView,
  IntegrationLink,
  OrchestrationArtifact,
  OrchestrationDependency,
  OrchestrationOverview,
  PipelineHistoryEntry,
  PipelineMetrics,
  PipelineStage,
  ReviewGate,
  StageAssignment,
  TransitionRecord,
  VisualViewMode,
  WorkflowExecutionPlan,
  WorkflowInstance,
  WorkflowTemplate,
} from "@/features/orchestration/types";
import { studioSdk } from "@/sdk";

type WorkflowStateStore = {
  instances: WorkflowInstance[];
  templates: WorkflowTemplate[];
  plans: WorkflowExecutionPlan[];
  overview: OrchestrationOverview | null;
  loading: boolean;
  load: () => Promise<void>;
};

type PipelineStateStore = {
  stages: PipelineStage[];
  metrics: PipelineMetrics | null;
  history: PipelineHistoryEntry[];
  dependencies: OrchestrationDependency[];
  transitions: TransitionRecord[];
  reviewGates: ReviewGate[];
  assignments: StageAssignment[];
  viewMode: VisualViewMode;
  loading: boolean;
  load: () => Promise<void>;
  setViewMode: (mode: VisualViewMode) => void;
};

type ArtifactStateStore = {
  items: OrchestrationArtifact[];
  loading: boolean;
  load: () => Promise<void>;
};

type ExecutionStateStore = {
  view: ExecutionView | null;
  integrations: IntegrationLink[];
  loading: boolean;
  load: () => Promise<void>;
};

type ApprovalStateStore = {
  gates: ApprovalGate[];
  loading: boolean;
  load: () => Promise<void>;
};

export const useWorkflowStore = create<WorkflowStateStore>((set) => ({
  instances: [],
  templates: [],
  plans: [],
  overview: null,
  loading: false,
  async load() {
    set({ loading: true });
    const [instances, templates, plans, overview] = await Promise.all([
      studioSdk.workflows.instances(),
      studioSdk.workflows.templates(),
      studioSdk.workflows.plans(),
      studioSdk.workflows.overview(),
    ]);
    set({
      instances: instances.ok ? instances.data.instances : [],
      templates: templates.ok ? templates.data.templates : [],
      plans: plans.ok ? plans.data.plans : [],
      overview: overview.ok ? overview.data : null,
      loading: false,
    });
  },
}));

export const usePipelineStore = create<PipelineStateStore>((set) => ({
  stages: [],
  metrics: null,
  history: [],
  dependencies: [],
  transitions: [],
  reviewGates: [],
  assignments: [],
  viewMode: "board",
  loading: false,
  async load() {
    set({ loading: true });
    const [stages, metrics, history, dependencies, transitions, reviewGates, assignments] =
      await Promise.all([
        studioSdk.pipelines.stages(),
        studioSdk.pipelines.metrics(),
        studioSdk.pipelines.history(),
        studioSdk.pipelines.dependencies(),
        studioSdk.pipelines.transitions(),
        studioSdk.pipelines.reviewGates(),
        studioSdk.pipelines.assignments(),
      ]);
    set({
      stages: stages.ok ? stages.data.stages : [],
      metrics: metrics.ok ? metrics.data : null,
      history: history.ok ? history.data.entries : [],
      dependencies: dependencies.ok ? dependencies.data.dependencies : [],
      transitions: transitions.ok ? transitions.data.transitions : [],
      reviewGates: reviewGates.ok ? reviewGates.data.gates : [],
      assignments: assignments.ok ? assignments.data.assignments : [],
      loading: false,
    });
  },
  setViewMode(mode) {
    set({ viewMode: mode });
  },
}));

export const useArtifactStore = create<ArtifactStateStore>((set) => ({
  items: [],
  loading: false,
  async load() {
    set({ loading: true });
    const result = await studioSdk.artifacts.list();
    set({ items: result.ok ? result.data.artifacts : [], loading: false });
  },
}));

export const useExecutionStore = create<ExecutionStateStore>((set) => ({
  view: null,
  integrations: [],
  loading: false,
  async load() {
    set({ loading: true });
    const [view, integrations] = await Promise.all([
      studioSdk.execution.view(),
      studioSdk.execution.integrations(),
    ]);
    set({
      view: view.ok ? view.data : null,
      integrations: integrations.ok ? integrations.data.integrations : [],
      loading: false,
    });
  },
}));

export const useApprovalStore = create<ApprovalStateStore>((set) => ({
  gates: [],
  loading: false,
  async load() {
    set({ loading: true });
    const result = await studioSdk.approvals.list();
    set({ gates: result.ok ? result.data.gates : [], loading: false });
  },
}));
