import { create } from "zustand";
import type { MarketplaceItem } from "@/types/studio";
import { studioSdk } from "@/sdk";

type MarketplaceState = {
  items: MarketplaceItem[];
  featured: MarketplaceItem[];
  query: string;
  loading: boolean;
  setQuery: (query: string) => void;
  browse: () => Promise<void>;
  search: () => Promise<void>;
};

export const useMarketplaceStore = create<MarketplaceState>((set, get) => ({
  items: [],
  featured: [],
  query: "",
  loading: false,
  setQuery(query) {
    set({ query });
  },
  async browse() {
    set({ loading: true });
    const [browse, featured] = await Promise.all([
      studioSdk.marketplace.browse(),
      studioSdk.marketplace.featured(),
    ]);
    set({
      items: (browse.data.items as MarketplaceItem[]) ?? [],
      featured: (featured.data.items as MarketplaceItem[]) ?? [],
      loading: false,
    });
  },
  async search() {
    set({ loading: true });
    const result = await studioSdk.marketplace.search(get().query);
    set({
      items: (result.data.items as MarketplaceItem[]) ?? [],
      loading: false,
    });
  },
}));
