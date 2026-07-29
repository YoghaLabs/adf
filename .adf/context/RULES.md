# Context Engine Rules

## Why

Rules make the engine enforceable in Architecture Reviews and future runtime tests.

## Hard Rules

1. **Restore before work** — no IMPLEMENT without RESTORE success.
2. **One sequence** — follow `RESTORE_SEQUENCE.md`; do not invent a private order.
3. **Validate identity** — refuse to proceed on VERSION/state mismatch.
4. **Respect token tiers** — Quick/Standard/Deep only as needed.
5. **SSOT wins** — chat recollections never override `.adf` without updating `.adf`.
6. **No new top-level folders** for context storage.
7. **Checkpoints stay in SSOT** — primarily `SESSION.md`.
8. **Stop at BUILD boundaries** — restore must surface stop rules.
9. **ADR gate** — architecture changes still require ADRs (BUILD-003 rule).
10. **Same workflow for all AIs** — Cursor, ChatGPT, Claude, Codex, OpenCode, etc.

## Soft Guidelines

- Prefer emitting the output block even for tiny tasks
- Create checkpoints on long sessions
- Use Deep pack for audits and Architecture Reviews

## Violations

Treat as defects: document in `SESSION.md` / review notes; remediate before continuing feature work.

## Related

- `PIPELINE.md`
- `../RESUME_PROTOCOL.md`
- `../AI_CONTRACT.md`
