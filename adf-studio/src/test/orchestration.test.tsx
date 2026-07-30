import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApplicationShell } from "@/shell/ApplicationShell";
import { OrchestrationPlatformPage } from "@/features/orchestration/pages/OrchestrationPlatformPage";
import { WorkflowManager } from "@/features/orchestration/workflow/WorkflowEngine";
import { PipelineManager } from "@/features/orchestration/pipeline/PipelineEngine";
import {
  EXECUTION_PLANS,
  PIPELINE_EXECUTIONS,
  PIPELINE_HISTORY,
  PIPELINES,
  STAGES,
  WORKFLOW_DEFINITIONS,
  WORKFLOW_INSTANCES,
  WORKFLOW_TEMPLATES,
} from "@/features/orchestration/services/orchestrationFixtures";
import {
  ApprovalClient,
  ArtifactClient,
  ExecutionClient,
  PipelineClient,
  WorkflowClient,
} from "@/sdk";
import { studioConfig } from "@/config/studio";

afterEach(() => cleanup());

function renderOrch() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={["/orchestration"]}>
        <Routes>
          <Route path="/" element={<ApplicationShell />}>
            <Route path="orchestration" element={<OrchestrationPlatformPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("workflow", () => {
  it("models workflow definitions and plans as non-executable", () => {
    const manager = new WorkflowManager(
      WORKFLOW_DEFINITIONS,
      WORKFLOW_INSTANCES,
      WORKFLOW_TEMPLATES,
      EXECUTION_PLANS,
    );
    expect(manager.listInstances().length).toBeGreaterThan(0);
    expect(manager.planFor("wf-inst-001")?.executable).toBe(false);
  });

  it("renders workflow panel", async () => {
    renderOrch();
    expect(await screen.findByTestId("page-orchestration")).toBeInTheDocument();
    expect(await screen.findByTestId("workflow-panel")).toBeInTheDocument();
  });
});

describe("pipeline", () => {
  it("lists ordered stages without autonomy", () => {
    const manager = new PipelineManager(
      PIPELINES,
      STAGES,
      PIPELINE_EXECUTIONS,
      PIPELINE_HISTORY,
    );
    expect(manager.stagesFor("pipe-001").length).toBe(7);
    expect(manager.execution("pipe-001")?.autonomous).toBe(false);
  });

  it("renders pipeline board", async () => {
    renderOrch();
    expect(await screen.findByTestId("pipeline-board")).toBeInTheDocument();
    expect(await screen.findByTestId("pipeline-metrics")).toBeInTheDocument();
  });
});

describe("stages", () => {
  it("renders stage cards", async () => {
    renderOrch();
    expect(await screen.findByTestId("stage-stage-architecture")).toBeInTheDocument();
    expect(await screen.findByTestId("stage-stage-release")).toBeInTheDocument();
  });
});

describe("transitions", () => {
  it("renders transition history", async () => {
    renderOrch();
    expect(await screen.findByTestId("transitions-panel")).toBeInTheDocument();
  });
});

describe("artifacts", () => {
  it("renders artifact flow", async () => {
    renderOrch();
    expect(await screen.findByTestId("artifacts-panel")).toBeInTheDocument();
    expect((await new ArtifactClient().list()).ok).toBe(true);
  });
});

describe("approvals", () => {
  it("renders approval gates", async () => {
    renderOrch();
    expect(await screen.findByTestId("approval-gates")).toBeInTheDocument();
    expect((await new ApprovalClient().list()).ok).toBe(true);
  });
});

describe("SDK", () => {
  it("returns orchestration envelopes", async () => {
    expect((await new WorkflowClient().overview()).ok).toBe(true);
    expect((await new PipelineClient().stages()).ok).toBe(true);
    expect((await new PipelineClient().metrics()).ok).toBe(true);
    expect((await new ExecutionClient().view()).ok).toBe(true);
  });

  it("is linked from navigation config", () => {
    expect(studioConfig.navigation.map((n) => n.id)).toContain("orchestration");
    expect(studioConfig.version).toBe("0.18.0-alpha");
    expect(studioConfig.build).toBe("BUILD-018");
  });
});

describe("visual modes", () => {
  it("switches pipeline view modes", async () => {
    const user = userEvent.setup();
    renderOrch();
    await screen.findByTestId("pipeline-board");
    await user.click(screen.getByRole("button", { name: /^kanban$/i }));
    expect(screen.getByTestId("pipeline-view-kanban")).toBeInTheDocument();
  });
});
