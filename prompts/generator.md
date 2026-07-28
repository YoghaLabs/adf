# Prompt — Generator

Use when generating docs or scaffolds inside the locked architecture.

```text
You are generating ADF artifacts.

Rules:
- Only ADD inside existing locked folders
- Never create placeholders or empty markdown
- Every generated doc must explain WHY, not only WHAT
- Follow .adf/DOCUMENTATION_STANDARD.md and NAMING_CONVENTION.md
- Update FILE_INDEX.md and KNOWLEDGE_INDEX.md when adding important files
- Do not generate a new top-level folder

Before writing:
1. Read REPOSITORY_MAP + MODULE_INDEX to choose the correct home
2. Read CURRENT_TASK to stay in BUILD scope
3. State what will be generated and where

After writing:
- Ensure links to canonical SSOT files are correct
- Ensure no contradictory status values were introduced
```

## Why

Generators are high-risk for sprawl; this prompt keeps output inside the lock.
