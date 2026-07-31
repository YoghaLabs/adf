# Full Operation Review — ADF after BUILD-021 Track L + G

**Date:** 2026-08-01  
**Reviewer role:** engineering SSOT (for operator Quadran)  
**Charter:** `adf-docs/OPERABILITY_ROADMAP.md` (**LOCKED**)  
**Commit context:** post durable sessions + version align + GA gate scaffold  

This is an **honest FO review**, not a marketing claim. FO is **not declared** until
the operator accepts this review and remaining FO-6 hard gates close.

---

## Verdict

| Verdict | Meaning |
|---------|---------|
| **FO candidate (control center)** | CLI + live Studio bridge + durable sessions are real enough for daily **operator** use |
| **Not GA `1.0.0` yet** | Signing secrets + GA tag procedure + coverage CI green on GitHub still required |
| **Not IDE-complete** | Collab / Orchestration / Enterprise UI remain presentation fixtures (ADR-011) |

**Recommendation:** Accept **FO-1…FO-5 as practically met for control-center scope**, keep **FO-6 open** until `release/GA_GATES.md` hard gates pass on `main` and signing secrets exist. Tag GA only then.

---

## FO criteria scorecard

| # | Criterion | Status | Evidence | Gaps |
|---|-----------|--------|----------|------|
| FO-1 | Install → doctor → init | ✅ | `./install`, Quick Start, CLI | Clean-machine re-validation optional |
| FO-2 | Studio → live Core | ✅* | `studio_bridge` + `/adf-bridge/invoke`, TopBar Live Core | *Hybrid: unwired methods still fixture |
| FO-3 | Workspace / projects / runtime / packages live | ✅* | L2–L4 bridge methods + Packages/Marketplace writes | *Collab/Orch/Enterprise still fixtures |
| FO-4 | Session resume real context | ✅* | Durable `.adf/local/sessions/` create/resume/close/timeline | *Core `runtime.resume` still skeleton; durable store is FO path |
| FO-5 | Honest demo vs live | ✅ | Badge + Force Demo fixtures | Copy polish ongoing |
| FO-6 | GA release gates | 🟡 | G3 version align ✅; G2 CI/docs/signing scaffold ✅ | Live Authenticode/notarization secrets; CI green on GitHub; bump to `1.0.0` |

\* Within **control-center** scope defined in Product Positioning (not IDE).

---

## Track L / G delivery map

| Track item | Status |
|------------|--------|
| L1 Live bridge | ✅ |
| L2 Workspace depth | ✅ |
| L3 Runtime dashboard live | ✅ |
| L4 Package install/remove | ✅ |
| L5 Durable sessions | ✅ |
| L6 Demo honesty | ✅ (toggle + badge) |
| G1 Quick Start wizard | 🟡 (VALIDATION-002 shipped; polish optional) |
| G2 Coverage / signing / packaging | 🟡 **scaffolded** — CI + `release/GA_GATES.md` + `release/SIGNING.md` |
| G3 Version align | ✅ `1.0.0-rc1` / BUILD-021 |
| G4 Honest UX | ✅ |

---

## What “beroperasi penuh” means now (operator language)

**Ya, untuk sehari-hari sebagai control center + CLI:**

1. Install / doctor / init via CLI  
2. Studio connected to Live Core for workspace, runtime, packages, sessions  
3. Sessions survive restart (disk under `.adf/local/sessions/`)  
4. Demo vs Live is labeled  

**Belum, untuk GA rilis publik bertanda `1.0.0`:**

1. GitHub Actions GA workflow green on `main`  
2. Signing secrets configured + signed installers  
3. Version bump RC1 → `1.0.0` + CHANGELOG + tag  

---

## Remaining work before FO-6 / GA tag

1. Ensure `.github/workflows/ga-gates.yml` passes on GitHub (`main`)  
2. Store signing secrets; run `workflow_dispatch` with `check_signing=true`  
3. Produce signed installers per `release/SIGNING.md`  
4. Bump `VERSION` → `1.0.0`, update CHANGELOG, tag `v1.0.0`  
5. Operator sign-off line below  

---

## Operator decision

- [ ] **Accept FO (control-center)** — daily operate on Live Core; GA tag still gated by FO-6  
- [ ] **Defer FO** — list blockers: _______________________  
- [ ] **Waive FO-6 partially** — document ADR: _______________________  

Signed: _______________ Date: _______________
