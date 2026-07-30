"""Shared constants for the ADF Runtime Engine."""

from __future__ import annotations

PACKAGE_NAME = "adf-core"
PACKAGE_VERSION = "0.9.0a0"
ENGINE_BUILD = "BUILD-009"

# Locked top-level folders (ADR-001) — used by doctor/validate.
LOCKED_TOP_LEVEL = (
    ".adf",
    "adf-core",
    "adf-studio",
    "adf-docs",
    "adf-examples",
    "adf-templates",
    "bootstrap",
    "prompts",
    "testing",
    "tools",
    "release",
)

REQUIRED_ROOT_FILES = (
    "VERSION",
    "README.md",
    "CHANGELOG.md",
    "ROADMAP.md",
)

REQUIRED_ADF_FILES = (
    "PROJECT_STATE.md",
    "QUICK_CONTEXT.md",
    "CURRENT_TASK.md",
    "AI_CONTRACT.md",
)

STATE_MACHINE = (
    "BOOT",
    "RESTORE",
    "ANALYZE",
    "PLAN",
    "IMPLEMENT",
    "VERIFY",
    "COMMIT",
    "HANDOFF",
)

CONTEXT_PACKS = ("quick", "standard", "deep")
