# Getting Started

## Prerequisites

- Git
- Access to this repository (`develop` branch recommended)
- Willingness to follow the locked architecture and AI contract

No runtime install is required for BUILD-001.

## Clone & Enter

```bash
git clone https://github.com/YoghaLabs/adf.git
cd adf
git checkout develop
git pull origin develop
```

## Orient Yourself (Humans)

1. Read root `README.md`
2. Read `WHAT_IS_ADF.md`
3. Skim `ARCHITECTURE.md`
4. Check `VERSION`, `ROADMAP.md`, and `.adf/QUICK_CONTEXT.md`

## Orient Yourself (AI Agents)

Follow `.adf/AI_BOOT.md` exactly before editing. Do not skip the contract.

## Typical First Actions

| Goal | Start here |
|------|------------|
| Understand product | `WHAT_IS_ADF.md` |
| See structure | `ARCHITECTURE.md` |
| See plan | `ROADMAP.md` |
| Continue active BUILD | `prompts/build.md` |
| Resume interrupted work | `prompts/resume.md` |
| Verify integrity | `prompts/audit.md` |

## What You Can Do Today (BUILD-001)

- Read and improve foundation documentation (within BUILD scope)
- Use `.adf` files as the source of truth for status
- Prepare handoffs via `prompts/handoff.md`

## What You Cannot Do Yet

- Run `adf-core` runtime APIs (starts BUILD-005)
- Use ADF Studio GUI (starts BUILD-013)
- Expect automated bootstrap tooling (BUILD-003)

## Contribution Entry

See root `CONTRIBUTING.md`. Keep changes aligned with `.adf/AI_CONTRACT.md`.
