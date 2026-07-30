# Architecture Guide

**ADF v1.0.0-rc1**

Canonical architecture narrative for release candidates.

## Principles

1. Locked top-level repository structure
2. Studio is presentation-only: UI → SDK → Service Layer → Core
3. Documentation and `.adf` contracts are SSOT for continuity
4. AI is a Participant (not a plugin/tool/widget)
5. Orchestration plans; it does not autonomously execute in v1
6. Enterprise governance is modular and service-driven
7. At v1 RC, architecture is **frozen** (ADR-018)

## Deep dives

- `ARCHITECTURE.md` — locked structure
- `STUDIO_ARCHITECTURE.md` — Studio boundaries
- `SERVICE_LAYER.md` — service contracts
- Platform docs: collaboration, orchestration, enterprise, visual, runtime

## Diagram

See `release/website/architecture-diagram.md`.
