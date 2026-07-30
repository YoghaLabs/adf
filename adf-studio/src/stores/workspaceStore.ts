import { create } from "zustand";
import type { WorkspaceSummary } from "@/types/studio";
import { studioSdk } from "@/sdk";

type WorkspaceState = {
  current: WorkspaceSummary | null;
  loading: boolean;
  error: string | null;
  load: () => Promise<void>;
  select: (repoRoot: string) => void;
};

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  current: null,
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
  select(repoRoot) {
    set((state) => ({
      current: state.current
        ? { ...state.current, repoRoot }
        : {
            repoRoot,
            version: "0.13.0-alpha",
            build: "BUILD-013",
            branch: "develop",
            lockedFolders: {},
          },
    }));
  },
}));
