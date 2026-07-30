import { create } from "zustand";
import type {
  ActivityItem,
  ProjectExplorerItem,
  WorkspaceProfile,
  WorkspaceSettingsView,
  WorkspaceStats,
  WorkspaceSummary,
} from "@/types/studio";
import { studioSdk } from "@/sdk";
import { studioConfig } from "@/config/studio";

type WorkspaceState = {
  workspaces: WorkspaceProfile[];
  activeId: string | null;
  current: WorkspaceSummary | null;
  profile: WorkspaceProfile | null;
  settings: WorkspaceSettingsView | null;
  stats: WorkspaceStats | null;
  activity: ActivityItem[];
  favorites: ProjectExplorerItem[];
  loading: boolean;
  error: string | null;
  load: () => Promise<void>;
  loadAll: () => Promise<void>;
  switchWorkspace: (workspaceId: string) => Promise<void>;
  select: (repoRoot: string) => void;
};

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  workspaces: [],
  activeId: null,
  current: null,
  profile: null,
  settings: null,
  stats: null,
  activity: [],
  favorites: [],
  loading: false,
  error: null,
  async load() {
    set({ loading: true, error: null });
    const result = await studioSdk.workspace.describe();
    if (!result.ok) {
      set({ loading: false, error: result.error ?? "workspace load failed" });
      return;
    }
    set({ current: result.data as WorkspaceSummary, loading: false });
  },
  async loadAll() {
    set({ loading: true, error: null });
    const list = await studioSdk.workspace.list();
    if (!list.ok) {
      set({ loading: false, error: list.error ?? "workspace list failed" });
      return;
    }
    const activeId = get().activeId ?? list.data.workspaces[0]?.id ?? null;
    const [describe, profile, settings, stats, activity, favorites] = await Promise.all([
      studioSdk.workspace.describe(),
      studioSdk.workspace.profile(activeId ?? undefined),
      studioSdk.workspace.settings(activeId ?? undefined),
      studioSdk.workspace.stats(activeId ?? undefined),
      studioSdk.workspace.activity(activeId ?? undefined),
      studioSdk.workspace.favorites(activeId ?? undefined),
    ]);
    set({
      workspaces: list.data.workspaces,
      activeId,
      current: describe.ok ? (describe.data as WorkspaceSummary) : null,
      profile: profile.ok ? profile.data : null,
      settings: settings.ok ? settings.data : null,
      stats: stats.ok ? stats.data : null,
      activity: activity.ok ? activity.data.items : [],
      favorites: favorites.ok ? favorites.data.projects : [],
      loading: false,
      error: null,
    });
  },
  async switchWorkspace(workspaceId) {
    set({ loading: true, error: null });
    const result = await studioSdk.workspace.switchTo(workspaceId);
    if (!result.ok) {
      set({ loading: false, error: result.error ?? "switch failed" });
      return;
    }
    set({ activeId: result.data.activeId, profile: result.data.profile });
    await get().loadAll();
  },
  select(repoRoot) {
    set((state) => ({
      current: state.current
        ? { ...state.current, repoRoot }
        : {
            repoRoot,
            version: studioConfig.version,
            build: studioConfig.build,
            branch: "develop",
            lockedFolders: {},
          },
    }));
  },
}));
