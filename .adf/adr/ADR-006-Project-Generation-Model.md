# ADR-006 — Project Generation Model

## Title

Project Generation Model (Manifest-Driven)

## Status

Accepted

## Context

ADF needs to create complete projects from templates. Hardcoding folder trees inside
the generator would duplicate architecture knowledge, drift from locked layouts, and
make stack variants (Python, FastAPI, Laravel, Next.js) unmaintainable.

BUILD-007 delivered declarative `template.yaml` packages. BUILD-008 must generate
projects without inventing structures in Python.

## Decision

1. **Generation is manifest-driven.** `GeneratorManager` reads template metadata and
   file trees only — it does not hardcode project layouts.
2. **Templates are declarative.** Structure, variables, dependencies, capabilities,
   outputs, and permissions live in `template.yaml` + `files/`.
3. **Inheritance and dependencies** are resolved through the Template Engine /
   Template Registry (`inherits`, `dependencies`).
4. **Built-in project types** (`generic`, `python`, `fastapi`, `laravel`, `nextjs`)
   are template packages under `adf-templates/`, not generator classes.
5. **Dry-run / validate / rollback** are first-class manager operations so operators
   can preview and safely undo writes.

## Consequences

- New project shapes require new/updated templates, not generator forks
- Generator code stays thin and composable
- Invalid manifests fail before disk writes
- Architecture lock remains enforced by template content + docs/ADR, not scattered Python

## Alternatives Considered

| Alternative | Why rejected |
|-------------|--------------|
| Hardcoded scaffolder trees in Python | Drifts from SSOT; violates “no hardcoded projects” |
| One generator class per stack | Explosion of code; duplicates manifest concerns |
| External cookiecutter-only | Bypasses ADF Template Engine contracts |

## References

- `adf-docs/PROJECT_GENERATOR.md`
- `adf-docs/GENERATION_PIPELINE.md`
- `adf-docs/TEMPLATE_MANIFEST.md`
- ADR-001 Repository Structure

## Future Impact

Additional stacks are added as templates. Generator APIs remain stable:
`generate`, `validate`, `dry_run`, `build`, `write`, `rollback`.
