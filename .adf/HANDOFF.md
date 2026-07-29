# Handoff — AI Continuity Pack

**Purpose:** Next AI/operator can resume without re-explaining the project from scratch.  
**Last handoff:** 2026-07-30  
**Author of handoff:** Quadran + Cursor agent (BUILD-012 complete)

---

## 30-second identity

| Field | Value |
|-------|-------|
| Repo | `adf` (YoghaLabs) |
| Branch | `develop` |
| Version | `0.12.0-alpha` |
| Current build | **BUILD-012** — Distribution Platform (completed) |
| Next build | **BUILD-013** — ADF Studio Core (**NOT STARTED**) |
| Phase 2 | **Complete** (BUILD-009…012) |

## Hard stops

- Do **not** start BUILD-013 until an explicit master prompt.
- Distribution must stay separate from APM/Marketplace; package installs still delegate to PackageManager.
