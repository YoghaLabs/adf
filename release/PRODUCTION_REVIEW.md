# Production Review — BUILD-020

**Version:** `1.0.0-rc1` · **Build:** BUILD-020

## Scope

Production readiness review only. No new platforms. No architectural redesign.
Top-level repository architecture remains **LOCKED**.

## Architecture consistency

| Layer | Status | Notes |
|-------|--------|-------|
| Core (`adf-core`) | Frozen for RC | Service Layer boundary intact |
| Studio (`adf-studio`) | Presentation-only | UI → SDK → Services → Core |
| Docs (`adf-docs`) | Authoritative for v1 | Freeze for RC1 |
| Bootstrap / prompts / `.adf` | SSOT continuity | Resume path intact |
| Release (`release/`) | Packaging SSOT | Bundles + installers + assets |

## Module inventory (cumulative)

BUILD-001…012 Engine & distribution  
BUILD-013…016 Studio UX (workspace, visual, runtime)  
BUILD-017 Collaboration (AI as Participant)  
BUILD-018 Orchestration (no autonomous execution)  
BUILD-019 Enterprise governance  
BUILD-020 Release candidate packaging

## Naming normalization

| Area | Convention |
|------|------------|
| Versions | SemVer + `rc` / `alpha` per `SEMVER_GUIDE.md` |
| Builds | `BUILD-NNN` |
| Studio features | `features/<domain>/` |
| Docs | `SCREAMING_SNAKE.md` topic files |
| ADRs | `.adf/adr/ADR-NNN-*.md` |

## Public API stance (v1.0 RC1)

- Service Layer + SDK clients are the supported integration surface
- Studio stores are presentation caches — not public API
- Fixture providers are for Studio/dev only — not production Core substitutes

## Folder structure

Locked top-level folders unchanged. Release assets live under `release/` only.

## Import / boundary review

- Studio must not contain business logic (ADR-011)
- Collaboration: AI is Participant (ADR-015)
- Orchestration ≠ execution (ADR-016)
- Governance is service-driven; audit immutable (ADR-017)
- Architecture frozen at RC (ADR-018)

## Duplicated documentation

Index docs point to SSOT topics; guides below are RC entry points — do not fork conflicting copies outside `adf-docs/` / `release/`.

## Outcome

**Pass for RC1 packaging** pending quality/security/performance checklists in sibling release docs.
