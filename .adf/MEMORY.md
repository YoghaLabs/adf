# Memory

## Stable Facts

- Architecture locked (ADR-001); ADRs required for architecture changes.
- `.adf/` is SSOT; Context Engine specs (BUILD-004) define restore.
- **BUILD-005** introduces executable Runtime Engine in `adf-core` (Python 3.10+).
- Machine state/sessions/checkpoints may live under `.adf/local/` (gitignored); markdown SSOT remains authoritative for humans/AIs.
- CLI entry: `adf-core/adf.py`.
- Do not start BUILD-006 until Architecture Review of BUILD-005.

## Working Preferences

- Follow docs first; implement against Context Engine / state machine contracts.
- Prefer small modules and typed public APIs.
- Run `pytest` inside `adf-core` before handoff.

## Do Not Store Here

Secrets, large logs, ephemeral speculation.
