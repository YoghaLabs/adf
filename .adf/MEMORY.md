# Memory

## Stable Facts

- Top-level architecture locked (ADR-001); no rename/move/new roots.
- `.adf/` is AI Runtime SSOT (ADR-003).
- ADR mandatory for architecture changes (BUILD-003 → BUILD-020).
- **Context Engine (BUILD-004)** is the first engine: shared restore/pipeline/state machine/checkpoints — specification first; executable Runtime Engine is BUILD-005.
- All AIs must follow the same restore workflow (`RESUME_PROTOCOL.md`).
- Checkpoints live in SSOT (`SESSION.md`), not a new top-level folder.
- Root `VERSION` leads identity sync.

## Working Preferences

- Boot V2 → Restore → State machine before IMPLEMENT
- Explain WHY in docs; include examples in protocols
- Prefer Standard context pack for BUILD work

## Watch Items

- Do not start BUILD-005 before Architecture Review of BUILD-004
- Future runtime must implement these specs rather than invent parallel restore logic

## Do Not Store Here

Secrets, large logs, ephemeral speculation.
