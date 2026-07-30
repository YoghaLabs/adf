/** Visual Intelligence types — presentation contracts only (BUILD-015). */

export type GraphKind =
  | "knowledge"
  | "dependency"
  | "project"
  | "workspace"
  | "context"
  | "session"
  | "runtime"
  | "package"
  | "plugin"
  | "release";

export type GraphNodeType =
  | "workspace"
  | "project"
  | "session"
  | "knowledge"
  | "context"
  | "runtime"
  | "plugin"
  | "package"
  | "template"
  | "release"
  | "registry"
  | "marketplace";

export type GraphEdgeType =
  | "depends_on"
  | "contains"
  | "extends"
  | "imports"
  | "uses"
  | "loads"
  | "installs"
  | "references"
  | "creates"
  | "updates"
  | "inherits";

export type LayoutMode = "force" | "tree" | "grid" | "hierarchical" | "radial";

export type GraphNodeModel = {
  id: string;
  type: GraphNodeType;
  label: string;
  kind: GraphKind;
  meta?: string;
  group?: string;
};

export type GraphEdgeModel = {
  id: string;
  source: string;
  target: string;
  type: GraphEdgeType;
  label?: string;
};

export type GraphDocument = {
  id: string;
  kind: GraphKind;
  title: string;
  nodes: GraphNodeModel[];
  edges: GraphEdgeModel[];
};

export type GraphSearchHit = {
  id: string;
  kind: "node" | "edge" | "relationship";
  label: string;
  graphKind: GraphKind;
  nodeId?: string;
  edgeId?: string;
  meta?: string;
};

export type VisualOverview = {
  graphs: { kind: GraphKind; title: string; nodeCount: number; edgeCount: number }[];
  totals: { nodes: number; edges: number; graphs: number };
};
