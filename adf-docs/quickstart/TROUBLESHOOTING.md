# Troubleshooting

## Installation

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `No module named adf` | Package not installed | `./install` or `pip install -e ./adf-core` |
| Wrong Python | Multiple interpreters | Use `py -3.11` / `python3` consistently |
| `npm ERR!` | Node too old / network | Node 20+; retry `npm install` |

## CLI

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `the following arguments are required: command` | Ran `adf` with no subcommand | Use `python -m adf -h` |
| Doctor looks at wrong tree | CWD not repo | Pass `--root` to the clone root |
| Version ≠ `1.0.0-rc1` | Package metadata lag | Trust root `VERSION` for product identity |
| JSON-only output surprises humans | Design | Pipe through a viewer or read `ok` field |

## Studio

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Port 5173 busy | Another Vite app | Stop it or configure Vite port |
| UI loads, data empty | Fixture/bridge mode | Run `adf boot`; check browser console |
| `adf studio` cannot start npm | Node missing / wrong cwd | Install Node; run from repo with `adf-studio/` |

## Conceptual

| Symptom | Fix |
|---------|-----|
| “Where is the IDE?” | Studio is a control center, not an IDE |
| “Where is Cloud?” | Cloud Edition is future vision |
| “Autonomous agents?” | Out of RC1 — planning orchestration only |

## Still stuck

1. Re-read `FIRST_RUN.md`  
2. Run `python -m adf doctor --root .`  
3. Check `FAQ.md`  
4. Review `PRODUCT_VALIDATION_REPORT.md` known issues  
