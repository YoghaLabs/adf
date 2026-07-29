"""Hooks package."""

from hooks.registry import (
    AFTER_BOOT,
    AFTER_COMMIT,
    AFTER_CONTEXT_RESTORE,
    BEFORE_BOOT,
    BEFORE_COMMIT,
    BEFORE_CONTEXT_RESTORE,
    KNOWN_HOOKS,
    HookHandler,
    HookRegistry,
)

__all__ = [
    "AFTER_BOOT",
    "AFTER_COMMIT",
    "AFTER_CONTEXT_RESTORE",
    "BEFORE_BOOT",
    "BEFORE_COMMIT",
    "BEFORE_CONTEXT_RESTORE",
    "KNOWN_HOOKS",
    "HookHandler",
    "HookRegistry",
]
