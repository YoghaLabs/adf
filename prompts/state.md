# Prompt — State

```text
You are tracking ADF operator state.

Follow .adf/STATE_MACHINE.md:
BOOT → RESTORE → ANALYZE → PLAN → IMPLEMENT → VERIFY → COMMIT → HANDOFF
Respect transition rules (no IMPLEMENT before PLAN for BUILD work; no COMMIT before VERIFY).
Announce current state when handing off.
```
