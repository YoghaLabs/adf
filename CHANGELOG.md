# Changelog

All notable changes to the ADF (AI Development Framework) project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
with an alpha/beta pre-release suffix during early builds.

**Version source of truth:** root `VERSION`  
Current identity from that file: **ADF** / **0.3.0-alpha** / **BUILD-003** / **develop**

## [Unreleased]

### Planned
- BUILD-004: Context Engine (after Architecture Review of BUILD-003)
- Subsequent builds through BUILD-020 (see `ROADMAP.md`)

## [0.3.0-alpha] — 2026-07-29

### Added
- ADR system under `.adf/adr/` (`ADR-001` Repository Structure, `ADR-002` Build Lifecycle, `ADR-003` AI Runtime)
- Knowledge architecture: `ADR_INDEX`, `GLOSSARY`, knowledge/context/dependency graphs, timeline, milestones, risk register, tech stack
- `bootstrap/BUILD-003/` specification pack (incl. `MIGRATION.md`)
- Prompts: `knowledge`, `adr`, `documentation`, `context`, `bootstrap`
- Docs: `KNOWLEDGE_ARCHITECTURE`, `ADR_GUIDE`, `CONTEXT_ENGINE`, `MEMORY_SYSTEM`, `PROJECT_LIFECYCLE`

### Changed
- Advanced version identity to `0.3.0-alpha` / BUILD-003
- Updated README Architecture Evolution + ROADMAP statuses
- Clarified BUILD-003 mission as Knowledge Architecture & ADR (see bootstrap migration notes)

### Notes
- Permanent rule: architecture changes require ADRs through BUILD-020
- BUILD-004 must not start until Architecture Review of BUILD-003

## [0.2.0-alpha] — 2026-07-29

### Added
- AI Runtime SSOT files: `AI_RUNTIME.md`, `WORKFLOW.md`
- Build tracking: `BUILD_HISTORY.md`, `BUILD_STATUS.md`
- Repository intelligence: `REPOSITORY_MAP.md`, `MODULE_INDEX.md`, `FILE_INDEX.md`
- Standards: `ARCHITECTURE_RULES.md`, `NAMING_CONVENTION.md`, `DOCUMENTATION_STANDARD.md`
- `bootstrap/BUILD-002/` specification pack
- Prompts: `architecture.md`, `planning.md`, `review.md`, `release.md`, `generator.md`
- Docs: `adf-docs/AI_RUNTIME.md`, `BUILD_SYSTEM.md`, `WORKFLOW.md`, `BEST_PRACTICES.md`

### Changed
- Expanded existing `.adf` operating docs for multi-agent resume
- Declared `.adf/` as Single Source of Truth for AI operators
- Advanced version identity to `0.2.0-alpha` / BUILD-002

### Notes
- Runtime implementation of `adf-core` remains deferred to BUILD-005

## [0.1.0-alpha] — 2026-07-29

### Added
- Repository foundation (BUILD-001)
- Locked top-level architecture and root governance files
- Initial `.adf` operating context, bootstrap docs, prompts, and `adf-docs` foundations

### Notes
- Bump version by editing `VERSION` first, then mirror the same version string in this changelog heading
