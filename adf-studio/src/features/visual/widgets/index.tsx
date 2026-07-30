import { Card } from "@/components/ui";
import { Link } from "react-router-dom";
import type { GraphKind } from "@/features/visual/types";

export function VisualOverviewWidget({
  title,
  nodeCount,
  edgeCount,
  to,
}: {
  title: string;
  nodeCount: number;
  edgeCount: number;
  to: string;
}) {
  return (
    <Link to={to} className="block">
      <Card data-testid={`visual-widget-${title.toLowerCase().replace(/\s+/g, "-")}`} className="transition hover:border-accent/40">
        <div className="studio-muted text-xs">{title}</div>
        <div className="mt-2 text-2xl font-semibold">{nodeCount}</div>
        <div className="mt-1 text-xs text-ink-muted">{edgeCount} relationships</div>
      </Card>
    </Link>
  );
}

export function GraphKindBadge({ kind }: { kind: GraphKind }) {
  return <span className="rounded border border-line px-2 py-0.5 text-xs text-ink-muted">{kind}</span>;
}
