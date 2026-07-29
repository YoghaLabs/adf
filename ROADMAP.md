# ADF Roadmap

This roadmap defines the cumulative build path from foundation to a usable ADF release.
Each BUILD is additive. Later builds must not erase earlier architecture decisions.

**Current version:** `0.3.0-alpha`  
**Current build:** `BUILD-003` (completed; next is BUILD-004)

## Build Path (BUILD-001 → BUILD-020)

| Build | Focus | Outcome | Status |
|-------|--------|---------|--------|
| **BUILD-001** | Repository Foundation | Locked folder structure, root docs, `.adf` operating files, bootstrap, prompts, docs skeleton | ✅ Completed |
| **BUILD-002** | AI Runtime & Repository Intelligence | `.adf` SSOT runtime, maps, standards, build tracking | ✅ Completed |
| **BUILD-003** | **Knowledge Architecture & ADR System** | ADR store, knowledge/context/dependency graphs, timeline, risks | ✅ Completed (review gate) |
| **BUILD-004** | Context Engine | Systematic quick/full context assembly on Knowledge Layer | ⏳ Next |
| **BUILD-005** | ADF Core Runtime (Foundation) | First runtime package in `adf-core` | ⏳ |
| **BUILD-006** | Context Engine Hardening | Token budget enforcement, retrieval quality | ⏳ |
| **BUILD-007** | Task & State Machine | Current task lifecycle, build gating | ⏳ |
| **BUILD-008** | Dependency & Tooling Index | Tool adapters under `tools/` | ⏳ |
| **BUILD-009** | Template System | Templates in `adf-templates/` | ⏳ |
| **BUILD-010** | Examples Pack | Examples in `adf-examples/` | ⏳ |
| **BUILD-011** | Testing Framework | Harness under `testing/` | ⏳ |
| **BUILD-012** | Release Pipeline Prep | Packaging hooks under `release/` | ⏳ |
| **BUILD-013** | ADF Studio Shell | Initial GUI shell | ⏳ |
| **BUILD-014** | Studio Context Views | Visualize context/budget/task | ⏳ |
| **BUILD-015** | Studio Build Runner | Trigger prompt flows from Studio | ⏳ |
| **BUILD-016** | Documentation Completeness | Expand operator/architect guides | ⏳ |
| **BUILD-017** | Integration Hardening | Cross-package tests & recovery | ⏳ |
| **BUILD-018** | Performance & Token Efficiency | Context packing/caching | ⏳ |
| **BUILD-019** | Release Candidate | Freeze APIs, polish, checklist | ⏳ |
| **BUILD-020** | v1.0 Stabilization Gate | Final validation & packaging | ⏳ |

## Principles Across All Builds

1. **Documentation first** — contracts and docs precede runtime code.
2. **Cumulative builds** — each BUILD extends the previous; no redesign of locked folders.
3. **AI-resumable** — every BUILD leaves enough `.adf` context for another AI to continue.
4. **No placeholders** — every file shipped must contain useful content for its role.
5. **ADR mandatory for architecture changes** — from BUILD-003 through BUILD-020.

## Status Legend

- **Done:** BUILD-001, BUILD-002, BUILD-003
- **Next:** BUILD-004 — Context Engine (queued; requires Architecture Review of BUILD-003)
- **Later:** BUILD-005 through BUILD-020
