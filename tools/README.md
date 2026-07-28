# tools

Developer and automation tools that support ADF workflows.

## Purpose

`tools` will host scripts and utilities for:

- Validating repository structure against the locked architecture
- Assisting bootstrap and context generation
- Dependency and environment helpers
- Maintenance tasks that should not live inside `adf-core` runtime APIs

## Status

**Scaffold only in BUILD-001.**  
Tool adapters and dependency indexing are planned around **BUILD-008**, with earlier bootstrap automation in BUILD-003.

## Design Rules

- Tools must not invent new top-level project folders
- Tools should prefer reading contracts from `.adf/` and `bootstrap/`
- Destructive operations require explicit confirmation and must never delete documentation
- Output should be machine-readable when used by Studio or CI

## Planned Tool Groups

| Group | Examples |
|-------|----------|
| Structure | Architecture lock validator |
| Context | Quick/full context builders (pre-core helpers) |
| Dependencies | Inventory and compatibility checks |
| Release | Packaging helpers used by `release/` |

## Related Docs

- `bootstrap/README.md`
- `.adf/DEPENDENCY_INDEX.md`
- `ROADMAP.md` (BUILD-003, BUILD-008)
