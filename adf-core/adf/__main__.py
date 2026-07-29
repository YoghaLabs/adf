"""Allow ``python -m adf``."""

from adf.cli import main

if __name__ == "__main__":
    raise SystemExit(main())
