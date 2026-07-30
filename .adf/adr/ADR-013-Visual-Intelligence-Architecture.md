# ADR-013 — Visual Intelligence Architecture

## Title

Visual Intelligence Architecture

## Status

Accepted

## Context

Users need to see relationships across workspace, projects, knowledge, packages,
and runtime. Embedding graph mutation or dependency resolution in Studio would
duplicate Core policy and break the presentation-only Studio contract (ADR-011).

## Decision

1. **Graphs are read-only.** Studio displays envelopes from SDK clients; it does
   not create, delete, or rewire domain relationships.
2. **Visualization is separated.** Graph engine (layout/filter/search/selection)
   is distinct from SDK transport and from React Flow rendering.
3. **Rendering is UI only.** `@xyflow/react` maps presentation models to pixels;
   no business rules live in node/edge components.

## Consequences

- Safe multi-graph dashboards without forking APM/knowledge logic
- Fixtures enable UI development before Core graph APIs harden
- Future Core graph services plug in via existing clients

## Alternatives Considered

| Alternative | Why rejected |
|-------------|--------------|
| Editable graph canvas | Moves business logic into Studio |
| Client-side dependency resolver | Duplicates PackageManager |
| Couples React Flow to SDK | Prevents renderer swaps / testing |

## References

- `adf-docs/VISUAL_PLATFORM.md`
- ADR-011, ADR-012
- BUILD-015

## Future Impact

BUILD-016 Runtime Monitor can reuse the same engine for live runtime graphs
without redesign.
