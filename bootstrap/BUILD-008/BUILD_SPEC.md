# BUILD-008 Spec

## Create

- `adf-core/generator/` modules
- Docs: PROJECT_GENERATOR, BOOTSTRAP_GENERATOR, CLI_GENERATOR, SCAFFOLDER
- Prompts: generator, scaffold, project, filesystem, bootstrap-generator
- `bootstrap/BUILD-008/`

## Implement

- GeneratorManager + ProjectBuilder + Scaffolder + Writer + FileSystem
- Dry-run, overwrite protection, validation, progress reporting
- CLI: init, new, generate, doctor wiring
- pytest: generator, filesystem, writer, manifest, dry-run
