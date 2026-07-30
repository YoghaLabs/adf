import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { Badge } from "@/components/ui";

export function WorkspaceSelector() {
  const navigate = useNavigate();
  const loadAll = useWorkspaceStore((s) => s.loadAll);
  const profile = useWorkspaceStore((s) => s.profile);
  const current = useWorkspaceStore((s) => s.current);

  useEffect(() => {
    if (!profile) void loadAll();
  }, [loadAll, profile]);

  return (
    <button
      type="button"
      data-testid="workspace-selector"
      className="flex min-w-[160px] items-center gap-2 rounded-lg border border-line bg-canvas px-3 py-1.5 text-left text-sm hover:bg-canvas-elevated"
      onClick={() => navigate("/workspace")}
    >
      <Badge>WS</Badge>
      <div className="min-w-0">
        <div className="truncate font-medium">{profile?.name ?? current?.repoRoot ?? "Select workspace"}</div>
        <div className="truncate text-[11px] text-ink-muted">
          {current?.build ?? "BUILD-016"} · {current?.version ?? "0.16.0-alpha"}
        </div>
      </div>
    </button>
  );
}
