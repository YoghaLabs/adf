# GA Gate — Quick Start Experience

**Status:** Recommended mandatory criterion for ADF `1.0.0` GA  
**Source:** PRODUCT VALIDATION-001 + operator direction

## Rule

ADF **1.0.0 GA** should not ship without a smooth first-run experience that lets a
new developer understand product value in minutes.

## Target flow

```bash
git clone https://github.com/YoghaLabs/adf.git
cd adf
./install
adf doctor
adf init my-first-project
adf studio
```

Studio opens with a welcome wizard:

1. Create Workspace  
2. Open Existing Workspace  
3. Learn ADF  
4. **Demo Project** → auto sample → Runtime + Visual + Marketplace explorables  

## Why this is a gate

Technical strength without first-run clarity slows adoption, demos, investor
walkthroughs, and sales. Quick Start is a product differentiator, not optional polish.

## RC1 vs GA

| Item | RC1 (now) | GA target |
|------|-----------|-----------|
| Quick Start docs | ✅ | ✅ |
| `./install` + `adf studio` helper | ✅ | ✅ |
| Examples | ✅ | ✅ |
| Welcome / Demo Project wizard | Documented only | **Required** → started in VALIDATION-002 (Studio) |


## Related

- `PRODUCT_VALIDATION_REPORT.md`
- `USER_JOURNEY.md` (Journey C)
- `README.md` in this folder
