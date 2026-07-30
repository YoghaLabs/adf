/** Shared Studio types — UI contracts only, no business logic. */

export type ThemeMode = "dark" | "light" | "system";

export type ServiceEnvelope<T = Record<string, unknown>> = {
  ok: boolean;
  data: T;
  error?: string;
  message?: string;
};

export type WorkspaceSummary = {
  repoRoot: string;
  version: string;
  build: string;
  branch: string;
  lockedFolders: Record<string, boolean>;
};

export type ProjectSummary = {
  id: string;
  name: string;
  status: string;
  version: string;
  updatedAt: string;
};

export type RuntimeStatus = {
  packageVersion: string;
  engineBuild: string;
  plugins: number;
  packagesInstalled: number;
  ok: boolean;
};

export type MarketplaceItem = {
  id: string;
  name: string;
  version: string;
  category: string;
  description: string;
  verified: boolean;
  featured: boolean;
};

export type ReleaseChannelInfo = {
  channel: string;
  label: string;
  production: boolean;
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  tone: "info" | "success" | "danger";
  createdAt: string;
};

export type {
  ActivityItem,
  CommandAction,
  ProjectExplorerItem,
  SearchHit,
  SessionSummary,
  SessionTimelineEvent,
  WorkspaceProfile,
  WorkspaceSettingsView,
  WorkspaceStats,
} from "@/features/workspace/types";

export type {
  GraphDocument,
  GraphEdgeModel,
  GraphEdgeType,
  GraphKind,
  GraphNodeModel,
  GraphNodeType,
  GraphSearchHit,
  LayoutMode,
  VisualOverview,
} from "@/features/visual/types";
