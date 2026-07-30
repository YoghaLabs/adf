import { Button, Input } from "@/components/ui";
import type { GraphKind, LayoutMode } from "@/features/visual/types";
import { useFilterStore, useLayoutStore, useSelectionStore } from "@/features/visual/stores";

const LAYOUTS: LayoutMode[] = ["force", "tree", "grid", "hierarchical", "radial"];

const GRAPH_KINDS: { id: GraphKind; label: string }[] = [
  { id: "knowledge", label: "Knowledge" },
  { id: "dependency", label: "Dependency" },
  { id: "project", label: "Project" },
  { id: "workspace", label: "Workspace" },
  { id: "context", label: "Context" },
  { id: "session", label: "Session" },
  { id: "runtime", label: "Runtime" },
  { id: "package", label: "Package" },
  { id: "plugin", label: "Plugin" },
  { id: "release", label: "Release" },
];

export function GraphToolbar({
  kind,
  onKindChange,
}: {
  kind: GraphKind;
  onKindChange: (kind: GraphKind) => void;
}) {
  const mode = useLayoutStore((s) => s.mode);
  const setMode = useLayoutStore((s) => s.setMode);
  const query = useFilterStore((s) => s.query);
  const setQuery = useFilterStore((s) => s.setQuery);
  const clearFilter = useFilterStore((s) => s.clear);
  const clearSelection = useSelectionStore((s) => s.clear);
  const expanded = useFilterStore((s) => s.expanded);
  const setExpanded = useFilterStore((s) => s.setExpanded);

  return (
    <div data-testid="graph-toolbar" className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {GRAPH_KINDS.map((g) => (
          <Button
            key={g.id}
            variant={kind === g.id ? "accent" : "outline"}
            onClick={() => onKindChange(g.id)}
          >
            {g.label}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase text-ink-muted">Layout</span>
        {LAYOUTS.map((layout) => (
          <Button
            key={layout}
            variant={mode === layout ? "accent" : "outline"}
            onClick={() => setMode(layout)}
          >
            {layout}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter / search nodes & relationships"
          aria-label="Graph search"
          className="max-w-md"
        />
        <Button variant="outline" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Collapse" : "Expand"}
        </Button>
        <Button variant="ghost" onClick={() => clearFilter()}>
          Clear Filter
        </Button>
        <Button variant="ghost" onClick={() => clearSelection()}>
          Clear Selection
        </Button>
      </div>
    </div>
  );
}

export { GRAPH_KINDS };
