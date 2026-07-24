# Deep-Reading Selection Report

## Scope and phase boundary

- `[direct_evidence]` The selection universe is the 988-paper cross-venue corpus and its FIELD_MAPPING assignments. Source: `synthesis/deep-reading-selection.json / input`.
- `[agent_inference]` The final plan selects 42 papers and excludes out-of-preference work using the boundary recorded in `scope_boundary`.
- No full-paper deep reading, research-idea generation, or direction confirmation was performed.

## Mechanism coverage and batches

| Mechanism cluster | Selected | Batch 1 | Batch 2 |
|---|---:|---:|---:|
| Failures, ineffective loops, and recovery in agent trajectories | 6 | 3 | 3 |
| Planning, action choice, tool choice, and stopping | 6 | 3 | 3 |
| Testing, execution, and program-analysis feedback | 6 | 3 | 3 |
| State, memory, specification, and constraint preservation | 6 | 3 | 3 |
| Signals of success, failure, progress, and uncertainty | 6 | 3 | 3 |
| Debugging, root-cause localization, and repair decisions | 6 | 3 | 3 |
| Agent training, process supervision, and policy optimization | 6 | 3 | 3 |

## Viewpoint coverage

| Role | Papers |
|---|---:|
| Empirical studies | 15 |
| Method papers | 37 |
| Training/process-optimization papers | 7 |
| Counterexample or contradictory-evidence papers | 8 |

[direct_evidence] SWE-bench-family evaluations occur in 14 of 42 selections; the remaining papers diversify formal verification, agent-framework testing, fuzzing, build failures, industrial troubleshooting, static analysis, and code-generation settings. No author appears on more than two selected papers.

## DEEP READING BATCH 1

| Paper | Venue | Primary mechanism | Roles | Full text |
|---|---|---|---|---|
| Understanding Software Engineering Agents: A Study of Thought-Action-Result Trajectories | ASE2025 | Failures, ineffective loops, and recovery in agent trajectories | EMPIRICAL_STUDY, COUNTEREXAMPLE_OR_CONTRADICTORY_EVIDENCE | OPEN_FULL_TEXT_CONFIRMED |
| Beyond Final Code: A Process-Oriented Error Analysis of Software Development Agents in Real-World GitHub Scenarios | ICSE2026 | Failures, ineffective loops, and recovery in agent trajectories | EMPIRICAL_STUDY, COUNTEREXAMPLE_OR_CONTRADICTORY_EVIDENCE | OPEN_FULL_TEXT_CONFIRMED |
| Empowering Autonomous Debugging Agents with Efficient Dynamic Analysis | FSE2026 | Failures, ineffective loops, and recovery in agent trajectories | METHOD_WORK | OPEN_FULL_TEXT_CONFIRMED |
| Agentic Predicates Reasoning for Directed Fuzzing | ICSE2026 | Planning, action choice, tool choice, and stopping | METHOD_WORK | OPEN_FULL_TEXT_CONFIRMED |
| Agentic Verification of Software Systems | FSE2026 | Planning, action choice, tool choice, and stopping | METHOD_WORK | OPEN_FULL_TEXT_CONFIRMED |
| Event-B Agent: Towards LLM Agent for Formal Model Synthesis and Repair | FSE2026 | Planning, action choice, tool choice, and stopping | METHOD_WORK | OPEN_FULL_TEXT_CONFIRMED |
| Can Old Tests do New Tricks for Resolving SWE Issues? | FSE2026 | Testing, execution, and program-analysis feedback | METHOD_WORK | OPEN_FULL_TEXT_CONFIRMED |
| IssueExec: A Test-Driven Approach for Localizing Software Engineering Issues | ISSTA2026 | Testing, execution, and program-analysis feedback | EMPIRICAL_STUDY, METHOD_WORK | OPEN_FULL_TEXT_CONFIRMED |
| Assessing Coherency and Consistency of Code Execution Reasoning by Large Language Models | ICSE2026 | Testing, execution, and program-analysis feedback | EMPIRICAL_STUDY, COUNTEREXAMPLE_OR_CONTRADICTORY_EVIDENCE | OPEN_FULL_TEXT_CONFIRMED |
| StepFly: Agentic Troubleshooting Guide Automation for Incident Diagnosis | FSE2026 | State, memory, specification, and constraint preservation | EMPIRICAL_STUDY, METHOD_WORK | OPEN_FULL_TEXT_CONFIRMED |
| Agentic Specification Generator for Move Programs | ASE2025 | State, memory, specification, and constraint preservation | METHOD_WORK | OPEN_FULL_TEXT_CONFIRMED |
| LogicHunter: Testing LLM Agent Frameworks with an Agentic Oracle | ISSTA2026 | State, memory, specification, and constraint preservation | METHOD_WORK | OPEN_FULL_TEXT_CONFIRMED |
| On LLMs’ Internal Representation of Code Correctness | ICSE2026 | Signals of success, failure, progress, and uncertainty | EMPIRICAL_STUDY, METHOD_WORK | OPEN_FULL_TEXT_CONFIRMED |
| Clotho: Measuring Task-Specific Pre-Generation Test Adequacy for LLM Inputs | FSE2026 | Signals of success, failure, progress, and uncertainty | METHOD_WORK | OPEN_FULL_TEXT_CONFIRMED |
| AdaDec: A Uncertainty-Guided Lookahead Decoding Framework for LLM-based Code Generation | FSE2026 | Signals of success, failure, progress, and uncertainty | EMPIRICAL_STUDY, METHOD_WORK | OPEN_FULL_TEXT_CONFIRMED |
| Debugging Engine Enhanced by Prior Knowledge: Can We Teach LLM How to Debug? | FSE2026 | Debugging, root-cause localization, and repair decisions | METHOD_WORK | OPEN_FULL_TEXT_CONFIRMED |
| Input Reduction Enhanced LLM-based Program Repair | ICSE2026 | Debugging, root-cause localization, and repair decisions | METHOD_WORK | OPEN_FULL_TEXT_CONFIRMED |
| Evaluating and Improving Automated Repository-Level Rust Issue Resolution with LLM-based Agents | ICSE2026 | Debugging, root-cause localization, and repair decisions | EMPIRICAL_STUDY, METHOD_WORK, COUNTEREXAMPLE_OR_CONTRADICTORY_EVIDENCE | OPEN_FULL_TEXT_CONFIRMED |
| Enhancing Issue Localization Agent with Tool-Interactive Training | ICSE2026 | Agent training, process supervision, and policy optimization | METHOD_WORK, TRAINING_WORK | OPEN_FULL_TEXT_CONFIRMED |
| MCTS-Refined CoT: High-Quality Fine-Tuning Data for LLM-Based Repository Issue Resolution | ASE2025 | Agent training, process supervision, and policy optimization | METHOD_WORK, TRAINING_WORK | OPEN_FULL_TEXT_CONFIRMED |
| SEER: Enhancing Chain-of-Thought Code Generation through Self-Exploring Deep Reasoning | ICSE2026 | Agent training, process supervision, and policy optimization | METHOD_WORK, TRAINING_WORK | OPEN_FULL_TEXT_CONFIRMED |

## DEEP READING BATCH 2

| Paper | Venue | Primary mechanism | Roles | Full text |
|---|---|---|---|---|
| Understanding Automated Program Repair Agents Through the Lens of Traceability: An Empirical Study | ISSTA2026 | Failures, ineffective loops, and recovery in agent trajectories | EMPIRICAL_STUDY, COUNTEREXAMPLE_OR_CONTRADICTORY_EVIDENCE | OPEN_FULL_TEXT_CONFIRMED |
| AgentInspect: Diagnosing Behavioral Failures in Artificial Intelligence Agents | ISSTA2026 | Failures, ineffective loops, and recovery in agent trajectories | EMPIRICAL_STUDY, METHOD_WORK | NOT_LOCATED_AFTER_TARGETED_SEARCH |
| TraceCoder: A Trace-Driven Multi-Agent Framework for Automated Debugging of LLM-Generated Code | ICSE2026 | Failures, ineffective loops, and recovery in agent trajectories | METHOD_WORK | OPEN_FULL_TEXT_CONFIRMED |
| To Run or Not to Run: Analyzing the Cost-Effectiveness of Code Execution in LLM-Based Program Repair | ISSTA2026 | Planning, action choice, tool choice, and stopping | EMPIRICAL_STUDY, COUNTEREXAMPLE_OR_CONTRADICTORY_EVIDENCE | OPEN_FULL_TEXT_CONFIRMED |
| Steering Tree-of-Thought Reasoning via Deductive Verification | ISSTA2026 | Planning, action choice, tool choice, and stopping | METHOD_WORK | NOT_LOCATED_AFTER_TARGETED_SEARCH |
| SAINT: Service-level Integration Test Generation with Program Analysis and LLM-based Agents | ICSE2026 | Planning, action choice, tool choice, and stopping | METHOD_WORK | OPEN_FULL_TEXT_CONFIRMED |
| Are “Solved Issues” in SWE-bench Really Solved Correctly? An Empirical Study | ICSE2026 | Testing, execution, and program-analysis feedback | EMPIRICAL_STUDY, METHOD_WORK, COUNTEREXAMPLE_OR_CONTRADICTORY_EVIDENCE | NOT_LOCATED_AFTER_TARGETED_SEARCH |
| Let the Code Speak: Incorporating Program Dynamic State for Better Method-Level Fault Localization | ASE2025 | Testing, execution, and program-analysis feedback | METHOD_WORK | PUBLISHER_RECORD_ONLY |
| SpecGuru: Hierarchical LLM-Driven API Points-to Specification Generation with Self-Validation | ICSE2026 | Testing, execution, and program-analysis feedback | METHOD_WORK | NOT_LOCATED_AFTER_TARGETED_SEARCH |
| ExpeRepair: Dual-Memory Enhanced LLM-based Repository-Level Program Repair | FSE2026 | State, memory, specification, and constraint preservation | METHOD_WORK | OPEN_FULL_TEXT_CONFIRMED |
| AttnCompress: Dynamic Attention-Guided Trajectory Compression for Software Engineering Agents | ISSTA2026 | State, memory, specification, and constraint preservation | METHOD_WORK | NOT_LOCATED_AFTER_TARGETED_SEARCH |
| EvidenT: An Evidence-Preserving Framework for Iterative System-Level Package Repair | ISSTA2026 | State, memory, specification, and constraint preservation | EMPIRICAL_STUDY, METHOD_WORK | OPEN_FULL_TEXT_CONFIRMED |
| Atropos: Improving Cost-Benefit Trade-off of LLM-based Agents under Self-Consistency with Early Termination and Model Hotswap | ISSTA2026 | Signals of success, failure, progress, and uncertainty | METHOD_WORK, TRAINING_WORK | OPEN_FULL_TEXT_CONFIRMED |
| Watson: A Cognitive Observability Framework for the Reasoning of LLM-Powered Agents | ASE2025 | Signals of success, failure, progress, and uncertainty | METHOD_WORK | PUBLISHER_RECORD_ONLY |
| Code-MUE: Measuring Code LLM' Uncertainty through Execution-based Semantic Interaction Graphs | ISSTA2026 | Signals of success, failure, progress, and uncertainty | EMPIRICAL_STUDY, METHOD_WORK | OPEN_FULL_TEXT_CONFIRMED |
| Repair Ingredients Are All You Need: Improving Large Language Model-Based Program Repair via Repair Ingredients Search | ICSE2026 | Debugging, root-cause localization, and repair decisions | METHOD_WORK | OPEN_FULL_TEXT_CONFIRMED |
| Root Cause Analysis of RISC-V Build Failures via LLM and MCTS Reasoning | ASE2025 | Debugging, root-cause localization, and repair decisions | METHOD_WORK | PUBLISHER_RECORD_ONLY |
| CausalRepair: Bridging the Causality Gap in Large Language Model-based Automated Program Repair via Dual-Slicing | ISSTA2026 | Debugging, root-cause localization, and repair decisions | METHOD_WORK | NOT_LOCATED_AFTER_TARGETED_SEARCH |
| SEAlign: Alignment Training for Software Engineering Agent | ICSE2026 | Agent training, process supervision, and policy optimization | METHOD_WORK, TRAINING_WORK | OPEN_FULL_TEXT_CONFIRMED |
| SWE-PDB: Teaching LLMs to Leverage Debugging Tools via Agentic Training | ISSTA2026 | Agent training, process supervision, and policy optimization | METHOD_WORK, TRAINING_WORK | NOT_LOCATED_AFTER_TARGETED_SEARCH |
| SEER: Self-Enhancing Chain-of-Thought Compression for Reasoning Models | ISSTA2026 | Agent training, process supervision, and policy optimization | EMPIRICAL_STUDY, METHOD_WORK, TRAINING_WORK, COUNTEREXAMPLE_OR_CONTRADICTORY_EVIDENCE | NOT_LOCATED_AFTER_TARGETED_SEARCH |

## Representative anchors

- **Understanding Software Engineering Agents: A Study of Thought-Action-Result Trajectories**: `[agent_inference]` Provides the closest trajectory-level empirical baseline for recurring action motifs, feedback integration, and anti-patterns across three software agents. Source: `official event eb127353-1d7b-48e8-a8db-15c801b17c0c / All Details / event description abstract`.
- **To Run or Not to Run: Analyzing the Cost-Effectiveness of Code Execution in LLM-Based Program Repair**: `[agent_inference]` Provides unusually direct evidence about when agents choose execution and whether repeated test runs help. Source: `official event fadfc637-50d7-43a7-8e0b-3895a086663e / All Details / event description abstract`.
- **Are “Solved Issues” in SWE-bench Really Solved Correctly? An Empirical Study**: `[agent_inference]` Shows that test-passing feedback can mislabel semantically incorrect agent patches and quantifies the resulting score inflation. Source: `official event 6aa55b46-6431-42bd-9d9f-1a4a30e8288a / All Details / event description abstract`.
- **Agentic Verification of Software Systems**: `[agent_inference]` Offers a sharply constrained setting where proof-tree structure, theorem-prover calls, and stopping at a checked derivation are observable. Source: `official event 460db077-3153-4258-8fa9-4cd2172bbae0 / All Details / event description abstract`.
- **EvidenT: An Evidence-Preserving Framework for Iterative System-Level Package Repair**: `[agent_inference]` Separates iteration-aware evidence management from tools in a multi-artifact repair task with dependency and architecture constraints. Source: `official event ab6c51a9-e45e-45a2-aa59-d098b9635d66 / All Details / event description abstract`.
- **On LLMs’ Internal Representation of Code Correctness**: `[agent_inference]` Finds an internal code-correctness signal that outperforms likelihood and verbalized confidence without test execution. Source: `official event feb1e4f3-e26e-45a7-bf07-b61c0023252d / All Details / event description abstract`.
- **Repair Ingredients Are All You Need: Improving Large Language Model-Based Program Repair via Repair Ingredients Search**: `[agent_inference]` Separates internal evidence for root-cause reasoning from external historical ingredients for choosing repair actions. Source: `official event a2ca8b54-6bfb-49ec-ad33-25591fcabf7b / All Details / event description abstract`.
- **SWE-PDB: Teaching LLMs to Leverage Debugging Tools via Agentic Training**: `[agent_inference]` Trains a stateful, long-horizon debugger policy using filtered interactive trajectories, SFT, and rule-reward RL. Source: `official event c9b53d39-8f33-4e8b-ae5a-d4d9214250d3 / All Details / event description abstract`.

## Important exclusions

| Paper | Category | Reason |
|---|---|---|
| Why AI Agents Still Need You: Findings from Developer-Agent Collaborations in the Wild | OUT_OF_SCOPE_HUMAN_STUDY | `[agent_inference]` Focuses on in-the-wild human-agent collaboration rather than agent mechanism control. |
| Unpacking AI Agent Participation in Issue-Centered Collaboration in Open-Source Software Development | OUT_OF_SCOPE_HUMAN_ORGANIZATIONAL | `[agent_inference]` Studies participation in open-source collaboration, outside the requested technical mechanism focus. |
| Spectrum-based Failure Attribution for Multi-Agent Systems | MULTI_AGENT_ORGANIZATION | `[agent_inference]` Failure attribution is specific to multi-agent activation and action allocation; excluded despite topical failure language. |
| CAM: A Causality-based Analysis Framework for Multi-Agent Code Generation Systems | MULTI_AGENT_ORGANIZATION | `[agent_inference]` Centers on causal importance of intermediate outputs in multi-agent code-generation architectures. |
| SWE-Debate: Competitive Multi-Agent Debate for Software Issue Resolution | MULTI_AGENT_ORGANIZATION | `[agent_inference]` Contribution is competitive multi-agent debate and orchestration, which the research preference excludes. |
| TraceDev: A Traceability-Driven Multi-Agent Framework for Requirement-to-Code Development | MULTI_AGENT_ORGANIZATION | `[agent_inference]` Traceability is relevant, but five-role organization dominates and state coverage is supplied by more mechanism-isolating papers. |
| AgentSpec: Customizable Runtime Enforcement for Safe and Reliable LLM Agents | PURE_SAFETY | `[agent_inference]` Runtime constraints are evaluated chiefly as cross-domain safety enforcement, outside the selected general SE-control evidence. |
| AgentBound: Securing Execution Boundaries of AI Agents | PURE_SECURITY | `[agent_inference]` Focuses on securing agent execution boundaries rather than general decision-control behavior. |
| Red-Teaming Coding Agents from a Tool-Invocation Perspective: An Empirical Security Assessment | PURE_SECURITY | `[agent_inference]` Tool-invocation analysis is framed as an adversarial security assessment. |
| Datura: Progressive Red Teaming Testing for Tool Invocation Chain in LLM Agents | PURE_SECURITY | `[agent_inference]` Progressive tool-chain testing targets attacks and guardrail bypass rather than general failure recovery. |
| Reducing Cost of LLM Agents with Trajectory Reduction | EFFICIENCY_ONLY | `[agent_inference]` Optimizes token and monetary cost while preserving final performance; no distinct state-quality or decision signal is evaluated. |
| An Empirical Study of Speculative Decoding on Software Engineering Tasks | EFFICIENCY_ONLY | `[agent_inference]` Studies decoding speed/cost rather than agent policy or process correctness. |
| LongCodeZip: Compress Long Context for Code Language Models | EFFICIENCY_AND_CONTEXT_ONLY | `[agent_inference]` Non-agent long-context compression is efficiency-first and adds less trajectory-state evidence than AttnCompress. |
| FreshBrew: A Benchmark for Evaluating AI Agents on Java Code Migration | PURE_BENCHMARK | `[agent_inference]` Valuable benchmark but does not itself isolate a control mechanism; omitted to prevent benchmark-led selection. |
| BackportBench: A Multilingual Benchmark for Automated Patch Backporting | PURE_BENCHMARK | `[agent_inference]` Benchmark construction without a distinct trajectory-control mechanism. |
| ProxyWar: Dynamic Assessment of LLM Code Generation in Game Arenas | BENCHMARK_EVALUATION_ONLY | `[agent_inference]` Dynamic evaluation is interesting but focuses on arena scoring rather than a software-agent control loop. |
| One Size Does Not Fit All: Revisiting Code Context Engineering for Repository-Level Code Generation | PROMPT_OR_CONTEXT_ENGINEERING | `[agent_inference]` Primarily compares repository context engineering, which is outside the stated preference. |
| Better Call Grep: Evaluating and Improving Grep-Like Lexical Retrieval for Repository-Level Code Completion | PURE_RETRIEVAL | `[agent_inference]` Lexical retrieval improvement is outside scope unless tied to a broader decision-control mechanism. |
| LLM-based Agents for Automated Bug Fixing: How Far Are We? | REDUNDANT_SWE_BENCH_EMPIRICAL | `[agent_inference]` Relevant comparison, but the selected trajectory and traceability studies provide deeper process evidence without adding another overlapping SWE-bench slot. |

## Access and uncertainty

- `[direct_evidence]` Full-text status: 31 open full texts confirmed, 3 publisher-record-only papers, and 8 papers not located after targeted search.
- `[direct_evidence]` Every Batch 1 paper has `OPEN_FULL_TEXT_CONFIRMED` status and a checked URL. Batch 2 intentionally carries access uncertainty so availability does not distort mechanism representation.
- `[agent_inference]` Title and official abstract were sufficient for every inclusion decision. The plan does not rely on unverified method-detail claims from a full-paper skim.
- `[agent_inference]` No human decision is pending. Batch 1 can start without resolving Batch 2 access gaps.

## Readiness

- `[agent_inference]` The two batches are exactly balanced by mechanism (three papers per mechanism per batch) and comparably cover empirical, method, training, and contradictory evidence. The phase is ready to hand off to `DEEP_READING_BATCH_1`.
- `[agent_inference]` “State understanding and decision control as a closed loop” remains only a cross-paper relationship to observe; it was not used as a required conclusion or research direction.

