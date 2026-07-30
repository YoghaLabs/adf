# ADF Studio UI

**SSOT for Studio shell, navigation, and page surfaces.** BUILD-013 / `0.13.0-alpha`.

## Application shell

| Component | Role |
|-----------|------|
| `ApplicationShell` | Root chrome: sidebar + top bar + content + status |
| `Sidebar` | Collapsible primary navigation |
| `TopBar` | Workspace selector, global search trigger, notifications |
| `StatusBar` | Runtime / channel / version strip |
| `NotificationCenter` | In-app notification drawer |
| `CommandPalette` | Keyboard-driven navigation (⌘K / Ctrl+K) |
| `WorkspaceSelector` | Active workspace switcher |
| `ThemeManager` | Dark / Light / System |

## Navigation destinations

Dashboard · Workspace · Projects · Marketplace · Templates · Packages ·
Knowledge · Runtime · Sessions · Release · Settings · Help

Configured in `adf-studio/src/config/studio.ts` (single source for nav IDs/paths).

## Layout behaviors

- Responsive desktop layout (sidebar collapses)
- Resizable content region via CSS panel primitives
- Tabbed views reserved for multi-document surfaces (Sessions/Projects detail)
- Global search entry via TopBar → CommandPalette
- Toast-style notifications via NotificationCenter

## Pages

| Page | Primary content |
|------|-----------------|
| Dashboard | Widget grid (projects, sessions, packages, marketplace, runtime, knowledge, release, version) |
| Workspace | Selector, summary, settings |
| Projects | List, details, status, activity |
| Marketplace | Browse, search, featured, categories, install/update actions (SDK only) |
| Knowledge | Packs, context, memory, graphs |
| Runtime | Runtime / engine / plugin / package status |
| Settings | Theme, language, channels, registry, SDK, updates |

## Accessibility

- Landmark regions on shell
- NavLink keyboard focus styles
- Icon + text labels on sidebar (collapsed: title attributes)

## Related

- `STUDIO_ARCHITECTURE.md`
- `prompts/ui.md`, `prompts/layout.md`
