# BUILD-021 — Live Control Center (handoff)

**SSOT for next AI.** Operator locked Full Operation roadmap. Continue here.

## Locked path (do not renegotiate unless operator says so)

```text
RC1 → Track G (GA) + Track L (Live Control Center) → FO done
     → Track I / E / C / A = expansion only
```

Authoritative: `adf-docs/OPERABILITY_ROADMAP.md` (**Status: LOCKED**).

**Full Operation = FO-1…FO-6** in that doc. Minimum engineering for FO = **finish Track L**.

## What shipped (BUILD-021 L1–L3 / L5–L6)

| Piece | Path |
|-------|------|
| Python dispatcher (expanded) | `adf-core/adf/studio_bridge.py` |
| Vite bridge plugin | `adf-studio/vite.bridgePlugin.ts` |
| Studio transport + Demo force | `bridge.ts`, `bridgeMode.ts` |
| Probe on shell mount | `ApplicationShell.tsx` |
| Live/Demo badge | `TopBar.tsx` |
| Demo fixtures toggle | Settings → Force Demo fixtures |
| Bootstrap | `bootstrap/BUILD-021/` |

### Live method groups

- Runtime: status/version/doctor/resume + dashboard/metrics/logs/diagnostics/timeline  
- Workspace/projects/activity/search  
- Sessions list/current/resume/timeline (from Core resume skeleton)  
- Packages listInstalled, generator.types, registry.status, release.channels  

### How next AI continues

1. Verify Live Core on Dashboard + `/runtime` + `/workspace`  
2. **L4** marketplace/packages write (install/remove) with confirmations  
3. **L5+** durable `.adf` session store  
4. Track G GA gates  
5. Keep Collab/Orchestration/Enterprise on fixtures (ADR-011) until dedicated builds  

## Architecture constraints (frozen)

- No new top-level platforms (ADR-018)
- Studio = control center, not IDE
- UI → SDK → Service Layer → Core only
- No autonomous production execution

## VPS

- Path `/home/aplikasi/adf`, service `adf-studio.service`, Tailscale `http://100.64.209.99:1420/`
- After pull: restart service; set `Environment=ADF_PYTHON=.../.venv/bin/python` if bridge stays on fixtures
