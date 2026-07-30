# Notification System

**Build:** BUILD-017

## Kinds

| Kind | Example |
|------|---------|
| `mention` | @yogha in a comment |
| `assignment` | Task assigned to Documentation AI |
| `review_request` | Code review opened |
| `ai_finished` | Planner AI finished (no automation) |
| `package_update` | Package channel notice |
| `release_update` | Release channel notice |

## Delivery path

```
UI → NotificationClient → Service Layer → Core
```

Studio `NotificationStore` caches list envelopes only.
