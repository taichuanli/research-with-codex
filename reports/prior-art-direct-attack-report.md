# PRIOR_ART_ATTACK_DIRECT Audit Report

## Phase contract and evidence basis

- `[direct_evidence]` The phase entered from `IDEA_SEEDED` with ten idea cards and ten prior-art ledgers, and the configured next phase was `PRIOR_ART_ATTACK_DIRECT`. Source: `state/checkpoint.yaml / current_phase, idea_seeding, and next_phase`; `config/research_scope.yaml / idea_seeding`.
- `[direct_evidence]` Every candidate was decomposed into a research question, core mechanism, intervention object, and experimental claim, then searched through multiple synonym families. Every completed ledger records search queries, source systems, body evidence, version or citation chaining, coverage, an exact residual delta, falsifiability, likely rejection, confidence, and unverified information. Source: `ideas/prior-art/IDEA_*.yaml / candidate_decomposition, search_log, works, and decision`.
- `[direct_evidence]` The ten ledgers contain 43 closest-work records, with four or five works per candidate. The search used arXiv, OpenAlex, formal venue or anthology records where available, paper reference lists, and the existing full-paper cards. Source: `ideas/prior-art/IDEA_*.yaml / search_log and works`.
- `[direct_evidence]` Directly relevant PDFs or formal full-text/card evidence were inspected for all decisive works. Recent results added during the final audit include TACT, Multi-Head Latent Control, Doomed from the Start, R3, MDM-VGB, DRR, and CORE. Source: their ledger `body_evidence` fields and precise paper-section, table, figure, or card locators.
- `[agent_inference]` A missing result was never treated as novelty evidence. Recent v1/v2 records and immature citation indexes are retained as uncertainty, and this phase did not perform cross-field expansion or an experiment. Source: `AGENTS.md / Evidence and Claims, Prior-Art Discipline, and Operational Boundaries`; ledger `confidence` and `unverified_information` fields.

## Decision audit

| Candidate | Direct-attack decision | Most damaging work | Confidence | Cross-field carry |
|---|---|---|---|---|
| `IDEA_STAGEWISE_FAILURE_ATTRIBUTION` | `[agent_inference] SURVIVES_DIRECT_ATTACK` | Zhao et al., *Failure as a Process*, arXiv:2607.09510v1 | medium | yes |
| `IDEA_ORACLE_CONCURRENCE_TRAP` | `[agent_inference] KILL` | Zhao et al., *CARE*, arXiv:2603.00039v1 | high | no |
| `IDEA_ACTIONABLE_RECOVERABILITY_CALIBRATION` | `[agent_inference] NARROW` | Xi et al., *AgentPRM*, arXiv:2511.08325v1 | medium | yes |
| `IDEA_DECISION_VALUE_EVIDENCE_ROUTING` | `[agent_inference] NARROW` | Fang et al., *Inference-Time Budget Control for LLM Search Agents*, arXiv:2605.05701v1 | high | yes |
| `IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY` | `[agent_inference] PIVOT` | Ye et al., *Auto-Dreamer*, arXiv:2605.20616v1 | medium | yes |
| `IDEA_CAUSAL_DIAGNOSIS_ACTION_GATE` | `[agent_inference] MERGE` | Porbeck et al., *Causal Clarity*, EQUISA workshop at EASE 2026 | medium | no, merged into stagewise |
| `IDEA_REVERSIBILITY_AWARE_COMMIT_CONTROL` | `[agent_inference] KILL` | Zhai, Li, and Wang, *Revisable by Design*, arXiv:2604.23283v1 | high | no |
| `IDEA_SCAFFOLD_INVARIANT_COUNTERFACTUAL_CREDIT` | `[agent_inference] KILL` | Meng, *Policy-Conditioned Counterfactual Credit for Verifiable Reinforcement Learning of Long-Horizon Language Agents*, arXiv:2606.05263v1 | high | no |
| `IDEA_CAUSAL_RECOVERABILITY_REPRESENTATION` | `[agent_inference] KILL` | Sui et al., *TACT*, arXiv:2605.05980v1 | medium | no |
| `IDEA_FEEDBACK_DRIVEN_DIFFUSION_REPAIR` | `[agent_inference] KILL` | Jeon, Vuong, and Tao, *MDM-VGB*, arXiv:2606.28301v1 | high | no |

- `[direct_evidence]` The outcome counts are five `KILL`, one `MERGE`, two `NARROW`, one `PIVOT`, and one `SURVIVES_DIRECT_ATTACK`. Source: ten ledger `decision.outcome` fields.
- `[agent_inference]` Four candidates should enter `PRIOR_ART_ATTACK_CROSS_FIELD`: stagewise failure attribution with the diagnosis gate absorbed, narrowed actionable recoverability calibration, narrowed decision-value evidence routing, and the pivoted two-sided memory audit. Source: ledger `carry_forward_to_cross_field_attack` fields and decisions.

## Candidate-by-candidate attack

### IDEA_STAGEWISE_FAILURE_ATTRIBUTION

- `[direct_evidence]` *Failure as a Process* already annotates 1,794 trajectories with decisive error, loss-of-recoverability, and observability times; Aegis localizes failed subtasks and evaluates targeted environment optimizations; existing SE work supplies process taxonomies and tool-fault injection. Source: `ideas/prior-art/IDEA_STAGEWISE_FAILURE_ATTRIBUTION.yaml / works`.
- `[agent_inference]` Temporal failure description, recovery windows, root-cause classes, and targeted environment rescue are covered. The surviving delta is only a matched intervention: restore the same failure checkpoint and independently substitute evidence acquisition, derived state, next action, and validation while freezing earlier state, then test whether the rescue vector distinguishes identical visible loops and transfers across scaffolds. Source: same ledger / `decision.covered_*` and `decision.novelty_delta`.
- `[agent_inference]` The claim remains falsifiable through replay stability, stage separability, and held-out predictive comparisons. The likely rejection is artificial oracle replacement or collapse into another taxonomy. Source: same ledger / `decision.falsifiability` and `decision.reviewer_rejection`.

### IDEA_ORACLE_CONCURRENCE_TRAP

- `[direct_evidence]` CARE explicitly models shared confounders and includes 30 executable programmatic judges, while *Nine Judges, Two Effective Votes* measures only about 2.0-2.5 effective votes from nine nominal judges and an 8-22 point independence-null gap. Source: `ideas/prior-art/IDEA_ORACLE_CONCURRENCE_TRAP.yaml / works`.
- `[agent_inference]` Correlated errors, effective independence, dependence-aware aggregation, and executable judges are already covered. A software-intent dataset measuring checked-property overlap is only a domain replication, so the candidate is killed. Source: same ledger / `decision`.

### IDEA_ACTIONABLE_RECOVERABILITY_CALIBRATION

- `[direct_evidence]` AgentPRM predicts state promise and progress, QLASS estimates action values for search control, CSO uses fixed continuations to identify outcome-flipping actions, and *Failure as a Process* measures empirical loss of recoverability. Source: `ideas/prior-art/IDEA_ACTIONABLE_RECOVERABILITY_CALIBRATION.yaml / works`.
- `[agent_inference]` Terminal value, process progress, next-action value, and observational recoverability are covered. The narrowed delta is a same-checkpoint post-action rescue margin under a predeclared continuation and rescue policy, compared directly with both terminal-success probability and `Q(s,a)`, especially after compounding or irreversible edits. Source: same ledger / `decision.novelty_delta`.
- `[agent_inference]` The label is falsifiable but policy-dependent; reviewers can reject it as a relabeling of Q-value unless it predicts rescue distinctly under the same continuation policy. Source: same ledger / `decision.falsifiability`, `decision.reviewer_rejection`, and `decision.unverified_information`.

### IDEA_DECISION_VALUE_EVIDENCE_ROUTING

- `[direct_evidence]` *Inference-Time Budget Control for LLM Search Agents* already assigns retrieval, decomposition, and commit actions a marginal task-value score under budgets; *Cognitive Friction* jointly optimizes noisy source choice and stopping with belief-dependent value of information; When2Call and intervention-request policies cover call, ask, abstain, and help decisions. Source: `ideas/prior-art/IDEA_DECISION_VALUE_EVIDENCE_ROUTING.yaml / works`.
- `[agent_inference]` Generic VOI routing, cost-aware tool choice, when-to-call, and stopping are covered. The narrowed delta is paired access-versus-withholding at a restored code-agent checkpoint, asking whether the realized observation changes the argmax next action and independently validated outcome, discounted by measured acquisition and replay failure. Source: same ledger / `decision.novelty_delta`.
- `[agent_inference]` The likely rejection is a software-tool application of existing budget control unless action mediation and replay reliability are isolated. Source: same ledger / `decision.reviewer_rejection`.

### IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY

- `[direct_evidence]` Auto-Dreamer combines provenance-linked consolidation, harmful-memory filtering, omission, and counterfactual dropout utility; Memory-R1 learns ADD/UPDATE/DELETE/NOOP; A-MemGuard measures corrupted retained memory; *Plans Don't Persist* supplies controlled removal evidence. Source: `ideas/prior-art/IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY.yaml / works`.
- `[agent_inference]` The proposed memory policy is covered and cannot continue unchanged. The pivot is a pre-method causal audit: per-item removal, semantically plausible corruption, and exact restore at the same checkpoint, jointly measuring false-retention and false-deletion action costs under equal context budgets and testing existing policies against both. Source: same ledger / `decision.novelty_delta`.
- `[agent_inference]` The audit fails if item effects are too unstable or non-additive, and the original method would be rejected as Auto-Dreamer plus corruption handling and cold storage. Source: same ledger / `decision.falsifiability` and `decision.reviewer_rejection`.

### IDEA_CAUSAL_DIAGNOSIS_ACTION_GATE

- `[direct_evidence]` Causal Clarity evaluates whether failure explanations are causal and actionable; rationale intervention studies and counterfactual credit already connect intermediate explanations or actions to outcomes. Source: `ideas/prior-art/IDEA_CAUSAL_DIAGNOSIS_ACTION_GATE.yaml / works`.
- `[agent_inference]` The standalone gate is merged into stagewise failure attribution. Its retained role is the derived-state substitution cell: hold code, location, evidence, and budget fixed, replace only the diagnosis with fact-preserving paraphrases or controlled causal substitutions, and measure the changed executable action and hidden outcome. Source: same ledger / `decision.novelty_delta`.

### IDEA_REVERSIBILITY_AWARE_COMMIT_CONTROL

- `[direct_evidence]` *Revisable by Design* formalizes Idempotent/Reversible/Compensable/Irreversible actions, external-state rollback, and compensation; Safety Sentry routes individual actions by irreversible risk; ToolEmu simulates consequences; TraceCoder uses code checkpoints. Source: `ideas/prior-art/IDEA_REVERSIBILITY_AWARE_COMMIT_CONTROL.yaml / works`.
- `[agent_inference]` Only a factorial interaction among reversibility, action chunk size, and validation depth remains, and that extension is not enough to distinguish the candidate from the direct combination. The candidate is killed. Source: same ledger / `decision`.

### IDEA_SCAFFOLD_INVARIANT_COUNTERFACTUAL_CREDIT

- `[direct_evidence]` CVT-RL, C3, CRAFT, and CSO cover counterfactual local credit, frozen continuations, exact restoration, verified action flips, and single-agent tool environments. Source: `ideas/prior-art/IDEA_SCAFFOLD_INVARIANT_COUNTERFACTUAL_CREDIT.yaml / works`.
- `[agent_inference]` Filtering labels whose effect sign agrees across scaffolds is a data-selection rule over occupied mechanisms, not a standalone novelty delta. The candidate is killed despite retaining a testable transfer criterion. Source: same ledger / `decision`.

### IDEA_CAUSAL_RECOVERABILITY_REPRESENTATION

- `[direct_evidence]` TACT learns and causally steers hidden failure axes in coding agents; Multi-Head Latent Control maps hidden trajectories to clarification, tool, abstain, direct-answer, and handoff decisions; *Doomed from the Start* uses hidden-state probes to abort eventual failures; ASA gates rescue and stop-avoidance steering. Source: `ideas/prior-art/IDEA_CAUSAL_RECOVERABILITY_REPRESENTATION.yaml / works`.
- `[agent_inference]` Internal failure prediction, action control, activation steering, and coding-agent outcome gains are covered. Only branch-derived action-conditional rescue labels and their separation from difficulty/action identity remain, which is a natural recombination of TACT, latent failure probes, and existing action controllers. The candidate is killed. Source: same ledger / `decision`.
- `[agent_inference]` Confidence is medium because the exact rescue-margin label has not been tested and TACT is marked work in progress; this uncertainty does not restore a standalone mechanism claim. Source: same ledger / `decision.confidence` and `decision.unverified_information`.

### IDEA_FEEDBACK_DRIVEN_DIFFUSION_REPAIR

- `[direct_evidence]` MDM-VGB performs verifier/value-guided arbitrary-position remasking and repairs low-reward samples; R3 implements process-score-to-remask-to-refine; a NeurIPS 2025 paper directly uses diffusion as a code repair operator; DRR detects and remasks unsupported spans while measuring preservation; CORE selects context-brittle code tokens and beats compute-matched remasking controls. Source: `ideas/prior-art/IDEA_FEEDBACK_DRIVEN_DIFFUSION_REPAIR.yaml / works`.
- `[agent_inference]` Diffusion repair, external guidance, targeted remasking, localized preservation, and code-domain revision are covered across this direct combination. Executable test/analyzer feedback plus dependency localization is only a feedback instantiation, so the candidate is killed. Source: same ledger / `decision`.

## Carry-forward novelty deltas

- `[agent_inference]` `IDEA_STAGEWISE_FAILURE_ATTRIBUTION`, with `IDEA_CAUSAL_DIAGNOSIS_ACTION_GATE` absorbed: matched four-stage oracle substitution at one restored checkpoint, producing a rescue vector across evidence, derived state, next action, and validation, with cross-scaffold prediction. Source: both ledgers / `decision.novelty_delta`.
- `[agent_inference]` `IDEA_ACTIONABLE_RECOVERABILITY_CALIBRATION`: post-action rescue margin under a fixed continuation/rescue policy, explicitly separated from terminal success and `Q(s,a)` at the same checkpoint. Source: its ledger / `decision.novelty_delta`.
- `[agent_inference]` `IDEA_DECISION_VALUE_EVIDENCE_ROUTING`: paired realized-observation value defined by a changed best next action and independently validated outcome, discounted by observed acquisition/replay reliability. Source: its ledger / `decision.novelty_delta`.
- `[agent_inference]` `IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY`: a causal audit, not a new policy, jointly pricing false retention and false deletion through per-item remove, plausible corruption, and exact restore under equal budgets. Source: its ledger / `decision.novelty_delta`.

## Confidence and phase boundary

- `[direct_evidence]` Five decisions have high confidence and five have medium confidence; none is labeled low confidence. Medium confidence is driven by recent preprints, unstable replay or label constructs, non-unique diagnoses, and untested exact residual combinations. Source: ten ledger `decision.confidence` and `decision.unverified_information` fields.
- `[agent_inference]` Four candidates are sufficient for cross-field attack. The next phase may challenge those four through adjacent fields but must not revive killed candidates, generate new candidates, select a final direction, or begin experiments unless separately requested. Source: ledger carry-forward flags; `AGENTS.md / Phase Discipline`; requested phase boundary.
- `[agent_inference]` This report completes only `PRIOR_ART_ATTACK_DIRECT`; it does not establish novelty for any surviving delta. Source: search limitations and `AGENTS.md / Evidence and Claims`.

## Validation

- `[direct_evidence]` Validation results are recorded in `state/checkpoint.yaml / prior_art_direct_attack.validation` after the final structure, claim, URL, citation-locator, repository-test, and whitespace checks. Source: fresh local verification executed for this phase.
