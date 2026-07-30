# Changelog

**Version source of truth:** root `VERSION` — **ADF** / **1.0.0-rc1** / **BUILD-020** / **develop**

## [Unreleased]

### Added
- Business Strategy package initialized under `business/ADF-v1.0/` (BUSINESS-001 — not BUILD-021)
- Legal Package initialized under `legal/` (post-RC1 enhancement — not BUILD-021)
  - Copyright, ADF Community License, Notice, Authors, Trademark (™), EULA
  - Third-party notices, Contributing, Code of Conduct

### Planned
- BUSINESS-002 Executive Package (business layer)
- GA `1.0.0` — signing, notarization, optional coverage thresholds (no new platforms)

## [1.0.0-rc1] — 2026-07-30

### Added
- Production Release Candidate packaging under `release/`
- Package manifests (Core, Studio, CLI, SDK, Docs, Bootstrap)
- Installer specs (Windows, Linux, macOS, Portable, Offline, Enterprise)
- Website, marketplace, and business assets for demos
- Final guides: Architecture, Developer, User, Administrator, Deployment, Studio, Migration
- `RELEASE_NOTES.md`
- ADR-018 Production Release Principles
- `bootstrap/BUILD-020/`

### Changed
- Version identity advanced to `1.0.0-rc1` / BUILD-020
- Architecture frozen for v1; documentation authoritative for RC1
- `adf-core` / `adf-studio` package versions aligned to RC1

### Locked
- No new platforms / no redesign
- Stop after BUILD-020

## [0.19.0-alpha] — 2026-07-30
