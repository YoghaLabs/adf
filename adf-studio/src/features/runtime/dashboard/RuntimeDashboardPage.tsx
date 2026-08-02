import { useEffect } from "react";
import { RuntimeOverviewCards } from "@/features/runtime/dashboard/RuntimeOverviewCards";
import { MetricsPanel } from "@/features/runtime/metrics/MetricsPanel";
import { LogViewer } from "@/features/runtime/log-viewer/LogViewer";
import { TimelinePanel } from "@/features/runtime/timeline/TimelinePanel";
import {
  DiagnosticsPanel,
  EventStreamPanel,
  InspectorPanel,
  JobsPanel,
} from "@/features/runtime/panels";
import {
  useDiagnosticStore,
  useLogStore,
  useMetricsStore,
  useRuntimeDashboardStore,
  useTimelineStore,
} from "@/features/runtime/stores";
import { useT } from "@/i18n";

export function RuntimeDashboardPage() {
  const t = useT();
  const loadDashboard = useRuntimeDashboardStore((s) => s.load);
  const overview = useRuntimeDashboardStore((s) => s.overview);
  const jobs = useRuntimeDashboardStore((s) => s.jobs);
  const events = useRuntimeDashboardStore((s) => s.events);
  const inspectors = useRuntimeDashboardStore((s) => s.inspectors);
  const loading = useRuntimeDashboardStore((s) => s.loading);

  const loadMetrics = useMetricsStore((s) => s.load);
  const metrics = useMetricsStore((s) => s.metrics);
  const series = useMetricsStore((s) => s.series);

  const loadLogs = useLogStore((s) => s.load);
  const filtered = useLogStore((s) => s.filtered);
  const query = useLogStore((s) => s.query);
  const severity = useLogStore((s) => s.severity);
  const setQuery = useLogStore((s) => s.setQuery);
  const setSeverity = useLogStore((s) => s.setSeverity);

  const loadTimeline = useTimelineStore((s) => s.load);
  const timeline = useTimelineStore((s) => s.events);
  const kind = useTimelineStore((s) => s.kind);
  const setKind = useTimelineStore((s) => s.setKind);

  const loadDiagnostics = useDiagnosticStore((s) => s.load);
  const diagnostics = useDiagnosticStore((s) => s.diagnostics);

  useEffect(() => {
    void loadDashboard();
    void loadMetrics();
    void loadLogs();
    void loadTimeline("all");
    void loadDiagnostics();
  }, [loadDashboard, loadDiagnostics, loadLogs, loadMetrics, loadTimeline]);

  return (
    <div data-testid="page-runtime-dashboard" className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">{t("runtime.title")}</h1>
        <p className="studio-muted mt-1">{t("runtime.subtitle")}</p>
      </div>

      {loading && <p className="studio-muted text-sm">{t("common.loading")}</p>}

      <RuntimeOverviewCards overview={overview} />
      <MetricsPanel metrics={metrics} series={series} />
      <TimelinePanel events={timeline} kind={kind} onKindChange={setKind} />

      <div className="grid gap-4 lg:grid-cols-2">
        <LogViewer
          logs={filtered}
          query={query}
          severity={severity}
          onQueryChange={setQuery}
          onSeverityChange={setSeverity}
        />
        <EventStreamPanel events={events} />
      </div>

      <JobsPanel jobs={jobs} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <InspectorPanel title="Plugin Inspector" items={inspectors.plugins ?? []} testId="plugin-inspector" />
        <InspectorPanel title="Package Inspector" items={inspectors.packages ?? []} testId="package-inspector" />
        <InspectorPanel title="Knowledge Inspector" items={inspectors.knowledge ?? []} testId="knowledge-inspector" />
        <InspectorPanel title="Context Inspector" items={inspectors.context ?? []} testId="context-inspector" />
        <InspectorPanel title="Session Inspector" items={inspectors.session ?? []} testId="session-inspector" />
      </div>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Diagnostics</h2>
        <DiagnosticsPanel diagnostics={diagnostics} />
      </section>
    </div>
  );
}
