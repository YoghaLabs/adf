import { useRuntimeDashboardStore } from "@/features/runtime/stores";

export function useRuntimeLive() {
  return useRuntimeDashboardStore((s) => s.overview?.live ?? false);
}

export function useRuntimeHealth() {
  return useRuntimeDashboardStore((s) => s.overview?.engineStatus ?? "unknown");
}
