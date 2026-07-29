# Risk Register

Known risks to ADF’s architecture, documentation, and multi-agent continuity.

**Why:** unnamed risks become silent failures. AIs should mitigate these explicitly.

## Architecture Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Pressure to add top-level folders | Breaks lock & indexes | ADR-001 + Architecture Review |
| “Temporary” parallel SSOT outside `.adf` | Split brain | AI_CONTRACT SSOT rule |
| Implementing features in wrong module | Dependency inversion | DEPENDENCY_GRAPH + MODULE_INDEX |

## Documentation Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Placeholders / empty docs | False completeness | No-placeholder rule |
| Docs contradict `.adf` | Operator confusion | Prefer SSOT; patch docs |
| Unindexed new files | Undiscoverable knowledge | FILE_INDEX + KNOWLEDGE_INDEX updates |

## AI Drift Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Skipping boot | Wrong BUILD / illegal edits | AI_BOOT mandatory |
| Ignoring ADRs | Redesign by accident | ADR required for architecture changes |
| Auto-starting next BUILD | Scope explosion | Stop rules + BUILD_STATUS |

## Token Consumption Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Loading FULL_CONTEXT + all docs always | Cost/noise | TOKEN_BUDGET + CONTEXT_GRAPH tiers |
| Pasting entire git history into chat | Wasted context | Use BUILD_HISTORY / CHANGE_HISTORY summaries |

## Maintenance Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Stale PROJECT_STATE / VERSION | Wrong resume | Sync rules on every BUILD |
| ADR index not updated | Lost decisions | ADR_INDEX checklist |
| Review gates skipped | Compounded debt | bootstrap REVIEW packs |

## Open Watch Items

- BUILD-004 must consume Knowledge Layer rather than re-deriving rationale from chat
- Until automated validation exists, audits remain manual (`prompts/audit.md` / `review.md`)

## Related

- `DECISION_LOG.md`
- `ARCHITECTURE_RULES.md`
- `adf-docs/BEST_PRACTICES.md`
