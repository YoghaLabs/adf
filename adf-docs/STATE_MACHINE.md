# State Machine (Guide)

Operator states for ADF sessions:

`BOOT → RESTORE → ANALYZE → PLAN → IMPLEMENT → VERIFY → COMMIT → HANDOFF`

Normative definitions and transition rules: `.adf/STATE_MACHINE.md`.

## Why

Prevents jumping straight to IMPLEMENT and skipping verify/handoff.

## Related

- `AI_RESTORE_GUIDE.md`
- `CONTEXT_ENGINE_GUIDE.md`
