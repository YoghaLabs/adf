# Authorization

Authorization is enforced in the **Identity Layer**, not Core Runtime.

- Organization membership (`organization_members`)
- Workspace membership (`workspace_members`)
- Hierarchical ADF roles → permission keys
- Studio pages read resolved permissions via `identitySdk.permissions`
