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

## L4 — Packages / marketplace writes

- [x] Live `packages.list|search|install|remove|update|verify`
- [x] Live `marketplace.browse|search|featured|categories` from registry
- [x] Packages page install/remove/update/verify with confirm
- [x] Marketplace Install/Update → PackageClient (not fake notify)
- [x] Live errors not masked by fixture fallback

## L5 — Durable sessions

- [x] `SessionManager` list/create/restore/close/timeline under `.adf/local/sessions/`
- [x] Bridge sessions.* use durable store (not synthetic sess-live-001)
- [x] Studio Sessions page: New session / resume / close / timeline

## L6 — Demo honesty

- [x] Settings **Force Demo fixtures** toggle (`settings-demo-fixtures`)
- [x] TopBar badge reflects transport

## Track G (partial)

- [x] G3 version metadata aligned (`1.0.0-rc1` / BUILD-021)
- [ ] G2 coverage / signing / packaging for GA tag

## Remaining for Full Operation

| Slice | FO | Work |
|-------|----|------|
| G2 | FO-6 | Coverage / signing / packaging for GA tag |
| FO declare | FO-* | Operator review after VPS durable session check |

## Stop rule

Do not start Track I (Interactive IDE-like) until FO-2…FO-5 accepted.
