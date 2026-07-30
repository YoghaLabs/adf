import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApplicationShell } from "@/shell/ApplicationShell";
import { DashboardPage } from "@/pages/DashboardPage";
import { studioConfig } from "@/config/studio";
import {
  RuntimeClient,
  MarketplaceClient,
  GeneratorClient,
  PackageClient,
  RegistryClient,
  ReleaseClient,
} from "@/sdk";

afterEach(() => {
  cleanup();
});

function renderShell(path = "/") {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/" element={<ApplicationShell />}>
            <Route index element={<DashboardPage />} />
            <Route path="marketplace" element={<div data-testid="page-marketplace">Market</div>} />
            <Route path="settings" element={<div data-testid="page-settings">Settings</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("ADF Studio smoke", () => {
  it("renders application shell", () => {
    renderShell();
    expect(screen.getByTestId("application-shell")).toBeInTheDocument();
    expect(screen.getByTestId("studio-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("studio-topbar")).toBeInTheDocument();
    expect(screen.getByTestId("studio-statusbar")).toBeInTheDocument();
  });

  it("shows dashboard widgets", async () => {
    renderShell("/");
    expect(await screen.findByTestId("page-dashboard")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
    expect(screen.getByTestId("widget-runtime-status")).toBeInTheDocument();
  });
});

describe("layout", () => {
  it("exposes shell landmarks and chrome", () => {
    renderShell();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByTestId("studio-sidebar")).toBeVisible();
    expect(screen.getByTestId("studio-topbar")).toBeVisible();
  });
});

describe("navigation", () => {
  it("includes required destinations", () => {
    const ids = studioConfig.navigation.map((n) => n.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        "dashboard",
        "workspace",
        "projects",
        "marketplace",
        "templates",
        "packages",
        "knowledge",
        "runtime",
        "sessions",
        "release",
        "settings",
        "help",
      ]),
    );
  });

  it("navigates via sidebar link", async () => {
    const user = userEvent.setup();
    renderShell("/");
    const sidebar = screen.getByTestId("studio-sidebar");
    await user.click(within(sidebar).getByRole("link", { name: /marketplace/i }));
    expect(await screen.findByTestId("page-marketplace")).toBeInTheDocument();
  });
});

describe("SDK adapters", () => {
  it("runtime client returns envelope", async () => {
    const result = await new RuntimeClient().status();
    expect(result.ok).toBe(true);
    expect(result.data.packageVersion).toBeTruthy();
  });

  it("marketplace client browses", async () => {
    const result = await new MarketplaceClient().browse();
    expect(result.ok).toBe(true);
    expect(result.data.count).toBeGreaterThan(0);
  });

  it("exposes required adapter classes", async () => {
    expect((await new GeneratorClient().listTypes()).ok).toBe(true);
    expect((await new PackageClient().listInstalled()).ok).toBe(true);
    expect((await new RegistryClient().status()).ok).toBe(true);
    expect((await new ReleaseClient().channels()).ok).toBe(true);
  });
});
