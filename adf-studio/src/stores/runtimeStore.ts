import { create } from "zustand";
import type { RuntimeStatus } from "@/types/studio";
import { studioSdk } from "@/sdk";

type RuntimeState = {
  status: RuntimeStatus | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

export const useRuntimeStore = create<RuntimeState>((set) => ({
  status: null,
  loading: false,
  async refresh() {
    set({ loading: true });
    const result = await studioSdk.runtime.status();
    set({
      status: (result.data as RuntimeStatus) ?? null,
      loading: false,
    });
  },
}));
