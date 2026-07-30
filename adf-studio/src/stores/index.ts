import { create } from "zustand";

type UiState = {
  activeTab: string;
  globalSearch: string;
  setActiveTab: (tab: string) => void;
  setGlobalSearch: (value: string) => void;
};

export const useUiStore = create<UiState>((set) => ({
  activeTab: "overview",
  globalSearch: "",
  setActiveTab(tab) {
    set({ activeTab: tab });
  },
  setGlobalSearch(value) {
    set({ globalSearch: value });
  },
}));
