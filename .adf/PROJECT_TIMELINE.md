# Project Timeline

Evolution of ADF across numbered builds.

**Why:** a timeline prevents agents from treating the repo as a finished product or redoing early foundations.

## Arc

```text
BUILD-001 Foundation
    ↓
BUILD-002 AI Runtime SSOT
    ↓
BUILD-003 Knowledge Architecture & ADR
    ↓
BUILD-004 Context Engine  ← current (completed; review gate)
    ↓
BUILD-005 Runtime Engine (executable)
    ↓
BUILD-006…012 engines, templates, examples, testing, release prep
    ↓
BUILD-013…015 ADF Studio
    ↓
BUILD-016…018 docs completeness, hardening, efficiency
    ↓
BUILD-019 RC
    ↓
BUILD-020 v1.0 stabilization gate
```

## Completed

| Build | Version | Theme |
|-------|---------|-------|
| BUILD-001 | `0.1.0-alpha` | Locked structure + foundation docs |
| BUILD-002 | `0.2.0-alpha` | AI runtime SSOT + repository intelligence |
| BUILD-003 | `0.3.0-alpha` | Knowledge architecture + ADR system |
| BUILD-004 | `0.4.0-alpha` | Context Engine specification |

## Next

| Build | Theme |
|-------|-------|
| BUILD-005 | Runtime Engine — executable `adf-core` implementing Context Engine |

## Narrative

1. **Structure first** — without a lock, knowledge has nowhere stable to live.
2. **Runtime files second** — without SSOT, knowledge cannot be operated.
3. **Knowledge third** — ADRs/graphs make *why* recoverable.
4. **Context Engine fourth** — shared restore for all AIs (spec).
5. **Runtime Engine next** — executable implementation of these contracts.

## Related

- `MILESTONES.md`
- `BUILD_HISTORY.md`
- `ROADMAP.md`
