# GA Gates — ADF `1.0.0`

**Status:** Track G2 scaffolded (BUILD-021 era)  
**Product identity:** root `VERSION` = `1.0.0-rc1` until GA tag  
**Related:** `adf-docs/OPERABILITY_ROADMAP.md` (FO-6), `adf-docs/quickstart/GA_QUICKSTART_GATE.md`

GA is a **release quality gate**, not a new platform BUILD. Do not tag `1.0.0`
until every hard gate below is ✅.

---

## Hard gates (block GA tag)

| ID | Gate | Evidence |
|----|------|----------|
| G-QS | Quick Start first-run | `adf-docs/quickstart/GA_QUICKSTART_GATE.md` |
| G-COV | Coverage floors in CI | `.github/workflows/ga-gates.yml` + reports |
| G-TEST | Core pytest + Studio Vitest green on `main` | CI |
| G-VER | Version identity aligned | `VERSION` = Core = Studio = `1.0.0` at tag time |
| G-SIGN | Installer / artifact signing | `release/SIGNING.md` + secrets present |
| G-SEC | Secret scan + `npm audit` / dependency review | checklist below |

## Soft gates (should pass; may waive with written ADR)

| ID | Gate | Notes |
|----|------|-------|
| G-FO | Full Operation FO-1…FO-5 | Prefer FO declared before GA; FO-6 = this file |
| G-DOC | RELEASE_NOTES + CHANGELOG for `1.0.0` | Required before tag anyway |

---

## Coverage floors (G-COV)

| Surface | Tool | Floor (GA) | Mode today |
|---------|------|------------|------------|
| `adf-core` | pytest-cov | **lines ≥ 55%** | Enforced in CI on `main` / PRs |
| `adf-studio` | Vitest v8 coverage | **lines ≥ 35%** | Enforced in CI on `main` / PRs |

Raise floors only by PR that updates this table + workflow.

Local:

```bash
# Core
cd adf-core
python -m pip install pytest pytest-cov
python -m pytest --cov=. --cov-report=term-missing --cov-fail-under=55

# Studio
cd adf-studio
npm run test:coverage
```

## Signing (G-SIGN)

See `release/SIGNING.md`.

Preflight (no secrets → exit 1):

```bash
python tools/ga/check_signing_env.py
```

## CI

Workflow: `.github/workflows/ga-gates.yml`

- Pull requests + pushes to `develop` / `main`: test + coverage floors  
- Manual / tag `v1.0.0*`: also run signing env preflight (secrets optional until GA)

## Tag procedure

1. FO review accepted (`adf-docs/FULL_OPERATION_REVIEW.md`) or explicit waive  
2. All hard gates ✅ on `main`  
3. Bump root `VERSION` → `1.0.0`, CHANGELOG, Core/Studio strings  
4. `git tag -a v1.0.0 -m "ADF 1.0.0 GA"`  
5. Build signed installers per `release/SIGNING.md`  
6. Publish artifacts + update marketplace/website  
