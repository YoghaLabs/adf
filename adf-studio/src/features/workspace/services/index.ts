import { studioSdk } from "@/sdk";

/** Thin service facades — no domain rules. */
export const workspaceServices = {
  list: () => studioSdk.workspace.list(),
  switchTo: (id: string) => studioSdk.workspace.switchTo(id),
  profile: (id?: string) => studioSdk.workspace.profile(id),
  stats: (id?: string) => studioSdk.workspace.stats(id),
};

export const projectServices = {
  explorer: (workspaceId?: string) => studioSdk.projects.explorer(workspaceId),
  recent: (workspaceId?: string) => studioSdk.projects.recent(workspaceId),
};

export const sessionServices = {
  list: (workspaceId?: string) => studioSdk.sessions.list(workspaceId),
  resume: (sessionId: string) => studioSdk.sessions.resume(sessionId),
  close: (sessionId: string) => studioSdk.sessions.close(sessionId),
};

export const searchServices = {
  global: (query: string) => studioSdk.search.global(query),
  commands: (query: string) => studioSdk.search.commands(query),
};

export const activityServices = {
  feed: (workspaceId?: string) => studioSdk.activity.feed(workspaceId),
};
