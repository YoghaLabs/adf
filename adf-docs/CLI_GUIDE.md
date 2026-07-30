# CLI Guide

## Entry

```bash
cd adf-core
python -m adf -h
python -m adf version
python -m adf doctor --root ..
python -m adf studio --root .. --print-only
python -m adf search demo --root ..
python -m adf install demo-template --root ..
python -m adf list --installed --root ..
python -m adf verify --root ..
```

First-time users: start with **`adf-docs/quickstart/`**.

CLI talks to the **Service Layer only** (never engines directly). Responses use
`ServiceResult` envelopes: `{ "ok": true, "data": { ... } }`.

## Commands

| Command | Purpose |
|---------|---------|
| `version` | Package version |
| `doctor` | Layout + SSOT + plugin/template/package checks |
| `boot` / `status` / `context` / `resume` | Runtime helpers |
| `studio` | Open Studio Control Center (or `--print-only`) |
| `plugins …` | Plugin management |
| `init` / `new` / `generate` / `dry-run` / `validate` | Project generator |
| `install` / `remove` / `update` | APM package lifecycle |
| `search` / `list` | Registry discovery (`list --installed`) |
| `verify` | Lockfile / install verification |
| `cache stats\|clear` | APM cache |

Default generator template: `generic`  
Local package registry: `release/apm-registry/`

## Related

- `adf-docs/quickstart/CLI_GUIDE.md`
- `SERVICE_LAYER.md`
- `PUBLIC_API.md`
