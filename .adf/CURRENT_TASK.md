# Current Task

## Active

**Track G2 + FO review** (shipping scaffold)

## Done

- `release/GA_GATES.md` + `release/SIGNING.md`
- CI `.github/workflows/ga-gates.yml` (pytest-cov ≥55%, vitest coverage ≥35%)
- `tools/ga/check_signing_env.py`, `write_checksums.py`
- `adf-docs/FULL_OPERATION_REVIEW.md` — FO-1…FO-5 practical; FO-6 open

## Next AI / operator

1. Confirm GitHub Actions green on `main`  
2. Load signing secrets; `workflow_dispatch` with check_signing  
3. Operator checkboxes in `FULL_OPERATION_REVIEW.md`  
4. Only then bump VERSION → `1.0.0` and tag  

## Forbidden

- Declaring GA without signing  
- Starting Track I before FO operator decision  
