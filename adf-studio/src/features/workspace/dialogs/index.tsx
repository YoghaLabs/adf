import { Button, Input } from "@/components/ui";

export function SwitchWorkspaceDialog({
  open,
  onClose,
  workspaces,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  workspaces: { id: string; name: string }[];
  onConfirm: (id: string) => void;
}) {
  if (!open) return null;
  return (
    <div
      data-testid="dialog-switch-workspace"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="studio-panel w-full max-w-md p-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold">Switch Workspace</h2>
        <p className="studio-muted mt-1 text-sm">Select a workspace via SDK switch.</p>
        <ul className="mt-4 space-y-2">
          {workspaces.map((ws) => (
            <li key={ws.id}>
              <Button className="w-full justify-start" variant="outline" onClick={() => onConfirm(ws.id)}>
                {ws.name}
              </Button>
            </li>
          ))}
        </ul>
        <Button className="mt-4" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export function WorkspaceSearchDialog({
  open,
  query,
  onQueryChange,
  onSearch,
  onClose,
}: {
  open: boolean;
  query: string;
  onQueryChange: (q: string) => void;
  onSearch: () => void;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div
      data-testid="dialog-workspace-search"
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 p-24 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="studio-panel w-full max-w-lg p-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-3 text-lg font-semibold">Workspace Search</h2>
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search projects, sessions…"
            aria-label="Workspace search"
          />
          <Button variant="accent" onClick={onSearch}>
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
