# adf-templates

Reusable templates for ADF projects and artifacts.

## Purpose

`adf-templates` stores generation templates consumed by `TemplateManager`
(`adf-core/templates`).

## Status

**Active from BUILD-007.** Packages use `template.yaml` (schema 1.0).

## Built-in packages

| Package | Description |
|---------|-------------|
| `foundation/` | Minimal README + VERSION seed |

## Design Constraints

- Templates must emit the locked architecture only
- Generated files must contain useful starter content, not empty stubs
- Manifests declare metadata, variables, capabilities, outputs, permissions
- Outputs must remain compatible with `.adf/AI_CONTRACT.md`

## Related Docs

- `adf-docs/TEMPLATE_ENGINE.md`
- `adf-docs/TEMPLATE_MANIFEST.md`
- `bootstrap/BUILD-007/`
