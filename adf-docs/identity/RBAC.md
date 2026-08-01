# RBAC

Roles (hierarchical keys):

`platform_owner` · `organization_owner` · `billing_owner` · `workspace_admin` ·
`project_admin` · `architect` · `developer` · `qa` · `devops` · `reviewer` ·
`guest` · `viewer` · `custom`

Permissions are granular (`org:*`, `workspace:*`, `project:*`, `identity:*`,
`session:*`, `token:*`, `audit:*`, `security:*`).

Source of truth: `adf-identity/src/rbac.ts`.
