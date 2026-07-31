# release

Release packaging, versioning, and ship checklists for ADF.

## Purpose

`release` owns how ADF versions leave the repository:

- Version alignment with root `VERSION` and `CHANGELOG.md`
- Packaging manifests for distribution
- Installer specifications
- Website / marketplace / business assets for RC demos
- Pre-release and GA checklists

## Status

**Active for BUILD-021 era — ADF `1.0.0-rc1` → GA gates.**

## Layout

| Path | Role |
|------|------|
| `GA_GATES.md` | **SSOT for GA `1.0.0` hard gates** (coverage / signing / tag) |
| `SIGNING.md` | Authenticode / notarization / GPG procedures |
| `PRODUCTION_REVIEW.md` | Architecture / module review |
| `SECURITY_HARDENING.md` | Security checklist |
| `PERFORMANCE.md` | Performance checklist |
| `QUALITY_REPORT.md` | Quality gates |
| `packages/` | Core, Studio, CLI, SDK, Docs, Bootstrap |
| `installers/` | Windows, Linux, macOS, Portable, Offline, Enterprise |
| `website/` | Landing & marketing structure |
| `marketplace/` | Catalog assets |
| `business/` | Positioning / pricing draft / licensing |
| `checklists/readiness.md` | Final RC checklist |
| `apm-registry/` | Demo registry packages |

## Principles

1. `VERSION` is the single source of the current version string.
2. Every released change must appear in `CHANGELOG.md`.
3. A BUILD is not a release by itself — RC/GA map to version tags after gates pass.
4. Documentation and contracts ship with the release.

## Related

- ADR-018
- `adf-docs/RELEASE_NOTES.md`
- `bootstrap/BUILD-020/`
