# Deep Reading Synthesis Across 42 Papers

## Scope and evidence ledger

- `[direct_evidence]` The synthesis covers 42 selected papers, exactly six in each of seven mechanism clusters and 21 in each reading batch. Source: `synthesis/deep-reading-selection.json / summary`; `cards/*.yaml / phase and primary_mechanism_cluster`.
- `[direct_evidence]` Batch 2 has 21 cards: 13 are based on full manuscripts, seven on an official abstract plus an official/author artifact, and one on an official abstract and publisher record only. Source: `cards/* / metadata.evidence_access` for `phase=DEEP_READING_BATCH_2`.
- `[agent_inference]` Artifact and abstract evidence is retained rather than silently treated as full-paper evidence; unavailable sampling, statistics, ablations, limitations, and threats are explicit evidence gaps. Source: Batch 2 card metadata and evidence gaps.
- `[direct_evidence]` The 42-row comparison records signal source, availability, offline/online use, affected decision, causal status, validation, assumptions, failure boundaries, and reusable assets. Source: `synthesis/cross-paper-comparison.csv`.

## Reassessment of the five Batch 1 findings

### 1. Offline diagnosis versus online decision intervention: prevalence claim overturned, causal-evidence claim narrowed

- `[direct_evidence]` In the 42-row comparison, 21 papers are classified `online_use`, one `online_use_evaluated_offline`, and five `offline_training_online_use`; the remaining 15 are offline analysis, preprocessing, ranking, or training without an online controller. Source: `synthesis/cross-paper-comparison.csv / use_mode`.
- `[agent_inference]` The literal Batch 1 impression that offline diagnosis is generally more prevalent than online signal use is therefore overturned: 27/42 works consume a signal online or deploy a learned policy online. Source: the preceding count.
- `[agent_inference]` A narrower claim remains supported: clean prospective evidence that a signal selects a better action is uncommon. Stronger examples include ADI, AutoRocq, Event-B Agent, TestPrune's positive and negative cases, TraceCoder, the execution-access intervention, AdaDec, Atropos, EvidenT, RustForger, and value-guided SEER; many others inject context and infer action value from endpoint ablations. Source: corresponding cards / `conclusion_evidence`; cross-paper comparison / `causal_status`.
- `[agent_inference]` Cluster asymmetry matters: failure-loop studies remain diagnosis-heavy (four of six primarily characterize traces or injected failures), while planning, state, and training clusters contain more online mechanisms. Source: cluster rows in the cross-paper comparison.

### 2. More tests, retrieval, tools, samples, or reasoning can hurt: strongly supported with boundary conditions

- `[direct_evidence]` Execution helps 29 and hurts 24 paired cases, with no significant Prohibited-Unrestricted difference across six controlled cells; commercial Fail-to-Fail agents pass their own validation in 81-100% of cases. Source: `cards/ISSTA2026_to-run-or-not-to-run-analyzing-the-cost-effectiveness-of-code-execution-.yaml / evaluation.main_results`.
- `[direct_evidence]` ExpeRepair peaks at top-3 retrieval and falls at top-5, then plateaus or degrades beyond roughly 15-20 semantic insights; REMOVE is necessary to prevent noisy accumulation. Source: `cards/FSE2026_experepair-dual-memory-enhanced-llm-based-repository-level-program-repai.yaml / evaluation.main_results and failure_modes`.
- `[direct_evidence]` APR Traceability finds that higher-temperature sampling increases distinct failure types but reduces reproduction success; SEER finds failed reasoning is often longer, N=5 adds no meaningful gain over N=3, and stricter filtering trades accuracy for compression. Source: the APR Traceability and CoT-compression cards / `evaluation.main_results`.
- `[direct_evidence]` Batch 1 already contains selected-test early-stop regressions and CoT overthinking; Batch 2 therefore replicates the non-monotonic pattern across execution, retrieval, memory, sampling, and reasoning length. Source: TestPrune and ICSE SEER cards; Batch 2 cards cited above.
- `[direct_evidence]` The counter-boundary is equally important: targeted additional iterations improve TraceCoder and EvidenT throughout their tested ranges, and more Code-MUE samples/probes improve signal with diminishing returns. Source: TraceCoder, EvidenT, and Code-MUE cards / `evaluation.main_results`.
- `[agent_inference]` The supported claim is not "more compute is harmful"; it is that quantity has no monotone value without signal quality, task timing, context capacity, and an aligned validation oracle. Source: all preceding evidence.

### 3. Tests, formal verification, coherent reasoning, and task intent diverge: strongly supported and broadened

- `[direct_evidence]` Running all developer tests reveals 7.8% of SWE-bench plausible patches as incorrect, while PatchDiff flags 29.6% as behaviorally divergent and leaves 66.2% of its audited suspicious sample uncertain because intent is underspecified. Source: `cards/ICSE2026_are-solved-issues-in-swe-bench-really-solved-correctly-an-empirical-stud.yaml / evaluation.main_results and failure_modes`.
- `[direct_evidence]` Agent-selected validation can pass while official evaluation fails, SAINT tests retain hard-coded state/setup/cleanup and weak assertions, and EvidenT explicitly limits its endpoint to build success rather than runtime correctness. Source: To Run, SAINT, and EvidenT cards / `failure_modes` and `limitations`.
- `[direct_evidence]` CES shows coherent execution simulation and final correctness are distinct, while Code-MUE documents near-zero uncertainty around a consistently wrong interpretation. Source: CES and Code-MUE cards / `conclusion_evidence` and `failure_modes`.
- `[agent_inference]` Rocq/Event-B/Move/SMT checks establish properties of their formal encodings, not that the encoding captures user intent; Deductive Steering makes this dependency especially visible because the solver checks an LLM-generated constraint. Source: AutoRocq, Event-B, MSG, and Deductive Steering cards / `assumptions`.
- `[agent_inference]` The stable discrepancy is between an executable/checkable proxy and intended semantics, not a general failure of tests or formal methods. Stronger feedback still improves many tasks, but it cannot validate what it does not encode. Source: PatchDiff, formal-method, TraceCoder, and EvidenT cards.

### 4. State, memory, and evidence representations rely on unverified fidelity: strongly supported and sharpened

- `[direct_evidence]` Watson's native and reconstructed traces diverge in 95/307 (30.9%) same-answer cases, and its downstream localization gains are not significant. Source: `cards/ASE2025_watson-a-cognitive-observability-framework-for-the-reasoning-of-llm-powe.yaml / evaluation.main_results`.
- `[agent_inference]` ExpeRepair summaries, ReinFix root-cause strings, Atropos graph embeddings, AttnCompress proxy attention, CausalRepair slices, Code-MUE probes, SpecGuru summaries, and endpoint-derived SEAlign node scores each compress a richer process into a decision state without independently validating all lost semantics. Source: those cards / `assumptions` and `evidence_gaps`.
- `[direct_evidence]` More externally grounded representations reduce but do not remove the assumption: ADI/RustForger traces cover observed executions, EvidenT clean builds cover build behavior, and formal checkers cover their encoded obligations. Source: ADI, RustForger, EvidenT, and formal-method cards / `limitations`.
- `[agent_inference]` "Faithful enough for the next decision" is the common untested mediator. Most papers validate endpoint improvement, not whether the representation is factually complete, causally correct, or robust to deliberate corruption. Source: cross-paper comparison / `main_assumption` and `failure_boundary`.

### 5. Recovery bottleneck: narrowed from one dominant cause to a staged constraint chain

- `[direct_evidence]` Evidence acquisition can fail first: generated reproducers trigger bugs only 41-57%, and EvidenT failures are more often associated with unusable/inconsistent evidence than systematic tool misuse. Source: APR Traceability and EvidenT cards / `evaluation.main_results` and `failure_modes`.
- `[direct_evidence]` State/localization can matter: ADI, PingFL, TraceCoder, RustForger, and CausalRepair all add runtime or dependency state; however, commercial agents in the controlled execution study localize above 95% even without execution. Source: corresponding cards; To Run / `evaluation.main_results`.
- `[direct_evidence]` Action selection remains a separate bottleneck: ReinFix assumes perfect localization yet improves from 85 fixes without ingredients to 146 with internal and external action context; TraceCoder's rollback/iteration removal causes large losses. Source: ReinFix and TraceCoder cards / `evaluation.main_results`.
- `[direct_evidence]` Validation/intent can be the final bottleneck even after a plausible action: PatchDiff and the execution-access study show locally passing patches that fail broader or official behavior. Source: PatchDiff and To Run cards.
- `[agent_inference]` No universal winner among root-cause identification, state judgment, and action strategy survives all 42 papers. Recovery is gated by reproducible evidence, adequate state, an action policy, and an intent-aligned oracle; which gate dominates depends on task and trajectory stage. Source: all preceding evidence.

## Seven mechanism clusters

### 1. Failure loops and recovery

- `[agent_inference]` The cluster splits four diagnostic works from two direct recovery controllers. Understanding Agents, Beyond Final Code, APR Traceability, and AgentInspect characterize patterns or perturbations; ADI and TraceCoder expose runtime state and change subsequent actions. Source: six cluster cards.
- `[direct_evidence]` ADI links executable frame state to improved localization/repair, while TraceCoder's instrumentation, lesson, rollback, and iteration ablations lower BigCodeBench-Complete from 89.04% to 78.51%, 86.75%, 84.55%, and 53.77%, respectively. Source: ADI and TraceCoder cards / main results.
- `[agent_inference]` Repetition is usually a symptom, not the root bottleneck: poor reproduction, invisible runtime state, non-actionable feedback, or an inadequate rollback rule can all produce the same visible loop. Source: four diagnostic cards plus ADI/TraceCoder failure analyses.

### 2. Planning, action, tool use, and stopping

- `[agent_inference]` External checkers can control actions effectively when the state/action language is well defined: Rocq, Event-B, symbolic predicate checks, SMT, and HTTP execution all cause pruning, repair, or backtracking. Source: Locus, AutoRocq, Event-B, Deductive Steering, and SAINT cards.
- `[direct_evidence]` The execution-access intervention prevents this cluster from concluding that more tool use is better: average outcome changes are statistically negligible, and complex multi-hunk tasks can worsen with unrestricted execution. Source: To Run card / Tables 2-3 and 13.
- `[agent_inference]` The unresolved problem is selective invocation under representation risk: formal/structural feedback is useful only if the constraint, dependency graph, or test action is aligned with the actual task. Source: all six cluster cards / assumptions.

### 3. Test, execution, and analysis feedback

- `[agent_inference]` Test selection and probe relevance matter more consistently than test count. TestPrune, IssueExec, PingFL, SpecGuru, and PatchDiff all narrow feedback to suspicious behavior, yet each depends on coverage or generated-test adequacy. Source: five named cards.
- `[direct_evidence]` PatchDiff provides the cluster's strongest intent warning; TestPrune provides both positive and negative online cases; PingFL and SpecGuru have plausible online mechanisms but inaccessible manuscript-level effect evidence. Source: corresponding cards / evidence access and main results.
- `[agent_inference]` CES shows an additional boundary: even a rich execution trace can diagnose reasoning inconsistency only after generation unless a controller consumes the first divergence. Source: CES card.

### 4. State, memory, specification, and constraint preservation

- `[agent_inference]` Explicitly typed and refreshed state is more defensible than undifferentiated context: StepFly uses DAG/node states, MSG uses prover errors, LogicHunter separates investigation/verdict memory, and EvidenT uses temporal evidence slots. Source: four named cards / technical mechanisms.
- `[direct_evidence]` ExpeRepair and AttnCompress show that retained context is non-monotonic: more retrieved memories degrade after top-3, and the AttnCompress artifact's 53.17% compressed average is below the 55.17% uncompressed average despite outperforming compression baselines. Source: ExpeRepair and AttnCompress cards / main results.
- `[agent_inference]` EvidenT has the strongest within-task grounding because every iteration is rebuilt, but even it validates build state rather than runtime intent. Source: EvidenT card / conclusion evidence and limitations.

### 5. Outcome, progress, and uncertainty signals

- `[agent_inference]` Only AdaDec and Atropos provide strong direct signal-to-action evidence; LAT, Clotho, and Code-MUE evaluate ranking/ordering/rejection, and Watson reconstructs state after the decision. Source: six cluster cards.
- `[direct_evidence]` Atropos can retain 74.35% of AutoFL target performance at 23.90% cost, while Code-MUE correlations reach -0.987 and wins 26/32 AUROC cells; neither establishes general calibration to task intent. Source: Atropos and Code-MUE cards / main results.
- `[agent_inference]` Confidence is a control signal, not correctness: Code-MUE consensus can be unanimously wrong, Watson reasoning is non-unique, and AdaDec does not consistently beat beam search. Source: those cards / failure modes and within-cluster comparisons.

### 6. Debugging, root cause, and repair decisions

- `[agent_inference]` The strongest evidence concerns improving repair context and action ingredients, not independently correct root-cause explanations. ReduceFix validates a smaller failure-preserving input, RustForger supplies runtime traces, ReinFix retrieves dependencies/fix patterns, and CausalRepair supplies slices. Source: four named cards.
- `[direct_evidence]` ReinFix reaches 146 fixes with both ingredient types versus 85 with neither while assuming perfect localization; CausalRepair packages 313 claimed correct patches but lacks accessible component tables. Source: ReinFix and CausalRepair cards.
- `[agent_inference]` RISC-V RCA contributes only an abstract-level offline diagnosis claim, so it cannot support action-control conclusions; the cluster should not be made symmetric by treating it like an online repair method. Source: RISC-V RCA card / evidence access.

### 7. Training, process supervision, and policy optimization

- `[agent_inference]` Training work increasingly targets intermediate actions, but most labels still originate from terminal tests or gold patches: ToolTrain uses gold-function nDCG, MCTS-Refine uses gold-visible exact match, ICSE SEER uses terminal tests/value propagation, SEAlign uses subtree endpoint success, SWE-PDB uses rule-based tests, and compression SEER selects passing traces. Source: six cluster cards / assumptions.
- `[direct_evidence]` Fine-grained controls matter: SEAlign's full critical-action pipeline reaches 17.7% Lite versus 13.0% SFT-only and 5.3% whole-trajectory DPO; its OpenHands-trained model drops to 5.7% under AutoCodeRover. Source: SEAlign card / main results.
- `[direct_evidence]` Process length is non-monotonic: compression SEER reports longer failed generations, no meaningful N=5 benefit over N=3, and an accuracy loss under overly strict filtering. Source: compression SEER card / main results.
- `[agent_inference]` Endpoint-supervised process optimization improves behavior but does not make intermediate rationales or values faithful; scaffold transfer remains an empirical weakness rather than an assumed property. Source: all six cluster cards.

## Cross-cluster contradictions and pressure points

- `[agent_inference]` Targeted iterative feedback can be strongly positive (TraceCoder, EvidenT), while unrestricted execution is neutral on average and harmful in paired cases. The missing variable is not iteration count alone but actionability, timing, and validation alignment. Source: TraceCoder, EvidenT, and To Run cards.
- `[agent_inference]` Formal verification removes logical-invalid paths, yet an unfaithful formalization can make a clean proof irrelevant to intent. Source: AutoRocq, Event-B, MSG, and Deductive Steering assumptions.
- `[agent_inference]` Memory and compression expose a two-sided risk: retaining noise harms decisions, but dropping low-scored evidence also harms decisions. No paper directly estimates both false-retention and false-deletion costs. Source: ExpeRepair and AttnCompress cards.
- `[agent_inference]` Coherent or plausible reasoning is not uniquely identifiable from an endpoint: CES separates coherence from correctness, Watson finds divergent same-answer traces, and Code-MUE finds confident wrong consensus. Source: those three cards.
- `[agent_inference]` Diversity can reveal alternatives without improving success: APR Traceability's higher temperature increases error diversity while lowering reproduction success; DiffuCoder's dLLM results below show the same separation between sample diversity and pass@1. Source: APR Traceability card; `synthesis/dllm-adjacent-watchlist.md`.

## Shared assumptions

- `[agent_inference]` Tests, checkers, builds, or developer patches adequately encode the intended task. Supporting sources: cross-paper comparison / `validation_feedback` and `main_assumption`.
- `[agent_inference]` Failures can be reproduced stably enough that traces, slices, reduced inputs, and build feedback remain comparable. Supporting sources: ADI, RustForger, ReduceFix, CausalRepair, and EvidenT cards.
- `[agent_inference]` A compressed state is faithful enough for the next action: summaries, retrieved root causes, proxy attention, graph embeddings, hidden-state directions, and partial-path values all depend on this mediator. Supporting sources: ExpeRepair, ReinFix, AttnCompress, Atropos, LAT, Watson, SEAlign, and SEER cards.
- `[agent_inference]` Historical experience and training trajectories remain relevant under repository, framework, model, and tool-interface shift. Supporting sources: prior-knowledge, ExpeRepair, ToolTrain, SEAlign, and SWE-PDB cards.
- `[agent_inference]` Endpoint reward can assign useful credit to intermediate reasoning/actions. Supporting sources: ToolTrain, MCTS-Refine, both SEER papers, SEAlign, and SWE-PDB cards.
- `[agent_inference]` Cost and outcome comparisons remain meaningful across different context lengths, model providers, parallelism, and tool overhead. Supporting sources: To Run, Atropos, AttnCompress, and TraceCoder cards.

## Evidence gaps before cross-paper synthesis

- `[agent_inference]` Prospective policies that choose which signal/tool/test to acquire, rather than merely consuming a fixed signal or comparing fixed budgets, remain rare. Source: cross-paper comparison / affected decisions and causal status.
- `[agent_inference]` Representation-fidelity interventions are almost absent: few studies deliberately corrupt, omit, or contradict state and measure whether the controller detects the corruption. Source: card evidence gaps across state, uncertainty, and debugging clusters.
- `[agent_inference]` Independent root-cause and intermediate-action labels are scarce; endpoint success is repeatedly reused as supervision. Source: debugging and training cluster cards.
- `[agent_inference]` Intent-aware validation beyond tests, formal encodings, builds, or oracle patches remains unresolved, and PatchDiff shows that stronger differential behavior can increase uncertainty rather than settle it. Source: PatchDiff and formal/state cluster cards.
- `[agent_inference]` Cross-framework, cross-model, cross-language, and temporal transfer is usually weakly tested; SEAlign provides direct negative transfer evidence. Source: card limitations and SEAlign Table 8.
- `[direct_evidence]` Eight Batch 2 manuscripts were inaccessible: seven have inspectable artifacts plus official abstracts, and RISC-V RCA has only an official abstract/publisher record. Source: Batch 2 card metadata / `evidence_access`.

## Version, access, and data consistency audit

- `[direct_evidence]` The eight inaccessible manuscripts are AgentInspect, Deductive Steering, PingFL, SpecGuru, AttnCompress, CausalRepair, SWE-PDB, and RISC-V RCA. A fresh official-record, OpenAlex, artifact-package, and exact-title access audit found artifacts for the first seven and closed publisher metadata only for RISC-V RCA, but no hidden manuscript in the inspected packages. Source: corresponding card metadata and access audits, 24-25 July 2026.
- `[direct_evidence]` AttnCompress's official abstract reports a 53.17% average pass rate relative to compression baselines, while the artifact's three uncompressed rows average 55.17%; the artifact therefore supports a cost-quality trade-off, not accuracy preservation against no compression. Source: AttnCompress card / artifact `result/analysis_results_table1.csv`.
- `[direct_evidence]` The CoT-compression SEER manuscript reports 236/261 truncations as 90.4%, then labels the same count 91.8%; its public manuscript title also differs from the official ISSTA title. Source: CoT-compression SEER card / Section 3.1.2, Finding 2, title page, and official event record.
- `[direct_evidence]` SpecGuru mentions RANSAC in an RQ2 header, but repository-wide source inspection found no implementation beyond that comment; no manuscript or packaged result outputs were available to resolve its role. Source: SpecGuru card / artifact `RQ2-3.py` and repository-wide source search.
- `[direct_evidence]` Atropos's RepairAgent target-model outcome in Table 4 extrapolates ten-sample GPT-4o performance from one target-model run, so that row is weaker than the non-extrapolated AutoFL and AutoCodeRover evidence. Source: Atropos card / Section 5.3, Table 4, and extrapolation note.
- `[direct_evidence]` The Repair Ingredients manuscript lists Kai Huang, while the official corpus/selection metadata lists Kevin Huang; the card retains the official author field and records the manuscript discrepancy. Source: Repair Ingredients card / manuscript title page and corpus record.
- `[direct_evidence]` The official Code-MUE title contains `LLM'`, while the manuscript uses `LLMs’`; the card retains the official title for identity matching and records the manuscript form. Source: Code-MUE card / official ISSTA event record and manuscript title page.

## Value shifts relative to selection

- `[agent_inference]` Higher than expected: To Run supplies unusually clean positive and negative execution interventions; PatchDiff quantifies both false acceptance and residual intent ambiguity; Watson directly challenges reasoning fidelity; ExpeRepair exposes non-monotonic memory; EvidenT closes a state-to-action-to-build loop; compression SEER supplies direct negative-return evidence. Source: corresponding cards / relevance reassessment.
- `[agent_inference]` Lower than expected: AgentInspect tests failures but not recovery; RISC-V RCA remains abstract-only and diagnosis-only; Deductive Steering lacks an encoding-fidelity audit and packaged full results; SpecGuru's stated RANSAC role is not visible in the artifact; AttnCompress loses accuracy relative to no compression; SWE-PDB and CausalRepair lack accessible component-result tables. Source: corresponding cards / relevance reassessment and evidence gaps.

## Phase boundary

- `[agent_inference]` These records preserve contradictions, unresolved questions, and pressure points only. No final research idea, complete method proposal, novelty claim, or promoted direction is generated in this phase. Source: requested phase boundary and absence of idea artifacts.
