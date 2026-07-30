# ADF install helper — PRODUCT VALIDATION-001
# Usability only: does not change architecture.
$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $Root

Write-Host "ADF install helper"
Write-Host "Repository: $Root"
Write-Host ""

$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) {
  Write-Error "Python not found. Install Python 3.11+ and retry."
}

$npm = Get-Command npm -ErrorAction SilentlyContinue
if (-not $npm) {
  Write-Error "npm not found. Install Node.js 20+ and retry."
}

Write-Host "[1/3] Installing adf-core (editable)..."
python -m pip install -e "$Root\adf-core"

Write-Host "[2/3] Installing adf-studio dependencies..."
Push-Location "$Root\adf-studio"
npm install
Pop-Location

Write-Host "[3/3] Quick checks..."
try { python -m adf version --root $Root } catch { Write-Host $_ }
try { python -m adf doctor --root $Root } catch { Write-Host $_ }

Write-Host ""
Write-Host "Next steps:"
Write-Host "  python -m adf doctor --root ."
Write-Host "  python -m adf init my-first-project"
Write-Host "  python -m adf studio"
Write-Host ""
Write-Host "Quick Start: adf-docs/quickstart/README.md"
