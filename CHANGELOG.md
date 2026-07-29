# Changelog

**Version source of truth:** root `VERSION` — **ADF** / **0.12.0-alpha** / **BUILD-012** / **develop**

## [Unreleased]

### Planned
- BUILD-013 ADF Studio Core (Phase 3 — after Architecture Review of BUILD-012)

## [0.12.0-alpha] — 2026-07-30

### Added
- Distribution platform in `adf-core/distribution/`
- InstallerManager / UpdateManager / ReleaseManager / RollbackManager
- Packaging: zip, tar.gz, wheel, portable, offline, enterprise, desktop marker
- Services + SDK clients for distribution/installer/updater/release
- CLI: uninstall, release, package, bundle, rollback; extended install/update/verify
- ADR-010 Distribution & Release Architecture
- Docs + prompts + `bootstrap/BUILD-012/`
- pytest `tests/test_distribution.py`

### Changed
- Version identity advanced to `0.12.0-alpha` / BUILD-012
- Phase 2 Platform & Distribution complete

## [0.11.0-alpha] — 2026-07-30

### Added
- Registry & Marketplace platform

## [0.10.0-alpha] — 2026-07-30

### Added
- Service Layer & Public SDK
