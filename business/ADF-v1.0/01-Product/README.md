# Product Strategy Package — README

**Phase:** BUSINESS-003  
**Location:** `business/ADF-v1.0/01-Product/`  
**Product:** ADF `1.0.0-rc1`  
**Business package:** Product Strategy SSOT for commercial product decisions

## Purpose

This package defines how ADF becomes a **commercial software product**: positioning,
editions, packaging, licensing approach, pricing principles, upgrade paths, and
competitive category placement.

It is the **Single Source of Truth (SSOT)** for future product decisions used by
Market Analysis, Business Model, Sales, Marketing, and Investor packages.

## Scope

| In scope | Out of scope |
|----------|--------------|
| Product editions and packaging strategy | Exact prices or discount schedules |
| Feature comparison by edition (intent) | Market-size estimates |
| Roadmap themes (1.x / 2.x / 3.x) | Legal license text (see `/legal`) |
| Pricing philosophy | Starting BUSINESS-004 |
| Capability claims aligned to RC1 | Inventing unshipped features as “available” |

## Relationship with Business SSOT

- Package lives under locked `business/ADF-v1.0/` structure.
- Follows `DOCUMENT_TEMPLATE.md` and Narrative Standards (BD-007).
- Product edition principles: BD-008.
- Engineering truth: BUILD-001…020 / `1.0.0-rc1`. Roadmap items are labeled.
- Legal license wording remains `/legal`; this package describes licensing *strategy* only.

## Documents

| Document | Focus |
|----------|--------|
| `PRODUCT_STRATEGY.md` | Overall commercial product strategy |
| `PRODUCT_POSITIONING.md` | What ADF is / is not |
| `VALUE_PROPOSITION.md` | Value by audience |
| `PRODUCT_EDITIONS.md` | Community / Professional / Enterprise / Cloud |
| `FEATURE_MATRIX.md` | Edition comparison matrix |
| `PRODUCT_ROADMAP.md` | Themes for 1.x / 2.x / 3.x |
| `PRODUCT_LIFECYCLE.md` | Alpha → EOS |
| `PACKAGING_STRATEGY.md` | Distribution packages and bundles |
| `LICENSING_STRATEGY.md` | Licensing philosophy by segment |
| `PRICING_PRINCIPLES.md` | Pricing philosophy (no numbers) |
| `UPGRADE_PATH.md` | Community → Professional → Enterprise → Cloud |
| `PRODUCT_DIFFERENTIATORS.md` | Structural strengths |
| `COMPETITIVE_POSITION.md` | Category positioning (no competitor names) |

## Reading Order

1. `PRODUCT_STRATEGY.md`  
2. `PRODUCT_POSITIONING.md` → `VALUE_PROPOSITION.md`  
3. `PRODUCT_EDITIONS.md` → `FEATURE_MATRIX.md` → `UPGRADE_PATH.md`  
4. `PACKAGING_STRATEGY.md` → `LICENSING_STRATEGY.md` → `PRICING_PRINCIPLES.md`  
5. `PRODUCT_ROADMAP.md` → `PRODUCT_LIFECYCLE.md`  
6. `PRODUCT_DIFFERENTIATORS.md` → `COMPETITIVE_POSITION.md`

## Rules

- Community Edition must remain useful — not artificially crippled.
- Cloud Edition is a **future vision**, not available today.
- Do not promise features that are not in RC1 without a clear roadmap label.
