# Collaboration Platform

**Build:** BUILD-017 · **Version:** `0.17.0-alpha`

## Purpose

ADF Studio collaboration among **human users**, **AI participants**, and future external agents.

AI is a **first-class Participant** — not a plugin, extension, tool, or widget.

## Data flow

```
UI (Studio presentation)
  → SDK adapters
  → Service Layer
  → Core
```

Studio contains **no business logic**. Stores cache presentation envelopes only.

## Surfaces

| Area | Responsibility |
|------|----------------|
| Participants | Identity, role, status, presence |
| Workspace | Members, invitations, permissions, ownership |
| Sessions | Shared session, prompts, decisions, artifacts |
| Comments | Threads, mentions, resolve/reopen, reactions |
| Reviews | Code / document / AI review queue |
| Approvals | Approve, reject, request changes, decision log |
| Activity | Workspace / project / AI / developer / unified feeds |
| Presence | Online, typing, working, reviewing, idle |
| Notifications | Mentions, assignments, reviews, AI finished, packages, releases |
| Assignments | Assign human or AI; priority, status, due date |
| Multi-agent model | Architecture graph only — **no automation** |

## Scope lock

BUILD-017 delivers **data model, UI, SDK, and workflow**. Full agent orchestration is deferred (path to ADF v2.0).

## Related

- `AI_PARTICIPANTS.md`
- `MULTI_AGENT_MODEL.md`
- `REVIEW_WORKFLOW.md`
- `NOTIFICATION_SYSTEM.md`
- ADR-015
