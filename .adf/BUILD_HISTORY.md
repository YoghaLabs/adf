# Build History

Ledger of completed (and notable) BUILD increments. **Why:** future AIs must know what already shipped without re-reading the entire git history.

## BUILD-001 — Repository Foundation

| Field | Value |
|-------|-------|
| Date | 2026-07-29 |
| Version | `0.1.0-alpha` |
| Branch | `develop` |
| Purpose | Create the locked repository structure, root governance files, initial `.adf` operating set, bootstrap docs, prompt entry points, and foundation documentation |
| Result | **Completed.** Architecture locked. Deferred packages contain purpose READMEs only. Repository became handoff-ready for cumulative builds. |
| Key commits | Foundation series ending at `cf67df6` (+ follow-up VERSION/README fix `4657bc8`) |

### Outcomes That Must Not Be Undone

- Top-level folder lock
- No-placeholder documentation rule
- Initial AI contract / boot / state files

## BUILD-002 — AI Runtime & Repository Intelligence

| Field | Value |
|-------|-------|
| Date | 2026-07-29 |
| Version | `0.2.0-alpha` |
| Branch | `develop` |
| Purpose | Transform `.adf` into an AI Runtime SSOT with workflow, maps, indexes, standards, build tracking, bootstrap BUILD-002 pack, and expanded prompts/docs |
| Result | **Completed.** SSOT and repository intelligence docs shipped. BUILD-003 not started. Pending Architecture Review gate. |

### Outcomes That Must Not Be Undone

- `.adf` as SSOT for AI operators
- Build history/status tracking files
- Architecture / naming / documentation standards

## BUILD-003 — Knowledge Architecture & ADR System

| Field | Value |
|-------|-------|
| Date | 2026-07-29 |
| Version | `0.3.0-alpha` |
| Branch | `develop` |
| Purpose | Add ADR system and knowledge architecture (graphs, glossary, timeline, risks, tech stack) so design rationale is recoverable without chat |
| Result | **Completed.** ADR-001…003 accepted. Knowledge layer ready as foundation for Context Engine (BUILD-004). Pending Architecture Review gate. |

### Outcomes That Must Not Be Undone

- `.adf/adr/` + `ADR_INDEX.md` as mandatory architecture change log
- Knowledge / Context / Dependency graphs
- Rule: no architecture change without ADR (through BUILD-020)

## BUILD-004 — Context Engine

| Field | Value |
|-------|-------|
| Date | 2026-07-29 |
| Version | `0.4.0-alpha` |
| Branch | `develop` |
| Purpose | Specify the Context Engine — shared restore pipeline, state machine, checkpoints, and resume protocol for all AIs (spec only; not executable runtime yet) |
| Result | **Completed.** First engine layer documented. Foundation for BUILD-005 Runtime Engine. Pending Architecture Review gate. |

### Outcomes That Must Not Be Undone

- Mandatory shared restore workflow for all AIs
- State machine BOOT→HANDOFF
- Checkpoint + resume protocols
- `.adf/context/` I/O contracts

## BUILD-005 — Runtime Engine Foundation

| Field | Value |
|-------|-------|
| Date | 2026-07-29 |
| Version | `0.5.0-alpha` |
| Branch | `develop` |
| Purpose | First executable implementation: Python `adf-core` Runtime Engine foundation (engines, managers, loaders, registry, CLI skeleton, tests) |
| Result | **Completed.** Package runnable via CLI/pytest. Pending Architecture Review before BUILD-006. |

### Outcomes That Must Not Be Undone

- `adf-core` as the home of executable Runtime Engine code
- Implementation follows `.adf` documentation (docs remain SSOT for process)
- CLI + pytest foundation for later hardening builds

## BUILD-006 — Plugin & Extension Engine

| Field | Value |
|-------|-------|
| Date | 2026-07-29 |
| Version | `0.6.0-alpha` |
| Branch | `develop` |
| Purpose | Make RuntimeEngine plugin-based via contracts, PluginManager, events, hooks, and ExtensionAPI |
| Result | **Completed.** Built-in plugins discoverable/loadable; CLI plugins skeleton; tests green. Pending Architecture Review. |

### Outcomes That Must Not Be Undone

- RuntimeEngine must not instantiate concrete plugin classes directly
- Third-party plugins depend on contracts/ExtensionAPI only
- Built-in plugins inherit BasePlugin

## BUILD-007 — Template Engine + Manifest System

| Field | Value |
|-------|-------|
| Date | 2026-07-29 |
| Version | `0.7.0-alpha` |
| Branch | `develop` |
| Purpose | Deliver TemplateManager + YAML manifests so all future generators share one engine |
| Result | **Completed.** Foundation template, schema 1.0, pytest coverage. Independently releasable before BUILD-008. |

### Outcomes That Must Not Be Undone

- Generators must use TemplateManager / template.yaml contracts
- Manifest schema versioning must remain explicit
- `adf-templates/` remains the template package root

## BUILD-008 — Bootstrap Generator

| Field | Value |
|-------|-------|
| Date | 2026-07-29 |
| Version | `0.8.0-alpha` |
| Branch | `develop` |
| Purpose | Implement project generation via GeneratorManager + CLI |
| Result | **Completed.** init/new/generate/doctor wired; tests green. Stop before BUILD-009. |

### Outcomes That Must Not Be Undone

- Generation must go through GeneratorManager + TemplateManager
- Default overwrite protection and dry-run must remain available
- Locked folder scaffolding must match ADR-001

## BUILD-009 — ADF Package Manager (APM)

| Field | Value |
|-------|-------|
| Date | 2026-07-30 |
| Version | `0.9.0-alpha` |
| Branch | `develop` |
| Purpose | Package-based install of templates/plugins/packs via PackageManager |
| Result | **Completed.** Local registry + lockfile/cache/CLI/tests. Stop before BUILD-010. |

### Outcomes That Must Not Be Undone

- Installable artifacts must be packages with `package.yaml`
- CLI must wrap PackageManager only
- No hardcoded package catalogs in RuntimeEngine

## BUILD-010 — Service Layer & Public SDK

| Field | Value |
|-------|-------|
| Date | 2026-07-30 |
| Version | `0.10.0-alpha` |
| Branch | `develop` |
| Purpose | Service Layer + public SDK boundary |
| Result | **Completed.** Stop before BUILD-011. |

## BUILD-011 — Registry & Marketplace

| Field | Value |
|-------|-------|
| Date | 2026-07-30 |
| Version | `0.11.0-alpha` |
| Branch | `develop` |
| Purpose | Registry SSOT + Marketplace presentation |
| Result | **Completed.** Stop before BUILD-012. |

## BUILD-012 — Distribution Platform

| Field | Value |
|-------|-------|
| Date | 2026-07-30 |
| Version | `0.12.0-alpha` |
| Branch | `develop` |
| Purpose | Installer / updater / release / packaging |
| Result | **Completed.** Phase 2 complete. Stop before BUILD-013. |

## BUILD-013 — ADF Studio Core

| Field | Value |
|-------|-------|
| Date | 2026-07-30 |
| Version | `0.13.0-alpha` |
| Branch | `develop` |
| Purpose | Desktop Control Center (UI → SDK → Services → Core) |
| Result | **Completed.** Shell, pages, stores, SDK adapters, themes, tests, ADR-011. Stop before BUILD-014. |

### Outcomes That Must Not Be Undone

- Studio must not contain business logic
- SDK adapters mandatory for Studio → Core traffic
- Services remain backend-only

## BUILD-014 — Workspace Experience Platform

| Field | Value |
|-------|-------|
| Date | 2026-07-30 |
| Version | `0.14.0-alpha` |
| Branch | `develop` |
| Purpose | Workspace → Projects → Sessions experience in Studio |
| Result | **Completed.** Feature module, SDK clients, stores, search/activity, ADR-012. Stop before BUILD-015. |

### Outcomes That Must Not Be Undone

- Workspace is the top-level user object
- Projects belong to workspaces; sessions belong to projects
- No business logic in Studio UI

## BUILD-015 — Visual Intelligence Platform

| Field | Value |
|-------|-------|
| Date | 2026-07-30 |
| Version | `0.15.0-alpha` |
| Branch | `develop` |
| Purpose | Read-only visual intelligence graphs in Studio |
| Result | **Completed.** React Flow + graph engine + ADR-013. Stop before BUILD-016. |

### Outcomes That Must Not Be Undone

- Graphs are read-only presentation
- Visualization separated from SDK; rendering UI-only

## BUILD-016 — AI Runtime Dashboard & Observability

| Field | Value |
|-------|-------|
| Date | 2026-07-30 |
| Version | `0.16.0-alpha` |
| Branch | `develop` |
| Purpose | Read-only AI runtime observability in Studio |
| Result | **Completed.** Dashboard/metrics/logs/diagnostics; ADR-014; Phase 3 complete. Stop before BUILD-017. |

### Outcomes That Must Not Be Undone

- Runtime Dashboard is read-only
- Logs/metrics from Service Layer envelopes
- Studio does not own runtime state

## BUILD-017 — AI Collaboration & Multi-Agent Platform

| Field | Value |
|-------|-------|
| Date | 2026-07-30 |
| Version | `0.17.0-alpha` |
| Branch | `develop` |
| Purpose | Humans + AI as first-class Participants; collaboration model/UI/SDK/workflow |
| Result | **Completed.** ADR-015; no agent automation. Theme override from Testing Framework. Stop before BUILD-018. |

### Outcomes That Must Not Be Undone

- AI is a Participant (not plugin/extension/tool/widget)
- Collaboration is service-driven; Studio presentation-only
- Multi-agent graph is architecture-only until explicitly unlocked

## BUILD-018 — AI Orchestration Platform

| Field | Value |
|-------|-------|
| Date | 2026-07-30 |
| Version | `0.18.0-alpha` |
| Branch | `develop` |
| Purpose | Workflow/pipeline/gates/artifacts/execution planning — no autonomous run |
| Result | **Completed.** ADR-016; theme override from Audit Framework. Stop before BUILD-019. |

### Outcomes That Must Not Be Undone

- Orchestration separated from execution
- AI Participants are orchestrated (not demoted to tools)
- Workflow owns lifecycle; no AI automation in this build

## BUILD-019 — Enterprise Governance Platform

| Field | Value |
|-------|-------|
| Date | 2026-07-30 |
| Version | `0.19.0-alpha` |
| Branch | `develop` |
| Purpose | Modular enterprise governance (org/identity/RBAC/audit/compliance) |
| Result | **Completed.** ADR-017; theme override from Release Candidate. Stop before BUILD-020. |

### Outcomes That Must Not Be Undone

- Governance is service-driven; Studio presentation-only
- RBAC is hierarchical
- Audit is immutable
- Enterprise features remain modular (no redesign / no new platform)

## BUILD-020 — Production Release Candidate

| Field | Value |
|-------|-------|
| Date | 2026-07-30 |
| Version | `1.0.0-rc1` |
| Branch | `develop` |
| Purpose | Production readiness, packaging, docs freeze, RC assets |
| Result | **Completed.** ADR-018; architecture frozen; stop — no BUILD-021. |

### Outcomes That Must Not Be Undone

- Architecture frozen for v1
- Documentation authoritative for RC1
- v1.0 marks API stability intent
- No new platforms invented in release candidate

## Template for Future Entries

```markdown
## BUILD-00N — Title

| Field | Value |
|-------|-------|
| Date | YYYY-MM-DD |
| Version | x.y.z-alpha |
| Branch | develop |
| Purpose | ... |
| Result | Completed | Blocked | Partial — with notes |
```
