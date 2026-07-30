# ADF Quick Start

**Product:** ADF `1.0.0-rc1`  
**Phase:** PRODUCT VALIDATION-001  
**Audience:** First-time developers

## Purpose

Get a new developer from clone → doctor → first project → Studio in minutes —
without reading the full documentation set.

## Architecture note

Locked repository layout uses **`adf-docs/`** and **`adf-examples/`**.  
This Quick Start lives at `adf-docs/quickstart/` (not a new top-level `docs/`).  
Examples live under `adf-examples/` (not a new top-level `examples/`).

## Ideal path (target experience)

```bash
git clone https://github.com/YoghaLabs/adf.git
cd adf
./install          # Windows: .\install.ps1
adf doctor
adf init my-first-project
adf studio
```

Then Studio opens. A welcome wizard (Create Workspace / Open Existing / Learn ADF /
Demo Project) is the **GA-target experience** — see validation report.

## Reading order

1. `INSTALLATION.md` — prerequisites and install  
2. `FIRST_RUN.md` — eight-step first run  
3. `FIRST_PROJECT.md` — create your first project  
4. `CLI_GUIDE.md` + `COMMON_COMMANDS.md`  
5. `WORKSPACE_GUIDE.md` + `STUDIO_GUIDE.md`  
6. `USER_JOURNEY.md` — screen-by-screen journey  
7. `TROUBLESHOOTING.md` + `FAQ.md`  
8. `PRODUCT_VALIDATION_CHECKLIST.md` + `PRODUCT_VALIDATION_REPORT.md`  
9. `GA_QUICKSTART_GATE.md` — proposed mandatory GA criterion  
10. `VALIDATION_002_ONBOARDING.md` — In-Studio Welcome / Demo tour

## Related

- Examples: `adf-examples/hello-adf/`, `minimal-project/`, `enterprise-demo/`
- Product docs: `adf-docs/GETTING_STARTED.md`
- Legal: `/legal`
