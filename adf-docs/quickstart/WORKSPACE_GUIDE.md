# Workspace Guide

## Objective

Explain workspaces in ADF Studio for first-time users.

## What you see

Studio includes a **Workspace** area and a workspace selector in the shell.
Default workspace id in Studio config: `ws-adf`.

## What a workspace is

A workspace is the Studio-facing container for projects, sessions, and navigation
context. It is a control-center concept — not a replacement for Git branches.

## What to click

1. Sidebar → **Workspace**  
2. Review workspace summary / projects association  
3. Use workspace selector (shell) if multiple workspaces appear  

## Expected result

Workspace page renders; you can navigate to Projects, Sessions, and Dashboard
without losing orientation.

## Possible errors

| Issue | Recovery |
|-------|----------|
| Empty-looking panels | RC1 may use fixtures/bridge data — refresh and check Runtime |
| Lost after navigation | Use sidebar Dashboard to re-anchor |

## Tips

- Treat Workspace as your “home base” in Studio  
- Create projects via CLI (`adf init`) then inspect them under Projects  
- For demos, start from `adf-examples/hello-adf/`
