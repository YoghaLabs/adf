import { useGraphStore } from "@/features/visual/stores";

export function useActiveGraphKind() {
  return useGraphStore((s) => s.kind);
}

export function useGraphLoading() {
  return useGraphStore((s) => s.loading);
}
