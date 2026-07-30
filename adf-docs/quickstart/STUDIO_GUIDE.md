# Studio Guide

## Objective

Document ADF Studio screens for first-time navigation.

## Launch

```bash
python -m adf studio
# equivalent: cd adf-studio && npm run dev
```

Studio is the **Control Center** (presentation layer). Business logic remains in
services / Core — do not expect Studio to be an IDE.

## Navigation map

| Screen | Path | Purpose |
|--------|------|---------|
| Dashboard | `/` | Overview / home |
| Workspace | `/workspace` | Workspace context |
| Projects | `/projects` | Project explorer |
| Sessions | `/sessions` | Session management |
| Collaboration | `/collaboration` | AI/human collaboration |
| Orchestration | `/orchestration` | Planning / workflow (not autonomy) |
| Enterprise | `/enterprise` | Governance foundations |
| Visual | `/visual` (+ graph routes) | Graphs / visual intelligence |
| Runtime | `/runtime` | Runtime monitor |
| Marketplace | `/marketplace` | Packages / registry views |
| Knowledge | `/knowledge` | Knowledge surfaces |
| Packages | `/packages` | Package views |
| Templates | `/templates` | Template gallery |
| Search | `/search` | Search platform |
| Release | `/release` | Release views |
| Settings | `/settings` | Studio settings |
| Help | `/help` | In-app help |

## What to click first

1. **Dashboard** — orient  
2. **Workspace** — confirm context  
3. **Projects** — see projects  
4. **Runtime** — observe runtime panels  
5. **Visual** — open a graph view  
6. **Marketplace** — browse package UI  
7. **Enterprise** — governance UI (foundations; not full production IdP)  

## Expected result

Each sidebar route renders a page. Some data may be fixture-backed in local dev.

## Limits (RC1 honesty)

- Orchestration = planning/control posture, not unsupervised multi-agent execution  
- Enterprise SSO live IdP wiring is out of RC1  
- Welcome wizard (Demo Project in 5 minutes) is a **GA target**, not fully shipped  

## Errors

| Issue | Recovery |
|-------|----------|
| Blank page | Check Vite console; restart `npm run dev` |
| SDK bridge errors | Confirm `adf boot` / service availability; see Troubleshooting |
