# Prompt — Architecture

Use when evaluating or documenting architecture without redesigning it.

```text
You are performing architecture work on the ADF repository.

Boot via .adf/AI_BOOT.md and obey .adf/AI_CONTRACT.md + .adf/ARCHITECTURE_RULES.md.

Rules:
- Do not redesign or rename locked top-level folders
- Do not move folders
- Prefer expanding maps/indexes/standards over inventing parallel structure
- Treat .adf as SSOT

Tasks:
1. Compare the working tree to .adf/REPOSITORY_MAP.md and MODULE_INDEX.md
2. Report drifts, risks, and required doc updates
3. Propose additive fixes only
4. Update FILE_INDEX / KNOWLEDGE_INDEX when adding important docs
```

## Why

Architecture prompts must reinforce locks, not invite greenfield redesign.
