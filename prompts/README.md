# Prompts

Prompt library for operating ADF across sessions.

## Contents

| File | Use when |
|------|----------|
| `build.md` | Executing the active BUILD mission |
| `resume.md` | Restarting work after interruption |
| `handoff.md` | Ending a session and preparing the next operator |
| `audit.md` | Checking contract/architecture/docs integrity |

## How to Use

1. Complete `.adf/AI_BOOT.md` first.
2. Copy the relevant prompt into your AI session (or reference the file path).
3. Keep the active BUILD boundary explicit in the conversation.
4. Update state files as the prompt instructs.

## Design Rules

- Prompts must reinforce `AI_CONTRACT.md`
- Prompts must not authorize architecture redesign
- Prompts must not authorize placeholder files
- Formal schemas and stricter validation arrive in BUILD-004

## Related

- `bootstrap/BOOT_SEQUENCE.md`
- `.adf/TOKEN_BUDGET.md`
- `ROADMAP.md`
