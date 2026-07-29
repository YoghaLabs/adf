# Context Engine Inputs

## Why

Defining inputs prevents agents from treating arbitrary files as equally important and blowing the token budget.

## Required Inputs (every restore)

| Input | Path | Why required |
|-------|------|--------------|
| Version identity | `VERSION` | Canonical version/build/branch |
| Manifest | `.adf/PROJECT_MANIFEST.md` | Project identity |
| Quick snapshot | `.adf/QUICK_CONTEXT.md` | Minimal now |
| Live state | `.adf/PROJECT_STATE.md` | Dashboard truth |
| Build board | `.adf/BUILD_STATUS.md` | Progress truth |
| Mission | `.adf/CURRENT_TASK.md` | Scope boundary |
| Todos | `.adf/TODOS.md` | Remaining work |
| Contract | `.adf/AI_CONTRACT.md` | Binding rules |
| Session | `.adf/SESSION.md` | Handoff/checkpoints |
| Memory | `.adf/MEMORY.md` | Durable facts |
| Engine entry | `.adf/CONTEXT_ENGINE.md` | Engine acknowledgement |

## Conditional Inputs

| When | Also read |
|------|-----------|
| Standard/Deep work | `AI_RUNTIME.md`, `BOOT_SEQUENCE_V2.md`, `RESUME_PROTOCOL.md` |
| Design changes | `ADR_INDEX.md` + relevant ADRs |
| Audits / handoffs | `FULL_CONTEXT.md`, graphs, `RISK_REGISTER.md` |
| Module placement questions | `MODULE_INDEX.md`, `DEPENDENCY_GRAPH.md` |

## Non-Inputs (do not treat as SSOT)

- Random chat logs outside the repo
- Unindexed scratch files
- Studio UI state (does not exist yet as SSOT)

## Example Input Set (Standard)

```text
VERSION, MANIFEST, QUICK_CONTEXT, PROJECT_STATE, BUILD_STATUS,
CURRENT_TASK, TODOS, AI_CONTRACT, AI_RUNTIME, CONTEXT_ENGINE,
SESSION, MEMORY
```
