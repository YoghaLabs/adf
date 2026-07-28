# adf-examples

Curated examples that demonstrate how to use ADF correctly.

## Purpose

Examples teach operators and AI agents how to:

- Bootstrap a new ADF-shaped project
- Maintain `.adf` state across sessions
- Run build / resume / handoff / audit workflows
- Apply templates and interpret architecture contracts

## Status

**Scaffold only in BUILD-001.**  
Concrete example projects land in **BUILD-010**.

Until then, this folder reserves the locked path and documents what examples must eventually cover.

## Example Themes (Planned)

1. Minimal ADF repository with complete `.adf` set
2. Multi-session handoff between two AI agents
3. Build progression sample (foundation → core load)
4. Token-budget-aware context packing

## Rules for Future Examples

- Must match locked top-level architecture
- Must include useful README and expected outcomes
- Must not rely on placeholder docs
- Must be runnable or auditable against `testing/` once the harness exists

## Related Docs

- `adf-docs/GETTING_STARTED.md`
- `adf-templates/README.md`
- `ROADMAP.md` (BUILD-010)
