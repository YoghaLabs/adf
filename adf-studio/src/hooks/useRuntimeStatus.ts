import { useQuery } from "@tanstack/react-query";
import { studioSdk } from "@/sdk";

/** Example TanStack Query hook — still SDK-only. */
export function useRuntimeStatusQuery() {
  return useQuery({
    queryKey: ["runtime", "status"],
    queryFn: async () => {
      const result = await studioSdk.runtime.status();
      if (!result.ok) throw new Error(result.error ?? "runtime status failed");
      return result.data;
    },
  });
}
