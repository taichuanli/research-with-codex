# Research Workspace Protocol

This repository is a durable workspace for software-engineering research
reconnaissance. Its current scope is defined in `config/research_scope.yaml`.

## Required Session Start

Before taking substantive action, every Codex session must read:

1. this `AGENTS.md`;
2. `config/research_scope.yaml`;
3. `state/checkpoint.yaml`; and
4. the existing artifacts required by the current phase (for example, corpus
   metadata before completeness auditing, or idea and prior-art records before
   direction narrowing).

Use repository files as the durable record. Do not rely on prior chat context.

## Phase Discipline

- A session executes only the phase explicitly requested in its prompt.
- Record material outputs in the owning directory and update the checkpoint
  before handing off to a later phase.
- Do not start a later phase merely because its prerequisites appear ready.
- Keep current scope, inclusion decisions, and phase names synchronized with
  `config/research_scope.yaml` and `state/checkpoint.yaml`.

## Evidence and Claims

- Preserve a source for every important fact, result, comparison, and judgment.
  Use stable URLs/DOIs when available and a precise `source_locator` such as a
  page, section, table, figure, or quoted passage.
- Label substantive statements as exactly one of: `author_claim`,
  `direct_evidence`, or `agent_inference`.
- `author_claim` records what a source's authors state; `direct_evidence`
  records observable source material such as methods, data, and reported
  results; `agent_inference` records a conclusion drawn by the agent and must
  cite its supporting evidence.
- A missing search result is not evidence of novelty. Never claim an idea is
  "first", novel, or unprecedented solely because no related work was found.

## Prior-Art Discipline

- Inspect direct competitors before promoting a candidate idea.
- When a work directly covers an idea, record it in the prior-art ledger and
  actively reject the idea or narrow its claim, setting, method, or evaluation
  target. Do not retain it unchanged.
- Keep uncertainty explicit. Use `pending` or `inconclusive` rather than
  overstating coverage or absence of coverage.

## Operational Boundaries

Unless the user explicitly requests it, do not train models, run formal
experiments, download models at scale, or modify server skill configuration.
Do not reinitialize Git, change the Git remote, or push changes unless the user
explicitly requests that operation.
