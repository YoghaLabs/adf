# Tech Stack

Technologies and operator tools that define how ADF is authored and consumed today.

**Why:** agents must not assume a hidden application stack. BUILD-003 is still documentation-intelligence first.

## Current Stack

| Layer | Technology | Role | Why |
|-------|------------|------|-----|
| Knowledge format | **Markdown** | Human/AI readable SSOT & docs | Portable, diffable, reviewable |
| Version control | **Git** | History, branches, reviewable commits | Continuity beyond chat |
| Hosting | **GitHub** | Remote collaboration, compare views, future PRs | Shared source of truth hosting |
| Primary IDE agent | **Cursor** | Implements BUILD packs in-repo | Tight loop with working tree |
| General LLMs | **ChatGPT / Claude / Codex** | Alternate operators using `.adf` boot | Proves SSOT portability |
| Future GUI | **ADF Studio** (`adf-studio/`) | Visualize state/context/builds | Human UX over the same SSOT |

## Explicitly Not Required (Yet)

- Application runtime language lock-in for `adf-core` (decided at BUILD-005+)
- Production database
- Mandatory cloud services for foundation operation

## Compatibility Posture

Any capable AI that can read markdown files and follow `AI_BOOT.md` should be able to operate ADF. Tool-specific tricks must not become the only way to understand the repo.

## Related

- `DEPENDENCY_INDEX.md`
- `adr/ADR-003-AI-Runtime.md`
- `adf-docs/GETTING_STARTED.md`
