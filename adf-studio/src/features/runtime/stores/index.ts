import { create } from "zustand";
import type {
  BackgroundJob,
  InspectorItem,
  LogEntry,
  LogSeverity,
  MetricSeriesPoint,
  RuntimeDiagnostics,
  RuntimeEvent,
  RuntimeMetrics,
  RuntimeOverview,
  TimelineEvent,
  TimelineKind,
} from "@/features/runtime/types";
import { studioSdk } from "@/sdk";

type RuntimeDashboardState = {
  overview: RuntimeOverview | null;
  jobs: BackgroundJob[];
  events: RuntimeEvent[];
  inspectors: Record<string, InspectorItem[]>;
  loading: boolean;
  error: string | null;
  load: () => Promise<void>;
};

type MetricsState = {
  metrics: RuntimeMetrics | null;
  series: MetricSeriesPoint[];
  loading: boolean;
  load: () => Promise<void>;
};

type LogState = {
  logs: LogEntry[];
  filtered: LogEntry[];
  query: string;
  severity: LogSeverity | "all";
  loading: boolean;
  load: () => Promise<void>;
  setQuery: (query: string) => void;
  setSeverity: (severity: LogSeverity | "all") => void;
  applyFilter: () => void;
};

type TimelineState = {
  events: TimelineEvent[];
  kind: TimelineKind | "all";
  loading: boolean;
  load: (kind?: TimelineKind | "all") => Promise<void>;
  setKind: (kind: TimelineKind | "all") => void;
};

type DiagnosticState = {
  diagnostics: RuntimeDiagnostics | null;
  loading: boolean;
  load: () => Promise<void>;
};

export const useRuntimeDashboardStore = create<RuntimeDashboardState>((set) => ({
  overview: null,
  jobs: [],
  events: [],
  inspectors: {},
  loading: false,
  error: null,
  async load() {
    set({ loading: true, error: null });
    const [overview, jobs, events, inspectors] = await Promise.all([
      studioSdk.runtimeDashboard.overview(),
      studioSdk.runtimeDashboard.jobs(),
      studioSdk.runtimeDashboard.events(),
      studioSdk.runtimeDashboard.inspectors(),
    ]);
    if (!overview.ok) {
      set({ loading: false, error: overview.error ?? "overview failed" });
      return;
    }
    set({
      overview: overview.data,
      jobs: jobs.ok ? jobs.data.jobs : [],
      events: events.ok ? events.data.events : [],
      inspectors: inspectors.ok ? inspectors.data : {},
      loading: false,
    });
  },
}));

export const useMetricsStore = create<MetricsState>((set) => ({
  metrics: null,
  series: [],
  loading: false,
  async load() {
    set({ loading: true });
    const [snap, series] = await Promise.all([
      studioSdk.metrics.snapshot(),
      studioSdk.metrics.series(),
    ]);
    set({
      metrics: snap.ok ? snap.data : null,
      series: series.ok ? series.data.points : [],
      loading: false,
    });
  },
}));

export const useLogStore = create<LogState>((set, get) => ({
  logs: [],
  filtered: [],
  query: "",
  severity: "all",
  loading: false,
  async load() {
    set({ loading: true });
    const result = await studioSdk.logs.list();
    const logs = result.ok ? result.data.logs : [];
    set({ logs, loading: false });
    get().applyFilter();
  },
  setQuery(query) {
    set({ query });
    get().applyFilter();
  },
  setSeverity(severity) {
    set({ severity });
    get().applyFilter();
  },
  applyFilter() {
    const { logs, query, severity } = get();
    void studioSdk.logs
      .filter({ query, severity })
      .then((r) => set({ filtered: r.ok ? r.data.logs : logs }));
  },
}));

export const useTimelineStore = create<TimelineState>((set) => ({
  events: [],
  kind: "all",
  loading: false,
  async load(kind = "all") {
    set({ loading: true, kind });
    const result =
      kind === "all"
        ? await studioSdk.timeline.list()
        : await studioSdk.timeline.byKind(kind);
    set({ events: result.ok ? result.data.events : [], loading: false });
  },
  setKind(kind) {
    void useTimelineStore.getState().load(kind);
  },
}));

export const useDiagnosticStore = create<DiagnosticState>((set) => ({
  diagnostics: null,
  loading: false,
  async load() {
    set({ loading: true });
    const result = await studioSdk.diagnostics.snapshot();
    set({ diagnostics: result.ok ? result.data : null, loading: false });
  },
}));
