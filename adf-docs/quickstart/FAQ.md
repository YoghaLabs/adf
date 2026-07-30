# FAQ

## What is ADF?

ADF is an **AI Development Framework** and enterprise AI engineering platform
direction — repository-native contracts, runtime, Studio control center, and
governance foundations. It is not a chatbot, not primarily a coding assistant
chat product, not an IDE, and not a low-code builder.

## Do I need to read everything?

No. Start with this Quick Start (`adf-docs/quickstart/`), then deepen as needed.

## How do I install?

See `INSTALLATION.md`. Prefer `./install` or `.\install.ps1`.

## Why `python -m adf` instead of just `adf`?

RC1 supports module entry reliably. A global `adf` binary depends on your PATH /
editable install. The `install` helper tries to make the module entry obvious.

## Does `adf studio` exist?

Yes (added in PRODUCT VALIDATION-001 as a launch helper). It does not redesign the
CLI architecture; it opens or explains how to start `adf-studio`.

## Where are examples?

`adf-examples/hello-adf/`, `minimal-project/`, `enterprise-demo/`.

## Is this GA?

No. This is **`1.0.0-rc1`**. GA remains a quality/signing gate. Quick Start polish
is recommended as a **GA requirement** (see validation report).

## Can I use this commercially?

See `/legal`. Community License covers non-commercial use; commercial use needs
permission.

## Will there be a welcome wizard?

That is the intended GA Quick Start differentiator (Demo Project in minutes). It is
documented as a target experience in the validation report — not fully claimed as
shipped UX in RC1.
