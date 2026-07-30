import type { AuditEvent } from "@/features/enterprise/types";

/** Presentation helpers — immutable audit trail display. */

export class AuditTrail {
  constructor(private events: AuditEvent[]) {}

  all(): AuditEvent[] {
    return [...this.events].sort((a, b) => b.at.localeCompare(a.at));
  }

  search(query: string): AuditEvent[] {
    const q = query.trim().toLowerCase();
    if (!q) return this.all();
    return this.all().filter(
      (e) =>
        e.action.toLowerCase().includes(q) ||
        e.resource.toLowerCase().includes(q) ||
        e.detail.toLowerCase().includes(q),
    );
  }

  /** Export is a presentation payload — Core owns real export. */
  exportPayload(): { immutable: true; count: number; events: AuditEvent[] } {
    return { immutable: true, count: this.events.length, events: this.all() };
  }

  assertImmutable(): boolean {
    return this.events.every((e) => e.immutable === true);
  }
}
