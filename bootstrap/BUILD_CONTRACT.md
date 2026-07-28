# Build Contract

A BUILD is complete only when all conditions below are satisfied.

## Scope Integrity

1. The BUILD mission is executed exactly — no silent scope expansion into later builds.
2. Locked top-level architecture is unchanged (no renames, no extra top-level folders).
3. Out-of-scope packages remain documented scaffolds only when the mission says so.

## Documentation Integrity

1. Every new or touched markdown file contains useful content.
2. No placeholders, empty docs, or lorem ipsum.
3. Existing documentation is not deleted.
4. Indexes and cross-links remain coherent (`KNOWLEDGE_INDEX`, READMEs, roadmap pointers).

## State Integrity

Before closing a BUILD, these are updated to match reality:

- `.adf/PROJECT_STATE.md`
- `.adf/CURRENT_TASK.md` (objectives reflect completion or explicit handoff)
- `.adf/TODOS.md`
- `CHANGELOG.md`
- `.adf/CHANGE_HISTORY.md` (for meaningful milestones)
- `.adf/SESSION.md` (handoff notes for the next operator)

## Quality Integrity

1. Commits are reviewable and preferably incremental.
2. Version file matches the declared pre-release/version for the milestone.
3. AI resume path works: a new agent can follow `.adf/AI_BOOT.md` without tribal chat context.

## Stop Rule

After a BUILD meets this contract, **stop**. Starting the next BUILD requires an explicit new mission/handoff.

## BUILD-001 Checklist

- [x] Locked folders present
- [x] Root files present and useful
- [x] `.adf` operating set present and useful
- [x] Bootstrap docs present
- [x] Prompt library present
- [x] `adf-docs` foundation present
- [x] Package READMEs present for deferred packages
- [x] State/changelog/todos finalized
- [x] No BUILD-002 implementation included
