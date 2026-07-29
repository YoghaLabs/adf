# Package Security

## Checks (`PackageSecurity`)

| Check | Behavior |
|-------|----------|
| Checksum | Validates declared checksum when present; otherwise reports skip + actual tree hash |
| Signature | Accepts non-empty opaque signature fields (PKI later) |
| Trusted publishers | Default trust set includes YoghaLabs |
| Capabilities | Treated as declared permissions |

## Verify CLI

```bash
adf verify
adf verify demo-template
```

Combines PackageManager lockfile verify with registry security scan.
