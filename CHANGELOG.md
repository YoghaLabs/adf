# Changelog

**Version source of truth:** root `VERSION` — **ADF** / **0.8.0-alpha** / **BUILD-008** / **develop**

## [Unreleased]

### Planned
- BUILD-009 after Architecture Review of BUILD-008

## [0.8.0-alpha] — 2026-07-29

### Added
- Bootstrap/project generator in `adf-core/generator` (`GeneratorManager`)
- Manifest-driven pipeline: resolve → validate → dry-run/write → rollback
- Filesystem abstraction (`DirectoryWriter`, `FileWriter`, `SafeOverwrite`, `AtomicWrite`)
- CLI: `adf init`, `adf new`, `adf generate`, `adf dry-run`, `adf validate`
- Built-in templates: foundation, generic, python, fastapi, laravel, nextjs
- ADR-006 Project Generation Model
- Docs: PROJECT_GENERATOR, BOOTSTRAP_GENERATOR, GENERATION_PIPELINE, FILESYSTEM_ABSTRACTION, DRY_RUN
- pytest coverage for generator/filesystem/manifest/dry-run/rollback/validation

### Changed
- RuntimeEngine publishes `generator` service; doctor reports templates/project types
- Generation structures come from template metadata (no hardcoded project trees)
- Version identity: `0.8.0-alpha` / BUILD-008

## [0.7.0-alpha] — 2026-07-29

### Added
- Template Engine in `adf-core/templates`

## [0.6.0-alpha] — 2026-07-29

### Added
- Plugin architecture in `adf-core`

## [0.5.0-alpha] — 2026-07-29

### Added
- Executable `adf-core` Runtime Engine foundation

## [0.4.0-alpha] — 2026-07-29

### Added
- Context Engine specification

## [0.3.0-alpha] — 2026-07-29

### Added
- ADR + knowledge architecture

## [0.2.0-alpha] — 2026-07-29

### Added
- AI Runtime SSOT

## [0.1.0-alpha] — 2026-07-29

### Added
- Repository foundation
