# Filesystem Abstraction

**Module:** `adf-core/generator/filesystem.py`

| Type | Role |
|------|------|
| `FileSystem` | Facade (guard destination, ensure dirs) |
| `DirectoryWriter` | Directory creation / dry-run intent |
| `FileWriter` | Text/bytes writes |
| `SafeOverwrite` | Overwrite policy |
| `AtomicWrite` | Temp-file then replace |

Generators must use this layer instead of raw `open()`/`mkdir` scatter.
