# BUILD-021 Acceptance

## L1 — Live bridge (this slice)

- [x] `adf-core/adf/studio_bridge.py` dispatches live methods via `SDKClient`
- [x] Vite middleware `POST /adf-bridge/invoke` (`vite.bridgePlugin.ts`)
- [x] `bridge.ts` tries live then falls back to fixtures (Vitest stays fixture)
- [x] TopBar badge `Live Core` / `Demo fixtures`
- [x] Charter + handoff SSOT updated
- [ ] Manual: open Studio, trigger Dashboard/Runtime load, badge → **Live Core**
- [ ] Manual VPS: same with `ADF_PYTHON=/home/aplikasi/adf/.venv/bin/python`

## Live methods (L1)

`runtime.status|version|doctor|resume`, `workspace.describe|readiness|list|profile`,
`projects.info|list|explorer`, `packages.listInstalled`, `generator.types`,
`registry.status`, `release.channels`

## Remaining for Full Operation (next AI)

| Slice | FO | Work |
|-------|----|------|
| L2 | FO-3 | Expand live workspace/projects/activity beyond single-root synthesize |
| L3 | FO-3 | Runtime dashboard panels use live doctor/metrics (not feature fixtures only) |
| L4 | FO-3 | Packages/marketplace install read-write paths |
| L5 | FO-4 | Real session list/resume UI (beyond `runtime.resume` skeleton) |
| L6 | FO-5 | Demo Project = seeded real sample or explicit Demo Mode switch |
| G* | FO-6 | GA signing/coverage/version align |

## Stop rule

Do not start BUILD-022 / Track I until L1 manual acceptance is checked and operator advances.
