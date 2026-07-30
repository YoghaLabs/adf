# Changelog

**Version source of truth:** root `VERSION` — **ADF** / **0.13.0-alpha** / **BUILD-013** / **develop**

## [Unreleased]

### Planned
- BUILD-014 Workspace & Dashboard (Phase 3 — after Architecture Review of BUILD-013)

## [0.13.0-alpha] — 2026-07-30

### Added
- ADF Studio Core in `adf-studio/` (Desktop Control Center, not an IDE)
- Application shell, navigation, dashboard widgets, core pages
- Zustand stores + TanStack Query; SDK TypeScript adapters over ServiceEnvelope fixtures
- ThemeManager (Dark / Light / System); Tauri scaffold
- Vitest + RTL smoke, layout, navigation, SDK tests
- Docs: STUDIO_ARCHITECTURE, STUDIO_UI, STATE_MANAGEMENT, THEME_SYSTEM, DESKTOP_PACKAGING
- ADR-011 ADF Studio Architecture
- Prompts: studio, dashboard, layout, ui
- `bootstrap/BUILD-013/`

### Changed
- Version identity advanced to `0.13.0-alpha` / BUILD-013
- Phase 3 UX started

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
