# Market Analysis Package — README

**Phase:** BUSINESS-004  
**Location:** `business/ADF-v1.0/02-Market/`  
**Product:** ADF `1.0.0-rc1`  
**Role:** Market Single Source of Truth (SSOT)

## Purpose

This package defines ADF’s market view: target markets, segments, ICPs, buyer
personas, trends, pain points, adoption barriers, SWOT (RC1-based), competitive
categories, go-to-market assumptions, and market risks.

It informs Business Model, Sales, Marketing, and Investor phases without inventing
market sizes or naming vendors.

## Scope

| In scope | Out of scope |
|----------|--------------|
| Segments, ICP, personas | TAM / SAM / SOM estimates |
| Qualitative trends and challenges | Invented market statistics |
| Category-level competitive landscape | Competitor brand names |
| SWOT grounded in RC1 | Starting BUSINESS-005 |
| GTM assumptions and market risks | Pricing numbers |

## Relationship with Business SSOT

- Consumes Executive Package (`00-Executive/`) and Product Strategy (`01-Product/`).
- Follows Narrative Standards (BD-007) and Product Edition Principles (BD-008).
- Capability claims match BUILD-001…020 or are labeled roadmap.
- Does not duplicate Product Strategy edition definitions; references them.

## Documents

| Document | Focus |
|----------|--------|
| `MARKET_ANALYSIS.md` | Overall market analysis |
| `TARGET_MARKETS.md` | Priority market arenas |
| `INDUSTRY_OVERVIEW.md` | Industry context |
| `CUSTOMER_SEGMENTS.md` | Segment definitions |
| `IDEAL_CUSTOMER_PROFILE.md` | ICP |
| `BUYER_PERSONAS.md` | Decision-maker personas |
| `MARKET_TRENDS.md` | Qualitative trends |
| `PAIN_POINTS.md` | Buyer/problem map |
| `ADOPTION_BARRIERS.md` | Adoption friction |
| `SWOT_ANALYSIS.md` | RC1-based SWOT |
| `COMPETITIVE_LANDSCAPE.md` | Category comparison |
| `GO_TO_MARKET_ASSUMPTIONS.md` | Explicit GTM assumptions |
| `MARKET_RISKS.md` | Market-side risks |

## Reading Order

1. `MARKET_ANALYSIS.md`  
2. `TARGET_MARKETS.md` → `INDUSTRY_OVERVIEW.md` → `MARKET_TRENDS.md`  
3. `CUSTOMER_SEGMENTS.md` → `IDEAL_CUSTOMER_PROFILE.md` → `BUYER_PERSONAS.md`  
4. `PAIN_POINTS.md` → `ADOPTION_BARRIERS.md`  
5. `SWOT_ANALYSIS.md` → `COMPETITIVE_LANDSCAPE.md`  
6. `GO_TO_MARKET_ASSUMPTIONS.md` → `MARKET_RISKS.md`

## Rules

- No TAM/SAM/SOM. No fabricated statistics. No competitor names.
- Compare solution categories only.
- Community remains a real evaluation path; Cloud is future vision only.
