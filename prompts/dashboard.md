# Dashboard prompt

Use when changing the Studio **Dashboard**.

## Widgets (BUILD-013)

Recent Projects · Recent Sessions · Installed Packages · Marketplace Updates ·
Runtime Status · Knowledge Overview · Release Channel · Version

## Rules

- Widgets fetch via SDK / TanStack Query only
- Presentation formatting only — no domain decisions
- Keep one job per widget; avoid dashboard card sprawl beyond the required set

## Files

- `adf-studio/src/pages/DashboardPage.tsx`
- `adf-studio/src/widgets/DashboardWidgets.tsx`
- `adf-docs/STUDIO_UI.md`
