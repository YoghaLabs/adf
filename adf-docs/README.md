# ADF Documentation

Human-facing documentation for the AI Development Framework.

## Contents

| Doc | Description |
|-----|-------------|
| `WHAT_IS_ADF.md` | Product definition and value proposition |
| `GETTING_STARTED.md` | First steps for humans and AI operators |
| `ARCHITECTURE.md` | Locked structure and package boundaries |
| `AI_RUNTIME.md` | Human guide to the AI runtime model |
| `BUILD_SYSTEM.md` | How numbered BUILD increments work |
| `WORKFLOW.md` | Idea → release lifecycle |
| `BEST_PRACTICES.md` | Operating practices |
| `KNOWLEDGE_ARCHITECTURE.md` | Knowledge layer overview |
| `ADR_GUIDE.md` | How to write/use ADRs |
| `CONTEXT_ENGINE.md` | Context restore / future engine |
| `MEMORY_SYSTEM.md` | Memory/session model |
| `PROJECT_LIFECYCLE.md` | Lifecycle across builds |
| `README.md` | This index |

## Reading Order

1. `WHAT_IS_ADF.md`
2. `GETTING_STARTED.md`
3. `ARCHITECTURE.md`
4. `AI_RUNTIME.md` + `BUILD_SYSTEM.md`
5. `KNOWLEDGE_ARCHITECTURE.md` + `ADR_GUIDE.md`
6. Root `ROADMAP.md` for build sequencing
7. `.adf/AI_BOOT.md` if you will make changes via AI

## Maintenance

- Keep docs aligned with `.adf` SSOT contracts
- Prefer useful, specific guidance over generic filler
- Expand operator/architect/contributor guides in BUILD-016 without abandoning these foundations
