import type { Node, Edge } from "@xyflow/react";
import type { GraphEdgeModel, LayoutMode } from "@/features/visual/types";
import { GraphLayout, type PositionedNode } from "@/features/visual/graphs/engine";

/** Maps domain presentation models → React Flow nodes/edges (UI only). */
export class GraphRenderer {
  static toFlowNodes(
    nodes: PositionedNode[],
    selectedIds: string[],
    highlightedIds: string[],
  ): Node[] {
    return nodes.map((node) => ({
      id: node.id,
      type: "adf",
      position: { x: node.x, y: node.y },
      data: {
        label: node.label,
        nodeType: node.type,
        meta: node.meta,
        highlighted: highlightedIds.includes(node.id),
      },
      selected: selectedIds.includes(node.id),
    }));
  }

  static toFlowEdges(edges: GraphEdgeModel[], highlightedIds: string[]): Edge[] {
    return edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label ?? edge.type,
      type: "adf",
      data: { edgeType: edge.type, highlighted: highlightedIds.includes(edge.id) },
      animated: highlightedIds.includes(edge.id),
    }));
  }

  static layoutNodes(nodes: PositionedNode[], mode: LayoutMode): PositionedNode[] {
    return GraphLayout.apply(nodes, mode);
  }
}
