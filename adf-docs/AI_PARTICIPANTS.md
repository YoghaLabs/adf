# AI Participants

**Build:** BUILD-017

## Principle

AI is a **Participant** with the same collaboration identity surface as humans:

- Identity & handle
- Role
- Timeline / activity
- Knowledge references
- Memory hooks (model only)
- Assignments
- Decision log

## Supported AI kinds

| Kind | Role |
|------|------|
| Architect AI | Architecture decisions |
| Planner AI | Planning |
| Backend AI | Service / core surfaces |
| Frontend AI | Studio presentation |
| QA AI | Verification |
| Documentation AI | Docs SSOT |
| DevOps AI | Operations |
| Release AI | Release participation |
| Generic AI | Extensible placeholder |
| Future providers | `provider: "future"` slot |

## Not in scope

- Agent automation / orchestration engines
- Plugin-style tool calling as the collaboration identity
- Widget-only AI chrome without participant records

## Studio

`ParticipantManager`, `HumanParticipant`, `AIParticipant`, and profile/status/role/presence views are **presentation helpers** over SDK envelopes.
