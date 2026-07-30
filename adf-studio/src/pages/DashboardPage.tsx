import { useEffect, useState } from "react";
import { StatWidget, ListWidget } from "@/widgets/DashboardWidgets";
import {
  FavoriteProjectsWidget,
  RecentBuildsWidget,
  RecentSessionsWidget,
  WorkspaceOverviewWidget,
} from "@/features/workspace/widgets";
import { useMarketplaceStore } from "@/stores/marketplaceStore";
import { useProjectStore } from "@/stores/projectStore";
import { useRuntimeStore } from "@/stores/runtimeStore";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { useSessionStore } from "@/stores/sessionStore";
import { useActivityStore } from "@/stores/activityStore";
import { studioConfig } from "@/config/studio";
import { studioSdk } from "@/sdk";
import type { MarketplaceItem } from "@/types/studio";

export function DashboardPage() {
  const loadWorkspace = useWorkspaceStore((s) => s.loadAll);
  const profile = useWorkspaceStore((s) => s.profile);
  const stats = useWorkspaceStore((s) => s.stats);
  const loadProjects = useProjectStore((s) => s.load);
  const projects = useProjectStore((s) => s.projects);
  const favorites = useProjectStore((s) => s.favorites);
  const refreshRuntime = useRuntimeStore((s) => s.refresh);
  const runtime = useRuntimeStore((s) => s.status);
  const browseMarket = useMarketplaceStore((s) => s.browse);
  const featured = useMarketplaceStore((s) => s.featured);
  const loadSessions = useSessionStore((s) => s.load);
  const recentSessions = useSessionStore((s) => s.recent);
  const loadActivity = useActivityStore((s) => s.load);
  const builds = useActivityStore((s) => s.builds);
  const [installed, setInstalled] = useState<MarketplaceItem[]>([]);

  useEffect(() => {
    void loadWorkspace().then(() => {
      const ws = useWorkspaceStore.getState().activeId ?? undefined;
      void loadProjects(ws);
      void loadSessions(ws);
      void loadActivity(ws);
    });
    void refreshRuntime();
    void browseMarket();
    void studioSdk.packages.listInstalled().then((r) => {
      setInstalled((r.data.packages as MarketplaceItem[]) ?? []);
    });
  }, [browseMarket, loadActivity, loadProjects, loadSessions, loadWorkspace, refreshRuntime]);

  return (
    <div data-testid="page-dashboard" className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="studio-muted mt-1">
          Workspace Experience overview — UI only; all actions go through the SDK.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <WorkspaceOverviewWidget
          name={profile?.name ?? "Workspace"}
          path={profile?.path ?? "—"}
          projects={stats?.projects ?? projects.length}
          sessions={stats?.sessions ?? recentSessions.length}
        />
        <StatWidget
          title="Project Summary"
          value={projects.length}
          hint="active catalog"
        />
        <StatWidget
          title="Runtime Status"
          value={runtime?.ok ? "Healthy" : "…"}
          hint={`${runtime?.plugins ?? 0} plugins`}
        />
        <StatWidget
          title="Version"
          value={studioConfig.version}
          hint={studioConfig.build}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <FavoriteProjectsWidget
          items={favorites.map((p) => ({ id: p.id, label: p.name, meta: p.status }))}
        />
        <RecentSessionsWidget
          items={recentSessions.map((s) => ({ id: s.id, label: s.title, meta: s.status }))}
        />
        <RecentBuildsWidget
          items={builds.map((b) => ({ id: b.id, label: b.title, meta: b.kind }))}
        />
        <ListWidget
          title="Marketplace Updates"
          items={featured.map((i) => ({ id: i.id, label: i.name, meta: i.version }))}
        />
        <ListWidget
          title="Installed Packages"
          items={installed.map((i) => ({ id: i.id, label: i.name, meta: i.version }))}
        />
      </div>
    </div>
  );
}
