# DEEP_READING_BATCH_1 Stage Synthesis

## Scope and evidence contract

- `[direct_evidence]` This synthesis covers the 21 papers assigned to `DEEP_READING_BATCH_1`, exactly three from each of the seven mechanism clusters. Every paper has a `reading_status: deep_read` YAML card under `cards/`. Source: `synthesis/deep-reading-selection.json / selected_papers where reading_batch=DEEP_READING_BATCH_1`; `cards/*.yaml`.
- `[direct_evidence]` Paper cards record the reviewed version, problem, mechanism, assumptions, datasets, baselines, metrics, ablations, result locators, limitations, failures, artifacts, and within-cluster differences. Source: `cards/*.yaml`.
- `[agent_inference]` "Online" below means that a signal observed during a run can alter a later action in the same run. "Downstream intervention" means a separately prepared signal changes a later component. "Offline diagnostic" means the paper measures or ranks behavior without showing that the measured signal changes a subsequent decision. Source: operational definitions used in this synthesis.
- `[agent_inference]` This is an interim evidence synthesis, not a research idea, novelty claim, gap claim, or complete design. Batch 2 has not been read in this phase. Source: phase boundary in `AGENTS.md` and `state/checkpoint.yaml`.

## Decision-loop audit

| Mechanism cluster | Offline diagnostic or preparation | Downstream or online intervention | Strongest current boundary |
|---|---|---|---|
| Failure loops and recovery | `[direct_evidence]` Understanding Agents codes 120 trajectories; Beyond Final Code mines 3,977 solving traces and 3,931 test logs. | `[direct_evidence]` ADI/FramePilot exposes runtime frames during repair and improves 275/500 to 319/500 with Claude Sonnet 3.7. | `[agent_inference]` The empirical studies describe failure but do not test recovery; ADI tests a tool, not an online detector for their anti-pattern taxonomies. Sources: Understanding Agents Section III; Beyond Final Code Tables 2-4; ADI Table 2. |
| Planning, action, tool, stopping | `[direct_evidence]` Locus synthesizes and validates predicates before a fuzzing campaign. | `[direct_evidence]` AutoRocq and Event-B Agent repeatedly consume proof/model-checker feedback to choose a tactic, query, repair, backtrack, or stop. | `[agent_inference]` Checker acceptance grounds stopping, but it cannot establish that the theorem or generated formal model captures user intent. Sources: Locus Algorithm 1; AutoRocq Section 4.3; Event-B Agent Sections 4.4-5. |
| Test, execution, analysis feedback | `[direct_evidence]` CES is diagnostic; IssueExec traces five retrieved existing tests before downstream patching. | `[direct_evidence]` TestPrune inserts selected tests into repair trajectories and changes refinement and stopping; IssueExec changes Agentless localization context but does not adapt inside the repair loop. | `[agent_inference]` Execution affects decisions only when coverage and test relevance are adequate; selected tests also create premature stopping. Sources: CES Sections 3-6; IssueExec Sections 4-5; TestPrune Sections 4.6 and 5.3.2. |
| State, memory, specification, constraints | `[direct_evidence]` StepFly prepares a reviewed DAG and query plugins offline. | `[direct_evidence]` StepFly schedules from typed edge state and memory; MSG revises clauses from prover errors; LogicHunter changes investigative tools and its verdict from accumulated evidence. | `[agent_inference]` All three depend on a state representation whose fidelity is only partially validated: reviewed TSG/DAG, implementation-consistent specification, or documentation/source/runtime consensus. Sources: StepFly Sections 4-5; MSG Sections III-V; LogicHunter Section 3.3 and Table 8. |
| Outcome, progress, uncertainty signals | `[direct_evidence]` LAT ranks generated candidates and Clotho prioritizes inputs offline. | `[direct_evidence]` AdaDec uses entropy to pause and rerank the next token during generation. | `[agent_inference]` A predictive signal is not automatically a useful control: LAT and Clotho do not test an acting agent, and AdaDec does not consistently beat beam search in every Table 2 cell. Sources: LAT Sections 4-5; Clotho Sections 5.2-5.4; AdaDec Table 2. |
| Debugging, root cause, repair decisions | `[direct_evidence]` DeepK builds and retrieves prior debugging records; ReduceFix validates a minimized failure before repair. | `[direct_evidence]` ReduceFix changes downstream prompts; RustForger uses reproduction and Trace inside the repair run. | `[agent_inference]` DeepK disables all baseline loops, ReduceFix preserves a failure predicate rather than a proven root cause, and RustForger is currently Rust-specific. Sources: DeepK Sections 4.2-4.3; ReduceFix Sections 3 and 5; RustForger Sections 5.2-5.4. |
| Training, process supervision, policy optimization | `[direct_evidence]` MCTS-Refine is offline gold-conditioned CoT synthesis. | `[direct_evidence]` ToolTrain trains a repository-search policy; SEER's value model chooses direct code versus further reasoning during inference. | `[agent_inference]` Terminal gold/test rewards do not independently validate intermediate thoughts; MCTS-Refine additionally exposes gold answers to its judge/refiner. Sources: ToolTrain Section 3.3; MCTS-Refine Section III.B; SEER Sections 3.1-3.3. |

## Cluster 1: Failure loops and recovery

### Mechanism distinctions

- `[agent_inference]` Understanding Agents provides the finest behavioral vocabulary: normalized thought-action-result triples, action 4-grams, and manual semantic relations. Beyond Final Code supplies scale and benchmark-side error auditing but a much coarser notion of behavior. ADI is the only cluster member that changes the agent's available action space and tests an intervention. Sources: `cards/ASE2025_understanding-software-engineering-agents-a-study-of-thought-action-resu.yaml / technical_mechanisms`; `cards/ICSE2026_beyond-final-code-a-process-oriented-error-analysis-of-software-developm.yaml / technical_mechanisms`; `cards/FSE2026_empowering-autonomous-debugging-agents-with-efficient-dynamic-analysis.yaml / technical_mechanisms`.
- `[direct_evidence]` Understanding Agents finds repeated search/fix-test cycles, fixes without tests, and premature termination more often in failed traces, but agent, task source, model, stopping rule, and architecture co-vary. Source: Understanding Agents Sections II-III; Figures 5-7.
- `[direct_evidence]` Beyond Final Code finds essentially equal resolution when at least one execution error is present or absent (54.61% versus 54.42%), while many errors correlate with longer reasoning and lower success. Source: Beyond Final Code Section 4.2; Table 3; Figure 2; Table 4.
- `[direct_evidence]` ADI's frame-lifetime trace and high-level commands replace fragile sequential PDB interaction; PDB attempts average 10.1 commands and 53% are abandoned, while full FramePilot improves Verified resolution from 55.0% to 63.8% for Claude Sonnet 3.7. Source: ADI Section 5.4.1; Tables 2 and 4.

### Hidden assumptions and consistency check

- `[agent_inference]` The two empirical papers assume trace parsers and local semantic relations capture the failure process; both can miss internal state transitions, parse failures, and longer-range dependencies. Sources: Understanding Agents Section II-D-F; Beyond Final Code Sections 2.3 and 8.4.
- `[agent_inference]` ADI assumes a minimal reproducer can be replayed deterministically and that the host model recognizes when runtime state is useful. This is materially stronger than merely observing an error string. Sources: ADI Section 5.4.3; Section 6.
- `[agent_inference]` Empirical and method evidence are directionally consistent only at a broad level: fragile low-level debugging loops are common, and a higher-level state interface helps. There is no experiment showing that detecting Understanding Agents' anti-patterns or Beyond Final Code's error categories and then intervening improves repair. Sources: the three cards' `conclusion_evidence` and `evidence_gaps`.

### Contradiction and gap

- `[agent_inference]` Error presence is not a sufficient recovery signal: the equal Table 3 resolution rates contradict any simple "an error occurred, therefore failure is more likely" rule, and the error-count association remains confounded by task difficulty. Source: Beyond Final Code Table 3; Figure 2; Section 8.4.
- `[agent_inference]` ADI supplies the clearest causal evidence in this cluster, but multi-run stability, non-Python transfer, concurrent/nondeterministic bugs, and semantic patch review beyond tests remain open. Source: ADI Section 6; card `evidence_gaps`.

## Cluster 2: Planning, action, tool choice, and stopping

### Mechanism distinctions

- `[direct_evidence]` Locus uses an LLM plus code-graph tools to synthesize vulnerability predicates and bounded symbolic execution to reject unsafe relaxations, then compiles accepted predicates into a downstream fuzzing search-space transformation. Source: Locus Sections 3.2-3.4; Algorithm 1; Theorems 1-2.
- `[direct_evidence]` AutoRocq retains a proof tree and can query context, apply tactics, repair, reuse proof history, backtrack, and stop only at a kernel-accepted proof. Removing context search drops success from 44.3% to 30.0% on a 70-lemma ablation. Source: AutoRocq Sections 4.1-4.3 and 6.3; Table 3.
- `[direct_evidence]` Event-B Agent plans refinements, synthesizes each layer, checks counterexamples, maps failed proof obligations to repair categories, and replays affected proofs after model/proof changes. Source: Event-B Agent Sections 4.2-4.4; Table 2.

### Hidden assumptions and consistency check

- `[agent_inference]` Locus relies on a manually supplied vulnerability canary and bounded no-counterexample result; AutoRocq relies on a fixed theorem statement; Event-B Agent relies on consistent natural-language requirements and generated labels. These are different notions of a valid target and should not be combined as one "formal feedback" construct. Sources: Locus Sections 3.4 and 4.1; AutoRocq Sections 2.1 and 5.1; Event-B Agent Sections 5.1 and 7.1.
- `[direct_evidence]` Feedback is not automatically helpful: Locus refinement without validation can worsen time-to-exposure or time out, and AutoRocq's too-early context search injects irrelevant facts while too-late search permits repeated failed tactics. Sources: Locus Section 4.4; Table 5; AutoRocq Section 6.3.
- `[agent_inference]` The method papers agree that explicit state plus a checker can control action choice, but only AutoRocq and Event-B Agent are live agent loops. Locus is validated preprocessing whose output changes a fuzzer, not online LLM planning. Sources: Locus Algorithm 1; AutoRocq Section 4.3; Event-B Agent Section 4.4.

### Contradiction and gap

- `[direct_evidence]` Event-B Agent reports overall PDR 0.9786, but refinement-specific PDR is 0.9256 and 0.8213 for complex systems, so the assumption that abstract requirement fulfillment is preserved across every refinement does not universally hold. Source: Event-B Agent Tables 3 and 5.
- `[agent_inference]` Kernel/prover success is strong direct evidence of formal acceptance but not of intended behavior: strengthening guards, adding axioms, or changing invariants can discharge obligations while narrowing the desired system. Sources: Event-B Agent Table 2 and Section 7.1; AutoRocq Sections 2.1 and 6.
- `[agent_inference]` Missing evidence includes hand-authored predicate controls for Locus, full-corpus AutoRocq ablations, independent semantic review of Event-B models, inconsistent requirements, and repeated-run variance. Sources: the three cards' `evidence_gaps`.

## Cluster 3: Testing, execution, and program-analysis feedback

### Mechanism distinctions

- `[direct_evidence]` TestPrune combines LLM localization, import-based test retrieval, line coverage, and greedy selection, then injects about nine selected tests into reproduction, patch selection, validation, and stopping. Source: TestPrune Sections 3.1-3.3; Algorithms 1-2.
- `[direct_evidence]` IssueExec retrieves five existing tests, traces them, builds a sparse test-to-code hierarchy, expands beyond covered nodes, and reranks locations before handing context to Agentless. Source: IssueExec Sections 4.2-4.5.
- `[direct_evidence]` CES asks a model to simulate variable state and control flow, checks the simulation against real execution, and classifies cross-input consistency; it never returns the signal to generation. Source: CES Sections 3-6.

### Hidden assumptions and consistency check

- `[agent_inference]` TestPrune and IssueExec both assume existing passing tests are proxies for a new issue, but use them differently: TestPrune treats selected coverage as an online regression/stop signal, while IssueExec treats traces as an offline localization bridge. Sources: TestPrune Sections 3.1 and 5.3.2; IssueExec Sections 2-4.
- `[direct_evidence]` IssueExec reports that the full repository suite fails to cover 33.30% of ground-truth functions. TestPrune reports mean selected-test buggy-line precision 0.63 and coverage recall 0.71. Source: IssueExec Section 6.1; TestPrune Section 4.4.
- `[direct_evidence]` CES finds 81.42% of simulations coherent, yet only 46.92% of coherent cases have a correct final output; fluent or internally consistent execution narration is therefore not sufficient correctness evidence. Source: CES Section 6.2; Table 1.
- `[agent_inference]` Empirical CES evidence cautions against treating an LLM's explanation as a state signal, while TestPrune and IssueExec gain value from actual execution. Even execution is only useful when relevance and coverage are established. Sources: CES Table 1; TestPrune Sections 4.6 and 5.3.2; IssueExec Section 6.

### Contradiction and gap

- `[direct_evidence]` Selected tests cause eight previously solved SWE-agent cases and 17 Trae cases to fail because they miss issue-specific behavior and trigger premature stopping. Source: TestPrune Section 5.3.2.
- `[direct_evidence]` TestPrune Table 3 assigns Trae to Verified and SWE-agent to Lite, but the first paragraph of Section 4.6.2 states the reverse. The numerical result is retained with the table mapping and marked unresolved. Source: TestPrune Table 3 versus Section 4.6.2.
- `[agent_inference]` No paper calibrates how an agent should act under incomplete coverage. Adaptive test choice, uncovered functions, issue-specific generated tests, and online use of CES remain evidence gaps. Sources: TestPrune, IssueExec, and CES cards' `evidence_gaps`.

## Cluster 4: State, memory, specification, and constraint preservation

### Mechanism distinctions

- `[direct_evidence]` StepFly converts an expert-revised troubleshooting guide into a reviewed DAG and query plugins; its online scheduler, typed edges, retries, and key-value memory determine subsequent incident-diagnosis steps. Source: StepFly Sections 4.1-4.5.
- `[direct_evidence]` MSG partitions Move specifications into clause-specific agents and repeatedly uses compiler/prover errors to rewrite merged clauses; removing prover feedback lowers verifiability from 84.0% to 70.9%. Source: MSG Sections III and V-B; Tables II and IV.
- `[direct_evidence]` LogicHunter maintains explicit investigation/verdict states, dual memory, and documentation/source/runtime tools. Vanilla ReAct raises recall but lowers precision to 54.55%; the structured oracle reaches precision 91.17%, recall 72.14%, and FPR 0.21%. Source: LogicHunter Sections 3.3 and 4.5-4.6; Tables 7-8.

### Hidden assumptions and consistency check

- `[agent_inference]` StepFly assumes the reviewed TSG/DAG is a valid diagnostic program; MSG assumes implementation-consistent prover acceptance and mutation coverage approximate intended specification; LogicHunter assumes documentation, source, and runtime evidence jointly reveal API intent. Sources: StepFly Sections 4.1-4.2 and 5.1; MSG Sections III-C and IV; LogicHunter Section 3.3.2.
- `[agent_inference]` All three methods support the value of explicit state, but the state objects are not interchangeable: procedural progress, formal constraints, and epistemic evidence impose different update and stop semantics. Sources: the three cards' `within_cluster_difference`.
- `[direct_evidence]` StepFly's GPT-4.1 success is 94.38% versus 80.0% for TaskWeaver and 71.25% for ReAct, but all 15 evaluation guides were comprehensively revised by experienced SREs first. Source: StepFly Sections 5.1 and 5.4; Table 3.

### Contradiction and gap

- `[direct_evidence]` LogicHunter shows a non-monotonic reasoning-depth effect: too few mandatory rounds cause premature conservative verdicts, while eight forced rounds induce nonexistent clues, hallucination, and higher false-positive rate. Source: LogicHunter Section 4.6; Figure 5.
- `[agent_inference]` MSG's 291 clauses unmatched by expert specifications are additions, not independently validated improvements; prover acceptance cannot show that they reflect developer intent. Source: MSG Table III; Section IV.
- `[agent_inference]` Isolated state-component effects remain weak for StepFly, independent semantic validation is missing for MSG, and LogicHunter lacks broader multi-API and repair/recurrence evaluation. Sources: the three cards' `evidence_gaps`.

## Cluster 5: Outcome, progress, and uncertainty signals

### Mechanism distinctions

- `[direct_evidence]` LAT extracts a model-specific hidden-state correctness direction from paired correct/incorrect code and ranks completed candidates. Source: LAT Sections 2.1, 3, and 5.
- `[direct_evidence]` Clotho fits a GMM to input-side hidden states of labeled passing inputs and prioritizes unseen inputs before their generation. Source: Clotho Section 3; Algorithm 1.
- `[direct_evidence]` AdaDec learns a per-model entropy threshold and invokes a top-three, fixed-horizon lookahead only at triggered token decisions. Source: AdaDec Sections 3.2-3.3.

### Hidden assumptions and consistency check

- `[agent_inference]` LAT may encode reference-versus-model provenance because RQ1's correct options are reference solutions and incorrect options come from other LLMs. Clotho may encode task/input atypicality rather than a stable causal failure property. AdaDec treats local entropy and a five-token horizon as proxies for semantic drift. Sources: LAT Section 4.1.1 and Section 6; Clotho Section 7; AdaDec Sections 3.3 and 5.2.
- `[direct_evidence]` LAT exceeds likelihood/reflection baselines in its multiple-choice setup, but BigCodeBench pass@rank-1 remains approximately 1%-8%. Clotho reaches ROC-AUC 0.716 with reference labels averaging 5.4% of each suite. AdaDec improves greedy Pass@1 by 3.59/7.61/4.53 points across the three benchmarks. Sources: LAT Tables 3-6; Clotho Table 4; AdaDec Table 2.
- `[agent_inference]` The papers consistently show that model internals contain predictive information. Only AdaDec demonstrates that consuming such information during generation improves outcomes, and even there the policy is token-local rather than agent-level. Sources: the three cards' `conclusion_evidence`.

### Contradiction and gap

- `[direct_evidence]` AdaDec's prose says it consistently exceeds beam search, but Table 2 contains several beam wins, including DS-6.7B on HumanEval+ and multiple other model/benchmark cells. Source: AdaDec Section 4.2 versus Table 2.
- `[direct_evidence]` Clotho's adaptive method is best in 14/24 configurations, but the simpler GMMb is best in seven and beats it on three tasks. LAT out-of-distribution fitting can also fall below random for some models. Sources: Clotho Section 5.1.1; Table 3; LAT Section 4.2.2.
- `[agent_inference]` Missing evidence includes calibrated probabilities, provenance-controlled LAT pairs, reference-label stability for Clotho, post-fine-tuning AdaDec calibration, and use of any signal at repository-agent decision boundaries. Sources: the three cards' `evidence_gaps`.

## Cluster 6: Debugging, root-cause localization, and repair decisions

### Mechanism distinctions

- `[direct_evidence]` DeepK turns historical fixes into AST-derived edit descriptions, separate root-cause/strategy records, and a three-index RRF knowledge base. A record is admitted when it can regenerate a test-passing source repair. Source: DeepK Sections 3.1-3.3; Algorithms 1-2.
- `[direct_evidence]` ReduceFix generates a task-specific reducer, lets ddmin search within it, validates that the buggy/reference disagreement remains, and supplies the minimized counterexample to repair. Source: ReduceFix Sections 3 and 5.1.
- `[direct_evidence]` RustForger separates reproduction into an isolated Cargo workspace and offers cross-project dynamic Trace observations for online diagnosis and validation. Source: RustForger Sections 5.2-5.3.

### Hidden assumptions and consistency check

- `[agent_inference]` DeepK's "validated knowledge" is validated only by source-instance repair, not by explanation truth or transfer. ReduceFix assumes one preserved failure predicate retains root-cause information. RustForger assumes reproduction in a linked workspace is faithful to the original repository issue. Sources: DeepK Algorithm 2; ReduceFix Section 3.3; RustForger Sections 5.2-5.3.
- `[direct_evidence]` DeepK disables feedback loops in all baselines to isolate knowledge injection. It therefore cannot support a claim about online recovery despite the word "debugging engine." Source: DeepK Section 4.2.
- `[direct_evidence]` ReduceFix finds that full tests can be worse than no test, while reduced tests consistently improve the overall comparison. RustForger finds reproduction is a bottleneck and improves both reproduction and final repair through isolation and traces. Sources: ReduceFix Sections 5.3-5.4; Tables 6-9; RustForger Figure 10; Tables 5-6.
- `[agent_inference]` These method results agree on a narrower point: failure evidence needs a representation matched to the next decision. More raw evidence is not necessarily more useful. Sources: DeepK Table 10; ReduceFix Tables 6 and 9; RustForger Table 6.

### Contradiction and gap

- `[direct_evidence]` DeepK peaks at three retrieved records and degrades with more, especially for DeepK-S. ReduceFix's full original input can depress repair. These independently contradict monotonic "more context helps" assumptions. Sources: DeepK Section 5.3; Table 10; ReduceFix Sections 5.3-5.4.
- `[direct_evidence]` RustForger's 200-task ablation raises mean resolved counts from 22.0 to 25.0 to 30.3 as isolation and Trace are added; this is the cluster's strongest signal-to-decision-to-outcome evidence. Source: RustForger Section 5.4; Table 6.
- `[agent_inference]` Remaining gaps are rationale fidelity in DeepK, causal equivalence of minimized failures, unbiased and repeated repository experiments, non-Rust transfer, independent reproduction labels, and semantic patch correctness beyond tests. Sources: the three cards' `evidence_gaps`.

## Cluster 7: Training, process supervision, and policy optimization

### Mechanism distinctions

- `[direct_evidence]` ToolTrain uses 5K rejection-sampled trajectories for SFT warm-up and 18K issues for RL, rewarding only the final ranked function list with nDCG. Source: ToolTrain Sections 3.2-3.3 and 4.4.
- `[direct_evidence]` MCTS-Refine synthesizes 52,068 supervised examples while its judge and refiner see gold files, functions, or code and require exact endpoint match. Source: MCTS-Refine Sections III-IV.A.
- `[direct_evidence]` SEER obtains terminal labels from tests, perturbs/refines paths, trains policy and value models, and uses the value model to select direct generation or further reasoning online. Source: SEER Sections 3.1-3.3.

### Hidden assumptions and consistency check

- `[agent_inference]` ToolTrain assumes gold-patch nDCG teaches good tool reasoning; MCTS-Refine assumes gold-visible correction produces faithful rationales; SEER assumes backpropagated terminal test outcomes label intermediate step quality. None independently validates intermediate explanations. Sources: ToolTrain Figure 2; MCTS-Refine Figures 3-4; SEER Section 3.1.1.
- `[direct_evidence]` ToolTrain's two-stage 7B file Recall@5 is 83.11 versus 79.31 for SFT-only and 73.18 for RL-only. SEER's value-model removal drops LiveCodeBench 23.8 to 18.6 and 36.7 to 31.3. Sources: ToolTrain Figure 3; SEER Table 2.
- `[direct_evidence]` MCTS-Refine fine-tuned 7B/32B/72B models reach 22.6%/32.4%/35.0% on Verified, but there is no same-data ordinary-CoT, endpoint-only, or patch-format SFT control. Source: MCTS-Refine Table 2 and Section IV.
- `[agent_inference]` ToolTrain and SEER provide evidence that training changes deployed action selection. MCTS-Refine provides endpoint-performance evidence for a dataset, not isolated process-supervision evidence. Sources: the three cards' `conclusion_evidence`.

### Contradiction and gap

- `[direct_evidence]` MCTS-Refine's conclusion box swaps Verified and Lite sequences relative to its abstract and Table 2; Table 2 is treated as authoritative. Source: MCTS-Refine Abstract and Table 2 versus Section IV.B conclusion.
- `[direct_evidence]` SEER reports that explicit CoT turns 4.7% of previously correct DeepSeek/MBPP answers into errors, and its adaptive controller reduces this overthinking; removing KL also causes large forgetting. Source: SEER Section 1; Figure 2; Table 3.
- `[agent_inference]` Major gaps are call/step-level reward validation, alternative valid patch locations, faithful-rationale audits, matched training-data controls for MCTS-Refine, model/language breadth, and deployment on repository actions beyond localization. Sources: the three cards' `evidence_gaps`.

## Cross-cluster findings

### Feedback that demonstrably changes a later decision

| Evidence strength | Papers | Interim judgment |
|---|---|---|
| Direct online loop with component/outcome evidence | `[direct_evidence]` ADI, AutoRocq, Event-B Agent, StepFly, MSG, LogicHunter, AdaDec, RustForger, and SEER all consume a runtime/proof/state/uncertainty/value signal before a later action. | `[agent_inference]` ADI and RustForger provide the clearest repository-repair chains; AutoRocq supplies the strongest checked-stop semantics; LogicHunter changes investigation rather than target repair. Sources: corresponding cards' `conclusion_evidence`. |
| Prepared evidence changes a downstream system | `[direct_evidence]` Locus transforms fuzzing, TestPrune changes repair validation/stopping, IssueExec changes patch context, ReduceFix changes repair prompts, and ToolTrain changes the learned repository-search policy. | `[agent_inference]` These establish intervention but not necessarily a live observe-replan loop in the component that constructs the signal. Sources: corresponding cards' `conclusion_evidence`. |
| Diagnosis, ranking, or data synthesis without deployed consumption | `[direct_evidence]` Understanding Agents, Beyond Final Code, CES, LAT, Clotho, DeepK's controlled no-loop evaluation, and MCTS-Refine do not show their focal signal correcting a live agent action. | `[agent_inference]` These works may supply useful observability or training material, but should not be counted as online control evidence. Sources: corresponding cards' `conclusion_evidence`. |

### Shared hidden assumptions

1. `[agent_inference]` Tests or checker outcomes stand in for semantic correctness. This assumption underlies trajectory success labels, patch acceptance, reducer validation, training rewards, and code-generation evaluation; formal methods strengthen consistency checking but still depend on the statement/specification. Sources: Understanding Agents Section II-C; ADI Section 5.1; ReduceFix Section 3.3; ToolTrain Section 3.3; SEER Section 3.1.1; AutoRocq Section 2.1; MSG Section IV.
2. `[agent_inference]` Reproduction and execution are stable enough that an observed state describes the target failure. This is central to ADI, TestPrune, IssueExec, ReduceFix, and RustForger, but nondeterminism, coverage holes, and environment mismatch are incompletely studied. Sources: ADI Section 6; TestPrune Section 6; IssueExec Section 6; ReduceFix Section 6; RustForger Section 6.
3. `[agent_inference]` A compressed or structured representation preserves the information needed for action: action categories, error regexes, predicates, proof trees, DAGs, formal clauses, dual memory, latent directions/GMMs, minimized inputs, and value estimates all make this assumption in different forms. Sources: technical-mechanism and assumption sections of all 21 cards.
4. `[agent_inference]` Developer patches, requirement labels, canaries, TSGs, and reference solutions encode the intended target. Alternative valid fixes and underspecified intent challenge ToolTrain, MCTS-Refine, Event-B Agent, Locus, StepFly, and DeepK. Sources: ToolTrain Appendix C; MCTS-Refine Section III; Event-B Agent Section 7.1; Locus Section 4.1; StepFly Section 5.1; DeepK Section 3.2.
5. `[agent_inference]` The host model can notice and use the control affordance. ADI invocation drops with weaker models; tool-trained policies require warm-up; state/checker interfaces do not compensate fully for weak planning. Sources: ADI Section 5.4.3; ToolTrain Section 5.2; DeepK Section 5.1.
6. `[agent_inference]` Public Python, Rust, competitive-programming, and formal benchmarks generalize to broader SE agents. The current evidence is heavily concentrated in Python/SWE-bench and small code-generation tasks, with Rust and formal settings providing valuable but narrow counterpoints. Sources: dataset and limitation fields across the 21 cards.

### Non-monotonic evidence and contradictions

- `[direct_evidence]` More low-level tool interaction can hurt: 53% of sampled PDB sessions are abandoned. Source: ADI Section 5.4.1.
- `[direct_evidence]` More execution feedback can hurt: incomplete TestPrune suites cause premature stopping, and full long tests can be worse than no tests in ReduceFix. Sources: TestPrune Section 5.3.2; ReduceFix Sections 5.3-5.4.
- `[direct_evidence]` More retrieval/context can hurt: Locus predicates can conflict with fuzzer heuristics, AutoRocq can inject irrelevant facts, and DeepK degrades beyond three retrieved records. Sources: Locus Section 4.6; AutoRocq Section 6.3; DeepK Section 5.3.
- `[direct_evidence]` More explicit reasoning can hurt: LogicHunter's forced eight rounds increase hallucination/FPR, and SEER finds CoT turns 4.7% of previously correct answers wrong. Sources: LogicHunter Section 4.6; SEER Section 1 and Figure 2.
- `[direct_evidence]` Coherent reasoning can still be wrong: 53.08% of CES-coherent simulations predict an incorrect output. Source: CES Section 6.2; Table 1.
- `[agent_inference]` Together these findings reject a monotonic resource assumption. The relevant control problem is when to acquire, compress, trust, and stop using feedback, not merely whether feedback is available. Sources: the five bullets above.

### Value reassessment after full reading

- `[agent_inference]` Higher value than shortlist-level evidence suggested: ADI and RustForger isolate executable state and reproduction mechanisms; AutoRocq grounds stop decisions in checked proofs; TestPrune includes important negative causal cases; LogicHunter exposes state-depth/precision trade-offs; SEER isolates value-guided direct-versus-CoT choice. Sources: ADI Tables 2-4; RustForger Table 6; AutoRocq Table 3; TestPrune Section 5.3.2; LogicHunter Table 8 and Figure 5; SEER Tables 2-3.
- `[agent_inference]` More useful as counterevidence than as control mechanisms: Beyond Final Code weakens error-presence heuristics; CES weakens fluent/coherent-reasoning proxies; ReduceFix weakens "more test context" assumptions. Sources: Beyond Final Code Table 3; CES Table 1; ReduceFix Tables 6 and 9.
- `[agent_inference]` Narrower or lower mechanism value than selection implied: Understanding Agents is descriptive and heavily manual; Locus is offline preprocessing; IssueExec is fixed trace-mediated localization rather than adaptive test-driven repair; LAT and Clotho do not act on their signals; DeepK disables recovery loops; MCTS-Refine does not isolate faithful process supervision. Sources: corresponding cards' `relevance_reassessment`.
- `[agent_inference]` Formal-method papers remain valuable for observable control, but their high acceptance rates must be narrowed to implementation/specification consistency rather than intent correctness. Sources: AutoRocq Sections 2 and 6; Event-B Agent Tables 3-5; MSG Sections IV-V.

### Principal evidence gaps carried into Batch 2

- `[agent_inference]` Causal controls are missing for many focal mechanisms: anti-pattern suppression, adaptive test choice, LAT/Clotho-driven actions, DeepK inside a live loop, and MCTS-Refine versus matched endpoint-only data. Sources: paper-card `evidence_gaps`.
- `[agent_inference]` Intermediate reasoning fidelity is largely unmeasured even when papers use terms such as reasoning quality, root-cause understanding, or process supervision. Terminal tests, gold patches, or exact locations dominate labels. Sources: CES Table 1; DeepK Algorithm 2; ToolTrain Figure 2; MCTS-Refine Figures 3-4; SEER Section 3.1.
- `[agent_inference]` Repeated-run and annotation-reliability evidence is inconsistent. Understanding Agents lacks independent double coding; RustForger lacks a reliability coefficient for reproduction labels; many agent configurations run once at temperature zero. Sources: Understanding Agents Section II-F; RustForger Section 6; individual cards' limitations.
- `[agent_inference]` Semantic correctness beyond tests/checkers remains unresolved, especially for selected-test stopping, formal specification generation, minimized counterexamples, and gold-patch training. Sources: TestPrune Section 5.3.2; MSG Section IV; ReduceFix Section 6; ToolTrain Appendix C; MCTS-Refine Section III.
- `[direct_evidence]` Version/evidence-location issues remain for LAT, ToolTrain, MCTS-Refine, and SEER (preprint/generic metadata or title mismatch), LogicHunter (placeholder DOI), IssueExec (future-dated proceedings formatting), DeepK (artifact URL absent), TestPrune (table/prose mapping conflict), AdaDec (table/prose performance conflict), and MCTS-Refine (Verified/Lite conclusion swap). Sources: corresponding card metadata and limitation/reassessment fields.

## Stage boundary

- `[agent_inference]` Batch 1 is complete enough to proceed to `DEEP_READING_BATCH_2`: all 21 assigned papers were fully read and carded, each cluster has an interim synthesis, contradictory evidence and unresolved source issues are preserved, and no research idea or complete solution was generated. Source: this synthesis; `cards/*.yaml`; validation recorded in `state/checkpoint.yaml`.
