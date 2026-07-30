# ADF v1.0 — Business Strategy Package

**Product:** ADF (AI Development Framework)  
**Product version:** `1.0.0-rc1`  
**Business phase:** BUSINESS-004 — Market Analysis ✅  
**Business package:** `B1.3.0`  
**Status:** Executive + Product + Market complete; next BUSINESS-005 (not started)

## Purpose

This package is the **Business Strategy Single Source of Truth (SSOT)** for ADF.

It is intended for:

- Investors
- Enterprise customers
- Partners
- Internal management
- Sales
- Marketing
- Future team members

This package is **not engineering**. Engineering remains in the repository’s locked technical architecture (`adf-core`, `adf-studio`, `adf-docs`, `legal`, `release`, etc.).

## Scope

| In scope | Out of scope |
|----------|--------------|
| Business strategy, positioning, GTM, investor/enterprise narratives | Changing product architecture |
| Sales, marketing, operations, launch planning | Runtime / SDK / Studio code changes |
| Business decisions and roadmap | Inventing BUILD-021 or new platforms |

## Structure (LOCKED)

```text
business/ADF-v1.0/
├── 00-Executive/
├── 01-Product/
├── 02-Market/
├── 03-Business/
├── 04-Sales/
├── 05-Marketing/
├── 06-Investor/
├── 07-Enterprise/
├── 08-Operations/
├── 09-Legal/
├── 10-Launch/
└── assets/
```

**Do not rename these folders. Do not add sibling folders inside `ADF-v1.0/`.**  
This structure is **LOCKED** for all future BUSINESS phases.

## Workflow

Business work advances through numbered phases:

| Phase | Focus |
|-------|--------|
| BUSINESS-001 | Business Foundation ✅ |
| BUSINESS-002 | Executive Package ✅ |
| BUSINESS-003 | Product Strategy ✅ |
| BUSINESS-004 | Market Analysis ✅ |
| BUSINESS-005 | Business Model (next) |
| BUSINESS-006 | Sales Strategy |
| BUSINESS-007 | Marketing Strategy |
| BUSINESS-008 | Investor Package |
| BUSINESS-009 | Enterprise Package |
| BUSINESS-010 | Operations + Legal |
| BUSINESS-011 | Launch Package |

Rules:

1. Complete the active BUSINESS phase before starting the next.
2. Place deliverables only in the folder that matches the phase theme.
3. Follow `DOCUMENT_TEMPLATE.md` for every new strategy document.
4. Update Business SSOT files when status changes.
5. Generated PDF/DOCX/PPT/XLSX are artifacts — Markdown remains master.

## Business SSOT

| File | Role |
|------|------|
| `BUSINESS_MANIFEST.md` | Identity of the business package |
| `BUSINESS_STATE.md` | Live business status |
| `BUSINESS_ROADMAP.md` | BUSINESS-001 → BUSINESS-011 plan |
| `BUSINESS_HISTORY.md` | Completed phase record |
| `BUSINESS_STATUS.md` | Phase checklist status |
| `BUSINESS_TODO.md` | Active business todos |
| `BUSINESS_DECISIONS.md` | Decision log |
| `BUSINESS_INDEX.md` | Document index |
| `BUSINESS_VERSION.md` | Business package version |
| `BUSINESS_CHANGELOG.md` | Business changelog |
| `BUSINESS_RULES.md` | Authority and conflict rules |
| `DOCUMENT_TEMPLATE.md` | Mandatory document template |

## Related Engineering / Legal

- Product release: root `VERSION` (`1.0.0-rc1`), `release/`
- Product legal: `/legal`
- Engineering SSOT: `/.adf`
