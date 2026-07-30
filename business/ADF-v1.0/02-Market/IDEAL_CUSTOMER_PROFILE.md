# Ideal Customer Profile

## Objective

Describe the Ideal Customer Profile (ICP) for ADF commercial adoption.

## Background

Not every organization that uses AI coding tools is an ADF ICP. ICP favors teams
that need continuity, documentation, and controlled collaboration — not only faster
generation.

## Current Situation

Near-term ICP assumes self-managed deployment and RC1/GA-path maturity. Cloud-hosted
ICP is out of scope until Cloud Edition exists.

## Analysis

Best-fit customers already feel pain from fragmented AI sessions, weak handoffs, and
inconsistent documentation. Poor-fit customers want a chat plugin with zero process
change.

## Strategy

### Primary ICP (commercial)

| Dimension | Profile |
|-----------|---------|
| **Organization size** | Software houses, consultancies, SIs, and mid-size to large engineering orgs with multi-person delivery |
| **Typical problems** | Context loss across AI sessions; documentation drift; unclear architecture ownership; weak audit trail for AI-assisted work |
| **Buying motivations** | Standardize AI-assisted delivery; reduce rework from lost context; prepare governance posture; commercial license clarity |
| **Decision makers** | CTO / Engineering Manager / Solution Architect; for Enterprise also security/compliance stakeholders; for software houses, owner/director |
| **Technical maturity** | Comfortable with frameworks, repository discipline, ADRs/docs-as-code, and staged adoption (pilot → team → org) |

### Secondary ICP

- Startups with explicit architecture practice
- Government/institutional IT units with documentation and accountability mandates
- Education for Community (non-ICP for paid Enterprise unless specialized program)

### Non-ICP (for now)

- Buyers seeking only in-editor autocomplete
- Buyers requiring managed Cloud ADF today
- Buyers needing unsupervised multi-agent production control as a current promise

## Recommendations

1. Score opportunities against this ICP before deep customization.
2. Route non-ICP to honest “not a fit yet” or Community learning path.
3. Keep Enterprise ICP conversations RC1-accurate on SSO/autonomy limits.

## Implementation Plan

Sales playbooks turn ICP into discovery questions (BUSINESS-006).

## Deliverables

ICP definition for qualification.

## Risks

| Risk | Mitigation |
|------|------------|
| ICP too broad | Non-ICP list + Target Markets P1 |

## Success Metrics

Win/loss notes reference ICP fit dimensions.

## Next Actions

See `BUYER_PERSONAS.md`.
