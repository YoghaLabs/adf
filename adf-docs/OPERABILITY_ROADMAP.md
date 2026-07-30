# ADF Operability Roadmap — RC1 → Full Operation

**Status:** Draft program charter (operator review)  
**Version context:** `1.0.0-rc1` (BUILD-020 complete)  
**Does not open BUILD-021** until this charter (or a successor) is explicitly approved.

---

## 1. What “beroperasi penuh” means

**Full Operation (FO)** = an operator can run the **real** ADF lifecycle every day
**without depending on Studio fixture/demo data**, and without pretending Studio is an IDE.

### FO Definition of Done (minimum)

| # | Criterion | Evidence |
|---|-----------|----------|
| FO-1 | Install → health → project create works on a clean machine | `./install`, `adf doctor`, `adf init` |
| FO-2 | Studio talks to **live** Core/Service Layer (not fixtures-only) | `bridge.ts` → real SDK/services |
| FO-3 | Workspace / Projects / Sessions / Runtime / Packages show **live** state | UI matches CLI for same root |
| FO-4 | Session **resume** restores real context (not skeleton-only) | `adf resume` + Studio session views |
| FO-5 | First-run path is honest: demo mode labeled when fixtures remain | Welcome wizard + clear “demo/live” badge |
| FO-6 | GA release gates closed | signing, coverage, Quick Start gate |

Anything beyond FO-1…FO-6 (rich editor, VS Code extension, cloud multi-tenant, autonomous AI review)
is **expansion**, not required for “beroperasi penuh” as a **control-center framework**.

### Out of scope for minimum FO

- Replacing Cursor/VS Code as primary coding UI  
- Cloud multi-tenant SaaS  
- Full enterprise IdP/SSO production  
- Autonomous orchestration execution  

Those remain later tracks (see §4).

---

## 2. Where we are (RC1 honesty)

| Surface | Daily use today |
|---------|-----------------|
| CLI + Core + `.adf` SSOT | **Operable** for bootstrap, doctor, packages, plugins, generate |
| Docs / install / Quick Start | **Operable** for evaluation |
| Studio shell + onboarding | **Navigable**; panels largely **fixture-backed** |
| Collaboration / Orchestration / Enterprise UI | **Presentation models** (ADR-011) — not production runtimes |

**Verdict:** RC1 can operate **CLI-first**. It is **not** Full Operation until FO-2…FO-5 land.

---

## 3. Path to Full Operation (recommended sequence)

```text
RC1 (now)
  → Track G: GA 1.0.0
  → Track L: Live Control Center   ← minimum “beroperasi penuh”
  → Track I: Interactive Workspace (optional product expansion)
  → Track E: Ecosystem connectors
  → Track C: Cloud & enterprise scale
  → Track A: AI engineering depth
```

### Track G — GA `1.0.0` (no new BUILD platform)

**Goal:** Shipable release quality on the RC1 architecture.  
**Charter:** already implied by `BUILD_STATUS` / `ROADMAP.md` / `GA_QUICKSTART_GATE.md`.

| Work | Outcome |
|------|---------|
| G1 | Close Quick Start GA gate (wizard + first-run polish) |
| G2 | Coverage / signing / release packaging gates |
| G3 | Version metadata aligned (`VERSION` ↔ package metadata) |
| G4 | Honest UX copy: fixture vs live everywhere |

**Exit:** tag `1.0.0` GA. Still may be CLI-primary if Track L is incomplete — prefer **GA + Live bridge** in the same release train if capacity allows.

### Track L — Live Control Center (minimum Full Operation)

**Goal:** Studio becomes a **real** control center over Core.  
**Requires:** operator-approved program charter → then BUILD numbers (proposed below as **Program FO / BUILD-021+ draft**).

| Slice | Focus | FO maps |
|-------|--------|---------|
| L1 | Live SDK bridge (retire default fixture provider) | FO-2 |
| L2 | Live Workspace / Projects / Activity | FO-3 |
| L3 | Live Runtime / doctor / boot / status surfaces | FO-3 |
| L4 | Live Packages / registry list-install (read path first) | FO-3 |
| L5 | Real session resume + timeline | FO-4 |
| L6 | Demo Project = optional seeded **real** sample (or explicit Demo Mode) | FO-5 |

**Exit:** FO-1…FO-6 met → declare **Full Operation (Control Center)**.

> Positioning stays: Studio = control center, **not** IDE (see Product Positioning).

### Track I — Interactive Development Platform (expansion)

Maps to operator sketch “Phase 4 (BUILD-021–030)” content — **after** Track L, or only if FO is redefined to require IDE-like workflow.

| Theme | Notes |
|-------|--------|
| Interactive AI Workspace | New product surface; needs ADR (conflicts with “not an IDE” if overclaimed) |
| Live Context Engine (UI-deep) | Builds on Core context; expose in Studio safely |
| AI-assisted coding workflow | Secondary identity — do not overtake framework positioning |
| Rich editor integration | Prefer embed/link to external editors over building a full IDE |
| Advanced session management | Extends L5 |
| Intelligent project navigation | Extends L2 |
| Productivity enhancements | Only after live data is trustworthy |

### Track E — Ecosystem Expansion

Maps to “Phase 5 (BUILD-031–040)”.

VS Code / Cursor / JetBrains extensions, GitHub / GitLab / CI connectors, enterprise connectors.  
**Start when:** Track L stable and at least one external channel has a clear user.

### Track C — Cloud & Enterprise Scale

Maps to “Phase 6 (BUILD-041–050)”.

Team hub, cloud workspace, multi-tenant, analytics, AI ops dashboard.  
**Start when:** on-prem/control-center FO is proven and there is a paying enterprise path.

### Track A — AI Engineering Platform depth

Maps to “Phase 7 (BUILD-051–060)”.

Planning assistant, architecture assistant, doc generation, advanced KG, AI review, governance automation.  
**Start when:** Track L (+ optional I) give trustworthy project context; governance remains human-gated (no autonomous production execution by default).

---

## 4. Proposed BUILD numbering (draft only)

Do **not** implement until operator says **approve FO charter**.

| Builds (draft) | Track | Intent |
|----------------|-------|--------|
| BUILD-021 … 026 | L | Live Control Center → Full Operation |
| BUILD-027 … 030 | I (early) | Session depth + navigation productivity (still control-center) |
| BUILD-031 … 040 | E | Ecosystem |
| BUILD-041 … 050 | C | Cloud & scale |
| BUILD-051 … 060 | A | AI engineering depth |

If Interactive AI Workspace / rich editor is deferred, compress I into fewer builds after L.

---

## 5. Decision checklist (for Quadran)

1. **Approve FO definition** in §1 as the meaning of “beroperasi penuh”?  
2. **Sequence:** G → L → (I) → E → C → A — accept?  
3. **GA strategy:** GA tag before L completes, or **GA only after L1–L3** minimum?  
4. **Interactive editor track:** in-scope for FO, or strictly post-FO expansion?  
5. When ready: explicit prompt **“approve OPERABILITY_ROADMAP → open BUILD-021”**.

---

## 6. Related SSOT

- `ROADMAP.md` — locked BUILD-001…020  
- `.adf/BUILD_STATUS.md` — BUILD-021+ not opened  
- `adf-docs/quickstart/GA_QUICKSTART_GATE.md`  
- `business/ADF-v1.0/01-Product/PRODUCT_POSITIONING.md`  
- `adf-docs/STUDIO_ARCHITECTURE.md`  

---

## Continuity

Until approval: continue GA prep and product validation; **do not** invent BUILD-021 workstreams from this draft alone.
