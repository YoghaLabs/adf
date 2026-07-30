# Graph Engine

**SSOT for Studio graph engine.** BUILD-015.

## Components

| Class | Role |
|-------|------|
| `GraphManager` | Visible subset orchestration |
| `GraphRenderer` | Maps models → React Flow nodes/edges |
| `GraphLayout` | force / tree / grid / hierarchical / radial |
| `GraphBuilder` | Document merge / copy |
| `GraphFilter` | Node/edge type filters |
| `GraphSearch` | Local presentation search |
| `GraphSelection` | Selection helpers |
| `GraphNavigator` | Neighbor expand/collapse |

## Interactions

Zoom · Pan · Fit View · Mini Map · Selection · Multi-select · Hover/Highlight ·
Filter · Search · Focus · Expand · Collapse

## Rule

Engine is pure presentation. It never invents edges or ownership — only layouts
and filters envelopes from SDK.
