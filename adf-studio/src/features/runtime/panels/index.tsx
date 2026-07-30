import { Badge, Card } from "@/components/ui";
import type {
  BackgroundJob,
  InspectorItem,
  RuntimeDiagnostics,
  RuntimeEvent,
} from "@/features/runtime/types";
import { HealthIndicator, ProgressBar } from "@/features/runtime/widgets";

export function InspectorPanel({
  title,
  items,
  testId,
}: {
  title: string;
  items: InspectorItem[];
  testId: string;
}) {
  return (
    <Card data-testid={testId}>
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-2">
            <span>{item.label}</span>
            <span className="text-xs text-ink-muted">
              {item.status}
              {item.meta ? ` · ${item.meta}` : ""}
            </span>
          </li>
        ))}
        {items.length === 0 && <li className="studio-muted">Empty</li>}
      </ul>
    </Card>
  );
}

export function JobsPanel({ jobs }: { jobs: BackgroundJob[] }) {
  const groups: Record<string, BackgroundJob[]> = {
    queued: jobs.filter((j) => j.status === "queued"),
    running: jobs.filter((j) => j.status === "running"),
    completed: jobs.filter((j) => j.status === "completed"),
    failed: jobs.filter((j) => j.status === "failed"),
    retry: jobs.filter((j) => j.status === "retry"),
  };

  return (
    <Card data-testid="jobs-panel">
      <h3 className="mb-3 text-sm font-semibold">Background Jobs</h3>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {Object.entries(groups).map(([status, list]) => (
          <div key={status} className="rounded-lg border border-line p-2">
            <div className="mb-2 flex items-center justify-between text-xs uppercase text-ink-muted">
              <span>{status}</span>
              <Badge>{list.length}</Badge>
            </div>
            <ul className="space-y-2">
              {list.map((job) => (
                <li key={job.id} className="text-sm">
                  <div className="font-medium">{job.name}</div>
                  <ProgressBar value={job.progress} />
                </li>
              ))}
              {list.length === 0 && <li className="text-xs text-ink-muted">—</li>}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function EventStreamPanel({ events }: { events: RuntimeEvent[] }) {
  return (
    <Card data-testid="event-stream">
      <h3 className="mb-3 text-sm font-semibold">Visual Event Stream</h3>
      <ul className="max-h-56 space-y-2 overflow-auto text-sm">
        {events.map((event) => (
          <li key={event.id} className="flex items-start justify-between gap-2 border-b border-line pb-2 last:border-0">
            <div>
              <div className="font-medium">{event.name}</div>
              <div className="studio-muted text-xs">{event.detail}</div>
            </div>
            <Badge>{event.category}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function DiagnosticsPanel({ diagnostics }: { diagnostics: RuntimeDiagnostics | null }) {
  if (!diagnostics) {
    return (
      <Card data-testid="diagnostics-panel">
        <p className="studio-muted text-sm">No diagnostics loaded</p>
      </Card>
    );
  }

  return (
    <div data-testid="diagnostics-panel" className="grid gap-3 lg:grid-cols-2">
      <Card>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Runtime Diagnostics</h3>
          <HealthIndicator level={diagnostics.runtime.ok ? "healthy" : "critical"} />
        </div>
        <ul className="space-y-2 text-sm">
          {diagnostics.runtime.checks.map((c) => (
            <li key={c.name} className="flex justify-between gap-2">
              <span>{c.name}</span>
              <span className="text-xs text-ink-muted">
                {c.ok ? "ok" : "fail"} · {c.detail}
              </span>
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <h3 className="mb-2 text-sm font-semibold">SDK Diagnostics</h3>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="studio-muted">Bridge</dt>
            <dd>{diagnostics.sdk.bridge}</dd>
          </div>
          <div>
            <dt className="studio-muted">Clients</dt>
            <dd className="text-xs text-ink-muted">{diagnostics.sdk.clients.join(", ")}</dd>
          </div>
        </dl>
      </Card>
      <Card>
        <h3 className="mb-2 text-sm font-semibold">Environment</h3>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="studio-muted">Node</dt>
            <dd>{diagnostics.environment.node}</dd>
          </div>
          <div>
            <dt className="studio-muted">Platform</dt>
            <dd>{diagnostics.environment.platform}</dd>
          </div>
          <div>
            <dt className="studio-muted">CWD</dt>
            <dd className="font-mono text-xs">{diagnostics.environment.cwd}</dd>
          </div>
        </dl>
      </Card>
      <Card>
        <h3 className="mb-2 text-sm font-semibold">Configuration</h3>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="studio-muted">Channel</dt>
            <dd>{diagnostics.configuration.channel}</dd>
          </div>
          <div>
            <dt className="studio-muted">Registry</dt>
            <dd>{diagnostics.configuration.registry}</dd>
          </div>
          <div>
            <dt className="studio-muted">Theme</dt>
            <dd>{diagnostics.configuration.theme}</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
