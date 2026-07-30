import { useWorkspaceStore } from "@/stores/workspaceStore";
import { Badge } from "@/components/ui";

export function WorkspaceSelector() {
  const current = useWorkspaceStore((s) => s.current);
  const select = useWorkspaceStore((s) => s.select);

  return (
    <button
      type="button"
      data-testid="workspace-selector"
      className="flex min-w-[160px] items-center gap-2 rounded-lg border border-line bg-canvas px-3 py-1.5 text-left text-sm hover:bg-canvas-elevated"
      onClick={() => select(current?.repoRoot ?? "/projects/adf")}
    >
      <Badge>WS</Badge>
      <div className="min-w-0">
        <div className="truncate font-medium">{current?.repoRoot ?? "Select workspace"}</div>
        <div className="truncate text-[11px] text-ink-muted">
          {current?.build ?? "BUILD-013"} · {current?.version ?? "0.13.0-alpha"}
        </div>
      </div>
    </button>
  );
}
