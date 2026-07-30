# First Run

## Objective

Complete the first-run path for ADF `1.0.0-rc1`.

## Eight steps

### Step 1 — Clone repository

```bash
git clone https://github.com/YoghaLabs/adf.git
cd adf
```

**Expected:** Repository present with `adf-core/`, `adf-studio/`, `.adf/`.

### Step 2 — Install dependencies

```bash
./install
# Windows: .\install.ps1
```

**Expected:** Python package and Studio `node_modules` ready.

### Step 3 — Run doctor

```bash
python -m adf doctor --root .
```

**Expected:** JSON result with `"ok": true` (or actionable check details).

### Step 4 — Boot runtime

```bash
python -m adf boot --root .
```

**Expected:** Services/runtime boot envelope with `"ok": true`.

### Step 5 — Open Studio

```bash
python -m adf studio
# or: cd adf-studio && npm run dev
```

**Expected:** Browser/dev server for ADF Studio Control Center.

### Step 6 — Create / open workspace

In Studio: open **Workspace** from the sidebar.  
Select or note the default workspace (`ws-adf` in Studio config).

**Expected:** Workspace view loads without a blank error page.

### Step 7 — Create project

CLI:

```bash
python -m adf init my-first-project --destination ./adf-examples --template generic
```

Or explore **Projects** in Studio and use templates/examples.

**Expected:** New project directory with ADF-oriented files.

### Step 8 — Observe Runtime Dashboard

In Studio: open **Dashboard** and **Runtime**.

**Expected:** Runtime overview / status panels render (fixture or live bridge data).

## Possible errors and recovery

| Step | Error | Recovery |
|------|-------|----------|
| 2 | Missing Node/Python | See `INSTALLATION.md` |
| 3 | Wrong `--root` | Pass the repo root that contains `.adf/` |
| 5 | Port in use | Stop other Vite apps or change Vite port |
| 7 | Destination not empty | Add `--overwrite` only if intentional |

## Success

You can install, run doctor, boot, open Studio, and create a first project without
reading the full `adf-docs/` tree.
