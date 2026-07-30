import { create } from "zustand";
import type { NotificationItem, ThemeMode } from "@/types/studio";

type SettingsState = {
  theme: ThemeMode;
  language: string;
  channel: string;
  registry: string;
  sidebarCollapsed: boolean;
  commandOpen: boolean;
  notifications: NotificationItem[];
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: string) => void;
  setChannel: (channel: string) => void;
  setRegistry: (registry: string) => void;
  toggleSidebar: () => void;
  setCommandOpen: (open: boolean) => void;
  pushNotification: (item: Omit<NotificationItem, "id" | "createdAt">) => void;
  clearNotifications: () => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  theme: "system",
  language: "en",
  channel: "alpha",
  registry: "local",
  sidebarCollapsed: false,
  commandOpen: false,
  notifications: [],
  setTheme(theme) {
    set({ theme });
  },
  setLanguage(language) {
    set({ language });
  },
  setChannel(channel) {
    set({ channel });
  },
  setRegistry(registry) {
    set({ registry });
  },
  toggleSidebar() {
    set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed }));
  },
  setCommandOpen(open) {
    set({ commandOpen: open });
  },
  pushNotification(item) {
    set((s) => ({
      notifications: [
        {
          ...item,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        },
        ...s.notifications,
      ].slice(0, 20),
    }));
  },
  clearNotifications() {
    set({ notifications: [] });
  },
}));
