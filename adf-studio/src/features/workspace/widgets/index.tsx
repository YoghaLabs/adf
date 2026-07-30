import { Card } from "@/components/ui";
import { ListWidget } from "@/widgets/DashboardWidgets";

export function WorkspaceOverviewWidget({
  name,
  path,
  projects,
  sessions,
}: {
  name: string;
  path: string;
  projects: number;
  sessions: number;
}) {
  return (
    <Card data-testid="widget-workspace-overview">
      <div className="studio-muted text-xs">Workspace Overview</div>
      <div className="mt-1 text-xl font-semibold">{name}</div>
      <div className="mt-1 font-mono text-xs text-ink-muted">{path}</div>
      <div className="mt-3 flex gap-4 text-sm">
        <span>{projects} projects</span>
        <span>{sessions} sessions</span>
      </div>
    </Card>
  );
}

export function FavoriteProjectsWidget({
  items,
}: {
  items: { id: string; label: string; meta?: string }[];
}) {
  return <ListWidget title="Favorite Projects" items={items} />;
}

export function RecentBuildsWidget({
  items,
}: {
  items: { id: string; label: string; meta?: string }[];
}) {
  return <ListWidget title="Recent Builds" items={items} />;
}

export function RecentSessionsWidget({
  items,
}: {
  items: { id: string; label: string; meta?: string }[];
}) {
  return <ListWidget title="Recent Sessions" items={items} />;
}
