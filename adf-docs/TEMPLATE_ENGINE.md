# Template Engine

**Build:** BUILD-007  
**Package:** `adf-core/templates`  
**Facade:** `TemplateManager`

## Purpose

The Template Engine loads YAML-manifested packages from `adf-templates/`,
validates them, resolves variables, and renders file trees. Generators must
depend on this engine rather than inventing ad-hoc scaffolding.

## Components

| Module | Responsibility |
|--------|----------------|
| `engine.py` | `TemplateManager` facade |
| `manifest.py` | `TemplateManifest` + YAML parser |
| `validator.py` | `TemplateValidator` |
| `renderer.py` | `TemplateRenderer` |
| `variables.py` | `VariableResolver` |
| `template_loader.py` | Disk load + inheritance foundation |
| `template_registry.py` | In-memory template registry |
| `template_builder.py` | Plans + inheritance merge |
| `template_metadata.py` | Metadata dataclass |

## Flow

1. Discover packages with `template.yaml`
2. Validate schema + package layout
3. Resolve `{{variables}}`
4. Render `files/` tree to destination (parents first when `inherits` is set)

## Spec

Built-in schema: `adf-core/templates/spec/template_manifest_v1.yaml`
