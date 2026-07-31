# ADF Operability Roadmap — RC1 → Full Operation

**Status:** LOCKED (operator-approved 2026-07-31)  
**Version context:** `1.0.0-rc1` (BUILD-020) → **BUILD-021 opened** (Track L start)  
**Owner:** Quadran  

This document is the **SSOT** for the path to Full Operation. Do not invent alternate
phase numbering that conflicts with Track G/L/I/E/C/A below.

---

## 1. What “beroperasi penuh” means (LOCKED)

**Full Operation (FO)** = run the real ADF lifecycle daily **without depending on
Studio fixture/demo data as the source of truth**, while Studio remains a
**control center** (not an IDE).

### FO Definition of Done

| # | Criterion | Evidence | Status |
|---|-----------|----------|--------|
| FO-1 | Install → health → project create on clean machine | `./install`, `adf doctor`, `adf init` | ✅ |
| FO-2 | Studio talks to live Core/Service Layer | `bridge.ts` → `adf.studio_bridge` | ✅ hybrid fallback for unwired surfaces |
| FO-3 | Workspace / Projects / Sessions / Runtime / Packages live | UI matches CLI for same root | ✅ control-center scope (*not* Collab/Orch/Ent) |
| FO-4 | Session resume restores real context | durable `.adf/local/sessions/` + Studio | ✅ durable store; Core resume skeleton secondary |
| FO-5 | Honest demo vs live labeling | TopBar badge + Demo Mode | ✅ |
| FO-6 | GA release gates closed | signing, coverage, Quick Start | 🟡 G2 scaffolded — see `release/GA_GATES.md` + FO review |

**FO exit:** FO-1…FO-6 all ✅.

### Out of scope for minimum FO (LOCKED)

- Replacing Cursor/VS Code as primary coding UI  
- Cloud multi-tenant SaaS  
- Full enterprise IdP/SSO production  
- Autonomous orchestration execution  

---

## 2. Where we are

| Surface | State |
|---------|--------|
| CLI + Core + `.adf` SSOT | Operable (FO-1) |
| Studio shell + onboarding | Operable navigation |
| Live bridge L1 | **Started** — hybrid live/fixture |
| Collaboration / Orchestration / Enterprise UI | Presentation-only (ADR-011) |

---

## 3. Locked sequence

```text
RC1
  → Track G: GA 1.0.0          (parallel OK)
  → Track L: Live Control Center  ← required for FO
       L1 bridge → L2 workspace → L3 runtime UI → L4 packages → L5 sessions → L6 demo honesty
  → FO DECLARED
  → Track I: Interactive Workspace (optional expansion)
  → Track E: Ecosystem
  → Track C: Cloud & enterprise scale
  → Track A: AI engineering depth
```

### Track G — GA `1.0.0`

| ID | Work | Status |
|----|------|--------|
| G1 | Quick Start GA gate polish | 🟡 wizard exists; polish optional |
| G2 | Coverage / signing / packaging | 🟡 CI + docs + signing preflight (`release/GA_GATES.md`) |
| G3 | Version metadata aligned | ✅ `1.0.0-rc1` / BUILD-021 |
| G4 | Honest UX (fixture vs live) | ✅ badge + Demo fixtures toggle |

### Track L — Live Control Center (BUILD-021…)

| ID | Work | BUILD | Status |
|----|------|-------|--------|
| L1 | Live SDK bridge + hybrid fallback + badge | **021** | ✅ |
| L2 | Live workspace/projects/activity depth | **021** | ✅ |
| L3 | Runtime dashboard live data | **021** | ✅ |
| L4 | Packages/registry live read (+ safe write) | **021** | ✅ |
| L5 | Real sessions + resume UX | **021** durable `.adf/local/sessions/` | ✅ |
| L6 | Demo Project = real sample or explicit Demo Mode | **021** toggle | ✅ |

Detail: `adf-docs/BUILD-021_LIVE_CONTROL_CENTER.md`, `bootstrap/BUILD-021/`.

### Track I / E / C / A

Unchanged intent from operator sketch (Interactive → Extensions → Cloud → AI Eng).
**Start only after FO** unless operator explicitly reprioritizes.

| Track | Draft builds | Focus |
|-------|--------------|--------|
| I | 027–030 | Interactive productivity (still not “ADF is an IDE”) |
| E | 031–040 | VS Code/Cursor/JetBrains, GitHub/GitLab/CI |
| C | 041–050 | Cloud workspace, multi-tenant, analytics |
| A | 051–060 | Planning/architecture assistants, KG depth, governance automation |

---

## 4. Decision log (LOCKED)

1. FO definition = §1 — **approved**  
2. Sequence G∥L → FO → I → E → C → A — **approved**  
3. Interactive editor is **post-FO** (Track I), not required for FO  
4. BUILD-021 opened for **L1 only**; later L slices get 022+ when L1 accepted  

---

## 5. Next AI — start here

1. `.adf/RESUME_ME.md`  
2. This file  
3. `adf-docs/BUILD-021_LIVE_CONTROL_CENTER.md`  
4. `bootstrap/BUILD-021/ACCEPTANCE.md`  
5. Finish L1 manual checks → continue L2  

---

## Related

- `ROADMAP.md` (BUILD-001…020 history)  
- `.adf/BUILD_STATUS.md`  
- `business/ADF-v1.0/01-Product/PRODUCT_POSITIONING.md`  
- `adf-docs/STUDIO_ARCHITECTURE.md`  
