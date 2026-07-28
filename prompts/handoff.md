# Prompt — Handoff

Use this prompt to end a session cleanly so another human or AI can continue.

```text
You are preparing a handoff for the ADF repository.

Do the following:
1. Summarize what was completed in this session
2. List exact files/folders created or modified
3. List remaining work for the active BUILD (if any)
4. Update .adf/SESSION.md with next-agent instructions
5. Update .adf/TODOS.md to match reality
6. Update .adf/PROJECT_STATE.md if status changed
7. Update CHANGELOG.md if user-visible/foundation changes landed
8. Append a brief note to .adf/CHANGE_HISTORY.md for meaningful milestones
9. Confirm whether bootstrap/BUILD_CONTRACT.md is satisfied

Rules:
- Do not start the next BUILD during handoff unless the user explicitly launches it
- Do not delete documentation
- Leave the repo bootable via .adf/AI_BOOT.md

Finish with a concise handoff block:
- Build / version / status
- Done
- Remaining
- Risks
- Next command/prompt to use (build, resume, or audit)
```

## Operator Notes

- A good handoff is more valuable than extra unfinished edits.
- If BUILD is complete, say so explicitly and point to BUILD-00N+1 without implementing it.
