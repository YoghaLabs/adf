# Template Manifest

**File:** `template.yaml`  
**Schema version:** `1.0` (BUILD-007)

## Required Fields

| Field | Description |
|-------|-------------|
| `schema_version` | Manifest schema (`1.0`) |
| `metadata.name` | Unique template id |
| `metadata.version` | Template version |

## Supported Sections

- `metadata` — name, version, description, author, tags, build
- `variables` — default variable map
- `dependencies` — other template names
- `capabilities` — feature flags (`scaffold`, `documentation`, …)
- `outputs` — relative output paths
- `permissions` — declared write intents
- `inherits` — parent template name (foundation inheritance)
- `plugin_compatibility` — required plugin names

## Example

See `adf-templates/foundation/template.yaml` and
`adf-core/templates/spec/template_manifest_v1.yaml`.
