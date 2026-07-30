/** Runtime Dashboard types — presentation contracts only (BUILD-016). */

export type HealthLevel = "healthy" | "degraded" | "critical" | "unknown";

export type LogSeverity = "debug" | "info" | "warn" | "error";

export type TimelineKind = "prompt" | "context" | "session" | "event" | "runtime";

export type JobStatus = "queued" | "running" | "completed" | "failed" | "retry";

export type RuntimeOverview = {
  engineStatus: HealthLevel;
  engineBuild: string;
  packageVersion: string;
  currentSessionId: string | null;
  currentSessionTitle: string | null;
  activeWorkspaceId: string | null;
  activeWorkspaceName: string | null;
  currentProjectId: string | null;
  currentProjectName: string | null;
  live: boolean;
  updatedAt: string;
};

export type RuntimeMetrics = {
  tokenBudget: number;
  tokenUsed: number;
  promptCount: number;
  contextSize: number;
  memoryUsageMb: number;
  pluginCount: number;
  packageCount: number;
  knowledgeCount: number;
  executionTimeMs: number;
  queueSize: number;
};

export type LogEntry = {
  id: string;
  severity: LogSeverity;
  source: string;
  message: string;
  at: string;
};

export type TimelineEvent = {
  id: string;
  kind: TimelineKind;
  title: string;
  detail: string;
  at: string;
};

export type RuntimeEvent = {
  id: string;
  category: "runtime" | "plugin" | "package" | "session";
  name: string;
  detail: string;
  at: string;
};

export type BackgroundJob = {
  id: string;
  name: string;
  status: JobStatus;
  progress: number;
  startedAt: string;
  finishedAt?: string;
};

export type InspectorItem = {
  id: string;
  label: string;
  status: string;
  meta?: string;
};

export type RuntimeDiagnostics = {
  runtime: { ok: boolean; checks: { name: string; ok: boolean; detail: string }[] };
  sdk: { ok: boolean; bridge: string; clients: string[] };
  environment: { node: string; platform: string; cwd: string };
  configuration: { channel: string; registry: string; theme: string };
};

export type MetricSeriesPoint = {
  label: string;
  value: number;
};
