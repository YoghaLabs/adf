# SemVer Guide (APM)

ADF Package Manager uses semantic versioning for package versions and constraints.

## Versions

Examples: `1.0.0`, `0.9.0-alpha`

## Constraints

| Form | Meaning |
|------|---------|
| `*` / `latest` | Any |
| `1.2.3` | Exact |
| `^1.2.3` | Compatible major (for `0.x`, same minor) |
| `~1.2.3` | Same major.minor, patch ≥ |
| `>=1.2.3` / `>` / `<=` / `<` | Comparisons |

Module: `adf-core/packages/dependency.py`
