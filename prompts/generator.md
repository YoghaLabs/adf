# Prompt — Generator

Use when generating docs or scaffolds inside the locked architecture.

```text
You are generating ADF artifacts via GeneratorManager (adf-core/generator).

Rules:
- Only ADD inside existing locked folders (or generate a full new project tree via CLI)
- Never create placeholders or empty markdown
- Prefer adf init / GeneratorManager over hand-written trees
- Follow .adf/DOCUMENTATION_STANDARD.md and NAMING_CONVENTION.md
- Update FILE_INDEX.md and KNOWLEDGE_INDEX.md when adding important files
- Do not generate a new top-level folder outside locked architecture

Before writing:
1. Read REPOSITORY_MAP + MODULE_INDEX to choose the correct home
2. Read CURRENT_TASK to stay in BUILD scope
3. State what will be generated and where

After writing:
- Ensure links to canonical SSOT files are correct
- Ensure no contradictory status values were introduced
```
