# CLI Guide

## Entry

```bash
cd adf-core
python adf.py version
python adf.py doctor --root ..
python adf.py search demo --root ..
python adf.py install demo-template --root ..
python adf.py list --installed --root ..
python adf.py verify --root ..
```

## Commands

| Command | Purpose |
|---------|---------|
| `version` | Package version |
| `doctor` | Layout + SSOT + plugin/template/package checks |
| `boot` / `status` / `context` / `resume` | Runtime helpers |
| `plugins …` | Plugin management skeleton |
| `init` / `new` / `generate` / `dry-run` / `validate` | Project generator |
| `install` / `remove` / `update` | APM package lifecycle |
| `search` / `list` | Registry discovery (`list --installed`) |
| `verify` | Lockfile / install verification |
| `cache stats\|clear` | APM cache |

Default generator template: `generic`  
Local package registry: `release/apm-registry/`
