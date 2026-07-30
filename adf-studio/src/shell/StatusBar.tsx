import { studioConfig } from "@/config/studio";
import { useRuntimeStore } from "@/stores/runtimeStore";
import { useWorkspaceStore } from "@/stores/workspaceStore";

export function StatusBar() {
  const runtime = useRuntimeStore((s) => s.status);
  const workspace = useWorkspaceStore((s) => s.current);

  return (
    <footer
      data-testid="studio-statusbar"
      className="flex h-8 items-center justify-between border-t border-line bg-canvas-elevated/80 px-4 text-[11px] text-ink-muted"
    >
      <div className="flex items-center gap-3">
        <span>{studioConfig.name}</span>
        <span>{studioConfig.version}</span>
        <span>{studioConfig.build}</span>
      </div>
      <div className="flex items-center gap-3">
        <span>{workspace?.branch ?? "develop"}</span>
        <span>
          Runtime {runtime?.ok ? "healthy" : "unknown"} · plugins {runtime?.plugins ?? 0}
        </span>
      </div>
    </footer>
  );
}
