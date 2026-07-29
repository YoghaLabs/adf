# AI Runtime (Human Guide)

## Why Read This

ADF expects many different AI tools to operate the same repository. This page explains the human-facing idea; the binding operator loop lives in `.adf/AI_RUNTIME.md`.

## What “AI Runtime” Means Here

Not a JVM/Node process — a **file-based operating model**:

- Boot from `.adf`
- Read SSOT state
- Execute within BUILD scope
- Write state back
- Hand off cleanly

## Cold Start

1. Root `VERSION`
2. `.adf/QUICK_CONTEXT.md`
3. `.adf/AI_BOOT.md`
4. `.adf/AI_RUNTIME.md`

## SSOT

If chat and `.adf` disagree, update `.adf` to the truth, then continue. Do not keep private status only in chat.

## Related

- `.adf/AI_RUNTIME.md`
- `.adf/WORKFLOW.md`
- `BUILD_SYSTEM.md`
