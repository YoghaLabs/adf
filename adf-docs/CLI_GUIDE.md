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
python adf.py init my-app --destination .. --dry-run --root ..
python adf.py new my-app --destination .. --root ..
python adf.py generate my-app --validate-only --root ..
```

## Commands

| Command | Purpose |
|---------|---------|
| `version` | Package version |
| `doctor` | Layout + SSOT + plugin/template checks |
| `boot` | Boot + load enabled plugins |
| `status` | State snapshot + plugin list |
| `context` | Assemble context pack |
| `resume` | Resume skeleton |
| `plugins list\|info\|enable\|disable` | Plugin management skeleton |
| `init` / `new` | Generate a new ADF project |
| `generate` | Generate with optional `--validate-only` |

## Generator flags

`--destination`, `--template`, `--dry-run`, `--overwrite`, `--author`, `--project-version`, `--root`

## Related

- `RUNTIME_ENGINE.md`
- `CLI_GENERATOR.md`
- `prompts/cli.md`
