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
import {
  filterLogs,
  getDiagnostics,
  getEvents,
  getInspectors,
  getJobs,
  getLogs,
  getMetricSeries,
  getRuntimeMetrics,
  getRuntimeOverview,
  getTimeline,
} from "@/features/runtime/services/runtimeFixtures";
import {
  ACTIVITIES,
  APPROVALS,
  ASSIGNMENTS,
  COLLAB_SESSIONS,
  COMMENT_THREADS,
  getCollaborationOverview,
  INVITATIONS,
  MEMBERS,
  MULTI_AGENT_MODEL,
  NOTIFICATIONS,
  PARTICIPANTS,
  REVIEWS,
} from "@/features/collaboration/services/collaborationFixtures";
import {
  APPROVAL_GATES,
  ARTIFACTS,
  DEPENDENCIES,
  EXECUTION_PLANS,
  getExecutionView,
  getOrchestrationOverview,
  getPipelineMetrics,
  INTEGRATIONS,
  PIPELINE_HISTORY,
  REVIEW_GATES,
  STAGE_ASSIGNMENTS,
  STAGES,
  TRANSITIONS,
  WORKFLOW_INSTANCES,
  WORKFLOW_TEMPLATES,
} from "@/features/orchestration/services/orchestrationFixtures";
import {
  ANALYTICS,
  AUDIT_EVENTS,
  COMPLIANCE_CONTROLS,
  COMPLIANCE_EVIDENCE,
  ENTERPRISE_INTEGRATIONS,
  ENVIRONMENTS,
  getEnterpriseOverview,
  GROUPS,
  IDENTITY_PROVIDERS,
  IDENTITY_SESSIONS,
  LICENSES,
  ORGANIZATIONS,
  ORG_UNITS,
  PERMISSION_MATRIX,
  PERMISSIONS,
  POLICIES,
  ROLES,
  searchAudit,
  TEAMS,
  USERS,
} from "@/features/enterprise/services/enterpriseFixtures";

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
    case "runtimeDashboard.overview":
      return { ok: true, data: getRuntimeOverview() };
    case "runtimeDashboard.jobs": {
      const jobs = getJobs();
      return { ok: true, data: { jobs, count: jobs.length } };
    }
    case "runtimeDashboard.events": {
      const events = getEvents();
      return { ok: true, data: { events, count: events.length } };
    }
    case "runtimeDashboard.inspectors":
      return { ok: true, data: getInspectors() };
    case "metrics.snapshot":
      return { ok: true, data: getRuntimeMetrics() };
    case "metrics.series":
      return { ok: true, data: { points: getMetricSeries() } };
    case "logs.list": {
      const logs = getLogs();
      return { ok: true, data: { logs, count: logs.length } };
    }
    case "logs.filter": {
      const logs = filterLogs(getLogs(), {
        query: String(payload?.query ?? ""),
        severity: String(payload?.severity ?? "all"),
      });
      return { ok: true, data: { logs, count: logs.length } };
    }
    case "diagnostics.snapshot":
      return { ok: true, data: getDiagnostics() };
    case "timeline.list": {
      const events = getTimeline();
      return { ok: true, data: { events, count: events.length } };
    }
    case "timeline.byKind": {
      const events = getTimeline(String(payload?.kind ?? ""));
      return { ok: true, data: { events, count: events.length } };
    }
    case "participants.list":
      return { ok: true, data: { participants: PARTICIPANTS, count: PARTICIPANTS.length } };
    case "participants.get": {
      const participant =
        PARTICIPANTS.find((p) => p.id === payload?.participantId) ?? null;
      return { ok: true, data: { participant } };
    }
    case "collaboration.overview":
      return { ok: true, data: getCollaborationOverview() };
    case "collaboration.members":
      return { ok: true, data: { members: MEMBERS, count: MEMBERS.length } };
    case "collaboration.invitations":
      return { ok: true, data: { invitations: INVITATIONS, count: INVITATIONS.length } };
    case "collaboration.sessions":
      return { ok: true, data: { sessions: COLLAB_SESSIONS, count: COLLAB_SESSIONS.length } };
    case "collaboration.comments":
      return { ok: true, data: { threads: COMMENT_THREADS, count: COMMENT_THREADS.length } };
    case "collaboration.activity":
      return { ok: true, data: { items: ACTIVITIES, count: ACTIVITIES.length } };
    case "collaboration.multiAgentModel":
      return { ok: true, data: { nodes: MULTI_AGENT_MODEL, count: MULTI_AGENT_MODEL.length } };
    case "presence.list": {
      const participants = PARTICIPANTS.filter((p) => p.presence !== "offline");
      return { ok: true, data: { participants, count: participants.length } };
    }
    case "reviews.list":
      return { ok: true, data: { reviews: REVIEWS, count: REVIEWS.length } };
    case "reviews.approvals":
      return { ok: true, data: { approvals: APPROVALS, count: APPROVALS.length } };
    case "notifications.list":
      return { ok: true, data: { notifications: NOTIFICATIONS, count: NOTIFICATIONS.length } };
    case "assignments.list":
      return { ok: true, data: { assignments: ASSIGNMENTS, count: ASSIGNMENTS.length } };
    case "workflows.overview":
      return { ok: true, data: getOrchestrationOverview() };
    case "workflows.instances":
      return { ok: true, data: { instances: WORKFLOW_INSTANCES, count: WORKFLOW_INSTANCES.length } };
    case "workflows.templates":
      return { ok: true, data: { templates: WORKFLOW_TEMPLATES, count: WORKFLOW_TEMPLATES.length } };
    case "workflows.plans":
      return { ok: true, data: { plans: EXECUTION_PLANS, count: EXECUTION_PLANS.length } };
    case "pipelines.stages":
      return { ok: true, data: { stages: STAGES, count: STAGES.length } };
    case "pipelines.metrics":
      return { ok: true, data: getPipelineMetrics() };
    case "pipelines.history":
      return { ok: true, data: { entries: PIPELINE_HISTORY, count: PIPELINE_HISTORY.length } };
    case "pipelines.dependencies":
      return { ok: true, data: { dependencies: DEPENDENCIES, count: DEPENDENCIES.length } };
    case "pipelines.transitions":
      return { ok: true, data: { transitions: TRANSITIONS, count: TRANSITIONS.length } };
    case "pipelines.reviewGates":
      return { ok: true, data: { gates: REVIEW_GATES, count: REVIEW_GATES.length } };
    case "pipelines.assignments":
      return { ok: true, data: { assignments: STAGE_ASSIGNMENTS, count: STAGE_ASSIGNMENTS.length } };
    case "artifacts.list":
      return { ok: true, data: { artifacts: ARTIFACTS, count: ARTIFACTS.length } };
    case "execution.view":
      return { ok: true, data: getExecutionView() };
    case "execution.integrations":
      return { ok: true, data: { integrations: INTEGRATIONS, count: INTEGRATIONS.length } };
    case "approvals.list":
      return { ok: true, data: { gates: APPROVAL_GATES, count: APPROVAL_GATES.length } };
    case "organizations.overview":
      return { ok: true, data: getEnterpriseOverview() };
    case "organizations.list":
      return { ok: true, data: { organizations: ORGANIZATIONS, count: ORGANIZATIONS.length } };
    case "organizations.units":
      return { ok: true, data: { units: ORG_UNITS, count: ORG_UNITS.length } };
    case "organizations.teams":
      return { ok: true, data: { teams: TEAMS, count: TEAMS.length } };
    case "organizations.integrations":
      return {
        ok: true,
        data: { integrations: ENTERPRISE_INTEGRATIONS, count: ENTERPRISE_INTEGRATIONS.length },
      };
    case "organizations.environments":
      return { ok: true, data: { environments: ENVIRONMENTS, count: ENVIRONMENTS.length } };
    case "organizations.policies":
      return { ok: true, data: { policies: POLICIES, count: POLICIES.length } };
    case "identity.users":
      return { ok: true, data: { users: USERS, count: USERS.length } };
    case "identity.groups":
      return { ok: true, data: { groups: GROUPS, count: GROUPS.length } };
    case "identity.providers":
      return { ok: true, data: { providers: IDENTITY_PROVIDERS, count: IDENTITY_PROVIDERS.length } };
    case "identity.sessions":
      return { ok: true, data: { sessions: IDENTITY_SESSIONS, count: IDENTITY_SESSIONS.length } };
    case "roles.list":
      return { ok: true, data: { roles: ROLES, count: ROLES.length } };
    case "permissions.list":
      return { ok: true, data: { permissions: PERMISSIONS, count: PERMISSIONS.length } };
    case "permissions.matrix":
      return { ok: true, data: { matrix: PERMISSION_MATRIX, count: PERMISSION_MATRIX.length } };
    case "audit.list":
      return { ok: true, data: { events: AUDIT_EVENTS, count: AUDIT_EVENTS.length } };
    case "audit.search": {
      const events = searchAudit(String(payload?.query ?? ""));
      return { ok: true, data: { events, count: events.length } };
    }
    case "audit.export":
      return {
        ok: true,
        data: { immutable: true as const, count: AUDIT_EVENTS.length, events: AUDIT_EVENTS },
      };
    case "compliance.controls":
      return { ok: true, data: { controls: COMPLIANCE_CONTROLS, count: COMPLIANCE_CONTROLS.length } };
    case "compliance.evidence":
      return { ok: true, data: { evidence: COMPLIANCE_EVIDENCE, count: COMPLIANCE_EVIDENCE.length } };
    case "licenses.list":
      return { ok: true, data: { licenses: LICENSES, count: LICENSES.length } };
    case "analytics.snapshot":
      return { ok: true, data: ANALYTICS };
    default:
      return { ok: false, data: {}, error: `unknown SDK method: ${method}` };
  }
}
