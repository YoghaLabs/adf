# Memory

Durable notes that should survive across sessions. Store only facts that remain useful after the current chat ends.

## Stable Facts

- Repository name is `adf`; primary integration branch is `develop`.
- Top-level architecture is locked as of BUILD-001; do not invent, rename, or move top-level folders (ADR-001).
- `.adf/` is the Single Source of Truth (SSOT) for AI runtime intelligence (ADR-003 / BUILD-002).
- From BUILD-003 onward: **no architecture change without a new ADR** (permanent through BUILD-020).
- Current version string and build identity live in root `VERSION` and must stay synchronized with `PROJECT_STATE`, `QUICK_CONTEXT`, and `CHANGELOG`.
- Knowledge Layer (graphs, glossary, timeline, risks, ADRs) foundations Context Engine (BUILD-004) and later Studio.
- `adf-core` runtime starts BUILD-005; `adf-studio` GUI starts BUILD-013.
- AI operators must boot via `AI_BOOT.md`, obey `AI_CONTRACT.md`, and operate per `AI_RUNTIME.md`.

## Working Preferences

- Prefer incremental BUILD-scoped commits.
- Prefer updating canonical `.adf` files over creating duplicate side notes.
- Prefer quick context first; escalate via `CONTEXT_GRAPH.md` tiers.
- Explain **why** in documentation, not only **what**.
- When design changes, write/update an ADR before or with the change.

## Open Risks / Watch Items

- BUILD-004 must not start before Architecture Review of BUILD-003.
- See `RISK_REGISTER.md` for architecture/docs/AI-drift/token/maintenance risks.
- Avoid duplicating authoritative status — canonical owners: `VERSION`, `PROJECT_STATE`, `BUILD_STATUS`.

## Do Not Store Here

- Secrets, tokens, credentials
- Large pasted logs
- Temporary chat speculation that is not a decision

Promote decisions to `adr/` + `ADR_INDEX.md` / `DECISION_LOG.md` and ship notes to `CHANGE_HISTORY.md` / `CHANGELOG.md` / `BUILD_HISTORY.md` when appropriate.
