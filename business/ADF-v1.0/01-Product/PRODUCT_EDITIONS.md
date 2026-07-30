# Product Editions

## Objective

Define ADF product editions for commercial packaging without assigning prices.

## Background

RC1 ships one product line under the ADF Community License for non-commercial use.
Commercial use requires permission (`/legal`). Editions describe how commercial
offerings will be structured.

## Current Situation

| Edition | Availability today |
|---------|-------------------|
| Community Edition | Defined in `/legal` for personal evaluation, learning, research, non-commercial development |
| Professional Edition | Product strategy — commercial offering (not a separate SKU build at RC1) |
| Enterprise Edition | Product strategy — enterprise offering built on RC1 governance foundations |
| Cloud Edition | **Future vision only** — not available |

## Analysis

Editions must serve different buyers without crippling Community. Professional serves
delivery businesses; Enterprise serves large-organization controls; Cloud is deferred.

## Strategy

### Community Edition

| Field | Description |
|-------|-------------|
| Purpose | Useful, complete-enough framework for learning, evaluation, research, and non-commercial development |
| Target customer | Individuals, students, researchers, early evaluators |
| Deployment model | Self-managed / local and customer-controlled environments |
| Support level | Community documentation and public materials |
| Licensing approach | ADF Community License (non-commercial grant; commercial use needs permission) |
| High-level feature scope | Core runtime stack, Studio, SDK/CLI surfaces, templates, marketplace/registry foundations as shipped in RC1 |

Community must remain **genuinely useful** (BD-008). It is not a demo stub.

### Professional Edition

| Field | Description |
|-------|-------------|
| Purpose | Commercial use for delivery organizations |
| Target customer | Software houses, consultants, development teams shipping commercial work |
| Deployment model | Self-managed customer environments |
| Support level | Commercial support (channels and SLAs defined in later commercial phases) |
| Licensing approach | Commercial license / permission for business use |
| High-level feature scope | Community capability baseline plus commercial rights, packaging suited to team delivery, and professional support entitlements |

### Enterprise Edition

| Field | Description |
|-------|-------------|
| Purpose | Organizational control, accountability, and operational readiness |
| Target customer | Large enterprises, government, regulated institutions |
| Deployment model | Self-managed enterprise environments; offline/air-gapped bundle options (see packaging) |
| Support level | Enterprise support and engagement model |
| Licensing approach | Enterprise agreement |
| High-level feature scope | Professional baseline plus emphasis on SSO-oriented governance, audit, deployment controls, observability, and enterprise collaboration/orchestration policy surfaces — **distinguishing production wiring vs RC1 foundations** in sales materials |

Note: RC1 includes enterprise governance **foundations**; live production IdP SSO wiring is explicitly out of RC1 and remains roadmap for enterprise hardening.

### Cloud Edition (Future)

| Field | Description |
|-------|-------------|
| Purpose | Managed / hosted ADF experience |
| Target customer | Organizations preferring vendor-operated delivery (future) |
| Deployment model | Vendor-hosted (vision) |
| Support level | Cloud service support (future) |
| Licensing approach | Subscription/service terms (future) |
| High-level feature scope | To be defined in a future major; **not available in ADF 1.0.0-rc1** |

## Recommendations

1. Always label Cloud as future vision.
2. Do not strip Community of Core/Studio usefulness to force upgrades.
3. Sell Enterprise on governance, audit, deployment, and support — with honest RC1 vs roadmap boundaries.

## Implementation Plan

Commercial SKU packaging and contracts follow in Business Model / Sales / Legal business phases; engineering remains RC1 until GA gates.

## Deliverables

Edition definitions for Feature Matrix and Upgrade Path.

## Risks

| Risk | Mitigation |
|------|------------|
| Community too weak | BD-008 usefulness rule |
| Enterprise overclaim | Release notes + matrix ship status |

## Success Metrics

Edition sheet answers purpose, customer, deployment, support, licensing, and scope without prices.

## Next Actions

Use `FEATURE_MATRIX.md` for category-level comparison.
