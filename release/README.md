# release

Release packaging, versioning, and ship checklists for ADF.

## Purpose

`release` owns how ADF versions leave the repository:

- Version alignment with root `VERSION` and `CHANGELOG.md`
- Packaging artifacts for distribution
- Pre-release and GA checklists
- Notes linking ROADMAP build gates to shippable milestones

## Status

**Scaffold only in BUILD-001.**  
Release pipeline preparation is planned for **BUILD-012**, with release candidate and v1.0 gate work in BUILD-019–020.

## Release Principles

1. `VERSION` is the single source of the current version string.
2. Every released change must appear in `CHANGELOG.md`.
3. A BUILD is not a release by itself — releases map to version tags after gates pass.
4. Documentation and contracts ship with the release; they are not optional extras.

## Planned Contents

| Artifact | Role |
|----------|------|
| Checklists | Preflight before tagging |
| Packaging scripts | Build distributable archives or packages |
| Notes templates | Release note generation from CHANGELOG |
| Gate reports | Evidence for BUILD-019 / BUILD-020 |

## Related Docs

- `VERSION`
- `CHANGELOG.md`
- `ROADMAP.md` (BUILD-012, BUILD-019, BUILD-020)
- `.adf/AI_CONTRACT.md`
