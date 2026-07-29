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
| `doctor` | Locked layout + SSOT checks |
| `boot` | Minimal boot + open session |
| `status` | State snapshot |
| `context` | Assemble context pack (file list summary) |
| `resume` | Resume skeleton (state + latest checkpoint) |

BUILD-005 provides a skeleton — not every future CLI feature.

## Related

- `RUNTIME_ENGINE.md`
- `prompts/cli.md`
