# Naming Convention

**Why:** consistent names make SSOT searchable and prevent parallel files with near-duplicate titles.

## Top-Level Folders

- Locked names only: `.adf`, `adf-core`, `adf-studio`, `adf-docs`, `adf-examples`, `adf-templates`, `bootstrap`, `prompts`, `testing`, `tools`, `release`
- Use kebab-case for multi-word top-level names (`adf-core`, not `adf_core` or `AdfCore`)

## Markdown Files

| Pattern | Use |
|---------|-----|
| `UPPER_SNAKE.md` | Canonical operating/contract docs in `.adf/` and bootstrap packs (`PROJECT_STATE.md`, `AI_BOOT.md`) |
| `README.md` | Folder entry points |
| `kebab-case.md` | Prompt library files (`build.md`, `architecture.md`) |
| `BUILD-00N/` | Per-build directories under `bootstrap/` |

## Version & Build Identifiers

- Version strings: `MAJOR.MINOR.PATCH-prerelease` (example: `0.2.0-alpha`) — **no leading `v`** in `VERSION` or changelog headings
- Build ids: `BUILD-001` … `BUILD-020` (zero-padded to three digits)

## Commit Messages

```text
BUILD-00N: short imperative summary
```

Examples: `BUILD-002: expand AI runtime`

Non-build fixes may use `fix:`, `docs:`, `chore:` when appropriate.

## Prohibited

- Creating `NOTES.md` / `TEMP.md` / `WIP.md` as long-lived SSOT replacements
- Duplicate titles that shadow canonical files (e.g., second `PROJECT_STATE` outside `.adf`)
- Spaces in filenames

## Related

- `ARCHITECTURE_RULES.md`
- `DOCUMENTATION_STANDARD.md`
