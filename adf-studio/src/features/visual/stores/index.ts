import { create } from "zustand";
import type { GraphDocument, GraphEdgeModel, GraphKind, LayoutMode } from "@/features/visual/types";
import { studioSdk } from "@/sdk";
import {
  GraphLayout,
  GraphManager,
  GraphSelection,
  type PositionedNode,
} from "@/features/visual/graphs";

type GraphState = {
  kind: GraphKind;
  document: GraphDocument | null;
  nodes: PositionedNode[];
  edges: GraphEdgeModel[];
  loading: boolean;
  error: string | null;
  load: (kind: GraphKind) => Promise<void>;
  refreshVisible: () => void;
};

type SelectionState = {
  selectedIds: string[];
  highlightedIds: string[];
  focusId: string | null;
  select: (ids: string[], multi?: boolean) => void;
  highlight: (ids: string[]) => void;
  focus: (id: string | null) => void;
  clear: () => void;
};

type LayoutState = {
  mode: LayoutMode;
  setMode: (mode: LayoutMode) => void;
};

type FilterState = {
  query: string;
  nodeTypes: string[];
  edgeTypes: string[];
  expanded: boolean;
  setQuery: (query: string) => void;
  setNodeTypes: (types: string[]) => void;
  setEdgeTypes: (types: string[]) => void;
  setExpanded: (expanded: boolean) => void;
  clear: () => void;
};

export const useGraphStore = create<GraphState>((set, get) => ({
  kind: "knowledge",
  document: null,
  nodes: [],
  edges: [],
  loading: false,
  error: null,
  async load(kind) {
    set({ loading: true, error: null, kind });
    const result = await studioSdk.graph.get(kind);
    if (!result.ok) {
      set({ loading: false, error: result.error ?? "graph load failed" });
      return;
    }
    set({ document: result.data, loading: false });
    get().refreshVisible();
  },
  refreshVisible() {
    const doc = get().document;
    if (!doc) return;
    const manager = new GraphManager(doc);
    const filter = useFilterStore.getState();
    const selection = useSelectionStore.getState();
    const layout = useLayoutStore.getState().mode;
    const visible = manager.visible({
      nodeTypes: filter.nodeTypes,
      edgeTypes: filter.edgeTypes,
      query: filter.query,
      focusId: selection.focusId,
      expanded: filter.expanded,
    });
    set({
      nodes: GraphLayout.apply(visible.nodes, layout),
      edges: visible.edges,
    });
  },
}));

export const useSelectionStore = create<SelectionState>((set, get) => ({
  selectedIds: [],
  highlightedIds: [],
  focusId: null,
  select(ids, multi = false) {
    if (!ids.length) {
      set({ selectedIds: [], focusId: null });
      useGraphStore.getState().refreshVisible();
      return;
    }
    let next = get().selectedIds;
    if (multi) {
      for (const id of ids) next = GraphSelection.toggle(next, id, true);
    } else {
      next = [ids[0]];
    }
    set({ selectedIds: next, focusId: ids[0] ?? null });
    useGraphStore.getState().refreshVisible();
  },
  highlight(ids) {
    set({ highlightedIds: ids });
  },
  focus(id) {
    set({ focusId: id, selectedIds: id ? [id] : [] });
    useGraphStore.getState().refreshVisible();
  },
  clear() {
    set({ selectedIds: [], highlightedIds: [], focusId: null });
    useGraphStore.getState().refreshVisible();
  },
}));

export const useLayoutStore = create<LayoutState>((set) => ({
  mode: "hierarchical",
  setMode(mode) {
    set({ mode });
    useGraphStore.getState().refreshVisible();
  },
}));

export const useFilterStore = create<FilterState>((set) => ({
  query: "",
  nodeTypes: [],
  edgeTypes: [],
  expanded: true,
  setQuery(query) {
    set({ query });
    useGraphStore.getState().refreshVisible();
  },
  setNodeTypes(types) {
    set({ nodeTypes: types });
    useGraphStore.getState().refreshVisible();
  },
  setEdgeTypes(types) {
    set({ edgeTypes: types });
    useGraphStore.getState().refreshVisible();
  },
  setExpanded(expanded) {
    set({ expanded });
    useGraphStore.getState().refreshVisible();
  },
  clear() {
    set({ query: "", nodeTypes: [], edgeTypes: [], expanded: true });
    useGraphStore.getState().refreshVisible();
  },
}));
