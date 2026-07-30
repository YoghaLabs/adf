export const featureIds = {
  dashboard: "dashboard",
  marketplace: "marketplace",
  workspace: "workspace",
  projects: "projects",
  sessions: "sessions",
  search: "search",
  visual: "visual",
  runtime: "runtime",
} as const;

export * from "@/features/workspace";
export * from "@/features/visual";
export * from "@/features/runtime";
