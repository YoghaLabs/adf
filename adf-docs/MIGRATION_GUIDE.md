# Migration Guide — to ADF v1.0.0-rc1

## From 0.x alphas

1. Update identity: root `VERSION` → `1.0.0-rc1` / BUILD-020
2. Treat public SDK/Service APIs as **stability-intent** (ADR-018)
3. Collaboration participants remain the identity model for AI
4. Orchestration remains non-autonomous
5. Enterprise governance modules are additive — no redesign required

## Theme history (roadmap overrides)

| Build | Original label | Shipped theme |
|-------|----------------|---------------|
| 017 | Testing Framework | Collaboration |
| 018 | Audit Framework | Orchestration |
| 019 | Release Candidate | Enterprise Governance |
| 020 | Production v1.0 | Release Candidate (this build) |

## Breaking changes

None intended for presentation fixtures. Confirm Service Layer method names before GA automation.
