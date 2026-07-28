# Memory

Durable notes that should survive across sessions. Store only facts that remain useful after the current chat ends.

## Stable Facts

- Repository name is `adf`; primary integration branch is `develop`.
- Top-level architecture is locked as of BUILD-001; do not invent, rename, or move top-level folders.
- `.adf/` is the Single Source of Truth (SSOT) for AI runtime intelligence (confirmed BUILD-002).
- Current version string and build identity live in root `VERSION` and must stay synchronized with `PROJECT_STATE`, `QUICK_CONTEXT`, and `CHANGELOG`.
- `adf-core` runtime starts BUILD-005; `adf-studio` GUI starts BUILD-013; bootstrap automation is BUILD-003.
- AI operators must boot via `AI_BOOT.md`, obey `AI_CONTRACT.md`, and operate per `AI_RUNTIME.md`.

## Working Preferences

- Prefer incremental BUILD-scoped commits.
- Prefer updating canonical `.adf` files over creating duplicate side notes.
- Prefer quick context first; escalate to full context only when needed.
- Explain **why** in documentation, not only **what**.

## Open Risks / Watch Items

- BUILD-003 must not start before Architecture Review of BUILD-002.
- Until BUILD-011, structure validation remains largely manual against contracts and maps.
- Avoid duplicating authoritative status in many places without updating all of them — canonical owners: `VERSION`, `PROJECT_STATE`, `BUILD_STATUS`.

## Do Not Store Here

- Secrets, tokens, credentials
- Large pasted logs
- Temporary chat speculation that is not a decision

Promote decisions to `DECISION_LOG.md` and ship notes to `CHANGE_HISTORY.md` / `CHANGELOG.md` / `BUILD_HISTORY.md` when appropriate.
