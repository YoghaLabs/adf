# CLI Guide

## Entry

```bash
cd adf-core
python -m adf version
python -m adf doctor --root ..
python -m adf search demo --root ..
python -m adf install demo-template --root ..
python -m adf list --installed --root ..
python -m adf verify --root ..
```

CLI talks to the **Service Layer only** (never engines directly). Responses use
`ServiceResult` envelopes: `{ "ok": true, "data": { ... } }`.

## Commands

| Command | Purpose |
|---------|---------|
| `version` | Package version |
| `doctor` | Layout + SSOT + plugin/template/package checks |
| `boot` / `status` / `context` / `resume` | Runtime helpers |
| `plugins …` | Plugin management |
| `init` / `new` / `generate` / `dry-run` / `validate` | Project generator |
| `install` / `remove` / `update` | APM package lifecycle |
| `search` / `list` | Registry discovery (`list --installed`) |
| `verify` | Lockfile / install verification |
| `cache stats\|clear` | APM cache |

Default generator template: `generic`  
Local package registry: `release/apm-registry/`

## Related

- `SERVICE_LAYER.md`
- `PUBLIC_API.md`
