import { useEffect, useMemo } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AdfGraphNode } from "@/features/visual/nodes/AdfGraphNode";
import { AdfGraphEdge } from "@/features/visual/edges/AdfGraphEdge";
import { GraphRenderer } from "@/features/visual/graphs/GraphRenderer";
import { GraphLayout, type PositionedNode } from "@/features/visual/graphs/engine";
import type { GraphEdgeModel, LayoutMode } from "@/features/visual/types";

const nodeTypes = { adf: AdfGraphNode };
const edgeTypes = { adf: AdfGraphEdge };

function FitViewOnLoad({ token }: { token: string }) {
  const { fitView } = useReactFlow();
  useEffect(() => {
    const t = window.setTimeout(() => {
      void fitView({ padding: 0.2 });
    }, 50);
    return () => window.clearTimeout(t);
  }, [fitView, token]);
  return null;
}

function GraphCanvasInner({
  nodesModel,
  edgesModel,
  layout,
  selectedIds,
  highlightedIds,
  onSelect,
}: {
  nodesModel: PositionedNode[];
  edgesModel: GraphEdgeModel[];
  layout: LayoutMode;
  selectedIds: string[];
  highlightedIds: string[];
  onSelect: (ids: string[], multi: boolean) => void;
}) {
  const positioned = useMemo(
    () => GraphLayout.apply(nodesModel, layout),
    [nodesModel, layout],
  );
  const initialNodes = useMemo(
    () => GraphRenderer.toFlowNodes(positioned, selectedIds, highlightedIds),
    [positioned, selectedIds, highlightedIds],
  );
  const initialEdges = useMemo(
    () => GraphRenderer.toFlowEdges(edgesModel, highlightedIds),
    [edgesModel, highlightedIds],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialEdges, initialNodes, setEdges, setNodes]);

  return (
    <div data-testid="graph-canvas" className="h-[520px] w-full overflow-hidden rounded-xl border border-line">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        minZoom={0.2}
        maxZoom={2}
        onNodeClick={(_event, node: Node) => {
          onSelect([node.id], _event.metaKey || _event.ctrlKey || _event.shiftKey);
        }}
        onPaneClick={() => onSelect([], false)}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={18} />
        <Controls showInteractive={false} />
        <MiniMap pannable zoomable className="!bg-canvas-elevated" />
        <FitViewOnLoad token={`${layout}-${nodesModel.length}-${selectedIds.join(",")}`} />
      </ReactFlow>
    </div>
  );
}

export function GraphCanvas(props: {
  nodesModel: PositionedNode[];
  edgesModel: GraphEdgeModel[];
  layout: LayoutMode;
  selectedIds: string[];
  highlightedIds: string[];
  onSelect: (ids: string[], multi: boolean) => void;
}) {
  return (
    <ReactFlowProvider>
      <GraphCanvasInner {...props} />
    </ReactFlowProvider>
  );
}

export type { Edge };
