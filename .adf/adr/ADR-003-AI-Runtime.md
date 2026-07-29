# ADR-003 — AI Runtime

## Title

`.adf/` as AI Runtime Single Source of Truth (SSOT)

## Status

Accepted

## Context

ADF is operated by heterogeneous AI tools (Cursor, ChatGPT, Claude, Codex, OpenCode, and others). Chat transcripts are not portable. Without a repository-native runtime, every new agent rediscovers the project and drifts from prior decisions.

**Why this mattered:** continuity is the product requirement, not an optional nicety.

## Decision

Treat `.adf/` as the **AI Runtime SSOT**:

- Boot via `AI_BOOT.md`
- Operate via `AI_RUNTIME.md` loop (manifest → state → todos → task → memory → execute → update → handoff)
- Enforce rules via `AI_CONTRACT.md` and `ARCHITECTURE_RULES.md`
- Keep live truth in `PROJECT_STATE`, `BUILD_STATUS`, `TODOS`, `SESSION`, `MEMORY`
- Prefer updating `.adf` over inventing side notes

Human docs in `adf-docs/` teach; they must not contradict `.adf`.

## Consequences

- Positive: cold-start resume without prior chat
- Positive: Architecture Reviews can audit SSOT freshness
- Negative: operators must write state diligently (discipline cost)
- Negative: duplicated status across files is a risk — mitigated by canonical owners and indexes

## Alternatives Considered

| Alternative | Why rejected |
|-------------|--------------|
| README-only orientation | Too shallow for multi-session AI ops |
| External wiki / Notion as SSOT | Leaves the repo; breaks offline/agent clone workflows |
| Encode all state in git commit messages | Unstructured; hard to query; easy to miss |

## References

- `.adf/AI_RUNTIME.md`
- `.adf/AI_BOOT.md`
- `.adf/AI_CONTRACT.md`
- `adf-docs/AI_RUNTIME.md`
- BUILD-002 deliverables

## Future Impact

Context Engine (BUILD-004) and Studio (BUILD-013+) must read/write this runtime model rather than inventing parallel state stores. New architecture decisions require ADRs (from BUILD-003 onward).
