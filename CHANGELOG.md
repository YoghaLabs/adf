# Changelog

**Version source of truth:** root `VERSION` — **ADF** / **0.11.0-alpha** / **BUILD-011** / **develop**

## [Unreleased]

### Planned
- BUILD-012 Installer & Distribution (Phase 2 — after Architecture Review of BUILD-011)

## [0.11.0-alpha] — 2026-07-30

### Added
- Registry & Marketplace platform in `adf-core/registry/` (alongside component Registry)
- Providers: local, GitHub, GitLab, enterprise, mock cloud
- MarketplaceManager presentation layer
- RegistryService / MarketplaceService / PublisherService
- SDK: RegistryClient, MarketplaceClient, PublisherClient
- CLI: `publish`, `registry`, `sync` + marketplace search modes
- ADR-009 Registry & Marketplace Architecture
- Docs + prompts + `bootstrap/BUILD-011/`
- pytest `tests/test_marketplace.py`

### Changed
- Package categories expanded for marketplace (legacy types still accepted)
- Version identity advanced to `0.11.0-alpha` / BUILD-011

## [0.10.0-alpha] — 2026-07-30

### Added
- Service Layer + Public SDK + SDKClient
- ADR-008 Service Layer Architecture

### Changed
- CLI via Service Layer only
- Version `0.10.0-alpha` / BUILD-010

## [0.9.0-alpha] — 2026-07-30

### Added
- ADF Package Manager (APM)

## [0.8.0-alpha] — 2026-07-29

### Added
- Bootstrap/project generator

## [0.7.0-alpha] — 2026-07-29

### Added
- Template Engine
