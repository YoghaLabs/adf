# Organization

Model:

Organization → Workspace → Project  
Members / Teams / Invitations belong to Organization  
Organization Owner + Billing Owner roles supported in RBAC

ADF tables: `organizations`, `organization_members`, `invitations`, `teams`.
Better Auth organization plugin may also manage provider-side org records.
