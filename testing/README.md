# testing

Test harness and contract verification for ADF.

## Purpose

The `testing` package will verify that ADF remains correct as builds accumulate:

- Structure and architecture lock checks
- Documentation integrity (required files present, non-empty)
- `.adf` contract and state consistency
- Core runtime behavior (from BUILD-005 onward)
- Prompt/handoff format validation
- Release checklist automation hooks

## Status

**Scaffold only in BUILD-001.**  
Testing framework work is planned for **BUILD-011**, with deeper integration hardening in BUILD-017.

## Planned Test Layers

| Layer | What it guards |
|-------|----------------|
| Structure | Locked folders and required root/`.adf` files |
| Docs | No empty markdown; required sections present |
| Contracts | AI_CONTRACT rules reflected in state updates |
| Runtime | `adf-core` loaders, context, state I/O |
| Integration | Cross-package flows and failure recovery |

## Local Guidance (Until Harness Exists)

Until BUILD-011, validate BUILD deliverables manually against:

1. Locked architecture in root `README.md`
2. `.adf/AI_CONTRACT.md`
3. Current BUILD mission in `.adf/CURRENT_TASK.md`

## Related Docs

- `.adf/AI_CONTRACT.md`
- `release/README.md`
- `ROADMAP.md` (BUILD-011, BUILD-017)
