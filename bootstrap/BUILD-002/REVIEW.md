# BUILD-002 Architecture Review

Use this checklist before approving BUILD-003.

## Review Goals

Confirm repository intelligence is real, cumulative, and non-destructive.

## Checklist

- [ ] Locked top-level folders unchanged (no renames/moves/new roots)
- [ ] BUILD-001 docs still present and were expanded rather than erased
- [ ] `.adf` contains runtime loop, workflow, maps, indexes, standards, build tracking
- [ ] `bootstrap/BUILD-002/` pack is complete and useful
- [ ] Prompts/docs additions align with SSOT (no contradictory status)
- [ ] `VERSION` is `0.2.0-alpha` and matches changelog/state
- [ ] No placeholders / empty markdown
- [ ] Stop rule honored (no BUILD-003 implementation)

## Suggested Commands

```bash
git log --oneline origin/main..HEAD
git diff --stat <pre-BUILD-002-sha>..HEAD
```

## Decision

| Outcome | Meaning |
|---------|---------|
| Approve | BUILD-003 may start with explicit master prompt |
| Request changes | Fix listed findings; keep BUILD-002 in review |
| Reject | Revert or remediate before any further BUILD work |

## Reviewer Notes

_Record findings here during review._
