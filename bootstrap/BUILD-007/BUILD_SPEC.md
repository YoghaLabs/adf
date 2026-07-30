# BUILD-007 Spec

## Create

- `adf-core/templates/` modules listed in MASTER mission
- Built-in manifest spec + `adf-templates/foundation`
- Docs: TEMPLATE_ENGINE, TEMPLATE_MANIFEST, VARIABLE_SYSTEM, TEMPLATE_REGISTRY
- Prompts: template, manifest, variables, renderer, registry
- Bootstrap pack `bootstrap/BUILD-007/`

## Implement

- TemplateManager, TemplateRenderer, TemplateValidator, TemplateManifest, VariableResolver
- YAML `template.yaml` parsing (schema 1.0)
- Inheritance foundation, plugin compatibility, dependencies metadata
- RuntimeEngine wires TemplateManager + publishes `templates` service
- pytest: loading, validation, variables, manifest parsing
