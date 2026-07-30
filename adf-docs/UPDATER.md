# Updater

## UpdateManager

Independent from Package Manager package updates.

| Method | Role |
|--------|------|
| `check` | Inspect release channel for newer versions |
| `download` | Cache a release locally |
| `apply` | Install pending release (snapshots first) |
| `rollback` | Restore rollback snapshot |

CLI: `adf update --check`, `adf update --version X`, `adf update --apply`, `adf rollback`
