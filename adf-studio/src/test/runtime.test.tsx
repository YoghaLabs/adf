import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApplicationShell } from "@/shell/ApplicationShell";
import { RuntimeDashboardPage } from "@/features/runtime/dashboard/RuntimeDashboardPage";
import {
  RuntimeDashboardClient,
  MetricsClient,
  LogsClient,
  DiagnosticsClient,
  TimelineClient,
} from "@/sdk";
import { studioConfig } from "@/config/studio";

afterEach(() => cleanup());

function renderRuntime() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={["/runtime"]}>
        <Routes>
          <Route path="/" element={<ApplicationShell />}>
            <Route path="runtime" element={<RuntimeDashboardPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("runtime dashboard", () => {
  it("renders overview and key panels", async () => {
    renderRuntime();
    expect(await screen.findByTestId("page-runtime-dashboard")).toBeInTheDocument();
    expect(await screen.findByTestId("runtime-overview")).toBeInTheDocument();
    expect(await screen.findByTestId("metrics-panel")).toBeInTheDocument();
    expect(await screen.findByTestId("timeline-panel")).toBeInTheDocument();
    expect(await screen.findByTestId("log-viewer")).toBeInTheDocument();
    expect(await screen.findByTestId("diagnostics-panel")).toBeInTheDocument();
  });

  it("is linked from navigation config", () => {
    expect(studioConfig.navigation.map((n) => n.id)).toContain("runtime");
    expect(studioConfig.version).toBe("0.18.0-alpha");
  });
});

describe("logs", () => {
  it("filters by severity", async () => {
    const user = userEvent.setup();
    renderRuntime();
    expect(await screen.findByTestId("log-list")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /^error$/i }));
    expect(screen.getByTestId("log-list")).toBeInTheDocument();
  });
});

describe("metrics", () => {
  it("shows counters", async () => {
    renderRuntime();
    expect(await screen.findByTestId("counter-token-budget")).toBeInTheDocument();
    expect(await screen.findByTestId("counter-prompt-count")).toBeInTheDocument();
    expect(await screen.findByTestId("mini-chart")).toBeInTheDocument();
  });
});

describe("timeline", () => {
  it("switches timeline kinds", async () => {
    const user = userEvent.setup();
    renderRuntime();
    expect(await screen.findByTestId("timeline-panel")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /^prompt$/i }));
    expect(screen.getByTestId("timeline-panel")).toBeInTheDocument();
  });
});

describe("diagnostics", () => {
  it("renders diagnostics cards", async () => {
    renderRuntime();
    expect(await screen.findByTestId("diagnostics-panel")).toBeInTheDocument();
    expect(await screen.findByText("SDK Diagnostics")).toBeInTheDocument();
  });
});

describe("SDK", () => {
  it("returns observability envelopes", async () => {
    expect((await new RuntimeDashboardClient().overview()).ok).toBe(true);
    expect((await new MetricsClient().snapshot()).ok).toBe(true);
    expect((await new LogsClient().list()).ok).toBe(true);
    expect((await new DiagnosticsClient().snapshot()).ok).toBe(true);
    expect((await new TimelineClient().list()).ok).toBe(true);
    expect((await new TimelineClient().byKind("prompt")).ok).toBe(true);
  });
});
