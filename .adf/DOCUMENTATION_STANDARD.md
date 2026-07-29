# Documentation Standard

**Why:** inconsistent docs become noise. ADF documentation must be operable by humans and AIs.

## Required Qualities

1. **Meaningful** — no empty files, no lorem ipsum, no TODO-only pages
2. **Why-aware** — explain purpose/rationale, not only inventory
3. **Canonical** — link to SSOT instead of duplicating status
4. **Scoped** — state out-of-scope when missions are bounded
5. **Current** — update docs in the same change that alters reality

## Headers

- One `#` title per file matching the document’s role
- Use `##` / `###` for scannable sections
- Avoid decorative emoji in headings (status tables may use ✅/⏳ where established)

## Tables

Use tables for inventories, status boards, and comparisons:

```markdown
| Field | Value |
|-------|-------|
| Current Build | BUILD-002 |
```

Keep columns consistent within a file.

## Examples

Prefer concrete examples over abstract claims:

- Good: “Update `BUILD_STATUS.md` when BUILD-002 flips to Completed”
- Weak: “Update relevant files as needed”

## Code Blocks

- Use fenced blocks with a language tag when showing commands or structured text (`bash`, `text`, `markdown`)
- Keep command examples copy-pasteable
- Do not invent CLIs that do not exist yet

## References

- Reference files with repo-relative paths: `.adf/AI_BOOT.md`
- When a concept has a canonical doc, link it once and avoid restating large sections
- Update `FILE_INDEX.md` / `KNOWLEDGE_INDEX.md` when adding important docs

## Change Discipline

| Change type | Also update |
|-------------|-------------|
| Version/build bump | `VERSION`, `PROJECT_STATE`, `QUICK_CONTEXT`, `CHANGELOG`, README table |
| BUILD completion | `BUILD_STATUS`, `BUILD_HISTORY`, `CHANGE_HISTORY`, `TODOS`, `SESSION` |
| New important file | `FILE_INDEX`, `KNOWLEDGE_INDEX` |

## Anti-Patterns

- Placeholder sections (“TBD later”)
- Pasting entire policies into every file
- Rewriting history docs to hide mistakes — append corrections instead

## Related

- `AI_CONTRACT.md`
- `NAMING_CONVENTION.md`
- `ARCHITECTURE_RULES.md`
