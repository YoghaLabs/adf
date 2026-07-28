# adf-core

Runtime core of the AI Development Framework.

## Purpose

`adf-core` will provide the executable foundation for ADF:

- Loading a project and validating locked structure
- Reading and writing `.adf` state (`PROJECT_STATE`, `CURRENT_TASK`, session memory)
- Assembling quick and full context for AI sessions
- Enforcing token budget and knowledge retrieval rules
- Exposing APIs consumed by tools, tests, and ADF Studio

## Status

**Not implemented in BUILD-001.**  
Runtime implementation begins in **BUILD-005**.

This package currently exists to reserve the locked architecture path and document intent so later builds do not invent alternate core locations.

## Planned Surface (BUILD-005+)

| Area | Responsibility |
|------|----------------|
| Project loader | Discover repo root, verify required folders/files |
| State I/O | Safe updates to `.adf` operating files |
| Context assembler | Build QUICK/FULL context packages |
| Contracts | Validate AI_CONTRACT and build gates |

## Related Docs

- `adf-docs/ARCHITECTURE.md`
- `.adf/AI_CONTRACT.md`
- `.adf/PROJECT_MANIFEST.md`
- `ROADMAP.md` (BUILD-005 through BUILD-008)
