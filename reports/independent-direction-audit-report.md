# INDEPENDENT_DIRECTION_AUDIT

## Audit record

- Candidate: `FINALIST_STAGEWISE_CAUSAL_RESCUE_PROFILES`.
- Audit date: 2026-07-26.
- Review stance: independent and adversarial software-engineering top-venue review.
- Scope: novelty boundary, claim falsifiability, interface intervention validity, pilot sufficiency, and positive/negative-result value.
- Boundary: no task execution, model call, training, implementation, or formal experiment was performed.

The audit read `AGENTS.md`, `config/research_scope.yaml`, `state/checkpoint.yaml`, the three direction artifacts, both prior-art attack reports, the finalist ledger, all 42 paper cards, and `synthesis/cross-paper-synthesis.md`. An additional independent arXiv search on 2026-07-26 used query families covering coding-agent failure attribution, checkpoint/replay, fault injection, causal intervention, and agent trajectory diagnosis. The search was used to find threatening work, not to infer novelty from missing results.

## Decision

- `[agent_inference]` **REVISE_BEFORE_PILOT**. Source: the claim audit, intervention audit, and pilot audit below.
- `[agent_inference]` The direction is not returned to idea seeding because a narrow residual question remains plausible: whether *native, typed* evidence, state, action, and validation interfaces have different conditional rescue effects at the same code-agent checkpoint. Source: the direct and cross-field comparisons below.
- `[agent_inference]` `PASS_TO_PILOT` is not justified. The current four-interface effects are not identified as endogenous causal bottlenecks, and the proposed minimum sample cannot support the stated transfer and heterogeneity claims. Source: Sections 3 and 4.

## Five-dimensional score

| Dimension | Score | Independent reason |
|---|---:|---|
| Novelty | 2/4 | The exact four-interface code-agent matrix was not found, but the causal ingredients and much of the empirical problem are now covered by DoVer, CodeTracer, Coherence Collapse, FALAT, AgenTracer, AuditRepairBench, and FlowFixer. The residual is a narrow conditional evidence claim, not an established new phenomenon. |
| Rigor | 2/4 | The kill-first pilot specifies replay hashes, typed payloads, placebo controls, hidden outcomes, and cluster sensitivity. However, single-interface substitutions are total downstream assistances with overlapping information paths; no valid endogenous-stage estimand or treatment-interaction plan is yet fixed. |
| Relevance | 3/4 | Failure recovery, misleading validation, and evidence-to-action gaps are central problems for repository agents and are directly supported by the 42-card synthesis. The result would matter if it demonstrated a robust gap beyond existing trajectory diagnosis and replay. |
| Verifiability & Transparency | 2/4 | The checkpoint manifest and exclusion rules are unusually explicit. The hidden validator, alternative-fix adjudication, native state-slot availability, oracle provenance, and leakage audit are not yet specified at a level that permits independent reproduction. |
| Feasibility | 2/4 | A small replay pilot is conceivable, but two scaffolds, two model families, four typed interventions, gold-safe hidden behavior checks, and 30 valid nested checkpoints are a high engineering burden. Existing replay studies report substantial inconclusive and nondeterministic cases. |

## Core claim audit

### 1. Same surface failure loop

- `[direct_evidence]` The pilot predeclares a signature consisting of the last three normalized action/tool categories, public error family, repeated file or symbol, progress state, and stop/continue state, with no hidden-test or gold-patch content. Source: `directions/minimum-kill-pilot.md`, `Eligibility and loop signature`.
- `[agent_inference]` This makes a *surface-match rule* falsifiable, but it does not make the matched checkpoints causally comparable. The signature omits repository state, unobserved history, tool availability, model belief, task difficulty, and the exact candidate patch state. Two trajectories can match the tuple while exposing different intervention support and different future action sets. Source: the pilot signature; `synthesis/cross-paper-synthesis.md`, `P2`, `P3`, `P5`, and `P7`.
- `[agent_inference]` Eligibility is selected after a failed or looping trajectory is observed and after replayability and four-hook availability are checked. This is a defensible feasibility screen, but it makes the population a selected subset of failures rather than a sample on which a general visible-loop law can be claimed. Source: `directions/minimum-kill-pilot.md`, `Eligibility`; `synthesis/cross-paper-synthesis.md`, `P9`.
- Judgment: **partially clear and falsifiable, but not an identification condition**.

### 2. Four interfaces have different causal rescue profiles

- `[direct_evidence]` The design defines `E` evidence acquisition, `S` derived state/diagnosis, `A` next executable action, and `V` validation, each with an oracle, a harmful/placebo control, and an isolation rule. Source: `directions/minimum-kill-pilot.md`, `Interventions`.
- `[agent_inference]` The proposed contrast estimates the effect of injecting an externally supplied assistance at a checkpoint, not the causal contribution of the endogenous stage that caused the original failure. A correct diagnosis, a correct action, and a corrective validator can all bypass the same upstream failure. A dominant rescue effect therefore does not identify the original bottleneck without a stronger mediation or source-value argument. Source: Geiger et al., `Causal Abstraction`, Definitions 44-48 and 52, `https://jmlr.org/papers/v26/23-0058.html`; Ge et al., `https://arxiv.org/abs/2301.13348v2`; FALAT, `https://arxiv.org/abs/2606.00765v1`.
- `[agent_inference]` `E` is not isolated from `S` or `V`: an inserted observation changes the next state and action, and a validator counterexample is itself new evidence that can localize a fault. `S` is not isolated if a scaffold lacks a first-class state slot; a prompt or message replacement then changes context rather than a native derived state. `A` changes repository state and produces new observations, so its effect includes a transition and an evidence update. `V` changes continuation and stopping, but can also induce a new diagnostic search. Source: `synthesis/cross-paper-synthesis.md`, `P2`, `P3`, `P5`, and `P7`; `directions/minimum-kill-pilot.md`, `Interventions`.
- `[direct_evidence]` The pilot itself concedes that stage effects can interact and says that the single-interface design will kill the additive claim if interactions dominate. Source: `directions/minimum-kill-pilot.md`, `Engineering blockers`.
- `[direct_evidence]` SciCrafter uses four staged oracle interventions and explicitly states that their effects are not fully orthogonal; it interprets them as marginal diagnostic signals rather than isolated capacities. Source: Zhou et al., `SciCrafter`, Sections 5.1 and 6.4, `https://arxiv.org/abs/2604.24697v2`.
- `[agent_inference]` A paired `oracle - placebo` effect is not sufficient when the placebo is actively harmful. The treatment can look large because the false diagnosis, false action, or false validator damages the continuation. Untouched replay is present but is not the primary effect contrast. Source: `directions/minimum-kill-pilot.md`, `Controls and oracles` and `Outcomes, metrics, and statistical units`.
- Judgment: **not currently causally identifiable**. The current objects are intervention-specific conditional rescue effects, not identified endogenous four-stage causal profiles.

### 3. Reproducibility and transfer

- `[direct_evidence]` The planned transfer gate requires phenomena in both scaffolds, both model families, both task strata, and at least 30 valid checkpoints, with at least three signature strata. Source: `directions/minimum-kill-pilot.md`, `Minimum scale and transfer gate` and `Gate S4`.
- `[agent_inference]` Thirty checkpoints nested in at least six repositories cannot estimate repository heterogeneity or stable cross-configuration transfer with useful precision. The minimum per-scaffold and per-model counts do not ensure balanced scaffold-by-model-by-signature cells after exclusions. Source: `directions/minimum-kill-pilot.md`, `Data and trajectory source` and `Gate E4`; `synthesis/cross-paper-synthesis.md`, `P9`.
- `[direct_evidence]` Three repetitions are proposed for every branch, while the estimated rescue rate can only take coarse values and API models may not provide reproducible seeds. Source: `directions/minimum-kill-pilot.md`, `Interventions` and `Engineering blockers`.
- `[direct_evidence]` Existing independent work reports the same problem: ADI and RustForger note provider or execution nondeterminism and mostly single runs; DoVer repeats each intervention three times but still labels 57.6-66.7% of difficult intervention trials inconclusive on its two Who&When settings. Source: `cards/FSE2026_empowering-autonomous-debugging-agents-with-efficient-dynamic-analysis.yaml`, `limitations`; `cards/ICSE2026_evaluating-and-improving-automated-repository-level-rust-issue-resolutio.yaml`, `limitations`; DoVer, Section 5.2 and Table 3, `https://arxiv.org/abs/2512.06749`.
- Judgment: **reproducibility is testable; the proposed transfer claim is under-supported by the minimum sample**.

## Independent novelty-boundary recheck

The following works were rechecked from their primary manuscripts or official records. These checks go beyond the prior-art ledger and are not absence claims.

### Failure-process analysis and stage diagnosis

- `[direct_evidence]` `Failure as a Process` retains 1,794 valid trajectories from 89 Terminal-Bench tasks, three coding-agent scaffolds, and seven models. It annotates error onset, empirical lock-in, observability, root cause, and recovery. Its internal-validity section explicitly describes the comparisons as observational. Source: Zhao et al., Sections II-B-D, V, and VI, `https://arxiv.org/abs/2607.09510v1`.
- `[direct_evidence]` `CodeTracer` filters 7,936 raw runs to 3,326 trajectories across four code-agent frameworks and five backbones, assigns stage and error-critical-step labels, and reports reflective replay after injecting localized diagnostic evidence under a matched continuation budget. Source: Li et al., Sections 2.1-2.3, 3.2, 4.3, Figure 6, and `Limitations`, `https://arxiv.org/abs/2604.11641v3`.
- `[direct_evidence]` `Coherence Collapse` applies a search/read/edit decomposition to 16,758 trajectories from three architectures and seven models. Five intermediate edits that were bit-identical to the reference patch were re-submitted through the SWE-bench Docker harness and all five passed; a reference-free consensus intervention reports a directional 3.0 percentage-point lift. Source: Kim et al., Sections 2-4.3, `https://arxiv.org/abs/2603.24631v2`.
- `[agent_inference]` These works already establish that code-agent failures can be decomposed by trajectory stage, that a correct intermediate state can be lost, and that diagnostic or checkpoint feedback can rescue a failure. The finalist cannot treat stage decomposition, process analysis, checkpoint replay, or recovery-window evidence as its delta. Source: the three works above.

### Counterfactual intervention, component replacement, and agent diagnosis

- `[direct_evidence]` `DoVer` segments a session into trials, generates failure hypotheses, edits orchestrator messages or plans at the suspected step, preserves all earlier steps, replays the suffix, and evaluates success, progress, validated, refuted, partially validated, and inconclusive outcomes. It uses three independent runs per intervention, recovers 17.6% of Who&When trials and 49.0% of GSMPlus trials, and leaves 57.6-66.7% of the difficult Who&When interventions inconclusive. Source: Ma et al., Sections 3-5.5 and Tables 1-4, `https://arxiv.org/abs/2512.06749`.
- `[direct_evidence]` `FALAT` defines a decisive step set as a minimal set whose corrected steps recover the expected output while earlier steps remain fixed and later steps adapt. It constructs typed dependencies, checks counterfactual sufficiency, and performs local adversarial re-search. Source: Rafi et al., Sections 2-3 and 5, `https://arxiv.org/abs/2606.00765v1`.
- `[direct_evidence]` `AgenTracer` defines a decisive error by replacing a step with an analyzer-provided oracle action and re-simulating the suffix; the analyzer receives the full failure context, environmental feedback, and ground-truth solution. It also injects faults into successful trajectories and repeats the procedure for dataset construction. Source: Zhang et al., Sections 3-4 and Algorithm 1, `https://arxiv.org/abs/2509.03312v2`.
- `[direct_evidence]` `AuditRepairBench` holds task, candidate set, tool outputs, and the final evaluator fixed while blocking only the evaluator-to-selector path. Its source-level channel-surgery subset spans 80 cases, but the paper explicitly declines to certify a latent mechanism or strong prospective validity. Source: Hu et al., Sections 1, 3, and 6, `https://arxiv.org/abs/2605.04624v1`.
- `[direct_evidence]` `FlowFixer` converts workflow traces into symbolic node states and temporal/causal constraints, performs failure attribution and root-cause analysis, and closes a diagnosis-to-repair verification loop. It reports DoVer as an intervention-based baseline with 79.6% failure-attribution accuracy and explicitly contrasts symbolic diagnosis with repeated intervention replay. Source: Ma et al., Sections II-III and V, `https://arxiv.org/abs/2607.02882v1`.
- `[agent_inference]` The remaining gap is therefore not "causal intervention for agent trajectories" or "diagnosis that changes recovery." It is at most the narrower comparison of four *native code-agent interface contracts* under a common checkpoint, with a new empirical claim about heterogeneity beyond these protocols. Source: the works above and `directions/novelty-boundary.md`.

### Replay and fault-injection infrastructure

- `[direct_evidence]` `Shepherd` makes agent execution a reversible, forkable trace. Its counterfactual replay optimizer forks at the first affected commit and replays only the suffix under a workflow edit, while guard and fix sets constrain regressions. Source: Yu et al., Sections 3.2-3.4 and 5.2, `https://arxiv.org/abs/2605.10913v3`.
- `[direct_evidence]` `DoVer` reports that a checkpoint/replay interface and sufficiently rich logs are preconditions, and that adding checkpointing required non-trivial engineering. Source: DoVer, Section 7, `https://arxiv.org/abs/2512.06749`.
- `[agent_inference]` Checkpoint restoration and suffix replay are now reusable infrastructure rather than a defensible novelty contribution. The finalist must show a code-agent phenomenon that survives this infrastructure comparison. Source: Shepherd and DoVer above.

### Cross-field causal machinery

- `[direct_evidence]` `Causal Abstraction` defines simple, recursive, and distributed interchange interventions and interchange-intervention accuracy, and defines direct and indirect effects through a mediator. Source: Geiger et al., Definitions 44-48 and 52, `https://jmlr.org/papers/v26/23-0058.html`; independently checked in the manuscript text.
- `[direct_evidence]` Dynamic mediation in an MDP decomposes immediate direct, immediate mediation, delayed direct, and delayed mediation effects under consistency, sequential randomization, and positivity, with multiply robust estimators. Source: Ge et al., Sections 3-5, `https://arxiv.org/abs/2301.13348v2`; independently checked in the manuscript text.
- `[direct_evidence]` COCOA assigns delayed rewards to counterfactual actions through contribution coefficients, compares against dynamic-programming ground truth, and evaluates long-horizon key-to-door and task-interleaving environments. Source: Schug et al., Sections 3-4, `https://arxiv.org/abs/2306.16803v2`; independently checked in the manuscript text.
- `[agent_inference]` The finalist has no new causal estimator, mediation definition, intervention operator, actual-cause definition, or counterfactual credit algorithm. Any paper-level value must come from a carefully delimited code-agent empirical boundary. Source: the three works above.

## Interface identifiability audit

| Interface | What the treatment actually changes | Main threat to the claimed stage effect |
|---|---|---|
| `E` evidence | Adds a verified observation or reproducer to the agent context | It changes derived state, action, and later validation input; information quantity and authority wording are not matched by a stale "placebo." |
| `S` derived state | Replaces an explicit diagnosis/state payload | The two scaffolds may not have a native equivalent slot. A prompt-injected diagnosis is an assistance to the policy, not an intervention on the endogenous state mechanism. |
| `A` executable action | Executes a vetted patch/tool action and returns control | Repository mutation, tool output, and subsequent evidence all change. The effect is a transition plus new observations, and gold-derived actions can leak location or patch intent. |
| `V` validation | Replaces a stop/acceptance signal with a counterexample or failure | The counterexample is itself evidence and can trigger localization or a new action. It is not separable from `E` unless payload semantics are constrained and audited. |

- `[agent_inference]` The four rows are useful operational interfaces, but the current pilot does not prove that they are distinct mediators. It establishes neither a valid support condition for replacing each interface nor a factorial estimate of interaction effects. Source: dynamic mediation assumptions above; `directions/minimum-kill-pilot.md`, `Engineering blockers`.
- `[agent_inference]` Oracle substitution differs materially from ordinary ablation only if the oracle has an independently verified semantic target, the untouched continuation is a primary comparator, off-target state changes are measured, and the oracle cannot encode the gold patch, hidden test answer, or later-stage result. The current plan states these requirements but does not yet provide an executable audit protocol or a native contract for each scaffold. Source: `directions/minimum-kill-pilot.md`, `Interventions` and `Controls and oracles`.
- `[agent_inference]` A positive `A` or `V` result can be a debugging assistance result even when `E` or `S` caused the original failure. Calling it a causal bottleneck requires a separate argument that the endogenous interface value, not the external oracle assistance, was the altered mechanism. Source: FALAT and DoVer counterfactual-sufficiency definitions above.

## Minimum pilot audit

### Scale and unit

- `[direct_evidence]` The design screens 20 unique tasks from at least six repositories, targets 30-40 valid checkpoints, uses two scaffolds and two model families, and permits at most two checkpoints per task. Source: `directions/minimum-kill-pilot.md`, `Data and trajectory source`.
- `[agent_inference]` A checkpoint is the correct within-trajectory intervention unit, but the independent unit is a checkpoint nested in task, repository, scaffold, and model. Branches and repeats cannot be treated as additional samples. The proposed repository-cluster bootstrap is directionally correct, but six repository clusters are too few for a transfer claim. Source: `directions/minimum-kill-pilot.md`, `Outcomes, metrics, and statistical units`.
- `[agent_inference]` The 20-task screen can test whether the harness produces a handful of valid branches. It cannot reliably establish heterogeneity across three signature strata, two scaffolds, two model families, two task strata, and six repositories after replay and oracle exclusions. Source: the declared minimums and Gate E4.

### Repeats and stochasticity

- `[agent_inference]` Three repeats per condition are enough to expose gross replay failure but not enough to estimate a stochastic rescue probability or stable stage ordering. A profile with rates 0, 1/3, 2/3, and 1 has very coarse resolution, and API nondeterminism is not removed by a cached transcript. Source: `directions/minimum-kill-pilot.md`, `Engineering blockers`; DoVer Section 5.2.
- `[direct_evidence]` A related intervention study with three repeats still reports a majority of difficult trials as inconclusive, while SciCrafter uses eight independent runs for each task-level score. Source: DoVer Table 3, `https://arxiv.org/abs/2512.06749`; SciCrafter Section 5.2, `https://arxiv.org/abs/2604.24697v2`.

### Rescue, placebo, untouched replay, and hidden correctness

- `[direct_evidence]` The pilot defines hidden behavioral correctness as its primary endpoint, adds untouched replay and harmful/placebo branches, and marks alternative-valid-fix ambiguity inconclusive. Source: `directions/minimum-kill-pilot.md`, `Controls and oracles` and `Outcomes, metrics, and statistical units`.
- `[agent_inference]` These definitions are not yet sufficient. The primary effect should be oracle versus untouched replay, with placebo versus untouched as a diagnostic control; `oracle - placebo` alone confounds benefit with placebo damage. Hidden correctness needs an independent requirement or developer adjudication layer and a predeclared multi-oracle policy because tests, builds, and developer patches do not uniquely encode intent. Source: `synthesis/cross-paper-synthesis.md`, `P7`; PatchDiff card and `ICSE2026_are-solved-issues-in-swe-bench-really-solved-correctly-an-empirical-stud.yaml`, Sections 4.2-5.
- `[direct_evidence]` PatchDiff finds 7.8% incorrect plausible patches from developer tests and leaves 66.2% of manually audited suspicious cases indeterminate. Source: `cards/ICSE2026_are-solved-issues-in-swe-bench-really-solved-correctly-an-empirical-stud.yaml`, `evaluation.main_results` and `failure_modes`.
- `[agent_inference]` A full developer-patch positive control proves that the environment can admit one recorded solution; it does not make the developer patch unique or prevent state/diagnosis/action oracles from revealing gold information. Source: `directions/minimum-kill-pilot.md`, `Controls and oracles`; PatchDiff evidence above.

### Baselines and statistical design

- `[agent_inference]` Error count plus the visible signature is too weak as the sole predictive baseline. A convincing marginal-value claim needs at least a trajectory-diagnosis baseline (CodeTracer or Coherence-style features), an in-situ intervention/replay baseline (DoVer/FALAT-like), and native scaffold continuation without oracle assistance. Source: CodeTracer, Coherence Collapse, DoVer, and FALAT above.
- `[agent_inference]` The 0.33 dominance threshold, 0.33 gap, 0.67 sign agreement, and 40% resolved-profile gate are decision rules, not identified statistical properties. They need sensitivity intervals and a hierarchical uncertainty plan fixed before observing outcomes; no p-value can repair a failed interface contract. Source: `directions/minimum-kill-pilot.md`, `Outcomes` and `Hard continue or kill thresholds`.
- `[agent_inference]` S5's requirement that a simple baseline be below 0.70 does not test whether the four-interface profile adds information beyond strong process diagnostics. A weak-baseline win would support a diagnostic engineering result, not the finalist's novelty boundary. Source: `directions/minimum-kill-pilot.md`, `Gate S5`.

## Positive and negative result value

- `[agent_inference]` A positive result after the required design repairs could support a narrow empirical claim: at predeclared native code-agent interfaces, conditional rescue effects vary within an observationally matched loop and remain detectable across more than one scaffold and model family. It would still be an application of mature intervention machinery, not a new causal method or a universal agent law. Source: the novelty recheck above.
- `[agent_inference]` A positive result under the current design would likely be read as DoVer/CodeTracer/Coherence Collapse plus four prompt or action assists, because the current treatment does not identify an endogenous bottleneck and the baseline is weak. Source: the direct works above and the interface audit.
- `[agent_inference]` A robust negative result could be valuable if it shows that rescue effects are non-separable, interaction-dominated, or no better than strong process baselines. That would bound the use of additive stage attribution and quantify the marginal value of causal replay for code agents. Source: `directions/minimum-kill-pilot.md`, `Gate S3`, `Gate S5`, and `Gate S6`.
- `[agent_inference]` Under the current small and selected pilot, a negative result would mostly be an engineering or construct-validity report. It would not by itself establish a general null because the study could fail through replay, oracle ambiguity, or insufficient clusters. Source: the scale and identifiability audits above.

## Three most likely top-venue rejection reasons

1. `[agent_inference]` **Prior-art saturation:** reviewers will see a mature causal replay idea combined with code-agent process work already covered by DoVer, CodeTracer, Coherence Collapse, FALAT, AgenTracer, and FlowFixer; the four labels look like a finer taxonomy or component ablation rather than a new SE insight.
2. `[agent_inference]` **No causal identification:** the four oracle substitutions change downstream information, state, repository transitions, and stopping in overlapping ways; gold-derived oracle content and non-native scaffold slots make the reported "dominant stage" an assistance effect rather than an endogenous causal bottleneck.
3. `[agent_inference]` **Insufficient and ambiguous pilot:** 20 tasks, six repositories, 30-40 selected checkpoints, three repeats, a weak trace baseline, and incomplete intent adjudication cannot support heterogeneous cross-scaffold/model transfer or hidden behavior correctness.

## Required revisions before any experiment

These are finite design repairs, not a new large research program.

1. **Fix the estimand and interface contracts.** Rename the estimand to a conditional paired rescue effect unless a native mediation argument is supplied. For each scaffold, specify a first-class E/S/A/V contract, predeclare which payload fields are forbidden, and drop any checkpoint where an interface is fused or absent. State explicitly that a dominant rescue effect does not identify the original endogenous failure cause.
2. **Fix the contrast and oracle audit.** Make untouched replay the primary comparator; retain neutral format-matched sham and harmful controls as separate diagnostics. Freeze oracle provenance, hidden-test and patch-leak checks, independent intent adjudication, and an explicit inconclusive policy before screening. Report placebo-versus-untouched and oracle-versus-untouched effects, not only oracle-versus-placebo.
3. **Fix precision and comparison strength.** Use at least five independent continuation repeats per retained condition and raise the effective checkpoint/repository floor (recommended minimum: 48 checkpoints across at least eight repositories), or remove cross-scaffold/model transfer from the claim and label the pilot feasibility-only. Add CodeTracer/Coherence-style trajectory features and a DoVer/FALAT-style intervention baseline before interpreting a causal-profile advantage. Predeclare a hierarchical cluster interval and sensitivity analysis for the dominance thresholds.

The first two revisions are **pre-experiment blockers** because no experiment can repair an undefined treatment or a leaking oracle. The third is partly pre-experiment (unit, baseline, threshold, and sample floor) and partly answerable by the pilot (actual replay rate, heterogeneity, repeatability, transfer, and negative-result behavior).

## Final reviewer conclusion

- `[agent_inference]` The finalist has a relevant and potentially falsifiable empirical question, but its current novelty boundary is too narrow and its causal intervention contract is not yet credible for a top venue.
- `[agent_inference]` The direction should be revised before pilot execution; it should not be expanded into a new umbrella or returned to unrestricted idea seeding.
- `[agent_inference]` Final ruling: `REVISE_BEFORE_PILOT`.
