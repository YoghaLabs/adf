# Upgrade Path

## Objective

Explain the intended upgrade flow across ADF editions.

## Background

Editions form a ladder from non-commercial use to commercial and enterprise
engagement, with Cloud as a future option — not a current step.

## Current Situation

```text
Community
    ↓
Professional
    ↓
Enterprise
    ↓
Cloud (future vision — not available)
```

Today, organizations evaluate on Community (or under explicit permission) and move to
commercial terms when business use requires it.

## Analysis

Upgrade paths fail when Community is unusable or when Cloud is sold as the next
mandatory step. The ladder must be optional and evidence-based.

## Strategy

| Step | When it makes sense | What changes |
|------|---------------------|--------------|
| **Community** | Learning, research, evaluation, non-commercial development | Useful RC1 baseline under Community License |
| **→ Professional** | Commercial delivery by software houses, consultants, or product teams | Commercial rights, professional support, team-oriented packaging |
| **→ Enterprise** | Organizational controls required (governance, audit, deployment, enterprise support) | Enterprise agreement and enterprise-oriented bundle/ops posture |
| **→ Cloud** | Future preference for managed hosting | **Not available in RC1**; only if/when Cloud Edition is realized |

Upgrade is driven by **use case and organizational need**, not artificial feature removal.

## Recommendations

1. Qualify upgrades from buyer need (commercial use, governance, support).
2. Never require Cloud language in current RC1 sales paths.
3. Keep Community → Professional as the primary first commercial step.

## Implementation Plan

Sales playbooks (BUSINESS-006) operationalize qualification questions from this ladder.

## Deliverables

Edition upgrade narrative for GTM and investor materials.

## Risks

| Risk | Mitigation |
|------|------------|
| Forced upgrades via crippleware | BD-008 Community usefulness |

## Success Metrics

Prospects can self-identify the correct rung from this table.

## Next Actions

Reinforce uniqueness in `PRODUCT_DIFFERENTIATORS.md`.
