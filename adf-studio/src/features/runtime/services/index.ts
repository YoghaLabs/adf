import { studioSdk } from "@/sdk";

export const runtimeServices = {
  overview: () => studioSdk.runtimeDashboard.overview(),
  metrics: () => studioSdk.metrics.snapshot(),
  logs: () => studioSdk.logs.list(),
  diagnostics: () => studioSdk.diagnostics.snapshot(),
  timeline: () => studioSdk.timeline.list(),
};
