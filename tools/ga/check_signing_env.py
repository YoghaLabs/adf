#!/usr/bin/env python3
"""GA signing environment preflight.

Exit 0 if required secrets are present (or ADF_GA_SIGNING_SKIP=1 for local dry-run).
Exit 1 if GA signing would be incomplete.
"""

from __future__ import annotations

import os
import sys

REQUIRED = (
    "ADF_WIN_CERT_PFX",
    "ADF_WIN_CERT_PASSWORD",
    "ADF_APPLE_ID",
    "ADF_APPLE_TEAM_ID",
    "ADF_APPLE_APP_PASSWORD",
    "ADF_GPG_PRIVATE_KEY",
    "ADF_GPG_PASSPHRASE",
)


def main() -> int:
    if os.environ.get("ADF_GA_SIGNING_SKIP") == "1":
        print("ADF_GA_SIGNING_SKIP=1 — signing preflight skipped (not allowed for GA tag job)")
        return 0

    missing = [name for name in REQUIRED if not os.environ.get(name)]
    if missing:
        print("GA signing env incomplete. Missing:")
        for name in missing:
            print(f"  - {name}")
        print("See release/SIGNING.md")
        return 1

    print("GA signing environment OK (%d secrets present)" % len(REQUIRED))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
