import type { ServiceEnvelope } from "@/types/studio";
import { studioConfig } from "@/config/studio";
import {
  buildSearchHits,
  filterProjects,
  sessionTimeline,
  workspaceFixtureData,
  workspaceSettings,
  workspaceStats,
} from "@/features/workspace/services/workspaceFixtures";
import {
  getGraphDocument,
  getVisualOverview,
  listGraphKinds,
  searchGraphDocs,
} from "@/features/visual/services/graphFixtures";
import type { GraphKind } from "@/features/visual/types";

/** Deterministic fixture envelopes mirroring ServiceResult shapes from adf-core. */
export async function localFixtureProvider(
  method: string,
  payload?: Record<string, unknown>,
): Promise<ServiceEnvelope> {
  const now = new Date().toISOString();
  const { WORKSPACES, PROJECTS, SESSIONS, ACTIVITY, COMMANDS } = workspaceFixtureData();
  const activeId = String(payload?.workspaceId ?? WORKSPACES[0]?.id ?? "ws-adf");

  switch (method) {
    case "runtime.status":
      return {
        ok: true,
        data: {
          packageVersion: studioConfig.version,
          engineBuild: studioConfig.build,
          plugins: 0,
          packagesInstalled: 2,
          ok: true,
        },
      };
    case "runtime.version":
      return {
        ok: true,
        data: { package: "adf-core", version: studioConfig.version },
      };
    case "generator.types":
      return {
        ok: true,
        data: { projectTypes: ["generic", "python", "fastapi", "nextjs", "laravel"] },
      };
    case "packages.listInstalled":
      return {
        ok: true,
        data: {
          count: 2,
          packages: [
            {
              id: "demo-core",
              name: "demo-core",
              version: "1.0.0",
              category: "plugin",
              description: "Demo core plugin",
              verified: true,
              featured: false,
            },
            {
              id: "demo-template",
              name: "demo-template",
              version: "1.1.0",
              category: "template",
              description: "Demo template",
              verified: true,
              featured: true,
            },
          ],
        },
      };
    case "marketplace.browse":
    case "marketplace.search": {
      const q = String(payload?.query ?? "").toLowerCase();
      const items = [
        {
          id: "demo-core",
          name: "demo-core",
          version: "1.0.0",
          category: "plugin",
          description: "Demo core plugin",
          verified: true,
          featured: false,
        },
        {
          id: "demo-template",
          name: "demo-template",
          version: "1.1.0",
          category: "template",
          description: "Demo template package",
          verified: true,
          featured: true,
        },
      ].filter(
        (item) =>
          !q ||
          item.id.includes(q) ||
          item.name.includes(q) ||
          item.description.toLowerCase().includes(q),
      );
      return { ok: true, data: { items, count: items.length } };
    }
    case "marketplace.featured":
      return {
        ok: true,
        data: {
          title: "Featured",
          items: [
            {
              id: "demo-template",
              name: "demo-template",
              version: "1.1.0",
              category: "template",
              description: "Demo template package",
              verified: true,
              featured: true,
            },
          ],
        },
      };
    case "marketplace.categories":
      return {
        ok: true,
        data: {
          categories: [
            { id: "plugin", label: "Plugin", count: 1 },
            { id: "template", label: "Template", count: 1 },
          ],
        },
      };
    case "registry.status":
      return {
        ok: true,
        data: { registry_root: "release/apm-registry", packages: 2 },
      };
    case "registry.providers":
      return {
        ok: true,
        data: {
          providers: [
            { name: "local", kind: "local", enabled: true },
            { name: "github", kind: "github", enabled: false },
            { name: "gitlab", kind: "gitlab", enabled: false },
            { name: "enterprise", kind: "enterprise", enabled: false },
            { name: "cloud", kind: "cloud", enabled: false },
          ],
        },
      };
    case "release.channels":
      return {
        ok: true,
        data: {
          channels: [
            { channel: "development", label: "Development", production: false },
            { channel: "alpha", label: "Alpha", production: false },
            { channel: "beta", label: "Beta", production: false },
            { channel: "rc", label: "Release Candidate", production: false },
            { channel: "stable", label: "Stable", production: true },
            { channel: "lts", label: "LTS", production: true },
          ],
        },
      };
    case "release.list":
      return { ok: true, data: { releases: [], count: 0 } };
    case "workspace.describe": {
      const ws = WORKSPACES.find((w) => w.id === activeId) ?? WORKSPACES[0];
      return {
        ok: true,
        data: {
          repoRoot: ws?.path ?? "/projects/adf",
          version: studioConfig.version,
          build: studioConfig.build,
          branch: "develop",
          lockedFolders: {
            ".adf": true,
            "adf-core": true,
            "adf-studio": true,
            "adf-docs": true,
          },
        },
      };
    }
    case "workspace.readiness":
      return { ok: true, data: { ready: true, checkedAt: now } };
    case "workspace.list":
      return { ok: true, data: { workspaces: WORKSPACES, count: WORKSPACES.length } };
    case "workspace.switch": {
      const profile = WORKSPACES.find((w) => w.id === payload?.workspaceId) ?? WORKSPACES[0];
      return { ok: true, data: { activeId: profile.id, profile } };
    }
    case "workspace.profile": {
      const profile = WORKSPACES.find((w) => w.id === activeId) ?? WORKSPACES[0];
      return { ok: true, data: profile };
    }
    case "workspace.settings":
      return { ok: true, data: workspaceSettings(activeId) };
    case "workspace.stats":
      return { ok: true, data: workspaceStats(activeId) };
    case "workspace.activity": {
      const items = ACTIVITY.filter((a) => !payload?.workspaceId || a.workspaceId === payload.workspaceId);
      return { ok: true, data: { items, count: items.length } };
    }
    case "workspace.favorites": {
      const projects = filterProjects(activeId, { favorite: true });
      return { ok: true, data: { projects, count: projects.length } };
    }
    case "workspace.search": {
      const hits = buildSearchHits(String(payload?.query ?? ""), "global").filter(
        (h) => h.kind === "project" || h.kind === "workspace" || h.kind === "session",
      );
      return { ok: true, data: { hits, count: hits.length } };
    }
    case "projects.list": {
      const projects = filterProjects(undefined, { archived: false }).map((p) => ({
        id: p.id,
        name: p.name,
        status: p.status,
        version: p.version,
        updatedAt: p.updatedAt,
      }));
      return { ok: true, data: { projects, count: projects.length } };
    }
    case "projects.info":
      return {
        ok: true,
        data: {
          repo_root: "/projects/adf",
          version_file: studioConfig.version,
        },
      };
    case "projects.explorer":
    case "projects.tree": {
      const projects = filterProjects(payload?.workspaceId ? String(payload.workspaceId) : undefined);
      return { ok: true, data: { projects, tree: projects, count: projects.length } };
    }
    case "projects.favorites": {
      const projects = filterProjects(
        payload?.workspaceId ? String(payload.workspaceId) : undefined,
        { favorite: true },
      );
      return { ok: true, data: { projects, count: projects.length } };
    }
    case "projects.pinned": {
      const projects = filterProjects(
        payload?.workspaceId ? String(payload.workspaceId) : undefined,
        { pinned: true },
      );
      return { ok: true, data: { projects, count: projects.length } };
    }
    case "projects.archived": {
      const projects = filterProjects(
        payload?.workspaceId ? String(payload.workspaceId) : undefined,
        { archived: true },
      );
      return { ok: true, data: { projects, count: projects.length } };
    }
    case "projects.recent": {
      const projects = [...filterProjects(payload?.workspaceId ? String(payload.workspaceId) : undefined)]
        .filter((p) => !p.archived)
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .slice(0, 5);
      return { ok: true, data: { projects, count: projects.length } };
    }
    case "sessions.list":
    case "sessions.history": {
      const sessions = SESSIONS.filter(
        (s) => !payload?.workspaceId || s.workspaceId === payload.workspaceId,
      );
      return { ok: true, data: { sessions, count: sessions.length } };
    }
    case "sessions.current": {
      const session = SESSIONS.find((s) => s.status === "active") ?? null;
      return { ok: true, data: { session } };
    }
    case "sessions.recent": {
      const sessions = [...SESSIONS]
        .filter((s) => !payload?.workspaceId || s.workspaceId === payload.workspaceId)
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .slice(0, 5);
      return { ok: true, data: { sessions, count: sessions.length } };
    }
    case "sessions.resume": {
      const session = SESSIONS.find((s) => s.id === payload?.sessionId);
      if (!session) return { ok: false, data: {}, error: "session not found" };
      return { ok: true, data: { session: { ...session, status: "active", updatedAt: now } } };
    }
    case "sessions.close": {
      const session = SESSIONS.find((s) => s.id === payload?.sessionId);
      if (!session) return { ok: false, data: {}, error: "session not found" };
      return { ok: true, data: { session: { ...session, status: "closed", updatedAt: now } } };
    }
    case "sessions.timeline": {
      const events = sessionTimeline(String(payload?.sessionId ?? "sess-001"));
      return { ok: true, data: { events, count: events.length } };
    }
    case "search.global": {
      const hits = buildSearchHits(String(payload?.query ?? ""), "global");
      return { ok: true, data: { hits, count: hits.length } };
    }
    case "search.projects": {
      const hits = buildSearchHits(String(payload?.query ?? ""), "project");
      return { ok: true, data: { hits, count: hits.length } };
    }
    case "search.workspace": {
      const hits = buildSearchHits(String(payload?.query ?? ""), "workspace");
      return { ok: true, data: { hits, count: hits.length } };
    }
    case "search.commands": {
      const q = String(payload?.query ?? "").toLowerCase();
      const actions = COMMANDS.filter(
        (c) => !q || c.label.toLowerCase().includes(q) || c.id.includes(q),
      );
      const hits = buildSearchHits(String(payload?.query ?? ""), "command");
      return { ok: true, data: { hits, count: hits.length, actions } };
    }
    case "search.packages": {
      const hits = buildSearchHits(String(payload?.query ?? ""), "package");
      return { ok: true, data: { hits, count: hits.length } };
    }
    case "activity.feed": {
      const items = ACTIVITY.filter(
        (a) => !payload?.workspaceId || a.workspaceId === payload.workspaceId,
      );
      return { ok: true, data: { items, count: items.length } };
    }
    case "activity.recent": {
      const items = ACTIVITY.filter((a) => !payload?.kind || a.kind === payload.kind).slice(0, 10);
      return { ok: true, data: { items, count: items.length } };
    }
    case "knowledge.graph":
      return { ok: true, data: getGraphDocument("knowledge") };
    case "dependency.graph":
      return { ok: true, data: getGraphDocument("dependency") };
    case "graph.get": {
      const kind = String(payload?.kind ?? "knowledge") as GraphKind;
      return { ok: true, data: getGraphDocument(kind) };
    }
    case "graph.list": {
      const graphs = listGraphKinds();
      return { ok: true, data: { graphs, count: graphs.length } };
    }
    case "visualization.overview":
      return { ok: true, data: getVisualOverview() };
    case "visualization.search": {
      const hits = searchGraphDocs(
        String(payload?.query ?? ""),
        (payload?.scope as "node" | "edge" | "relationship" | "all") ?? "all",
      );
      return { ok: true, data: { hits, count: hits.length } };
    }
    default:
      return { ok: false, data: {}, error: `unknown SDK method: ${method}` };
  }
}
