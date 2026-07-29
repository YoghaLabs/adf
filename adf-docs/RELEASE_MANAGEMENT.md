# Release Management

## Channels (mandatory)

Development · Alpha · Beta · ReleaseCandidate (`rc`) · Stable · LTS

## ReleaseManager

| Method | Role |
|--------|------|
| `create_release` | Build artifacts + manifest |
| `publish_release` | Mark published |
| `promote_channel` | Promote across channels |
| `archive_release` | Move to `release/archive` |

Artifacts live under `release/dist/{channel}/{version}/`.
