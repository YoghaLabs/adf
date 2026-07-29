# BUILD-003 Migration Notes

**Why:** cumulative builds must explain how new layers relate to old ones without breaking them.

## From BUILD-001

- Keep locked folders and foundation docs intact
- ADRs formalize decisions that BUILD-001 already implied (structure lock)

## From BUILD-002

- Keep AI Runtime SSOT files intact
- ADR-003 formalizes `.adf` as runtime SSOT
- Knowledge graphs sit **beside** maps/indexes; they do not replace `REPOSITORY_MAP` / `FILE_INDEX`
- `DECISION_LOG` remains; ADRs are the durable architecture record with richer structure

## Roadmap Clarification

Earlier roadmap drafts labeled BUILD-003 as “Bootstrap Automation.”  
**Authoritative mission for BUILD-003 is Knowledge Architecture & ADR System** (this pack).  
Bootstrap *automation* remains future work under tools/later builds — not a folder redesign.

## What Operators Should Do Differently After BUILD-003

1. Read `ADR_INDEX.md` when making design-affecting changes
2. Create a new ADR before/with architecture changes
3. Use `CONTEXT_GRAPH.md` to restore context efficiently
4. Consult `RISK_REGISTER.md` during reviews

## Non-Migrations

- Do not move ADRs out of `.adf/adr/`
- Do not delete BUILD-002 runtime files because graphs exist
- Do not start BUILD-004 during BUILD-003 closeout
