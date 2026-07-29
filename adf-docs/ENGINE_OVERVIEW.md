# Engine Overview

| Engine | Responsibility |
|--------|----------------|
| RuntimeEngine | Facade: boot/doctor/status; wires managers |
| ContextEngine | Assemble quick/standard/deep packs from SSOT |
| MemoryEngine | Read MEMORY/SESSION markdown |
| BootstrapEngine | Verify locked top-level layout |

Managers: StateManager, SessionManager, CheckpointManager  
Support: Registry, PromptLoader, ProjectLoader

## Related

- `.adf/STATE_MACHINE.md`
- `.adf/CONTEXT_ENGINE.md`
- `PACKAGE_STRUCTURE.md`
