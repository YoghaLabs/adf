"""Package type constants and metadata helpers."""

from __future__ import annotations

from typing import Final

# BUILD-011 marketplace categories (canonical).
MARKETPLACE_CATEGORIES: Final[tuple[str, ...]] = (
    "plugin",
    "template",
    "generator",
    "prompt-pack",
    "bootstrap-pack",
    "knowledge-pack",
    "documentation-pack",
    "theme",
    "studio-extension",
    "sdk-extension",
)

# Legacy BUILD-009 types remain accepted for installed packages.
LEGACY_PACKAGE_TYPES: Final[tuple[str, ...]] = (
    "prompt",
    "bootstrap",
    "documentation",
    "extension",
)

PACKAGE_TYPES: Final[tuple[str, ...]] = MARKETPLACE_CATEGORIES + LEGACY_PACKAGE_TYPES

TYPE_ALIASES: Final[dict[str, str]] = {
    "prompt": "prompt-pack",
    "bootstrap": "bootstrap-pack",
    "documentation": "documentation-pack",
    "extension": "sdk-extension",
}

PACKAGE_MANIFEST_FILENAME = "package.yaml"
PACKAGE_SCHEMA_VERSION = "1.0"
ENGINE_COMPAT = "adf-core>=0.8.0"


def normalize_package_type(pkg_type: str) -> str:
    """Map legacy types to marketplace categories when possible."""
    value = str(pkg_type or "").strip()
    return TYPE_ALIASES.get(value, value)
