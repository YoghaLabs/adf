# adf-templates

Reusable templates for ADF projects and artifacts.

## Purpose

`adf-templates` stores generation templates consumed by `TemplateManager` /
`GeneratorManager`. **Project structure is declared here** — not hardcoded in
`adf-core/generator`.

## Built-in packages (BUILD-008)

| Package | Description |
|---------|-------------|
| `foundation/` | Base ADF layout + `.adf` operating set |
| `generic/` | Generic project (inherits foundation) |
| `python/` | Python package seed |
| `fastapi/` | FastAPI app seed |
| `laravel/` | Laravel/composer seed |
| `nextjs/` | Next.js app seed |

## Related Docs

- `adf-docs/TEMPLATE_ENGINE.md`
- `adf-docs/PROJECT_GENERATOR.md`
- `.adf/adr/ADR-006-Project-Generation-Model.md`
