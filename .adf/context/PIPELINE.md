# Context Engine Pipeline (Detailed)

## Why

Parent `CONTEXT_PIPELINE.md` is the overview; this file is the implementable checklist for humans and future Runtime Engine code.

## Step Checklist

1. **Collect inputs** per `INPUTS.md`
2. **Select pack** Quick / Standard / Deep
3. **Validate** identity, mission alignment, lock integrity
4. **Assemble** working memory (do not mutate SSOT yet)
5. **Emit outputs** per `OUTPUTS.md`
6. **Transition** BOOT → RESTORE → ANALYZE in `STATE_MACHINE.md`
7. **Work** PLAN → IMPLEMENT → VERIFY → COMMIT as needed
8. **Persist** SESSION/TODOS/state; create checkpoint when appropriate

## Example End-to-End

```text
Collect Standard inputs
Validate 0.4.0-alpha / BUILD-004
Emit OUTPUT block
ANALYZE remaining acceptance items
PLAN file list
IMPLEMENT docs
VERIFY acceptance checklist
COMMIT BUILD-004 slices
HANDOFF + checkpoint
```

## Future Runtime Mapping (BUILD-005+)

| Spec step | Future code responsibility |
|-----------|----------------------------|
| Collect/validate | `adf-core` project loader |
| Assemble packs | context assembler |
| Emit outputs | CLI/API responses |
| Checkpoints | structured session store (still under `.adf` semantics) |

## Related

- `RULES.md`
- `../CONTEXT_PIPELINE.md`
- `../CHECKPOINTS.md`
