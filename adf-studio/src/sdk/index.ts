/**
 * Studio SDK adapters — TypeScript facades over ADF Core SDK clients.
 *
 * Studio MUST NOT contain business logic. These adapters only ferry
 * requests to the Python Service Layer via a bridge (CLI/SDK invoke).
 */

import type {
  ActivityItem,
  BackgroundJob,
  CommandAction,
  GraphDocument,
  GraphKind,
  GraphSearchHit,
  InspectorItem,
  LogEntry,
  LogSeverity,
  MarketplaceItem,
  MetricSeriesPoint,
  ProjectExplorerItem,
  ProjectSummary,
  ReleaseChannelInfo,
  RuntimeDiagnostics,
  RuntimeEvent,
  RuntimeMetrics,
  RuntimeOverview,
  RuntimeStatus,
  SearchHit,
  ServiceEnvelope,
  SessionSummary,
  SessionTimelineEvent,
  TimelineEvent,
  TimelineKind,
  VisualOverview,
  WorkspaceProfile,
  WorkspaceSettingsView,
  WorkspaceStats,
  WorkspaceSummary,
  ApprovalAction,
  Assignment,
  CollaborationActivity,
  CollaborationNotification,
  CollaborationOverview,
  CollaborationSession,
  CommentThread,
  MultiAgentNode,
  Participant,
  ReviewItem,
  WorkspaceInvitation,
  WorkspaceMember,
  ApprovalGate,
  ExecutionView,
  IntegrationLink,
  OrchestrationArtifact,
  OrchestrationDependency,
  OrchestrationOverview,
  PipelineHistoryEntry,
  PipelineMetrics,
  PipelineStage,
  ReviewGate,
  StageAssignment,
  TransitionRecord,
  WorkflowExecutionPlan,
  WorkflowInstance,
  WorkflowTemplate,
  AnalyticsSnapshot,
  AuditEvent,
  ComplianceControl,
  ComplianceEvidence,
  EnterpriseGroup,
  EnterpriseIntegration,
  EnterpriseOverview,
  EnterpriseRole,
  EnterpriseTeam,
  EnterpriseUser,
  EnvironmentConfig,
  GovernancePolicy,
  IdentityProvider,
  IdentitySession,
  LicenseInfo,
  Organization,
  OrgUnit,
  Permission,
  PermissionMatrixCell,
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

  list(installed = false): Promise<ServiceEnvelope<{ packages: MarketplaceItem[]; count: number }>> {
    return studioBridge.invoke("packages.list", { installed });
  }

  search(query: string): Promise<ServiceEnvelope<{ packages: MarketplaceItem[]; count: number }>> {
    return studioBridge.invoke("packages.search", { query });
  }

  install(
    packageId: string,
    opts?: { overwrite?: boolean },
  ): Promise<ServiceEnvelope<Record<string, unknown>>> {
    return studioBridge.invoke("packages.install", {
      packageId,
      overwrite: opts?.overwrite ?? false,
    });
  }

  remove(packageId: string): Promise<ServiceEnvelope<Record<string, unknown>>> {
    return studioBridge.invoke("packages.remove", { packageId });
  }

  update(packageId: string): Promise<ServiceEnvelope<Record<string, unknown>>> {
    return studioBridge.invoke("packages.update", { packageId });
  }

  verify(packageId?: string): Promise<ServiceEnvelope<Record<string, unknown>>> {
    return studioBridge.invoke(
      "packages.verify",
      packageId ? { packageId } : undefined,
    );
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

  create(opts?: {
    title?: string;
    projectId?: string;
    workspaceId?: string;
  }): Promise<ServiceEnvelope<{ session: SessionSummary }>> {
    return studioBridge.invoke("sessions.create", opts as Record<string, unknown> | undefined);
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

export class RuntimeDashboardClient {
  overview(): Promise<ServiceEnvelope<RuntimeOverview>> {
    return studioBridge.invoke("runtimeDashboard.overview");
  }

  jobs(): Promise<ServiceEnvelope<{ jobs: BackgroundJob[]; count: number }>> {
    return studioBridge.invoke("runtimeDashboard.jobs");
  }

  events(): Promise<ServiceEnvelope<{ events: RuntimeEvent[]; count: number }>> {
    return studioBridge.invoke("runtimeDashboard.events");
  }

  inspectors(): Promise<ServiceEnvelope<Record<string, InspectorItem[]>>> {
    return studioBridge.invoke("runtimeDashboard.inspectors");
  }
}

export class MetricsClient {
  snapshot(): Promise<ServiceEnvelope<RuntimeMetrics>> {
    return studioBridge.invoke("metrics.snapshot");
  }

  series(): Promise<ServiceEnvelope<{ points: MetricSeriesPoint[] }>> {
    return studioBridge.invoke("metrics.series");
  }
}

export class LogsClient {
  list(): Promise<ServiceEnvelope<{ logs: LogEntry[]; count: number }>> {
    return studioBridge.invoke("logs.list");
  }

  filter(opts: {
    query?: string;
    severity?: LogSeverity | "all";
  }): Promise<ServiceEnvelope<{ logs: LogEntry[]; count: number }>> {
    return studioBridge.invoke("logs.filter", opts as Record<string, unknown>);
  }
}

export class DiagnosticsClient {
  snapshot(): Promise<ServiceEnvelope<RuntimeDiagnostics>> {
    return studioBridge.invoke("diagnostics.snapshot");
  }
}

export class TimelineClient {
  list(): Promise<ServiceEnvelope<{ events: TimelineEvent[]; count: number }>> {
    return studioBridge.invoke("timeline.list");
  }

  byKind(kind: TimelineKind): Promise<ServiceEnvelope<{ events: TimelineEvent[]; count: number }>> {
    return studioBridge.invoke("timeline.byKind", { kind });
  }
}

export class ParticipantClient {
  list(): Promise<ServiceEnvelope<{ participants: Participant[]; count: number }>> {
    return studioBridge.invoke("participants.list");
  }

  get(participantId: string): Promise<ServiceEnvelope<{ participant: Participant | null }>> {
    return studioBridge.invoke("participants.get", { participantId });
  }
}

export class CollaborationClient {
  overview(): Promise<ServiceEnvelope<CollaborationOverview>> {
    return studioBridge.invoke("collaboration.overview");
  }

  members(): Promise<ServiceEnvelope<{ members: WorkspaceMember[]; count: number }>> {
    return studioBridge.invoke("collaboration.members");
  }

  invitations(): Promise<ServiceEnvelope<{ invitations: WorkspaceInvitation[]; count: number }>> {
    return studioBridge.invoke("collaboration.invitations");
  }

  sessions(): Promise<ServiceEnvelope<{ sessions: CollaborationSession[]; count: number }>> {
    return studioBridge.invoke("collaboration.sessions");
  }

  comments(): Promise<ServiceEnvelope<{ threads: CommentThread[]; count: number }>> {
    return studioBridge.invoke("collaboration.comments");
  }

  activity(): Promise<ServiceEnvelope<{ items: CollaborationActivity[]; count: number }>> {
    return studioBridge.invoke("collaboration.activity");
  }

  multiAgentModel(): Promise<ServiceEnvelope<{ nodes: MultiAgentNode[]; count: number }>> {
    return studioBridge.invoke("collaboration.multiAgentModel");
  }
}

export class PresenceClient {
  list(): Promise<ServiceEnvelope<{ participants: Participant[]; count: number }>> {
    return studioBridge.invoke("presence.list");
  }
}

export class ReviewClient {
  list(): Promise<ServiceEnvelope<{ reviews: ReviewItem[]; count: number }>> {
    return studioBridge.invoke("reviews.list");
  }

  approvals(): Promise<ServiceEnvelope<{ approvals: ApprovalAction[]; count: number }>> {
    return studioBridge.invoke("reviews.approvals");
  }
}

export class NotificationClient {
  list(): Promise<ServiceEnvelope<{ notifications: CollaborationNotification[]; count: number }>> {
    return studioBridge.invoke("notifications.list");
  }
}

export class AssignmentClient {
  list(): Promise<ServiceEnvelope<{ assignments: Assignment[]; count: number }>> {
    return studioBridge.invoke("assignments.list");
  }
}

export class WorkflowClient {
  overview(): Promise<ServiceEnvelope<OrchestrationOverview>> {
    return studioBridge.invoke("workflows.overview");
  }

  instances(): Promise<ServiceEnvelope<{ instances: WorkflowInstance[]; count: number }>> {
    return studioBridge.invoke("workflows.instances");
  }

  templates(): Promise<ServiceEnvelope<{ templates: WorkflowTemplate[]; count: number }>> {
    return studioBridge.invoke("workflows.templates");
  }

  plans(): Promise<ServiceEnvelope<{ plans: WorkflowExecutionPlan[]; count: number }>> {
    return studioBridge.invoke("workflows.plans");
  }
}

export class PipelineClient {
  stages(): Promise<ServiceEnvelope<{ stages: PipelineStage[]; count: number }>> {
    return studioBridge.invoke("pipelines.stages");
  }

  metrics(): Promise<ServiceEnvelope<PipelineMetrics>> {
    return studioBridge.invoke("pipelines.metrics");
  }

  history(): Promise<ServiceEnvelope<{ entries: PipelineHistoryEntry[]; count: number }>> {
    return studioBridge.invoke("pipelines.history");
  }

  dependencies(): Promise<ServiceEnvelope<{ dependencies: OrchestrationDependency[]; count: number }>> {
    return studioBridge.invoke("pipelines.dependencies");
  }

  transitions(): Promise<ServiceEnvelope<{ transitions: TransitionRecord[]; count: number }>> {
    return studioBridge.invoke("pipelines.transitions");
  }

  reviewGates(): Promise<ServiceEnvelope<{ gates: ReviewGate[]; count: number }>> {
    return studioBridge.invoke("pipelines.reviewGates");
  }

  assignments(): Promise<ServiceEnvelope<{ assignments: StageAssignment[]; count: number }>> {
    return studioBridge.invoke("pipelines.assignments");
  }
}

export class ArtifactClient {
  list(): Promise<ServiceEnvelope<{ artifacts: OrchestrationArtifact[]; count: number }>> {
    return studioBridge.invoke("artifacts.list");
  }
}

export class ExecutionClient {
  view(): Promise<ServiceEnvelope<ExecutionView>> {
    return studioBridge.invoke("execution.view");
  }

  integrations(): Promise<ServiceEnvelope<{ integrations: IntegrationLink[]; count: number }>> {
    return studioBridge.invoke("execution.integrations");
  }
}

export class ApprovalClient {
  list(): Promise<ServiceEnvelope<{ gates: ApprovalGate[]; count: number }>> {
    return studioBridge.invoke("approvals.list");
  }
}

export class OrganizationClient {
  overview(): Promise<ServiceEnvelope<EnterpriseOverview>> {
    return studioBridge.invoke("organizations.overview");
  }

  list(): Promise<ServiceEnvelope<{ organizations: Organization[]; count: number }>> {
    return studioBridge.invoke("organizations.list");
  }

  units(): Promise<ServiceEnvelope<{ units: OrgUnit[]; count: number }>> {
    return studioBridge.invoke("organizations.units");
  }

  teams(): Promise<ServiceEnvelope<{ teams: EnterpriseTeam[]; count: number }>> {
    return studioBridge.invoke("organizations.teams");
  }

  integrations(): Promise<ServiceEnvelope<{ integrations: EnterpriseIntegration[]; count: number }>> {
    return studioBridge.invoke("organizations.integrations");
  }

  environments(): Promise<ServiceEnvelope<{ environments: EnvironmentConfig[]; count: number }>> {
    return studioBridge.invoke("organizations.environments");
  }

  policies(): Promise<ServiceEnvelope<{ policies: GovernancePolicy[]; count: number }>> {
    return studioBridge.invoke("organizations.policies");
  }
}

export class IdentityClient {
  users(): Promise<ServiceEnvelope<{ users: EnterpriseUser[]; count: number }>> {
    return studioBridge.invoke("identity.users");
  }

  groups(): Promise<ServiceEnvelope<{ groups: EnterpriseGroup[]; count: number }>> {
    return studioBridge.invoke("identity.groups");
  }

  providers(): Promise<ServiceEnvelope<{ providers: IdentityProvider[]; count: number }>> {
    return studioBridge.invoke("identity.providers");
  }

  sessions(): Promise<ServiceEnvelope<{ sessions: IdentitySession[]; count: number }>> {
    return studioBridge.invoke("identity.sessions");
  }
}

export class RoleClient {
  list(): Promise<ServiceEnvelope<{ roles: EnterpriseRole[]; count: number }>> {
    return studioBridge.invoke("roles.list");
  }
}

export class PermissionClient {
  list(): Promise<ServiceEnvelope<{ permissions: Permission[]; count: number }>> {
    return studioBridge.invoke("permissions.list");
  }

  matrix(): Promise<ServiceEnvelope<{ matrix: PermissionMatrixCell[]; count: number }>> {
    return studioBridge.invoke("permissions.matrix");
  }
}

export class AuditClient {
  list(): Promise<ServiceEnvelope<{ events: AuditEvent[]; count: number }>> {
    return studioBridge.invoke("audit.list");
  }

  search(query: string): Promise<ServiceEnvelope<{ events: AuditEvent[]; count: number }>> {
    return studioBridge.invoke("audit.search", { query });
  }

  export(): Promise<ServiceEnvelope<{ immutable: true; count: number; events: AuditEvent[] }>> {
    return studioBridge.invoke("audit.export");
  }
}

export class ComplianceClient {
  controls(): Promise<ServiceEnvelope<{ controls: ComplianceControl[]; count: number }>> {
    return studioBridge.invoke("compliance.controls");
  }

  evidence(): Promise<ServiceEnvelope<{ evidence: ComplianceEvidence[]; count: number }>> {
    return studioBridge.invoke("compliance.evidence");
  }
}

export class LicenseClient {
  list(): Promise<ServiceEnvelope<{ licenses: LicenseInfo[]; count: number }>> {
    return studioBridge.invoke("licenses.list");
  }
}

export class AnalyticsClient {
  snapshot(): Promise<ServiceEnvelope<AnalyticsSnapshot>> {
    return studioBridge.invoke("analytics.snapshot");
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
  readonly runtimeDashboard = new RuntimeDashboardClient();
  readonly metrics = new MetricsClient();
  readonly logs = new LogsClient();
  readonly diagnostics = new DiagnosticsClient();
  readonly timeline = new TimelineClient();
  readonly participants = new ParticipantClient();
  readonly collaboration = new CollaborationClient();
  readonly presence = new PresenceClient();
  readonly reviews = new ReviewClient();
  readonly notifications = new NotificationClient();
  readonly assignments = new AssignmentClient();
  readonly workflows = new WorkflowClient();
  readonly pipelines = new PipelineClient();
  readonly artifacts = new ArtifactClient();
  readonly execution = new ExecutionClient();
  readonly approvals = new ApprovalClient();
  readonly organizations = new OrganizationClient();
  readonly identity = new IdentityClient();
  readonly roles = new RoleClient();
  readonly permissions = new PermissionClient();
  readonly audit = new AuditClient();
  readonly compliance = new ComplianceClient();
  readonly licenses = new LicenseClient();
  readonly analytics = new AnalyticsClient();
}

export const studioSdk = new StudioSdk();
