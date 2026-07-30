/** Workspace Experience types — presentation contracts only (BUILD-014). */

export type WorkspaceProfile = {
  id: string;
  name: string;
  path: string;
  description: string;
  favorite: boolean;
  projectCount: number;
  sessionCount: number;
  updatedAt: string;
};

export type WorkspaceSettingsView = {
  workspaceId: string;
  language: string;
  channel: string;
  autoResumeSessions: boolean;
  showArchivedProjects: boolean;
};

export type WorkspaceStats = {
  workspaceId: string;
  projects: number;
  sessions: number;
  favorites: number;
  builds: number;
  packages: number;
};

export type ProjectExplorerItem = {
  id: string;
  name: string;
  status: string;
  version: string;
  updatedAt: string;
  workspaceId: string;
  path: string;
  favorite: boolean;
  pinned: boolean;
  archived: boolean;
  parentId?: string | null;
};

export type SessionSummary = {
  id: string;
  title: string;
  projectId: string;
  workspaceId: string;
  status: "active" | "idle" | "closed";
  startedAt: string;
  updatedAt: string;
};

export type SessionTimelineEvent = {
  id: string;
  sessionId: string;
  label: string;
  at: string;
};

export type ActivityItem = {
  id: string;
  kind: "change" | "build" | "package" | "release" | "session";
  title: string;
  detail: string;
  at: string;
  workspaceId?: string;
  projectId?: string;
};

export type SearchHit = {
  id: string;
  kind: "project" | "workspace" | "session" | "package" | "command";
  label: string;
  path?: string;
  meta?: string;
};

export type CommandAction = {
  id: string;
  label: string;
  group: "navigation" | "workspace" | "project" | "session" | "package" | "marketplace";
  path?: string;
  method?: string;
};
