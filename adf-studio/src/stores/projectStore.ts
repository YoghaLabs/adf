import { create } from "zustand";
import type { ProjectSummary } from "@/types/studio";
import { studioSdk } from "@/sdk";

type ProjectState = {
  projects: ProjectSummary[];
  selectedId: string | null;
  loading: boolean;
  load: () => Promise<void>;
  select: (id: string) => void;
};

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  selectedId: null,
  loading: false,
  async load() {
    set({ loading: true });
    const result = await studioSdk.projects.list();
    const projects = (result.data.projects as ProjectSummary[]) ?? [];
    set({
      projects,
      selectedId: projects[0]?.id ?? null,
      loading: false,
    });
  },
  select(id) {
    set({ selectedId: id });
  },
}));
