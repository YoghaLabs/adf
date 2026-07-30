import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { cn } from "@/utils/cn";

export type AdfNodeData = {
  label: string;
  nodeType: string;
  meta?: string;
  highlighted?: boolean;
};

function AdfGraphNodeComponent({ data, selected }: NodeProps) {
  const d = data as AdfNodeData;
  return (
    <div
      data-testid={`graph-node-${d.nodeType}`}
      className={cn(
        "min-w-[140px] rounded-lg border bg-canvas-elevated px-3 py-2 shadow-sm",
        selected || d.highlighted ? "border-accent ring-2 ring-accent/30" : "border-line",
      )}
    >
      <Handle type="target" position={Position.Left} className="!bg-accent" />
      <div className="text-[10px] uppercase tracking-wide text-ink-muted">{d.nodeType}</div>
      <div className="text-sm font-semibold">{d.label}</div>
      {d.meta && <div className="text-xs text-ink-muted">{d.meta}</div>}
      <Handle type="source" position={Position.Right} className="!bg-accent" />
    </div>
  );
}

export const AdfGraphNode = memo(AdfGraphNodeComponent);
