import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApplicationShell } from "@/shell/ApplicationShell";
import { DashboardPage } from "@/pages/DashboardPage";
import { WorkspacePage } from "@/pages/WorkspacePage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { SessionsPage } from "@/pages/OtherPages";
import { SearchPlatformPage } from "@/features/workspace/pages/SearchPlatformPage";
import { studioConfig } from "@/config/studio";
import {
  WorkspaceClient,
  ProjectClient,
  SessionClient,
  SearchClient,
  ActivityClient,
} from "@/sdk";

afterEach(() => {
  cleanup();
});

function renderApp(path = "/") {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/" element={<ApplicationShell />}>
            <Route index element={<DashboardPage />} />
            <Route path="workspace" element={<WorkspacePage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="sessions" element={<SessionsPage />} />
            <Route path="search" element={<SearchPlatformPage />} />
            <Route path="marketplace" element={<div data-testid="page-marketplace">Market</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("navigation", () => {
  it("includes workspace experience destinations", () => {
    const ids = studioConfig.navigation.map((n) => n.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        "dashboard",
        "workspace",
        "projects",
        "sessions",
        "marketplace",
        "knowledge",
        "packages",
        "templates",
        "settings",
        "search",
      ]),
    );
  });

  it("navigates via sidebar", async () => {
    const user = userEvent.setup();
    renderApp("/");
    const sidebar = screen.getByTestId("studio-sidebar");
    await user.click(within(sidebar).getByRole("link", { name: /workspace/i }));
    expect(await screen.findByTestId("page-workspace")).toBeInTheDocument();
  });
});

describe("dashboard", () => {
  it("renders workspace overview widgets", async () => {
    renderApp("/");
    expect(await screen.findByTestId("page-dashboard")).toBeInTheDocument();
    expect(await screen.findByTestId("widget-workspace-overview")).toBeInTheDocument();
  });
});

describe("workspace", () => {
  it("loads manager switcher and profile", async () => {
    renderApp("/workspace");
    expect(await screen.findByTestId("page-workspace")).toBeInTheDocument();
    expect(await screen.findByTestId("workspace-switcher")).toBeInTheDocument();
    expect(await screen.findByTestId("workspace-profile")).toBeInTheDocument();
    expect(await screen.findByTestId("workspace-stats")).toBeInTheDocument();
  });
});

describe("projects", () => {
  it("renders project explorer", async () => {
    renderApp("/projects");
    expect(await screen.findByTestId("page-projects")).toBeInTheDocument();
    expect(await screen.findByTestId("project-tree")).toBeInTheDocument();
    expect(await screen.findByTestId("project-explorer-cards")).toBeInTheDocument();
  });
});

describe("sessions", () => {
  it("renders session manager", async () => {
    renderApp("/sessions");
    expect(await screen.findByTestId("page-sessions")).toBeInTheDocument();
    expect(await screen.findByTestId("current-session")).toBeInTheDocument();
    expect(await screen.findByTestId("session-list")).toBeInTheDocument();
  });
});

describe("search", () => {
  it("renders search platform", async () => {
    renderApp("/search");
    expect(await screen.findByTestId("page-search")).toBeInTheDocument();
    expect(await screen.findByTestId("search-results")).toBeInTheDocument();
  });
});

describe("SDK clients", () => {
  it("workspace client lists and profiles", async () => {
    const client = new WorkspaceClient();
    expect((await client.list()).ok).toBe(true);
    expect((await client.profile()).ok).toBe(true);
    expect((await client.stats()).ok).toBe(true);
  });

  it("project client explorer surfaces", async () => {
    const client = new ProjectClient();
    expect((await client.explorer()).ok).toBe(true);
    expect((await client.favorites()).ok).toBe(true);
    expect((await client.pinned()).ok).toBe(true);
  });

  it("session client resume/close envelopes", async () => {
    const client = new SessionClient();
    const list = await client.list();
    expect(list.ok).toBe(true);
    const id = list.data.sessions[0]?.id ?? "sess-001";
    expect((await client.resume(id)).ok).toBe(true);
    expect((await client.close(id)).ok).toBe(true);
  });

  it("search and activity clients", async () => {
    expect((await new SearchClient().global("adf")).ok).toBe(true);
    expect((await new SearchClient().commands("")).ok).toBe(true);
    expect((await new ActivityClient().feed()).ok).toBe(true);
  });
});
