# First Project

## Objective

Create and understand your first ADF project.

## What “project” means here

An ADF project is a generated (or example) directory that follows ADF conventions:
documentation orientation, templates, and resumable structure — not merely a single
source file.

## Create with CLI

```bash
python -m adf init hello-world --destination . --template generic
```

Useful options:

| Flag | Purpose |
|------|---------|
| `--template` | `generic` (default), `python`, `fastapi`, `laravel`, `nextjs` |
| `--destination` | Parent directory |
| `--dry-run` | Preview without writing |
| `--overwrite` | Allow non-empty destination |

Preview:

```bash
python -m adf dry-run hello-world --template generic
```

## Start from an example

```bash
cd adf-examples/hello-adf
# Read README.md, then explore structure
```

Other examples:

- `adf-examples/minimal-project/` — smallest oriented layout  
- `adf-examples/enterprise-demo/` — enterprise-oriented demo narrative  

## Understand what you created

1. Read the project `README.md`  
2. Note template/type used  
3. Run `python -m adf status --root <repo-root>` from the ADF repo  
4. Open Studio → **Projects** / **Templates** to relate UI to CLI  

## Expected result

A named project directory exists and can be opened conceptually in Studio’s project
explorer / examples workflow.

## Errors

| Error | Recovery |
|-------|----------|
| Name collision | Choose another name or clean destination |
| Unknown template | Use `adf doctor` / generator project_types list |
| Confused product vs sample | Remember: this repo is both the ADF product and the place you generate samples |
