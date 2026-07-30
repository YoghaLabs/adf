import { memo } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps,
} from "@xyflow/react";
import { cn } from "@/utils/cn";

function AdfGraphEdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
  data,
  markerEnd,
}: EdgeProps) {
  const [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });
  const highlighted = Boolean((data as { highlighted?: boolean } | undefined)?.highlighted);

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        className={cn(highlighted && "stroke-accent")}
        style={{ strokeWidth: highlighted ? 2.5 : 1.5 }}
      />
      <EdgeLabelRenderer>
        <div
          data-testid="graph-edge-label"
          className="nodrag nopan pointer-events-none absolute rounded bg-canvas px-1 text-[10px] text-ink-muted"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          {String(label ?? (data as { edgeType?: string } | undefined)?.edgeType ?? "")}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export const AdfGraphEdge = memo(AdfGraphEdgeComponent);
