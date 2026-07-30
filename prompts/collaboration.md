# Prompt — Collaboration Platform

Use when extending AI collaboration in ADF Studio.

## Rules

- AI is a **Participant**, not a plugin/extension/tool/widget
- Path: UI → SDK → Service Layer → Core
- Studio = presentation only
- No agent automation unless a future build explicitly unlocks it
- Prefer fixtures + SDK clients for envelopes

## Deliverables checklist

- Types under `features/collaboration/types`
- Stores as presentation caches
- SDK clients + fixture methods
- Docs remain SSOT
