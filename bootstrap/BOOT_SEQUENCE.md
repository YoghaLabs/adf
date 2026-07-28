# Boot Sequence

Ordered procedure to enter a valid ADF working state.

## Audience

- AI agents starting or resuming work
- Humans onboarding to active BUILD work
- Auditors verifying that the repository is operable

## Sequence

### 1. Locate repository root

Confirm the working directory contains:

- `.adf/`
- `VERSION`
- `README.md`
- locked package folders listed in root README

### 2. Read quick context

Open `.adf/QUICK_CONTEXT.md` and note repository, build, goal, and version.

### 3. Read state and task

Open:

- `.adf/PROJECT_STATE.md`
- `.adf/CURRENT_TASK.md`

Accept status, blockers, objectives, and out-of-scope.

### 4. Accept AI contract

Open `.adf/AI_CONTRACT.md`. Do not proceed with edits if you cannot comply.

### 5. Optional deep orientation

If needed:

- `.adf/PROJECT_DNA.md`
- `.adf/FULL_CONTEXT.md`
- `adf-docs/ARCHITECTURE.md`

Respect `.adf/TOKEN_BUDGET.md`.

### 6. Review continuity files

- `.adf/TODOS.md`
- `.adf/MEMORY.md`
- `.adf/SESSION.md`
- `.adf/DECISION_LOG.md` (when making architectural choices)

### 7. Choose prompt mode

| Mode | Prompt |
|------|--------|
| Continue active BUILD | `prompts/build.md` |
| Resume after interruption | `prompts/resume.md` |
| End session cleanly | `prompts/handoff.md` |
| Verify integrity | `prompts/audit.md` |

### 8. Execute within boundaries

Do only what the active BUILD and current task allow. Update state files as work lands.

### 9. Close or hand off

Update `SESSION.md` and related state files. If the BUILD is complete, satisfy `BUILD_CONTRACT.md` and stop.

## Failure Handling

| Symptom | Action |
|---------|--------|
| Missing locked folder | Restore from BUILD-001 contract before feature work |
| Conflicting instructions | Prefer AI_CONTRACT + CURRENT_TASK over informal requests |
| Stale state files | Correct state/changelog/todos as part of the first fix commit |
| Urge to start next BUILD early | Record note in SESSION and wait for explicit mission |

## Automation Note

BUILD-003 may automate validation of this sequence. Until then, execute it manually.
