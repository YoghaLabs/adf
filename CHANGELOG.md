# Changelog

**Version source of truth:** root `VERSION` — **ADF** / **0.7.0-alpha** / **BUILD-007** / **develop**

## [Unreleased]

### Planned
- BUILD-008 Bootstrap Generator (after BUILD-007 finalize)

## [0.7.0-alpha] — 2026-07-29

### Added
- Template Engine in `adf-core/templates` (`TemplateManager`, loader, registry, builder)
- YAML `template.yaml` manifest parser (schema 1.0) + built-in spec
- VariableResolver + TemplateRenderer + TemplateValidator
- Foundation template at `adf-templates/foundation`
- Docs: TEMPLATE_ENGINE, TEMPLATE_MANIFEST, VARIABLE_SYSTEM, TEMPLATE_REGISTRY
- `bootstrap/BUILD-007/` + template-related prompts
- pytest coverage for load/validate/variables/manifest/render

### Changed
- RuntimeEngine discovers `adf-templates` and publishes `templates` service
- Version identity advanced to `0.7.0-alpha` / BUILD-007
- ROADMAP: BUILD-007 theme clarified to Template Engine (see pack MIGRATION)

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
