# BUILD-021 Acceptance

## L1 — Live bridge

- [x] `adf-core/adf/studio_bridge.py` dispatches live methods via `SDKClient`
- [x] Vite middleware `POST /adf-bridge/invoke` (`vite.bridgePlugin.ts`)
- [x] `bridge.ts` tries live then falls back to fixtures (Vitest stays fixture)
- [x] TopBar badge `Live Core` / `Demo fixtures`
- [x] Charter + handoff SSOT updated
- [x] Shell probes `runtime.version` on mount
- [ ] Operator visual confirm on VPS TopBar → **Live Core**

## L2 — Workspace / projects depth

- [x] Live `workspace.settings|stats|activity|favorites|search|switch`
- [x] Live `projects.tree|favorites|pinned|archived|recent`
- [x] Live `activity.feed|recent`

## L3 — Runtime dashboard live

- [x] Live `runtimeDashboard.overview|jobs|events|inspectors`
- [x] Live `metrics.snapshot|series`, `logs.list|filter`, `diagnostics.snapshot`
- [x] Live `timeline.list|byKind`

## L5 — Sessions (partial)

- [x] Live `sessions.list|current|recent|history|resume|close|timeline` from Core resume skeleton
- [ ] Persist durable multi-session history under `.adf/` (BUILD-022+)

## L6 — Demo honesty

- [x] Settings **Force Demo fixtures** toggle (`settings-demo-fixtures`)
- [x] TopBar badge reflects transport

## Remaining for Full Operation

| Slice | FO | Work |
|-------|----|------|
| L4 | FO-3 | Packages/marketplace write paths (install/remove) |
| L5+ | FO-4 | Durable session store beyond resume skeleton |
| G* | FO-6 | GA signing/coverage/version align |

## Stop rule

Do not start Track I (Interactive IDE-like) until FO-2…FO-5 accepted. BUILD-022 may continue L4/L5+ only.
