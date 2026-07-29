# BUILD-002 Acceptance

Cursor / implementing AI must not declare BUILD-002 done until all items pass.

## Acceptance Criteria

- [x] `.adf` is the project information center (SSOT)
- [x] A new AI can understand the project by reading `.adf`
- [x] Builds are documented in `BUILD_HISTORY.md` and `BUILD_STATUS.md`
- [x] Documentation and architecture standards are written
- [x] `bootstrap/BUILD-002/` contains the BUILD-002 specification pack
- [x] No empty or placeholder files
- [x] Locked folder structure unchanged
- [x] BUILD-003 not started

## Verification Hints

1. Open `.adf/QUICK_CONTEXT.md` + `PROJECT_STATE.md` + `AI_RUNTIME.md` on a cold start
2. Confirm BUILD-001 and BUILD-002 appear in history/status
3. Confirm standards files exist and explain **why**
4. `git diff --stat` against pre-BUILD-002 baseline shows additions/expansions only under locked paths

## Sign-off

| Role | Status |
|------|--------|
| Implementing AI | Complete (pending human review) |
| Architecture Review (human) | Pending |
