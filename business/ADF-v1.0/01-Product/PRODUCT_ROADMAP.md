# Product Roadmap

## Objective

Define thematic product roadmap for ADF 1.x, 2.x, and 3.x without exact calendar dates.

## Background

Engineering through BUILD-020 produced `1.0.0-rc1`. GA `1.0.0` is a release-quality
gate (signing/coverage), not a new platform BUILD. Future majors require explicit
program decisions — this document sets themes only.

## Current Situation

| Line | State |
|------|--------|
| ADF 1.0.0-rc1 | Shipped engineering RC1 |
| ADF 1.0.0 GA | Release gate (planned quality bar) |
| ADF 1.x | Stabilize and harden the v1 architecture |
| ADF 2.x / 3.x | Theme-level direction — not committed feature lists |

## Analysis

Roadmaps fail when vision is written as if already delivered. Themes must stay
labeled, and 1.x must remain faithful to the frozen v1 architecture.

## Strategy

### ADF 1.x — Stabilize the foundation

Themes:

- Complete GA quality gates for the v1 line
- Harden documentation, packaging, and adoption playbooks
- Deepen Professional and Enterprise **packaging** on top of existing RC1 capabilities
- Enterprise hardening themes: governance operationalization, audit readiness, deployment options — **without claiming RC1 already includes live production SSO IdP wiring**
- Keep orchestration in the planning/control posture unless a later explicit decision expands it

### ADF 2.x — Expand platform depth

Themes (direction, not availability):

- Richer participant collaboration and policy-controlled workflows
- Stronger ecosystem (packages, templates, marketplace maturity)
- Deeper observability and operational tooling
- Selective automation only where governance and product readiness allow

### ADF 3.x — Broader platform presence

Themes (direction, not availability):

- Wider enterprise footprint as a standard AI engineering platform layer
- Possible Cloud Edition realization (hosted model) if product and operational readiness justify it
- Long-horizon architecture evolution without abandoning documentation-first principles

## Recommendations

1. Always pair roadmap themes with “not available unless labeled shipped.”
2. Do not invent BUILD-021 inside this business document.
3. Revisit 2.x/3.x themes after evidence from adoption — not marketing pressure.

## Implementation Plan

| Horizon | Owner focus |
|---------|-------------|
| 1.x | Product + engineering release gates; commercial packaging |
| 2.x / 3.x | Future program charters; update this doc when accepted |

## Deliverables

Theme roadmap for investor and enterprise conversations.

## Risks

| Risk | Mitigation |
|------|------------|
| Roadmap treated as commitment dates | Themes only; no calendars |
| Cloud described as near-term | Keep under 3.x / future vision |

## Success Metrics

Stakeholders can distinguish shipped RC1, 1.x hardening, and later vision.

## Next Actions

Align lifecycle language in `PRODUCT_LIFECYCLE.md`.
