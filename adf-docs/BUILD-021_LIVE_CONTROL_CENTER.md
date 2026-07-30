# BUILD-021 — Live Control Center (handoff)

**SSOT for next AI.** Operator locked Full Operation roadmap. Continue here.

## Locked path (do not renegotiate unless operator says so)

```text
RC1 → Track G (GA) + Track L (Live Control Center) → FO done
     → Track I / E / C / A = expansion only
```

Authoritative: `adf-docs/OPERABILITY_ROADMAP.md` (**Status: LOCKED**).

**Full Operation = FO-1…FO-6** in that doc. Minimum engineering for FO = **finish Track L**.

## What shipped in this session (L1)

| Piece | Path |
|-------|------|
| Python dispatcher | `adf-core/adf/studio_bridge.py` |
| Vite bridge plugin | `adf-studio/vite.bridgePlugin.ts` |
| Studio transport | `adf-studio/src/sdk/bridge.ts` + `bridgeMode.ts` |
| Honest badge | `adf-studio/src/shell/TopBar.tsx` (`data-testid=bridge-mode-badge`) |
| Bootstrap | `bootstrap/BUILD-021/` |

### Invoke locally

```bash
cd /path/to/adf
# with venv active / PYTHONPATH including adf-core
python -m adf.studio_bridge '{"method":"runtime.status","payload":{}}'
# or
python -m adf.studio_bridge --root . '{"method":"workspace.list","payload":{}}'
```

Studio dev server proxies:

```text
UI → fetch POST /adf-bridge/invoke → python -m adf.studio_bridge → SDKClient → Services
```

Env overrides: `ADF_PYTHON` (path to venv python).

## How next AI continues (optimal order)

1. Read `.adf/RESUME_ME.md` + this file + `bootstrap/BUILD-021/ACCEPTANCE.md`
2. Verify L1 manually (badge Live Core on Dashboard)
3. Close remaining L1 checkboxes
4. Implement **L2–L3**: map more fixture methods; replace `runtimeFixtures` consumers with bridge methods where envelopes already exist
5. **L5** session model: persist sessions under `.adf/` or Core state — do not fake in UI
6. Keep Collaboration/Orchestration/Enterprise on fixtures until dedicated builds (presentation-only ADR-011)
7. Track G in parallel when capacity allows (signing/coverage) — does not block L

## Architecture constraints (frozen)

- No new top-level platforms (ADR-018)
- Studio = control center, not IDE
- UI → SDK → Service Layer → Core only
- No autonomous production execution

## VPS

- Path `/home/aplikasi/adf`, service `adf-studio.service`, Tailscale `http://100.64.209.99:1420/`
- After pull: restart service; set `Environment=ADF_PYTHON=.../.venv/bin/python` if bridge stays on fixtures
