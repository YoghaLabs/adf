# Product Lifecycle

## Objective

Define standard lifecycle stages for ADF releases.

## Background

ADF uses cumulative builds and explicit release candidates. External audiences need
a shared vocabulary for maturity.

## Current Situation

ADF is at **Release Candidate** (`1.0.0-rc1`). Prior builds progressed through
foundation and alpha-style accumulation; GA is the next quality gate for the 1.0.0 line.

## Analysis

Without lifecycle definitions, RC1 is misread as either unfinished experiment or full
GA. Clear stages protect trust with enterprise and government buyers.

## Strategy

| Stage | Meaning |
|-------|---------|
| **Alpha** | Early capability exploration; APIs and UX may change; not for production reliance |
| **Beta** | Broader evaluation; core flows exist; breaking changes still possible |
| **Release Candidate (RC)** | Feature-complete for the declared scope; architecture freeze for the line; remaining work is quality, packaging, and gate closure |
| **General Availability (GA)** | Supported release for intended production use under applicable license/edition terms |
| **LTS** | Designated long-term support line with extended maintenance policy (declared per line when applicable) |
| **Maintenance** | Security and critical fixes; limited feature intake |
| **End of Support (EOS)** | No further fixes or support; migration guidance applies |

### ADF 1.0 line (factual)

- Cumulative BUILD-001…020 → **RC1**
- **GA `1.0.0`** = signing/coverage and related release gates (not a new platform BUILD)
- LTS / Maintenance / EOS policies for 1.x to be declared when GA policy is finalized

## Recommendations

1. Label all external downloads/docs with lifecycle stage.
2. Do not call RC1 “GA.”
3. Declare LTS only with written support terms.

## Implementation Plan

Release and Operations phases publish stage badges and support windows when editions commercialize.

## Deliverables

Lifecycle vocabulary for release notes and enterprise questionnaires.

## Risks

| Risk | Mitigation |
|------|------------|
| RC marketed as GA | Explicit stage table |

## Success Metrics

Buyers correctly identify current stage from documentation header.

## Next Actions

See packaging and licensing strategy for how stages meet editions.
