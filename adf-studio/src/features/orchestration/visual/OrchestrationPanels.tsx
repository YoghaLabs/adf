import { Badge, Card } from "@/components/ui";
import type {
  ApprovalGate,
  IntegrationLink,
  OrchestrationArtifact,
  OrchestrationDependency,
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
import type { ExecutionView } from "@/features/orchestration/types";
import { cn } from "@/utils/cn";

export function WorkflowListPanel({
  instances,
  templates,
  plans,
}: {
  instances: WorkflowInstance[];
  templates: WorkflowTemplate[];
  plans: WorkflowExecutionPlan[];
}) {
  return (
    <div data-testid="workflow-panel" className="grid gap-4 lg:grid-cols-2">
      <Card>
        <h3 className="mb-3 text-sm font-semibold">Workflow Instances</h3>
        <ul className="space-y-2 text-sm">
          {instances.map((w) => (
            <li key={w.id} className="flex items-center justify-between gap-2">
              <span>{w.title}</span>
              <Badge>{w.state}</Badge>
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <h3 className="mb-3 text-sm font-semibold">Templates & Plans</h3>
        <ul className="mb-3 space-y-1 text-sm">
          {templates.map((t) => (
            <li key={t.id}>
              {t.name} · {t.stageKinds.length} stages
            </li>
          ))}
        </ul>
        <ul className="space-y-1 text-xs text-ink-muted">
          {plans.map((p) => (
            <li key={p.id}>
              Plan {p.id}: {p.orderedStageIds.length} stages · executable={String(p.executable)}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export function PipelineBoardPanel({
  stages,
  metrics,
  view,
  onViewChange,
}: {
  stages: PipelineStage[];
  metrics: PipelineMetrics | null;
  view: VisualViewMode;
  onViewChange: (v: VisualViewMode) => void;
}) {
  const modes: VisualViewMode[] = ["board", "kanban", "timeline", "dependency", "graph"];
  return (
    <Card data-testid="pipeline-board">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">Visual Pipeline</h3>
        <div className="flex flex-wrap gap-1">
          {modes.map((m) => (
            <button
              key={m}
              type="button"
              className={cn(
                "rounded-md border border-line px-2 py-1 text-xs capitalize",
                view === m && "border-accent bg-accent/10 text-accent",
              )}
              onClick={() => onViewChange(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      {metrics && (
        <p className="studio-muted mb-3 text-xs" data-testid="pipeline-metrics">
          {metrics.completedStages}/{metrics.totalStages} complete · {metrics.progressPercent}% ·
          blocked {metrics.blockedStages} · review {metrics.reviewStages}
        </p>
      )}
      <div
        data-testid={`pipeline-view-${view}`}
        className={cn(
          "gap-2",
          view === "kanban" || view === "board"
            ? "grid sm:grid-cols-2 lg:grid-cols-4"
            : "flex flex-col",
        )}
      >
        {stages.map((s) => (
          <div
            key={s.id}
            data-testid={`stage-${s.id}`}
            className="rounded-lg border border-line bg-canvas px-3 py-2 text-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium">{s.label}</span>
              <Badge>{s.state}</Badge>
            </div>
            <div className="studio-muted mt-1 text-xs">
              {s.kind} · order {s.order}
              {s.reviewGate ? ` · gate ${s.reviewGate}` : ""}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function ExecutionViewPanel({ view }: { view: ExecutionView | null }) {
  if (!view) {
    return (
      <Card data-testid="execution-view">
        <p className="studio-muted text-sm">No execution plan loaded</p>
      </Card>
    );
  }
  return (
    <Card data-testid="execution-view">
      <h3 className="mb-3 text-sm font-semibold">Execution View (planned)</h3>
      <p className="studio-muted mb-3 text-xs">
        Current: {view.current?.label ?? "—"} · No autonomous execution
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <div>
          <div className="studio-muted text-xs">Current</div>
          <div>{view.current?.label ?? "—"}</div>
        </div>
        <div>
          <div className="studio-muted text-xs">Upcoming</div>
          <ul>
            {view.upcoming.map((s) => (
              <li key={s.id}>{s.label}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="studio-muted text-xs">Completed</div>
          <ul>
            {view.completed.map((s) => (
              <li key={s.id}>{s.label}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="studio-muted text-xs">Blocked</div>
          <ul>
            {view.blocked.map((s) => (
              <li key={s.id}>{s.label}</li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

export function ArtifactsPanel({ items }: { items: OrchestrationArtifact[] }) {
  return (
    <Card data-testid="artifacts-panel">
      <h3 className="mb-3 text-sm font-semibold">Artifacts</h3>
      <ul className="space-y-2 text-sm">
        {items.map((a) => (
          <li key={a.id} className="flex items-center justify-between gap-2">
            <span>
              {a.title}{" "}
              <span className="text-xs text-ink-muted">({a.kind})</span>
            </span>
            <Badge>{a.status}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function DependenciesPanel({ items }: { items: OrchestrationDependency[] }) {
  return (
    <Card data-testid="dependencies-panel">
      <h3 className="mb-3 text-sm font-semibold">Dependencies</h3>
      <ul className="space-y-2 text-sm">
        {items.map((d) => (
          <li key={d.id} className="flex items-center justify-between gap-2">
            <span>{d.label}</span>
            <span className="text-xs text-ink-muted">{d.kind}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function TransitionsPanel({ items }: { items: TransitionRecord[] }) {
  return (
    <Card data-testid="transitions-panel">
      <h3 className="mb-3 text-sm font-semibold">Transitions</h3>
      <ul className="space-y-2 text-sm">
        {items.map((t) => (
          <li key={t.id} className="flex items-center justify-between gap-2">
            <span>
              {t.kind} → {t.stageId}
            </span>
            <span className="text-xs text-ink-muted">{t.at.slice(0, 16)}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function ReviewGatesPanel({ items }: { items: ReviewGate[] }) {
  return (
    <Card data-testid="review-gates">
      <h3 className="mb-3 text-sm font-semibold">Review Gates</h3>
      <ul className="space-y-2 text-sm">
        {items.map((g) => (
          <li key={g.id} className="flex items-center justify-between gap-2">
            <span>
              {g.kind} · {g.stageId}
            </span>
            <Badge>{g.status}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function ApprovalGatesPanel({ items }: { items: ApprovalGate[] }) {
  return (
    <Card data-testid="approval-gates">
      <h3 className="mb-3 text-sm font-semibold">Approval Gates</h3>
      <ul className="space-y-2 text-sm">
        {items.map((a) => (
          <li key={a.id} className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-2">
              <span>{a.stageId}</span>
              <Badge>{a.decision ?? "pending"}</Badge>
            </div>
            {a.note && <p className="studio-muted text-xs">{a.note}</p>}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function AssignmentsPanel({ items }: { items: StageAssignment[] }) {
  return (
    <Card data-testid="orch-assignments">
      <h3 className="mb-3 text-sm font-semibold">Stage Assignments</h3>
      <ul className="space-y-2 text-sm">
        {items.map((a) => (
          <li key={a.id} className="flex items-center justify-between gap-2">
            <span>
              {a.assigneeId} → {a.stageId}
            </span>
            <span className="text-xs text-ink-muted">
              {a.priority} · load {a.workload}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function PipelineHistoryPanel({ items }: { items: PipelineHistoryEntry[] }) {
  return (
    <Card data-testid="pipeline-history">
      <h3 className="mb-3 text-sm font-semibold">Pipeline History</h3>
      <ul className="space-y-2 text-sm">
        {items.map((h) => (
          <li key={h.id}>
            <div className="flex items-center justify-between gap-2">
              <span>
                {h.transition} · {h.stageId}
              </span>
              <span className="text-xs text-ink-muted">{h.at.slice(0, 16)}</span>
            </div>
            <p className="studio-muted text-xs">{h.note}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function IntegrationsPanel({ items }: { items: IntegrationLink[] }) {
  return (
    <Card data-testid="integrations-panel">
      <h3 className="mb-3 text-sm font-semibold">Platform Integrations</h3>
      <ul className="grid gap-2 sm:grid-cols-2 text-sm">
        {items.map((i) => (
          <li key={i.id} className="flex items-center justify-between rounded-lg border border-line px-3 py-2">
            <a className="hover:text-accent" href={i.path}>
              {i.label}
            </a>
            <Badge>{i.status}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}
