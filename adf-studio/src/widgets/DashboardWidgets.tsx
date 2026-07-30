import { Card, Badge } from "@/components/ui";

export function StatWidget({
  title,
  value,
  hint,
}: {
  title: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <Card data-testid={`widget-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="studio-muted">{title}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
      {hint && <div className="mt-1 text-xs text-ink-muted">{hint}</div>}
    </Card>
  );
}

export function ListWidget({
  title,
  items,
}: {
  title: string;
  items: { id: string; label: string; meta?: string }[];
}) {
  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        <Badge>{items.length}</Badge>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between text-sm">
            <span>{item.label}</span>
            {item.meta && <span className="text-ink-muted">{item.meta}</span>}
          </li>
        ))}
      </ul>
    </Card>
  );
}
