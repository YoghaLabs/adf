import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApplicationShell } from "@/shell/ApplicationShell";
import { VisualIntelligencePage } from "@/features/visual/pages/VisualIntelligencePage";
import { KnowledgeGraphPage, DependencyGraphPage } from "@/features/visual/pages/GraphPages";
import {
  GraphBuilder,
  GraphFilter,
  GraphLayout,
  GraphManager,
  GraphSearch,
  GraphSelection,
} from "@/features/visual/graphs";
import { getGraphDocument } from "@/features/visual/services/graphFixtures";
import {
  KnowledgeClient,
  DependencyClient,
  GraphClient,
  VisualizationClient,
} from "@/sdk";
import { studioConfig } from "@/config/studio";

afterEach(() => cleanup());

function renderVisual(path = "/visual") {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/" element={<ApplicationShell />}>
            <Route path="visual" element={<VisualIntelligencePage />} />
            <Route path="visual/knowledge" element={<KnowledgeGraphPage />} />
            <Route path="visual/dependency" element={<DependencyGraphPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("visual navigation", () => {
  it("includes visual destination", () => {
    expect(studioConfig.navigation.map((n) => n.id)).toContain("visual");
  });

  it("opens visual intelligence hub", async () => {
    renderVisual("/visual");
    expect(await screen.findByTestId("page-visual")).toBeInTheDocument();
    expect(await screen.findByTestId("graph-search-panel")).toBeInTheDocument();
  });
});

describe("graph rendering", () => {
  it("renders knowledge graph canvas", async () => {
    renderVisual("/visual/knowledge");
    expect(await screen.findByTestId("page-graph-knowledge")).toBeInTheDocument();
    expect(await screen.findByTestId("graph-canvas")).toBeInTheDocument();
    expect(await screen.findByTestId("graph-toolbar")).toBeInTheDocument();
  });

  it("renders dependency graph", async () => {
    renderVisual("/visual/dependency");
    expect(await screen.findByTestId("page-graph-dependency")).toBeInTheDocument();
  });
});

describe("layouts", () => {
  it("applies all layout modes", () => {
    const nodes = getGraphDocument("knowledge").nodes;
    for (const mode of ["force", "tree", "grid", "hierarchical", "radial"] as const) {
      const positioned = GraphLayout.apply(nodes, mode);
      expect(positioned).toHaveLength(nodes.length);
      expect(positioned[0]).toHaveProperty("x");
      expect(positioned[0]).toHaveProperty("y");
    }
  });
});

describe("filtering and search", () => {
  it("filters nodes by type", () => {
    const nodes = getGraphDocument("dependency").nodes;
    const filtered = GraphFilter.byNodeType(nodes, ["package"]);
    expect(filtered.every((n) => n.type === "package")).toBe(true);
  });

  it("searches nodes by query", () => {
    const nodes = getGraphDocument("knowledge").nodes;
    const hits = GraphSearch.nodes(nodes, "ADR");
    expect(hits.length).toBeGreaterThan(0);
  });
});

describe("selection", () => {
  it("toggles multi selection", () => {
    expect(GraphSelection.toggle([], "a")).toEqual(["a"]);
    expect(GraphSelection.toggle(["a"], "b", true)).toEqual(["a", "b"]);
    expect(GraphSelection.clear()).toEqual([]);
  });
});

describe("graph manager", () => {
  it("builds visible subset from document", () => {
    const doc = getGraphDocument("project");
    const manager = new GraphManager(doc);
    const built = GraphBuilder.fromDocument(doc);
    expect(built.nodes.length).toBe(doc.nodes.length);
    const visible = manager.visible({ query: "ADF" });
    expect(visible.nodes.length).toBeGreaterThan(0);
  });
});

describe("SDK clients", () => {
  it("loads knowledge and dependency graphs", async () => {
    expect((await new KnowledgeClient().graph()).ok).toBe(true);
    expect((await new DependencyClient().graph()).ok).toBe(true);
    expect((await new GraphClient().get("workspace")).ok).toBe(true);
    expect((await new VisualizationClient().overview()).ok).toBe(true);
    expect((await new VisualizationClient().search("package")).ok).toBe(true);
  });
});

describe("dashboard widgets", () => {
  it("lists overview widgets on hub", async () => {
    const user = userEvent.setup();
    renderVisual("/visual");
    expect(await screen.findByTestId("visual-widget-knowledge-overview")).toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: /knowledge overview/i }));
    expect(await screen.findByTestId("page-graph-knowledge")).toBeInTheDocument();
  });
});
