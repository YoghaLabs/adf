# Repository Map

Describes every **top-level** folder. **Why:** agents must know purpose, ownership, and future BUILD before creating files in the wrong place.

| Folder | Purpose | Owner (conceptual) | Future Build focus |
|--------|---------|--------------------|--------------------|
| `.adf/` | AI runtime SSOT: state, contracts, memory, maps, standards | ADF maintainers / AI operators | Continuous; major expansion in BUILD-002+ |
| `adf-core/` | Executable core runtime | Core eng | BUILD-005+ |
| `adf-studio/` | GUI for operating ADF | Studio eng | BUILD-013+ |
| `adf-docs/` | Human-facing product and process docs | Docs | BUILD-001, BUILD-002, BUILD-016 |
| `adf-examples/` | Curated usage examples | Docs / DX | BUILD-010 |
| `adf-templates/` | Generators and starter templates | DX | BUILD-009 |
| `bootstrap/` | Boot contracts + per-BUILD specification packs | Process | BUILD-001 docs; BUILD-002 packs; BUILD-003 automation |
| `prompts/` | Operator prompt library | Process / AI | BUILD-001, BUILD-002, BUILD-004 schemas |
| `testing/` | Contract and behavior tests | QA / Core | BUILD-011, BUILD-017 |
| `tools/` | Scripts and utilities | DX / Core | BUILD-003, BUILD-008 |
| `release/` | Packaging and ship checklists | Release eng | BUILD-012, BUILD-019, BUILD-020 |

## Root Files (Not Folders)

| File | Purpose |
|------|---------|
| `README.md` | Entry point + build status table |
| `VERSION` | Version / build / branch identity |
| `CHANGELOG.md` | Semver change log |
| `ROADMAP.md` | BUILD mission roadmap |
| `CONTRIBUTING.md` | Contribution rules |
| `LICENSE` | MIT |
| `.gitignore` | Ignore rules |

## Rules

- Do not add new top-level folders.
- Do not rename or move these folders.
- Put new work **inside** the correct mapped folder.
