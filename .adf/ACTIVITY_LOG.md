# Activity Log

Chronological operator/AI activity log for continuity across sessions and model switches.  
**Newest entries first.** Keep entries factual and short.

---

## 2026-07-30 — BUILD-015 Visual Intelligence Platform

- `features/visual/` graph engine + React Flow; 10 graph modules
- Knowledge/Dependency/Graph/Visualization SDK clients; ADR-013
- Version `0.15.0-alpha`; **STOP before BUILD-016**

## 2026-07-30 — BUILD-014 Workspace Experience Platform

- `features/workspace/` manager, project explorer, sessions, activity, search
- SDK clients + stores; ADR-012; docs; Vitest; `bootstrap/BUILD-014/`
- Version `0.14.0-alpha`; **STOP before BUILD-015**

## 2026-07-30 — BUILD-013 ADF Studio Core

- Desktop Control Center under `adf-studio/` (UI → SDK → Services → Core)
- Shell, dashboard, navigation pages, Zustand stores, SDK adapters, themes
- ADR-011; docs; prompts; Vitest; `bootstrap/BUILD-013/`
- Version `0.13.0-alpha`; **STOP before BUILD-014**

## 2026-07-30 — BUILD-012 Distribution Platform

- Added `adf-core/distribution/` installer/updater/release/packaging/offline/enterprise
- Services/SDK/CLI wired; ADR-010; Phase 2 complete
- Version `0.12.0-alpha`; **STOP before BUILD-013**

## 2026-07-30 — BUILD-011 Registry & Marketplace Platform

- RegistryManager + providers; Marketplace presentation-only
- Services/SDK/CLI publish-registry-sync; ADR-009
- Version `0.11.0-alpha`; **STOP before BUILD-012**

## 2026-07-30 — BUILD-010 Service Layer & Public SDK

- Added `adf-core/services/` + `adf-core/sdk/` + public package `adf`
- CLI refactored to ServiceManager only; ADR-008 accepted
- Version `0.10.0-alpha`; **STOP before BUILD-011**

## 2026-07-30 — Locked roadmap adopted (Phases 1–4)

- Operator locked roadmap themes:
  - Phase 1 Engine Foundation: BUILD-001…008 ✅
  - Phase 2 Platform & Distribution: BUILD-009 APM ✅ · BUILD-010 SDK & Public API · BUILD-011 Marketplace & Registry · BUILD-012 Installer & Distribution
  - Phase 3 UX: BUILD-013…016 Studio/workspace/graph/monitor
  - Phase 4 Production: BUILD-017…020 testing/audit/RC/v1.0
- Updated `ROADMAP.md` + continuity SSOT; **do not start BUILD-010** until master prompt

## 2026-07-30 — BUILD-009 ADF Package Manager (APM)

- Implemented `adf-core/packages` PackageManager + resolver/registry/cache/lockfile
- CLI: install/remove/update/search/list/verify/cache
- ADR-007 accepted; seed packages in `release/apm-registry`
- Version `0.9.0-alpha`; tests 27 passed; **STOP before BUILD-010**

## 2026-07-30 — Handoff pack prepared (pre-BUILD-009)

- Created/updated `.adf/HANDOFF.md` + this `ACTIVITY_LOG.md` so a new AI can resume without full re-brief
- Status unchanged: BUILD-008 complete; BUILD-009 not started
- Branch `develop` @ `b95c89c` synced with origin

## 2026-07-30 — BUILD-008 master-prompt refinement (manifest-driven)

- Aligned generator to full BUILD-008 mission: no hardcoded project structures
- Added `manager.py`, `template_resolver.py`, `manifest_loader.py`, `dry_run.py`, `validator.py`, `progress.py`
- Filesystem abstraction: `DirectoryWriter`, `FileWriter`, `SafeOverwrite`, `AtomicWrite` + rollback journal
- CLI: `adf dry-run`, `adf validate` (plus existing init/new/generate)
- Built-in templates: foundation (expanded `.adf` set), generic, python, fastapi, laravel, nextjs
- ADR-006 Project Generation Model accepted
- Tests: 22 passed; pushed `178c824..b95c89c` to `origin/develop`

## 2026-07-29 — Batch BUILD-007 then BUILD-008 (initial)

- BUILD-007 Template Engine (`0.7.0-alpha`): TemplateManager, YAML manifests, variables, renderer, foundation template
- BUILD-008 initial generator + CLI init/new/generate (`0.8.0-alpha`)
- Builds committed separately (not combined); stopped before BUILD-009

## 2026-07-29 — Merge develop → main (through BUILD-006 era)

- User requested merge everything to `main`
- Merge commit landed; later work continued on `develop` through BUILD-008

## 2026-07-29 — BUILD-006 Plugin & Extension Engine

- PluginManager, contracts, events, hooks, ExtensionAPI
- RuntimeEngine loads plugins via manager (no direct concrete instantiation)
- Version `0.6.0-alpha`

## 2026-07-29 — BUILD-005 Runtime Engine Foundation

- First executable `adf-core` Python package + CLI boot/doctor/status/…
- Version `0.5.0-alpha`

## 2026-07-29 — BUILD-004 … BUILD-001

- BUILD-004 Context Engine spec
- BUILD-003 Knowledge Architecture + ADR-001…003
- BUILD-002 AI Runtime SSOT
- BUILD-001 Locked repository foundation

---

## How to append

When ending a session, add a dated section at the top with:

- What landed (build/version/HEAD if known)
- Key decisions / ADRs
- What must not be redone
- Exact next stop rule
