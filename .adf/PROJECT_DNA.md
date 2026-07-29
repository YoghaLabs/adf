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
| SSOT discipline | Keep `.adf/` as the only authoritative runtime intelligence surface |

## Architecture Philosophy

- **Locked structure over flexible sprawl** — inventing folders breaks handoff and tooling.
- **Contracts over tribal knowledge** — if a rule matters, write it into `.adf/` or `adf-docs/`.
- **Thin packages with clear ownership** — core, studio, docs, tools, and release stay separated.
- **State is data** — build status and tasks are files, not chat folklore.
- **Extend, do not erase** — later builds add capability; they do not delete foundational docs.
- **Intelligence before automation** — BUILD-002 makes `.adf` complete enough that later tools automate what is already true in files.

## AI First Development

ADF assumes AI agents are first-class operators:

- Agents must boot via `AI_BOOT.md` before editing.
- Agents must obey `AI_CONTRACT.md` and operate per `AI_RUNTIME.md`.
- Agents must update state files when work changes status.
- Agents must stop at BUILD boundaries unless instructed to continue.
- Agents must treat `.adf/` as SSOT even when `adf-docs/` or chat suggest otherwise — resolve conflicts by updating `.adf` deliberately, not by ignoring it.

Human review remains essential; AI-first does not mean unattended chaos.

## Documentation First

Implementation follows documented intent:

1. Define mission and constraints.
2. Document structure and contracts.
3. Implement runtime/GUI only when the BUILD roadmap reaches that stage.
4. Keep docs current when behavior changes.

BUILD-001 shipped foundation docs before runtime code. BUILD-002 ships AI runtime intelligence before bootstrap automation (BUILD-003) and core runtime (BUILD-005).

## Cumulative Build Philosophy

Each BUILD is a scoped, additive unit:

- Completes a defined mission
- Leaves the repository in a handoff-ready state
- Updates changelog, state, and todos
- Does not redesign locked folders
- Does not silently start the next BUILD

This philosophy turns long projects into a chain of verifiable increments instead of a single fragile mega-prompt.

## Repository Intelligence Principle (BUILD-002)

**Why:** without maps, indexes, build history, and operating workflow, every new AI re-discovers the repo from scratch and drifts.

**Therefore:** `.adf` must answer *what exists*, *what is true now*, *what is allowed*, and *what to do next* without requiring private chat context.
