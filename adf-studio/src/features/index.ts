export const featureIds = {
  dashboard: "dashboard",
  marketplace: "marketplace",
  workspace: "workspace",
  projects: "projects",
  sessions: "sessions",
  search: "search",
  visual: "visual",
} as const;

export * from "@/features/workspace";
export * from "@/features/visual";
