# Context Engine

## Why This Exists

Documentation and knowledge (BUILD-001–003) are necessary but not sufficient. Without a **shared restore engine**, every AI improvises its own boot order, skips validation, or starts work with stale state. The Context Engine is the first ADF **engine**: a normative specification every supported AI must follow before doing work.

**Not GUI. Not executable runtime code yet.**  
It is the contract that BUILD-005’s Runtime Engine will implement.

## Goal

Eliminate (or minimize) **context loss** across sessions and tools by enforcing one restoration workflow.

## Position in the Stack

```text
BUILD-001 Foundation
BUILD-002 AI Runtime SSOT
BUILD-003 Knowledge + ADR
BUILD-004 Context Engine   ← this specification
BUILD-005 Runtime Engine (executable)
BUILD-013+ Studio (GUI over engines)
```

## Core Artifacts

| Artifact | Role |
|----------|------|
| `CONTEXT_PIPELINE.md` | Stages from inputs → packed context → outputs |
| `RESTORE_SEQUENCE.md` | Ordered restore steps |
| `BOOT_SEQUENCE_V2.md` | Boot aligned to Context Engine |
| `SESSION_LIFECYCLE.md` | Session open → work → handoff |
| `STATE_MACHINE.md` | BOOT…HANDOFF states |
| `CHECKPOINTS.md` | Checkpoint create/restore/validate/cleanup |
| `RESUME_PROTOCOL.md` | Exact resume rules |
| `context/` | Engine I/O rules and pipeline details |

## Mandatory Principle

No AI may skip restore.  
No AI may invent a private restore order.  
All AIs use the same pipeline defined here and under `.adf/context/`.

## Related

- `.adf/CONTEXT_GRAPH.md` (knowledge restore tiers from BUILD-003)
- `.adf/AI_BOOT.md` (still valid; V2 extends it)
- `adf-docs/CONTEXT_ENGINE_GUIDE.md`
- `bootstrap/BUILD-004/`
