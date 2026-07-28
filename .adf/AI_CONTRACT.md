# AI Contract

This contract is binding for every AI agent (and recommended for every human contributor) working in this repository.

## Absolute Rules

1. **Never delete documentation.**  
   Do not remove markdown or contract files to “clean up.” Deprecate in place and update indexes instead.

2. **Never skip architecture.**  
   Respect the locked top-level structure. Do not bypass bootstrap, contracts, or documented build gates.

3. **Never rename folders.**  
   Top-level directory names are fixed. Renames break handoff, tooling, and roadmap assumptions.

4. **Never create placeholders.**  
   No empty files, no lorem ipsum, no TODO-only markdown. Every file must contain useful content for its role.

5. **Always update `PROJECT_STATE`.**  
   When build status, blockers, or next-build pointers change, update `.adf/PROJECT_STATE.md`.

6. **Always update `CHANGELOG`.**  
   User-visible or foundation-level changes belong in `CHANGELOG.md` under the correct version section.

7. **Always update `TODOS`.**  
   Keep `.adf/TODOS.md` aligned with real remaining work. Close finished items; add new ones when discovered.

## Operating Rules

- Work only within the active BUILD unless a handoff explicitly starts the next BUILD.
- Read `AI_BOOT.md` before making changes in a new session.
- Prefer updating existing contracts over inventing parallel documents.
- Do not invent additional top-level folders.
- Do not redesign architecture “for improvement” during a scoped BUILD.
- Commit in small, reviewable increments when asked to use git.

## Quality Rules

- Production-quality writing
- Explicit scope and out-of-scope statements where useful
- Cross-links to canonical files instead of duplicating large sections
- Preserve resumability: another AI must be able to continue from `.adf/` alone plus root docs

## Violation Response

If a previous change violated this contract:

1. Document the violation in `DECISION_LOG.md` or `CHANGE_HISTORY.md`
2. Restore documentation/architecture integrity
3. Update state/changelog/todos to reflect remediation
4. Do not hide the issue

## Acknowledgement

By editing this repository as an AI agent, you accept this contract for the current session.
