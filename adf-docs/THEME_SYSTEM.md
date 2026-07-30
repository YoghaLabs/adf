# Studio Theme System

**SSOT for ADF Studio theming.** BUILD-013.

## Modes

| Mode | Behavior |
|------|----------|
| `dark` | Force dark CSS variables |
| `light` | Force light CSS variables |
| `system` | Follow `prefers-color-scheme` |

Persisted via `SettingsStore.theme`. Applied by `ThemeManager` on `<html data-theme>`.

## Tokens

Defined in `adf-studio/src/styles/globals.css` as CSS custom properties:

- Surfaces: `--bg`, `--bg-elevated`, `--border`
- Text: `--fg`, `--fg-muted`
- Accent: teal/slate family (not purple-default AI chrome)
- Status: success / warn / danger

Tailwind maps to these tokens in `tailwind.config.js`.

## Rules

- ThemeManager is the only writer of `data-theme`
- Components consume tokens / utility classes — no hard-coded hex sprawl in pages
- System mode must update on `matchMedia` change

## Related

- `STUDIO_UI.md`
- Settings page · ThemeManager
