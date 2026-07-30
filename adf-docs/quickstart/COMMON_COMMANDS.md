# Common Commands

## Everyday

```bash
python -m adf -h
python -m adf version --root .
python -m adf doctor --root .
python -m adf boot --root .
python -m adf status --root .
python -m adf context --root . --pack quick
python -m adf resume --root .
python -m adf studio --root .
```

## Projects

```bash
python -m adf init my-app --destination . --template generic
python -m adf dry-run my-app --template fastapi
python -m adf validate my-app --template python
```

## Packages / marketplace

```bash
python -m adf search demo --root .
python -m adf list --installed --root .
python -m adf verify --root .
```

## Studio (npm)

```bash
cd adf-studio
npm run dev
npm test
```

## Helpful patterns

| Goal | Command |
|------|---------|
| Am I healthy? | `doctor` |
| Start services | `boot` |
| New sample project | `init` |
| Open UI | `studio` |
| Resume work | `resume` + read `.adf/RESUME_ME.md` |
