# Project DNA

## Vision

ADF makes AI-assisted software development **structured, resumable, and auditable**. Every project using ADF carries its own operating memory—architecture locks, build state, decisions, and handoff contracts—so progress survives context loss, team changes, and model switches.

## Mission

Provide a production-quality framework where:

1. Documentation and contracts precede implementation.
2. Builds accumulate without rewriting the locked architecture.
3. Any qualified AI can resume work by reading `.adf/` and following the boot sequence.
4. Humans retain a clear map of status, risks, and next actions.

## Goals

| Goal | Description |
|------|-------------|
| Architecture lock | Protect a stable top-level structure across all builds |
| AI continuity | Enable reliable multi-session AI development via boot/handoff contracts |
| Documentation quality | Ship useful docs only—never empty or placeholder files |
| Cumulative delivery | Advance through BUILD-001 → BUILD-020 without redesign churn |
| Runtime readiness | Grow `adf-core` and later Studio on top of a solid foundation |
| Auditability | Keep decisions, changes, and todos discoverable in-repo |

## Architecture Philosophy

- **Locked structure over flexible sprawl** — inventing folders breaks handoff and tooling.
- **Contracts over tribal knowledge** — if a rule matters, write it into `.adf/` or `adf-docs/`.
- **Thin packages with clear ownership** — core, studio, docs, tools, and release stay separated.
- **State is data** — build status and tasks are files, not chat folklore.
- **Extend, do not erase** — later builds add capability; they do not delete foundational docs.

## AI First Development

ADF assumes AI agents are first-class operators:

- Agents must boot via `AI_BOOT.md` before editing.
- Agents must obey `AI_CONTRACT.md`.
- Agents must update state files when work changes status.
- Agents must stop at BUILD boundaries unless instructed to continue.

Human review remains essential; AI-first does not mean unattended chaos.

## Documentation First

Implementation follows documented intent:

1. Define mission and constraints.
2. Document structure and contracts.
3. Implement runtime/GUI only when the BUILD roadmap reaches that stage.
4. Keep docs current when behavior changes.

BUILD-001 deliberately ships documentation and operating files before runtime code.

## Cumulative Build Philosophy

Each BUILD is a scoped, additive unit:

- Completes a defined mission
- Leaves the repository in a handoff-ready state
- Updates changelog, state, and todos
- Does not redesign locked folders
- Does not silently start the next BUILD

This philosophy turns long projects into a chain of verifiable increments instead of a single fragile mega-prompt.
