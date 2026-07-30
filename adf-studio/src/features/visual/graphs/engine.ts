import type { GraphDocument, GraphEdgeModel, GraphNodeModel, LayoutMode } from "@/features/visual/types";

export type PositionedNode = GraphNodeModel & { x: number; y: number };

/** Builds presentation graphs from SDK envelopes — no domain rules. */
export class GraphBuilder {
  static fromDocument(doc: GraphDocument): { nodes: GraphNodeModel[]; edges: GraphEdgeModel[] } {
    return { nodes: [...doc.nodes], edges: [...doc.edges] };
  }

  static merge(docs: GraphDocument[]): GraphDocument {
    const nodes = new Map<string, GraphNodeModel>();
    const edges: GraphEdgeModel[] = [];
    for (const doc of docs) {
      for (const node of doc.nodes) nodes.set(node.id, node);
      for (const edge of doc.edges) edges.push(edge);
    }
    return {
      id: "merged",
      kind: docs[0]?.kind ?? "workspace",
      title: "Merged Graph",
      nodes: [...nodes.values()],
      edges,
    };
  }
}

export class GraphLayout {
  static apply(nodes: GraphNodeModel[], mode: LayoutMode): PositionedNode[] {
    switch (mode) {
      case "grid":
        return this.grid(nodes);
      case "tree":
      case "hierarchical":
        return this.hierarchical(nodes);
      case "radial":
        return this.radial(nodes);
      case "force":
      default:
        return this.force(nodes);
    }
  }

  static grid(nodes: GraphNodeModel[]): PositionedNode[] {
    const cols = Math.max(1, Math.ceil(Math.sqrt(nodes.length)));
    return nodes.map((node, i) => ({
      ...node,
      x: (i % cols) * 220,
      y: Math.floor(i / cols) * 140,
    }));
  }

  static hierarchical(nodes: GraphNodeModel[]): PositionedNode[] {
    const byType = new Map<string, GraphNodeModel[]>();
    for (const node of nodes) {
      const list = byType.get(node.type) ?? [];
      list.push(node);
      byType.set(node.type, list);
    }
    const layers = [...byType.values()];
    const positioned: PositionedNode[] = [];
    layers.forEach((layer, row) => {
      layer.forEach((node, col) => {
        positioned.push({ ...node, x: col * 220, y: row * 160 });
      });
    });
    return positioned;
  }

  static radial(nodes: GraphNodeModel[]): PositionedNode[] {
    const cx = 320;
    const cy = 240;
    const radius = Math.max(120, nodes.length * 28);
    return nodes.map((node, i) => {
      const angle = (i / Math.max(nodes.length, 1)) * Math.PI * 2;
      return {
        ...node,
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
      };
    });
  }

  static force(nodes: GraphNodeModel[]): PositionedNode[] {
    // Lightweight deterministic layout (no physics loop in UI tests).
    const positioned = this.radial(nodes);
    return positioned.map((node, i) => ({
      ...node,
      x: node.x + ((i % 3) - 1) * 24,
      y: node.y + (Math.floor(i / 3) % 2) * 18,
    }));
  }
}

export class GraphFilter {
  static byNodeType(nodes: GraphNodeModel[], types: string[]): GraphNodeModel[] {
    if (!types.length) return nodes;
    return nodes.filter((n) => types.includes(n.type));
  }

  static byEdgeType(edges: GraphEdgeModel[], types: string[]): GraphEdgeModel[] {
    if (!types.length) return edges;
    return edges.filter((e) => types.includes(e.type));
  }

  static connected(
    nodes: GraphNodeModel[],
    edges: GraphEdgeModel[],
    nodeIds: Set<string>,
  ): { nodes: GraphNodeModel[]; edges: GraphEdgeModel[] } {
    if (!nodeIds.size) return { nodes, edges };
    const keepEdges = edges.filter((e) => nodeIds.has(e.source) || nodeIds.has(e.target));
    const keepIds = new Set<string>();
    for (const e of keepEdges) {
      keepIds.add(e.source);
      keepIds.add(e.target);
    }
    for (const id of nodeIds) keepIds.add(id);
    return {
      nodes: nodes.filter((n) => keepIds.has(n.id)),
      edges: keepEdges,
    };
  }
}

export class GraphSearch {
  static nodes(nodes: GraphNodeModel[], query: string): GraphNodeModel[] {
    const q = query.trim().toLowerCase();
    if (!q) return nodes;
    return nodes.filter(
      (n) => n.label.toLowerCase().includes(q) || n.id.includes(q) || n.type.includes(q),
    );
  }

  static edges(edges: GraphEdgeModel[], query: string): GraphEdgeModel[] {
    const q = query.trim().toLowerCase();
    if (!q) return edges;
    return edges.filter(
      (e) => e.type.includes(q) || e.id.includes(q) || (e.label ?? "").toLowerCase().includes(q),
    );
  }
}

export class GraphSelection {
  static toggle(selected: string[], id: string, multi = false): string[] {
    if (multi) {
      return selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id];
    }
    return selected.includes(id) && selected.length === 1 ? [] : [id];
  }

  static clear(): string[] {
    return [];
  }
}

export class GraphNavigator {
  static neighbors(nodeId: string, edges: GraphEdgeModel[]): string[] {
    const ids = new Set<string>();
    for (const e of edges) {
      if (e.source === nodeId) ids.add(e.target);
      if (e.target === nodeId) ids.add(e.source);
    }
    return [...ids];
  }

  static expand(focusId: string, edges: GraphEdgeModel[], depth = 1): Set<string> {
    const visible = new Set<string>([focusId]);
    let frontier = [focusId];
    for (let d = 0; d < depth; d++) {
      const next: string[] = [];
      for (const id of frontier) {
        for (const n of this.neighbors(id, edges)) {
          if (!visible.has(n)) {
            visible.add(n);
            next.push(n);
          }
        }
      }
      frontier = next;
    }
    return visible;
  }
}

export class GraphManager {
  constructor(private document: GraphDocument) {}

  getDocument(): GraphDocument {
    return this.document;
  }

  setDocument(doc: GraphDocument) {
    this.document = doc;
  }

  visible(
    opts: {
      nodeTypes?: string[];
      edgeTypes?: string[];
      query?: string;
      focusId?: string | null;
      expanded?: boolean;
    } = {},
  ): { nodes: PositionedNode[]; edges: GraphEdgeModel[] } {
    let nodes = GraphBuilder.fromDocument(this.document).nodes;
    let edges = GraphBuilder.fromDocument(this.document).edges;

    if (opts.nodeTypes?.length) nodes = GraphFilter.byNodeType(nodes, opts.nodeTypes);
    if (opts.edgeTypes?.length) edges = GraphFilter.byEdgeType(edges, opts.edgeTypes);
    if (opts.query) {
      const matchedNodes = GraphSearch.nodes(nodes, opts.query);
      const matchedIds = new Set(matchedNodes.map((n) => n.id));
      const matchedEdges = GraphSearch.edges(edges, opts.query);
      for (const e of matchedEdges) {
        matchedIds.add(e.source);
        matchedIds.add(e.target);
      }
      ({ nodes, edges } = GraphFilter.connected(nodes, edges, matchedIds));
    }
    if (opts.focusId && opts.expanded === false) {
      const visibleIds = GraphNavigator.expand(opts.focusId, edges, 1);
      ({ nodes, edges } = GraphFilter.connected(nodes, edges, visibleIds));
    }

    return { nodes: GraphLayout.apply(nodes, "grid"), edges };
  }
}
