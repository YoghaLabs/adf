# Resume Me

## Identity

- Product: ADF
- Version: `1.0.0-rc1` (GA not tagged)
- Branch: `develop`
- Active: **BUILD-021** Track L (L1 done; L2/L3/L5/L6 expanded)
- FO charter: **LOCKED** → `adf-docs/OPERABILITY_ROADMAP.md`

## Boot order

1. This file  
2. `adf-docs/OPERABILITY_ROADMAP.md`  
3. `adf-docs/BUILD-021_LIVE_CONTROL_CENTER.md`  
4. `bootstrap/BUILD-021/ACCEPTANCE.md`  
5. `.adf/CURRENT_TASK.md`

## Immediate next

1. Review VPS Packages/Marketplace — Install/Remove `demo-core`  
2. Continue **L5+** durable sessions under `.adf/`  
3. Track G GA gates (version metadata align)  
4. Ship rule: commit → push develop → merge main → VPS pull  

## FO status snapshot

| FO | State |
|----|--------|
| FO-1 | ✅ |
| FO-2 | 🟡 live bridge hybrid |
| FO-3 | 🟡 workspace/runtime/packages read largely live |
| FO-4 | 🟡 resume skeleton exposed; not durable multi-session |
| FO-5 | 🟡 Demo fixtures toggle + badge |
| FO-6 | 🔴 GA gates |
