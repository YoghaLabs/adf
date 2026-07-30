# Review Workflow

**Build:** BUILD-017

## Queue

Reviews are first-class collaboration items:

| Kind | Use |
|------|-----|
| `code` | Code review |
| `document` | Document review |
| `ai` | AI-authored review |

Statuses: `open` · `changes_requested` · `approved` · `rejected`

## Approvals

Decision log entries:

- Approve
- Reject
- Request changes

Each approval records actor, review id, note, and timestamp.

## Flow (presentation)

```
Review Queue → Approval actions → Decision log
```

Mutations remain Service Layer concerns. Studio displays envelopes via `ReviewClient`.
