import { Badge, Card } from "@/components/ui";
import { cn } from "@/utils/cn";
import type { HealthLevel } from "@/features/runtime/types";

export function HealthIndicator({ level }: { level: HealthLevel }) {
  return (
    <span
      data-testid="health-indicator"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-2 py-0.5 text-xs",
        level === "healthy" && "border-emerald-500/40 text-emerald-400",
        level === "degraded" && "border-amber-500/40 text-amber-400",
        level === "critical" && "border-rose-500/40 text-rose-400",
        level === "unknown" && "border-line text-ink-muted",
      )}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          level === "healthy" && "bg-emerald-400",
          level === "degraded" && "bg-amber-400",
          level === "critical" && "bg-rose-400",
          level === "unknown" && "bg-ink-muted",
        )}
      />
      {level}
    </span>
  );
}

export function CounterWidget({
  title,
  value,
  hint,
  testId,
}: {
  title: string;
  value: string | number;
  hint?: string;
  testId?: string;
}) {
  return (
    <Card data-testid={testId ?? `counter-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="studio-muted text-xs">{title}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
      {hint && <div className="mt-1 text-xs text-ink-muted">{hint}</div>}
    </Card>
  );
}

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div data-testid="progress-bar" className="space-y-1">
      {label && <div className="flex justify-between text-xs text-ink-muted"><span>{label}</span><span>{pct}%</span></div>}
      <div className="h-2 overflow-hidden rounded-full bg-canvas">
        <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function LiveStatusBadge({ live }: { live: boolean }) {
  return <Badge data-testid="live-status">{live ? "LIVE" : "IDLE"}</Badge>;
}

export function MiniChart({
  points,
}: {
  points: { label: string; value: number }[];
}) {
  const max = Math.max(1, ...points.map((p) => p.value));
  return (
    <div data-testid="mini-chart" className="flex h-24 items-end gap-1">
      {points.map((p) => (
        <div key={p.label} className="flex flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-t bg-accent/80"
            style={{ height: `${(p.value / max) * 100}%`, minHeight: 4 }}
            title={`${p.label}: ${p.value}`}
          />
          <span className="text-[9px] text-ink-muted">{p.label}</span>
        </div>
      ))}
    </div>
  );
}
