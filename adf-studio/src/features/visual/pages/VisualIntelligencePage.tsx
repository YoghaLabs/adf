import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Input } from "@/components/ui";
import { VisualOverviewWidget } from "@/features/visual/widgets";
import { studioSdk } from "@/sdk";
import type { GraphSearchHit, VisualOverview } from "@/features/visual/types";

export function VisualIntelligencePage() {
  const [overview, setOverview] = useState<VisualOverview | null>(null);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<GraphSearchHit[]>([]);

  useEffect(() => {
    void studioSdk.visualization.overview().then((r) => {
      if (r.ok) setOverview(r.data);
    });
  }, []);

  return (
    <div data-testid="page-visual" className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Visual Intelligence</h1>
        <p className="studio-muted mt-1">
          Interactive read-only graphs for workspace, projects, knowledge, dependencies, runtime, and more.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <VisualOverviewWidget
          title="Workspace Overview"
          nodeCount={overview?.graphs.find((g) => g.kind === "workspace")?.nodeCount ?? 0}
          edgeCount={overview?.graphs.find((g) => g.kind === "workspace")?.edgeCount ?? 0}
          to="/visual/workspace"
        />
        <VisualOverviewWidget
          title="Project Overview"
          nodeCount={overview?.graphs.find((g) => g.kind === "project")?.nodeCount ?? 0}
          edgeCount={overview?.graphs.find((g) => g.kind === "project")?.edgeCount ?? 0}
          to="/visual/project"
        />
        <VisualOverviewWidget
          title="Dependency Overview"
          nodeCount={overview?.graphs.find((g) => g.kind === "dependency")?.nodeCount ?? 0}
          edgeCount={overview?.graphs.find((g) => g.kind === "dependency")?.edgeCount ?? 0}
          to="/visual/dependency"
        />
        <VisualOverviewWidget
          title="Runtime Overview"
          nodeCount={overview?.graphs.find((g) => g.kind === "runtime")?.nodeCount ?? 0}
          edgeCount={overview?.graphs.find((g) => g.kind === "runtime")?.edgeCount ?? 0}
          to="/visual/runtime"
        />
        <VisualOverviewWidget
          title="Knowledge Overview"
          nodeCount={overview?.graphs.find((g) => g.kind === "knowledge")?.nodeCount ?? 0}
          edgeCount={overview?.graphs.find((g) => g.kind === "knowledge")?.edgeCount ?? 0}
          to="/visual/knowledge"
        />
        <VisualOverviewWidget
          title="Session Overview"
          nodeCount={overview?.graphs.find((g) => g.kind === "session")?.nodeCount ?? 0}
          edgeCount={overview?.graphs.find((g) => g.kind === "session")?.edgeCount ?? 0}
          to="/visual/session"
        />
      </div>

      <Card>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold">Graph Catalog</h2>
          <div className="text-xs text-ink-muted">
            {overview?.totals.graphs ?? 0} graphs · {overview?.totals.nodes ?? 0} nodes ·{" "}
            {overview?.totals.edges ?? 0} edges
          </div>
        </div>
        <ul className="grid gap-2 md:grid-cols-2">
          {(overview?.graphs ?? []).map((g) => (
            <li key={g.kind}>
              <Link className="flex items-center justify-between rounded-lg border border-line px-3 py-2 text-sm hover:bg-canvas-elevated" to={`/visual/${g.kind}`}>
                <span>{g.title}</span>
                <span className="text-xs text-ink-muted">
                  {g.nodeCount}n / {g.edgeCount}e
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      <Card data-testid="graph-search-panel">
        <h2 className="mb-3 text-sm font-semibold">Graph Search</h2>
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search nodes, relationships…"
            aria-label="Visual graph search"
          />
          <Button
            variant="accent"
            onClick={() => {
              void studioSdk.visualization.search(query).then((r) => {
                if (r.ok) setHits(r.data.hits);
              });
            }}
          >
            Search
          </Button>
        </div>
        <ul className="mt-3 space-y-1 text-sm">
          {hits.slice(0, 12).map((hit) => (
            <li key={hit.id} className="flex justify-between gap-2 border-b border-line py-1">
              <Link to={`/visual/${hit.graphKind}`}>{hit.label}</Link>
              <span className="text-xs text-ink-muted">
                {hit.kind} · {hit.graphKind}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
