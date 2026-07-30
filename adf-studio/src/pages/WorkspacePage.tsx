import { useEffect } from "react";
import { Card, Badge } from "@/components/ui";
import { useWorkspaceStore } from "@/stores/workspaceStore";

export function WorkspacePage() {
  const load = useWorkspaceStore((s) => s.load);
  const current = useWorkspaceStore((s) => s.current);
  const loading = useWorkspaceStore((s) => s.loading);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div data-testid="page-workspace" className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Workspace</h1>
        <p className="studio-muted mt-1">Selector, summary, and settings via WorkspaceClient.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="text-sm font-semibold">Workspace Summary</h2>
          {loading && <p className="studio-muted mt-2">Loading…</p>}
          {current && (
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="studio-muted">Root</dt>
                <dd className="font-mono text-sm">{current.repoRoot}</dd>
              </div>
              <div>
                <dt className="studio-muted">Version</dt>
                <dd>{current.version}</dd>
              </div>
              <div>
                <dt className="studio-muted">Build</dt>
                <dd>{current.build}</dd>
              </div>
              <div>
                <dt className="studio-muted">Branch</dt>
                <dd>{current.branch}</dd>
              </div>
            </dl>
          )}
        </Card>
        <Card>
          <h2 className="text-sm font-semibold">Workspace Settings</h2>
          <div className="mt-3 space-y-2">
            <Badge>Read-only in BUILD-013</Badge>
            <p className="studio-muted">
              Settings persist through SettingsStore; mutations call SDK later.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
