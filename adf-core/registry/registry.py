"""In-memory component registry."""

from __future__ import annotations

from typing import Any

from runtime.exceptions import AdfRegistryError


class Registry:
    """Register and look up named runtime components.

    Public API: ``register``, ``find``, ``remove``, ``list``.
    """

    def __init__(self) -> None:
        """Create an empty registry."""
        self._items: dict[str, Any] = {}

    def register(self, name: str, component: Any) -> None:
        """Register a component under ``name``.

        Raises:
            AdfRegistryError: If ``name`` is empty or already registered.
        """
        key = name.strip()
        if not key:
            raise AdfRegistryError("Component name must be non-empty")
        if key in self._items:
            raise AdfRegistryError(f"Component already registered: {key}")
        self._items[key] = component

    def find(self, name: str) -> Any:
        """Return a registered component.

        Raises:
            AdfRegistryError: If the name is unknown.
        """
        key = name.strip()
        if key not in self._items:
            raise AdfRegistryError(f"Component not found: {key}")
        return self._items[key]

    def remove(self, name: str) -> None:
        """Remove a registered component.

        Raises:
            AdfRegistryError: If the name is unknown.
        """
        key = name.strip()
        if key not in self._items:
            raise AdfRegistryError(f"Component not found: {key}")
        del self._items[key]

    def list(self) -> list[str]:
        """Return registered component names sorted alphabetically."""
        return sorted(self._items.keys())
