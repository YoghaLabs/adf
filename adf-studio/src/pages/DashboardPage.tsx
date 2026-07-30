import { useEffect } from "react";
import { StatWidget, ListWidget } from "@/widgets/DashboardWidgets";
import { useMarketplaceStore } from "@/stores/marketplaceStore";
import { useProjectStore } from "@/stores/projectStore";
import { useRuntimeStore } from "@/stores/runtimeStore";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { studioConfig } from "@/config/studio";
import { studioSdk } from "@/sdk";
import { useState } from "react";
import type { MarketplaceItem } from "@/types/studio";

export function DashboardPage() {
  const loadWorkspace = useWorkspaceStore((s) => s.load);
  const workspace = useWorkspaceStore((s) => s.current);
  const loadProjects = useProjectStore((s) => s.load);
  const projects = useProjectStore((s) => s.projects);
  const refreshRuntime = useRuntimeStore((s) => s.refresh);
  const runtime = useRuntimeStore((s) => s.status);
  const browseMarket = useMarketplaceStore((s) => s.browse);
  const featured = useMarketplaceStore((s) => s.featured);
  const [installed, setInstalled] = useState<MarketplaceItem[]>([]);

  useEffect(() => {
    void loadWorkspace();
    void loadProjects();
    void refreshRuntime();
    void browseMarket();
    void studioSdk.packages.listInstalled().then((r) => {
      setInstalled((r.data.packages as MarketplaceItem[]) ?? []);
    });
  }, [browseMarket, loadProjects, loadWorkspace, refreshRuntime]);

  return (
    <div data-testid="page-dashboard" className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="studio-muted mt-1">
          ADF Desktop Control Center — UI only; all actions go through the SDK.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatWidget title="Version" value={studioConfig.version} hint={studioConfig.build} />
        <StatWidget
          title="Runtime Status"
          value={runtime?.ok ? "Healthy" : "…"}
          hint={`${runtime?.plugins ?? 0} plugins`}
        />
        <StatWidget
          title="Release Channel"
          value="alpha"
          hint={workspace?.branch ?? "develop"}
        />
        <StatWidget
          title="Installed Packages"
          value={installed.length}
          hint="via PackageClient"
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ListWidget
          title="Recent Projects"
          items={projects.map((p) => ({ id: p.id, label: p.name, meta: p.status }))}
        />
        <ListWidget
          title="Marketplace Updates"
          items={featured.map((i) => ({ id: i.id, label: i.name, meta: i.version }))}
        />
        <ListWidget
          title="Recent Sessions"
          items={[
            { id: "s1", label: "Resume protocol", meta: "skeleton" },
            { id: "s2", label: "Architecture review", meta: "idle" },
          ]}
        />
        <ListWidget
          title="Knowledge Overview"
          items={[
            { id: "k1", label: "ADR Index", meta: "ready" },
            { id: "k2", label: "Context packs", meta: "quick/standard/deep" },
          ]}
        />
      </div>
    </div>
  );
}
