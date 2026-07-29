# Changelog

**Version source of truth:** root `VERSION` — **ADF** / **0.10.0-alpha** / **BUILD-010** / **develop**

## [Unreleased]

### Planned
- BUILD-011 Marketplace & Registry (Phase 2 — after Architecture Review of BUILD-010)

## [0.10.0-alpha] — 2026-07-30

### Added
- Service Layer in `adf-core/services/` (contracts + ServiceManager + domain services)
- Public SDK in `adf-core/sdk/` with `SDKClient`
- Public package `adf` (`RuntimeService`, `PackageService`, `GeneratorService`, `SDKClient`)
- Studio-ready `WorkspaceService` / `ProjectService`
- ADR-008 Service Layer Architecture
- Docs: SERVICE_LAYER, SERVICE_MANAGER, SDK_GUIDE, SDK_CLIENT, PUBLIC_API
- Prompts: service, sdk, api, workspace, project
- pytest: `tests/test_service_layer.py`
- `bootstrap/BUILD-010/`

### Changed
- CLI calls Service Layer only (no direct engine access)
- Console script entry: `adf.cli:main`
- Version identity advanced to `0.10.0-alpha` / BUILD-010

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
- Plugin Engine

## [0.5.0-alpha] — 2026-07-29

### Added
- Runtime Engine foundation

## [0.4.0-alpha] — earlier

### Added
- Context Engine

## [0.3.0-alpha] — earlier

### Added
- Knowledge Architecture

## [0.2.0-alpha] — earlier

### Added
- AI Runtime

## [0.1.0-alpha] — earlier

### Added
- Repository Foundation
