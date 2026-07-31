# Installation

## Objective

Install enough of ADF to run doctor, init, and Studio on a developer machine.

## Prerequisites

| Tool | Why |
|------|-----|
| Git | Clone the repository |
| Python 3.11+ (recommended) | `adf-core` CLI (`python -m adf`) |
| Node.js 20+ and npm | ADF Studio (`adf-studio`) |

Optional: a virtual environment for Python.

## Steps

### 1. Clone

```bash
git clone https://github.com/YoghaLabs/adf.git
cd adf
git checkout develop
```

### 2. Run the installer helper

Unix / macOS / Git Bash:

```bash
chmod +x ./install
./install
```

Windows PowerShell:

```powershell
.\install.ps1
```

The helper:

- Checks Python and Node
- Installs `adf-core` in editable mode when possible
- Runs `npm install` inside `adf-studio`
- Prints the next commands (`adf doctor`, `adf studio`)

### 3. Manual fallback

If the helper is unavailable:

```bash
cd adf-core
python -m pip install -e .
cd ../adf-studio
npm install
```

### 4. Verify CLI

From repo root (or with `adf-core` on `PYTHONPATH` / editable install):

```bash
python -m adf version
python -m adf doctor --root .
```

On Windows PowerShell, from `adf-core`:

```powershell
python -m adf version
python -m adf doctor --root ..
```

### 5. Verify Studio deps

```bash
cd adf-studio
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173`).

## Expected result

- `adf version` returns JSON with `"ok": true`
- `adf doctor` returns health data without crashing
- Studio dev server starts

## Common errors

| Error | Recovery |
|-------|----------|
| `python` not found | Install Python 3.11+ and reopen the terminal |
| `npm` not found | Install Node.js 20+ |
| Module `adf` not found | Run `./install` or `pip install -e ./adf-core` |
| Doctor fails layout checks | Ensure you are in the cloned ADF repo root |

## Notes

- Root `VERSION`, Studio, and `adf-core` runtime constants report **`1.0.0-rc1`**
  (PEP 440 package metadata may use `1.0.0rc1`). Prefer root `VERSION` for product identity.
- There is no global `adf` binary required; `python -m adf` is the supported entry
  until a packaged installer ships for GA.
