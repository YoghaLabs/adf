# Current Task

## Active Build

**BUILD-001 — Repository Foundation**

## Status

**Completed.** Awaiting explicit start of BUILD-002.

## Objectives (All Met)

1. Create the locked top-level repository structure exactly as specified.
2. Add production-quality root files (`README`, license, changelog, version, roadmap, contributing, gitignore).
3. Populate `.adf/` with the complete operating document set.
4. Add `bootstrap/` contracts and boot sequence documentation.
5. Add `prompts/` library entry points (build, resume, handoff, audit).
6. Add foundation docs under `adf-docs/`.
7. Add purpose-only READMEs for packages deferred to later builds.
8. Commit incrementally using the BUILD-001 commit style.
9. Stop after BUILD-001 — do not start BUILD-002.

## Out of Scope (Respected)

- Runtime code in `adf-core` (BUILD-005)
- GUI work in `adf-studio` (BUILD-013+)
- Executable bootstrap automation (BUILD-003)
- Concrete examples and templates content packs (BUILD-009/010)
- Test harness implementation (BUILD-011)

## Success Criteria

- [x] Every required path exists
- [x] Every markdown file contains useful documentation (no placeholders)
- [x] Architecture folders match the lock list with no extras
- [x] Project state, changelog, and todos reflect BUILD-001 reality
- [x] Repository is resumable via `AI_BOOT.md`

## Next Operator Action

Use `prompts/handoff.md` / `prompts/resume.md` as needed. Start BUILD-002 only with an explicit new mission.
