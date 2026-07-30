import { Card } from "@/components/ui";
import {
  HealthIndicator,
  LiveStatusBadge,
} from "@/features/runtime/widgets";
import type { RuntimeOverview } from "@/features/runtime/types";

export function RuntimeOverviewCards({ overview }: { overview: RuntimeOverview | null }) {
  return (
    <div data-testid="runtime-overview" className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
      <Card>
        <div className="studio-muted text-xs">Engine Status</div>
        <div className="mt-2 flex items-center gap-2">
          <HealthIndicator level={overview?.engineStatus ?? "unknown"} />
          <LiveStatusBadge live={overview?.live ?? false} />
        </div>
        <div className="mt-2 text-xs text-ink-muted">
          {overview?.packageVersion} · {overview?.engineBuild}
        </div>
      </Card>
      <Card>
        <div className="studio-muted text-xs">Current Session</div>
        <div className="mt-2 font-semibold">{overview?.currentSessionTitle ?? "—"}</div>
        <div className="mt-1 font-mono text-xs text-ink-muted">{overview?.currentSessionId ?? ""}</div>
      </Card>
      <Card>
        <div className="studio-muted text-xs">Active Workspace</div>
        <div className="mt-2 font-semibold">{overview?.activeWorkspaceName ?? "—"}</div>
        <div className="mt-1 font-mono text-xs text-ink-muted">{overview?.activeWorkspaceId ?? ""}</div>
      </Card>
      <Card>
        <div className="studio-muted text-xs">Current Project</div>
        <div className="mt-2 font-semibold">{overview?.currentProjectName ?? "—"}</div>
        <div className="mt-1 font-mono text-xs text-ink-muted">{overview?.currentProjectId ?? ""}</div>
      </Card>
      <Card>
        <div className="studio-muted text-xs">Runtime Health</div>
        <div className="mt-2 text-2xl font-semibold capitalize">{overview?.engineStatus ?? "unknown"}</div>
        <div className="mt-1 text-xs text-ink-muted">
          Updated {overview ? new Date(overview.updatedAt).toLocaleTimeString() : "—"}
        </div>
      </Card>
    </div>
  );
}
