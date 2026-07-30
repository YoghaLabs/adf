# Business Rules

**Package:** `business/ADF-v1.0/`  
**Status:** Authoritative for business work

## Core Rules

1. **Business documents are authoritative** for business decisions (positioning, GTM, pricing narrative, investor/enterprise packaging).
2. **Engineering must not contradict Business** on claims that are business-owned (market promise, packaging, commercial posture), once those claims are recorded in Business SSOT.
3. **Business must not contradict Engineering** on what the product actually ships. Capability statements must match RC1/engineering SSOT or be clearly labeled roadmap.
4. **Business follows Product.** Strategy describes the product that exists (or an explicitly dated roadmap item).
5. **No duplicated documents.** Do not copy `/legal`, `/adf-docs`, or `/.adf` content into business folders; link instead.
6. **Markdown is the master format.** PDF, DOCX, PPT, and XLSX are generated artifacts, not SSOT.
7. **Structure is LOCKED.** Do not rename, remove, or add folders under `business/ADF-v1.0/`.
8. **Template is mandatory.** Every future strategy document uses `DOCUMENT_TEMPLATE.md`.
9. **Phase stop rule.** Do not start the next BUSINESS phase until the current phase is complete and an explicit prompt authorizes continuation.
10. **Decision logging.** Durable choices are recorded in `BUSINESS_DECISIONS.md`.

## Conflict Resolution

| Conflict type | Resolution |
|---------------|------------|
| Business claim vs shipped engineering | Prefer engineering truth; amend business doc |
| Engineering messaging vs approved business positioning | Prefer business positioning for external narrative; update engineering docs if needed for consistency |
| Legal product text vs business legal strategy | `/legal` wins for license/EULA/copyright text |

## Quality

- Professional, enterprise-grade writing
- Consistent formatting
- No placeholder or lorem content
- Update SSOT status files when phase state changes
