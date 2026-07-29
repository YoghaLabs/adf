# Workflow

## Why This File Exists

ADF separates **ideas** from **releases**. Without an explicit lifecycle, agents jump to coding, skip review, or ship undocumented changes. This workflow is the expected path for every meaningful change.

## Lifecycle

```text
Idea
  ↓
Specification
  ↓
Implementation
  ↓
Review
  ↓
Approval
  ↓
Release
```

### Idea

Capture intent briefly in `CURRENT_TASK.md` / `TODOS.md` / decision notes. Do not invent top-level architecture during ideation.

### Specification

Write or update the BUILD pack under `bootstrap/BUILD-00N/` (mission, spec, acceptance, review notes). Align with `ROADMAP.md` and `ARCHITECTURE_RULES.md`.

**Why:** specification prevents redesign-by-improvisation.

### Implementation

Execute only the specified BUILD. Update `.adf` SSOT as you go. Prefer additive documentation and code. No placeholders.

### Review

Run integrity checks (`prompts/audit.md`, `prompts/review.md`). Diff against the locked architecture. Confirm acceptance criteria in the BUILD pack.

### Approval

Human Architecture Review (or designated approver) signs off before the next BUILD starts. Record outcomes in `DECISION_LOG.md` / `SESSION.md` when material.

### Release

Version identity updates via root `VERSION` + `CHANGELOG.md`. Packaging automation matures in later builds (`release/`). A BUILD completion is not automatically a public release tag.

## Mapping to AI Runtime / Context Engine

| Lifecycle stage | Primary artifacts |
|-----------------|-------------------|
| Idea | `TODOS.md`, `CURRENT_TASK.md` |
| Specification | `bootstrap/BUILD-00N/` |
| Implementation | state machine IMPLEMENT + SSOT updates |
| Review | VERIFY + `prompts/review.md` |
| Approval | Architecture Review gates |
| Release | `VERSION`, `CHANGELOG.md`, `release/` |

Operator micro-states during a session: see `STATE_MACHINE.md` (BOOT→HANDOFF) driven by Context Engine restore.

## Stop Gates

- Do not implement the next BUILD during the current BUILD.
- Do not skip review/approval when the mission requires it (BUILD-002 explicitly requires Architecture Review before BUILD-003).
