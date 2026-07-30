# Product Validation Checklist

**Phase:** PRODUCT VALIDATION-001  
**Product:** ADF `1.0.0-rc1`

## Installation

- [x] Clone instructions documented  
- [x] Install helper scripts (`install`, `install.ps1`)  
- [x] Manual pip/npm fallback documented  
- [x] Prerequisites listed  

## CLI

- [x] `version` validated  
- [x] `doctor` validated  
- [x] `boot` / `status` / `context` / `resume` documented  
- [x] `init` documented  
- [x] `studio` helper added + documented  
- [x] Help epilog points to Quick Start  
- [x] Missing commands documented honestly  

## Studio

- [x] Navigation map documented  
- [x] Dashboard / Workspace / Projects / Runtime / Visual / Marketplace / Enterprise / Settings documented  
- [x] Launch path documented  

## Workspace

- [x] Workspace concept + default id documented  
- [x] User actions documented  

## Runtime

- [x] Boot + Runtime screen in first-run path  
- [x] Limits (planning vs autonomy) noted  

## Templates

- [x] Generator templates referenced (`generic`, …)  
- [x] Studio Templates route documented  

## Marketplace

- [x] CLI search/list mentioned  
- [x] Studio Marketplace route documented  

## Documentation

- [x] Quick Start pack complete under `adf-docs/quickstart/`  
- [x] Examples under `adf-examples/`  
- [x] FAQ + Troubleshooting  
- [x] Validation report written  

## Architecture / scope guards

- [x] No new top-level architecture folders (`docs/`, `examples/` avoided)  
- [x] No BUSINESS-005 work  
- [x] No BUILD-021  
- [x] No runtime redesign  
