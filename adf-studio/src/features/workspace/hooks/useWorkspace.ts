import { useWorkspaceStore } from "@/features/workspace/stores";

export function useActiveWorkspaceId() {
  return useWorkspaceStore((s) => s.activeId);
}

export function useWorkspaceLoading() {
  return useWorkspaceStore((s) => s.loading);
}
