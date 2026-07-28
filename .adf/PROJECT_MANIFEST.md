# Project Manifest

| Field | Value |
|-------|-------|
| Repository | `adf` |
| Full name | AI Development Framework |
| Organization | YoghaLabs |
| Version | `v0.1.0-alpha` |
| Current build | `BUILD-001` |
| Primary branch | `develop` |
| License | MIT |
| Status | Foundation in progress |

## Product Summary

ADF is an AI-first development framework that stores architecture, build state, knowledge, and AI operating contracts inside the repository so humans and agents can collaborate across sessions without losing context.

## Locked Top-Level Layout

```text
.adf/
adf-core/
adf-studio/
adf-docs/
adf-examples/
adf-templates/
bootstrap/
prompts/
testing/
tools/
release/
```

Do not add or rename top-level folders.

## Package Roles

| Path | Role | First implementation BUILD |
|------|------|----------------------------|
| `.adf/` | Operating context | BUILD-001 |
| `bootstrap/` | Boot contracts & sequence | BUILD-001 (automation later) |
| `prompts/` | Prompt library | BUILD-001 (schemas later) |
| `adf-docs/` | Human documentation | BUILD-001 |
| `adf-core/` | Runtime core | BUILD-005 |
| `adf-templates/` | Templates | BUILD-009 |
| `adf-examples/` | Examples | BUILD-010 |
| `testing/` | Test harness | BUILD-011 |
| `release/` | Release pipeline | BUILD-012 |
| `adf-studio/` | GUI | BUILD-013 |
| `tools/` | Utilities | BUILD-003 / BUILD-008 |

## Canonical Documents

- Vision & philosophy: `PROJECT_DNA.md`
- Live status: `PROJECT_STATE.md`
- Active work: `CURRENT_TASK.md`
- Agent rules: `AI_CONTRACT.md`
- Resume procedure: `AI_BOOT.md`
- Short snapshot: `QUICK_CONTEXT.md`
