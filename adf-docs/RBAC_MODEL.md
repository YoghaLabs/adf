# RBAC Model

**Build:** BUILD-019

## Role scopes

| Scope | Example |
|-------|---------|
| System | System Admin |
| Organization | Organization Admin |
| Workspace | Workspace Owner / Member |
| Project | Project Reviewer |
| Custom | Custom Auditor |

## Resolution order

`system → organization → workspace → project → custom`

Enforcement lives in the Service Layer / Core. Studio renders the matrix only.
