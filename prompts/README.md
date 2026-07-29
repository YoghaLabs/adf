# Prompts

Prompt library for operating ADF across sessions.

## Contents

| File | Use when |
|------|----------|
| `build.md` | Executing the active BUILD mission |
| `resume.md` | Restarting work after interruption |
| `handoff.md` | Ending a session and preparing the next operator |
| `audit.md` | Checking contract/architecture/docs integrity |
| `architecture.md` | Architecture evaluation without redesign |
| `planning.md` | Specifying work before implementation |
| `review.md` | Architecture / pre-merge review |
| `release.md` | Version identity and release-note discipline |
| `generator.md` | Generating docs/scaffolds inside locked paths |
| `knowledge.md` | Updating knowledge graphs/indexes/glossary |
| `adr.md` | Creating or updating ADRs |
| `documentation.md` | Expanding docs to standard |
| `context.md` | Restoring/assembling context tiers |
| `bootstrap.md` | Working with `bootstrap/BUILD-00N/` packs |

## How to Use

1. Complete `.adf/AI_BOOT.md` first.
2. Copy the relevant prompt into your AI session (or reference the file path).
3. Keep the active BUILD boundary explicit in the conversation.
4. Update state files as the prompt instructs.

## Design Rules

- Prompts must reinforce `AI_CONTRACT.md`, `ARCHITECTURE_RULES.md`, and ADR discipline
- Prompts must not authorize architecture redesign without an ADR + approval
- Prompts must not authorize placeholder files

## Related

- `bootstrap/BOOT_SEQUENCE.md`
- `.adf/AI_RUNTIME.md`
- `.adf/CONTEXT_GRAPH.md`
- `ROADMAP.md`
