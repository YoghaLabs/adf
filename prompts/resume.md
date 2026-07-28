# Prompt — Resume

Use this prompt when continuing ADF work after a pause, crash, or operator switch.

```text
You are resuming work on the ADF repository.

Boot first:
1. Read .adf/QUICK_CONTEXT.md
2. Read .adf/PROJECT_STATE.md
3. Read .adf/CURRENT_TASK.md
4. Read .adf/SESSION.md and .adf/TODOS.md
5. Accept .adf/AI_CONTRACT.md
6. Follow any remaining steps in .adf/AI_BOOT.md

Then:
- Summarize current build, status, and remaining objectives in 5 lines or fewer
- Continue only the unfinished work for the active BUILD
- Do not re-litigate locked architecture decisions
- Do not restart from scratch unless foundation files are missing (then restore foundation first)
- Update SESSION.md with what you complete in this continuation

Stop when active BUILD success criteria are met or when blocked. Document blockers in PROJECT_STATE.md.
```

## Operator Notes

- If `SESSION.md` is stale, reconcile it against the working tree before new feature work.
- Use `audit.md` first if integrity looks doubtful.
