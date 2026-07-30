import { useEffect, useState } from "react";
import {
  ActivityFeed,
  ProjectCard,
  WorkspaceProfileCard,
  WorkspaceSettingsPanel,
  WorkspaceStatsGrid,
  WorkspaceSwitcher,
} from "@/features/workspace/components";
import { SwitchWorkspaceDialog, WorkspaceSearchDialog } from "@/features/workspace/dialogs";
import { useWorkspaceStore, useSearchStore } from "@/features/workspace/stores";
import { Button, Card } from "@/components/ui";

export function WorkspaceExperiencePage() {
  const loadAll = useWorkspaceStore((s) => s.loadAll);
  const switchWorkspace = useWorkspaceStore((s) => s.switchWorkspace);
  const workspaces = useWorkspaceStore((s) => s.workspaces);
  const activeId = useWorkspaceStore((s) => s.activeId);
  const profile = useWorkspaceStore((s) => s.profile);
  const settings = useWorkspaceStore((s) => s.settings);
  const stats = useWorkspaceStore((s) => s.stats);
  const activity = useWorkspaceStore((s) => s.activity);
  const favorites = useWorkspaceStore((s) => s.favorites);
  const loading = useWorkspaceStore((s) => s.loading);

  const [switchOpen, setSwitchOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery);
  const runSearch = useSearchStore((s) => s.run);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  return (
    <div data-testid="page-workspace" className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Workspace</h1>
          <p className="studio-muted mt-1">
            Top-level entry point — manager, switcher, profile, settings, stats, activity.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setSearchOpen(true)}>
            Search
          </Button>
          <Button variant="accent" onClick={() => setSwitchOpen(true)}>
            Switch Workspace
          </Button>
        </div>
      </div>

      {loading && <p className="studio-muted text-sm">Loading workspace…</p>}

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">Workspace Manager</h2>
        <WorkspaceSwitcher
          workspaces={workspaces}
          activeId={activeId}
          onSwitch={(id) => void switchWorkspace(id)}
        />
      </section>

      <WorkspaceProfileCard profile={profile} />
      <WorkspaceStatsGrid stats={stats} />
      <WorkspaceSettingsPanel settings={settings} />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="mb-3 text-sm font-semibold">Favorite Projects</h3>
          <div className="space-y-2">
            {favorites.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
            {favorites.length === 0 && <p className="studio-muted text-sm">No favorites</p>}
          </div>
        </Card>
        <Card>
          <h3 className="mb-3 text-sm font-semibold">Workspace Activity</h3>
          <ActivityFeed items={activity} />
        </Card>
      </div>

      <SwitchWorkspaceDialog
        open={switchOpen}
        workspaces={workspaces}
        onClose={() => setSwitchOpen(false)}
        onConfirm={(id) => {
          void switchWorkspace(id);
          setSwitchOpen(false);
        }}
      />
      <WorkspaceSearchDialog
        open={searchOpen}
        query={query}
        onQueryChange={setQuery}
        onClose={() => setSearchOpen(false)}
        onSearch={() => {
          useSearchStore.getState().setScope("workspace");
          void runSearch();
          setSearchOpen(false);
        }}
      />
    </div>
  );
}
