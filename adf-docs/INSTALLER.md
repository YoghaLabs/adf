# Installer

## InstallerManager

| Method | Role |
|--------|------|
| `install` | Package id (delegates to PackageManager) or distribution artifact |
| `repair` | Recompute install checksum |
| `verify` | Distribution installs + package lockfile |
| `uninstall` | Remove distribution install or package |

CLI: `adf install`, `adf uninstall`, `adf verify`
