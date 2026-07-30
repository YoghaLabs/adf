# ADR-016 — AI Orchestration Architecture

## Title

AI Orchestration Architecture

## Status

Accepted

## Context

BUILD-017 established AI Participants. Operators need a unified way to plan how
participants, knowledge, reviews, and artifacts move through a delivery lifecycle
without granting Studio (or agents) autonomous execution.

Treating “workflow” as the whole product understates the platform: orchestration
also covers pipelines, gates, artifacts, dependencies, visual boards, and
execution **planning**.

## Decision

1. **Orchestration is separated from execution.** BUILD-018 ships models, state,
   plans, and gates. Nothing auto-runs AI participants.
2. **AI Participants are orchestrated.** Assignments and stage ownership reference
   participant identities from BUILD-017; orchestration does not demote AI to tools.
3. **Workflow owns lifecycle.** Instance state (draft/planned/active/…) is the
   lifecycle spine; pipelines and stages realize that spine visually and
   operationally — still without autonomous execution.
4. **Studio remains presentation-only.** SDK clients ferry envelopes; Core owns
   policy.

### Roadmap note

Locked roadmap labeled BUILD-018 as “Audit Framework.” Operator master prompt
BUILD-018 overrides the theme to **AI Orchestration Platform**. Audit Framework
moves later unless a future ADR restores it.

## Consequences

- Clear planning surface across Workspace, Collaboration, Knowledge, Runtime, Visual
- Safe path toward future automation after ADF v1.0 without baking runners into Studio
- Workflow ≠ entire orchestration platform

## Alternatives Considered

| Alternative | Why rejected |
|-------------|--------------|
| Autonomous agent runners in BUILD-018 | Explicitly forbidden |
| Workflow-only engine | Too narrow vs platform intent |
| Orchestration logic in React stores | Violates ADR-011 |

## References

- `adf-docs/ORCHESTRATION_PLATFORM.md`
- ADR-011, ADR-015
- BUILD-018

## Future Impact

Post–v1.0 execution engines can consume these plans/gates without redesigning identity.
