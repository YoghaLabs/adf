import type {
  BackgroundJob,
  InspectorItem,
  LogEntry,
  MetricSeriesPoint,
  RuntimeDiagnostics,
  RuntimeEvent,
  RuntimeMetrics,
  RuntimeOverview,
  TimelineEvent,
} from "@/features/runtime/types";
import { studioConfig } from "@/config/studio";

export function getRuntimeOverview(): RuntimeOverview {
  return {
    engineStatus: "healthy",
    engineBuild: studioConfig.build,
    packageVersion: studioConfig.version,
    currentSessionId: "sess-001",
    currentSessionTitle: "BUILD-016 observability",
    activeWorkspaceId: "ws-adf",
    activeWorkspaceName: "ADF Platform",
    currentProjectId: "adf",
    currentProjectName: "ADF",
    live: true,
    updatedAt: new Date().toISOString(),
  };
}

export function getRuntimeMetrics(): RuntimeMetrics {
  return {
    tokenBudget: 128000,
    tokenUsed: 18420,
    promptCount: 42,
    contextSize: 96,
    memoryUsageMb: 312,
    pluginCount: 3,
    packageCount: 2,
    knowledgeCount: 8,
    executionTimeMs: 1240,
    queueSize: 2,
  };
}

export function getMetricSeries(): MetricSeriesPoint[] {
  return [
    { label: "t-5", value: 12 },
    { label: "t-4", value: 18 },
    { label: "t-3", value: 15 },
    { label: "t-2", value: 24 },
    { label: "t-1", value: 21 },
    { label: "now", value: 28 },
  ];
}

export function getLogs(): LogEntry[] {
  return [
    {
      id: "log-1",
      severity: "info",
      source: "runtime",
      message: "RuntimeEngine ready",
      at: "2026-07-30T08:00:01.000Z",
    },
    {
      id: "log-2",
      severity: "info",
      source: "session",
      message: "Session sess-001 resumed",
      at: "2026-07-30T08:01:12.000Z",
    },
    {
      id: "log-3",
      severity: "debug",
      source: "context",
      message: "Loaded context pack: resume",
      at: "2026-07-30T08:01:13.000Z",
    },
    {
      id: "log-4",
      severity: "warn",
      source: "plugin",
      message: "Plugin demo-plugin slow init (240ms)",
      at: "2026-07-30T08:01:20.000Z",
    },
    {
      id: "log-5",
      severity: "info",
      source: "package",
      message: "Package demo-core verified",
      at: "2026-07-30T08:02:00.000Z",
    },
    {
      id: "log-6",
      severity: "error",
      source: "queue",
      message: "Job job-retry-1 failed once; queued for retry",
      at: "2026-07-30T08:05:00.000Z",
    },
    {
      id: "log-7",
      severity: "info",
      source: "prompt",
      message: "Prompt execution completed (820ms)",
      at: "2026-07-30T08:06:10.000Z",
    },
    {
      id: "log-8",
      severity: "debug",
      source: "sdk",
      message: "MetricsClient.snapshot envelope ok",
      at: "2026-07-30T08:06:11.000Z",
    },
  ];
}

export function getTimeline(kind?: string): TimelineEvent[] {
  const all: TimelineEvent[] = [
    {
      id: "tl-1",
      kind: "runtime",
      title: "Engine started",
      detail: "RuntimeEngine healthy",
      at: "2026-07-30T08:00:00.000Z",
    },
    {
      id: "tl-2",
      kind: "session",
      title: "Session opened",
      detail: "sess-001",
      at: "2026-07-30T08:01:00.000Z",
    },
    {
      id: "tl-3",
      kind: "context",
      title: "Context loaded",
      detail: "resume + ADR pack",
      at: "2026-07-30T08:01:13.000Z",
    },
    {
      id: "tl-4",
      kind: "prompt",
      title: "Prompt executed",
      detail: "runtime-dashboard.md",
      at: "2026-07-30T08:06:10.000Z",
    },
    {
      id: "tl-5",
      kind: "event",
      title: "Package verified",
      detail: "demo-core",
      at: "2026-07-30T08:02:00.000Z",
    },
    {
      id: "tl-6",
      kind: "prompt",
      title: "Prompt queued",
      detail: "timeline.md",
      at: "2026-07-30T08:07:00.000Z",
    },
  ];
  if (!kind) return all;
  return all.filter((e) => e.kind === kind);
}

export function getEvents(): RuntimeEvent[] {
  return [
    {
      id: "ev-1",
      category: "runtime",
      name: "engine.ready",
      detail: "healthy",
      at: "2026-07-30T08:00:00.000Z",
    },
    {
      id: "ev-2",
      category: "session",
      name: "session.resume",
      detail: "sess-001",
      at: "2026-07-30T08:01:00.000Z",
    },
    {
      id: "ev-3",
      category: "plugin",
      name: "plugin.loaded",
      detail: "demo-plugin",
      at: "2026-07-30T08:01:20.000Z",
    },
    {
      id: "ev-4",
      category: "package",
      name: "package.verified",
      detail: "demo-core",
      at: "2026-07-30T08:02:00.000Z",
    },
    {
      id: "ev-5",
      category: "runtime",
      name: "job.retry",
      detail: "job-retry-1",
      at: "2026-07-30T08:05:00.000Z",
    },
  ];
}

export function getJobs(): BackgroundJob[] {
  return [
    {
      id: "job-1",
      name: "Context restore",
      status: "running",
      progress: 64,
      startedAt: "2026-07-30T08:06:00.000Z",
    },
    {
      id: "job-2",
      name: "Package verify",
      status: "queued",
      progress: 0,
      startedAt: "2026-07-30T08:06:30.000Z",
    },
    {
      id: "job-3",
      name: "Knowledge index",
      status: "completed",
      progress: 100,
      startedAt: "2026-07-30T07:50:00.000Z",
      finishedAt: "2026-07-30T07:51:00.000Z",
    },
    {
      id: "job-retry-1",
      name: "Offline sync",
      status: "retry",
      progress: 10,
      startedAt: "2026-07-30T08:04:00.000Z",
    },
    {
      id: "job-4",
      name: "Template scan",
      status: "failed",
      progress: 40,
      startedAt: "2026-07-30T07:40:00.000Z",
      finishedAt: "2026-07-30T07:41:00.000Z",
    },
  ];
}

export function getInspectors(): Record<string, InspectorItem[]> {
  return {
    plugins: [
      { id: "plug-a", label: "demo-plugin", status: "loaded", meta: "240ms" },
      { id: "plug-b", label: "audit-hook", status: "loaded", meta: "12ms" },
      { id: "plug-c", label: "telemetry", status: "idle", meta: "optional" },
    ],
    packages: [
      { id: "demo-core", label: "demo-core", status: "verified", meta: "1.0.0" },
      { id: "demo-template", label: "demo-template", status: "installed", meta: "1.1.0" },
    ],
    knowledge: [
      { id: "k-adr", label: "ADR Index", status: "active" },
      { id: "k-ctx", label: "Context Pack", status: "active" },
      { id: "k-mem", label: "Memory", status: "warm" },
    ],
    context: [
      { id: "ctx-boot", label: "Boot Pack", status: "loaded", meta: "12kb" },
      { id: "ctx-resume", label: "Resume Pack", status: "loaded", meta: "48kb" },
    ],
    session: [
      { id: "sess-001", label: "BUILD-016 observability", status: "active", meta: "adf" },
      { id: "sess-002", label: "Resume review", status: "idle", meta: "adf" },
    ],
  };
}

export function getDiagnostics(): RuntimeDiagnostics {
  return {
    runtime: {
      ok: true,
      checks: [
        { name: "engine", ok: true, detail: "healthy" },
        { name: "plugins", ok: true, detail: "3 loaded" },
        { name: "queue", ok: true, detail: "2 pending" },
      ],
    },
    sdk: {
      ok: true,
      bridge: "fixture",
      clients: [
        "RuntimeDashboardClient",
        "MetricsClient",
        "LogsClient",
        "DiagnosticsClient",
        "TimelineClient",
      ],
    },
    environment: {
      node: ">=18",
      platform: "win32",
      cwd: "/projects/adf",
    },
    configuration: {
      channel: "alpha",
      registry: "local",
      theme: "system",
    },
  };
}

export function filterLogs(
  logs: LogEntry[],
  opts: { query?: string; severity?: string },
): LogEntry[] {
  const q = (opts.query ?? "").trim().toLowerCase();
  return logs.filter((log) => {
    if (opts.severity && opts.severity !== "all" && log.severity !== opts.severity) return false;
    if (
      q &&
      !log.message.toLowerCase().includes(q) &&
      !log.source.toLowerCase().includes(q) &&
      !log.id.includes(q)
    ) {
      return false;
    }
    return true;
  });
}
