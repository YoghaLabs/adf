import { studioSdk } from "@/sdk";

export const orchestrationServices = {
  overview: () => studioSdk.workflows.overview(),
  workflows: () => studioSdk.workflows.instances(),
  pipelines: () => studioSdk.pipelines.stages(),
  artifacts: () => studioSdk.artifacts.list(),
  execution: () => studioSdk.execution.view(),
  approvals: () => studioSdk.approvals.list(),
};

export * from "@/features/orchestration/services/orchestrationFixtures";
