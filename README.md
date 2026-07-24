# Research with Codex

This repository preserves the state of a long-running software-engineering
research reconnaissance. The active scope and stage are recorded in
`config/research_scope.yaml` and `state/checkpoint.yaml`.

## Workflow

corpus construction -> completeness audit -> domain map -> representative paper
deep reading -> cross-paper synthesis -> idea generation -> prior-art attack ->
direction narrowing -> pilot design

Each stage writes its durable outputs into this repository and updates the
checkpoint. Start every new stage in a new Codex conversation: read the
repository state rather than depending on historical chat context.

## Layout

- `corpus/`: paper corpus records and source information.
- `cards/`: structured paper-reading cards.
- `synthesis/`: cross-paper maps and synthesis results.
- `ideas/`: candidate idea records; `ideas/prior-art/` holds their coverage
  ledgers.
- `directions/`: selected research directions and pilot designs.
- `config/`: scope, selection rules, and provisional taxonomy.
- `templates/`: reusable YAML records.
- `state/`: current checkpoint and handoff state.
- `reports/`: phase reports when a prompt requests them.
- `scripts/`: small reproducible utilities when a prompt requires them.
