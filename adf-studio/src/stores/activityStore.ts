import { create } from "zustand";
import type { ActivityItem } from "@/types/studio";
import { studioSdk } from "@/sdk";

type ActivityState = {
  feed: ActivityItem[];
  changes: ActivityItem[];
  builds: ActivityItem[];
  packages: ActivityItem[];
  releases: ActivityItem[];
  loading: boolean;
  load: (workspaceId?: string) => Promise<void>;
};

export const useActivityStore = create<ActivityState>((set) => ({
  feed: [],
  changes: [],
  builds: [],
  packages: [],
  releases: [],
  loading: false,
  async load(workspaceId) {
    set({ loading: true });
    const [feed, changes, builds, packages, releases] = await Promise.all([
      studioSdk.activity.feed(workspaceId),
      studioSdk.activity.recent("change"),
      studioSdk.activity.recent("build"),
      studioSdk.activity.recent("package"),
      studioSdk.activity.recent("release"),
    ]);
    set({
      feed: feed.ok ? feed.data.items : [],
      changes: changes.ok ? changes.data.items : [],
      builds: builds.ok ? builds.data.items : [],
      packages: packages.ok ? packages.data.items : [],
      releases: releases.ok ? releases.data.items : [],
      loading: false,
    });
  },
}));
