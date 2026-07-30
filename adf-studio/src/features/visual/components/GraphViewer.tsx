import { useEffect } from "react";
import { Card } from "@/components/ui";
import { GraphCanvas } from "@/features/visual/canvas/GraphCanvas";
import { GraphToolbar } from "@/features/visual/components/GraphToolbar";
import {
  useFilterStore,
  useGraphStore,
  useLayoutStore,
  useSelectionStore,
} from "@/features/visual/stores";
import type { GraphKind } from "@/features/visual/types";

export function GraphViewer({
  initialKind,
  title,
  testId,
}: {
  initialKind: GraphKind;
  title: string;
  testId: string;
}) {
  const kind = useGraphStore((s) => s.kind);
  const load = useGraphStore((s) => s.load);
  const nodes = useGraphStore((s) => s.nodes);
  const edges = useGraphStore((s) => s.edges);
  const loading = useGraphStore((s) => s.loading);
  const document = useGraphStore((s) => s.document);
  const layout = useLayoutStore((s) => s.mode);
  const selectedIds = useSelectionStore((s) => s.selectedIds);
  const highlightedIds = useSelectionStore((s) => s.highlightedIds);
  const select = useSelectionStore((s) => s.select);
  const query = useFilterStore((s) => s.query);

  useEffect(() => {
    void load(initialKind);
  }, [initialKind, load]);

  useEffect(() => {
    if (query) {
      useSelectionStore.getState().highlight(nodes.map((n) => n.id));
    } else {
      useSelectionStore.getState().highlight([]);
    }
  }, [nodes, query]);

  return (
    <div data-testid={testId} className="space-y-4">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="studio-muted mt-1">
          Read-only visualization — data via SDK; rendering is UI-only (React Flow).
        </p>
      </div>
      <GraphToolbar kind={kind} onKindChange={(k) => void load(k)} />
      {loading && <p className="studio-muted text-sm">Loading graph…</p>}
      <div className="grid gap-4 lg:grid-cols-[1fr_240px]">
        <GraphCanvas
          nodesModel={nodes}
          edgesModel={edges}
          layout={layout}
          selectedIds={selectedIds}
          highlightedIds={highlightedIds}
          onSelect={(ids, multi) => select(ids, multi)}
        />
        <Card data-testid="graph-inspector">
          <h3 className="mb-2 text-sm font-semibold">Inspector</h3>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="studio-muted">Graph</dt>
              <dd>{document?.title ?? "—"}</dd>
            </div>
            <div>
              <dt className="studio-muted">Nodes</dt>
              <dd>{nodes.length}</dd>
            </div>
            <div>
              <dt className="studio-muted">Edges</dt>
              <dd>{edges.length}</dd>
            </div>
            <div>
              <dt className="studio-muted">Selected</dt>
              <dd>{selectedIds.join(", ") || "—"}</dd>
            </div>
            <div>
              <dt className="studio-muted">Layout</dt>
              <dd>{layout}</dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  );
}
