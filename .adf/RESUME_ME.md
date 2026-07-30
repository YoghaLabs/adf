# Resume Me

## Identity

- Product: ADF
- Version: `1.0.0-rc1` (GA not tagged yet)
- Branch: `develop`
- Last completed platform BUILD: **BUILD-020**
- Active: **BUILD-021** Track L1 (Live bridge) — handoff mid-build
- Full Operation charter: **LOCKED** → `adf-docs/OPERABILITY_ROADMAP.md`

## Boot order for next AI

1. This file  
2. `adf-docs/OPERABILITY_ROADMAP.md` (LOCKED FO definition + tracks)  
3. `adf-docs/BUILD-021_LIVE_CONTROL_CENTER.md`  
4. `bootstrap/BUILD-021/ACCEPTANCE.md`  
5. `.adf/CURRENT_TASK.md` / `BUILD_STATUS.md`  

## Where we are

- RC1 CLI operable; Studio was fixtures-only  
- L1 hybrid live bridge **implemented** — needs manual/VPS verification  
- FO not declared until FO-2…FO-6 complete (see operability roadmap)

## Immediate next steps

1. `git pull` / confirm HEAD  
2. Run Studio; confirm TopBar **Live Core** after Dashboard load  
3. If fixtures only on VPS: set `ADF_PYTHON` to repo `.venv` python in systemd  
4. Continue L2–L6 per OPERABILITY_ROADMAP — do not start Track I until FO  

## Ship rule

On finish of each slice: commit → push `develop` → merge `main` → VPS pull  
(`.cursor/rules/finish-ship-review.mdc`)
