# Prompt — Review

Use for Architecture Review or pre-merge integrity review.

```text
You are reviewing ADF changes.

Boot via .adf/AI_BOOT.md. Use bootstrap/BUILD-00N/REVIEW.md when reviewing a numbered BUILD.

Check:
1. Locked architecture unchanged
2. No deleted documentation
3. No placeholders
4. VERSION / PROJECT_STATE / BUILD_STATUS / CHANGELOG / QUICK_CONTEXT agree
5. .adf remains usable as SSOT cold-start
6. Stop rule honored (no next BUILD sneak-in)

Output Pass/Fail with file-path findings and severity-ordered remediation.
Do not implement unrelated features during review unless asked to remediate.
```

## Why

Reviews catch SSOT drift before the next BUILD compounds it.

---

## Collaboration review workflow (BUILD-017)

Use when extending review/approval surfaces in Studio.

### Surface

Review queue: code · document · AI

Approvals: approve · reject · request_changes + decision log

### Rules

- Mutations via Service Layer (SDK), not ad-hoc UI state as SSOT
- Studio panels display envelopes from `ReviewClient`
- AI reviewers are Participants, not plugins
