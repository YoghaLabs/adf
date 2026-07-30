import { Badge, Card } from "@/components/ui";
import type { Participant, PresenceState } from "@/features/collaboration/types";
import { cn } from "@/utils/cn";

const presenceColor: Record<PresenceState, string> = {
  online: "bg-emerald-400",
  typing: "bg-sky-400",
  working: "bg-accent",
  reviewing: "bg-amber-400",
  idle: "bg-ink-muted",
  offline: "bg-line",
};

export function PresenceDot({ presence }: { presence: PresenceState }) {
  return (
    <span
      data-testid="presence-dot"
      className={cn("inline-block h-2 w-2 rounded-full", presenceColor[presence])}
      title={presence}
    />
  );
}

export function ParticipantCard({
  participant,
  selected,
  onSelect,
}: {
  participant: Participant;
  selected?: boolean;
  onSelect?: (id: string) => void;
}) {
  return (
    <button
      type="button"
      data-testid={`participant-${participant.id}`}
      onClick={() => onSelect?.(participant.id)}
      className={cn(
        "studio-panel w-full p-3 text-left transition hover:border-accent/40",
        selected && "border-accent ring-1 ring-accent/30",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <PresenceDot presence={participant.presence} />
          <span className="font-medium">{participant.displayName}</span>
        </div>
        <Badge>{participant.kind === "ai" ? "AI" : "Human"}</Badge>
      </div>
      <div className="studio-muted mt-2 flex flex-wrap gap-2 text-xs">
        <span>{participant.handle}</span>
        <span>{participant.role}</span>
        <span>{participant.presence}</span>
        {participant.aiKind && <span>{participant.aiKind}</span>}
      </div>
    </button>
  );
}

export function ParticipantProfilePanel({ participant }: { participant: Participant | null }) {
  if (!participant) {
    return (
      <Card data-testid="participant-profile">
        <p className="studio-muted text-sm">Select a participant</p>
      </Card>
    );
  }
  return (
    <Card data-testid="participant-profile">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold">{participant.displayName}</h3>
          <p className="studio-muted text-sm">{participant.handle}</p>
        </div>
        <Badge>{participant.kind}</Badge>
      </div>
      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="studio-muted">Role</dt>
          <dd>{participant.role}</dd>
        </div>
        <div>
          <dt className="studio-muted">Status</dt>
          <dd>{participant.status}</dd>
        </div>
        <div>
          <dt className="studio-muted">Presence</dt>
          <dd className="flex items-center gap-2">
            <PresenceDot presence={participant.presence} />
            {participant.presence}
          </dd>
        </div>
        <div>
          <dt className="studio-muted">Provider</dt>
          <dd>{participant.provider ?? (participant.kind === "human" ? "n/a" : "future")}</dd>
        </div>
      </dl>
      {participant.bio && <p className="studio-muted mt-3 text-sm">{participant.bio}</p>}
      {participant.kind === "ai" && (
        <p className="mt-3 rounded-lg border border-line bg-canvas px-3 py-2 text-xs text-ink-muted">
          AI is a first-class Participant — not a plugin, extension, tool, or widget. Automation is out of scope for BUILD-017.
        </p>
      )}
    </Card>
  );
}
