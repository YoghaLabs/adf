# Contributing to ADF

Thank you for contributing to the AI Development Framework (ADF).
This project is built through numbered **BUILD** increments. Contributions must respect the locked architecture and AI operating contracts.

## Before You Start

1. Read `README.md` and `adf-docs/WHAT_IS_ADF.md`.
2. Read `.adf/AI_CONTRACT.md` — non-negotiable rules for all changes.
3. Read `.adf/PROJECT_STATE.md` and `.adf/CURRENT_TASK.md` for active scope.
4. Confirm you are working on the correct BUILD. Do not jump ahead.

## Branch & Build Rules

- Primary integration branch: `develop`
- Work only within the current BUILD scope unless a handoff explicitly starts the next BUILD.
- Do **not** rename or invent top-level folders.
- Do **not** delete documentation files.
- Do **not** ship empty or placeholder markdown.

## Making Changes

1. Update or add documentation before or with code that depends on it.
2. Keep changes incremental and reviewable.
3. Update these files when your change affects project status:
   - `.adf/PROJECT_STATE.md`
   - `CHANGELOG.md`
   - `.adf/TODOS.md`
   - `.adf/CHANGE_HISTORY.md` (for meaningful decisions/changes)
4. Prefer small commits that map to a clear purpose (see BUILD commit style below).

## Commit Style

Use clear, scoped messages. For foundation and numbered builds:

```text
BUILD-001: initialize repository foundation
BUILD-001: add .adf core
BUILD-005: implement project load in adf-core
```

For non-build housekeeping:

```text
docs: clarify boot sequence prerequisites
fix: correct VERSION file formatting
```

## Pull Requests

Every PR should include:

- **Summary** — what changed and why
- **BUILD impact** — which BUILD this advances (if any)
- **Docs** — which contracts/docs were updated
- **Test plan** — how reviewers can verify the change

## Quality Bar

- Production-quality writing in all markdown
- No lorem ipsum, no TODO-only files
- Architecture remains locked as defined in BUILD-001
- AI resume path remains intact (`.adf/AI_BOOT.md`)

## Reporting Issues

Include:

- Current `VERSION` and BUILD id
- Expected vs actual behavior
- Relevant files under `.adf/` and `adf-docs/`
- Steps to reproduce (for runtime issues after BUILD-005+)

## License

By contributing, you agree that your contributions are licensed under the MIT License (`LICENSE`).
