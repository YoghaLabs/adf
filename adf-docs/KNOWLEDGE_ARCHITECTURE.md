# Knowledge Architecture

## Why

ADF must be self-documenting. Files that only describe *what* exists are insufficient for multi-agent work; agents need recoverable *why*.

## Layers

1. **SSOT runtime** (`.adf` state/contracts) — BUILD-002
2. **Knowledge architecture** (graphs, glossary, ADRs, timeline, risks) — BUILD-003
3. **Context Engine** (systematic assembly) — BUILD-004

## Where to Look

| Need | File |
|------|------|
| Relationships | `.adf/KNOWLEDGE_GRAPH.md` |
| Restore order | `.adf/CONTEXT_GRAPH.md` |
| Module deps | `.adf/DEPENDENCY_GRAPH.md` |
| Decisions | `.adf/ADR_INDEX.md` |
| Terms | `.adf/GLOSSARY.md` |

## Related

- `ADR_GUIDE.md`
- `CONTEXT_ENGINE.md`
- `MEMORY_SYSTEM.md`
