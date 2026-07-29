# BUILD-005 Migration Notes

## From BUILD-001…004

- Keep all documentation and Context Engine specs intact
- Runtime code **implements** those contracts; it does not replace `.adf` SSOT
- Prefer Boot V2 / Resume Protocol in AI sessions; CLI `boot`/`resume` are assistive

## Operator Changes

1. Install/run tools from `adf-core/` (`pip install -e ".[dev]"`, `pytest`, `adf.py`)
2. Treat `.adf/local/` as ephemeral engine storage
3. Continue updating markdown SSOT on BUILD completion

## Non-Migrations

- Do not move engines outside `adf-core/`
- Do not invent top-level `src/` or `runtime/` folders
- Do not delete BUILD-004 context specs because code exists
