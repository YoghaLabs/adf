"""Service contracts for the ADF Service Layer."""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Protocol

from runtime.exceptions import AdfError


class ServiceException(AdfError):
    """Service-layer failures."""


@dataclass(frozen=True)
class ServiceMetadata:
    """Immutable metadata describing a service."""

    name: str
    version: str
    description: str
    service_type: str = "core"


@dataclass
class ServiceContext:
    """Shared context provided to services (no engine leakage to callers)."""

    repo_root: Path
    build: str
    version: str
    branch: str
    extras: dict[str, Any] = field(default_factory=dict)


@dataclass
class ServiceResult:
    """Standard service response envelope."""

    ok: bool
    data: dict[str, Any] = field(default_factory=dict)
    error: str | None = None
    message: str = ""

    def to_dict(self) -> dict[str, Any]:
        """Serialize for CLI/SDK JSON output."""
        payload: dict[str, Any] = {"ok": self.ok, "data": dict(self.data)}
        if self.error:
            payload["error"] = self.error
        if self.message:
            payload["message"] = self.message
        return payload

    @classmethod
    def success(cls, data: dict[str, Any] | None = None, *, message: str = "") -> ServiceResult:
        """Build a successful result."""
        return cls(ok=True, data=dict(data or {}), message=message)

    @classmethod
    def failure(cls, error: str, *, data: dict[str, Any] | None = None) -> ServiceResult:
        """Build a failed result."""
        return cls(ok=False, data=dict(data or {}), error=error)


class ServiceProtocol(Protocol):
    """Structural protocol for services."""

    metadata: ServiceMetadata

    def boot(self, context: ServiceContext) -> ServiceResult: ...

    def shutdown(self) -> ServiceResult: ...

    def health(self) -> ServiceResult: ...


class BaseService(ABC):
    """Abstract base for all ADF services."""

    metadata: ServiceMetadata

    def __init__(self) -> None:
        """Initialize service state."""
        self._booted = False
        self._context: ServiceContext | None = None

    @property
    def name(self) -> str:
        """Service unique name."""
        return self.metadata.name

    @property
    def is_booted(self) -> bool:
        """Whether the service has been booted."""
        return self._booted

    def boot(self, context: ServiceContext) -> ServiceResult:
        """Boot the service with a shared context."""
        self._context = context
        result = self.on_boot(context)
        self._booted = result.ok
        return result

    def shutdown(self) -> ServiceResult:
        """Shut down the service."""
        result = self.on_shutdown()
        self._booted = False
        return result

    def health(self) -> ServiceResult:
        """Return health information."""
        return self.on_health()

    @abstractmethod
    def on_boot(self, context: ServiceContext) -> ServiceResult:
        """Subclass boot hook."""

    def on_shutdown(self) -> ServiceResult:
        """Subclass shutdown hook."""
        return ServiceResult.success(message=f"{self.name} shutdown")

    def on_health(self) -> ServiceResult:
        """Subclass health hook."""
        return ServiceResult.success(
            {"name": self.name, "booted": self._booted, "type": self.metadata.service_type}
        )
