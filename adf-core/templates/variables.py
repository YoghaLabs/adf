"""Variable resolution for template text and structures."""

from __future__ import annotations

import re
from typing import Any, Mapping

from runtime.exceptions import AdfError

_VAR_PATTERN = re.compile(r"\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*)\s*\}\}")


class AdfTemplateError(AdfError):
    """Template engine failures."""


class VariableResolver:
    """Resolve ``{{variable}}`` and nested ``{{a.b}}`` placeholders.

    Supports composition: callers supply a flat or nested mapping. Missing
    required variables raise ``AdfTemplateError`` unless ``strict=False``.
    """

    def __init__(self, *, strict: bool = True) -> None:
        """Create a resolver.

        Args:
            strict: When True, unresolved placeholders raise errors.
        """
        self.strict = strict

    def lookup(self, key: str, variables: Mapping[str, Any]) -> Any:
        """Resolve a dotted key against variables."""
        current: Any = variables
        for part in key.split("."):
            if not isinstance(current, Mapping) or part not in current:
                raise AdfTemplateError(f"Unknown variable: {key}")
            current = current[part]
        return current

    def resolve(self, text: str, variables: Mapping[str, Any]) -> str:
        """Replace placeholders in a text string."""

        def _replace(match: re.Match[str]) -> str:
            key = match.group(1)
            try:
                value = self.lookup(key, variables)
            except AdfTemplateError:
                if self.strict:
                    raise
                return match.group(0)
            return "" if value is None else str(value)

        return _VAR_PATTERN.sub(_replace, text)

    def resolve_mapping(
        self,
        data: Mapping[str, Any],
        variables: Mapping[str, Any],
    ) -> dict[str, Any]:
        """Deep-resolve strings inside a mapping."""
        result: dict[str, Any] = {}
        for key, value in data.items():
            resolved_key = self.resolve(str(key), variables) if isinstance(key, str) else key
            result[resolved_key] = self._resolve_value(value, variables)
        return result

    def merge(
        self,
        base: Mapping[str, Any],
        overrides: Mapping[str, Any],
    ) -> dict[str, Any]:
        """Merge variable maps; overrides win."""
        merged = dict(base)
        merged.update(overrides)
        return merged

    def required_from_text(self, text: str) -> list[str]:
        """Extract placeholder names referenced in text."""
        return sorted({m.group(1) for m in _VAR_PATTERN.finditer(text)})

    def _resolve_value(self, value: Any, variables: Mapping[str, Any]) -> Any:
        if isinstance(value, str):
            return self.resolve(value, variables)
        if isinstance(value, Mapping):
            return self.resolve_mapping(value, variables)
        if isinstance(value, list):
            return [self._resolve_value(item, variables) for item in value]
        return value
