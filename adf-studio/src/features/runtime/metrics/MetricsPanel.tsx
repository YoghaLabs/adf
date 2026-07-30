import { Card } from "@/components/ui";
import { CounterWidget, MiniChart, ProgressBar } from "@/features/runtime/widgets";
import type { MetricSeriesPoint, RuntimeMetrics } from "@/features/runtime/types";

export function MetricsPanel({
  metrics,
  series,
}: {
  metrics: RuntimeMetrics | null;
  series: MetricSeriesPoint[];
}) {
  const tokenPct = metrics
    ? Math.round((metrics.tokenUsed / Math.max(1, metrics.tokenBudget)) * 100)
    : 0;

  return (
    <div data-testid="metrics-panel" className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <CounterWidget title="Token Budget" value={metrics?.tokenBudget ?? "—"} hint={`${metrics?.tokenUsed ?? 0} used`} />
        <CounterWidget title="Prompt Count" value={metrics?.promptCount ?? "—"} />
        <CounterWidget title="Context Size" value={metrics?.contextSize ?? "—"} hint="packs" />
        <CounterWidget title="Memory Usage" value={metrics ? `${metrics.memoryUsageMb} MB` : "—"} />
        <CounterWidget title="Queue Size" value={metrics?.queueSize ?? "—"} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <CounterWidget title="Plugin Count" value={metrics?.pluginCount ?? "—"} />
        <CounterWidget title="Package Count" value={metrics?.packageCount ?? "—"} />
        <CounterWidget title="Knowledge Count" value={metrics?.knowledgeCount ?? "—"} />
        <CounterWidget title="Execution Time" value={metrics ? `${metrics.executionTimeMs} ms` : "—"} />
        <Card>
          <div className="studio-muted mb-2 text-xs">Token Usage</div>
          <ProgressBar value={tokenPct} label="budget" />
        </Card>
      </div>
      <Card>
        <div className="mb-2 text-sm font-semibold">Prompt Activity</div>
        <MiniChart points={series} />
      </Card>
    </div>
  );
}
