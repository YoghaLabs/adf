export const featureIds = {
  dashboard: "dashboard",
  marketplace: "marketplace",
  workspace: "workspace",
  projects: "projects",
  sessions: "sessions",
  search: "search",
  visual: "visual",
  runtime: "runtime",
  collaboration: "collaboration",
  orchestration: "orchestration",
  enterprise: "enterprise",
  identity: "identity",
} as const;

/** Named surface exports — avoid barrel-exporting fixture constants (name collisions). */
export { CollaborationPlatformPage } from "@/features/collaboration/pages/CollaborationPlatformPage";
export { OrchestrationPlatformPage } from "@/features/orchestration/pages/OrchestrationPlatformPage";
export { EnterpriseGovernancePage } from "@/features/enterprise/pages/EnterpriseGovernancePage";
export { VisualIntelligencePage } from "@/features/visual/pages/VisualIntelligencePage";
export { RuntimeDashboardPage } from "@/features/runtime/dashboard/RuntimeDashboardPage";
export { IdentityPlatformPage } from "@/features/identity/pages/IdentityPlatformPage";
