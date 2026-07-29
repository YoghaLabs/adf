# Changelog

**Version source of truth:** root `VERSION` — **ADF** / **0.6.0-alpha** / **BUILD-006** / **develop**

## [Unreleased]

### Planned
- BUILD-007 after Architecture Review of BUILD-006

## [0.6.0-alpha] — 2026-07-29

### Added
- Plugin architecture in `adf-core`: contracts, interfaces, PluginManager, built-in plugins
- EventBus lifecycle events + HookRegistry before/after hooks
- ExtensionAPI public surface for third-party plugins
- CLI `plugins list|info|enable|disable` skeleton
- pytest coverage for plugin/event/hook flows
- `bootstrap/BUILD-006/` + prompts + docs (`PLUGIN_ENGINE`, guides)

### Changed
- RuntimeEngine discovers/loads plugins via PluginManager (no direct concrete plugin instantiation)
- Registry supports plugin registration
- Version identity advanced to `0.6.0-alpha` / BUILD-006

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
