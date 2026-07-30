# Developer Guide

**ADF v1.0.0-rc1**

## Boot

1. `.adf/RESUME_ME.md` / `AI_BOOT.md`
2. Root `VERSION` + `ROADMAP.md`
3. Active bootstrap pack under `bootstrap/`

## Build locally

- Core: `adf-core` + pytest
- Studio: `adf-studio` + Vitest / Vite
- Do not invent top-level folders

## Extension points

- Plugins / templates / packages via APM
- SDK / Public API — prefer Service Layer
- Studio features must stay presentation-only

## Related

`GETTING_STARTED.md` · `SDK_GUIDE.md` · `CLI_GUIDE.md` · `PUBLIC_API.md` · `BEST_PRACTICES.md`
