# Changelog

**Version source of truth:** root `VERSION` — **ADF** / **0.9.0-alpha** / **BUILD-009** / **develop**

## [Unreleased]

### Planned
- BUILD-010 after Architecture Review of BUILD-009

## [0.9.0-alpha] — 2026-07-30

### Added
- ADF Package Manager (APM) in `adf-core/packages`
- `package.yaml` spec + local registry (`release/apm-registry`)
- DependencyResolver (cycles + semver), cache, `adf.lock`
- RegistryClient (local + remote-ready adapters)
- CLI: `install` / `remove` / `update` / `search` / `list` / `verify` / `cache`
- ADR-007 Package Management Architecture
- Docs + prompts + `bootstrap/BUILD-009/`
- pytest coverage for install/deps/manifest/version/lock/cache

### Changed
- RuntimeEngine publishes `packages` service
- Version identity advanced to `0.9.0-alpha` / BUILD-009

## [0.8.0-alpha] — 2026-07-29

### Added
- Bootstrap/project generator (manifest-driven)

## [0.7.0-alpha] — 2026-07-29

### Added
- Template Engine

## [0.6.0-alpha] — 2026-07-29

### Added
- Plugin architecture

## [0.5.0-alpha] — 2026-07-29

### Added
- Runtime Engine foundation

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
