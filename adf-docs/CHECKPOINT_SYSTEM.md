# Checkpoint System (Guide)

Checkpoints preserve operator continuity beyond git commits. Normative rules: `.adf/CHECKPOINTS.md`.

## Why

Commits store files; checkpoints store “where the AI was” in the state machine and what remains.

## Lifecycle

Create → Restore (after full resume) → Validate → Cleanup/summarize

## Related

- `SESSION_MANAGEMENT.md`
- `prompts/checkpoint.md`
