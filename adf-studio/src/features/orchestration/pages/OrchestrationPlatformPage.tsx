import { useEffect } from "react";
import { Card } from "@/components/ui";
import {
  ApprovalGatesPanel,
  ArtifactsPanel,
  AssignmentsPanel,
  DependenciesPanel,
  ExecutionViewPanel,
  IntegrationsPanel,
  PipelineBoardPanel,
  PipelineHistoryPanel,
  ReviewGatesPanel,
  TransitionsPanel,
  WorkflowListPanel,
} from "@/features/orchestration/visual/OrchestrationPanels";
import {
  useApprovalStore,
  useArtifactStore,
  useExecutionStore,
  usePipelineStore,
  useWorkflowStore,
} from "@/features/orchestration/stores";

export function OrchestrationPlatformPage() {
  const loadWorkflow = useWorkflowStore((s) => s.load);
  const overview = useWorkflowStore((s) => s.overview);
  const instances = useWorkflowStore((s) => s.instances);
  const templates = useWorkflowStore((s) => s.templates);
  const plans = useWorkflowStore((s) => s.plans);

  const loadPipeline = usePipelineStore((s) => s.load);
  const stages = usePipelineStore((s) => s.stages);
  const metrics = usePipelineStore((s) => s.metrics);
  const history = usePipelineStore((s) => s.history);
  const dependencies = usePipelineStore((s) => s.dependencies);
  const transitions = usePipelineStore((s) => s.transitions);
  const reviewGates = usePipelineStore((s) => s.reviewGates);
  const assignments = usePipelineStore((s) => s.assignments);
  const viewMode = usePipelineStore((s) => s.viewMode);
  const setViewMode = usePipelineStore((s) => s.setViewMode);

  const loadArtifacts = useArtifactStore((s) => s.load);
  const artifacts = useArtifactStore((s) => s.items);

  const loadExecution = useExecutionStore((s) => s.load);
  const executionView = useExecutionStore((s) => s.view);
  const integrations = useExecutionStore((s) => s.integrations);

  const loadApprovals = useApprovalStore((s) => s.load);
  const approvals = useApprovalStore((s) => s.gates);

  useEffect(() => {
    void loadWorkflow();
    void loadPipeline();
    void loadArtifacts();
    void loadExecution();
    void loadApprovals();
  }, [loadApprovals, loadArtifacts, loadExecution, loadPipeline, loadWorkflow]);

  return (
    <div data-testid="page-orchestration" className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">AI Orchestration</h1>
        <p className="studio-muted mt-1">
          Workflow, pipeline, stages, artifacts, and gates — planning model only. No AI automation
          and no autonomous execution in BUILD-018.
        </p>
      </div>

      <div data-testid="orch-overview" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <Card>
          <div className="studio-muted text-xs">Workflows</div>
          <div className="mt-2 text-2xl font-semibold">{overview?.workflowCount ?? "—"}</div>
        </Card>
        <Card>
          <div className="studio-muted text-xs">Pipelines</div>
          <div className="mt-2 text-2xl font-semibold">{overview?.activePipelines ?? "—"}</div>
        </Card>
        <Card>
          <div className="studio-muted text-xs">Open Approvals</div>
          <div className="mt-2 text-2xl font-semibold">{overview?.openApprovals ?? "—"}</div>
        </Card>
        <Card>
          <div className="studio-muted text-xs">Artifacts</div>
          <div className="mt-2 text-2xl font-semibold">{overview?.artifactCount ?? "—"}</div>
        </Card>
        <Card>
          <div className="studio-muted text-xs">Blocked Stages</div>
          <div className="mt-2 text-2xl font-semibold">{overview?.blockedStages ?? "—"}</div>
        </Card>
      </div>

      <WorkflowListPanel instances={instances} templates={templates} plans={plans} />
      <PipelineBoardPanel
        stages={stages}
        metrics={metrics}
        view={viewMode}
        onViewChange={setViewMode}
      />
      <ExecutionViewPanel view={executionView} />

      <div className="grid gap-4 lg:grid-cols-2">
        <ArtifactsPanel items={artifacts} />
        <DependenciesPanel items={dependencies} />
        <TransitionsPanel items={transitions} />
        <ReviewGatesPanel items={reviewGates} />
        <ApprovalGatesPanel items={approvals} />
        <AssignmentsPanel items={assignments} />
        <PipelineHistoryPanel items={history} />
        <IntegrationsPanel items={integrations} />
      </div>
    </div>
  );
}
