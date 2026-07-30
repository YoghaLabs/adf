# BUILD-011 Migration

## From BUILD-010

| Before | After |
|--------|-------|
| Search via PackageService only | Marketplace/Registry search shelves |
| No publish CLI | `adf publish` |
| Package types BUILD-009 set | Marketplace categories + legacy aliases |
| verify = lockfile only | verify + security scan via RegistryService |

## Operator notes

- Component `registry.Registry` unchanged for runtime components
- Package catalog APIs live alongside it in `adf-core/registry/`
