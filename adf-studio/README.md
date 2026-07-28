# adf-studio

Graphical interface for operating ADF projects.

## Purpose

`adf-studio` will be the human-facing GUI for:

- Opening an ADF repository and viewing build/status
- Inspecting quick/full context and token budget
- Running build / resume / handoff / audit flows
- Navigating knowledge, decisions, and current tasks without editing raw files by hand

## Status

**Not implemented in BUILD-001.**  
GUI work starts in **BUILD-013**, with context views and build runner in BUILD-014–015.

This directory exists to lock the Studio location in the architecture. Do not relocate Studio under another top-level folder.

## Planned Views (BUILD-013+)

| View | Role |
|------|------|
| Project shell | Open repo, show VERSION / BUILD / status |
| Context panel | QUICK_CONTEXT and FULL_CONTEXT visualization |
| Task panel | CURRENT_TASK and TODOS |
| Runner | Trigger prompts from `prompts/` with audit trail |

## Related Docs

- `adf-docs/ARCHITECTURE.md`
- `prompts/README.md`
- `ROADMAP.md` (BUILD-013 through BUILD-015)
