# BUILD-014 Migration

## From BUILD-013

Studio Core shell remains. Workspace/Projects/Sessions pages now use the
`features/workspace/` module and extended SDK clients.

## Operator notes

1. `cd adf-studio && npm install && npm test`
2. Active workspace drives project/session loads
3. Fixtures remain until Core workspace services are wired

## Breaking changes

None for Python CLI/SDK consumers. Studio nav adds `/search` and reorders sidebar.
