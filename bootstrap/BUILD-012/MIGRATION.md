# BUILD-012 Migration

## From BUILD-011

| Before | After |
|--------|-------|
| `adf install <package_id>` | `adf install <target>` (package or artifact; `--mode`) |
| `adf update <package_id>` | package update OR `adf update --check/--version/--apply` |
| `adf verify` | packages + distribution installs |
| No release CLI | `adf release …`, `adf package`, `adf bundle`, `adf rollback` |

Artifacts land under `release/dist/` and `.adf/distribution/`.
