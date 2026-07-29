"""Event bus and lifecycle events."""

from __future__ import annotations

from collections import defaultdict
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Callable
from uuid import uuid4

EventHandler = Callable[["Event"], None]

# Lifecycle event names
ON_BOOT = "on_boot"
ON_RESUME = "on_resume"
ON_LOAD = "on_load"
ON_SAVE = "on_save"
ON_COMMIT = "on_commit"
ON_HANDOFF = "on_handoff"

LIFECYCLE_EVENTS = (
    ON_BOOT,
    ON_RESUME,
    ON_LOAD,
    ON_SAVE,
    ON_COMMIT,
    ON_HANDOFF,
)


@dataclass
class Event:
    """A dispatched runtime event."""

    name: str
    payload: dict[str, Any] = field(default_factory=dict)
    event_id: str = field(default_factory=lambda: uuid4().hex[:12])
    created_at: str = field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )


class EventBus:
    """Simple synchronous publish/subscribe event bus."""

    def __init__(self) -> None:
        """Create an empty bus."""
        self._handlers: dict[str, list[EventHandler]] = defaultdict(list)
        self._history: list[Event] = []

    def subscribe(self, event_name: str, handler: EventHandler) -> None:
        """Register a handler for ``event_name``."""
        self._handlers[event_name].append(handler)

    def unsubscribe(self, event_name: str, handler: EventHandler) -> None:
        """Remove a handler if present."""
        handlers = self._handlers.get(event_name, [])
        if handler in handlers:
            handlers.remove(handler)

    def publish(self, event_name: str, payload: dict[str, Any] | None = None) -> Event:
        """Publish an event and invoke handlers in subscription order."""
        event = Event(name=event_name, payload=dict(payload or {}))
        self._history.append(event)
        for handler in list(self._handlers.get(event_name, [])):
            handler(event)
        return event

    def history(self) -> list[Event]:
        """Return a copy of dispatched events."""
        return list(self._history)

    def clear_history(self) -> None:
        """Clear event history (handlers remain)."""
        self._history.clear()
