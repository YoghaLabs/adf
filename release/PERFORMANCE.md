# Performance — BUILD-020

**Version:** `1.0.0-rc1`

## Studio startup review

- Application shell loads navigation lazily per route where feature pages are route-split
- Heavy graphs (`@xyflow/react`) load on Visual routes
- Runtime / Collaboration / Orchestration / Enterprise are separate routes — avoid eager mounting all feature trees

## Lazy loading review

| Area | Expectation |
|------|-------------|
| Router pages | Route-level code split preferred for GA |
| Graph canvas | Loaded with Visual Intelligence |
| Fixture SDK | Sync local provider — acceptable for RC demos |

## Bundle optimization checklist

- [ ] Production `vite build` succeeds for Studio
- [ ] Tree-shake unused lucide icons where practical
- [ ] Avoid duplicate React copies
- [ ] Source maps optional for RC internal builds

## SDK loading review

- `studioSdk` is a singleton facade — cheap construction
- Bridge invoke is async; UI stores must not block paint on sequential waterfalls without need
- Prefer `Promise.all` for independent envelope fetches (already used in feature stores)

## Outcome

Performance principles recorded. Measurable budgets (TTI, bundle KB) are GA follow-ups.
