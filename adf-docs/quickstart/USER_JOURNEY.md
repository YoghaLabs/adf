# User Journey

## Objective

Document what a first-time user sees, clicks, expects, and how they recover.

## Journey A — CLI first run

| Step | User sees / does | Expected result | Errors | Recovery |
|------|------------------|-----------------|--------|----------|
| 1 | Clone repo in terminal | Files on disk | Auth/network | Fix Git access |
| 2 | Run `./install` or `.\install.ps1` | Deps installed; next steps printed | Missing Python/Node | Install tools; rerun |
| 3 | `python -m adf doctor --root .` | JSON health | Wrong root | Pass correct `--root` |
| 4 | `python -m adf boot --root .` | Boot OK | Service errors | Read error JSON; retry |
| 5 | `python -m adf studio` | Studio instructions / Vite starts | npm missing | Install Node; `cd adf-studio && npm run dev` |
| 6 | Browser opens Studio | Dashboard | Blank | Restart Vite; check console |
| 7 | Sidebar → Workspace | Workspace page | — | Return to Dashboard |
| 8 | `adf init demo` + Projects view | Project exists / visible conceptually | Collisions | New name |

## Journey B — Studio screens (click path)

| Click | Sees | Expected | If broken |
|-------|------|----------|-----------|
| Dashboard | Overview cards | Home orientation | Refresh |
| Workspace | Workspace context | Selector works | Use default `ws-adf` |
| Projects | Project explorer | List/fixtures | Create via CLI |
| Runtime | Runtime panels | Monitor UI | Boot CLI runtime |
| Visual | Graph hub | At least one graph route | Open `/visual/knowledge` etc. |
| Marketplace | Package UI | Browse UI loads | Check registry docs |
| Enterprise | Governance UI | Foundations visible | Remember SSO limits |
| Settings | Preferences | Saves locally | Reset browser storage |
| Help | Help page | Links/orientation | Open Quick Start docs |

## Journey C — Target GA wizard (not fully shipped)

Intended flow for GA gate:

1. Welcome to ADF  
2. Choices: Create Workspace / Open Existing / Learn ADF / **Demo Project**  
3. Demo Project auto-creates sample  
4. Studio focuses Runtime + Visual + Marketplace  
5. User explores features in ~5 minutes  

**RC1 status:** Documented as product requirement candidate; implement before GA.

## Success definition

A developer with no prior ADF knowledge can install, launch Studio, understand what
ADF is (framework/control center), and create a first project using only Quick Start
docs.
