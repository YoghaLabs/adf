# ADF Roadmap

This roadmap defines the cumulative build path from foundation to a usable ADF release.
Each BUILD is additive. Later builds must not erase earlier architecture decisions.

**Current version:** `v0.1.0-alpha`  
**Current build:** `BUILD-001`

## Build Path (BUILD-001 → BUILD-020)

| Build | Focus | Outcome |
|-------|--------|---------|
| **BUILD-001** | Repository Foundation | Locked folder structure, root docs, `.adf` operating files, bootstrap, prompts, docs skeleton |
| **BUILD-002** | Knowledge & DNA Hardening | Expand project DNA, knowledge index, decision discipline, and session memory rules |
| **BUILD-003** | Bootstrap Automation | Executable bootstrap flow that validates structure and prepares a fresh workspace |
| **BUILD-004** | Prompt System Contracts | Formalize prompt schemas, handoff format, and audit checklist rigor |
| **BUILD-005** | ADF Core Runtime (Foundation) | First runtime package in `adf-core`: project load, context assembly, state read/write |
| **BUILD-006** | Context Engine | Quick vs full context generation, token budget enforcement, knowledge retrieval |
| **BUILD-007** | Task & State Machine | Current task lifecycle, build gating, PROJECT_STATE transitions |
| **BUILD-008** | Dependency & Tooling Index | Dependency discovery, tool adapters under `tools/`, reproducible environment notes |
| **BUILD-009** | Template System | Project and artifact templates in `adf-templates/` with generation rules |
| **BUILD-010** | Examples Pack | Curated examples in `adf-examples/` demonstrating end-to-end ADF usage |
| **BUILD-011** | Testing Framework | Test harness under `testing/` for contracts, docs integrity, and core behavior |
| **BUILD-012** | Release Pipeline Prep | Versioning, changelog discipline, packaging hooks under `release/` |
| **BUILD-013** | ADF Studio Shell | Initial GUI shell for `adf-studio` (project open, status, build view) |
| **BUILD-014** | Studio Context Views | Visualize quick/full context, token budget, and current task in Studio |
| **BUILD-015** | Studio Build Runner | Trigger build/resume/handoff/audit flows from Studio with prompt integration |
| **BUILD-016** | Documentation Completeness | Expand `adf-docs/` into operator, architect, and contributor guides |
| **BUILD-017** | Integration Hardening | Cross-package integration, contract tests, failure modes and recovery paths |
| **BUILD-018** | Performance & Token Efficiency | Optimize context packing, caching, and budget strategies |
| **BUILD-019** | Release Candidate | Freeze APIs, polish docs/examples, complete release checklist |
| **BUILD-020** | v1.0 Stabilization Gate | Final validation against AI_CONTRACT, architecture lock, and release packaging |

## Principles Across All Builds

1. **Documentation first** — contracts and docs precede runtime code.
2. **Cumulative builds** — each BUILD extends the previous; no redesign of locked folders.
3. **AI-resumable** — every BUILD leaves enough `.adf` context for another AI to continue.
4. **No placeholders** — every file shipped must contain useful content for its role.

## Status Legend

- **Done:** BUILD-001 — Repository Foundation (completed 2026-07-29)
- **Next:** BUILD-002 — Knowledge & DNA Hardening (queued, not started)
- **Later:** BUILD-003 through BUILD-020
