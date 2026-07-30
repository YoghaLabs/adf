export const studioConfig = {
  name: "ADF Studio",
  version: "0.14.0-alpha",
  build: "BUILD-014",
  defaultWorkspace: "ws-adf",
  navigation: [
    { id: "dashboard", label: "Dashboard", path: "/" },
    { id: "workspace", label: "Workspace", path: "/workspace" },
    { id: "projects", label: "Projects", path: "/projects" },
    { id: "sessions", label: "Sessions", path: "/sessions" },
    { id: "marketplace", label: "Marketplace", path: "/marketplace" },
    { id: "knowledge", label: "Knowledge", path: "/knowledge" },
    { id: "packages", label: "Packages", path: "/packages" },
    { id: "templates", label: "Templates", path: "/templates" },
    { id: "settings", label: "Settings", path: "/settings" },
    { id: "search", label: "Search", path: "/search" },
    { id: "runtime", label: "Runtime", path: "/runtime" },
    { id: "release", label: "Release", path: "/release" },
    { id: "help", label: "Help", path: "/help" },
  ],
} as const;

export type NavId = (typeof studioConfig.navigation)[number]["id"];
