# Metrics System

**SSOT for Studio runtime metrics presentation.** BUILD-016.

## Counters

Token Budget · Prompt Count · Context Size · Memory Usage · Plugin Count ·
Package Count · Knowledge Count · Execution Time · Queue Size

## Aggregation

Metrics arrive **pre-aggregated** from `MetricsClient`. Studio does not compute
budgets or invent counters.
