# BUILD-004 Migration Notes

## From BUILD-001…003

- Keep foundation, SSOT runtime, and Knowledge/ADR layers intact
- `CONTEXT_GRAPH.md` remains the knowledge restore tier map; Context Engine **operationalizes** restore as a mandatory pipeline
- `AI_BOOT.md` remains; `BOOT_SEQUENCE_V2.md` extends it for engine alignment
- Existing `adf-docs/CONTEXT_ENGINE.md` (preview) remains; detailed human guides added as `CONTEXT_ENGINE_GUIDE.md` etc.

## Roadmap Shift (content, not folders)

Documentation-heavy builds (001–003) → **engine** builds starting at 004.  
No top-level folder changes.

## Operator Behavior Change

1. Prefer Boot V2 + Resume Protocol on every session
2. Emit Context Engine outputs after restore
3. Follow state machine; use checkpoints in `SESSION.md`
4. Do not implement Runtime Engine code until BUILD-005

## Non-Migrations

- Do not create top-level `context/` or `engine/`
- Do not delete Knowledge Layer because Context Engine exists
