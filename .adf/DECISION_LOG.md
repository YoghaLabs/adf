# Decision Log

Chronological record of significant decisions. Newest entries first.

## 2026-07-29 — Lock top-level architecture in BUILD-001

- **Decision:** Freeze the top-level folder set and forbid inventing/renaming folders in later builds without an explicit architecture change BUILD.
- **Why:** Stable paths are required for AI handoff, tooling, docs, and cumulative builds.
- **Consequences:** All packages must live under the locked names; expansion happens inside existing trees.
- **Status:** Accepted

## 2026-07-29 — Documentation and contracts before runtime

- **Decision:** BUILD-001 ships operating docs and scaffolds only; `adf-core` runtime waits for BUILD-005; Studio waits for BUILD-013.
- **Why:** Prevents premature implementation without resumable state and contracts.
- **Consequences:** Early clones are useful for process/docs immediately, not as a runnable app yet.
- **Status:** Accepted

## 2026-07-29 — AI contract as binding operating law

- **Decision:** Encode non-negotiable rules in `.adf/AI_CONTRACT.md` (no doc deletion, no folder renames, no placeholders, mandatory state/changelog/todo updates).
- **Why:** Multi-agent continuity fails without enforceable norms.
- **Consequences:** PRs and BUILD work that violate the contract must be remediated before advancing.
- **Status:** Accepted

## 2026-07-29 — Cumulative numbered builds through BUILD-020

- **Decision:** Progress via BUILD-001 → BUILD-020 with explicit stop boundaries.
- **Why:** Makes scope auditable and prevents mega-prompt redesign loops.
- **Consequences:** Agents must not auto-continue into the next BUILD after finishing the current one.
- **Status:** Accepted

## Template for New Entries

```markdown
## YYYY-MM-DD — Short title
- **Decision:**
- **Why:**
- **Consequences:**
- **Status:** Proposed | Accepted | Superseded
```
