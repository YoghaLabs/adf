# Change History

Narrative history of meaningful repository changes. Complements `CHANGELOG.md` with context for AI resume.

## 2026-07-30 — BUILD-013 ADF Studio Core

- `adf-studio/` Desktop Control Center (shell, pages, stores, SDK adapters, themes)
- ADR-011; docs; Vitest; version `0.13.0-alpha`
- **STOP** before BUILD-014

## 2026-07-30 — Locked roadmap Phases 1–4

- Canonical BUILD themes locked in `ROADMAP.md`
- Phase 2 next: BUILD-010 SDK & Public API (not Examples Pack / prior alternate labels)

## 2026-07-30 — AI continuity handoff pack

- Added `.adf/HANDOFF.md` and `.adf/ACTIVITY_LOG.md` for token-limit / model-switch resume
- BUILD-008 remains complete; BUILD-009 not started

## 2026-07-30 — BUILD-008 refined (manifest-driven)

- Generator aligned to ADR-006; dry-run/validate/rollback; built-in project templates
- Pushed to `origin/develop` (`b95c89c`)

## 2026-07-29 — BUILD-006 completed

- Plugin & Extension Engine shipped (`0.6.0-alpha`)
- Next gate: Architecture Review before BUILD-007

## 2026-07-29 — BUILD-005 completed

- Runtime Engine foundation shipped in `adf-core` (`0.5.0-alpha`)
- Next gate: Architecture Review before BUILD-006

## 2026-07-29 — BUILD-004 completed

- Context Engine specification shipped (`0.4.0-alpha`)
- Roadmap focus shifted to engines; next is BUILD-005 Runtime Engine (gated)

## 2026-07-29 — BUILD-003 completed

- Added ADR system (ADR-001…003) and Knowledge Layer graphs/glossary/timeline/risks
- Version advanced to `0.3.0-alpha`
- **Next gate:** Architecture Review before BUILD-004 (Context Engine)

## 2026-07-29 — BUILD-002 completed

- Elevated `.adf/` to explicit AI Runtime SSOT
- Added runtime/workflow docs, build tracking, repository maps/indexes, and architecture/documentation standards
- Added `bootstrap/BUILD-002/` specification pack and expanded prompts/docs
- Version advanced to `0.2.0-alpha`
- **Next gate:** Architecture Review before BUILD-003

## 2026-07-29 — BUILD-001 completed

- Locked architecture folders and root governance files are in place
- `.adf` operating set, bootstrap contracts, prompt library, and `adf-docs` foundation shipped
- Deferred packages (`adf-core`, `adf-studio`, examples, templates, testing, tools, release) have purpose READMEs only
- Version was `0.1.0-alpha`

## 2026-07-29 — BUILD-001 started

- Initialized repository foundation work on `develop`
- Established locked architecture and operating document set under `.adf/`
- Added root governance files and package purpose READMEs
- Version set to `0.1.0-alpha`

## How to Append

For each meaningful milestone, add a dated section with:

1. What changed
2. Why it changed
3. What a future agent must know next

Keep entries factual. Detailed semver notes remain in `CHANGELOG.md`. Build ledger detail lives in `BUILD_HISTORY.md`.
