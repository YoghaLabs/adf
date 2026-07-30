# ADR-014 — AI Observability Architecture

## Title

AI Observability Architecture

## Status

Accepted

## Context

Operators need to understand AI execution (context, plugins, tokens, jobs, logs)
inside Studio. Owning mutable runtime state in the GUI would diverge from Core
and break the presentation-only Studio contract (ADR-011).

## Decision

1. **Runtime Dashboard is read-only.** It displays envelopes; it does not start,
   stop, or reconfigure the engine.
2. **Logs come from Services.** `LogsClient` fetches filtered log envelopes from
   the Service Layer — Studio does not tail local files as SSOT.
3. **Metrics are aggregated.** Counters/series arrive pre-aggregated via
   `MetricsClient`; Studio does not invent budgets or rollups.
4. **Studio does not own runtime state.** Session/engine truth remains in Core;
   dashboard stores hold presentation caches only.

## Consequences

- Safe observability UX without forking RuntimeEngine
- Fixtures enable UI until Core observability APIs harden
- Aligns with ADR-008 Service Layer boundary

## Alternatives Considered

| Alternative | Why rejected |
|-------------|--------------|
| Mutable controls in dashboard | Moves business logic into Studio |
| Browser-local metric math as SSOT | Diverges from Core aggregations |
| Direct engine sockets from React | Bypasses Service Layer |

## References

- `adf-docs/RUNTIME_DASHBOARD.md`
- ADR-011, ADR-013
- BUILD-016

## Future Impact

BUILD-017+ testing/audit frameworks can consume the same observability clients.
