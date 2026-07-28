# What is ADF?

ADF (AI Development Framework) is a repository-native operating system for AI-assisted software development.

## The Problem

AI coding sessions lose context. Architecture decisions live in chat. The next agent (or human) cannot reliably resume. Teams either over-prompt every time or silently drift from the intended design.

## The ADF Answer

ADF keeps the following **inside the repository**:

- Project DNA (vision, mission, philosophy)
- Live build state and current task
- AI contracts and boot procedure
- Decision and change memory
- Prompt entry points for build / resume / handoff / audit
- Locked architecture boundaries

Code still matters — `adf-core` and `adf-studio` come in later builds — but ADF treats **continuity and contracts as first-class artifacts**.

## Who It Is For

- Teams using AI agents across multiple sessions
- Solo builders who need resumable project memory
- Organizations that want auditable AI development process, not only generated code

## Who It Is Not For (Yet)

- Users expecting a finished GUI in BUILD-001
- Projects that need a free-form folder layout (ADF locks top-level structure on purpose)

## Core Ideas

| Idea | Meaning |
|------|---------|
| AI-first | Agents are expected operators with explicit boot/contract rules |
| Documentation-first | Useful docs precede runtime features |
| Cumulative builds | BUILD-001 → BUILD-020, additive and bounded |
| Architecture lock | Top-level folders are stable across builds |

## Current Stage

ADF is at `0.1.0-alpha`, **BUILD-001**: repository foundation. The framework is operable as a process/documentation system now; runtime and Studio arrive in later builds.
