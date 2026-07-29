# Boot Sequence V2

## Why V2

`AI_BOOT.md` established cold-start reading. V2 binds boot to the **Context Engine** pipeline, state machine entry, and checkpoint awareness so all AIs share one operational boot.

V2 **extends** V1; it does not delete `AI_BOOT.md`.

## V2 Boot Steps

1. **Root check** — `.adf/`, `VERSION`, locked folders present
2. **Engine acknowledge** — read `CONTEXT_ENGINE.md` (know that restore is mandatory)
3. **Run restore sequence** — follow `RESTORE_SEQUENCE.md` exactly
4. **Select context pack** — Quick / Standard / Deep per `TOKEN_BUDGET.md`
5. **Validate identity** — VERSION ↔ STATE ↔ QUICK_CONTEXT
6. **Enter state machine** — start at `BOOT` → transition to `RESTORE` → `ANALYZE`
7. **Do not implement** until `PLAN` (or explicit tiny-fix exception documented in SESSION)

## Example

```text
Boot V2:
- Engine: Context Engine recognized
- Pack: Standard
- Identity: 0.4.0-alpha / BUILD-004 / develop — OK
- State machine: BOOT → RESTORE → ANALYZE
```

## Compatibility

| Audience | Use |
|----------|-----|
| New sessions (all AIs) | Prefer Boot V2 |
| Short pointer | `AI_BOOT.md` still valid; should defer to V2 when engine files exist |
| Humans | `adf-docs/AI_RESTORE_GUIDE.md` |

## Related

- `SESSION_LIFECYCLE.md`
- `STATE_MACHINE.md`
- `.adf/context/RULES.md`
