export const studioConfig = {
  name: "ADF Studio",
  version: "0.13.0-alpha",
  build: "BUILD-013",
  defaultWorkspace: "adf",
  navigation: [
    { id: "dashboard", label: "Dashboard", path: "/" },
    { id: "workspace", label: "Workspace", path: "/workspace" },
    { id: "projects", label: "Projects", path: "/projects" },
    { id: "marketplace", label: "Marketplace", path: "/marketplace" },
    { id: "templates", label: "Templates", path: "/templates" },
    { id: "packages", label: "Packages", path: "/packages" },
    { id: "knowledge", label: "Knowledge", path: "/knowledge" },
    { id: "runtime", label: "Runtime", path: "/runtime" },
    { id: "sessions", label: "Sessions", path: "/sessions" },
    { id: "release", label: "Release", path: "/release" },
    { id: "settings", label: "Settings", path: "/settings" },
    { id: "help", label: "Help", path: "/help" },
  ],
} as const;

export type NavId = (typeof studioConfig.navigation)[number]["id"];
