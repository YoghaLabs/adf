# Plugin Guide

## Built-in plugins

context, prompt, template, generator, audit, studio, testing, bootstrap

## CLI

```bash
python adf-core/adf.py plugins list --root .
python adf-core/adf.py plugins info context --root .
python adf-core/adf.py plugins disable studio --root .
python adf-core/adf.py plugins enable studio --root .
```

## Authoring

Subclass `AbstractPlugin`, set `metadata`, implement `validate`/`execute` as needed, register via PluginManager factories.
