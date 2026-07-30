# Business Decisions

Decision log for the ADF business package. Record durable choices here.

| ID | Date | Decision | Rationale | Status |
|----|------|----------|-----------|--------|
| BD-001 | 2026-07-30 | Create `business/ADF-v1.0/` as Business SSOT root | Engineering complete; need investor/customer/partner authority layer | Accepted |
| BD-002 | 2026-07-30 | Lock folder structure `00`–`10` + `assets` | Prevent structural drift across BUSINESS phases | Accepted |
| BD-003 | 2026-07-30 | Markdown is master; PDF/DOCX/PPT/XLSX are generated artifacts | Single editable source; avoid conflicting binaries | Accepted |
| BD-004 | 2026-07-30 | Business must not contradict Engineering; Engineering must not contradict Business | Mutual non-contradiction preserves trust | Accepted |
| BD-005 | 2026-07-30 | Business follows Product | Strategy describes what is shipped or clearly roadmap-labeled | Accepted |
| BD-006 | 2026-07-30 | BUSINESS phases 001–011 execute in order | Predictable delivery for external stakeholders | Accepted |

## Decision Rules

1. New durable business choices get a `BD-NNN` row.
2. Superseded decisions remain listed with status `Superseded` and a pointer to the replacement.
3. Do not silently change pricing, positioning, or legal posture without a decision entry.
