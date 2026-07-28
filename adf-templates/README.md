# adf-templates

Reusable templates for ADF projects and artifacts.

## Purpose

`adf-templates` will store generation templates for:

- New ADF repositories (folder + `.adf` seed set)
- Prompt packs and handoff documents
- Build checklists and release notes stubs
- Documentation skeletons that meet the no-placeholder quality bar

## Status

**Scaffold only in BUILD-001.**  
Template system implementation is planned for **BUILD-009**.

## Design Constraints

- Templates must emit the locked architecture only
- Generated files must contain useful starter content, not empty stubs
- Template metadata should declare which BUILD introduced them
- Outputs must remain compatible with `.adf/AI_CONTRACT.md`

## Planned Template Categories

| Category | Examples |
|----------|----------|
| Repository | Full ADF tree seed |
| Operating | `.adf` file set for a new project |
| Prompts | build / resume / handoff / audit variants |
| Docs | Architecture and getting-started starters |

## Related Docs

- `bootstrap/README.md`
- `adf-examples/README.md`
- `ROADMAP.md` (BUILD-009)
