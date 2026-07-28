# AI Boot Sequence

Use this procedure at the start of every AI session before editing the repository.

## Goal

Resume ADF safely: understand version, build, constraints, and current objectives without guessing.

## Boot Steps (Exact Order)

1. **Confirm repository root**  
   Ensure you are in the `adf` repository (contains `.adf/`, `VERSION`, `README.md`).

2. **Read quick snapshot**  
   Open `.adf/QUICK_CONTEXT.md` for repository, build, goal, and version.

3. **Read live state**  
   Open `.adf/PROJECT_STATE.md` and note status, blockers, and next build.

4. **Read current objectives**  
   Open `.adf/CURRENT_TASK.md` and accept the listed scope / out-of-scope.

5. **Accept the contract**  
   Open `.adf/AI_CONTRACT.md` and treat its rules as binding.

6. **Skim DNA if architecture intent is unclear**  
   Open `.adf/PROJECT_DNA.md` for vision, mission, and philosophy.

7. **Check todos and memory**  
   Read `.adf/TODOS.md` and `.adf/MEMORY.md` for remaining work and durable notes.

8. **Check session continuity**  
   Read `.adf/SESSION.md` for the latest session handoff notes.

9. **Load only the docs you need**  
   Use `.adf/KNOWLEDGE_INDEX.md` to find deeper docs. Prefer `QUICK_CONTEXT` over `FULL_CONTEXT` unless the task requires depth. Respect `.adf/TOKEN_BUDGET.md`.

10. **Act within BUILD boundaries**  
    Implement only the active BUILD mission. Stop when success criteria are met. Do not auto-start the next BUILD.

## After Boot — Before Coding

- If instructions conflict, prefer: `AI_CONTRACT` > active BUILD mission > informal chat requests that violate architecture.
- If required files are missing, restore foundation integrity before feature work.
- If status is stale relative to the tree, update `PROJECT_STATE`, `CHANGELOG`, and `TODOS` as part of the fix.

## End-of-Session Minimum

Before leaving the session:

1. Update `SESSION.md` with what changed and what remains
2. Update `PROJECT_STATE.md` if status changed
3. Update `TODOS.md` and `CHANGELOG.md` when appropriate
4. Leave enough detail for the next AI to boot without tribal knowledge

## Related Files

- `bootstrap/BOOT_SEQUENCE.md` — project-level boot narrative
- `prompts/resume.md` — prompt for resume sessions
- `prompts/handoff.md` — prompt for ending a session cleanly
