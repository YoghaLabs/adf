# BUILD-008 Spec

## Create

- `adf-core/generator/` modules: manager, resolvers, dry_run, validator, filesystem writers
- Built-in templates: foundation, generic, python, fastapi, laravel, nextjs
- Docs + ADR-006 + prompts including `dry-run.md`
- CLI: init, new, generate, dry-run, validate

## Implement

- GeneratorManager: generate/validate/dry_run/build/write/rollback
- Manifest-driven ProjectBuilder (no hardcoded trees)
- Filesystem abstraction + atomic writes + rollback journal
- pytest: generator, filesystem, manifest, variables, dry-run, rollback, validation
