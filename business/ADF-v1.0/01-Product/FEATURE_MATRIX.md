# Feature Matrix

## Objective

Compare edition intent across product categories, with clear ship vs packaging vs roadmap labels.

## Background

ADF `1.0.0-rc1` delivers a single cumulative platform (BUILD-001…020). Edition columns
describe **commercial packaging intent**, not four separately frozen codebases today.

## Current Situation

Legend:

| Symbol | Meaning |
|--------|---------|
| **S** | Shipped in RC1 (architecture present) |
| **L** | Shipped with stated limits (see notes) |
| **P** | Edition packaging / commercial entitlement (strategy) |
| **R** | Roadmap for that edition theme |
| **F** | Future vision (Cloud / later major) |
| **—** | Not positioned for this edition |

## Analysis

A useful matrix separates engineering reality from commercial packaging. Without that
split, editions appear either fake or over-promised.

## Strategy

### Comparison matrix

| Category | RC1 ship | Community | Professional | Enterprise | Cloud |
|----------|----------|-----------|--------------|------------|-------|
| Runtime (engines / Core) | S | S | S+P | S+P | F |
| Studio (control center) | S | S | S+P | S+P | F |
| SDK | S | S | S+P | S+P | F |
| CLI / distribution tooling | S | S | S+P | S+P | F |
| Marketplace / registry foundations | S | S | S+P | S+P | F |
| Package Manager (APM) | S | S | S+P | S+P | F |
| Templates | S | S | S+P | S+P | F |
| Collaboration (AI as participant) | S | S | S+P | S+P | F |
| Orchestration | L | L | L+P | L+P / R | F |
| Enterprise Governance | L | L | L+P | L+P / R | F |
| Observability (runtime monitor foundations) | S | S | S+P | S+P / R | F |
| Security (baseline + enterprise hardening) | L | L | L+P | L+P / R | F |
| Deployment (installer / offline bundle) | S | S | S+P | S+P / R | F |
| Support | Docs | Community docs | P commercial | P enterprise | F |

### Notes (limits and honesty)

1. **Orchestration (RC1):** planning / workflow models — **not** autonomous multi-agent execution.
2. **Enterprise Governance (RC1):** governance foundations and views; **live production IdP SSO wiring** is out of RC1 (roadmap for Enterprise hardening).
3. **Community** receives the useful RC1 baseline under Community License terms — not a hollow subset.
4. **Professional / Enterprise “P”** means commercial rights, support, and packaging commitments — not a claim that a separate binary already exists.
5. **Cloud “F”** means future vision only.

## Recommendations

1. Keep this matrix authoritative for Sales/Marketing feature claims.
2. Update symbols when GA or later majors land — do not silently upgrade “R” to “S”.
3. Prefer explaining limits in one sentence over omitting the row.

## Implementation Plan

Business Model and Sales phases inherit this matrix; engineering updates ship column via release notes.

## Deliverables

Edition comparison table with ship-status discipline.

## Risks

| Risk | Mitigation |
|------|------------|
| Matrix read as “four products shipping today” | README + legend + notes |

## Success Metrics

Reviewers can answer “what works in RC1?” from the RC1 ship column alone.

## Next Actions

See `PRODUCT_ROADMAP.md` for 1.x / 2.x / 3.x themes.
