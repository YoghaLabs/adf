# Publisher Guide

## Profiles

Publishers are stored under `.adf/apm/publishers/{id}.json`.

Fields: verification, trust, signature, package ids.

Builtin trusted ids: `YoghaLabs`, `adf`.

## Publish

```bash
adf publish path/to/package --publisher-id YoghaLabs --overwrite
```

Validation uses `RegistryValidator` → `PackageManager.validate`.
Successful publish updates the marketplace index metadata.
