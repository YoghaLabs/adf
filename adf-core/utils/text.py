"""Text utilities."""

from __future__ import annotations


def first_non_empty_line(text: str) -> str:
    """Return the first non-empty stripped line, or an empty string."""
    for line in text.splitlines():
        stripped = line.strip()
        if stripped:
            return stripped
    return ""
