# Changelog

All notable changes to the ADF (AI Development Framework) project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
with an alpha/beta pre-release suffix during early builds.

## [Unreleased]

### Planned
- BUILD-002: Project DNA and knowledge system expansion
- Subsequent builds through BUILD-020 (see `ROADMAP.md`)

## [v0.1.0-alpha] — 2026-07-29

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
- Next queued build remains BUILD-002 (not started)
- Finalized foundation commit series on `develop` (initialize → .adf → bootstrap → prompts → docs → finalize)

### Notes
- Runtime implementation of `adf-core` is deferred to BUILD-005
- GUI implementation of `adf-studio` starts at BUILD-013
