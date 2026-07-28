# Token Budget

Guidance for assembling AI context without overspending tokens.

## Default Strategy

1. Start with `.adf/QUICK_CONTEXT.md`
2. Add `.adf/PROJECT_STATE.md` + `.adf/CURRENT_TASK.md`
3. Add `.adf/AI_CONTRACT.md` when making edits
4. Pull deeper docs only as needed via `KNOWLEDGE_INDEX.md`

Do **not** load `FULL_CONTEXT.md` plus every documentation file by default.

## Budget Tiers

| Tier | When to use | Typical contents |
|------|-------------|------------------|
| **Micro** | Status check, tiny doc fix | QUICK_CONTEXT + CURRENT_TASK |
| **Standard** | Normal BUILD work | Micro + PROJECT_STATE + AI_CONTRACT + relevant target files |
| **Deep** | Architecture decisions, audits, handoffs | Standard + FULL_CONTEXT + DNA + decision/change logs + related docs |
| **Emergency recovery** | Missing/broken foundation | Deep + bootstrap contracts + directory listing verification |

## Hard Preferences

- Prefer canonical short files over pasting large duplicated explanations
- Prefer `adf-docs/` pages over re-deriving architecture in chat
- Prefer updating indexes over creating parallel “notes” files
- Exclude generated artifacts, lockfile noise, and binary assets from context packs

## Future Runtime Hook

From BUILD-006 onward, `adf-core` context assembly should enforce these tiers programmatically. Until then, agents must apply this budget manually.

## Anti-Patterns

- Dumping the entire repository into context
- Loading Studio/core implementation plans during BUILD-001 foundation edits
- Ignoring CURRENT_TASK and improvising a new mission mid-session
