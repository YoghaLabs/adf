import { Badge, Card } from "@/components/ui";
import type { TimelineEvent, TimelineKind } from "@/features/runtime/types";
import { Button } from "@/components/ui";

const kinds: (TimelineKind | "all")[] = ["all", "prompt", "context", "session", "event", "runtime"];

export function TimelinePanel({
  events,
  kind,
  onKindChange,
}: {
  events: TimelineEvent[];
  kind: TimelineKind | "all";
  onKindChange: (kind: TimelineKind | "all") => void;
}) {
  return (
    <Card data-testid="timeline-panel">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">Observability Timeline</h3>
        <div className="flex flex-wrap gap-1">
          {kinds.map((k) => (
            <Button key={k} variant={kind === k ? "accent" : "outline"} onClick={() => onKindChange(k)}>
              {k}
            </Button>
          ))}
        </div>
      </div>
      <ol className="space-y-3">
        {events.map((event) => {
          const legacy = event as TimelineEvent & { label?: string };
          const title = event.title || legacy.label || event.id;
          const at = event.at ? new Date(event.at).toLocaleTimeString() : "—";
          return (
            <li key={event.id} className="flex items-start justify-between gap-3 border-b border-line pb-2 last:border-0">
              <div>
                <div className="text-sm font-medium">{title}</div>
                <div className="studio-muted text-xs">{event.detail}</div>
              </div>
              <div className="text-right">
                <Badge>{event.kind}</Badge>
                <div className="mt-1 text-[10px] text-ink-muted">{at}</div>
              </div>
            </li>
          );
        })}
        {events.length === 0 && <li className="studio-muted text-sm">No timeline events</li>}
      </ol>
    </Card>
  );
}
