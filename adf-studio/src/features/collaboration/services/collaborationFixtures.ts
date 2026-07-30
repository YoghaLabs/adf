import type {
  ApprovalAction,
  Assignment,
  CollaborationActivity,
  CollaborationNotification,
  CollaborationOverview,
  CollaborationSession,
  CommentThread,
  MultiAgentNode,
  Participant,
  ReviewItem,
  SessionArtifact,
  SessionDecision,
  SessionPrompt,
  WorkspaceInvitation,
  WorkspaceMember,
} from "@/features/collaboration/types";

/** Presentation fixtures — no automation, no domain policy. */
export const PARTICIPANTS: Participant[] = [
  {
    id: "human-yogha",
    kind: "human",
    displayName: "Yogha",
    handle: "@yogha",
    role: "owner",
    status: "active",
    presence: "working",
    workspaceId: "ws-adf",
    bio: "Human owner / operator",
  },
  {
    id: "ai-architect",
    kind: "ai",
    displayName: "Architect AI",
    handle: "@architect-ai",
    role: "architect",
    status: "active",
    presence: "reviewing",
    aiKind: "architect",
    provider: "future",
    workspaceId: "ws-adf",
    bio: "Architecture decisions — participant, not a plugin",
  },
  {
    id: "ai-planner",
    kind: "ai",
    displayName: "Planner AI",
    handle: "@planner-ai",
    role: "planner",
    status: "active",
    presence: "idle",
    aiKind: "planner",
    provider: "future",
    workspaceId: "ws-adf",
  },
  {
    id: "ai-backend",
    kind: "ai",
    displayName: "Backend AI",
    handle: "@backend-ai",
    role: "backend",
    status: "active",
    presence: "working",
    aiKind: "backend",
    provider: "future",
    workspaceId: "ws-adf",
  },
  {
    id: "ai-frontend",
    kind: "ai",
    displayName: "Frontend AI",
    handle: "@frontend-ai",
    role: "frontend",
    status: "active",
    presence: "typing",
    aiKind: "frontend",
    provider: "future",
    workspaceId: "ws-adf",
  },
  {
    id: "ai-qa",
    kind: "ai",
    displayName: "QA AI",
    handle: "@qa-ai",
    role: "qa",
    status: "active",
    presence: "idle",
    aiKind: "qa",
    provider: "future",
    workspaceId: "ws-adf",
  },
  {
    id: "ai-docs",
    kind: "ai",
    displayName: "Documentation AI",
    handle: "@docs-ai",
    role: "documentation",
    status: "active",
    presence: "online",
    aiKind: "documentation",
    provider: "future",
    workspaceId: "ws-adf",
  },
  {
    id: "ai-devops",
    kind: "ai",
    displayName: "DevOps AI",
    handle: "@devops-ai",
    role: "devops",
    status: "invited",
    presence: "offline",
    aiKind: "devops",
    provider: "future",
    workspaceId: "ws-adf",
  },
  {
    id: "ai-release",
    kind: "ai",
    displayName: "Release AI",
    handle: "@release-ai",
    role: "release",
    status: "active",
    presence: "idle",
    aiKind: "release",
    provider: "future",
    workspaceId: "ws-adf",
  },
  {
    id: "ai-generic",
    kind: "ai",
    displayName: "Generic AI",
    handle: "@generic-ai",
    role: "generic",
    status: "offline",
    presence: "offline",
    aiKind: "generic",
    provider: "future",
    workspaceId: "ws-adf",
  },
];

export const MEMBERS: WorkspaceMember[] = PARTICIPANTS.map((p) => ({
  participantId: p.id,
  role: p.role,
  ownership: p.role === "owner",
  permissions:
    p.role === "owner"
      ? ["read", "write", "review", "approve", "invite"]
      : ["read", "write", "review"],
  joinedAt: "2026-07-30T08:00:00.000Z",
}));

export const INVITATIONS: WorkspaceInvitation[] = [
  {
    id: "inv-1",
    emailOrHandle: "@future-provider",
    role: "generic",
    status: "pending",
    createdAt: "2026-07-30T10:00:00.000Z",
  },
];

export const COLLAB_SESSIONS: CollaborationSession[] = [
  {
    id: "csess-001",
    title: "BUILD-017 collaboration model",
    workspaceId: "ws-adf",
    projectId: "adf",
    participantIds: ["human-yogha", "ai-architect", "ai-planner", "ai-backend", "ai-frontend"],
    status: "active",
    promptCount: 12,
    decisionCount: 4,
    artifactCount: 3,
    knowledgePacks: ["ADR Index", "Resume Pack"],
    updatedAt: "2026-07-30T15:00:00.000Z",
  },
];

export const PROMPTS: SessionPrompt[] = [
  {
    id: "sp-1",
    sessionId: "csess-001",
    authorId: "human-yogha",
    text: "Define AI as Participant, not plugin",
    at: "2026-07-30T14:00:00.000Z",
  },
  {
    id: "sp-2",
    sessionId: "csess-001",
    authorId: "ai-architect",
    text: "Propose collaboration data model (no automation)",
    at: "2026-07-30T14:10:00.000Z",
  },
];

export const DECISIONS: SessionDecision[] = [
  {
    id: "sd-1",
    sessionId: "csess-001",
    authorId: "ai-architect",
    summary: "AI is a first-class Participant with identity, role, timeline, memory",
    at: "2026-07-30T14:20:00.000Z",
  },
];

export const SESSION_ARTIFACTS: SessionArtifact[] = [
  {
    id: "sa-1",
    sessionId: "csess-001",
    label: "ADR-015 draft",
    kind: "decision",
    at: "2026-07-30T14:30:00.000Z",
  },
];

export const COMMENT_THREADS: CommentThread[] = [
  {
    id: "ct-1",
    targetType: "review",
    targetId: "rev-1",
    resolved: false,
    messages: [
      {
        id: "cm-1",
        authorId: "ai-qa",
        body: "Please confirm participant role enum covers future providers @architect-ai",
        mentions: ["ai-architect"],
        reactions: [{ emoji: "👀", count: 1 }],
        at: "2026-07-30T14:40:00.000Z",
      },
      {
        id: "cm-2",
        authorId: "ai-architect",
        body: "Confirmed — `future` AiAgentKind is reserved.",
        mentions: [],
        reactions: [{ emoji: "✅", count: 2 }],
        at: "2026-07-30T14:45:00.000Z",
      },
    ],
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    title: "Collaboration participant model",
    kind: "document",
    status: "open",
    authorId: "ai-architect",
    assigneeIds: ["human-yogha", "ai-qa"],
    createdAt: "2026-07-30T14:00:00.000Z",
  },
  {
    id: "rev-2",
    title: "Studio collaboration UI surfaces",
    kind: "code",
    status: "changes_requested",
    authorId: "ai-frontend",
    assigneeIds: ["human-yogha"],
    createdAt: "2026-07-30T13:00:00.000Z",
  },
  {
    id: "rev-3",
    title: "AI review of multi-agent graph",
    kind: "ai",
    status: "approved",
    authorId: "ai-planner",
    assigneeIds: ["ai-architect"],
    createdAt: "2026-07-30T12:00:00.000Z",
  },
];

export const APPROVALS: ApprovalAction[] = [
  {
    id: "ap-1",
    reviewId: "rev-3",
    actorId: "ai-architect",
    decision: "approve",
    note: "Architecture graph is presentation-only — good.",
    at: "2026-07-30T12:30:00.000Z",
  },
  {
    id: "ap-2",
    reviewId: "rev-2",
    actorId: "human-yogha",
    decision: "request_changes",
    note: "Add presence indicators",
    at: "2026-07-30T13:20:00.000Z",
  },
];

export const ACTIVITIES: CollaborationActivity[] = [
  {
    id: "ca-1",
    scope: "workspace",
    title: "Workspace members updated",
    detail: "Architect AI joined",
    actorId: "human-yogha",
    at: "2026-07-30T08:00:00.000Z",
  },
  {
    id: "ca-2",
    scope: "ai",
    title: "Architect AI decision",
    detail: "AI is Participant",
    actorId: "ai-architect",
    at: "2026-07-30T14:20:00.000Z",
  },
  {
    id: "ca-3",
    scope: "project",
    title: "Review opened",
    detail: "rev-1",
    actorId: "ai-architect",
    at: "2026-07-30T14:00:00.000Z",
  },
  {
    id: "ca-4",
    scope: "developer",
    title: "Yogha requested changes",
    detail: "rev-2",
    actorId: "human-yogha",
    at: "2026-07-30T13:20:00.000Z",
  },
  {
    id: "ca-5",
    scope: "unified",
    title: "Assignment created",
    detail: "Document multi-agent model",
    actorId: "ai-planner",
    at: "2026-07-30T14:50:00.000Z",
  },
];

export const NOTIFICATIONS: CollaborationNotification[] = [
  {
    id: "n-1",
    kind: "mention",
    title: "Mentioned by QA AI",
    body: "Confirm participant role enum",
    read: false,
    at: "2026-07-30T14:40:00.000Z",
  },
  {
    id: "n-2",
    kind: "review_request",
    title: "Review requested",
    body: "Collaboration participant model",
    read: false,
    at: "2026-07-30T14:00:00.000Z",
  },
  {
    id: "n-3",
    kind: "assignment",
    title: "Assigned to Documentation AI",
    body: "Document multi-agent model",
    read: true,
    at: "2026-07-30T14:50:00.000Z",
  },
  {
    id: "n-4",
    kind: "ai_finished",
    title: "Planner AI finished",
    body: "Multi-agent graph draft ready (no automation)",
    read: false,
    at: "2026-07-30T14:55:00.000Z",
  },
];

export const ASSIGNMENTS: Assignment[] = [
  {
    id: "as-1",
    title: "Document multi-agent model",
    assigneeId: "ai-docs",
    assignerId: "ai-planner",
    priority: "high",
    status: "in_progress",
    dueDate: "2026-08-01",
    workspaceId: "ws-adf",
  },
  {
    id: "as-2",
    title: "Review collaboration UI",
    assigneeId: "human-yogha",
    assignerId: "ai-frontend",
    priority: "medium",
    status: "open",
    workspaceId: "ws-adf",
  },
  {
    id: "as-3",
    title: "Validate QA checklist for participants",
    assigneeId: "ai-qa",
    assignerId: "human-yogha",
    priority: "medium",
    status: "open",
    workspaceId: "ws-adf",
  },
];

/** Architecture-only multi-agent graph — NOT automated. */
export const MULTI_AGENT_MODEL: MultiAgentNode[] = [
  {
    id: "planner",
    label: "Planner AI",
    role: "planner",
    description: "Plans work; does not execute agents in BUILD-017",
    next: ["architect"],
  },
  {
    id: "architect",
    label: "Architect AI",
    role: "architect",
    description: "Architecture & ADRs",
    next: ["backend", "frontend"],
  },
  {
    id: "backend",
    label: "Backend AI",
    role: "backend",
    description: "Service/core surfaces",
    next: ["qa"],
  },
  {
    id: "frontend",
    label: "Frontend AI",
    role: "frontend",
    description: "Studio presentation",
    next: ["qa"],
  },
  {
    id: "qa",
    label: "QA AI",
    role: "qa",
    description: "Verification participant",
    next: ["documentation"],
  },
  {
    id: "documentation",
    label: "Documentation AI",
    role: "documentation",
    description: "Docs SSOT participant",
    next: ["release"],
  },
  {
    id: "release",
    label: "Release AI",
    role: "release",
    description: "Release participant",
    next: [],
  },
];

export function getCollaborationOverview(): CollaborationOverview {
  const humans = PARTICIPANTS.filter((p) => p.kind === "human").length;
  const ais = PARTICIPANTS.filter((p) => p.kind === "ai").length;
  return {
    workspaceId: "ws-adf",
    memberCount: PARTICIPANTS.length,
    aiCount: ais,
    humanCount: humans,
    openReviews: REVIEWS.filter((r) => r.status === "open" || r.status === "changes_requested").length,
    openAssignments: ASSIGNMENTS.filter((a) => a.status !== "done").length,
    unreadNotifications: NOTIFICATIONS.filter((n) => !n.read).length,
    activeSessionId: COLLAB_SESSIONS.find((s) => s.status === "active")?.id ?? null,
  };
}
