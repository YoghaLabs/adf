# Changelog

All notable changes to the ADF (AI Development Framework) project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
with an alpha/beta pre-release suffix during early builds.

**Version source of truth:** root `VERSION`  
Current identity from that file: **ADF** / **0.2.0-alpha** / **BUILD-002** / **develop**

## [Unreleased]

### Planned
- BUILD-003: Bootstrap automation (after Architecture Review of BUILD-002)
- Subsequent builds through BUILD-020 (see `ROADMAP.md`)

## [0.2.0-alpha] — 2026-07-29

### Added
- AI Runtime SSOT files: `AI_RUNTIME.md`, `WORKFLOW.md`
- Build tracking: `BUILD_HISTORY.md`, `BUILD_STATUS.md`
- Repository intelligence: `REPOSITORY_MAP.md`, `MODULE_INDEX.md`, `FILE_INDEX.md`
- Standards: `ARCHITECTURE_RULES.md`, `NAMING_CONVENTION.md`, `DOCUMENTATION_STANDARD.md`
- `bootstrap/BUILD-002/` specification pack
- Prompts: `architecture.md`, `planning.md`, `review.md`, `release.md`, `generator.md`
- Docs: `adf-docs/AI_RUNTIME.md`, `BUILD_SYSTEM.md`, `WORKFLOW.md`, `BEST_PRACTICES.md`

### Changed
- Expanded existing `.adf` operating docs for multi-agent resume (manifest, state, task, DNA, contract, boot, contexts, todos, history, session, memory)
- Declared `.adf/` as Single Source of Truth for AI operators
- Advanced version identity to `0.2.0-alpha` / BUILD-002
- Updated README Build Roadmap status for BUILD-002

### Notes
- BUILD-003 must not start until Architecture Review of BUILD-002
- Runtime implementation of `adf-core` remains deferred to BUILD-005

## [0.1.0-alpha] — 2026-07-29

### Added
- Repository foundation (BUILD-001)
- Locked top-level architecture: `.adf/`, `adf-core/`, `adf-studio/`, `adf-docs/`, `adf-examples/`, `adf-templates/`, `bootstrap/`, `prompts/`, `testing/`, `tools/`, `release/`
- Root project files: `README.md`, `LICENSE`, `CHANGELOG.md`, `VERSION`, `ROADMAP.md`, `CONTRIBUTING.md`, `.gitignore`
- `.adf` operating context: manifest, DNA, state, contracts, boot guides, indexes, memory, and session files
- Bootstrap contracts and boot sequence documentation
- Prompt library entry points: build, resume, handoff, audit
- Initial documentation set under `adf-docs/`
- Package stubs with purpose documentation for core, studio, examples, templates, testing, tools, and release

### Changed
- Marked BUILD-001 as **Completed** in `.adf` state, task, session, and quick context files
- Standardized root `VERSION` format (project, version, current build, branch) and aligned changelog section tags to `0.1.0-alpha`
- Added Build Roadmap status table in `README.md`

### Notes
- Runtime implementation of `adf-core` is deferred to BUILD-005
- GUI implementation of `adf-studio` starts at BUILD-013
- Bump version by editing `VERSION` first, then mirror the same version string in this changelog heading
