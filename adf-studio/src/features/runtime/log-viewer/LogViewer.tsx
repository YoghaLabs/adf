import { useMemo, useRef } from "react";
import { Button, Card, Input } from "@/components/ui";
import type { LogEntry, LogSeverity } from "@/features/runtime/types";
import { cn } from "@/utils/cn";

const severities: (LogSeverity | "all")[] = ["all", "debug", "info", "warn", "error"];

export function LogViewer({
  logs,
  query,
  severity,
  onQueryChange,
  onSeverityChange,
}: {
  logs: LogEntry[];
  query: string;
  severity: LogSeverity | "all";
  onQueryChange: (q: string) => void;
  onSeverityChange: (s: LogSeverity | "all") => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const visible = useMemo(() => logs.slice(0, 200), [logs]);

  const exportText = () =>
    visible.map((l) => `[${l.at}] ${l.severity.toUpperCase()} ${l.source}: ${l.message}`).join("\n");

  return (
    <Card data-testid="log-viewer">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">Runtime Logs</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={async () => {
              await navigator.clipboard?.writeText(exportText());
            }}
          >
            Copy
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const blob = new Blob([exportText()], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "adf-runtime-logs.txt";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export
          </Button>
        </div>
      </div>
      <div className="mb-3 flex flex-wrap gap-2">
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search logs…"
          aria-label="Search logs"
          className="max-w-sm"
        />
        {severities.map((s) => (
          <Button key={s} variant={severity === s ? "accent" : "outline"} onClick={() => onSeverityChange(s)}>
            {s}
          </Button>
        ))}
      </div>
      <div
        ref={listRef}
        data-testid="log-list"
        className="max-h-72 overflow-auto rounded-lg border border-line bg-canvas font-mono text-xs"
      >
        {visible.map((log) => (
          <div
            key={log.id}
            className={cn(
              "grid grid-cols-[72px_80px_1fr] gap-2 border-b border-line/60 px-2 py-1",
              log.severity === "error" && "bg-rose-500/10",
              log.severity === "warn" && "bg-amber-500/10",
            )}
          >
            <span className="uppercase text-ink-muted">{log.severity}</span>
            <span className="text-ink-muted">{log.source}</span>
            <span>{log.message}</span>
          </div>
        ))}
        {visible.length === 0 && <div className="p-3 text-ink-muted">No logs match filter</div>}
      </div>
    </Card>
  );
}
