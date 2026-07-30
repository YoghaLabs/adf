import { create } from "zustand";
import type { CommandAction, SearchHit } from "@/types/studio";
import { studioSdk } from "@/sdk";

type SearchState = {
  query: string;
  scope: "global" | "project" | "workspace" | "command" | "package";
  hits: SearchHit[];
  commands: CommandAction[];
  loading: boolean;
  setQuery: (query: string) => void;
  setScope: (scope: SearchState["scope"]) => void;
  run: (query?: string) => Promise<void>;
  clear: () => void;
};

export const useSearchStore = create<SearchState>((set, get) => ({
  query: "",
  scope: "global",
  hits: [],
  commands: [],
  loading: false,
  setQuery(query) {
    set({ query });
  },
  setScope(scope) {
    set({ scope });
  },
  async run(query) {
    const q = query ?? get().query;
    const scope = get().scope;
    set({ loading: true, query: q });
    if (scope === "command") {
      const result = await studioSdk.search.commands(q);
      set({
        hits: result.ok ? result.data.hits : [],
        commands: result.ok ? result.data.actions : [],
        loading: false,
      });
      return;
    }
    const invokers = {
      global: () => studioSdk.search.global(q),
      project: () => studioSdk.search.projects(q),
      workspace: () => studioSdk.search.workspace(q),
      package: () => studioSdk.search.packages(q),
    } as const;
    const result = await invokers[scope]();
    set({
      hits: result.ok ? result.data.hits : [],
      commands: [],
      loading: false,
    });
  },
  clear() {
    set({ query: "", hits: [], commands: [] });
  },
}));
