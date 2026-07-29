"""Exceptions raised by the ADF Runtime Engine."""

from __future__ import annotations


class AdfError(Exception):
    """Base exception for adf-core."""


class AdfConfigError(AdfError):
    """Invalid or missing runtime configuration."""


class AdfStateError(AdfError):
    """State load/save/validation failure."""


class AdfSessionError(AdfError):
    """Session lifecycle failure."""


class AdfCheckpointError(AdfError):
    """Checkpoint create/restore failure."""


class AdfLoadError(AdfError):
    """Markdown or project load failure."""


class AdfRegistryError(AdfError):
    """Registry registration or lookup failure."""
