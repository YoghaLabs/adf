# BUILD-005 Architecture Review

## Checklist

- [ ] Implementation lives only under locked `adf-core/` (no new top-level folders)
- [ ] Docs not deleted; SSOT markdown still authoritative for process
- [ ] Engines/managers have real methods (not stubs)
- [ ] `pytest` passes in `adf-core`
- [ ] CLI commands exist as skeleton and run
- [ ] `.adf/local/` runtime artifacts remain gitignored
- [ ] VERSION is `0.5.0-alpha` and synced
- [ ] BUILD-006 not started

## Suggested Commands

```bash
cd adf-core && python -m pytest -q
python adf-core/adf.py doctor --root .
git diff --stat 7336047...HEAD
```

## Decision

Approve → BUILD-006 may start with explicit master prompt  
Request changes / Reject → remediate first
