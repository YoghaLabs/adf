import type {
  Participant,
  ParticipantKind,
  ParticipantRole,
  PresenceState,
} from "@/features/collaboration/types";

/** Presentation helpers — no business logic / no automation. */
export class ParticipantProfile {
  constructor(public readonly participant: Participant) {}

  get isAi(): boolean {
    return this.participant.kind === "ai";
  }

  get isHuman(): boolean {
    return this.participant.kind === "human";
  }

  label(): string {
    return `${this.participant.displayName} (${this.participant.role})`;
  }
}

export class HumanParticipant extends ParticipantProfile {
  static from(participant: Participant): HumanParticipant {
    if (participant.kind !== "human") {
      throw new Error("not a human participant");
    }
    return new HumanParticipant(participant);
  }
}

export class AIParticipant extends ParticipantProfile {
  static from(participant: Participant): AIParticipant {
    if (participant.kind !== "ai") {
      throw new Error("not an AI participant");
    }
    return new AIParticipant(participant);
  }

  get agentKind() {
    return this.participant.aiKind ?? "generic";
  }
}

export class ParticipantStatusView {
  static label(status: Participant["status"]): string {
    return status;
  }
}

export class ParticipantRoleView {
  static label(role: ParticipantRole): string {
    return role;
  }
}

export class ParticipantPresenceView {
  static label(presence: PresenceState): string {
    return presence;
  }

  static isActive(presence: PresenceState): boolean {
    return presence !== "offline" && presence !== "idle";
  }
}

export class ParticipantManager {
  constructor(private participants: Participant[]) {}

  all(): Participant[] {
    return [...this.participants];
  }

  byKind(kind: ParticipantKind): Participant[] {
    return this.participants.filter((p) => p.kind === kind);
  }

  byId(id: string): Participant | undefined {
    return this.participants.find((p) => p.id === id);
  }

  ai(): AIParticipant[] {
    return this.byKind("ai").map((p) => AIParticipant.from(p));
  }

  humans(): HumanParticipant[] {
    return this.byKind("human").map((p) => HumanParticipant.from(p));
  }

  online(): Participant[] {
    return this.participants.filter((p) => p.presence !== "offline");
  }
}
