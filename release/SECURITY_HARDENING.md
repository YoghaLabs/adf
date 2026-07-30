# Security Hardening — BUILD-020

**Version:** `1.0.0-rc1`

## Dependency review

| Surface | Action for RC1 |
|---------|----------------|
| `adf-studio` npm deps | Pin known versions; run `npm audit` before GA tag |
| `adf-core` Python deps | Review `pyproject.toml` extras; no unpinned wildcards for release wheels |
| Tauri / native | Follow upstream security advisories before installer signing |

## Secret scanning checklist

- [ ] No `.env` / credentials committed
- [ ] No API keys in fixtures beyond clearly fake demo values
- [ ] Enterprise secrets referenced by URI (`secrets://…`) only in Studio fixtures
- [ ] CI secret scan gate recommended before GA (`1.0.0`)

## Configuration review

- Studio config: version/build from `studioConfig` aligned with root `VERSION`
- Registry / marketplace demos under `release/apm-registry/` are non-production
- Offline / enterprise bundles must not embed live customer secrets

## Package integrity

- Manifest hashes planned for APM packages (see `PACKAGE_SECURITY.md`)
- RC1 ships integrity **checklist**; signed artifacts required before GA

## Signing readiness

| Artifact | RC1 | GA |
|----------|-----|-----|
| npm / wheel checksums | Documented | Required |
| Windows installer Authenticode | Ready checklist | Required |
| macOS notarization | Ready checklist | Required |
| Linux package signatures | Ready checklist | Required |

## Outcome

Security posture documented for RC1. Live signing is a GA gate — not a Studio feature.
