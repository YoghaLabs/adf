# Changelog

**Version source of truth:** root `VERSION` — **ADF** / **0.5.0-alpha** / **BUILD-005** / **develop**

## [Unreleased]

### Planned
- BUILD-006 after Architecture Review of BUILD-005

## [0.5.0-alpha] — 2026-07-29

### Added
- Executable `adf-core` Runtime Engine foundation (Python 3.10+)
- Engines: Runtime, Context, Memory, Bootstrap
- Managers: State, Session, Checkpoint
- Registry, PromptLoader, ProjectLoader, markdown parser helpers
- CLI skeleton: `boot`, `doctor`, `status`, `version`, `context`, `resume`
- pytest suite for runtime/registry/loader/state
- `bootstrap/BUILD-005/` pack
- Prompts: `runtime`, `engine`, `cli`, `registry`, `loader`
- Docs: `RUNTIME_ENGINE`, `CLI_GUIDE`, `ENGINE_OVERVIEW`, `PACKAGE_STRUCTURE`

### Changed
- Version identity advanced to `0.5.0-alpha` / BUILD-005
- Roadmap marks BUILD-005 completed; next BUILD-006 gated

### Notes
- Ephemeral engine artifacts under `.adf/local/` remain gitignored
- Docs remain process SSOT; code implements contracts

## [0.4.0-alpha] — 2026-07-29

### Added
- Context Engine specification and `.adf/context/` contracts

## [0.3.0-alpha] — 2026-07-29

### Added
- ADR system + knowledge architecture

## [0.2.0-alpha] — 2026-07-29

### Added
- AI Runtime SSOT and repository intelligence

## [0.1.0-alpha] — 2026-07-29

### Added
- Repository foundation and locked architecture
