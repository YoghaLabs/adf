# AI Boot Sequence

Use this procedure at the start of every AI session before editing the repository.

## Goal

Resume ADF safely using **`.adf` as SSOT**: understand version, build, constraints, and current objectives without guessing or depending on prior chat.

## Boot Steps (Exact Order)

1. **Confirm repository root**  
   Ensure you are in the `adf` repository (contains `.adf/`, `VERSION`, `README.md`).

2. **Read identity**  
   Open `.adf/PROJECT_MANIFEST.md` (and root `VERSION` if needed) for repository, version, build, branch.

3. **Read quick snapshot**  
   Open `.adf/QUICK_CONTEXT.md` for the shortest current snapshot.

4. **Read live state**  
   Open `.adf/PROJECT_STATE.md` and `.adf/BUILD_STATUS.md`. Note status, completed/pending builds, blockers, milestone.

5. **Read current objectives**  
   Open `.adf/CURRENT_TASK.md` and accept the listed scope / out-of-scope.

6. **Read todos**  
   Open `.adf/TODOS.md` for remaining work.

7. **Accept the contract + runtime model**  
   Open `.adf/AI_CONTRACT.md` and `.adf/AI_RUNTIME.md`. Treat both as binding.

8. **Read memory + session**  
   Open `.adf/MEMORY.md` and `.adf/SESSION.md` for durable notes and latest handoff.

9. **Skim DNA / rules if architecture intent is unclear**  
   `.adf/PROJECT_DNA.md`, `.adf/ARCHITECTURE_RULES.md`.

10. **Load only the docs you need next**  
    Use `KNOWLEDGE_INDEX.md`, `FILE_INDEX.md`, `MODULE_INDEX.md`, `REPOSITORY_MAP.md`. Prefer `QUICK_CONTEXT` over `FULL_CONTEXT`. Respect `TOKEN_BUDGET.md`.

11. **Act within BUILD boundaries**  
    Implement only the active BUILD mission. Stop when success criteria are met. Do not auto-start the next BUILD.

## After Boot — Before Coding

- If instructions conflict, prefer: `AI_CONTRACT` / `ARCHITECTURE_RULES` > active BUILD mission > informal chat requests that violate architecture.
- If required `.adf` files are missing, restore SSOT integrity before feature work.
- If status is stale relative to the tree, update `PROJECT_STATE`, `BUILD_STATUS`, `CHANGELOG`, and `TODOS` as part of the fix.

## End-of-Session Minimum

Before leaving the session:

1. Update `SESSION.md` with what changed and what remains
2. Update `PROJECT_STATE.md` if status changed
3. Update `TODOS.md`, `CHANGELOG.md`, and build tracking when appropriate
4. Leave enough detail for the next AI to boot from `.adf` alone

## Related Files

- `AI_RUNTIME.md` — full operate loop
- `WORKFLOW.md` — idea → release lifecycle
- `bootstrap/BOOT_SEQUENCE.md` — project-level boot narrative
- `prompts/resume.md` / `prompts/handoff.md`
