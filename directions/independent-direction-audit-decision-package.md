# Independent Direction Audit Decision Package

## Candidate and ruling

- Candidate: `FINALIST_STAGEWISE_CAUSAL_RESCUE_PROFILES`.
- Phase: `INDEPENDENT_DIRECTION_AUDIT`.
- Ruling: `REVISE_BEFORE_PILOT`.
- Pilot authorization: `false` until the bounded revisions below are completed and audited.
- Experiment status: no experiment, model call, task download, training, or implementation was started.

## Scores

| Dimension | Score |
|---|---:|
| Novelty | 2/4 |
| Rigor | 2/4 |
| Relevance | 3/4 |
| Verifiability & Transparency | 2/4 |
| Feasibility | 2/4 |

## Strengths

- `[agent_inference]` The remaining question is concrete: compare conditional rescue effects at a restored code-agent checkpoint rather than add another endpoint-only failure taxonomy. Source: `reports/independent-direction-audit-report.md`, `Core claim audit`.
- `[direct_evidence]` The proposed design records exact environment and transcript state, single-interface payload rules, untouched replay, harmful controls, hidden behavior checks, and cluster-aware units. Source: `directions/minimum-kill-pilot.md`.
- `[direct_evidence]` The question targets documented gaps in evidence acquisition, derived-state fidelity, diagnosis-to-action validity, and checkable acceptance versus intended semantics. Source: `synthesis/cross-paper-synthesis.md`, `P2`, `P3`, `P5`, and `P7`.

## Weaknesses

- `[agent_inference]` The four substitutions are total downstream assistances with overlapping information and state effects; they do not yet identify endogenous causal bottlenecks. Source: `reports/independent-direction-audit-report.md`, `Interface identifiability audit`.
- `[direct_evidence]` DoVer, CodeTracer, Coherence Collapse, FALAT, AgenTracer, AuditRepairBench, FlowFixer, and Shepherd already cover major parts of trajectory diagnosis, counterfactual replay, checkpoint recovery, channel surgery, and diagnosis-driven repair. Sources: their primary papers listed in the audit report.
- `[agent_inference]` The proposed 20-task, six-repository, 30-40-checkpoint, three-repeat pilot is too small and too selected for the stated cross-scaffold/model heterogeneity claim, and its hidden correctness oracle remains incomplete for alternative valid fixes. Source: `reports/independent-direction-audit-report.md`, `Minimum pilot audit`.

## Required bounded revisions

1. Fix the estimand and define native E/S/A/V contracts per scaffold. Remove any causal-bottleneck wording that is not supported by the contract.
2. Make untouched replay the primary comparator; retain neutral sham and harmful controls separately. Freeze oracle provenance, leak checks, intent adjudication, and inconclusive handling before screening.
3. Use at least five independent continuation repeats and at least 48 valid checkpoints across eight repositories, or explicitly narrow the pilot to feasibility and remove transfer claims. Add CodeTracer/Coherence-style process baselines and a DoVer/FALAT-style intervention baseline, with hierarchical cluster intervals and threshold sensitivity fixed in advance.

Revisions 1 and 2 are mandatory before any experiment. Revision 3 is mandatory for a transfer claim; its empirical heterogeneity, replay, and baseline portions can be answered by the revised pilot.

## Decision basis

- `[agent_inference]` Novelty boundary: plausible only as a narrowly scoped code-agent applicability boundary, not as a new causal method, taxonomy, recovery-window concept, or checkpoint protocol. Source: `reports/independent-direction-audit-report.md`, `Independent novelty-boundary recheck`.
- `[agent_inference]` Intervention identifiability: not established. Source: `reports/independent-direction-audit-report.md`, `Interface identifiability audit`.
- `[agent_inference]` Minimum pilot sufficiency: not established at the declared scale. Source: `reports/independent-direction-audit-report.md`, `Minimum pilot audit`.
- `[agent_inference]` A positive revised result could support a narrow conditional rescue-profile finding; a negative revised result could support a construct-validity and marginal-value boundary. Neither result would justify a universal agent law without broader evidence. Source: `reports/independent-direction-audit-report.md`, `Positive and negative result value`.

