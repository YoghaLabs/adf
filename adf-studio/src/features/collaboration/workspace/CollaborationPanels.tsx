import { Badge, Card } from "@/components/ui";
import type {
  ApprovalAction,
  Assignment,
  CollaborationActivity,
  CollaborationNotification,
  CollaborationSession,
  CommentThread,
  MultiAgentNode,
  Participant,
  ReviewItem,
  WorkspaceInvitation,
  WorkspaceMember,
} from "@/features/collaboration/types";

export function WorkspaceMembersPanel({
  members,
  participants,
}: {
  members: WorkspaceMember[];
  participants: Participant[];
}) {
  const byId = new Map(participants.map((p) => [p.id, p]));
  return (
    <Card data-testid="workspace-members">
      <h3 className="mb-3 text-sm font-semibold">Workspace Members</h3>
      <ul className="space-y-2 text-sm">
        {members.map((m) => {
          const p = byId.get(m.participantId);
          return (
            <li key={m.participantId} className="flex items-center justify-between gap-2">
              <span>{p?.displayName ?? m.participantId}</span>
              <span className="text-xs text-ink-muted">
                {m.role}
                {m.ownership ? " · owner" : ""}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

export function InvitationsPanel({ invitations }: { invitations: WorkspaceInvitation[] }) {
  return (
    <Card data-testid="invitations-panel">
      <h3 className="mb-3 text-sm font-semibold">Invitations</h3>
      <ul className="space-y-2 text-sm">
        {invitations.map((i) => (
          <li key={i.id} className="flex justify-between gap-2">
            <span>{i.emailOrHandle}</span>
            <Badge>{i.status}</Badge>
          </li>
        ))}
        {invitations.length === 0 && <li className="studio-muted">No invitations</li>}
      </ul>
    </Card>
  );
}

export function SharedSessionPanel({ sessions }: { sessions: CollaborationSession[] }) {
  return (
    <Card data-testid="shared-sessions">
      <h3 className="mb-3 text-sm font-semibold">AI Sessions (shared)</h3>
      <ul className="space-y-3">
        {sessions.map((s) => (
          <li key={s.id} className="rounded-lg border border-line p-3 text-sm">
            <div className="font-medium">{s.title}</div>
            <div className="studio-muted mt-1 text-xs">
              {s.participantIds.length} participants · {s.promptCount} prompts · {s.decisionCount}{" "}
              decisions · {s.artifactCount} artifacts
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {s.knowledgePacks.map((k) => (
                <Badge key={k}>{k}</Badge>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function CommentsPanel({ threads }: { threads: CommentThread[] }) {
  return (
    <Card data-testid="comments-panel">
      <h3 className="mb-3 text-sm font-semibold">Threaded Comments</h3>
      {threads.map((t) => (
        <div key={t.id} className="mb-4 border-b border-line pb-3 last:border-0">
          <div className="mb-2 flex items-center justify-between text-xs text-ink-muted">
            <span>
              {t.targetType}/{t.targetId}
            </span>
            <Badge>{t.resolved ? "resolved" : "open"}</Badge>
          </div>
          <ul className="space-y-2 text-sm">
            {t.messages.map((m) => (
              <li key={m.id}>
                <div>{m.body}</div>
                <div className="studio-muted mt-1 text-xs">
                  {m.authorId}
                  {m.mentions.length ? ` · mentions ${m.mentions.join(", ")}` : ""}
                  {m.reactions.map((r) => ` · ${r.emoji}${r.count}`).join("")}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Card>
  );
}

export function ReviewQueuePanel({
  reviews,
  approvals,
}: {
  reviews: ReviewItem[];
  approvals: ApprovalAction[];
}) {
  return (
    <div data-testid="review-queue" className="grid gap-4 lg:grid-cols-2">
      <Card>
        <h3 className="mb-3 text-sm font-semibold">Review Queue</h3>
        <ul className="space-y-2 text-sm">
          {reviews.map((r) => (
            <li key={r.id} className="flex items-start justify-between gap-2 border-b border-line pb-2 last:border-0">
              <div>
                <div className="font-medium">{r.title}</div>
                <div className="studio-muted text-xs">
                  {r.kind} · assignees {r.assigneeIds.length}
                </div>
              </div>
              <Badge>{r.status}</Badge>
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <h3 className="mb-3 text-sm font-semibold">Decision Log</h3>
        <ul className="space-y-2 text-sm">
          {approvals.map((a) => (
            <li key={a.id} className="border-b border-line pb-2 last:border-0">
              <div className="font-medium">{a.decision}</div>
              <div className="studio-muted text-xs">
                {a.actorId} · {a.note}
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export function ActivityFeedPanel({
  items,
}: {
  items: CollaborationActivity[];
}) {
  return (
    <Card data-testid="collab-activity-feed">
      <h3 className="mb-3 text-sm font-semibold">Unified Activity Feed</h3>
      <ul className="space-y-2 text-sm">
        {items.map((a) => (
          <li key={a.id} className="flex justify-between gap-2 border-b border-line pb-2 last:border-0">
            <div>
              <div className="font-medium">{a.title}</div>
              <div className="studio-muted text-xs">{a.detail}</div>
            </div>
            <Badge>{a.scope}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function PresencePanel({ online }: { online: Participant[] }) {
  return (
    <Card data-testid="presence-panel">
      <h3 className="mb-3 text-sm font-semibold">Who&apos;s Online</h3>
      <ul className="space-y-2 text-sm">
        {online.map((p) => (
          <li key={p.id} className="flex justify-between gap-2">
            <span>{p.displayName}</span>
            <span className="text-xs text-ink-muted">{p.presence}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function NotificationsPanel({ items }: { items: CollaborationNotification[] }) {
  return (
    <Card data-testid="notifications-panel">
      <h3 className="mb-3 text-sm font-semibold">Notifications</h3>
      <ul className="space-y-2 text-sm">
        {items.map((n) => (
          <li key={n.id} className="flex items-start justify-between gap-2 border-b border-line pb-2 last:border-0">
            <div>
              <div className="font-medium">{n.title}</div>
              <div className="studio-muted text-xs">{n.body}</div>
            </div>
            <Badge>{n.read ? "read" : "new"}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function AssignmentsPanel({ items }: { items: Assignment[] }) {
  return (
    <Card data-testid="assignments-panel">
      <h3 className="mb-3 text-sm font-semibold">Assignments</h3>
      <ul className="space-y-2 text-sm">
        {items.map((a) => (
          <li key={a.id} className="flex items-start justify-between gap-2 border-b border-line pb-2 last:border-0">
            <div>
              <div className="font-medium">{a.title}</div>
              <div className="studio-muted text-xs">
                → {a.assigneeId} · {a.priority}
                {a.dueDate ? ` · due ${a.dueDate}` : ""}
              </div>
            </div>
            <Badge>{a.status}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function MultiAgentModelPanel({ nodes }: { nodes: MultiAgentNode[] }) {
  return (
    <Card data-testid="multi-agent-model">
      <h3 className="mb-1 text-sm font-semibold">Multi-Agent Model</h3>
      <p className="studio-muted mb-3 text-xs">
        Architecture only — do not automate agents in BUILD-017. Path to ADF v2.0.
      </p>
      <ol className="space-y-2 text-sm">
        {nodes.map((n) => (
          <li key={n.id} className="rounded-lg border border-line p-2">
            <div className="font-medium">{n.label}</div>
            <div className="studio-muted text-xs">{n.description}</div>
            {n.next.length > 0 && (
              <div className="mt-1 text-xs text-ink-muted">→ {n.next.join(", ")}</div>
            )}
          </li>
        ))}
      </ol>
    </Card>
  );
}
