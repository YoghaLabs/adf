import { createBrowserRouter } from "react-router-dom";
import { ApplicationShell } from "@/shell/ApplicationShell";
import { DashboardPage } from "@/pages/DashboardPage";
import { WorkspacePage } from "@/pages/WorkspacePage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { MarketplacePage } from "@/pages/MarketplacePage";
import { SearchPlatformPage } from "@/features/workspace/pages/SearchPlatformPage";
import { VisualIntelligencePage } from "@/features/visual/pages/VisualIntelligencePage";
import {
  ContextGraphPage,
  DependencyGraphPage,
  KnowledgeGraphPage,
  PackageGraphPage,
  PluginGraphPage,
  ProjectGraphPage,
  ReleaseGraphPage,
  RuntimeGraphPage,
  SessionGraphPage,
  WorkspaceGraphPage,
} from "@/features/visual/pages/GraphPages";
import {
  HelpPage,
  KnowledgePage,
  PackagesPage,
  ReleasePage,
  RuntimePage,
  SessionsPage,
  SettingsPage,
  TemplatesPage,
} from "@/pages/OtherPages";

export const studioRouter = createBrowserRouter([
  {
    path: "/",
    element: <ApplicationShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "workspace", element: <WorkspacePage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "sessions", element: <SessionsPage /> },
      { path: "search", element: <SearchPlatformPage /> },
      { path: "visual", element: <VisualIntelligencePage /> },
      { path: "visual/knowledge", element: <KnowledgeGraphPage /> },
      { path: "visual/dependency", element: <DependencyGraphPage /> },
      { path: "visual/project", element: <ProjectGraphPage /> },
      { path: "visual/workspace", element: <WorkspaceGraphPage /> },
      { path: "visual/context", element: <ContextGraphPage /> },
      { path: "visual/session", element: <SessionGraphPage /> },
      { path: "visual/runtime", element: <RuntimeGraphPage /> },
      { path: "visual/package", element: <PackageGraphPage /> },
      { path: "visual/plugin", element: <PluginGraphPage /> },
      { path: "visual/release", element: <ReleaseGraphPage /> },
      { path: "marketplace", element: <MarketplacePage /> },
      { path: "templates", element: <TemplatesPage /> },
      { path: "packages", element: <PackagesPage /> },
      { path: "knowledge", element: <KnowledgePage /> },
      { path: "runtime", element: <RuntimePage /> },
      { path: "release", element: <ReleasePage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "help", element: <HelpPage /> },
    ],
  },
]);
