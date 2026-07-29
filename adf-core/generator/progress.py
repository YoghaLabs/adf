"""Generation progress reporting."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass
class ProgressReporter:
    """Collect human-readable generation progress messages."""

    messages: list[str] = field(default_factory=list)

    def step(self, message: str) -> None:
        """Record a progress step."""
        self.messages.append(message)

    def to_list(self) -> list[str]:
        """Return a copy of progress messages."""
        return list(self.messages)

    def to_dict(self) -> dict[str, Any]:
        """Serialize progress."""
        return {"messages": self.to_list(), "steps": len(self.messages)}
