# Permission System

**Build:** BUILD-019

## Model

- Fine-grained permission keys (`org.read`, `workspace.admin`, …)
- Permission matrix cells: granted · inherited · overridden
- Inheritance follows RBAC hierarchy
- Overrides allowed on custom roles

## Path

```
UI → PermissionClient → Service Layer → Core
```
