import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApplicationShell } from "@/shell/ApplicationShell";
import { CollaborationPlatformPage } from "@/features/collaboration/pages/CollaborationPlatformPage";
import {
  AIParticipant,
  HumanParticipant,
  ParticipantManager,
} from "@/features/collaboration/participants/ParticipantModel";
import { PARTICIPANTS } from "@/features/collaboration/services/collaborationFixtures";
import {
  AssignmentClient,
  CollaborationClient,
  NotificationClient,
  ParticipantClient,
  PresenceClient,
  ReviewClient,
} from "@/sdk";
import { studioConfig } from "@/config/studio";

afterEach(() => cleanup());

function renderCollab() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={["/collaboration"]}>
        <Routes>
          <Route path="/" element={<ApplicationShell />}>
            <Route path="collaboration" element={<CollaborationPlatformPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("participants", () => {
  it("models humans and AI as first-class participants", () => {
    const manager = new ParticipantManager(PARTICIPANTS);
    expect(manager.byKind("human").length).toBeGreaterThan(0);
    expect(manager.byKind("ai").length).toBeGreaterThanOrEqual(8);
    expect(HumanParticipant.from(PARTICIPANTS[0]!).isHuman).toBe(true);
    expect(AIParticipant.from(manager.byKind("ai")[0]!).isAi).toBe(true);
  });

  it("renders participant list from SDK", async () => {
    renderCollab();
    expect(await screen.findByTestId("page-collaboration")).toBeInTheDocument();
    expect(await screen.findByTestId("participant-list")).toBeInTheDocument();
    expect(await screen.findByTestId("participant-human-yogha")).toBeInTheDocument();
    expect(await screen.findByTestId("participant-ai-architect")).toBeInTheDocument();
  });
});

describe("presence", () => {
  it("shows presence panel", async () => {
    renderCollab();
    expect(await screen.findByTestId("presence-panel")).toBeInTheDocument();
    expect((await new PresenceClient().list()).ok).toBe(true);
  });
});

describe("review", () => {
  it("renders review queue and approvals", async () => {
    renderCollab();
    expect(await screen.findByTestId("review-queue")).toBeInTheDocument();
    expect((await new ReviewClient().list()).ok).toBe(true);
    expect((await new ReviewClient().approvals()).ok).toBe(true);
  });
});

describe("comments", () => {
  it("renders threaded comments", async () => {
    renderCollab();
    expect(await screen.findByTestId("comments-panel")).toBeInTheDocument();
  });
});

describe("assignments", () => {
  it("renders assignments for humans and AI", async () => {
    renderCollab();
    expect(await screen.findByTestId("assignments-panel")).toBeInTheDocument();
    expect((await new AssignmentClient().list()).ok).toBe(true);
  });
});

describe("notifications", () => {
  it("renders notification feed", async () => {
    renderCollab();
    expect(await screen.findByTestId("notifications-panel")).toBeInTheDocument();
    expect((await new NotificationClient().list()).ok).toBe(true);
  });
});

describe("timeline", () => {
  it("renders unified activity timeline", async () => {
    renderCollab();
    expect(await screen.findByTestId("collab-activity-feed")).toBeInTheDocument();
    expect((await new CollaborationClient().activity()).ok).toBe(true);
  });
});

describe("SDK", () => {
  it("returns collaboration envelopes", async () => {
    expect((await new ParticipantClient().list()).ok).toBe(true);
    expect((await new CollaborationClient().overview()).ok).toBe(true);
    expect((await new CollaborationClient().multiAgentModel()).ok).toBe(true);
  });

  it("is linked from navigation config", () => {
    expect(studioConfig.navigation.map((n) => n.id)).toContain("collaboration");
    expect(studioConfig.version).toBe("1.0.0-rc1");
    expect(studioConfig.build).toBe("BUILD-020");
  });
});

describe("interaction", () => {
  it("selects a participant profile", async () => {
    const user = userEvent.setup();
    renderCollab();
    const card = await screen.findByTestId("participant-ai-architect");
    await user.click(card);
    expect(await screen.findByTestId("participant-profile")).toBeInTheDocument();
  });
});
