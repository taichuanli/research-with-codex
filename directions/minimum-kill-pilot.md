# Minimum Kill Pilot: Stagewise Causal Rescue Profiles

## Phase boundary

- `[agent_inference]` This is a preregistration-quality design for the only finalist, not an experiment run, implementation, task download, model call, or result claim. Source: requested `DIRECTION_NARROWING` boundary.
- `[agent_inference]` The pilot is intentionally optimized to reject the direction on replay, intervention-isolation, causal-resolution, or transfer failure before a benchmark or full system is built. Source: finalist risks in `directions/direction-narrowing-comparison.md`.

## Core claim to kill

- `[agent_inference]` Research question: For coding-agent failures with the same normalized visible loop signature, do independently controlled evidence, derived-state, action, and validation interfaces reveal different causal bottlenecks that repeat across scaffolds, models, and tasks? Source: `directions/direction-narrowing-comparison.md / Stagewise failure attribution`.
- `[agent_inference]` Falsifiable hypothesis: Among deterministically restorable failures with the same predeclared loop signature, single-interface oracle substitutions produce repeatable and heterogeneous four-entry rescue profiles, and the heterogeneity occurs in more than one scaffold and model family. Source: finalist definition.
- `[agent_inference]` Null favored by the kill design: ordinary trace/error features are sufficient, the four interventions are not separable, or any apparent rescue profile is a harness-, model-, or task-specific artifact. Source: prior-art reviewer objections and the gates below.

## Data and trajectory source

- `[agent_inference]` Use public repository-level issue-repair tasks with redistributable repositories, deterministic dependency installation, a developer patch, public tests, and an additional held-back behavioral oracle. SWE-bench Verified-compatible tasks are eligible, but benchmark membership alone is not an oracle-quality guarantee. Source: `synthesis/cross-paper-synthesis.md / P7`; PatchDiff and To Run evidence cited there.
- `[agent_inference]` Screen existing public failed trajectories from two independently implemented open scaffolds, then regenerate only the selected cells under pinned versions. Candidate scaffolds are SWE-agent and OpenHands; two configurations of one codebase do not count as two scaffolds. Source: cross-scaffold requirement and SEAlign's negative transfer result in `synthesis/cross-paper-synthesis.md / P9`.
- `[agent_inference]` Select 20 unique tasks from at least six repositories, pre-stratified into ten evidence/localization-heavy and ten validation/behavior-heavy tasks. Keep at most two scientific checkpoints per task and target 30-40 valid failure checkpoints after feasibility screening. Source: need for multiple failure-chain stages and repository-clustered inference.
- `[agent_inference]` Run the 20 tasks in a 2-scaffold by 2-model screening grid, using one pinned open-weight coding model and one independent API/model family. Exact model IDs, weights or API snapshots, decoding settings, and access dates must be frozen before execution. Source: transfer claim and repeated-run uncertainty in `state/checkpoint.yaml / prior_art_cross_field_attack.non_blocking_uncertainty`.
- `[agent_inference]` Restrict the kill pilot to one language ecosystem if necessary for deterministic setup; do not claim cross-language transfer from this pilot. Repository and task-family transfer are the minimum task generality gate. Source: minimum-cost boundary.

## Eligibility and loop signature

- `[agent_inference]` A scientific checkpoint is eligible only when the repository state is restorable, the agent has entered a repeated or non-progressing decision pattern, all four intervention interfaces can be exposed without changing earlier history, and a full developer-patch positive control passes the held-back oracle. Source: causal isolation and recoverability requirements.
- `[agent_inference]` Define the visible loop signature before outcomes are inspected as the tuple of: normalized last three action/tool categories, normalized public error family, repeated target file or symbol indicator, progress/no-progress indicator, and stop/continue state. Do not use hidden tests, gold patch content, or intervention outcomes in the signature. Source: finalist's observationally matched-loop claim.
- `[agent_inference]` Require at least three signature strata with at least four checkpoints each; otherwise the pilot cannot test within-signature causal heterogeneity and the direction is killed rather than expanded post hoc. Source: scientific Gate S2 below.

## Executable checkpoint to preserve

`[agent_inference]` For every base trajectory, preserve the following immutable record before branching. Source: replay and intervention construct requirements below.

- `[agent_inference]` Repository origin, base commit, current diff, untracked-file manifest, file-content tree hash, and task identifier. Source: the executable state needed by the finalist intervention object.
- `[agent_inference]` Container image digest, dependency lockfiles, installed-package inventory, environment variables after secret redaction, locale, clock policy, network policy, and CPU/architecture metadata. Source: APR-replay and reproducibility boundary in `synthesis/cross-paper-synthesis.md / P2`.
- `[agent_inference]` Scaffold repository commit, configuration, system prompt, tool schemas, context-management policy, memory/state fields, stopping rules, and remaining budget. Source: scaffold-transfer construct.
- `[agent_inference]` Exact model identifier or weight hash, tokenizer version, decoding parameters, random seeds where supported, and raw request/response hashes. Source: model-repeatability gate.
- `[agent_inference]` Complete message/tool transcript, stdout/stderr, exit codes, test and build outputs, current process manifest, and the pre-intervention next-decision boundary. Source: evidence/state/action interface isolation.
- `[agent_inference]` Oracle artifacts with provenance: reproducer and evidence generator, diagnosis adjudication record, vetted next-action record, hidden validator version, and developer-patch positive-control result. Source: oracle-independence requirement.
- `[agent_inference]` A checkpoint is restored successfully only if the repository tree hash, deterministic tool outputs, public tests, and transcript prefix through the intervention boundary match. Semantic similarity of generated continuation is not part of environment restoration. Source: separation of environment replay from model stochasticity.

## Interventions

`[agent_inference]` At one restored decision boundary, branch exactly one typed interface and leave the earlier transcript, repository, budget, and continuation policy fixed. Source: matched single-interface estimand.

| Interface | Oracle substitution | Matched harmful/placebo control | Isolation requirement |
|---|---|---|---|
| Evidence acquisition `E` | `[agent_inference]` Insert only a verified reproducer, runtime observation, or test output that exposes the relevant failing behavior without revealing the developer patch or diagnosis. | `[agent_inference]` Insert a schema-, length-, and style-matched observation produced from the same repository but irrelevant to the fault or verified stale. | `[agent_inference]` No diagnosis, edit instruction, or hidden-test expected answer may appear in either payload. Source: P2 versus P5 stage boundary. |
| Derived state/diagnosis `S` | `[agent_inference]` Replace only the scaffold's explicit working-state or diagnosis slot with an independently adjudicated fault location, violated invariant, and causal relation; retain the original raw tool transcript. | `[agent_inference]` Use a plausible, equally specific diagnosis contradicted by execution while matching format and token budget. | `[agent_inference]` The state payload may name a cause and location but may not contain patch text, a next tool call, or validation outcome. Source: P3 and P5. |
| Next executable action `A` | `[agent_inference]` Replace only the next tool call or minimal edit step with a human-vetted action shown offline to be on a hidden-correct repair path; then return control to the unchanged agent. | `[agent_inference]` Use a syntactically valid, equally sized action that is locally plausible but independently shown not to repair the target behavior. | `[agent_inference]` Do not substitute the complete developer patch unless that patch is genuinely one atomic action under both scaffolds; full-patch replay remains a positive control, not the stage treatment. Source: artificial-oracle rejection risk. |
| Validation `V` | `[agent_inference]` Replace only the acceptance/stop input with a held-back behavioral counterexample or failing validator result for the current candidate state, then apply the scaffold's standard continuation rule. | `[agent_inference]` Supply a matched validator message whose claimed failure is false or irrelevant under the same current repository. | `[agent_inference]` Validation must evaluate the current candidate action/state rather than provide new fault-localization evidence; cases where this boundary cannot be maintained are ineligible. Source: P7 and the evidence/validation overlap risk. |

- `[agent_inference]` Branch conditions per checkpoint are: untouched replay, four oracle substitutions, and four matched harmful/placebo substitutions. Pair each oracle and control under the same continuation seed or request configuration and repeat each condition three times. Source: need to separate content, format, and stochastic continuation effects.
- `[agent_inference]` Use a fixed post-intervention budget of at most six agent decisions and the same token/tool budget in every branch. A branch cannot receive extra repair time because its intervention occurred earlier. Source: matched causal comparison.
- `[agent_inference]` This yields at most 1,080 branch continuations for 40 checkpoints (`40 x 9 x 3`), before feasibility exclusions, and requires no training. Source: declared pilot scale.

## Controls and oracles

- `[agent_inference]` Untouched replay estimates the checkpoint's base continuation distribution; matched harmful/placebo payloads control for extra tokens, interface activation, and authoritative formatting. Source: intervention design above.
- `[agent_inference]` Full developer-patch replay is an eligibility positive control only. It establishes that the environment and hidden validator admit the recorded task solution; it must not be counted as an action-stage rescue. Source: gold-leakage boundary.
- `[agent_inference]` Evidence oracle: executable reproducer or observation, independently rerun three times with the same result. Source: P2 reproducibility requirement.
- `[agent_inference]` State oracle: two reviewers independently derive or verify location, invariant, and causal relation using execution evidence; disagreements are adjudicated before treatment generation. Source: P5 independent-cause-label requirement.
- `[agent_inference]` Action oracle: a minimal action whose offline branch reaches the developer-patch behavioral outcome or a reviewer-accepted alternative without requiring hidden expected output in the prompt. Source: alternative-valid-fix boundary.
- `[agent_inference]` Validation oracle: held-back regression tests, broader behavioral probes, or a reviewer-validated counterexample not visible in the base run. Public tests alone are not sufficient. Source: P7.
- `[agent_inference]` If the hidden oracle cannot distinguish an alternative valid fix, mark the branch `inconclusive`; do not force it into success or failure. Source: `AGENTS.md / Evidence and Claims`; PatchDiff ambiguity evidence in the synthesis.

## Outcomes, metrics, and statistical units

- `[agent_inference]` Primary endpoint: independently hidden behavioral correctness within the fixed continuation budget. Secondary endpoints are target-failure removal without public-test regression, exit from the predeclared loop signature, and action/tool cost; secondary endpoints cannot by themselves pass the scientific gate. Source: intent-validation boundary.
- `[agent_inference]` For checkpoint `i` and stage `s`, estimate paired rescue effect `d(i,s)` as hidden-correctness rate under the oracle substitution minus the rate under its matched harmful/placebo substitution across the three paired continuations. The rescue profile is `R(i) = [d(i,E), d(i,S), d(i,A), d(i,V)]`. Source: mature intervention machinery applied to the finalist estimand.
- `[agent_inference]` A dominant stage is defined only if its paired effect is at least `0.33`, exceeds the next largest stage effect by at least `0.33`, and has the same effect sign in at least two of three continuation pairs. Otherwise label the checkpoint `mixed_or_unresolved`. Source: predeclared separability rule.
- `[agent_inference]` Replay metrics: exact restoration rate, untouched-outcome agreement, and transcript-prefix equality. Intervention metrics: off-target field changes, token-budget difference, oracle leakage, and blind reviewer identification of the changed interface. Source: construct-validity gates.
- `[agent_inference]` Scientific metrics: fraction with a dominant stage, within-signature dominant-stage diversity, pairwise rescue-profile agreement across continuation seeds, and distribution of rescue effects by scaffold, model family, repository, and task stratum. Source: hypothesis components.
- `[agent_inference]` Baseline comparison: predict dominant stage using only error count and the predeclared visible signature in leave-one-repository-out evaluation; report macro-F1 and calibration against the empirical repeatability ceiling. No high-capacity learned baseline is needed for the kill pilot. Source: claim that stage interventions add information beyond trace taxonomy.
- `[agent_inference]` Primary independent unit is the versioned task-by-scaffold-by-model checkpoint. Repeated branches are within-unit measurements, not additional samples; uncertainty uses repository- and task-cluster bootstrap intervals. Report task-level results as a sensitivity analysis to avoid counting two checkpoints from one task as independent. Source: avoidance of pseudoreplication.
- `[agent_inference]` The pilot is a decision gate rather than a confirmatory publication experiment; effect estimates and cluster intervals are reported, but no isolated `p < 0.05` result can override a failed hard gate. Source: kill-first objective.

## Minimum scale and transfer gate

- `[agent_inference]` Minimum agents: two independently implemented scaffolds. Source: scaffold-transfer hypothesis and SEAlign boundary.
- `[agent_inference]` Minimum models: two model families, one pinned open-weight and one independent API/model family. Source: model-transfer hypothesis and replay auditability requirement.
- `[agent_inference]` Minimum tasks: 20 unique tasks from at least six repositories and two predeclared task strata. Source: task-transfer hypothesis and repository-clustered statistical unit.
- `[agent_inference]` Minimum valid scientific sample: 30 checkpoints after all replay and oracle exclusions, at least 12 checkpoints per scaffold, at least 10 per model family, and at least three loop-signature strata of four checkpoints each. Source: minimum cross-configuration resolution needed by the hypothesis.
- `[agent_inference]` Transfer for the pilot means the existence of causal heterogeneity in both scaffolds, both model families, and both task strata; it does not require identical effect magnitudes and does not establish cross-language or universal-agent transfer. Source: scoped finalist claim.

## Engineering blockers

- `[agent_inference]` Environment replay may fail because dependency resolution, tests, tool output, time, network, or subprocess state is nondeterministic. Source: P2 and stagewise ledger / `unverified_information`.
- `[agent_inference]` Scaffold hooks may not expose an explicit derived-state slot or may fuse validation with evidence, making the four interventions researcher-created prompt edits rather than native interface substitutions. Source: causal abstraction and isolation risk.
- `[agent_inference]` API models may not support reproducible seeds or stable snapshots; caching raw responses can test environment replay but cannot substitute for independent continuations. Source: repeated-run boundary.
- `[agent_inference]` Developer patches may leak the answer into diagnosis/action oracles, and hidden tests may reward only one implementation. Source: P7 and artificial-oracle rejection risk.
- `[agent_inference]` Some tool actions have external side effects or incomplete rollback; the pilot must exclude network writes and use container-local reversible actions. Source: operational safety and checkpoint contract.
- `[agent_inference]` Stage effects can interact: correct evidence may matter only with correct state, and validation acts after an action. The single-interface pilot deliberately kills the additive rescue-profile claim if such interactions dominate; a factorial expansion is not an automatic rescue. Source: dynamic mediation and interaction coverage.

## Hard continue or kill thresholds

`[agent_inference]` All engineering gates and all scientific gates must pass. Borderline values do not authorize threshold changes; they produce `KILL_OR_RESEED`, not an expanded pilot. Source: kill-first phase objective.

### Engineering gates

- `[agent_inference]` Gate E1, restoration: continue only if at least 95% of candidate checkpoints reproduce repository hashes, deterministic tool outputs, public tests, and transcript prefix in three dry restores. Kill below 85%; between 85% and 95% permits one engineering repair and a fresh full re-audit before any model branches. Source: deterministic causal-state requirement.
- `[agent_inference]` Gate E2, intervention integrity: continue only if at least 90% of branches change exactly one declared interface and have no gold-answer leakage under blind audit. Kill if fewer than 80% pass; exclude up to 10% inconclusive branches without replacement. Source: single-interface estimand.
- `[agent_inference]` Gate E3, oracle coverage: continue only if hidden outcomes adjudicate at least 90% of branches and every retained task passes the full-patch positive control. Kill if adjudication falls below 80% or alternative-valid-fix ambiguity is concentrated in one treatment. Source: P7.
- `[agent_inference]` Gate E4, sample floor: kill if fewer than 30 valid checkpoints or fewer than the declared per-scaffold, per-model, repository, task-stratum, or signature minima remain. Do not replenish selectively after seeing rescue outcomes. Source: transfer and selection-bias boundary.

### Scientific gates

- `[agent_inference]` Gate S1, causal signal: continue only if at least 40% of valid checkpoints have a dominant stage under the predeclared rule and the cluster-bootstrap lower bound is at least 25%. Kill if the point estimate is below 25%. Source: need for a non-rare stage-rescue phenomenon.
- `[agent_inference]` Gate S2, non-identifying visible loops: continue only if at least two loop-signature strata each contain two different dominant stages, with at least two checkpoints supporting each stage. Kill if every sufficiently populated signature maps to one stage or remains unresolved. Source: core hypothesis.
- `[agent_inference]` Gate S3, profile resolution: continue only if the median pairwise sign agreement of nonzero stage effects across paired continuation seeds is at least 0.67 and at least two distinct stages dominate five or more checkpoints each. Kill if one stage explains at least 80% of resolved profiles. Source: repeatability and separability claims.
- `[agent_inference]` Gate S4, configuration transfer: continue only if S1-S2 phenomena appear in both scaffolds, both model families, and both task strata, with no single scaffold-model cell contributing more than 60% of all resolved profiles. Kill or narrow to a local instrument otherwise; the current finalist claim does not survive a local-only result. Source: transfer hypothesis.
- `[agent_inference]` Gate S5, descriptive-baseline advantage: continue only if leave-one-repository-out macro-F1 from error count plus visible signature is at least 0.15 below the dominant-stage repeatability ceiling and is below 0.70. Kill if the simple baseline is within 0.05 of the ceiling or reaches at least 0.80, because causal replay then adds little diagnostic information to the stated problem. Source: delta from existing taxonomies.
- `[agent_inference]` Gate S6, oracle specificity: continue only if matched harmful/placebo substitutions do not improve hidden correctness by more than 0.10 on average and oracle effects are not explained by token count, authority wording, or extra continuation steps. Kill if any such artifact accounts for the stage ordering. Source: artificial-oracle rejection risk.

## Decision outcomes

- `[agent_inference]` `CONTINUE`: every E and S gate passes. The conclusion is limited to pilot evidence that the stagewise causal phenomenon is viable for a full study; novelty still remains subject to independent audit and updated prior art. Source: phase discipline.
- `[agent_inference]` `KILL_CONSTRUCT`: E1-E4 pass but S1-S3 or S5-S6 fail. Conclude that the four-stage rescue-profile construct adds no stable causal resolution beyond simpler traces or is contaminated by intervention artifacts. Source: scientific gates.
- `[agent_inference]` `KILL_TRANSFER`: local causal profiles exist but S4 fails. Conclude that the current top-venue direction overstates scaffold/model/task validity; do not silently relabel the finalist as general. Source: transfer gate.
- `[agent_inference]` `RESEED_ENGINEERING_PRESSURE`: deterministic replay or hidden-oracle gates fail before scientific inference. Return to the reproducible-evidence or intent-validation pressure point rather than implementing a larger causal system. Source: `synthesis/cross-paper-synthesis.md / P2 and P7`.

## Negative-result research value

- `[agent_inference]` Stable but single-stage rescue would support a narrower empirical claim that one downstream bottleneck dominates the sampled coding-agent loops, while killing stagewise heterogeneity. Source: S3.
- `[agent_inference]` High trace-baseline performance would validate cheaper observational diagnostics and bound the marginal value of causal replay. Source: S5.
- `[agent_inference]` Dominant stage interactions or unstable profiles would provide direct construct-validity evidence against additive single-interface attribution in long-horizon agents. Source: E2, S3, and the dynamic mediation boundary.
- `[agent_inference]` These negative conclusions are reportable evidence, but none automatically constitutes the finalist paper or authorizes a later phase without a new direction decision. Source: phase discipline.
