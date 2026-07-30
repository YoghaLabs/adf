import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApplicationShell } from "@/shell/ApplicationShell";
import { DashboardPage } from "@/pages/DashboardPage";
import { useOnboardingStore } from "@/stores/onboardingStore";

afterEach(() => {
  cleanup();
  localStorage.clear();
  useOnboardingStore.setState({
    hydrated: false,
    welcomeOpen: false,
    completed: false,
    choice: null,
    demoStep: null,
    demoProjectName: null,
  });
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
            <Route path="help" element={<div data-testid="page-help">Help</div>} />
            <Route path="runtime" element={<div data-testid="page-runtime">Runtime</div>} />
            <Route path="visual" element={<div data-testid="page-visual">Visual</div>} />
            <Route path="marketplace" element={<div data-testid="page-marketplace">Market</div>} />
            <Route path="workspace" element={<div data-testid="page-workspace">Workspace</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("VALIDATION-002 onboarding", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows welcome wizard for first-time users", async () => {
    renderApp("/");
    expect(await screen.findByTestId("welcome-wizard")).toBeInTheDocument();
    expect(screen.getByTestId("welcome-option-demo")).toBeInTheDocument();
  });

  it("starts demo tour from Demo Project", async () => {
    const user = userEvent.setup();
    renderApp("/");
    await screen.findByTestId("welcome-wizard");
    await user.click(screen.getByTestId("welcome-option-demo"));
    expect(await screen.findByTestId("demo-guide")).toBeInTheDocument();
    expect(screen.queryByTestId("welcome-wizard")).not.toBeInTheDocument();
  });

  it("shows getting started banner on dashboard when onboarding done", async () => {
    localStorage.setItem("adf.studio.onboarding.v1", "done");
    renderApp("/");
    expect(await screen.findByTestId("getting-started-banner")).toBeInTheDocument();
    expect(screen.queryByTestId("welcome-wizard")).not.toBeInTheDocument();
  });
});
