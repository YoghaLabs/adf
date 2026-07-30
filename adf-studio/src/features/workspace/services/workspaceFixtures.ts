import type {
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
import { studioConfig } from "@/config/studio";

const WORKSPACES: WorkspaceProfile[] = [
  {
    id: "ws-adf",
    name: "ADF Platform",
    path: "/projects/adf",
    description: "Primary ADF monorepo control workspace",
    favorite: true,
    projectCount: 3,
    sessionCount: 2,
    updatedAt: "2026-07-30T08:00:00.000Z",
  },
  {
    id: "ws-labs",
    name: "YoghaLabs Sandbox",
    path: "/projects/yoghalabs",
    description: "Experiments and package prototypes",
    favorite: false,
    projectCount: 2,
    sessionCount: 1,
    updatedAt: "2026-07-29T16:00:00.000Z",
  },
];

const PROJECTS: ProjectExplorerItem[] = [
  {
    id: "adf",
    name: "ADF",
    status: "active",
    version: studioConfig.version,
    updatedAt: "2026-07-30T10:00:00.000Z",
    workspaceId: "ws-adf",
    path: "/projects/adf",
    favorite: true,
    pinned: true,
    archived: false,
  },
  {
    id: "adf-studio-ui",
    name: "ADF Studio UI",
    status: "active",
    version: studioConfig.version,
    updatedAt: "2026-07-30T09:30:00.000Z",
    workspaceId: "ws-adf",
    path: "/projects/adf/adf-studio",
    favorite: true,
    pinned: false,
    archived: false,
  },
  {
    id: "demo-pack",
    name: "Demo Pack",
    status: "idle",
    version: "0.1.0",
    updatedAt: "2026-07-28T12:00:00.000Z",
    workspaceId: "ws-adf",
    path: "/projects/adf/adf-examples",
    favorite: false,
    pinned: false,
    archived: false,
  },
  {
    id: "sandbox-a",
    name: "Sandbox A",
    status: "active",
    version: "0.0.1",
    updatedAt: "2026-07-27T09:00:00.000Z",
    workspaceId: "ws-labs",
    path: "/projects/yoghalabs/a",
    favorite: false,
    pinned: true,
    archived: false,
  },
  {
    id: "legacy-proto",
    name: "Legacy Proto",
    status: "archived",
    version: "0.0.0",
    updatedAt: "2026-06-01T09:00:00.000Z",
    workspaceId: "ws-labs",
    path: "/projects/yoghalabs/legacy",
    favorite: false,
    pinned: false,
    archived: true,
  },
];

const SESSIONS: SessionSummary[] = [
  {
    id: "sess-001",
    title: "BUILD-014 workspace experience",
    projectId: "adf",
    workspaceId: "ws-adf",
    status: "active",
    startedAt: "2026-07-30T06:00:00.000Z",
    updatedAt: "2026-07-30T12:00:00.000Z",
  },
  {
    id: "sess-002",
    title: "Resume protocol review",
    projectId: "adf",
    workspaceId: "ws-adf",
    status: "idle",
    startedAt: "2026-07-29T14:00:00.000Z",
    updatedAt: "2026-07-29T18:00:00.000Z",
  },
  {
    id: "sess-003",
    title: "Sandbox spike",
    projectId: "sandbox-a",
    workspaceId: "ws-labs",
    status: "closed",
    startedAt: "2026-07-20T10:00:00.000Z",
    updatedAt: "2026-07-20T15:00:00.000Z",
  },
];

const ACTIVITY: ActivityItem[] = [
  {
    id: "act-1",
    kind: "build",
    title: "BUILD-013 finalize",
    detail: "Studio core shipped",
    at: "2026-07-30T05:00:00.000Z",
    workspaceId: "ws-adf",
    projectId: "adf",
  },
  {
    id: "act-2",
    kind: "change",
    title: "Workspace feature scaffold",
    detail: "features/workspace/*",
    at: "2026-07-30T11:00:00.000Z",
    workspaceId: "ws-adf",
    projectId: "adf-studio-ui",
  },
  {
    id: "act-3",
    kind: "package",
    title: "demo-template update",
    detail: "1.1.0 available",
    at: "2026-07-29T20:00:00.000Z",
    workspaceId: "ws-adf",
  },
  {
    id: "act-4",
    kind: "release",
    title: "Channel alpha",
    detail: "0.13.0-alpha published locally",
    at: "2026-07-30T05:10:00.000Z",
    workspaceId: "ws-adf",
  },
  {
    id: "act-5",
    kind: "session",
    title: "Session resumed",
    detail: "sess-002",
    at: "2026-07-29T18:00:00.000Z",
    workspaceId: "ws-adf",
    projectId: "adf",
  },
];

const COMMANDS: CommandAction[] = [
  { id: "cmd-open-project", label: "Open Project", group: "project", path: "/projects" },
  { id: "cmd-switch-ws", label: "Switch Workspace", group: "workspace", path: "/workspace" },
  { id: "cmd-resume", label: "Resume Session", group: "session", path: "/sessions" },
  { id: "cmd-install", label: "Install Package", group: "package", path: "/packages" },
  { id: "cmd-market", label: "Marketplace Search", group: "marketplace", path: "/marketplace" },
  { id: "cmd-dash", label: "Go to Dashboard", group: "navigation", path: "/" },
  { id: "cmd-settings", label: "Open Settings", group: "navigation", path: "/settings" },
];

export function workspaceFixtureData() {
  return { WORKSPACES, PROJECTS, SESSIONS, ACTIVITY, COMMANDS };
}

export function filterProjects(
  workspaceId?: string,
  opts?: { favorite?: boolean; pinned?: boolean; archived?: boolean },
) {
  return PROJECTS.filter((p) => {
    if (workspaceId && p.workspaceId !== workspaceId) return false;
    if (opts?.favorite !== undefined && p.favorite !== opts.favorite) return false;
    if (opts?.pinned !== undefined && p.pinned !== opts.pinned) return false;
    if (opts?.archived !== undefined && p.archived !== opts.archived) return false;
    return true;
  });
}

export function buildSearchHits(query: string, scope?: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  const hits: SearchHit[] = [];

  if (!scope || scope === "workspace" || scope === "global") {
    for (const w of WORKSPACES) {
      if (!q || w.name.toLowerCase().includes(q) || w.id.includes(q)) {
        hits.push({
          id: `ws:${w.id}`,
          kind: "workspace",
          label: w.name,
          path: "/workspace",
          meta: w.path,
        });
      }
    }
  }

  if (!scope || scope === "project" || scope === "global") {
    for (const p of PROJECTS) {
      if (!q || p.name.toLowerCase().includes(q) || p.id.includes(q)) {
        hits.push({
          id: `proj:${p.id}`,
          kind: "project",
          label: p.name,
          path: "/projects",
          meta: p.status,
        });
      }
    }
  }

  if (!scope || scope === "session" || scope === "global") {
    for (const s of SESSIONS) {
      if (!q || s.title.toLowerCase().includes(q) || s.id.includes(q)) {
        hits.push({
          id: `sess:${s.id}`,
          kind: "session",
          label: s.title,
          path: "/sessions",
          meta: s.status,
        });
      }
    }
  }

  if (!scope || scope === "command" || scope === "global") {
    for (const c of COMMANDS) {
      if (!q || c.label.toLowerCase().includes(q) || c.id.includes(q)) {
        hits.push({
          id: `cmd:${c.id}`,
          kind: "command",
          label: c.label,
          path: c.path,
          meta: c.group,
        });
      }
    }
  }

  if (!scope || scope === "package" || scope === "global") {
    const packages = [
      { id: "demo-core", name: "demo-core", version: "1.0.0" },
      { id: "demo-template", name: "demo-template", version: "1.1.0" },
    ];
    for (const pkg of packages) {
      if (!q || pkg.name.includes(q)) {
        hits.push({
          id: `pkg:${pkg.id}`,
          kind: "package",
          label: pkg.name,
          path: "/packages",
          meta: pkg.version,
        });
      }
    }
  }

  return hits;
}

export function sessionTimeline(sessionId: string): SessionTimelineEvent[] {
  return [
    {
      id: `${sessionId}-t1`,
      sessionId,
      label: "Session opened",
      at: "2026-07-30T06:00:00.000Z",
    },
    {
      id: `${sessionId}-t2`,
      sessionId,
      label: "Context restored",
      at: "2026-07-30T06:01:00.000Z",
    },
    {
      id: `${sessionId}-t3`,
      sessionId,
      label: "Workspace overview loaded",
      at: "2026-07-30T06:05:00.000Z",
    },
  ];
}

export function workspaceStats(workspaceId: string): WorkspaceStats {
  const projects = filterProjects(workspaceId);
  const sessions = SESSIONS.filter((s) => s.workspaceId === workspaceId);
  return {
    workspaceId,
    projects: projects.filter((p) => !p.archived).length,
    sessions: sessions.length,
    favorites: projects.filter((p) => p.favorite).length,
    builds: ACTIVITY.filter((a) => a.workspaceId === workspaceId && a.kind === "build").length,
    packages: 2,
  };
}

export function workspaceSettings(workspaceId: string): WorkspaceSettingsView {
  return {
    workspaceId,
    language: "en",
    channel: "alpha",
    autoResumeSessions: true,
    showArchivedProjects: false,
  };
}
