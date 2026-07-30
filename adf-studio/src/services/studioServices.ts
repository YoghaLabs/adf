import { studioSdk } from "@/sdk";

/** Service adapters for features — thin SDK wrappers for UI modules. */
export const studioServices = {
  runtime: () => studioSdk.runtime,
  marketplace: () => studioSdk.marketplace,
  packages: () => studioSdk.packages,
  registry: () => studioSdk.registry,
  release: () => studioSdk.release,
  workspace: () => studioSdk.workspace,
  projects: () => studioSdk.projects,
  sessions: () => studioSdk.sessions,
  search: () => studioSdk.search,
  activity: () => studioSdk.activity,
};
