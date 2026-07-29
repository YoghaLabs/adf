# Glossary

Shared vocabulary for ADF. **Why:** ambiguous terms cause AI drift (“runtime” vs “Studio” vs “BUILD”).

| Term | Meaning |
|------|---------|
| **ADF** | AI Development Framework — this repository and its operating model |
| **SSOT** | Single Source of Truth — for AI ops, `.adf/` |
| **BUILD** | Numbered cumulative delivery unit (`BUILD-001` … `BUILD-020`) |
| **ADR** | Architecture Decision Record — durable rationale for design choices |
| **AI Runtime** | File-based operate loop in `.adf/` (not necessarily executable code yet) |
| **Boot** | Ordered cold-start reading procedure (`AI_BOOT.md`) |
| **Handoff** | End-of-session update so the next operator can resume |
| **Architecture Lock** | Forbidden renames/moves/new top-level folders |
| **Bootstrap pack** | Spec artifacts under `bootstrap/BUILD-00N/` |
| **Context** | Assembled understanding an AI needs to act (quick vs full) |
| **Knowledge Layer** | Graphs, glossary, ADRs, timeline, risks (BUILD-003) |
| **Context Engine** | Planned systematic context assembly (BUILD-004) |
| **Studio** | GUI in `adf-studio/` (from BUILD-013) |
| **Core** | Executable package `adf-core/` (from BUILD-005) |
| **Token budget** | Limits on how much context to load (`TOKEN_BUDGET.md`) |

## Related

- `KNOWLEDGE_GRAPH.md`
- `ADR_INDEX.md`
- `adf-docs/KNOWLEDGE_ARCHITECTURE.md`
