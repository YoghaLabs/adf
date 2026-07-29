# Changelog

All notable changes to ADF are documented here.  
**Version source of truth:** root `VERSION` — **ADF** / **0.4.0-alpha** / **BUILD-004** / **develop**

## [Unreleased]

### Planned
- BUILD-005: Runtime Engine (executable `adf-core`) after Architecture Review of BUILD-004

## [0.4.0-alpha] — 2026-07-29

### Added
- Context Engine specs: `CONTEXT_ENGINE`, `CONTEXT_PIPELINE`, `RESTORE_SEQUENCE`, `BOOT_SEQUENCE_V2`, `SESSION_LIFECYCLE`, `STATE_MACHINE`, `CHECKPOINTS`, `RESUME_PROTOCOL`
- `.adf/context/` package: README, INPUTS, OUTPUTS, RULES, PIPELINE
- `bootstrap/BUILD-004/` pack
- Prompts: `restore`, `context-engine`, `session`, `checkpoint`, `state`
- Docs: `CONTEXT_ENGINE_GUIDE`, `SESSION_MANAGEMENT`, `CHECKPOINT_SYSTEM`, `STATE_MACHINE`, `AI_RESTORE_GUIDE`

### Changed
- Roadmap focus: engines begin at BUILD-004; BUILD-005 is executable Runtime Engine
- AI Runtime / Workflow updated to bind Boot V2, resume protocol, and state machine
- Version identity advanced to `0.4.0-alpha` / BUILD-004

### Notes
- Spec-only engine layer — no application runtime code in this BUILD
- BUILD-005 must not start until Architecture Review of BUILD-004

## [0.3.0-alpha] — 2026-07-29

### Added
- ADR system + knowledge architecture graphs/glossary/timeline/risks
- `bootstrap/BUILD-003/` pack and knowledge-oriented prompts/docs

### Notes
- Architecture changes require ADRs through BUILD-020

## [0.2.0-alpha] — 2026-07-29

### Added
- AI Runtime SSOT, repository intelligence maps/standards, build tracking, BUILD-002 pack

## [0.1.0-alpha] — 2026-07-29

### Added
- Repository foundation and locked architecture
