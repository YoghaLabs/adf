# Getting Started

**Product:** ADF `1.0.0-rc1`  
**Fast path:** [`quickstart/README.md`](quickstart/README.md)

## Prerequisites

- Git
- Python 3.11+ (CLI / `adf-core`)
- Node.js 20+ and npm (Studio)
- Access to this repository (`develop` recommended)

## Clone & Install

```bash
git clone https://github.com/YoghaLabs/adf.git
cd adf
./install          # Windows: .\install.ps1
python -m adf doctor --root .
python -m adf studio
```

## First-time humans

1. Start with **`adf-docs/quickstart/`** (installation → first run → Studio)
2. Skim root `README.md` and `WHAT_IS_ADF.md` if you want product context
3. Examples: `adf-examples/hello-adf/`, `minimal-project/`, `enterprise-demo/`

## AI agents

Follow `.adf/AI_BOOT.md` before editing. Do not skip the contract.

## Typical next actions

| Goal | Start here |
|------|------------|
| Quick Start | `adf-docs/quickstart/README.md` |
| Understand product | `WHAT_IS_ADF.md` |
| Structure | `ARCHITECTURE.md` |
| Plan | `ROADMAP.md` |
| Resume work | `.adf/RESUME_ME.md` / `prompts/resume.md` |

## What you can do on RC1

- Run CLI (`doctor`, `boot`, `init`, `studio`, packages, …)
- Launch ADF Studio Control Center
- Explore collaboration, orchestration (planning), enterprise foundations in Studio
- Use examples under `adf-examples/`

## What not to expect yet

- Welcome / Demo Project wizard (GA target — see Quick Start validation report)
- Cloud Edition
- Unsupervised multi-agent execution
- Live production IdP SSO wiring

## Contribution

See root `CONTRIBUTING.md` and `.adf/AI_CONTRACT.md`.
