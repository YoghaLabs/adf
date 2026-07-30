import type {
  GraphDocument,
  GraphEdgeModel,
  GraphKind,
  GraphNodeModel,
  GraphSearchHit,
  VisualOverview,
} from "@/features/visual/types";

function n(
  id: string,
  type: GraphNodeModel["type"],
  label: string,
  kind: GraphKind,
  meta?: string,
): GraphNodeModel {
  return { id, type, label, kind, meta };
}

function e(
  id: string,
  source: string,
  target: string,
  type: GraphEdgeModel["type"],
  label?: string,
): GraphEdgeModel {
  return { id, source, target, type, label };
}

const GRAPHS: Record<GraphKind, GraphDocument> = {
  workspace: {
    id: "graph-workspace",
    kind: "workspace",
    title: "Workspace Graph",
    nodes: [
      n("ws-adf", "workspace", "ADF Platform", "workspace", "primary"),
      n("ws-labs", "workspace", "YoghaLabs", "workspace", "sandbox"),
      n("proj-adf", "project", "ADF", "workspace"),
      n("proj-studio", "project", "ADF Studio", "workspace"),
    ],
    edges: [
      e("e-ws-1", "ws-adf", "proj-adf", "contains"),
      e("e-ws-2", "ws-adf", "proj-studio", "contains"),
      e("e-ws-3", "ws-labs", "proj-adf", "references"),
    ],
  },
  project: {
    id: "graph-project",
    kind: "project",
    title: "Project Graph",
    nodes: [
      n("proj-adf", "project", "ADF", "project", "active"),
      n("proj-studio", "project", "ADF Studio", "project"),
      n("proj-core", "project", "adf-core", "project"),
      n("sess-001", "session", "BUILD-015", "project"),
    ],
    edges: [
      e("e-p1", "proj-adf", "proj-core", "contains"),
      e("e-p2", "proj-adf", "proj-studio", "contains"),
      e("e-p3", "proj-adf", "sess-001", "creates"),
    ],
  },
  knowledge: {
    id: "graph-knowledge",
    kind: "knowledge",
    title: "Knowledge Graph",
    nodes: [
      n("k-adr", "knowledge", "ADR Index", "knowledge"),
      n("k-arch", "knowledge", "Architecture", "knowledge"),
      n("k-ctx", "context", "Context Pack", "knowledge"),
      n("k-mem", "knowledge", "Memory", "knowledge"),
      n("k-ws", "workspace", "ADF Platform", "knowledge"),
    ],
    edges: [
      e("e-k1", "k-ws", "k-adr", "contains"),
      e("e-k2", "k-adr", "k-arch", "references"),
      e("e-k3", "k-arch", "k-ctx", "uses"),
      e("e-k4", "k-ctx", "k-mem", "extends"),
    ],
  },
  dependency: {
    id: "graph-dependency",
    kind: "dependency",
    title: "Dependency Graph",
    nodes: [
      n("pkg-core", "package", "demo-core", "dependency", "1.0.0"),
      n("pkg-tmpl", "package", "demo-template", "dependency", "1.1.0"),
      n("proj-adf", "project", "ADF", "dependency"),
      n("plug-a", "plugin", "demo-plugin", "dependency"),
    ],
    edges: [
      e("e-d1", "proj-adf", "pkg-core", "depends_on"),
      e("e-d2", "proj-adf", "pkg-tmpl", "depends_on"),
      e("e-d3", "pkg-core", "plug-a", "loads"),
      e("e-d4", "pkg-tmpl", "pkg-core", "imports"),
    ],
  },
  context: {
    id: "graph-context",
    kind: "context",
    title: "Context Graph",
    nodes: [
      n("ctx-boot", "context", "Boot Pack", "context"),
      n("ctx-resume", "context", "Resume Pack", "context"),
      n("ctx-adr", "knowledge", "ADR-013", "context"),
      n("sess-001", "session", "Active Session", "context"),
    ],
    edges: [
      e("e-c1", "sess-001", "ctx-boot", "loads"),
      e("e-c2", "sess-001", "ctx-resume", "uses"),
      e("e-c3", "ctx-resume", "ctx-adr", "references"),
    ],
  },
  session: {
    id: "graph-session",
    kind: "session",
    title: "Session Graph",
    nodes: [
      n("sess-001", "session", "BUILD-015 visual", "session", "active"),
      n("sess-002", "session", "Resume review", "session", "idle"),
      n("proj-adf", "project", "ADF", "session"),
      n("ws-adf", "workspace", "ADF Platform", "session"),
    ],
    edges: [
      e("e-s1", "ws-adf", "proj-adf", "contains"),
      e("e-s2", "proj-adf", "sess-001", "creates"),
      e("e-s3", "proj-adf", "sess-002", "creates"),
      e("e-s4", "sess-002", "sess-001", "updates"),
    ],
  },
  runtime: {
    id: "graph-runtime",
    kind: "runtime",
    title: "Runtime Graph",
    nodes: [
      n("rt-engine", "runtime", "RuntimeEngine", "runtime"),
      n("plug-a", "plugin", "demo-plugin", "runtime"),
      n("pkg-core", "package", "demo-core", "runtime"),
      n("svc-layer", "runtime", "Service Layer", "runtime"),
    ],
    edges: [
      e("e-r1", "rt-engine", "svc-layer", "loads"),
      e("e-r2", "rt-engine", "plug-a", "loads"),
      e("e-r3", "plug-a", "pkg-core", "uses"),
    ],
  },
  package: {
    id: "graph-package",
    kind: "package",
    title: "Package Graph",
    nodes: [
      n("pkg-core", "package", "demo-core", "package"),
      n("pkg-tmpl", "package", "demo-template", "package"),
      n("reg-local", "registry", "Local Registry", "package"),
      n("mkt", "marketplace", "Marketplace", "package"),
    ],
    edges: [
      e("e-pk1", "reg-local", "pkg-core", "contains"),
      e("e-pk2", "reg-local", "pkg-tmpl", "contains"),
      e("e-pk3", "mkt", "reg-local", "references"),
      e("e-pk4", "pkg-tmpl", "pkg-core", "depends_on"),
    ],
  },
  plugin: {
    id: "graph-plugin",
    kind: "plugin",
    title: "Plugin Graph",
    nodes: [
      n("plug-a", "plugin", "demo-plugin", "plugin"),
      n("rt-engine", "runtime", "RuntimeEngine", "plugin"),
      n("tmpl-gen", "template", "generic", "plugin"),
    ],
    edges: [
      e("e-pl1", "rt-engine", "plug-a", "loads"),
      e("e-pl2", "plug-a", "tmpl-gen", "extends"),
      e("e-pl3", "plug-a", "tmpl-gen", "inherits"),
    ],
  },
  release: {
    id: "graph-release",
    kind: "release",
    title: "Release Graph",
    nodes: [
      n("rel-013", "release", "0.13.0-alpha", "release"),
      n("rel-014", "release", "0.14.0-alpha", "release"),
      n("rel-015", "release", "0.15.0-alpha", "release"),
      n("ch-alpha", "release", "alpha channel", "release"),
    ],
    edges: [
      e("e-re1", "rel-013", "rel-014", "updates"),
      e("e-re2", "rel-014", "rel-015", "updates"),
      e("e-re3", "ch-alpha", "rel-015", "contains"),
      e("e-re4", "ch-alpha", "rel-014", "contains"),
    ],
  },
};

export function listGraphKinds(): GraphKind[] {
  return Object.keys(GRAPHS) as GraphKind[];
}

export function getGraphDocument(kind: GraphKind): GraphDocument {
  return GRAPHS[kind];
}

export function getAllGraphs(): GraphDocument[] {
  return listGraphKinds().map((k) => GRAPHS[k]);
}

export function getVisualOverview(): VisualOverview {
  const graphs = getAllGraphs().map((g) => ({
    kind: g.kind,
    title: g.title,
    nodeCount: g.nodes.length,
    edgeCount: g.edges.length,
  }));
  return {
    graphs,
    totals: {
      graphs: graphs.length,
      nodes: graphs.reduce((a, g) => a + g.nodeCount, 0),
      edges: graphs.reduce((a, g) => a + g.edgeCount, 0),
    },
  };
}

export function searchGraphDocs(query: string, scope: "node" | "edge" | "relationship" | "all" = "all"): GraphSearchHit[] {
  const q = query.trim().toLowerCase();
  const hits: GraphSearchHit[] = [];
  for (const graph of getAllGraphs()) {
    if (scope === "all" || scope === "node") {
      for (const node of graph.nodes) {
        if (!q || node.label.toLowerCase().includes(q) || node.id.includes(q) || node.type.includes(q)) {
          hits.push({
            id: `node:${graph.kind}:${node.id}`,
            kind: "node",
            label: node.label,
            graphKind: graph.kind,
            nodeId: node.id,
            meta: node.type,
          });
        }
      }
    }
    if (scope === "all" || scope === "edge" || scope === "relationship") {
      for (const edge of graph.edges) {
        const label = edge.label ?? edge.type;
        if (!q || label.includes(q) || edge.type.includes(q) || edge.id.includes(q)) {
          hits.push({
            id: `edge:${graph.kind}:${edge.id}`,
            kind: scope === "relationship" ? "relationship" : "edge",
            label: `${edge.source} —${edge.type}→ ${edge.target}`,
            graphKind: graph.kind,
            edgeId: edge.id,
            meta: edge.type,
          });
        }
      }
    }
  }
  return hits;
}
