# ADR-015 — AI Collaboration Architecture

## Title

AI Collaboration Architecture

## Status

Accepted

## Context

ADF must support collaboration among humans, AI participants, and future external
agents. Treating AI as a plugin, extension, tool, or widget collapses identity,
timeline, assignment, and decision history into disposable chrome — blocking the
path to multi-agent workflows (ADF v2.0).

Studio must remain presentation-only (ADR-011). Collaboration truth must live
behind the Service Layer.

## Decision

1. **AI is a Participant.** Same collaboration surface as humans: identity, role,
   presence, timeline/activity, knowledge references, assignments, decision log.
2. **Collaboration is service-driven.** `ParticipantClient`, `CollaborationClient`,
   `PresenceClient`, `ReviewClient`, `NotificationClient`, and `AssignmentClient`
   ferry envelopes; Core owns policy and persistence.
3. **Studio owns only presentation.** Feature modules under
   `adf-studio/src/features/collaboration/` render envelopes; stores are caches.
4. **Multi-agent model is architecture-only in BUILD-017.** Data model + UI + SDK
   + workflow; **no agent automation**.

### Roadmap note

Locked roadmap labeled BUILD-017 as “Testing Framework.” Operator master prompt
BUILD-017 overrides the theme to **AI Collaboration & Multi-Agent Platform**.
Testing Framework moves later unless a future ADR restores it.

## Consequences

- Clear identity model for humans and AIs in one workspace
- Safe Studio UX without embedding orchestration
- Foundation for post–v1.0 multi-agent automation

## Alternatives Considered

| Alternative | Why rejected |
|-------------|--------------|
| AI as plugin/tool/widget | No durable identity / timeline / assignment |
| Collaboration logic in Studio React | Violates ADR-011 |
| Full agent automation in BUILD-017 | Out of scope; premature before v1.0 |

## References

- `adf-docs/COLLABORATION_PLATFORM.md`
- `adf-docs/AI_PARTICIPANTS.md`
- `adf-docs/MULTI_AGENT_MODEL.md`
- ADR-011, ADR-014
- BUILD-017

## Future Impact

Post–v1.0 automation can orchestrate Planner → Architect → Backend/Frontend →
QA → Documentation → Release using this participant model.
