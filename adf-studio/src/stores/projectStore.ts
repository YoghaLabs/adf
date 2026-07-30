import { create } from "zustand";
import type { ProjectExplorerItem, ProjectSummary } from "@/types/studio";
import { studioSdk } from "@/sdk";

type ProjectExplorerState = {
  projects: ProjectSummary[];
  explorer: ProjectExplorerItem[];
  tree: ProjectExplorerItem[];
  recent: ProjectExplorerItem[];
  favorites: ProjectExplorerItem[];
  pinned: ProjectExplorerItem[];
  archived: ProjectExplorerItem[];
  selectedId: string | null;
  filter: "all" | "favorites" | "pinned" | "archived" | "recent";
  loading: boolean;
  load: (workspaceId?: string) => Promise<void>;
  select: (id: string | null) => void;
  setFilter: (filter: ProjectExplorerState["filter"]) => void;
};

export const useProjectStore = create<ProjectExplorerState>((set) => ({
  projects: [],
  explorer: [],
  tree: [],
  recent: [],
  favorites: [],
  pinned: [],
  archived: [],
  selectedId: null,
  filter: "all",
  loading: false,
  async load(workspaceId) {
    set({ loading: true });
    const [list, explorer, tree, recent, favorites, pinned, archived] = await Promise.all([
      studioSdk.projects.list(),
      studioSdk.projects.explorer(workspaceId),
      studioSdk.projects.tree(workspaceId),
      studioSdk.projects.recent(workspaceId),
      studioSdk.projects.favorites(workspaceId),
      studioSdk.projects.pinned(workspaceId),
      studioSdk.projects.archived(workspaceId),
    ]);
    set({
      projects: list.ok ? list.data.projects : [],
      explorer: explorer.ok ? explorer.data.projects : [],
      tree: tree.ok ? tree.data.tree : [],
      recent: recent.ok ? recent.data.projects : [],
      favorites: favorites.ok ? favorites.data.projects : [],
      pinned: pinned.ok ? pinned.data.projects : [],
      archived: archived.ok ? archived.data.projects : [],
      loading: false,
    });
  },
  select(id) {
    set({ selectedId: id });
  },
  setFilter(filter) {
    set({ filter });
  },
}));

/** Alias for BUILD-014 naming. */
export const useProjectExplorerStore = useProjectStore;
