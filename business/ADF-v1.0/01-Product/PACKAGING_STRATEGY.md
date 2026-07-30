# Packaging Strategy

## Objective

Define how ADF is packaged for distribution across editions and deployment needs.

## Background

BUILD-009…012 established package manager, SDK, marketplace/registry, and installer
foundations. Studio and Core are distinct layers. Business packaging must reflect
that architecture.

## Current Situation

RC1 includes Core, Studio, distribution tooling, templates, and release assets under
`release/`. Commercial “bundles” are strategy for Professional/Enterprise packaging;
Cloud packages are future vision.

## Analysis

Buyers need clear units: what they install, what they integrate, and what they
license. Packaging should map to architecture boundaries, not arbitrary feature cuts.

## Strategy

| Package / bundle | Role |
|------------------|------|
| **Core Package** | Runtime and engine foundation (repository-native Core) |
| **Studio** | Control-center UI over services/SDK/Core |
| **CLI** | Command-line / distribution operator surfaces |
| **SDK** | Public API integration for tools and extensions |
| **Templates** | Starter and delivery templates |
| **Marketplace Packages** | Registry-distributed packages/plugins as the ecosystem matures |
| **Enterprise Bundle** | Enterprise-oriented composition: Core + Studio + governance/ops packaging + deployment aids |
| **Offline Bundle** | Air-gapped / offline distribution set for constrained networks (Enterprise-oriented) |

Community receives the useful Core/Studio/SDK/CLI/templates baseline under Community
terms. Professional and Enterprise add commercial packaging and entitlements.
Cloud packaging remains future vision.

## Recommendations

1. Keep package names aligned with repository architecture (Core, Studio, SDK).
2. Treat Enterprise and Offline bundles as composition + process, not a silent fork.
3. Do not advertise Cloud packages as downloadable today.

## Implementation Plan

Release engineering maintains artifacts; commercial phases define entitlement to bundles.

## Deliverables

Packaging map for Sales, Operations, and Investor materials.

## Risks

| Risk | Mitigation |
|------|------------|
| Bundle implies unshipped modules | Map each bundle line to RC1 components + labeled roadmap |

## Success Metrics

Install/docs language matches this packaging vocabulary.

## Next Actions

Align with `LICENSING_STRATEGY.md`.
