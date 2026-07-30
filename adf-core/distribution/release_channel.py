"""Release channel definitions for ADF distribution."""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum
from typing import Any


class ReleaseChannel(str, Enum):
    """Mandatory ADF release channels."""

    DEVELOPMENT = "development"
    ALPHA = "alpha"
    BETA = "beta"
    RELEASE_CANDIDATE = "rc"
    STABLE = "stable"
    LTS = "lts"


CHANNEL_ORDER: tuple[ReleaseChannel, ...] = (
    ReleaseChannel.DEVELOPMENT,
    ReleaseChannel.ALPHA,
    ReleaseChannel.BETA,
    ReleaseChannel.RELEASE_CANDIDATE,
    ReleaseChannel.STABLE,
    ReleaseChannel.LTS,
)


@dataclass(frozen=True)
class ChannelPolicy:
    """Policy metadata for a release channel."""

    channel: ReleaseChannel
    label: str
    allow_auto_update: bool
    production: bool

    def to_dict(self) -> dict[str, Any]:
        return {
            "channel": self.channel.value,
            "label": self.label,
            "allow_auto_update": self.allow_auto_update,
            "production": self.production,
        }


CHANNEL_POLICIES: dict[ReleaseChannel, ChannelPolicy] = {
    ReleaseChannel.DEVELOPMENT: ChannelPolicy(
        ReleaseChannel.DEVELOPMENT, "Development", True, False
    ),
    ReleaseChannel.ALPHA: ChannelPolicy(ReleaseChannel.ALPHA, "Alpha", True, False),
    ReleaseChannel.BETA: ChannelPolicy(ReleaseChannel.BETA, "Beta", True, False),
    ReleaseChannel.RELEASE_CANDIDATE: ChannelPolicy(
        ReleaseChannel.RELEASE_CANDIDATE, "Release Candidate", True, False
    ),
    ReleaseChannel.STABLE: ChannelPolicy(ReleaseChannel.STABLE, "Stable", True, True),
    ReleaseChannel.LTS: ChannelPolicy(ReleaseChannel.LTS, "LTS", True, True),
}


def parse_channel(value: str | ReleaseChannel) -> ReleaseChannel:
    """Parse a channel name into ``ReleaseChannel``."""
    if isinstance(value, ReleaseChannel):
        return value
    key = str(value).strip().lower().replace("_", "-").replace(" ", "-")
    aliases = {
        "dev": ReleaseChannel.DEVELOPMENT,
        "development": ReleaseChannel.DEVELOPMENT,
        "alpha": ReleaseChannel.ALPHA,
        "beta": ReleaseChannel.BETA,
        "rc": ReleaseChannel.RELEASE_CANDIDATE,
        "release-candidate": ReleaseChannel.RELEASE_CANDIDATE,
        "releasecandidate": ReleaseChannel.RELEASE_CANDIDATE,
        "stable": ReleaseChannel.STABLE,
        "lts": ReleaseChannel.LTS,
    }
    if key not in aliases:
        raise ValueError(f"unknown release channel: {value}")
    return aliases[key]


def can_promote(source: ReleaseChannel, target: ReleaseChannel) -> bool:
    """Return True when ``source`` may be promoted toward ``target``."""
    return CHANNEL_ORDER.index(source) <= CHANNEL_ORDER.index(target)
