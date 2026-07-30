import { useEffect } from "react";
import { Card } from "@/components/ui";
import {
  ParticipantCard,
  ParticipantProfilePanel,
} from "@/features/collaboration/participants/ParticipantCards";
import {
  ActivityFeedPanel,
  AssignmentsPanel,
  CommentsPanel,
  InvitationsPanel,
  MultiAgentModelPanel,
  NotificationsPanel,
  PresencePanel,
  ReviewQueuePanel,
  SharedSessionPanel,
  WorkspaceMembersPanel,
} from "@/features/collaboration/workspace/CollaborationPanels";
import {
  useAssignmentStore,
  useCollaborationStore,
  useNotificationStore,
  useParticipantStore,
  usePresenceStore,
  useReviewStore,
} from "@/features/collaboration/stores";

export function CollaborationPlatformPage() {
  const loadParticipants = useParticipantStore((s) => s.load);
  const participants = useParticipantStore((s) => s.participants);
  const selectedId = useParticipantStore((s) => s.selectedId);
  const select = useParticipantStore((s) => s.select);

  const loadCollab = useCollaborationStore((s) => s.load);
  const overview = useCollaborationStore((s) => s.overview);
  const members = useCollaborationStore((s) => s.members);
  const invitations = useCollaborationStore((s) => s.invitations);
  const sessions = useCollaborationStore((s) => s.sessions);
  const comments = useCollaborationStore((s) => s.comments);
  const activities = useCollaborationStore((s) => s.activities);
  const multiAgent = useCollaborationStore((s) => s.multiAgent);

  const loadPresence = usePresenceStore((s) => s.load);
  const online = usePresenceStore((s) => s.online);

  const loadReviews = useReviewStore((s) => s.load);
  const reviews = useReviewStore((s) => s.reviews);
  const approvals = useReviewStore((s) => s.approvals);

  const loadNotifications = useNotificationStore((s) => s.load);
  const notifications = useNotificationStore((s) => s.items);

  const loadAssignments = useAssignmentStore((s) => s.load);
  const assignments = useAssignmentStore((s) => s.items);

  useEffect(() => {
    void loadParticipants();
    void loadCollab();
    void loadPresence();
    void loadReviews();
    void loadNotifications();
    void loadAssignments();
  }, [
    loadAssignments,
    loadCollab,
    loadNotifications,
    loadParticipants,
    loadPresence,
    loadReviews,
  ]);

  const selected = participants.find((p) => p.id === selectedId) ?? null;

  return (
    <div data-testid="page-collaboration" className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">AI Collaboration</h1>
        <p className="studio-muted mt-1">
          Humans and AIs are first-class Participants. Data model, UI, SDK, and workflow only —
          no agent automation in BUILD-017.
        </p>
      </div>

      <div data-testid="collab-overview" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        <Card>
          <div className="studio-muted text-xs">Members</div>
          <div className="mt-2 text-2xl font-semibold">{overview?.memberCount ?? "—"}</div>
        </Card>
        <Card>
          <div className="studio-muted text-xs">Humans</div>
          <div className="mt-2 text-2xl font-semibold">{overview?.humanCount ?? "—"}</div>
        </Card>
        <Card>
          <div className="studio-muted text-xs">AI Participants</div>
          <div className="mt-2 text-2xl font-semibold">{overview?.aiCount ?? "—"}</div>
        </Card>
        <Card>
          <div className="studio-muted text-xs">Open Reviews</div>
          <div className="mt-2 text-2xl font-semibold">{overview?.openReviews ?? "—"}</div>
        </Card>
        <Card>
          <div className="studio-muted text-xs">Assignments</div>
          <div className="mt-2 text-2xl font-semibold">{overview?.openAssignments ?? "—"}</div>
        </Card>
        <Card>
          <div className="studio-muted text-xs">Unread</div>
          <div className="mt-2 text-2xl font-semibold">{overview?.unreadNotifications ?? "—"}</div>
        </Card>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Participants</h2>
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="grid gap-3 sm:grid-cols-2" data-testid="participant-list">
            {participants.map((p) => (
              <ParticipantCard
                key={p.id}
                participant={p}
                selected={p.id === selectedId}
                onSelect={select}
              />
            ))}
          </div>
          <ParticipantProfilePanel participant={selected} />
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <WorkspaceMembersPanel members={members} participants={participants} />
        <InvitationsPanel invitations={invitations} />
        <PresencePanel online={online} />
        <SharedSessionPanel sessions={sessions} />
      </div>

      <ReviewQueuePanel reviews={reviews} approvals={approvals} />

      <div className="grid gap-4 lg:grid-cols-2">
        <CommentsPanel threads={comments} />
        <NotificationsPanel items={notifications} />
        <AssignmentsPanel items={assignments} />
        <ActivityFeedPanel items={activities} />
      </div>

      <MultiAgentModelPanel nodes={multiAgent} />
    </div>
  );
}
