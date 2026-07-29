# CLI Guide

## Entry

```bash
cd adf-core
python adf.py version
python adf.py doctor --root ..
python adf.py boot --root ..
python adf.py status --root ..
python adf.py context --root .. --pack quick
python adf.py resume --root ..
```

## Commands

| Command | Purpose |
|---------|---------|
| `version` | Package version |
| `doctor` | Layout + SSOT + plugin validation |
| `boot` | Boot + load enabled plugins |
| `status` | State snapshot + plugin list |
| `context` | Assemble context pack |
| `resume` | Resume skeleton |
| `plugins list\|info\|enable\|disable` | Plugin management skeleton |

BUILD-005 provides a skeleton — not every future CLI feature.

## Related

- `RUNTIME_ENGINE.md`
- `prompts/cli.md`
