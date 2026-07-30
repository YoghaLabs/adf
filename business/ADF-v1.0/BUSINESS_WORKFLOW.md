# Business Workflow

## Execution Model

ADF business work advances through numbered **BUSINESS** phases after engineering RC1.

```text
BUSINESS-001 Foundation
    → BUSINESS-002 Executive
    → BUSINESS-003 Product
    → BUSINESS-004 Market
    → BUSINESS-005 Business Model
    → BUSINESS-006 Sales
    → BUSINESS-007 Marketing
    → BUSINESS-008 Investor
    → BUSINESS-009 Enterprise
    → BUSINESS-010 Operations + Legal
    → BUSINESS-011 Launch
```

## Phase Procedure

1. Confirm active phase in `BUSINESS_STATE.md` / `BUSINESS_STATUS.md`.
2. Read `BUSINESS_RULES.md` and `DOCUMENT_TEMPLATE.md`.
3. Write deliverables only into the mapped locked folder(s).
4. Update SSOT: state, status, todo, decisions, changelog, history, index.
5. Stop at phase boundary unless explicitly authorized to continue.

## Roles (logical)

| Role | Responsibility |
|------|----------------|
| Founder / Architect | Final business authority |
| Strategy author | Drafts phase documents |
| Reviewer | Checks non-contradiction with Engineering and `/legal` |
| Sales / Marketing / Investor owners | Consume SSOT; do not fork competing narratives |

## Artifact Generation

1. Author Markdown master in the correct folder.
2. Optionally export PDF/DOCX/PPT/XLSX for distribution.
3. Record export location under `assets/` if needed.
4. Never treat exports as editable SSOT.

## Stop Rule

**BUSINESS-001 stops before BUSINESS-002.**  
Do not begin the Executive Package until an explicit BUSINESS-002 prompt is issued.
