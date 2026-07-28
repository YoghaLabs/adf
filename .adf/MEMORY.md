# Memory

Durable notes that should survive across sessions. Store only facts that remain useful after the current chat ends.

## Stable Facts

- Repository name is `adf`; primary integration branch is `develop`.
- Top-level architecture is locked as of BUILD-001; do not invent or rename top-level folders.
- Current version string lives in root `VERSION` and must stay synchronized with docs/changelog when bumped.
- `adf-core` runtime starts BUILD-005; `adf-studio` GUI starts BUILD-013.
- AI operators must boot via `AI_BOOT.md` and obey `AI_CONTRACT.md`.

## Working Preferences

- Prefer incremental BUILD-scoped commits.
- Prefer updating canonical files over creating duplicate side notes.
- Prefer quick context first; escalate to full context only when needed.

## Open Risks / Watch Items

- Shell/sandbox latency on some Windows environments can slow git operations; prefer unrestricted permissions when git hangs.
- Until BUILD-011, structure validation is manual against contracts and README lock lists.

## Do Not Store Here

- Secrets, tokens, credentials
- Large pasted logs
- Temporary chat speculation that is not a decision

Promote decisions to `DECISION_LOG.md` and ship notes to `CHANGE_HISTORY.md` / `CHANGELOG.md` when appropriate.
