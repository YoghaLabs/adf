/** Collaboration types — presentation contracts only (BUILD-017).
 *  AI is a first-class Participant — not a plugin, extension, tool, or widget.
 *  No agent automation in this build — data model, UI, SDK, workflow only.
 */

export type ParticipantKind = "human" | "ai";

export type ParticipantRole =
  | "owner"
  | "architect"
  | "planner"
  | "backend"
  | "frontend"
  | "qa"
  | "documentation"
  | "devops"
  | "release"
  | "member"
  | "reviewer"
  | "generic";

export type ParticipantStatus = "active" | "invited" | "offline" | "busy" | "away";

export type PresenceState = "online" | "typing" | "working" | "reviewing" | "idle" | "offline";

export type AiAgentKind =
  | "architect"
  | "planner"
  | "backend"
  | "frontend"
  | "qa"
  | "documentation"
  | "devops"
  | "release"
  | "generic"
  | "future";

export type Participant = {
  id: string;
  kind: ParticipantKind;
  displayName: string;
  handle: string;
  role: ParticipantRole;
  status: ParticipantStatus;
  presence: PresenceState;
  aiKind?: AiAgentKind;
  provider?: string;
  workspaceId: string;
  bio?: string;
};

export type WorkspaceMember = {
  participantId: string;
  role: ParticipantRole;
  ownership: boolean;
  permissions: string[];
  invitedAt?: string;
  joinedAt?: string;
};

export type WorkspaceInvitation = {
  id: string;
  emailOrHandle: string;
  role: ParticipantRole;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
};

export type CollaborationSession = {
  id: string;
  title: string;
  workspaceId: string;
  projectId: string;
  participantIds: string[];
  status: "active" | "idle" | "closed";
  promptCount: number;
  decisionCount: number;
  artifactCount: number;
  knowledgePacks: string[];
  updatedAt: string;
};

export type SessionPrompt = {
  id: string;
  sessionId: string;
  authorId: string;
  text: string;
  at: string;
};

export type SessionDecision = {
  id: string;
  sessionId: string;
  authorId: string;
  summary: string;
  at: string;
};

export type SessionArtifact = {
  id: string;
  sessionId: string;
  label: string;
  kind: string;
  at: string;
};

export type CommentThread = {
  id: string;
  targetType: "project" | "review" | "session" | "document";
  targetId: string;
  resolved: boolean;
  messages: CommentMessage[];
};

export type CommentMessage = {
  id: string;
  authorId: string;
  body: string;
  mentions: string[];
  reactions: { emoji: string; count: number }[];
  at: string;
};

export type ReviewItem = {
  id: string;
  title: string;
  kind: "code" | "document" | "ai";
  status: "open" | "changes_requested" | "approved" | "rejected";
  authorId: string;
  assigneeIds: string[];
  createdAt: string;
};

export type ApprovalAction = {
  id: string;
  reviewId: string;
  actorId: string;
  decision: "approve" | "reject" | "request_changes";
  note: string;
  at: string;
};

export type CollaborationActivity = {
  id: string;
  scope: "workspace" | "project" | "ai" | "developer" | "unified";
  title: string;
  detail: string;
  actorId: string;
  at: string;
};

export type CollaborationNotification = {
  id: string;
  kind: "mention" | "assignment" | "review_request" | "ai_finished" | "package_update" | "release_update";
  title: string;
  body: string;
  read: boolean;
  at: string;
};

export type Assignment = {
  id: string;
  title: string;
  assigneeId: string;
  assignerId: string;
  priority: "low" | "medium" | "high";
  status: "open" | "in_progress" | "done" | "blocked";
  dueDate?: string;
  workspaceId: string;
};

export type MultiAgentNode = {
  id: AiAgentKind;
  label: string;
  role: ParticipantRole;
  description: string;
  next: AiAgentKind[];
};

export type CollaborationOverview = {
  workspaceId: string;
  memberCount: number;
  aiCount: number;
  humanCount: number;
  openReviews: number;
  openAssignments: number;
  unreadNotifications: number;
  activeSessionId: string | null;
};
