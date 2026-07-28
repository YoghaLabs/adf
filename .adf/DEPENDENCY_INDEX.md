# Dependency Index

## Current Posture (BUILD-001)

BUILD-001 is documentation and repository foundation only. There is **no runtime language dependency tree** yet for `adf-core` or `adf-studio`.

| Category | Status | Notes |
|----------|--------|-------|
| Node/npm packages | Not introduced | Expected when Studio/tooling lands |
| Python packages | Not introduced | Optional later for tools/core helpers |
| System packages | None required | Git is assumed for contributors |
| External SaaS | None required | Repo is self-contained for foundation work |

## Assumed Contributor Tooling

- Git
- A markdown-capable editor or IDE
- Network access only when cloning/pulling/pushing

## Future Dependency Policy (Preview)

When dependencies are introduced in later builds:

1. Record them here with purpose and owning package
2. Prefer minimal, well-maintained libraries
3. Do not add dependencies that force top-level architecture changes
4. Keep secrets out of the repo (see `.gitignore`)
5. Update `CHANGELOG.md` when dependency posture materially changes

## Package Ownership (Planned)

| Package | Likely dependency domain |
|---------|--------------------------|
| `adf-core` | Runtime language + test libs (BUILD-005+) |
| `adf-studio` | UI framework stack (BUILD-013+) |
| `tools` | CLIs/scripts supporting validation and bootstrap |
| `testing` | Test runners and assertion utilities |
| `release` | Packaging/publish tooling |

## Review Checklist for New Dependencies

- [ ] Necessary for the active BUILD mission
- [ ] Documented in this index
- [ ] Compatible with MIT licensing posture
- [ ] No requirement to rename/add top-level folders
