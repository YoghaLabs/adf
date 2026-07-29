# Knowledge Graph

Relationships among ADF knowledge objects.

**Why:** without an explicit graph, agents treat files as a flat pile and miss dependencies (e.g., updating state without ADRs, or writing docs that contradict SSOT).

## Core Nodes

```text
Manifest ──► State ──► Todos ──► Current Task
    │          │
    │          ├──► Session
    │          └──► Memory
    │
    ├──► Knowledge indexes (FILE/MODULE/REPO maps)
    ├──► ADR Index ──► ADRs
    ├──► Bootstrap packs
    ├──► Prompts
    └──► Documentation (adf-docs)
```

## Relationships (Semantic)

| From | To | Relationship | Why it matters |
|------|----|--------------|----------------|
| Manifest | State | identifies | Version/build identity must match |
| State | Todos / Task | drives | Live dashboard scopes work |
| Task | Bootstrap pack | specified by | Mission details live in `BUILD-00N` |
| Memory / Session | Boot | informs | Continuity without chat |
| ADR Index | ADRs | catalogs | Traceable design rationale |
| ADRs | Architecture Rules | ground | Rules cite accepted decisions |
| Knowledge Graph | Context Graph | feeds | Knowing relations enables restore order |
| Prompts | Runtime / Contract | invoke | Prompts must not override SSOT |
| adf-docs | `.adf` | mirrors / teaches | Humans learn; SSOT remains authoritative |
| Bootstrap | BUILD History/Status | records | Packs evidence each increment |

## Operating Principle

When you change a node, update its dependents. Example: new ADR → update `ADR_INDEX`, possibly `DECISION_LOG`, `FILE_INDEX`, and changelog notes.

## Related

- `CONTEXT_GRAPH.md` — how AI restores context using these nodes
- `DEPENDENCY_GRAPH.md` — module-level dependencies
- `adf-docs/KNOWLEDGE_ARCHITECTURE.md`
