# BUILD-013 Migration

## From BUILD-012

BUILD-012 completed the backend Distribution Platform. Studio does **not**
reimplement installers or release policy; it consumes Release/Package/Marketplace
SDK surfaces.

## Operator notes

1. `cd adf-studio && npm install && npm run dev` for UI
2. Core Python services remain the SSOT for domain operations
3. Fixture bridge is temporary until Tauri invoke is wired

## Breaking changes

None for Python CLI/SDK consumers.
