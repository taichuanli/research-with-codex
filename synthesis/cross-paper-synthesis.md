# Cross-Paper Mechanism Synthesis

## Scope, phase gate, and evidence contract

- `[direct_evidence]` The workspace entered this phase from `DEEP_READING_COMPLETED`: all 42 selected papers have cards, the seven mechanism clusters each contain six papers, and the requested Batch 1 synthesis, complete synthesis, comparison table, and dLLM watchlist were present. Source: `state/checkpoint.yaml / deep_reading_completed and next_phase`; `config/research_scope.yaml / deep_reading_progress`.
- `[direct_evidence]` The unified mechanism matrix has 42 data rows and records, for every paper, the observable signal, availability time, affected action, offline/online use, causal status, feedback channels, validation, assumptions, failure boundary, reusable assets, and evidence-access weight. Source: `synthesis/unified-mechanism-matrix.csv / header and 42 data rows`; phase validation recorded in `state/checkpoint.yaml`.
- `[direct_evidence]` Evidence access is 34 full texts, seven official abstracts plus inspectable artifacts, and one official abstract/publisher record only. Source: `synthesis/unified-mechanism-matrix.csv / evidence_access`; the 42 cards' `metadata` fields.
- `[agent_inference]` Evidence weight here means access-based auditability, not truth: `high` permits manuscript-level method/result/threat checks, `moderate` permits artifact-mechanism and packaged-result checks but not a complete paper audit, and `low` retains only the authors' abstract-level claim plus access-bounded inference. Source: matrix `evidence_access` and `evidence_weight`; Batch 2 card access audits.
- `[agent_inference]` This phase performs mechanism synthesis only. It does not create a complete research idea, select a method, design an experiment, claim novelty, or promote state understanding plus decision control as a preferred direction. Source: requested phase boundary and the contents of this report.

## Unified mechanism matrix

### Reading the fields

| Matrix field | Operational meaning in this synthesis | Boundary |
|---|---|---|
| `signal_source` and `signal_available_when` | `[agent_inference]` What can be observed and whether it exists before generation, after a tool step, after an attempt, or only after a completed run. | `[agent_inference]` A post-hoc signal cannot be counted as live control unless a later action actually consumes it. Source: complete synthesis / Reassessment 1. |
| `affected_action_or_decision` and `use_mode` | `[agent_inference]` The concrete decision changed by the signal and whether use is offline, downstream, online, or learned offline and deployed online. | `[agent_inference]` Online availability alone does not establish that the changed action is better. Source: matrix rows and paper-card `conclusion_evidence`. |
| `causal_status` | `[agent_inference]` The strongest design actually available, preserving distinctions among correlation, fault injection, controlled access, component ablation, downstream comparison, and author claim. | `[agent_inference]` Component removal can support mechanism contribution without identifying which intermediate state or action caused the endpoint change. Source: matrix `causal_status`; training and state cards. |
| `feedback_channels` and `validation_feedback` | `[agent_inference]` Execution, testing, program analysis, formal checking, memory, trajectory, model-internal, judge, build, and human feedback are kept separate. | `[agent_inference]` These channels observe different objects and cannot be pooled as a generic quantity of feedback. Source: matrix `feedback_channels`; seven cluster syntheses. |
| `main_assumption` and `failure_boundary` | `[agent_inference]` The mediator that must remain valid for the signal to guide the next decision, and the setting in which it can fail. | `[agent_inference]` Endpoint improvement does not by itself validate the mediator. Source: Watson, CES, ExpeRepair, SEAlign, and formal-method cards. |

### Cross-matrix findings

- `[direct_evidence]` Twenty-one works use their focal signal online, one evaluates online use through controlled offline analysis, and five train offline policies that consume state online; 15 remain offline analysis, preprocessing, ranking, or training. Source: `synthesis/unified-mechanism-matrix.csv / use_mode`.
- `[agent_inference]` The 27/42 online-or-deployed count overturns any literal claim that this corpus is dominated by offline diagnosis. It does not overturn the narrower finding that prospective causal evidence for choosing the right future action is uncommon. Source: matrix `use_mode` and `causal_status`; complete synthesis / Reassessment 1.
- `[direct_evidence]` Benchmark tests appear in 21 feedback-channel classifications, while execution, static analysis, dynamic analysis, retrieval, traces, formal checking, memory, model internals, and human or model judgment appear in smaller, overlapping subsets. Source: generated matrix / `feedback_channels`; matrix verification count.
- `[agent_inference]` The matrix therefore supports a heterogeneous control landscape rather than a single state-signal story: the same endpoint test can supervise localization, token choice, tool policy, memory, rollback, or proof search, and each use has a different failure boundary. Source: TestPrune, AdaDec, ToolTrain, ExpeRepair, TraceCoder, and formal-method rows.

## Failure and recovery chain

### Stage 1: evidence acquisition

- `[direct_evidence]` Runtime or executable evidence is actively acquired by ADI, TraceCoder, RustForger, PingFL, TestPrune, IssueExec, SpecGuru, SAINT, CausalRepair, ReduceFix, Code-MUE, and EvidenT; AgentInspect instead perturbs tool evidence to test visibility of failures. Source: corresponding cards / `technical_mechanisms`; matrix `feedback_channels`.
- `[direct_evidence]` Formal works acquire proof states, counterexamples, compiler errors, or symbolic counterexamples; memory works retrieve histories or preserve build/trajectory observations; internal-signal works read hidden states, entropy, partial trajectory graphs, or reconstructed reasoning. Source: AutoRocq, Event-B, MSG, Locus, Deductive Steering, ExpeRepair, AttnCompress, LAT, Clotho, AdaDec, Atropos, and Watson cards.
- `[agent_inference]` The weak link is acquisition choice. Most methods consume a fixed signal type or compare fixed budgets; To Run causally varies access but does not learn or validate a prospective choice of which execution to request next. Source: To Run card / `conclusion_evidence` and `evidence_gaps`; complete synthesis / evidence gaps.
- `[direct_evidence]` Acquisition can fail before reasoning begins: generated reproducers trigger only 41-57% of bugs, IssueExec reports 33.30% of ground-truth functions uncovered even by full suites, and EvidenT attributes many failures to unusable or inconsistent evidence. Source: APR Traceability Sections 6.1.3-6.1.4; IssueExec Section 6.1; EvidenT Section 5.6.

### Stage 2: state localization or representation

- `[direct_evidence]` State is represented as runtime frames or traces (ADI, TraceCoder, RustForger, PingFL), suspicious locations or slices (IssueExec, CausalRepair, ReduceFix, ReinFix), proof/model state (AutoRocq, Event-B, MSG, Deductive Steering), typed workflow or memory state (StepFly, LogicHunter, ExpeRepair, AttnCompress, EvidenT), and predictive latent or graph state (LAT, Clotho, AdaDec, Atropos, Watson, Code-MUE). Source: named cards / `technical_mechanisms`; unified matrix / `signal_source`.
- `[agent_inference]` Offline diagnosis studies occupy this stage without crossing into recovery: Understanding Agents, Beyond Final Code, APR Traceability, AgentInspect, CES, PatchDiff, and RISC-V RCA classify traces, errors, reasoning, patch behavior, or causes after evidence exists. Source: their matrix `use_mode`, `affected_action_or_decision`, and `causal_status`.
- `[direct_evidence]` State fidelity is directly challenged by Watson: 95/307 same-answer cases have divergent native and reconstructed traces. More grounded state remains partial: ADI and RustForger observe only reached executions, EvidenT observes clean builds, and formal tools observe encoded obligations. Source: Watson Section IV-F; ADI and RustForger limitations; EvidenT Section 5.6; formal cards' assumptions.
- `[agent_inference]` The missing connection is a tested mediator from acquired evidence to a factually complete, causally correct state. Most papers test the endpoint after supplying a representation, not whether the representation itself survives omission, contradiction, or corruption. Source: complete synthesis / Reassessment 4 and evidence gaps.

### Stage 3: action selection

- `[direct_evidence]` Direct online action controllers include ADI, TraceCoder, AutoRocq, Event-B, Deductive Steering, SAINT, TestPrune, PingFL, SpecGuru, StepFly, MSG, LogicHunter, ExpeRepair, AttnCompress, EvidenT, AdaDec, Atropos, DeepK, RustForger, ReinFix, CausalRepair, plus deployed ToolTrain, ICSE SEER, SEAlign, SWE-PDB, and CoT-compression SEER policies. Source: matrix rows with `online_use` or `offline_training_online_use`.
- `[direct_evidence]` Prepared evidence changes downstream decisions in Locus, IssueExec, ReduceFix, LAT, Clotho, Code-MUE, and MCTS-Refine, but the signal constructor is not a live controller in the evaluated component. Source: those cards / `conclusion_evidence` and matrix `use_mode`.
- `[agent_inference]` Stronger action evidence comes from controlled or sharply targeted changes: ADI and RustForger add runtime tools, To Run varies execution access, TestPrune records gains and regressions, TraceCoder removes rollback/iteration/instrumentation, AdaDec changes token commitment, Atropos triggers stop or hotswap, and SEER changes direct-code versus reasoning choice. Source: corresponding cards / ablations and main results.
- `[agent_inference]` The missing connection is action attribution. A better endpoint after adding context, memory, or training rarely identifies which observed fact selected which action, whether a different valid action existed, or whether the same action would work under a different scaffold. Source: ReinFix, ExpeRepair, ToolTrain, SEAlign, and SWE-PDB evidence gaps.

### Stage 4: intent validation

- `[direct_evidence]` Most closed loops terminate on tests, builds, proof discharge, model checking, symbolic checks, coverage, generated-test agreement, gold patches, or human/model judgments. Source: matrix `validation_feedback` across all seven clusters.
- `[direct_evidence]` Stronger checking is valuable but incomplete: developer tests uncover 7.8% incorrect plausible SWE-bench patches, PatchDiff flags 29.6% as behaviorally divergent, and 51/77 audited suspicious cases remain uncertain. Source: PatchDiff Sections 4.1-4.3 and Tables 2, 3, and 8.
- `[direct_evidence]` Agent-selected validation can pass while official evaluation fails in 81-100% of commercial-agent Fail-to-Fail cases; EvidenT stops at clean build; SAINT reports hard-coded state and weak assertions; TestPrune selected tests can cause premature stopping. Source: To Run Tables 12-13; EvidenT Section 5.6; SAINT Sections 4.2.2-4.2.3; TestPrune Section 5.3.2.
- `[agent_inference]` Formal acceptance has the same boundary at the representation layer: Rocq, Event-B, Move Prover, SMT, and symbolic execution validate their statements or constraints, not whether an LLM-generated or manually supplied encoding captures user intent. Source: AutoRocq, Event-B, MSG, Deductive Steering, and Locus assumptions and failure modes.
- `[agent_inference]` No reviewed work closes all four stages with independently validated user intent. ADI, TraceCoder, RustForger, TestPrune, AutoRocq, Event-B, MSG, EvidenT, and learned controllers close useful proxy loops, while PatchDiff mainly audits the final proxy rather than controlling the preceding stages. Source: the preceding stage evidence and named cards.

### Connected mechanism families

| Family | Covered links | Principal works and boundary |
|---|---|---|
| Runtime repair loops | `[agent_inference]` Evidence acquisition -> state/localization -> action -> test validation. | `[direct_evidence]` ADI, TraceCoder, RustForger, TestPrune, PingFL, CausalRepair, and EvidenT change later actions from executable state; validation remains test- or build-bounded, and PingFL/CausalRepair have no accessible manuscript. Source: named cards. |
| Formal and structured controllers | `[agent_inference]` Encoded state -> checked action pruning/repair -> formal or execution acceptance. | `[direct_evidence]` Locus, AutoRocq, Event-B, Deductive Steering, SAINT, MSG, and SpecGuru expose checkable feedback; encoding fidelity and generated-test adequacy remain upstream assumptions. Source: named cards. |
| Memory and evidence preservation | `[agent_inference]` Prior/current evidence -> retained state -> prompt/schedule/context action -> endpoint proxy. | `[direct_evidence]` StepFly, LogicHunter, ExpeRepair, AttnCompress, and EvidenT show both positive state control and non-monotonic retention; no study jointly estimates false retention and false deletion. Source: named cards and contradiction section below. |
| Learned and model-internal controllers | `[agent_inference]` Offline labels or internal signals -> token/thought/tool/stop decision -> endpoint reward. | `[direct_evidence]` LAT, Clotho, AdaDec, Atropos, Watson, Code-MUE, ToolTrain, MCTS-Refine, both SEER papers, SEAlign, and SWE-PDB cover ranking, control, reconstruction, or training at different granularities; only a subset intervenes online. Source: matrix `use_mode` and named cards. |
| Offline diagnosis and validation audit | `[agent_inference]` Evidence -> after-run state or validity judgment, with no deployed recovery policy. | `[direct_evidence]` Understanding Agents, Beyond Final Code, APR Traceability, AgentInspect, CES, PatchDiff, To Run, and RISC-V RCA supply failure, access, or validity evidence; To Run adds a causal access intervention but still leaves prospective selection open. Source: named cards. |
| Prepared repair context | `[agent_inference]` Reduced/retrieved evidence -> repair context -> patch -> test proxy. | `[direct_evidence]` IssueExec, DeepK, ReduceFix, ReinFix, and CausalRepair improve localization or patch context, but root-cause truth is not independently established. Source: named cards. |

## Cross-paper contradictions

1. `[agent_inference]` Targeted feedback can be strongly beneficial while unrestricted feedback is neutral or harmful. ADI, TraceCoder, RustForger, and EvidenT improve with scoped state or iteration; To Run finds execution helps 29 and hurts 24 paired cases with no significant unrestricted-access gain; TestPrune and ReduceFix show misleading or oversized tests can reduce success. Sources: ADI Tables 2-4; TraceCoder Table 2; RustForger Table 6; EvidenT Figure 3; To Run Tables 2, 8, and 13; TestPrune Section 5.3.2; ReduceFix Tables 6-9.
2. `[agent_inference]` A checkable endpoint can improve reliability without establishing intent. Developer tests and PatchDiff expose false acceptance, agent-selected tests can disagree with official evaluation, builds omit runtime behavior, and formal tools cannot validate an unfaithful encoding. Sources: PatchDiff Tables 2-8; To Run Tables 12-13; EvidenT Section 5.6; AutoRocq, Event-B, MSG, and Deductive Steering assumptions.
3. `[agent_inference]` High confidence, coherence, or endpoint agreement does not identify correct reasoning. CES reports 53.08% coherent-but-wrong simulations, Code-MUE records near-unanimous wrong behavior at entropy 0.0485, and Watson finds 30.9% divergent traces for identical answers. Sources: CES Table 1; Code-MUE Section 5.4; Watson Section IV-F.
4. `[agent_inference]` Retention and compression both carry two-sided risk. ExpeRepair peaks at top-3 retrieval and degrades with extra memories; AttnCompress beats compression baselines but its 53.17% average is below the 55.17% uncompressed artifact average; EvidenT benefits from preserving explicit current and negative evidence. Sources: ExpeRepair Figures 2 and 4; AttnCompress artifact Tables 1-2; EvidenT Table 4 and Figure 3.
5. `[agent_inference]` More search or reasoning is not monotonically better, but targeted additional iterations can help. Higher-temperature APR sampling increases failure diversity while lowering reproduction success, LogicHunter's forced rounds raise hallucination/FPR, and compression SEER finds no N=5 gain over N=3; TraceCoder and EvidenT improve throughout their tested iteration ranges. Sources: APR Traceability Table 3; LogicHunter Figure 5; compression SEER Table 5; TraceCoder Figure 3; EvidenT Figure 3.
6. `[agent_inference]` Endpoint-supervised process training can improve deployed behavior without proving process fidelity or transfer. SEAlign's critical actions outperform whole-trajectory DPO but transfer poorly to AutoCodeRover; ICSE SEER benefits from a value model but inherits terminal-test labels; MCTS-Refine improves endpoints without a matched construction control. Sources: SEAlign Tables 5 and 8; ICSE SEER Table 2 and Section 3.1; MCTS-Refine Sections 3-4.

## Shared assumptions, weak evidence, and reusable assets

### Shared hidden assumptions

1. `[agent_inference]` Tests, checkers, builds, developer patches, requirements, canaries, or guides encode enough of the intended task to supervise actions and stopping. Source: matrix `validation_feedback` and `main_assumption`.
2. `[agent_inference]` Failures reproduce stably enough that traces, slices, reduced inputs, and build feedback are comparable across attempts. Source: ADI, RustForger, ReduceFix, CausalRepair, and EvidenT assumptions.
3. `[agent_inference]` A derived state is faithful enough for the next decision, whether it is a summary, root-cause string, proof tree, DAG, hidden direction, graph embedding, proxy attention score, or partial-path value. Source: state, uncertainty, debugging, and training cards / `assumptions`.
4. `[agent_inference]` Historical trajectories, fixes, and tool policies remain relevant after repository, framework, model, language, and time shift. Source: DeepK, ExpeRepair, ToolTrain, SEAlign, and SWE-PDB cards.
5. `[agent_inference]` Endpoint rewards assign useful local credit to intermediate thoughts and actions. Source: ToolTrain, MCTS-Refine, ICSE SEER, SEAlign, SWE-PDB, and compression SEER assumptions.
6. `[agent_inference]` The host model will notice, interpret, and stop using a supplied affordance at the right time. ADI invocation falls with weaker hosts, AutoRocq retrieval timing is non-monotonic, and LogicHunter reasoning depth trades recall against false positives. Sources: ADI Figure 8; AutoRocq Table 3; LogicHunter Figure 5 and Table 8.
7. `[agent_inference]` Cost/outcome comparisons remain meaningful across unequal context, parallelism, model providers, tool overhead, and validation scope. Source: To Run, Atropos, AttnCompress, and TraceCoder cards.

### Principal evidence weaknesses

- `[agent_inference]` Prospective selection of which signal, tool, or test to acquire is rare relative to fixed-signal consumption and fixed-budget comparison. Source: unified matrix / `signal_available_when`, `affected_action_or_decision`, and `causal_status`.
- `[agent_inference]` Representation-fidelity interventions are largely absent: papers seldom omit, corrupt, contradict, or restore state while independently checking whether the controller detects the error. Source: Watson, ExpeRepair, AttnCompress, CausalRepair, SpecGuru, and EvidenT evidence gaps.
- `[agent_inference]` Independent root-cause, state, and action-quality labels are scarce; endpoint tests or gold patches repeatedly supervise intermediate process claims. Source: debugging and training cluster cards.
- `[agent_inference]` Intent-aware validation remains weak, and stronger behavioral checks can increase uncertainty rather than resolve it when alternative valid implementations or underspecified requirements exist. Source: PatchDiff Section 4.3; formal-method assumptions.
- `[agent_inference]` Cross-framework, cross-model, cross-language, temporal, and repeated-run evidence is uneven; SEAlign supplies a direct negative scaffold-transfer result. Source: matrix `failure_boundary`; SEAlign Table 8.
- `[direct_evidence]` Seven papers lack manuscripts but have inspectable artifacts, and RISC-V RCA has neither a manuscript nor an artifact. Their sampling, full ablations, statistics, failures, and threats cannot be treated as manuscript-level evidence. Source: the eight cards' `metadata.evidence_access`, `limitations`, and `evidence_gaps`.

### Reusable assets

- `[direct_evidence]` Trace and failure assets include normalized agent traces and parsers, large error logs, APR workflow traces, controlled execution traces, and AgentInspect fault injectors and labels. Source: Understanding Agents, Beyond Final Code, APR Traceability, To Run, and AgentInspect cards / `reusable_artifacts`.
- `[direct_evidence]` Runtime and repair assets include ADI/FramePilot, TraceCoder, RustForger, PingFL, ReduceFix, ReinFix, CausalRepair, and SWE-PDB environments or pipelines. Source: named cards / `reusable_artifacts`; artifact-access qualifiers in the matrix.
- `[direct_evidence]` Test, analysis, and oracle assets include TestPrune, IssueExec, CES, PatchDiff, SAINT, SpecGuru, LogicHunter, Code-MUE, and their tests, probes, or study data. Source: named cards / `reusable_artifacts`.
- `[direct_evidence]` Formal and structured-control assets include AutoRocq, Event-B Agent, MSG, Deductive Steering, StepFly, ExpeRepair, AttnCompress, and EvidenT code, schemas, data, or traces. Source: named cards / `reusable_artifacts`.
- `[direct_evidence]` Training and signal assets include LAT, Clotho, AdaDec, Atropos, ToolTrain, MCTS-Refine, both SEER implementations, SEAlign, and their data/model or evaluation packages where stated. Source: named cards / `reusable_artifacts`; individual version/access notes.
- `[agent_inference]` Artifact availability supports replication or reuse, not automatic correctness of the paper's mechanism claim; several packages omit full result tables or require proprietary APIs and substantial compute. Source: AgentInspect, Deductive Steering, PingFL, SpecGuru, AttnCompress, CausalRepair, and SWE-PDB access audits.

## Research pressure points

### P1. Selective acquisition under non-monotonic tool value

- Tension: `[agent_inference]` Scoped runtime state and targeted iterations improve outcomes, but unrestricted execution and incomplete selected tests can be neutral or harmful. Sources: ADI Tables 2-4; TraceCoder Table 2; To Run Tables 2 and 8; TestPrune Section 5.3.2.
- Closest work: `[direct_evidence]` To Run isolates execution access; ADI and RustForger ablate runtime tools; TestPrune records both wins and early-stop regressions. Source: their `evaluation.ablations` and `main_results`.
- Unanswered question: `[agent_inference]` Whether the value of acquiring a particular signal at a particular trajectory point is predictable before paying for or acting on it remains unresolved. Source: To Run `evidence_gaps`; unified matrix `signal_available_when`.
- Evidence needed: `[agent_inference]` Importance would require prospective, pre-action signal-choice evidence under fixed task/agent/model conditions, with paired or randomized access, action-level mediation, cost, and independent outcome validation. Source: limitations of the closest work.

### P2. Reproducible evidence before state judgment

- Tension: `[agent_inference]` Dynamic evidence can sharply improve repair once available, yet reproducers, traces, builds, and tests frequently fail to reach or cover the relevant state. Sources: APR Traceability Sections 6.1.3-6.1.4; RustForger Figure 10; IssueExec Section 6.1; EvidenT Section 5.6.
- Closest work: `[direct_evidence]` APR Traceability quantifies reproducer failure; ADI and RustForger require replayable executions; EvidenT explicitly reports unusable and inconsistent evidence. Source: named cards / `main_results` and `failure_modes`.
- Unanswered question: `[agent_inference]` It is not reliably known when recovery is blocked by failure to acquire evidence versus incorrect localization or a poor later action. Source: complete synthesis / Reassessment 5.
- Evidence needed: `[agent_inference]` Importance would require independently labeled reproducibility and coverage across repeated runs, with stage-specific outcomes under missing, flaky, stale, and contradictory evidence. Source: named cards' evidence gaps.

### P3. Fidelity of derived state

- Tension: `[agent_inference]` Summaries, slices, reduced inputs, generated specifications, reconstructed reasoning, and latent scores can improve endpoints while omitting or inventing facts needed by the next decision. Sources: Watson Section IV-F; ReduceFix construct-validity boundary; SpecGuru and CausalRepair failure modes; ExpeRepair sensitivity results.
- Closest work: `[direct_evidence]` Watson directly measures non-unique reconstruction; ReduceFix validates a preserved failure predicate; SpecGuru differentially checks summaries; CausalRepair packages dual slices. Source: corresponding cards.
- Unanswered question: `[agent_inference]` Whether endpoint gains are mediated by a factually and causally faithful state rather than shorter context, style, or correlated cues is unresolved. Source: corresponding `assumptions` and `evidence_gaps`.
- Evidence needed: `[agent_inference]` Importance would require independent state-truth labels plus controlled omission, contradiction, corruption, and restoration tied to subsequent decisions, not only final tests. Source: complete synthesis / representation-fidelity gap.

### P4. False retention versus false deletion in memory

- Tension: `[agent_inference]` Retaining irrelevant memories degrades ExpeRepair, while compression loses accuracy against no compression and can irreversibly discard weakly scored evidence; preserving current negative evidence helps EvidenT. Sources: ExpeRepair Figures 2 and 4; AttnCompress artifact Tables 1-2; EvidenT Figure 3.
- Closest work: `[direct_evidence]` ExpeRepair varies retrieval and insight counts, AttnCompress ablates rolling reassessment, LogicHunter ablates dual memory, and EvidenT removes evidence components. Source: named cards / ablations.
- Unanswered question: `[agent_inference]` No reviewed study estimates the decision cost of retaining noise and deleting useful evidence within one common setting. Source: cross-cluster contradictions in the complete synthesis.
- Evidence needed: `[agent_inference]` Importance would require counterfactual restore/remove evidence with per-item relevance or necessity labels, matched context budgets, and downstream action and intent outcomes. Source: ExpeRepair and AttnCompress evidence gaps.

### P5. Diagnosis-to-action validity

- Tension: `[agent_inference]` Rich taxonomies and root-cause narratives describe failure, but successful patch context does not independently establish that the diagnosis is true or caused the chosen repair. Sources: Understanding Agents; Beyond Final Code; RISC-V RCA; DeepK; ReinFix; CausalRepair cards.
- Closest work: `[direct_evidence]` ADI and TraceCoder causally improve recovery from runtime state, ReinFix improves patches while assuming perfect localization, and RISC-V RCA remains diagnosis-only at abstract level. Source: their `conclusion_evidence` and `main_results`.
- Unanswered question: `[agent_inference]` Which diagnoses distinguish actions that repair the intended fault from plausible but test-passing alternatives is not reliably answered. Source: debugging-cluster synthesis; PatchDiff intent findings.
- Evidence needed: `[agent_inference]` Importance would require independent cause and action labels, alternative-valid-fix handling, and controlled substitution of correct, incomplete, and wrong diagnoses under fixed repair context. Source: debugging cards' evidence gaps.

### P6. Action timing, commitment granularity, rollback, and stopping

- Tension: `[agent_inference]` Too-early retrieval, stopping, or commitment can lock in weak evidence, while too-late search or forced reasoning creates repetition, cost, hallucination, and regression. Sources: AutoRocq Table 3; TestPrune Section 5.3.2; LogicHunter Figure 5; AdaDec Table 2; Atropos Figures 5 and 8; TraceCoder rollback ablation.
- Closest work: `[direct_evidence]` AdaDec controls token commitment, ICSE SEER selects direct code versus more reasoning, Atropos stops or hotswaps trajectories, AutoRocq backtracks proof branches, and TraceCoder restores the best prior code. Source: named cards / mechanisms and ablations.
- Unanswered question: `[agent_inference]` Evidence does not yet establish a transferable relationship between confidence, action reversibility, decision granularity, and the right time to commit or backtrack. Source: matrix failure boundaries; dLLM watchlist transfer boundary.
- Evidence needed: `[agent_inference]` Importance would require matched outcome/cost evidence across decision granularities, explicit trigger logs, and separation of reversible from externally state-changing action errors. Source: closest works' evidence gaps.

### P7. Checkable acceptance versus intended semantics

- Tension: `[agent_inference]` Tests and formal checks remove many invalid outputs, yet accepted patches, builds, specifications, and proofs can remain behaviorally wrong, underspecified, or over-constrained. Sources: PatchDiff; To Run; EvidenT; AutoRocq; Event-B; MSG; Deductive Steering cards.
- Closest work: `[direct_evidence]` PatchDiff quantifies false acceptance and residual ambiguity; To Run exposes self-validation disagreement; formal works provide strong encoding-relative acceptance. Source: PatchDiff Tables 2-8; To Run Tables 12-13; formal cards.
- Unanswered question: `[agent_inference]` No reviewed oracle reliably adjudicates user intent across alternative valid fixes and incomplete requirements at agent scale. Source: PatchDiff Section 4.3; formal assumptions.
- Evidence needed: `[agent_inference]` Importance would require independent requirement or developer adjudication, alternative-solution coverage, hidden or broader behavioral checks, and explicit retention of inconclusive cases. Source: PatchDiff and formal-method evidence gaps.

### P8. Confidence and progress versus correctness and recoverability

- Tension: `[agent_inference]` Hidden states, entropy, semantic consensus, and partial trajectory graphs predict outcomes, but high confidence can be wrong and predictive ranking need not improve the next action. Sources: LAT, Clotho, AdaDec, Atropos, Watson, and Code-MUE cards.
- Closest work: `[direct_evidence]` AdaDec and Atropos intervene online; LAT, Clotho, and Code-MUE rank or reject offline; Watson's downstream gains are not significant. Source: matrix `use_mode` and `causal_status`.
- Unanswered question: `[agent_inference]` Whether a signal is calibrated to the value and recoverability of a particular next action, rather than to task-level endpoint difficulty, remains unresolved. Source: signal-cluster synthesis and evidence gaps.
- Evidence needed: `[agent_inference]` Importance would require prospective calibration and action-consumption evidence, explicit false-high-confidence cases, distribution/model shift, and cost-aware outcome validation. Source: named cards' evidence gaps.

### P9. Endpoint credit versus process faithfulness and transfer

- Tension: `[agent_inference]` Fine-grained training improves endpoint actions, but labels originate mainly from tests or gold patches and can fail across scaffolds; shorter passing reasoning can also remove hard but necessary traces. Sources: ToolTrain, MCTS-Refine, ICSE SEER, SEAlign, SWE-PDB, and compression SEER cards.
- Closest work: `[direct_evidence]` SEAlign isolates critical-action training and reports OpenHands-to-AutoCodeRover degradation; ICSE SEER ablates its value model; MCTS-Refine lacks a matched endpoint-only construction control; SWE-PDB lacks an accessible result table. Source: SEAlign Tables 5 and 8; ICSE SEER Table 2; MCTS-Refine and SWE-PDB cards.
- Unanswered question: `[agent_inference]` It remains unknown how much gain comes from faithful process credit rather than extra data, gold exposure, formatting, model capacity, or scaffold-specific correlations. Source: training-cluster synthesis.
- Evidence needed: `[agent_inference]` Importance would require matched endpoint-only controls, independent action or step labels, causal step perturbations, alternative valid endpoints, and transfer across scaffolds, models, languages, and time. Source: training cards' evidence gaps.

## dLLM observation axis

- `[direct_evidence]` The adjacent watchlist remains nine works: six full-read (CodeFusion, Block Diffusion, d1, Fast-dLLM, DiffuCoder, Dream 7B) and three abstract-read (Diffusion of Thoughts, LLaDA, Seed Diffusion). It is not part of the 42-paper SE corpus. Source: `synthesis/dllm-adjacent-watchlist.md / Reading set and Watch status`.
- `[agent_inference]` Real intersections are narrow: Block Diffusion and Fast-dLLM expose commitment granularity, Dream demonstrates arbitrary-location infilling, CodeFusion keeps a whole latent editable before final decoding, and d1/DiffuCoder provide diffusion-native outcome training. Source: watchlist / full-reading sections and cross-paper verdict.
- `[agent_inference]` The non-transfer boundary is stronger than the analogy: denoising without external failure feedback is not recovery; token confidence is not agent-state correctness; masked tokens are revisable in ways that external tool actions are not; code-generation results do not establish repository navigation, tests, proof control, or repair. Source: watchlist / Cross-paper verdict on the five dLLM axes.
- `[agent_inference]` No reviewed dLLM work demonstrates a test or tool result entering the denoising trajectory and causing a targeted revision, and none supports a general advantage over autoregressive models. Source: watchlist / CodeFusion through Dream 7B and Watch status.
- `[agent_inference]` Pending verification is limited to whether generation order itself has causal task value, whether external feedback can revise committed regions, whether infilling preserves untouched code and specifications, whether confidence calibrates to semantic outcomes, and whether matched AR comparisons survive common data and compute. Source: watchlist / paper-level gaps and cross-paper verdict.
- `[agent_inference]` Final position for this phase: retain dLLMs as an adjacent observation axis for commitment granularity, infilling, and diffusion-native training; do not promote them into a core mechanism cluster or presume they should become a final direction. Source: current evidence and phase boundary.

## Evidence-confidence summary

- `[agent_inference]` Higher-confidence synthesis claims are the non-monotonic value of feedback quantity, the proxy-versus-intent boundary, and the lack of fidelity evidence for derived state; each is supported by multiple full-text papers with positive and negative cases. Source: contradictions 1-4 and their cited cards.
- `[agent_inference]` Moderate-confidence claims concern AgentInspect's aggregate failure detection, Deductive Steering's gains, PingFL's dynamic-state contribution, SpecGuru's comparative summary quality, AttnCompress's full protocol, CausalRepair's component contribution/correct-patch status, and SWE-PDB's training gain. Artifacts expose mechanisms or partial results, but manuscripts are unavailable. Source: the seven artifact-plus-abstract cards.
- `[agent_inference]` Low-confidence claims concern RISC-V RCA's 75.2% diagnosis accuracy, MCTS contribution, dataset protocol, and failure distribution because only the official abstract and publisher record are available. Source: RISC-V RCA card / `metadata.evidence_access` and `evidence_gaps`.
- `[direct_evidence]` Full-text access does not remove reporting uncertainty: TestPrune has a table/prose benchmark mapping conflict, AdaDec's prose overstates Table 2, MCTS-Refine swaps Verified/Lite sequences in one conclusion, compression SEER has a percentage inconsistency, and several papers have version/title mismatches. Source: corresponding cards / `limitations`, `failure_modes`, and version notes.

## Phase conclusion

- `[agent_inference]` The evidence base is sufficient to enter `IDEA_SEEDING`: the mechanism matrix is complete, chain links and missing connections are explicit, contradictions are preserved, nine pressure points state falsifiable evidence needs, access uncertainty is weighted, and no complete idea or method has been generated. Source: this report; `synthesis/unified-mechanism-matrix.csv`; matrix verification.
- `[direct_evidence]` No human decision is required to close this phase. Source: the completed evidence ledger and absence of unresolved phase blockers.
