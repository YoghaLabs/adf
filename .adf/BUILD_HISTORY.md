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
