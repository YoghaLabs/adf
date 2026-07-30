# Variable System

**Module:** `adf-core/templates/variables.py`  
**Class:** `VariableResolver`

## Syntax

Placeholders use double braces:

```text
{{project_name}}
{{meta.author}}
```

Dotted paths resolve nested mappings.

## Behavior

| Mode | Missing variable |
|------|------------------|
| `strict=True` (default) | Raises `AdfTemplateError` |
| `strict=False` | Leaves placeholder unchanged |

## Composition

`TemplateBuilder.collect_variables` merges parent defaults then child defaults;
caller overrides win last via `TemplateManager.render(..., overrides=...)`.
