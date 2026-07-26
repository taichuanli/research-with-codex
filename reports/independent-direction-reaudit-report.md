# INDEPENDENT_DIRECTION_REAUDIT

## Re-audit record

- `[direct_evidence]` Re-audited direction: `FINALIST_NATIVE_INTERFACE_CONDITIONAL_RESCUE`, derived from `FINALIST_STAGEWISE_CAUSAL_RESCUE_PROFILES`. Source: `state/checkpoint.yaml / direction_revision`.
- `[direct_evidence]` Re-audit date: 2026-07-26. Review stance: independent and adversarial software-engineering top-venue review. Source: requested `INDEPENDENT_DIRECTION_REAUDIT` phase.
- `[direct_evidence]` Inputs included `AGENTS.md`, `config/research_scope.yaml`, `state/checkpoint.yaml`, the independent initial audit and decision package, the revised research question and estimand, the E/S/A/V contract, intervention controls, novelty boundary, minimum feasibility boundary, prior-art reports, the stagewise ledger, the cross-paper synthesis, and pinned SWE-agent and OpenHands source files. Source: repository artifacts and source URLs cited below.
- `[direct_evidence]` A narrow threat search checked carrier/source-authority sensitivity, perturbed tool outputs, misleading feedback, and agent intervention work. It was used only to find damaging prior art; missing results were not treated as novelty evidence. Source: arXiv records for `2607.20827`, `2607.11098`, and `2506.03332`; official ISSTA 2026 Datura record.
- `[direct_evidence]` No pilot, task download, adapter implementation, model call, training, formal experiment, commit, or push was performed. Source: requested phase boundary.

## Decision

- `[agent_inference]` Final ruling: **`RETURN_TO_IDEA_SEEDING`**. Source: the three mandatory pass gates and findings below.
- `[agent_inference]` Fundamental failure category: **novelty disappeared after narrowing**. Once bottleneck, root-cause, dominant-stage, failure-taxonomy, and transfer claims are removed, the defensible result is a controlled comparison of correct, neutral, and wrong assistance at selected checkpoints. Source: `directions/direction-revision.md / Claims removed or narrowed; Residual contribution and falsifiability`; `directions/novelty-boundary.md / Exact residual contribution`.
- `[agent_inference]` The other two pass gates also fail: E/S/A/V do not form one stable cross-scaffold construct, and the feasibility-only boundary can kill engineering or construct validity but explicitly cannot support the core publication claim. Source: Sections 2, 3, 7, and 8 below; `directions/minimum-kill-pilot.md / FEASIBILITY_ONLY_PASS`.

## Five-dimensional score

| Dimension | Score | Independent reason |
|---|---:|---|
| Novelty | 1/4 | `[agent_inference]` The residual claim is assistance effectiveness and misinformation sensitivity after replay, oracle replacement, source-authority probing, tool-output fault injection, and deceptive-feedback robustness are already occupied. The exact four-label matrix is a combination, not a new scientific phenomenon. Source: Sections 1, 5, and 6. |
| Rigor | 2/4 | `[agent_inference]` The revision fixes the primary contrast and makes individual treatment branches auditable, but it does not identify a common four-carrier construct, equalize oracle information strength, establish policy-distribution stability, or separate carrier, truth, relevance, timing, and action cost. Source: Sections 2 and 3. |
| Relevance | 3/4 | `[agent_inference]` Reliable use of evidence, actions, validation, and external feedback is central to repository agents. The problem remains important even though this particular decomposition does not yield a publishable contribution. Source: `synthesis/cross-paper-synthesis.md / P2, P3, P5, P7, and P9`. |
| Verifiability & Transparency | 2/4 | `[agent_inference]` Provenance, hashes, exclusion rules, and inconclusive handling are unusually explicit, but semantic oracle validity and user intent still depend on underdetermined requirements and reviewer judgment, while treatment-specific exclusions can dominate the retained sample. Source: Sections 3, 4, and 8. |
| Feasibility | 2/4 | `[agent_inference]` The machinery is technically conceivable, but 16 checkpoints require 1,040 independent continuations before extra baseline runs, plus oracle construction, leak review, intent review, and two-scaffold replay. Simultaneous four-contract eligibility is likely the binding constraint. Source: `directions/minimum-kill-pilot.md / Minimum data requirement`; Section 8. |

## 1. Does the narrowed question still produce publishable scientific knowledge?

- `[direct_evidence]` The sole retained estimand is the oracle-versus-untouched total effect on intent-valid repair at an eligible checkpoint; no endogenous cause, stage, mediator, or transfer claim remains. Source: `directions/direction-revision.md / Revised research question and unique estimand; Claims removed or narrowed`.
- `[agent_inference]` A positive result therefore establishes that externally supplied, independently validated information or action can improve a stochastic continuation from some selected checkpoints. This is a controlled assistance result, not an explanation of agent failure or a newly discovered software-engineering phenomenon. Source: the estimand above; `directions/novelty-boundary.md / Positive and negative result boundary`.
- `[agent_inference]` The proposed four-way profile adds scientific value only if the entries are measurements of comparable constructs. They are not: E and V differ mainly by provenance, candidate state, and timing on the same observation channel, while S and A are coupled fields of one assistant/action event in the pinned scaffolds. Source: Section 2 below.
- `[agent_inference]` Strong process and replay baselines can show that interventions add predictive or diagnostic value, but they cannot turn an unstable interface taxonomy into a natural construct. A baseline win would still support a more elaborate assistance benchmark. Source: `directions/minimum-kill-pilot.md / F7 and KILL_FINE_ABLATION`.
- Judgment: `[agent_inference]` **The scientific contribution no longer clearly exceeds component assistance benchmarking.** Source: all findings in this section.

## 2. Are E/S/A/V natural and cross-scaffold research objects?

- `[direct_evidence]` In pinned SWE-agent, the next model request consumes `HistoryItem.content` and `tool_calls`; `StepOutput.thought` and `StepOutput.action` are parsed metadata stored beside the raw `step.output`. Source: SWE-agent commit `3ea751c087f32b16e039a2233dd6eefecef325d5`, `sweagent/agent/agents.py`, `DefaultAgent.add_step_to_history` and `forward`; `sweagent/agent/models.py`, history-to-message conversion, `https://github.com/SWE-agent/SWE-agent/tree/3ea751c087f32b16e039a2233dd6eefecef325d5`.
- `[agent_inference]` SWE-agent therefore has no universally first-class, independently model-visible S field. S exists only for parser and function-calling configurations where the raw assistant content can be reserialized while preserving the action and tool-call representation. Source: the pinned source above; `directions/direction-revision.md / Scaffold-specific native mappings`.
- `[direct_evidence]` In pinned OpenHands, `ActionEvent.to_llm_message` sends `thought` and `tool_call` in the same assistant message, while every ordinary tool result is an `ObservationEvent` sent with role `tool`. Source: OpenHands software-agent-sdk commit `310989d306114efd0fcadbcbed9ff9c21d4a5963`, `event/llm_convertible/action.py`, `ActionEvent.to_llm_message`; `observation.py`, `ObservationEvent.to_llm_message`, `https://github.com/OpenHands/software-agent-sdk/tree/310989d306114efd0fcadbcbed9ff9c21d4a5963`.
- `[direct_evidence]` In both pinned scaffolds, E and V use the same native observation event type and are distinguished only by producing-action and candidate-state provenance. Source: `directions/direction-revision.md / Scaffold-specific native mappings`; pinned source above.
- `[agent_inference]` E/S/A/V are thus semantic roles assigned by the study over two broad native channel families: assistant/action messages and tool observations. They are not four native carrier types that recur with stable meaning across scaffolds. Source: the source mappings above.
- `[agent_inference]` The S definition also mixes thought, plan, diagnosis, location, invariant, and working hypothesis. Those objects have different truth conditions and causal roles, so passing one schema audit does not make S comparable within or across scaffolds. Source: `directions/direction-revision.md / Common semantic contract matrix`.
- Judgment: `[agent_inference]` **The contract is operationally auditable on selected events but remains a scaffold-specific abstraction, not a natural four-part scientific ontology.** Source: all findings in this section.

## 3. Is the sole estimand identifiable?

### Untouched replay stability

- `[direct_evidence]` F1 tests repository, event-prefix, public-tool, process-policy, and budget restoration, but it does not define a gate for temporal stability of the model continuation distribution, randomized execution order, provider-version drift, or branch-time exchangeability. Source: `directions/minimum-kill-pilot.md / F1; Minimum data requirement`.
- `[agent_inference]` Freezing request configuration does not freeze an API model's sampling distribution or backend. Without randomized interleaving and a predeclared drift check, `P(Y|untouched,C_i,G_i)` can change across the period in which 13 conditions are executed. Source: DoVer nondeterminism warning in `reports/independent-direction-audit-report.md / Repeats and stochasticity`; the current F1 definition.
- `[agent_inference]` Five continuations can expose gross instability but provide a coarse estimate of checkpoint-conditional success, especially when the checkpoint is the clustered unit. Source: `directions/minimum-kill-pilot.md / Minimum data requirement`; initial audit repeatability analysis.

### Oracle assistance and later information

- `[direct_evidence]` E/S/A builders are blinded to developer patches, hidden validators, later-interface payloads, and future suffixes, but V is explicitly derived from a held-back validator through a redaction boundary. Source: `directions/direction-revision.md / Provenance and information firewall`.
- `[agent_inference]` V therefore receives privileged behavioral information unavailable to E/S/A. Redaction can prevent literal hidden-test leakage, but it cannot make the four oracle payloads equal in information source, specificity, timing, or distance from the endpoint. Source: the V contract and firewall above.
- `[direct_evidence]` An A payload must be shown after freezing to lie on an intent-valid repair path. Source: `directions/direction-revision.md / Common semantic contract matrix; Provenance and information firewall`.
- `[agent_inference]` Unless that validation uses an oracle independent of the study endpoint, treatment eligibility is selected using downstream semantic knowledge. Even when independent, A is stronger than a diagnosis or observation because it directly supplies a verified transition. Source: the A contract above; Section 4 intent-oracle finding.

### Neutral sham and mismatched controls

- `[agent_inference]` A task-agnostic neutral observation or diagnosis is not matched to a real oracle on plausibility, relevance, epistemic specificity, or expected model prior; it tests a gross channel disturbance, not pure carrier activation. Source: `directions/direction-revision.md / Intervention conditions and primary contrasts`.
- `[agent_inference]` The A sham is especially non-comparable because a no-op consumes an executable transition and returns a real observation, while the oracle action changes repository or tool state. Its contrast includes action opportunity cost and transition semantics. Source: the A and sham contracts.
- `[agent_inference]` The mismatched condition combines falsity or irrelevance with source plausibility, task distance, payload strength, and possible action cost. One mismatched payload cannot separately identify information quality, semantic relevance, misinformation susceptibility, and carrier authority. Source: the mismatched-control definition.
- `[agent_inference]` These controls can detect large artifacts, but they are insufficient to decompose carrier, content truth, relevance, authority, timing, and semantic help. Source: the three conditions above; Liao, `Auditing Provenance Sensitivity`, arXiv:2607.20827, abstract, `https://arxiv.org/abs/2607.20827`.

### Shared carriers and cross-interface interpretation

- `[agent_inference]` When E and V share an observation carrier, their difference is a contrast between payload semantics, source action, candidate state, and timing, not between carriers. When S and A share one assistant event, their difference also depends on how raw content and tool-call fields are coupled. Source: pinned scaffold mappings in Section 2.
- `[agent_inference]` Each `tau_j` can be defined descriptively for a fully specified selected intervention regime, but the vector `R(C_i)` has no common treatment scale. Its entries cannot be ordered as if they measured comparable interface sensitivity. Source: `directions/direction-revision.md / Revised research question and unique estimand`; findings above.
- Judgment: `[agent_inference]` **The individual assistance effects are conditionally observable under strong stability assumptions, but the claimed common E/S/A/V estimand is not sufficiently identifiable or interpretable for the retained scientific contribution.** Source: all findings in this section.

## 4. Can intent-valid repair be established independently?

- `[direct_evidence]` The revision rejects developer-patch equality, requires public issue satisfaction, predeclared target-behavior and regression/property families, two blind reviewers, and third-party adjudication. Source: `directions/direction-revision.md / Intent and alternative-patch adjudication`.
- `[direct_evidence]` PatchDiff found 22 certainly incorrect patches among 77 manually inspected suspicious patches and left 51 of 77, or 66.2%, indeterminate because divergent behavior and underspecified issues did not establish incorrectness. Source: `cards/ICSE2026_are-solved-issues-in-swe-bench-really-solved-correctly-an-empirical-stud.yaml / evaluation.main_results and failure_modes`; paper Sections 4.2-5.
- `[agent_inference]` More reviewers improve reliability but do not create missing intent. When requirements underdetermine behavior, reviewer agreement is a social adjudication protocol rather than an oracle independent of subjective interpretation. Source: PatchDiff evidence above; `synthesis/cross-paper-synthesis.md / P7`.
- `[agent_inference]` Newly authored behavioral and regression families can provide strong direct evidence for explicit issues, but they remain incomplete approximations of user intent and can share assumptions with V construction. Source: `directions/direction-revision.md / V contract; Intent and alternative-patch adjudication`.
- `[agent_inference]` Excluding underspecified or disputed tasks can make the retained outcomes more credible, but it shifts the population toward unusually explicit, testable issues. Source: the inconclusive policy; Section 8.
- Judgment: `[agent_inference]` **The protocol can create a defensible adjudicated endpoint for a narrow curated subset, but not an intent oracle that is generally independent of hidden tests, developer evidence, and subjective requirements interpretation.** Source: all findings in this section.

## 5. Meaning of a significant positive result

- `[agent_inference]` A positive oracle-versus-untouched effect would show that a particular independently supplied assistance improved repair probability at eligible checkpoints. Source: revised estimand.
- `[agent_inference]` A sham contrast could show sensitivity to channel form or authority, while a mismatched contrast could show vulnerability to wrong or irrelevant content. Source: revised controls.
- `[agent_inference]` Cross-scaffold differences would show that the exposed event schemas and continuation policies differ, not that one universal E/S/A/V mechanism differs. Source: Section 2.
- `[agent_inference]` Because oracle payload strength, timing, and proximity to the endpoint are not standardized, a significant ordering would not exceed the conclusions that some correct assistance is more effective, more correct information can help, wrong information can hurt, and scaffolds expose different interfaces. Source: Sections 2 and 3.
- Judgment: `[agent_inference]` **Even a clean positive result does not support a stronger new scientific claim under the current boundary.** Source: all findings in this section.

## 6. Coverage by nearby causal probing, assistance, intervention, and robustness work

- `[direct_evidence]` DoVer edits orchestrator messages or plans at a suspected step, preserves the prefix, replays the suffix, and evaluates recovery with repeated interventions and inconclusive outcomes. Source: Ma et al., Sections 3-5.5 and Tables 1-4, `https://arxiv.org/abs/2512.06749`.
- `[direct_evidence]` FALAT defines decisive corrected step sets through counterfactual sufficiency and local adversarial re-search, while AgenTracer replaces a step with an oracle action and re-simulates the suffix. Source: FALAT Sections 2-3 and 5, `https://arxiv.org/abs/2606.00765`; AgenTracer Sections 3-4 and Algorithm 1, `https://arxiv.org/abs/2509.03312`.
- `[direct_evidence]` AgentCheck records real tool responses, perturbs them with 12 fault types, replays matching calls, and reports that failures are often silent, confident use of incorrect tool outputs. Source: Mazumder and Lia, `AgentCheck`, arXiv:2607.11098, abstract, `https://arxiv.org/abs/2607.11098`.
- `[direct_evidence]` `Auditing Provenance Sensitivity in LLM Agent Action Selection` holds task, proposition, position, and policy fixed while changing source authority, directly testing carrier or provenance sensitivity in next-action choice. Source: Liao, arXiv:2607.20827, abstract, `https://arxiv.org/abs/2607.20827`.
- `[direct_evidence]` `Helpful Agent Meets Deceptive Judge` systematically varies constructive through malicious feedback and reports that strong agents often switch correct answers after one persuasive but flawed critique. Source: Ming et al., arXiv:2506.03332, abstract, `https://arxiv.org/abs/2506.03332`.
- `[direct_evidence]` Datura studies implicit trust in tool outputs and metadata and uses chained tool manipulation across five models and 740 safety-critical tasks. Source: Shao et al., official ISSTA 2026 abstract, `https://conf.researchr.org/details/issta-2026/issta-2026-research-papers/10/Datura-Progressive-Red-Teaming-Testing-for-Tool-Invocation-Chain-in-LLM-Agents`.
- `[agent_inference]` These works occupy counterfactual step replacement, replay intervention, tool-response fault injection, source-authority activation, misleading-feedback sensitivity, and tool-output manipulation. The exact E/S/A/V code-agent matrix is not identical, but combining the occupied ingredients does not establish a new contribution. Source: the works above; `AGENTS.md / Evidence and Claims`.
- Judgment: `[agent_inference]` **Carrier activation and misinformation sensitivity are already under direct causal-probing and robustness pressure.** Source: all works above.

## 7. Can the feasibility-only pilot kill or support the core claim?

- `[direct_evidence]` The minimum boundary requires 16 eligible checkpoints, 13 conditions per checkpoint, and five independent continuations per condition, which is 1,040 continuations before additional process and replay baseline runs. Source: `directions/minimum-kill-pilot.md / Minimum data requirement`.
- `[direct_evidence]` F1-F6 can kill restoration, contract, direct-write, leak, comparator, or adjudication failures; F7 requires strong baselines to be representable. Source: `directions/minimum-kill-pilot.md / Feasibility gates`.
- `[agent_inference]` Those gates can kill engineering feasibility and gross construct validity, which is useful, but most do not test whether the eventual scientific contribution exceeds assistance benchmarking. Source: gate definitions above.
- `[direct_evidence]` `FEASIBILITY_ONLY_PASS` explicitly states that passing establishes only technical and constructive testability, not contribution, novelty, causation, or transfer. Source: `directions/minimum-kill-pilot.md / Direction-kill and inconclusive conditions`.
- `[agent_inference]` `KILL_FINE_ABLATION` and `KILL_NO_MARGINAL_RESCUE` point toward scientific falsification, but 16 selected clustered units and five repeats are primarily a gross-signal screen; the boundary does not define a positive result capable of supporting the core top-venue claim. Source: the kill rules and minimum unit above.
- Judgment: `[agent_inference]` **The pilot has a real chance to kill the machinery or a large-effect version of the direction, but by its own definition it cannot support the core scientific claim. This fails the mandatory pass condition.** Source: all findings in this section.

## 8. Selection bias from simultaneous four-contract eligibility

- `[direct_evidence]` Every retained checkpoint must expose all four contracts and all 13 conditions; E and V must be separate source-attributed observations, S must be explicit and model-visible, A must admit an independently valid atomic action, and V requires a candidate state plus a separately attributable validator. Source: `directions/direction-revision.md / Executable checkpoint and treatment timing; Common semantic contract matrix`; `directions/minimum-kill-pilot.md / Minimum data requirement`.
- `[agent_inference]` This excludes failures before a candidate patch, agents with implicit or hidden state, trajectories without a distinct validator event, actions that are naturally multi-step, and scaffolds whose assistant content cannot be reserialized independently. Source: the ineligibility predicates above.
- `[agent_inference]` Eligibility also depends on the existence of leak-free oracle payloads and adjudicable intent, so the retained sample is selected for observability, repairability, explicitness, and available semantic supervision. Source: F2, F4, and F6.
- `[agent_inference]` If simultaneous eligibility is rare, the target population becomes unusually transparent and assistance-ready trajectories. Estimated rescue effects can be inflated relative to ordinary failures because checkpoints without constructible help are excluded by definition. Source: target-population definition and eligibility rules.
- `[agent_inference]` F2's support percentage does not repair this unless screening begins from a predeclared representative failure frame with a fixed denominator; the current boundary specifies thresholds but not that sampling frame. Source: `directions/minimum-kill-pilot.md / F2; Minimum data requirement`.
- Judgment: `[agent_inference]` **Rare four-contract coexistence would create severe selection bias and reduce the study to a narrow audit of unusually transparent agent trajectories.** Source: all findings in this section.

## Three most likely top-venue rejection reasons

1. `[agent_inference]` **Novelty collapsed after correction:** after removing unsupported causal and transfer claims, the paper measures the marginal utility and harm of correct, neutral, and wrong assistance, already pressured by replay, intervention, provenance-sensitivity, and misleading-feedback work. Source: Sections 1, 5, and 6.
2. `[agent_inference]` **Scaffold-specific and non-comparable construct:** E/V share tool-observation carriers, S/A share assistant/action events, and oracle payloads differ in strength, timing, endpoint proximity, and transition cost, so the four-entry profile has no stable common interpretation. Source: Sections 2 and 3.
3. `[agent_inference]` **Selected and unverifiable endpoint population:** all-four eligibility plus leak-free oracle and intent adjudication selects unusually transparent tasks, while reviewer consensus and finite validators cannot independently recover underspecified user intent. Source: Sections 4 and 8.

## Retained pressure points for later idea seeding

- `[agent_inference]` Retain `REPRODUCIBLE_EVIDENCE_BEFORE_STATE`: tool outputs can be stale, corrupted, ignored, or over-trusted before any derived-state claim is meaningful. Source: `synthesis/cross-paper-synthesis.md / P2`; AgentCheck and Datura evidence above.
- `[agent_inference]` Retain `DERIVED_STATE_FIDELITY`: explicit plans, diagnoses, and summaries still lack a stable truth and faithfulness contract across scaffolds. Source: `synthesis/cross-paper-synthesis.md / P3`; Section 2.
- `[agent_inference]` Retain `CHECKABLE_ACCEPTANCE_VS_INTENT`: independent intent adjudication remains unresolved even after the strongest bounded protocol in this revision. Source: `synthesis/cross-paper-synthesis.md / P7`; Section 4.
- `[agent_inference]` Retain `ENDPOINT_CREDIT_PROCESS_FIDELITY_TRANSFER`: event fields and process labels remain coupled to scaffold representation and endpoint supervision. Source: `synthesis/cross-paper-synthesis.md / P9`; Sections 2 and 8.
- `[agent_inference]` These are retained only as pressure points. This phase generates no new idea and does not revive any killed candidate. Source: requested phase boundary.

## Final reviewer conclusion

- `[agent_inference]` The revision is substantially more honest and auditable than the initial finalist, but the honesty exposes that the publishable causal claim was carrying most of the novelty. Source: comparison of the initial audit requirements with the revised claim boundary.
- `[agent_inference]` The E/S/A/V matrix can serve as an internal engineering diagnostic, but it is not accepted as a stable, identifiable, and scientifically distinctive research direction. Source: Sections 1-8.
- `[agent_inference]` Final ruling: **`RETURN_TO_IDEA_SEEDING`**. Source: mandatory pass-gate failure.
