"""Hook registry for before/after extension points."""

from __future__ import annotations

from collections import defaultdict
from typing import Any, Callable

HookHandler = Callable[..., Any]

BEFORE_BOOT = "before_boot"
AFTER_BOOT = "after_boot"
BEFORE_CONTEXT_RESTORE = "before_context_restore"
AFTER_CONTEXT_RESTORE = "after_context_restore"
BEFORE_COMMIT = "before_commit"
AFTER_COMMIT = "after_commit"

KNOWN_HOOKS = (
    BEFORE_BOOT,
    AFTER_BOOT,
    BEFORE_CONTEXT_RESTORE,
    AFTER_CONTEXT_RESTORE,
    BEFORE_COMMIT,
    AFTER_COMMIT,
)


class HookRegistry:
    """Register and run ordered hooks around runtime operations."""

    def __init__(self) -> None:
        """Create an empty hook registry."""
        self._hooks: dict[str, list[HookHandler]] = defaultdict(list)

    def register(self, hook_name: str, handler: HookHandler) -> None:
        """Attach a handler to a hook point."""
        self._hooks[hook_name].append(handler)

    def unregister(self, hook_name: str, handler: HookHandler) -> None:
        """Detach a handler if present."""
        handlers = self._hooks.get(hook_name, [])
        if handler in handlers:
            handlers.remove(handler)

    def run(self, hook_name: str, **kwargs: Any) -> list[Any]:
        """Execute all handlers for ``hook_name`` and return results."""
        results: list[Any] = []
        for handler in list(self._hooks.get(hook_name, [])):
            results.append(handler(**kwargs))
        return results

    def list(self, hook_name: str | None = None) -> dict[str, int] | list[str]:
        """List hook counts or handler ids for one hook."""
        if hook_name is None:
            return {name: len(handlers) for name, handlers in sorted(self._hooks.items())}
        return [getattr(h, "__name__", repr(h)) for h in self._hooks.get(hook_name, [])]
