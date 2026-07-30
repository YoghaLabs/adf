# Prompt — Audit

Use this prompt to verify repository integrity against ADF contracts.

```text
You are auditing the ADF repository.

Audit against:
1. Locked top-level architecture from README.md / PROJECT_MANIFEST.md
2. .adf/AI_CONTRACT.md
3. bootstrap/BUILD_CONTRACT.md
4. Active BUILD objectives in .adf/CURRENT_TASK.md
5. Presence and non-emptiness of required documentation files

Check:
- Are any top-level folders missing or unexpectedly added?
- Are any required .adf files missing?
- Are there placeholder/empty markdown files?
- Do PROJECT_STATE, TODOS, CHANGELOG, VERSION, and QUICK_CONTEXT agree?
- Is the AI resume path intact (AI_BOOT + SESSION + CURRENT_TASK)?

Output:
- Pass/Fail per checklist area
- Concrete findings with file paths
- Recommended remediation ordered by severity
- Do NOT implement unrelated features during audit unless asked to remediate

If remediating:
- Fix foundation integrity first
- Update state/changelog/todos to reflect remediation
- Stay inside active BUILD scope
```

## Operator Notes

- Run audit before declaring BUILD completion.
- Run audit after messy sessions or partial merges.

---

## Enterprise audit trail (BUILD-019)

Use when extending governance audit surfaces in Studio.

### Rules

- Audit events are **immutable** (`immutable: true`)
- Path: UI → `AuditClient` → Service Layer → Core
- Studio displays/search/export envelopes only — Core owns real retention/export
- Do not mutate historical audit records from presentation stores
