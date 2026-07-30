/**
 * Studio SDK adapters — TypeScript facades over ADF Core SDK clients.
 *
 * Studio MUST NOT contain business logic. These adapters only ferry
 * requests to the Python Service Layer via a bridge (CLI/SDK invoke).
 */

import type {
  ActivityItem,
  CommandAction,
  GraphDocument,
  GraphKind,
  GraphSearchHit,
  MarketplaceItem,
  ProjectExplorerItem,
  ProjectSummary,
  ReleaseChannelInfo,
  RuntimeStatus,
  SearchHit,
  ServiceEnvelope,
  SessionSummary,
  SessionTimelineEvent,
  VisualOverview,
  WorkspaceProfile,
  WorkspaceSettingsView,
  WorkspaceStats,
  WorkspaceSummary,
} from "@/types/studio";
import { studioBridge } from "@/sdk/bridge";

export class RuntimeClient {
  status(): Promise<ServiceEnvelope<RuntimeStatus>> {
    return studioBridge.invoke("runtime.status");
  }

  version(): Promise<ServiceEnvelope<{ package: string; version: string }>> {
    return studioBridge.invoke("runtime.version");
  }
}

export class GeneratorClient {
  listTypes(): Promise<ServiceEnvelope<{ projectTypes: string[] }>> {
    return studioBridge.invoke("generator.types");
  }
}

export class PackageClient {
  listInstalled(): Promise<ServiceEnvelope<{ packages: MarketplaceItem[]; count: number }>> {
    return studioBridge.invoke("packages.listInstalled");
  }
}

export class MarketplaceClient {
  browse(): Promise<ServiceEnvelope<{ items: MarketplaceItem[]; count: number }>> {
    return studioBridge.invoke("marketplace.browse");
  }

  search(query: string): Promise<ServiceEnvelope<{ items: MarketplaceItem[]; count: number }>> {
    return studioBridge.invoke("marketplace.search", { query });
  }

  featured(): Promise<ServiceEnvelope<{ title: string; items: MarketplaceItem[] }>> {
    return studioBridge.invoke("marketplace.featured");
  }

  categories(): Promise<ServiceEnvelope<{ categories: { id: string; label: string; count: number }[] }>> {
    return studioBridge.invoke("marketplace.categories");
  }
}

export class RegistryClient {
  status(): Promise<ServiceEnvelope<Record<string, unknown>>> {
    return studioBridge.invoke("registry.status");
  }

  providers(): Promise<ServiceEnvelope<{ providers: { name: string; kind: string; enabled: boolean }[] }>> {
    return studioBridge.invoke("registry.providers");
  }
}

export class ReleaseClient {
  channels(): Promise<ServiceEnvelope<{ channels: ReleaseChannelInfo[] }>> {
    return studioBridge.invoke("release.channels");
  }

  list(): Promise<ServiceEnvelope<{ releases: { version: string; channel: string; published: boolean }[]; count: number }>> {
    return studioBridge.invoke("release.list");
  }
}

export class WorkspaceClient {
  describe(): Promise<ServiceEnvelope<WorkspaceSummary>> {
    return studioBridge.invoke("workspace.describe");
  }

  readiness(): Promise<ServiceEnvelope<Record<string, unknown>>> {
    return studioBridge.invoke("workspace.readiness");
  }

  list(): Promise<ServiceEnvelope<{ workspaces: WorkspaceProfile[]; count: number }>> {
    return studioBridge.invoke("workspace.list");
  }

  switchTo(workspaceId: string): Promise<ServiceEnvelope<{ activeId: string; profile: WorkspaceProfile }>> {
    return studioBridge.invoke("workspace.switch", { workspaceId });
  }

  profile(workspaceId?: string): Promise<ServiceEnvelope<WorkspaceProfile>> {
    return studioBridge.invoke("workspace.profile", workspaceId ? { workspaceId } : undefined);
  }

  settings(workspaceId?: string): Promise<ServiceEnvelope<WorkspaceSettingsView>> {
    return studioBridge.invoke("workspace.settings", workspaceId ? { workspaceId } : undefined);
  }

  stats(workspaceId?: string): Promise<ServiceEnvelope<WorkspaceStats>> {
    return studioBridge.invoke("workspace.stats", workspaceId ? { workspaceId } : undefined);
  }

  activity(workspaceId?: string): Promise<ServiceEnvelope<{ items: ActivityItem[]; count: number }>> {
    return studioBridge.invoke("workspace.activity", workspaceId ? { workspaceId } : undefined);
  }

  favorites(workspaceId?: string): Promise<ServiceEnvelope<{ projects: ProjectExplorerItem[]; count: number }>> {
    return studioBridge.invoke("workspace.favorites", workspaceId ? { workspaceId } : undefined);
  }

  search(query: string, workspaceId?: string): Promise<ServiceEnvelope<{ hits: SearchHit[]; count: number }>> {
    return studioBridge.invoke("workspace.search", { query, workspaceId });
  }
}

export class ProjectClient {
  list(): Promise<ServiceEnvelope<{ projects: ProjectSummary[]; count: number }>> {
    return studioBridge.invoke("projects.list");
  }

  info(): Promise<ServiceEnvelope<Record<string, unknown>>> {
    return studioBridge.invoke("projects.info");
  }

  explorer(workspaceId?: string): Promise<ServiceEnvelope<{ projects: ProjectExplorerItem[]; count: number }>> {
    return studioBridge.invoke("projects.explorer", workspaceId ? { workspaceId } : undefined);
  }

  tree(workspaceId?: string): Promise<ServiceEnvelope<{ tree: ProjectExplorerItem[]; count: number }>> {
    return studioBridge.invoke("projects.tree", workspaceId ? { workspaceId } : undefined);
  }

  favorites(workspaceId?: string): Promise<ServiceEnvelope<{ projects: ProjectExplorerItem[]; count: number }>> {
    return studioBridge.invoke("projects.favorites", workspaceId ? { workspaceId } : undefined);
  }

  pinned(workspaceId?: string): Promise<ServiceEnvelope<{ projects: ProjectExplorerItem[]; count: number }>> {
    return studioBridge.invoke("projects.pinned", workspaceId ? { workspaceId } : undefined);
  }

  archived(workspaceId?: string): Promise<ServiceEnvelope<{ projects: ProjectExplorerItem[]; count: number }>> {
    return studioBridge.invoke("projects.archived", workspaceId ? { workspaceId } : undefined);
  }

  recent(workspaceId?: string): Promise<ServiceEnvelope<{ projects: ProjectExplorerItem[]; count: number }>> {
    return studioBridge.invoke("projects.recent", workspaceId ? { workspaceId } : undefined);
  }
}

export class SessionClient {
  list(workspaceId?: string): Promise<ServiceEnvelope<{ sessions: SessionSummary[]; count: number }>> {
    return studioBridge.invoke("sessions.list", workspaceId ? { workspaceId } : undefined);
  }

  current(): Promise<ServiceEnvelope<{ session: SessionSummary | null }>> {
    return studioBridge.invoke("sessions.current");
  }

  recent(workspaceId?: string): Promise<ServiceEnvelope<{ sessions: SessionSummary[]; count: number }>> {
    return studioBridge.invoke("sessions.recent", workspaceId ? { workspaceId } : undefined);
  }

  resume(sessionId: string): Promise<ServiceEnvelope<{ session: SessionSummary }>> {
    return studioBridge.invoke("sessions.resume", { sessionId });
  }

  close(sessionId: string): Promise<ServiceEnvelope<{ session: SessionSummary }>> {
    return studioBridge.invoke("sessions.close", { sessionId });
  }

  history(workspaceId?: string): Promise<ServiceEnvelope<{ sessions: SessionSummary[]; count: number }>> {
    return studioBridge.invoke("sessions.history", workspaceId ? { workspaceId } : undefined);
  }

  timeline(sessionId: string): Promise<ServiceEnvelope<{ events: SessionTimelineEvent[]; count: number }>> {
    return studioBridge.invoke("sessions.timeline", { sessionId });
  }
}

export class SearchClient {
  global(query: string): Promise<ServiceEnvelope<{ hits: SearchHit[]; count: number }>> {
    return studioBridge.invoke("search.global", { query });
  }

  projects(query: string): Promise<ServiceEnvelope<{ hits: SearchHit[]; count: number }>> {
    return studioBridge.invoke("search.projects", { query });
  }

  workspace(query: string): Promise<ServiceEnvelope<{ hits: SearchHit[]; count: number }>> {
    return studioBridge.invoke("search.workspace", { query });
  }

  commands(query: string): Promise<ServiceEnvelope<{ hits: SearchHit[]; count: number; actions: CommandAction[] }>> {
    return studioBridge.invoke("search.commands", { query });
  }

  packages(query: string): Promise<ServiceEnvelope<{ hits: SearchHit[]; count: number }>> {
    return studioBridge.invoke("search.packages", { query });
  }
}

export class ActivityClient {
  feed(workspaceId?: string): Promise<ServiceEnvelope<{ items: ActivityItem[]; count: number }>> {
    return studioBridge.invoke("activity.feed", workspaceId ? { workspaceId } : undefined);
  }

  recent(kind?: ActivityItem["kind"]): Promise<ServiceEnvelope<{ items: ActivityItem[]; count: number }>> {
    return studioBridge.invoke("activity.recent", kind ? { kind } : undefined);
  }
}

export class KnowledgeClient {
  graph(): Promise<ServiceEnvelope<GraphDocument>> {
    return studioBridge.invoke("knowledge.graph");
  }
}

export class DependencyClient {
  graph(): Promise<ServiceEnvelope<GraphDocument>> {
    return studioBridge.invoke("dependency.graph");
  }
}

export class GraphClient {
  get(kind: GraphKind): Promise<ServiceEnvelope<GraphDocument>> {
    return studioBridge.invoke("graph.get", { kind });
  }

  list(): Promise<ServiceEnvelope<{ graphs: GraphKind[]; count: number }>> {
    return studioBridge.invoke("graph.list");
  }
}

export class VisualizationClient {
  overview(): Promise<ServiceEnvelope<VisualOverview>> {
    return studioBridge.invoke("visualization.overview");
  }

  search(
    query: string,
    scope: "node" | "edge" | "relationship" | "all" = "all",
  ): Promise<ServiceEnvelope<{ hits: GraphSearchHit[]; count: number }>> {
    return studioBridge.invoke("visualization.search", { query, scope });
  }
}

export class StudioSdk {
  readonly runtime = new RuntimeClient();
  readonly generator = new GeneratorClient();
  readonly packages = new PackageClient();
  readonly marketplace = new MarketplaceClient();
  readonly registry = new RegistryClient();
  readonly release = new ReleaseClient();
  readonly workspace = new WorkspaceClient();
  readonly projects = new ProjectClient();
  readonly sessions = new SessionClient();
  readonly search = new SearchClient();
  readonly activity = new ActivityClient();
  readonly knowledge = new KnowledgeClient();
  readonly dependency = new DependencyClient();
  readonly graph = new GraphClient();
  readonly visualization = new VisualizationClient();
}

export const studioSdk = new StudioSdk();
