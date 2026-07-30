# VALIDATION-002 — In-Studio Onboarding

**Product:** ADF `1.0.0-rc1`  
**Scope:** Studio welcome wizard, Demo Project tour, Help/empty-state guidance  
**Not:** BUILD-021 · BUSINESS-005 · architecture redesign

## Delivered

| Item | Location |
|------|----------|
| Welcome Wizard | `adf-studio/src/features/onboarding/WelcomeWizard.tsx` |
| Demo Project tour | `DemoGuide.tsx` (Dashboard → Runtime → Visual → Marketplace) |
| Getting Started banner | Dashboard |
| Help actions | Replay welcome / start demo + CLI path |
| TopBar Welcome | Re-open wizard anytime |
| Persistence | `localStorage` key `adf.studio.onboarding.v1` |

## User path

1. Open Studio → Welcome appears (first visit)  
2. Choose **Demo Project**  
3. Follow floating guide (Next through 4 screens)  
4. Create real projects later via CLI `adf init`

## Honesty

RC1 panels may still show fixture data. The wizard explains Studio is a control center,
not an IDE, and points to CLI for real project creation.

## Tests

`adf-studio/src/test/onboarding.test.tsx`

## Related

- `GA_QUICKSTART_GATE.md`
- `PRODUCT_VALIDATION_REPORT.md` (VALIDATION-001)
