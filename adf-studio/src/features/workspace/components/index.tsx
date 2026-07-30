import { Badge, Button, Card } from "@/components/ui";
import type { WorkspaceProfile } from "@/types/studio";
import { cn } from "@/utils/cn";

export function WorkspaceSwitcher({
  workspaces,
  activeId,
  onSwitch,
}: {
  workspaces: WorkspaceProfile[];
  activeId: string | null;
  onSwitch: (id: string) => void;
}) {
  return (
    <div data-testid="workspace-switcher" className="flex flex-wrap gap-2">
      {workspaces.map((ws) => (
        <Button
          key={ws.id}
          variant={ws.id === activeId ? "accent" : "outline"}
          onClick={() => onSwitch(ws.id)}
          aria-pressed={ws.id === activeId}
        >
          {ws.name}
          {ws.favorite && <Badge className="ml-1 border-0 bg-transparent px-0">★</Badge>}
        </Button>
      ))}
    </div>
  );
}

export function WorkspaceProfileCard({ profile }: { profile: WorkspaceProfile | null }) {
  if (!profile) return <Card data-testid="workspace-profile">No workspace selected</Card>;
  return (
    <Card data-testid="workspace-profile">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{profile.name}</h3>
          <p className="studio-muted mt-1 text-sm">{profile.description}</p>
          <p className="mt-2 font-mono text-xs text-ink-muted">{profile.path}</p>
        </div>
        <Badge>{profile.id}</Badge>
      </div>
      <div className="mt-4 flex gap-4 text-sm">
        <span>{profile.projectCount} projects</span>
        <span>{profile.sessionCount} sessions</span>
      </div>
    </Card>
  );
}

export function WorkspaceStatsGrid({
  stats,
}: {
  stats: { projects: number; sessions: number; favorites: number; builds: number; packages: number } | null;
}) {
  const cells = [
    { label: "Projects", value: stats?.projects ?? 0 },
    { label: "Sessions", value: stats?.sessions ?? 0 },
    { label: "Favorites", value: stats?.favorites ?? 0 },
    { label: "Builds", value: stats?.builds ?? 0 },
    { label: "Packages", value: stats?.packages ?? 0 },
  ];
  return (
    <div data-testid="workspace-stats" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {cells.map((c) => (
        <Card key={c.label} className="p-3">
          <div className="studio-muted text-xs">{c.label}</div>
          <div className="mt-1 text-2xl font-semibold">{c.value}</div>
        </Card>
      ))}
    </div>
  );
}

export function WorkspaceSettingsPanel({
  settings,
}: {
  settings: {
    language: string;
    channel: string;
    autoResumeSessions: boolean;
    showArchivedProjects: boolean;
  } | null;
}) {
  return (
    <Card data-testid="workspace-settings">
      <h3 className="mb-3 text-sm font-semibold">Workspace Settings</h3>
      <dl className="grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="studio-muted">Language</dt>
          <dd>{settings?.language ?? "—"}</dd>
        </div>
        <div>
          <dt className="studio-muted">Channel</dt>
          <dd>{settings?.channel ?? "—"}</dd>
        </div>
        <div>
          <dt className="studio-muted">Auto-resume sessions</dt>
          <dd>{settings?.autoResumeSessions ? "On" : "Off"}</dd>
        </div>
        <div>
          <dt className="studio-muted">Show archived</dt>
          <dd>{settings?.showArchivedProjects ? "Yes" : "No"}</dd>
        </div>
      </dl>
      <p className="studio-muted mt-3 text-xs">Read-only presentation — mutations via Service Layer.</p>
    </Card>
  );
}

export function ProjectCard({
  project,
  selected,
  onSelect,
}: {
  project: {
    id: string;
    name: string;
    status: string;
    version: string;
    favorite?: boolean;
    pinned?: boolean;
    archived?: boolean;
  };
  selected?: boolean;
  onSelect?: (id: string) => void;
}) {
  return (
    <button
      type="button"
      data-testid={`project-card-${project.id}`}
      onClick={() => onSelect?.(project.id)}
      className={cn(
        "studio-panel w-full p-4 text-left transition hover:border-accent/40",
        selected && "border-accent ring-1 ring-accent/30",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium">{project.name}</span>
        <Badge>{project.status}</Badge>
      </div>
      <div className="studio-muted mt-2 flex flex-wrap gap-2 text-xs">
        <span>{project.version}</span>
        {project.favorite && <span>Favorite</span>}
        {project.pinned && <span>Pinned</span>}
        {project.archived && <span>Archived</span>}
      </div>
    </button>
  );
}

export function ProjectTree({
  items,
  selectedId,
  onSelect,
}: {
  items: { id: string; name: string; status: string }[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <ul data-testid="project-tree" className="space-y-1">
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            className={cn(
              "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition",
              selectedId === item.id ? "bg-accent/15 text-accent" : "hover:bg-canvas-elevated",
            )}
            onClick={() => onSelect(item.id)}
          >
            <span>{item.name}</span>
            <span className="text-xs text-ink-muted">{item.status}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export function SessionList({
  sessions,
  onResume,
  onClose,
  testId = "session-list",
}: {
  sessions: {
    id: string;
    title: string;
    status: string;
    projectId: string;
    updatedAt: string;
  }[];
  onResume: (id: string) => void;
  onClose: (id: string) => void;
  testId?: string;
}) {
  return (
    <ul data-testid={testId} className="space-y-2">
      {sessions.map((s) => (
        <li key={s.id} className="studio-panel flex flex-wrap items-center justify-between gap-3 p-3">
          <div>
            <div className="font-medium">{s.title}</div>
            <div className="studio-muted text-xs">
              {s.projectId} · {s.status} · {new Date(s.updatedAt).toLocaleString()}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onResume(s.id)} disabled={s.status === "active"}>
              Resume
            </Button>
            <Button variant="ghost" onClick={() => onClose(s.id)} disabled={s.status === "closed"}>
              Close
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ActivityFeed({
  items,
}: {
  items: { id: string; kind: string; title: string; detail: string; at: string }[];
}) {
  return (
    <ul data-testid="activity-feed" className="space-y-2">
      {items.map((item) => (
        <li key={item.id} className="flex items-start justify-between gap-3 border-b border-line py-2 last:border-0">
          <div>
            <div className="text-sm font-medium">{item.title}</div>
            <div className="studio-muted text-xs">{item.detail}</div>
          </div>
          <Badge>{item.kind}</Badge>
        </li>
      ))}
    </ul>
  );
}

export function SearchResults({
  hits,
  onSelect,
}: {
  hits: { id: string; kind: string; label: string; meta?: string; path?: string }[];
  onSelect: (hit: { id: string; path?: string }) => void;
}) {
  return (
    <ul data-testid="search-results" className="space-y-1">
      {hits.map((hit) => (
        <li key={hit.id}>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-canvas-elevated"
            onClick={() => onSelect(hit)}
          >
            <span>
              <span className="font-medium">{hit.label}</span>
              <span className="studio-muted ml-2 text-xs">{hit.kind}</span>
            </span>
            <span className="text-xs text-ink-muted">{hit.meta}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
