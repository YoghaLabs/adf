# Signing & Notarization — GA

**RC1:** checklist only. **GA `1.0.0`:** signed artifacts required.

## Artifacts

| Artifact | Platform | Mechanism |
|----------|----------|-----------|
| Studio installer | Windows | Authenticode (`.exe` / `.msi`) |
| Studio bundle | macOS | Developer ID + notarization |
| Packages | Linux | GPG detached signature on `.tar.gz` / `.deb` |
| Python wheel | all | Optional PyPI trusted publishing; checksums required |
| APM registry packs | all | Manifest checksum + optional signature field |

## Required secrets (CI / release machine)

| Env var | Purpose |
|---------|---------|
| `ADF_WIN_CERT_PFX` | Base64 PFX (or path via runner) |
| `ADF_WIN_CERT_PASSWORD` | PFX password |
| `ADF_APPLE_ID` | Notarization Apple ID |
| `ADF_APPLE_TEAM_ID` | Team ID |
| `ADF_APPLE_APP_PASSWORD` | App-specific password |
| `ADF_GPG_PRIVATE_KEY` | Linux/package signing |
| `ADF_GPG_PASSPHRASE` | GPG passphrase |

Preflight: `python tools/ga/check_signing_env.py`

Missing secrets **must fail** the GA release job — never ship unsigned installers as GA.

## Windows (Authenticode)

1. Obtain code-signing certificate (org Authenticode).  
2. Import PFX on release runner.  
3. Sign with `signtool sign /fd SHA256 /tr http://timestamp.digicert.com /td SHA256 …`  
4. Verify: `signtool verify /pa <installer>`  

## macOS

1. Sign app with Developer ID Application.  
2. Notarize with `notarytool`.  
3. Staple ticket to the DMG/app.  

## Linux / portable

1. `gpg --detach-sign -a adf-*.tar.gz`  
2. Publish `.asc` beside archive.  
3. Publish SHA256SUMS.  

## Checksums (always)

```bash
python tools/ga/write_checksums.py path/to/dist
```

Ship `SHA256SUMS` with every GA artifact set.
