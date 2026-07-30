# CLI Guide (Quick Start)

## Objective

Use the ADF CLI for first-run and everyday discovery.

## Entry

Preferred:

```bash
python -m adf --help
python -m adf <command> --help
```

After `./install` / editable install, some environments also expose `adf` on PATH.
If not, keep using `python -m adf` from an environment where `adf-core` is installed.

Always pass `--root` when auto-detection fails:

```bash
python -m adf doctor --root /path/to/adf
```

## First-run commands

| Command | Purpose | Status in RC1 |
|---------|---------|---------------|
| `adf --help` / `python -m adf -h` | List commands | Available |
| `adf version` | Show package version JSON | Available |
| `adf doctor` | Health / layout checks | Available |
| `adf boot` | Boot services + runtime | Available |
| `adf status` | Project status | Available |
| `adf context` | Assemble context pack | Available |
| `adf resume` | Resume protocol skeleton | Available |
| `adf init <name>` | Create project | Available |
| `adf studio` | Open Studio (helper) | Available (VALIDATION-001) |

## Also available

Generator: `new`, `generate`, `dry-run`, `validate`  
Packages: `install`, `remove`, `update`, `search`, `list`, `verify`, `cache`  
Distribution: `release`, `package`, `bundle`, `publish`, `registry`, `sync`  
Plugins: `plugins list|info|enable|disable`

## Responses

CLI prints **JSON** `ServiceResult` envelopes (`ok`, `data`, …). This is intentional
for automation and AI agents.

## Architecture rule

CLI talks to the **Service Layer only** — never engines directly.

## Related

- `COMMON_COMMANDS.md`
- `adf-docs/CLI_GUIDE.md` (broader reference)
