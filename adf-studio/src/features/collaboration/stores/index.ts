import { create } from "zustand";
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
  WorkspaceInvitation,
  WorkspaceMember,
} from "@/features/collaboration/types";
import { studioSdk } from "@/sdk";

type ParticipantState = {
  participants: Participant[];
  selectedId: string | null;
  loading: boolean;
  load: () => Promise<void>;
  select: (id: string | null) => void;
};

type CollaborationState = {
  overview: CollaborationOverview | null;
  members: WorkspaceMember[];
  invitations: WorkspaceInvitation[];
  sessions: CollaborationSession[];
  comments: CommentThread[];
  activities: CollaborationActivity[];
  multiAgent: MultiAgentNode[];
  loading: boolean;
  load: () => Promise<void>;
};

type PresenceStateStore = {
  online: Participant[];
  loading: boolean;
  load: () => Promise<void>;
};

type ReviewState = {
  reviews: ReviewItem[];
  approvals: ApprovalAction[];
  loading: boolean;
  load: () => Promise<void>;
};

type NotificationState = {
  items: CollaborationNotification[];
  loading: boolean;
  load: () => Promise<void>;
};

type AssignmentState = {
  items: Assignment[];
  loading: boolean;
  load: () => Promise<void>;
};

export const useParticipantStore = create<ParticipantState>((set) => ({
  participants: [],
  selectedId: null,
  loading: false,
  async load() {
    set({ loading: true });
    const result = await studioSdk.participants.list();
    set({
      participants: result.ok ? result.data.participants : [],
      loading: false,
    });
  },
  select(id) {
    set({ selectedId: id });
  },
}));

export const useCollaborationStore = create<CollaborationState>((set) => ({
  overview: null,
  members: [],
  invitations: [],
  sessions: [],
  comments: [],
  activities: [],
  multiAgent: [],
  loading: false,
  async load() {
    set({ loading: true });
    const [overview, members, invitations, sessions, comments, activities, multiAgent] =
      await Promise.all([
        studioSdk.collaboration.overview(),
        studioSdk.collaboration.members(),
        studioSdk.collaboration.invitations(),
        studioSdk.collaboration.sessions(),
        studioSdk.collaboration.comments(),
        studioSdk.collaboration.activity(),
        studioSdk.collaboration.multiAgentModel(),
      ]);
    set({
      overview: overview.ok ? overview.data : null,
      members: members.ok ? members.data.members : [],
      invitations: invitations.ok ? invitations.data.invitations : [],
      sessions: sessions.ok ? sessions.data.sessions : [],
      comments: comments.ok ? comments.data.threads : [],
      activities: activities.ok ? activities.data.items : [],
      multiAgent: multiAgent.ok ? multiAgent.data.nodes : [],
      loading: false,
    });
  },
}));

export const usePresenceStore = create<PresenceStateStore>((set) => ({
  online: [],
  loading: false,
  async load() {
    set({ loading: true });
    const result = await studioSdk.presence.list();
    set({ online: result.ok ? result.data.participants : [], loading: false });
  },
}));

export const useReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  approvals: [],
  loading: false,
  async load() {
    set({ loading: true });
    const [reviews, approvals] = await Promise.all([
      studioSdk.reviews.list(),
      studioSdk.reviews.approvals(),
    ]);
    set({
      reviews: reviews.ok ? reviews.data.reviews : [],
      approvals: approvals.ok ? approvals.data.approvals : [],
      loading: false,
    });
  },
}));

export const useNotificationStore = create<NotificationState>((set) => ({
  items: [],
  loading: false,
  async load() {
    set({ loading: true });
    const result = await studioSdk.notifications.list();
    set({ items: result.ok ? result.data.notifications : [], loading: false });
  },
}));

export const useAssignmentStore = create<AssignmentState>((set) => ({
  items: [],
  loading: false,
  async load() {
    set({ loading: true });
    const result = await studioSdk.assignments.list();
    set({ items: result.ok ? result.data.assignments : [], loading: false });
  },
}));
