# Dependency Graph

Module and subsystem dependencies for ADF.

**Why:** implementing in the wrong package (or assuming runtime exists too early) wastes builds and breaks the lock.

## Logical Graph

```text
                    .adf (SSOT + Knowledge + ADRs)
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
      bootstrap         prompts         adf-docs
           │               │               │
           └───────────────┼───────────────┘
                           ▼
                     tools (future)
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
       adf-core         testing         release
           │
           ▼
       adf-studio
           │
     templates / examples (consume core+docs patterns)
```

## Dependency Table

| Module | Depends on | Why |
|--------|------------|-----|
| `.adf` | — (root intelligence) | SSOT for all operators |
| `bootstrap` | `.adf` contracts | Packs reference state/rules |
| `prompts` | `.adf` runtime/contract | Prompts must reinforce law |
| `adf-docs` | `.adf` truth | Teaching layer; no contradictory status |
| `tools` | `.adf`, bootstrap | Validators/helpers read contracts |
| `adf-core` | `.adf` schemas/files | Runtime loads SSOT |
| `testing` | core + contracts + docs | Verifies invariants |
| `release` | VERSION/CHANGELOG + testing gates | Ships what is proven |
| `adf-studio` | core + prompts + `.adf` | GUI over runtime/state |
| `adf-templates` | architecture lock + docs standards | Must emit valid trees |
| `adf-examples` | templates + docs + runtime model | Demonstrates correct usage |

## Hard Rules

- Do not create reverse dependencies that force docs to own runtime state
- Do not let Studio become SSOT
- Do not implement core features inside `prompts/` or `adf-docs/`

## Related

- `MODULE_INDEX.md`
- `REPOSITORY_MAP.md`
- `adr/ADR-001-Repository-Structure.md`
