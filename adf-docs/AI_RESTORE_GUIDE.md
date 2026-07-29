# AI Restore Guide

## Why

Every AI (Cursor, ChatGPT, Claude, Codex, OpenCode, …) must restore the same way or ADF cannot claim multi-agent continuity.

## Mandatory Path

1. Boot V2 — `.adf/BOOT_SEQUENCE_V2.md`
2. Resume Protocol — `.adf/RESUME_PROTOCOL.md`
3. Emit Context Engine outputs
4. Enter state machine at ANALYZE/PLAN

## Validation

Identity alignment across `VERSION`, `PROJECT_STATE`, `QUICK_CONTEXT` is mandatory before edits.

## Related

- `.adf/context/INPUTS.md` / `OUTPUTS.md` / `RULES.md`
- `CONTEXT_ENGINE_GUIDE.md`
