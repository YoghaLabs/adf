# ADF Roadmap

Cumulative build path. Architecture folders remain LOCKED.

**Current version:** `0.4.0-alpha`  
**Current build:** `BUILD-004` (completed; next BUILD-005 Runtime Engine)

## Focus Shift

| Phase | Builds | Intent |
|-------|--------|--------|
| Documentation & knowledge | BUILD-001 … BUILD-003 | Foundation, SSOT, ADR/knowledge |
| **Engines** | **BUILD-004 → …** | Runnable ADF capability (spec → code → Studio) |

## Build Path (BUILD-001 → BUILD-020)

| Build | Focus | Outcome | Status |
|-------|--------|---------|--------|
| **BUILD-001** | Repository Foundation | Locked structure + foundation docs | ✅ |
| **BUILD-002** | AI Runtime SSOT | `.adf` operate model | ✅ |
| **BUILD-003** | Knowledge Architecture & ADR | Traceable design rationale | ✅ |
| **BUILD-004** | **Context Engine** | Shared restore/pipeline/state/checkpoints (spec) | ✅ (review gate) |
| **BUILD-005** | **Runtime Engine** | Executable `adf-core` implementing Context Engine | ⏳ Next |
| **BUILD-006** | Context Engine Hardening | Token budget/retrieval quality in runtime | ⏳ |
| **BUILD-007** | Task & State Machine | Task lifecycle automation | ⏳ |
| **BUILD-008** | Dependency & Tooling | `tools/` adapters | ⏳ |
| **BUILD-009** | Template System | `adf-templates/` | ⏳ |
| **BUILD-010** | Examples Pack | `adf-examples/` | ⏳ |
| **BUILD-011** | Testing Framework | `testing/` | ⏳ |
| **BUILD-012** | Release Pipeline Prep | `release/` | ⏳ |
| **BUILD-013** | ADF Studio Shell | GUI over engines | ⏳ |
| **BUILD-014** | Studio Context Views | Visualize context/budget/task | ⏳ |
| **BUILD-015** | Studio Build Runner | Trigger flows from Studio | ⏳ |
| **BUILD-016** | Documentation Completeness | Operator/architect guides | ⏳ |
| **BUILD-017** | Integration Hardening | Cross-package tests | ⏳ |
| **BUILD-018** | Performance & Token Efficiency | Packing/caching | ⏳ |
| **BUILD-019** | Release Candidate | Freeze/polish/checklist | ⏳ |
| **BUILD-020** | v1.0 Stabilization Gate | Final validation | ⏳ |

## Principles

1. Documentation first, then engines, then Studio
2. Cumulative builds; no locked-folder redesign
3. ADR required for architecture changes
4. One shared restore workflow for all AIs (Context Engine)
5. No placeholders

## Status Legend

- **Done:** BUILD-001 … BUILD-004
- **Next:** BUILD-005 — Runtime Engine (after Architecture Review of BUILD-004)
- **Later:** BUILD-006 … BUILD-020
