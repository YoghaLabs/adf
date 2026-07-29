# Changelog

**Version source of truth:** root `VERSION` — **ADF** / **0.8.0-alpha** / **BUILD-008** / **develop**

## [Unreleased]

### Planned
- BUILD-009 after Architecture Review of BUILD-008

## [0.8.0-alpha] — 2026-07-29

### Added
- Bootstrap/project generator in `adf-core/generator` (`GeneratorManager`)
- Scaffolder, Writer, FileSystem, ProjectBuilder, BootstrapGenerator
- CLI: `adf init`, `adf new`, `adf generate` (+ dry-run/overwrite)
- Docs: PROJECT_GENERATOR, BOOTSTRAP_GENERATOR, CLI_GENERATOR, SCAFFOLDER
- `bootstrap/BUILD-008/` + generator prompts
- pytest coverage for generator/filesystem/writer/manifest/dry-run

### Changed
- RuntimeEngine publishes `generator` service; doctor reports templates/generator
- Version identity advanced to `0.8.0-alpha` / BUILD-008

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
