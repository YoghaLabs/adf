# BUILD-017 Spec

## Create

`adf-studio/src/features/collaboration/` with:

participants · sessions · activity · comments · reviews · approvals · presence ·
notifications · assignments · timeline · workspace · stores · services · types

## Participants

ParticipantManager · HumanParticipant · AIParticipant · ParticipantProfile ·
ParticipantStatus · ParticipantRole · ParticipantPresence

AI kinds: Architect, Planner, Backend, Frontend, QA, Documentation, DevOps,
Release, Generic, Future providers

## State

ParticipantStore · CollaborationStore · PresenceStore · ReviewStore ·
NotificationStore · AssignmentStore

## SDK

CollaborationClient · ParticipantClient · PresenceClient · ReviewClient ·
NotificationClient · AssignmentClient

## Docs / ADR / Prompts

COLLABORATION_PLATFORM · AI_PARTICIPANTS · MULTI_AGENT_MODEL · REVIEW_WORKFLOW ·
NOTIFICATION_SYSTEM · ADR-015 · prompts listed in MASTER_PROMPT

## Out of scope

Agent automation / orchestration engines
