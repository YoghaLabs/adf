import { useEffect } from "react";
import { Card, Badge, Button } from "@/components/ui";
import { useProjectStore } from "@/stores/projectStore";
import { formatWhen } from "@/utils/cn";

export function ProjectsPage() {
  const load = useProjectStore((s) => s.load);
  const projects = useProjectStore((s) => s.projects);
  const selectedId = useProjectStore((s) => s.selectedId);
  const select = useProjectStore((s) => s.select);
  const selected = projects.find((p) => p.id === selectedId) ?? null;

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div data-testid="page-projects" className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="studio-muted mt-1">Project list and details via ProjectClient.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <Card className="p-2">
          <ul className="space-y-1">
            {projects.map((project) => (
              <li key={project.id}>
                <Button
                  variant={selectedId === project.id ? "accent" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => select(project.id)}
                >
                  {project.name}
                </Button>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          {selected ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{selected.name}</h2>
                <Badge>{selected.status}</Badge>
              </div>
              <p className="studio-muted">Version {selected.version}</p>
              <p className="text-sm">Updated {formatWhen(selected.updatedAt)}</p>
              <div>
                <h3 className="text-sm font-semibold">Recent Activity</h3>
                <ul className="mt-2 space-y-1 text-sm text-ink-muted">
                  <li>Loaded project info through SDK</li>
                  <li>No local business logic in Studio</li>
                </ul>
              </div>
            </div>
          ) : (
            <p className="studio-muted">Select a project</p>
          )}
        </Card>
      </div>
    </div>
  );
}
