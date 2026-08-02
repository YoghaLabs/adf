import { useEffect } from "react";
import { Button, Card } from "@/components/ui";
import { ProjectCard, ProjectTree } from "@/features/workspace/components";
import { useVisibleProjects } from "@/features/workspace/hooks/useProjectExplorer";
import { useProjectExplorerStore, useWorkspaceStore } from "@/features/workspace/stores";
import { useT } from "@/i18n";

const filters = ["all", "recent", "favorites", "pinned", "archived"] as const;

export function ProjectExplorerPage() {
  const t = useT();
  const activeId = useWorkspaceStore((s) => s.activeId);
  const loadWorkspace = useWorkspaceStore((s) => s.loadAll);
  const load = useProjectExplorerStore((s) => s.load);
  const tree = useProjectExplorerStore((s) => s.tree);
  const selectedId = useProjectExplorerStore((s) => s.selectedId);
  const select = useProjectExplorerStore((s) => s.select);
  const filter = useProjectExplorerStore((s) => s.filter);
  const setFilter = useProjectExplorerStore((s) => s.setFilter);
  const visible = useVisibleProjects();
  const selected = tree.find((p) => p.id === selectedId) ?? visible.find((p) => p.id === selectedId);

  useEffect(() => {
    void loadWorkspace().then(() => {
      const ws = useWorkspaceStore.getState().activeId;
      void load(ws ?? undefined);
    });
  }, [load, loadWorkspace]);

  useEffect(() => {
    if (activeId) void load(activeId);
  }, [activeId, load]);

  return (
    <div data-testid="page-projects" className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">{t("projects.title")}</h1>
        <p className="studio-muted mt-1">{t("projects.subtitle")}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button key={f} variant={filter === f ? "accent" : "outline"} onClick={() => setFilter(f)}>
            {f}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[240px_1fr_280px]">
        <Card data-testid="project-explorer-tree">
          <h3 className="mb-3 text-sm font-semibold">Project Tree</h3>
          <ProjectTree items={tree.filter((p) => !p.archived || filter === "archived")} selectedId={selectedId} onSelect={select} />
        </Card>

        <div className="space-y-3" data-testid="project-explorer-cards">
          <h3 className="text-sm font-semibold">Project Cards</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {visible.map((p) => (
              <ProjectCard key={p.id} project={p} selected={p.id === selectedId} onSelect={select} />
            ))}
          </div>
        </div>

        <Card data-testid="project-status">
          <h3 className="mb-3 text-sm font-semibold">Project Status</h3>
          {selected ? (
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="studio-muted">Name</dt>
                <dd>{selected.name}</dd>
              </div>
              <div>
                <dt className="studio-muted">Status</dt>
                <dd>{selected.status}</dd>
              </div>
              <div>
                <dt className="studio-muted">Version</dt>
                <dd>{selected.version}</dd>
              </div>
              <div>
                <dt className="studio-muted">Path</dt>
                <dd className="font-mono text-xs">{selected.path}</dd>
              </div>
            </dl>
          ) : (
            <p className="studio-muted text-sm">Select a project</p>
          )}
        </Card>
      </div>
    </div>
  );
}
