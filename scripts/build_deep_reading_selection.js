const fs = require('node:fs');

function readJsonl(filePath) {
  return fs.readFileSync(filePath, 'utf8').trim().split('\n').filter(Boolean).map(JSON.parse);
}

const corpus = readJsonl('corpus/cross-venue-research-paper-index.jsonl');
const assignments = readJsonl('synthesis/field-mapping-paper-assignments.jsonl');
const corpusById = new Map(corpus.map((paper) => [paper.paper_id, paper]));
const assignmentById = new Map(assignments.map((paper) => [paper.paper_id, paper]));
const checkedAt = '2026-07-24T14:57:32Z';

const mechanisms = {
  FAILURE_LOOPS_RECOVERY: {
    label: 'Failures, ineffective loops, and recovery in agent trajectories',
    selection_goal: 'Pair trajectory-level empirical failure evidence with methods that expose, prevent, or recover from unproductive behavior.',
    questions: [
      'What is the unit and coding procedure for identifying a failed or unproductive trajectory?',
      'Do recovery claims improve semantic task correctness rather than only shorten traces or reduce cost?',
    ],
  },
  PLANNING_ACTION_TOOL_STOPPING: {
    label: 'Planning, action choice, tool choice, and stopping',
    selection_goal: 'Compare learned and inference-time control over search, tool use, backtracking, and termination across different SE tasks.',
    questions: [
      'At what point in a trajectory is the control decision made, and what observations are available then?',
      'Does the evaluation isolate the control policy from model scale, prompt, tool interface, and search budget?',
    ],
  },
  TEST_EXECUTION_ANALYSIS_FEEDBACK: {
    label: 'Testing, execution, and program-analysis feedback',
    selection_goal: 'Test whether executable and analytic evidence actually changes agent decisions, including cases where feedback is weak or misleading.',
    questions: [
      'Is feedback causal to the next agent decision, or merely used for final validation or ranking?',
      'How are weak, flaky, incomplete, or misleading tests and analyses handled?',
    ],
  },
  STATE_MEMORY_SPEC_CONSTRAINT_PRESERVATION: {
    label: 'State, memory, specification, and constraint preservation',
    selection_goal: 'Contrast memories, structured state, specifications, and evidence-preserving controllers on long or iterative workflows.',
    questions: [
      'What state is retained, discarded, summarized, or made authoritative across steps?',
      'Does the method test consistency over genuinely long trajectories and changing requirements?',
    ],
  },
  OUTCOME_PROGRESS_UNCERTAINTY_SIGNALS: {
    label: 'Signals of success, failure, progress, and uncertainty',
    selection_goal: 'Compare internal, behavioral, execution-grounded, and pre-generation signals and how they support intervention.',
    questions: [
      'Is the signal calibrated and evaluated before the outcome it is intended to predict?',
      'Does the signal generalize across models, tasks, repositories, and agent implementations?',
    ],
  },
  DEBUGGING_ROOT_CAUSE_REPAIR_DECISIONS: {
    label: 'Debugging, root-cause localization, and repair decisions',
    selection_goal: 'Cover reproduction, localization, causal diagnosis, repair-ingredient selection, and patch validation as distinct decisions.',
    questions: [
      'Does the method distinguish localization, causal diagnosis, repair selection, and patch validation?',
      'Are root-cause and decision-quality claims validated independently of final patch pass rate?',
    ],
  },
  TRAINING_PROCESS_SUPERVISION_POLICY_OPTIMIZATION: {
    label: 'Agent training, process supervision, and policy optimization',
    selection_goal: 'Compare trajectory construction, intermediate validation, SFT, preference optimization, value learning, and RL for SE behavior.',
    questions: [
      'What exact supervision unit, reward, or acceptance rule shapes the learned behavior?',
      'Do ablations separate data quality, model scaling, search at inference time, and policy learning?',
    ],
  },
};

const open = (url, source) => ({
  status: 'OPEN_FULL_TEXT_CONFIRMED',
  claim_type: 'direct_evidence',
  url,
  checked_at: checkedAt,
  source_locator: source,
  statement: 'A public paper PDF or openly licensed publisher full text was located; batch-1 PDF URLs were also verified reachable by HTTP HEAD.',
});

const publisherOnly = (url, source) => ({
  status: 'PUBLISHER_RECORD_ONLY',
  claim_type: 'direct_evidence',
  url,
  checked_at: checkedAt,
  source_locator: source,
  statement: 'A stable official or publisher record was located, but no publicly accessible paper PDF was confirmed in the targeted title search.',
});

const notLocated = (source) => ({
  status: 'NOT_LOCATED_AFTER_TARGETED_SEARCH',
  claim_type: 'agent_inference',
  url: null,
  checked_at: checkedAt,
  source_locator: source,
  statement: 'No paper PDF was located through the official links, exact-title OpenAlex lookup, and targeted arXiv query; this is an access status, not evidence that no full text exists.',
});

const selected = [
  {
    id: 'ASE2025_understanding-software-engineering-agents-a-study-of-thought-action-resu', cluster: 'FAILURE_LOOPS_RECOVERY', batch: 1,
    reason: 'Provides the closest trajectory-level empirical baseline for recurring action motifs, feedback integration, and anti-patterns across three software agents.',
    mechanism: 'Normalizes thought-action-result logs and compares structural patterns, action sequences, coherence, and feedback use between successful and failed runs.',
    role: 'Anchor empirical study for defining observable trajectory failures before evaluating recovery methods.',
    check: 'Are the anti-pattern labels reliable across annotators, agents, and task difficulty rather than proxies for trajectory length?',
    coverage: ['EMPIRICAL_STUDY', 'COUNTEREXAMPLE_OR_CONTRADICTORY_EVIDENCE'], eval: ['SOFTWARE_REPAIR_AGENT_TRAJECTORIES'],
    full: open('https://arxiv.org/pdf/2506.18824', 'official preprint URL / HTTP HEAD 200 application/pdf'),
  },
  {
    id: 'ICSE2026_beyond-final-code-a-process-oriented-error-analysis-of-software-developm', cluster: 'FAILURE_LOOPS_RECOVERY', batch: 1,
    reason: 'Adds large-scale solving and testing logs plus concrete execution errors that correlate with failure and reasoning overhead.',
    mechanism: 'Mines 3,977 solving trajectories and 3,931 testing logs to connect runtime error types with resolution outcomes and debugging effort.',
    role: 'Large-sample failure analysis and a check against conclusions drawn only from final patches.',
    check: 'Do the reported error correlations survive controls for issue difficulty, agent identity, and environment failures?',
    coverage: ['EMPIRICAL_STUDY', 'COUNTEREXAMPLE_OR_CONTRADICTORY_EVIDENCE'], eval: ['SWE_BENCH_FAMILY'],
    full: open('https://arxiv.org/pdf/2503.12374', 'official preprint URL / HTTP HEAD 200 application/pdf'),
  },
  {
    id: 'ISSTA2026_understanding-automated-program-repair-agents-through-the-lens-of-tracea', cluster: 'FAILURE_LOOPS_RECOVERY', batch: 2,
    reason: 'Traces complete APR pipelines and reports bottlenecks in issue reproduction, regression-test choice, tooling, and semantic patch validity.',
    mechanism: 'Compares five repair agents step by step from issue description through validation, with explicit behavioral comparison to developer workflows.',
    role: 'Broad empirical counterweight to end-to-end leaderboard improvements.',
    check: 'How are pipeline actions aligned across heterogeneous agents, and which claimed bottlenecks are causally linked to failure?',
    coverage: ['EMPIRICAL_STUDY', 'COUNTEREXAMPLE_OR_CONTRADICTORY_EVIDENCE'], eval: ['SWE_BENCH_FAMILY'],
    full: open('https://arxiv.org/pdf/2506.08311', 'OpenAlex exact-title match / arXiv best_oa_location'),
  },
  {
    id: 'ISSTA2026_agentinspect-diagnosing-behavioral-failures-in-artificial-intelligence-a', cluster: 'FAILURE_LOOPS_RECOVERY', batch: 2,
    reason: 'Tests general tool-using agents under abnormal tool behavior, widening the evidence beyond repository repair and normal executions.',
    mechanism: 'Uses agent-specific coverage, captured and simulated tool responses, and deterministic trajectory comparison to expose six behavioral failure classes.',
    role: 'Representative agent-testing method and out-of-distribution failure injection case.',
    check: 'Do the six failure classes cover silent non-crashing failures and remain valid outside LangChain agents?',
    coverage: ['EMPIRICAL_STUDY', 'METHOD_WORK'], eval: ['AGENT_FRAMEWORKS_GITHUB'],
    full: notLocated('official links + OpenAlex exact-title search returned replication package only + arXiv exact-title query'),
  },
  {
    id: 'FSE2026_empowering-autonomous-debugging-agents-with-efficient-dynamic-analysis', cluster: 'FAILURE_LOOPS_RECOVERY', batch: 1,
    reason: 'Directly targets exhausted budgets and unproductive debugger loops with an interface designed around agent-level actions.',
    mechanism: 'Exposes function-level frame-lifetime traces and high-level navigation commands instead of line-by-line debugger interactions.',
    role: 'Recovery-oriented method that changes the action interface rather than only prompting the agent to reflect.',
    check: 'Which unproductive loops disappear because of higher-level observations, and which gains come from additional runtime information?',
    coverage: ['METHOD_WORK'], eval: ['SWE_BENCH_FAMILY'],
    full: open('https://arxiv.org/pdf/2604.24212', 'official preprint URL / HTTP HEAD 200 application/pdf'),
  },
  {
    id: 'ICSE2026_tracecoder-a-trace-driven-multi-agent-framework-for-automated-debugging-', cluster: 'FAILURE_LOOPS_RECOVERY', batch: 2,
    reason: 'Combines runtime traces, lessons from failed attempts, and rollback, making repeated-error prevention explicit and testable.',
    mechanism: 'Instruments executions, performs causal analysis, stores historical lessons, and rolls back iterations that do not strictly improve the solution.',
    role: 'Representative closed-loop recovery method, retained for its rollback mechanism rather than its multi-agent organization.',
    check: 'How is strict improvement defined without access to hidden tests, and can rollback reject plausible but semantically worse patches?',
    coverage: ['METHOD_WORK'], eval: ['CODE_GENERATION_REPAIR_BENCHMARKS'],
    full: open('https://arxiv.org/pdf/2602.06875', 'OpenAlex exact-title match / arXiv best_oa_location'),
  },

  {
    id: 'ISSTA2026_to-run-or-not-to-run-analyzing-the-cost-effectiveness-of-code-execution-', cluster: 'PLANNING_ACTION_TOOL_STOPPING', batch: 2,
    reason: 'Provides unusually direct evidence about when agents choose execution and whether repeated test runs help.',
    mechanism: 'Analyzes 7,745 traces and controls four execution regimes to compare execution timing, localization, validation, and repair outcomes.',
    role: 'Contradictory evidence against treating more execution feedback as uniformly beneficial.',
    check: 'Does prohibiting execution change agent planning behavior in ways that confound the estimated causal value of execution?',
    coverage: ['EMPIRICAL_STUDY', 'COUNTEREXAMPLE_OR_CONTRADICTORY_EVIDENCE'], eval: ['SWE_BENCH_FAMILY'],
    full: open('https://arxiv.org/pdf/2606.26978', 'targeted arXiv exact-title query / HTTP HEAD 200 application/pdf'),
  },
  {
    id: 'ISSTA2026_steering-tree-of-thought-reasoning-via-deductive-verification', cluster: 'PLANNING_ACTION_TOOL_STOPPING', batch: 2,
    reason: 'Replaces heuristic self-evaluation during tree search with solver-grounded pruning, counterexample refinement, and backtracking.',
    mechanism: 'Encodes candidate reasoning steps as SMT constraints, verifies consequences, and uses counterexamples to choose or revise paths.',
    role: 'Formal inference-time controller for comparing self-judgment with external verification.',
    check: 'How often are LLM-produced constraints faithful to the natural-language reasoning step they are used to accept or prune?',
    coverage: ['METHOD_WORK'], eval: ['FAULT_LOCALIZATION_SYNTHESIS_INVARIANT_BENCHMARKS'],
    full: notLocated('official links + OpenAlex exact-title search returned artifact only + arXiv exact-title query'),
  },
  {
    id: 'ICSE2026_agentic-predicates-reasoning-for-directed-fuzzing', cluster: 'PLANNING_ACTION_TOOL_STOPPING', batch: 1,
    reason: 'Uses explicit semantic progress milestones and program-analysis tools to guide exploration rather than a final-score-only search.',
    mechanism: 'Synthesizes and iteratively refines progress predicates, verifies their relaxation relation symbolically, and uses them to reject hopeless executions.',
    role: 'Mechanistically distinct search-control method with explicit intermediate progress state.',
    check: 'Are predicate refinements driven by observable failures, and how sensitive are results to false or overly weak milestones?',
    coverage: ['METHOD_WORK'], eval: ['DIRECTED_FUZZING_REAL_WORLD_PROGRAMS'],
    full: open('https://arxiv.org/pdf/2508.21302', 'official preprint URL / HTTP HEAD 200 application/pdf'),
  },
  {
    id: 'ICSE2026_saint-service-level-integration-test-generation-with-program-analysis-an', cluster: 'PLANNING_ACTION_TOOL_STOPPING', batch: 2,
    reason: 'Makes planning, action, and reflection phases concrete in a service-testing agent grounded by endpoint and dependency models.',
    mechanism: 'Builds endpoint and operation-dependency representations, then plans and refines executable service scenarios through an agent loop.',
    role: 'Tool- and model-grounded planning case outside repository issue resolution.',
    check: 'Which planning decisions use static-analysis facts, and what happens when the dependency model is incomplete or wrong?',
    coverage: ['METHOD_WORK'], eval: ['ENTERPRISE_JAVA_SERVICES'],
    full: open('https://arxiv.org/pdf/2511.13305', 'OpenAlex exact-title match / arXiv best_oa_location'),
  },
  {
    id: 'FSE2026_agentic-verification-of-software-systems', cluster: 'PLANNING_ACTION_TOOL_STOPPING', batch: 1,
    reason: 'Offers a sharply constrained setting where proof-tree structure, theorem-prover calls, and stopping at a checked derivation are observable.',
    mechanism: 'Lets an LLM agent select proof structure and iteratively query Rocq for context until the prover accepts a derivation.',
    role: 'Representative external-tool planning method with a sound terminal oracle.',
    check: 'How are proof-search actions chosen, and are failed proof attempts reported rather than hidden by successful final derivations?',
    coverage: ['METHOD_WORK'], eval: ['SV_COMP_AND_LINUX_KERNEL'],
    full: open('https://arxiv.org/pdf/2511.17330', 'official preprint URL / HTTP HEAD 200 application/pdf'),
  },
  {
    id: 'FSE2026_event-b-agent-towards-llm-agent-for-formal-model-synthesis-and-repair', cluster: 'PLANNING_ACTION_TOOL_STOPPING', batch: 1,
    reason: 'Interleaves model synthesis, repair, model checking, and proof discharge rather than treating formalization as a one-shot output.',
    mechanism: 'Uses model-checker and theorem-prover feedback to decide how to revise an Event-B model and simplify remaining proof obligations.',
    role: 'Formal planning-and-repair case with multiple tool feedback channels.',
    check: 'Does the agent choose between model repair and proof repair using a stated policy, and how are cycles detected?',
    coverage: ['METHOD_WORK'], eval: ['FORMAL_MODEL_SYNTHESIS_CASES'],
    full: open('https://arxiv.org/pdf/2605.17475', 'official preprint URL / HTTP HEAD 200 application/pdf'),
  },

  {
    id: 'ICSE2026_are-solved-issues-in-swe-bench-really-solved-correctly-an-empirical-stud', cluster: 'TEST_EXECUTION_ANALYSIS_FEEDBACK', batch: 2,
    reason: 'Shows that test-passing feedback can mislabel semantically incorrect agent patches and quantifies the resulting score inflation.',
    mechanism: 'Differentially tests generated and developer patches, adds developer tests, and manually inspects behaviorally divergent cases.',
    role: 'Primary counterexample to equating test success with task success.',
    check: 'How does PatchDiff treat valid alternative implementations, and how robust is the manual certainty judgment for divergent behavior?',
    coverage: ['EMPIRICAL_STUDY', 'METHOD_WORK', 'COUNTEREXAMPLE_OR_CONTRADICTORY_EVIDENCE'], eval: ['SWE_BENCH_FAMILY'],
    full: notLocated('official links + normalized exact-title OpenAlex lookup + targeted arXiv query'),
  },
  {
    id: 'FSE2026_can-old-tests-do-new-tricks-for-resolving-swe-issues', cluster: 'TEST_EXECUTION_ANALYSIS_FEEDBACK', batch: 1,
    reason: 'Treats existing regression tests as both issue-reproduction context and post-patch constraints, with direct agent-pipeline integration.',
    mechanism: 'Selects and minimizes relevant regression tests, uses them to guide reproduction-test generation, and validates candidate patches for regressions.',
    role: 'Positive method evidence for carefully selected test feedback rather than indiscriminate execution.',
    check: 'Are gains caused by better localization, better reproduction, or rejection of regressions, and do minimized suites omit relevant behavior?',
    coverage: ['METHOD_WORK'], eval: ['SWE_BENCH_FAMILY'],
    full: open('https://arxiv.org/pdf/2510.18270', 'official preprint URL / HTTP HEAD 200 application/pdf'),
  },
  {
    id: 'ISSTA2026_issueexec-a-test-driven-approach-for-localizing-software-engineering-iss', cluster: 'TEST_EXECUTION_ANALYSIS_FEEDBACK', batch: 1,
    reason: 'Uses test suites as executable requirement proxies and measures how much they reduce issue-localization uncertainty.',
    mechanism: 'Maps issues to tests, filters infrastructure noise from traces, and feeds test-derived execution structure into code localization.',
    role: 'Empirical and method bridge between test feedback and an upstream agent decision.',
    check: 'Does the reported uncertainty reduction predict downstream repair success on issues whose existing tests do not expose the bug?',
    coverage: ['EMPIRICAL_STUDY', 'METHOD_WORK'], eval: ['SWE_BENCH_FAMILY'],
    full: open('https://arxiv.org/pdf/2607.17286', 'OpenAlex exact-title match / HTTP HEAD 200 application/pdf'),
  },
  {
    id: 'ASE2025_let-the-code-speak-incorporating-program-dynamic-state-for-better-method', cluster: 'TEST_EXECUTION_ANALYSIS_FEEDBACK', batch: 2,
    reason: 'Makes runtime state an explicit challenge to an LLM fault-localization hypothesis instead of relying on static plausibility.',
    mechanism: 'A localization agent proposes suspicious code and a print-debugging agent gathers dynamic state over multiple rounds to verify it.',
    role: 'Dynamic-feedback method with interpretable tool-use patterns.',
    check: 'How often does runtime evidence reverse an initially wrong suspicion rather than merely confirm the first hypothesis?',
    coverage: ['METHOD_WORK'], eval: ['DEFECTS4J_FAMILY'],
    full: publisherOnly('https://doi.org/10.1109/ASE63991.2025.00072', 'OpenAlex exact-title publisher record / DOI'),
  },
  {
    id: 'ICSE2026_specguru-hierarchical-llm-driven-api-points-to-specification-generation-', cluster: 'TEST_EXECUTION_ANALYSIS_FEEDBACK', batch: 2,
    reason: 'Uses differential tests after every bottom-up specification step to prevent error propagation into later static analysis.',
    mechanism: 'Generates leaf specifications, validates them with synthesized differential tests, and reuses only validated abstractions higher in the call graph.',
    role: 'Incremental validation case linking testing feedback to program-analysis artifacts.',
    check: 'What behaviors do synthesized tests miss, and can an incorrect validated leaf specification contaminate higher-level results?',
    coverage: ['METHOD_WORK'], eval: ['C_LIBRARY_STATIC_ANALYSIS'],
    full: notLocated('official links + normalized exact-title OpenAlex lookup + targeted arXiv query'),
  },
  {
    id: 'ICSE2026_assessing-coherency-and-consistency-of-code-execution-reasoning-by-large', cluster: 'TEST_EXECUTION_ANALYSIS_FEEDBACK', batch: 1,
    reason: 'Separates apparently correct answers from coherent execution reasoning and finds that bug-task success may come from shortcuts.',
    mechanism: 'Evaluates variable-state simulation, commonsense execution coherence, and consistency across path-covering tests before comparison to bug tasks.',
    role: 'Counterexample showing that correct final outputs need not imply use of execution semantics.',
    check: 'Are coherence labels and path-coverage comparisons sufficient to distinguish real execution reasoning from pattern matching?',
    coverage: ['EMPIRICAL_STUDY', 'COUNTEREXAMPLE_OR_CONTRADICTORY_EVIDENCE'], eval: ['HUMANEVAL_AND_BUG_TASKS'],
    full: open('https://arxiv.org/pdf/2510.15079', 'official preprint URL / HTTP HEAD 200 application/pdf'),
  },

  {
    id: 'FSE2026_experepair-dual-memory-enhanced-llm-based-repository-level-program-repai', cluster: 'STATE_MEMORY_SPEC_CONSTRAINT_PRESERVATION', batch: 2,
    reason: 'Offers explicit episodic and semantic memories with different update and recall roles for repository repair.',
    mechanism: 'Accumulates concrete repair episodes and abstract reflective insights, then composes both dynamically into inference context.',
    role: 'Representative cross-task memory method for testing experience reuse versus prompt retrieval.',
    check: 'How are memories updated after failures, and do evaluations prevent leakage from near-duplicate historical fixes?',
    coverage: ['METHOD_WORK'], eval: ['SWE_BENCH_FAMILY'],
    full: open('https://doi.org/10.1145/3808181', 'OpenAlex exact-title record reports CC-BY open published version at DOI'),
  },
  {
    id: 'ISSTA2026_attncompress-dynamic-attention-guided-trajectory-compression-for-softwar', cluster: 'STATE_MEMORY_SPEC_CONSTRAINT_PRESERVATION', batch: 2,
    reason: 'Directly addresses preservation and recall of critical evidence as long software-agent trajectories grow.',
    mechanism: 'Segments code and logs structurally, estimates historical-block relevance with proxy attention, and re-evaluates a rolling context window.',
    role: 'Efficiency-motivated method retained because semantic preservation and dynamic recall are its testable core mechanisms.',
    check: 'What evidence is lost by compression, and are preservation claims measured beyond final pass rate and token reduction?',
    coverage: ['METHOD_WORK'], eval: ['SWE_BENCH_FAMILY'],
    full: notLocated('official links + normalized exact-title OpenAlex lookup + targeted arXiv query'),
  },
  {
    id: 'ISSTA2026_evident-an-evidence-preserving-framework-for-iterative-system-level-pack', cluster: 'STATE_MEMORY_SPEC_CONSTRAINT_PRESERVATION', batch: 2,
    reason: 'Separates iteration-aware evidence management from tools in a multi-artifact repair task with dependency and architecture constraints.',
    mechanism: 'Fuses repair history, knowledge, and build artifacts in a controller while an external build service supplies reproducible feedback.',
    role: 'Closed-loop state controller grounded in system-level build failures rather than source-only repair.',
    check: 'Which evidence is promoted or discarded between iterations, and how does the controller resolve conflicting build observations?',
    coverage: ['EMPIRICAL_STUDY', 'METHOD_WORK'], eval: ['RISC_V_PACKAGE_BUILD_FAILURES'],
    full: open('https://arxiv.org/pdf/2605.08621', 'OpenAlex exact-title match / arXiv best_oa_location'),
  },
  {
    id: 'FSE2026_stepfly-agentic-troubleshooting-guide-automation-for-incident-diagnosis', cluster: 'STATE_MEMORY_SPEC_CONSTRAINT_PRESERVATION', batch: 1,
    reason: 'Turns a troubleshooting specification into an execution DAG and memory-backed scheduler, making workflow state explicit.',
    mechanism: 'Extracts structured DAGs from guides, builds query plugins, and runs a scheduler-executor with memory that enforces dependencies.',
    role: 'Industrial workflow-state case with real guides and incidents.',
    check: 'How does the scheduler recover when a guide is incomplete or an observation invalidates an already executed DAG branch?',
    coverage: ['EMPIRICAL_STUDY', 'METHOD_WORK'], eval: ['INDUSTRIAL_TROUBLESHOOTING_GUIDES'],
    full: open('https://arxiv.org/pdf/2510.10074', 'official preprint URL / HTTP HEAD 200 application/pdf'),
  },
  {
    id: 'ASE2025_agentic-specification-generator-for-move-programs', cluster: 'STATE_MEMORY_SPEC_CONSTRAINT_PRESERVATION', batch: 1,
    reason: 'Makes formal specification clauses and verifier feedback persistent constraints in an iterative generation setting.',
    mechanism: 'Uses modular agent steps to exploit language-specific specification features and repeatedly checks generated clauses with the Move verifier.',
    role: 'Specification-preservation case in a non-mainstream verification ecosystem.',
    check: 'Are clauses preserved because they encode intended behavior or only because the verifier can prove them?',
    coverage: ['METHOD_WORK'], eval: ['MOVE_SMART_CONTRACTS'],
    full: open('https://arxiv.org/pdf/2509.24515', 'official preprint URL / HTTP HEAD 200 application/pdf'),
  },
  {
    id: 'ISSTA2026_logichunter-testing-llm-agent-frameworks-with-an-agentic-oracle', cluster: 'STATE_MEMORY_SPEC_CONSTRAINT_PRESERVATION', batch: 1,
    reason: 'Its oracle must maintain both operational state and evidence memory while navigating documentation, code, and runtime behavior.',
    mechanism: 'Combines specification-aware fuzzing with a ReAct oracle that uses dual-layer state management and dual-stream memory.',
    role: 'Stateful agent-oracle method evaluated on failures of agent-framework software itself.',
    check: 'What information enters each state and memory layer, and which layer contributes to finding silent semantic failures?',
    coverage: ['METHOD_WORK'], eval: ['LLM_AGENT_FRAMEWORKS'],
    full: open('https://arxiv.org/pdf/2607.06195', 'OpenAlex exact-title match / HTTP HEAD 200 application/pdf'),
  },

  {
    id: 'ISSTA2026_atropos-improving-cost-benefit-trade-off-of-llm-based-agents-under-self-', cluster: 'OUTCOME_PROGRESS_UNCERTAINTY_SIGNALS', batch: 2,
    reason: 'Predicts eventual trajectory failure at the midpoint and couples the signal to termination and model-hotswap intervention.',
    mechanism: 'Merges self-consistent inference paths into a graph and trains a GCN to predict failure before choosing whether to migrate context.',
    role: 'Only selected cost-oriented paper because it contains an explicit predictive signal and downstream control action.',
    check: 'Is midpoint failure prediction calibrated per agent and task, and can hotswap gains be separated from simply using a stronger model?',
    coverage: ['METHOD_WORK', 'TRAINING_WORK'], eval: ['MULTI_AGENT_TASK_COLLECTION'],
    full: open('https://arxiv.org/pdf/2604.15075', 'OpenAlex exact-title match / arXiv best_oa_location'),
  },
  {
    id: 'ASE2025_watson-a-cognitive-observability-framework-for-the-reasoning-of-llm-powe', cluster: 'OUTCOME_PROGRESS_UNCERTAINTY_SIGNALS', batch: 2,
    reason: 'Treats inferred reasoning evidence as an observability signal that can support debugging and automated correction.',
    mechanism: 'Retroactively reconstructs reasoning traces with prompt attribution without modifying the observed agent.',
    role: 'Representative observability method and a contrast to direct trajectory logging.',
    check: 'How faithfully do inferred traces represent the actual causes of actions, and are interventions tested against misleading attributions?',
    coverage: ['METHOD_WORK'], eval: ['SWE_BENCH_FAMILY', 'MMLU'],
    full: publisherOnly('https://doi.org/10.1109/ASE63991.2025.00067', 'OpenAlex exact-title publisher record / DOI'),
  },
  {
    id: 'ICSE2026_on-llms-internal-representation-of-code-correctness', cluster: 'OUTCOME_PROGRESS_UNCERTAINTY_SIGNALS', batch: 1,
    reason: 'Finds an internal code-correctness signal that outperforms likelihood and verbalized confidence without test execution.',
    mechanism: 'Contrasts hidden states for correct and incorrect solution pairs and uses the extracted representation to rank generated samples.',
    role: 'White-box correctness signal that can be compared with execution-grounded and behavioral alternatives.',
    check: 'Does the correctness direction transfer to unseen tasks and error types without paired calibration data?',
    coverage: ['EMPIRICAL_STUDY', 'METHOD_WORK'], eval: ['CODE_GENERATION_BENCHMARKS'],
    full: open('https://arxiv.org/pdf/2512.07404', 'official preprint URL / HTTP HEAD 200 application/pdf'),
  },
  {
    id: 'FSE2026_clotho-measuring-task-specific-pre-generation-test-adequacy-for-llm-inpu', cluster: 'OUTCOME_PROGRESS_UNCERTAINTY_SIGNALS', batch: 1,
    reason: 'Predicts task-specific failures before generation and explicitly compares pre- and post-generation uncertainty measures.',
    mechanism: 'Fits a GMM over hidden states using a small labeled reference set and ranks unseen inputs by estimated failure likelihood.',
    role: 'Pre-action difficulty signal and cross-model transfer case.',
    check: 'Is the reported transfer stable under task-distribution shift, and how sensitive is it to the selected reference labels?',
    coverage: ['METHOD_WORK'], eval: ['EIGHT_LLM_TASK_BENCHMARKS'],
    full: open('https://arxiv.org/pdf/2509.17314', 'official preprint URL / HTTP HEAD 200 application/pdf'),
  },
  {
    id: 'ISSTA2026_code-mue-measuring-code-llm-uncertainty-through-execution-based-semantic', cluster: 'OUTCOME_PROGRESS_UNCERTAINTY_SIGNALS', batch: 2,
    reason: 'Grounds black-box uncertainty in runtime semantics rather than textual variation and links it to selective prediction.',
    mechanism: 'Executes candidate solutions, builds semantic interaction graphs, and computes Von Neumann entropy over behavioral diversity.',
    role: 'Execution-grounded uncertainty signal for closed models.',
    check: 'Does the strong correctness correlation persist when diverse implementations are semantically equivalent on incomplete tests?',
    coverage: ['EMPIRICAL_STUDY', 'METHOD_WORK'], eval: ['CODE_GENERATION_BENCHMARKS'],
    full: open('https://arxiv.org/pdf/2607.12273', 'OpenAlex exact-title match / arXiv best_oa_location'),
  },
  {
    id: 'FSE2026_adadec-a-uncertainty-guided-lookahead-decoding-framework-for-llm-based-c', cluster: 'OUTCOME_PROGRESS_UNCERTAINTY_SIGNALS', batch: 1,
    reason: 'Connects token-level uncertainty to a selective pause-and-rerank action instead of using uncertainty only for reporting.',
    mechanism: 'Learns model-specific uncertainty thresholds and invokes lookahead reranking only at high-uncertainty code decisions.',
    role: 'Fine-grained inference-time signal-to-control method for general code generation.',
    check: 'Are learned thresholds calibrated outside the training model and benchmarks, and which error types are recoverable by lookahead?',
    coverage: ['EMPIRICAL_STUDY', 'METHOD_WORK'], eval: ['CODE_GENERATION_BENCHMARKS'],
    full: open('https://arxiv.org/pdf/2506.08980', 'official preprint URL / HTTP HEAD 200 application/pdf'),
  },

  {
    id: 'ICSE2026_repair-ingredients-are-all-you-need-improving-large-language-model-based', cluster: 'DEBUGGING_ROOT_CAUSE_REPAIR_DECISIONS', batch: 2,
    reason: 'Separates internal evidence for root-cause reasoning from external historical ingredients for choosing repair actions.',
    mechanism: 'Queries static analysis when context is insufficient and searches verified historical fixes when the agent lacks a repair strategy.',
    role: 'Representative conditional information-acquisition policy for repair.',
    check: 'What triggers each ingredient search, and are improvements due to causal diagnosis or retrieval of near-matching patches?',
    coverage: ['METHOD_WORK'], eval: ['DEFECTS4J_FAMILY'],
    full: open('https://arxiv.org/pdf/2506.23100', 'targeted arXiv exact-title query / HTTP HEAD 200 application/pdf'),
  },
  {
    id: 'FSE2026_debugging-engine-enhanced-by-prior-knowledge-can-we-teach-llm-how-to-deb', cluster: 'DEBUGGING_ROOT_CAUSE_REPAIR_DECISIONS', batch: 1,
    reason: 'Represents explicit, validated debugging knowledge and stepwise repair strategies rather than implicit prompting alone.',
    mechanism: 'Extracts and verifies structured debugging knowledge from historical fixes, then injects relevant traces and strategies into repair pipelines.',
    role: 'Knowledge-backed repair-decision method and retrieval-noise ablation case.',
    check: 'How is debugging knowledge validated independently of the LLM that extracts it, and when does retrieved knowledge mislead repair?',
    coverage: ['METHOD_WORK'], eval: ['ACPR_AND_ATCODER'],
    full: open('https://raw.githubusercontent.com/lucky20020327/DeepK/main/Debugging_Engine_Enhanced_by_Prior_Knowledge.pdf', 'officially listed GitHub preprint / raw URL HTTP HEAD 200'),
  },
  {
    id: 'ASE2025_root-cause-analysis-of-risc-v-build-failures-via-llm-and-mcts-reasoning', cluster: 'DEBUGGING_ROOT_CAUSE_REPAIR_DECISIONS', batch: 2,
    reason: 'Uses constrained MCTS over logs, configurations, environment evidence, and domain knowledge for interpretable root-cause selection.',
    mechanism: 'Compresses phase-aware build logs and performs LLM-guided multi-source MCTS reasoning under root-cause classification constraints.',
    role: 'Non-SWE-bench root-cause case with heterogeneous operational evidence.',
    check: 'What constitutes an MCTS state and reward, and are reasoning traces faithful to the evidence used for the final diagnosis?',
    coverage: ['METHOD_WORK'], eval: ['RISC_V_BUILD_FAILURES'],
    full: publisherOnly('https://doi.org/10.1109/ASE63991.2025.00227', 'OpenAlex exact-title publisher record / DOI'),
  },
  {
    id: 'ICSE2026_input-reduction-enhanced-llm-based-program-repair', cluster: 'DEBUGGING_ROOT_CAUSE_REPAIR_DECISIONS', batch: 1,
    reason: 'Tests whether preserving a minimal failure-inducing input improves root-cause reasoning under long-context limits.',
    mechanism: 'Has an LLM synthesize an input reducer, minimizes the failing input, and uses the compressed failure evidence for patch generation.',
    role: 'Failure-evidence reduction method and direct long-context stress case.',
    check: 'Does reduction preserve the same root cause, and how often does a smaller input remove behavior needed for the correct repair?',
    coverage: ['METHOD_WORK'], eval: ['LONG_INPUT_REPAIR_AND_OSS_FUZZ'],
    full: open('https://arxiv.org/pdf/2507.15251', 'official preprint URL / HTTP HEAD 200 application/pdf'),
  },
  {
    id: 'ISSTA2026_causalrepair-bridging-the-causality-gap-in-large-language-model-based-au', cluster: 'DEBUGGING_ROOT_CAUSE_REPAIR_DECISIONS', batch: 2,
    reason: 'Defines minimal causal context and combines test-side and source-side slices to guide iterative repair decisions.',
    mechanism: 'Purifies test semantics with context-aware static slicing and extracts executed source dependencies with dynamic slicing.',
    role: 'Causal-context repair method and contrast to similarity-based context selection.',
    check: 'How is minimal causal context validated, and can dual slicing exclude code needed for multi-fault or stateful failures?',
    coverage: ['METHOD_WORK'], eval: ['DEFECTS4J_FAMILY'],
    full: notLocated('official links + normalized exact-title OpenAlex lookup + targeted arXiv query'),
  },
  {
    id: 'ICSE2026_evaluating-and-improving-automated-repository-level-rust-issue-resolutio', cluster: 'DEBUGGING_ROOT_CAUSE_REPAIR_DECISIONS', batch: 1,
    reason: 'Combines a cross-agent empirical limitation study with issue reproduction and language-aware dynamic tracing for repair.',
    mechanism: 'Builds test environments, reproduces issues, and uses Rust metaprogramming traces to expose repository and type/trait evidence.',
    role: 'New-language case showing that reproduction and semantics can dominate generic agent flow.',
    check: 'Are RUSTFORGER gains attributable to reproduction, tracing, or benchmark environment setup, and do they generalize beyond Rust?',
    coverage: ['EMPIRICAL_STUDY', 'METHOD_WORK', 'COUNTEREXAMPLE_OR_CONTRADICTORY_EVIDENCE'], eval: ['SWE_BENCH_FAMILY'],
    full: open('https://arxiv.org/pdf/2602.22764', 'OpenAlex exact-title match / HTTP HEAD 200 application/pdf'),
  },

  {
    id: 'ICSE2026_enhancing-issue-localization-agent-with-tool-interactive-training', cluster: 'TRAINING_PROCESS_SUPERVISION_POLICY_OPTIMIZATION', batch: 1,
    reason: 'Directly trains multi-step repository-tool use with both rejection-sampled SFT and interactive RL.',
    mechanism: 'Constructs accepted tool trajectories, applies supervised fine-tuning, then optimizes tool interactions with reinforcement learning.',
    role: 'Representative tool-use policy training method.',
    check: 'What reward credits individual tool actions, and how much improvement comes from better localization data versus interactive RL?',
    coverage: ['METHOD_WORK', 'TRAINING_WORK'], eval: ['ISSUE_LOCALIZATION_BENCHMARKS'],
    full: open('https://arxiv.org/pdf/2508.03012', 'official preprint URL / HTTP HEAD 200 application/pdf'),
  },
  {
    id: 'ICSE2026_sealign-alignment-training-for-software-engineering-agent', cluster: 'TRAINING_PROCESS_SUPERVISION_POLICY_OPTIMIZATION', batch: 2,
    reason: 'Uses workflow steps, MCTS, and preference optimization to align critical actions in multi-step SE processes.',
    mechanism: 'Searches alternative workflow steps with MCTS and forms preference data around critical actions for post-training.',
    role: 'Broad SE-agent alignment method against competitive-programming-oriented training.',
    check: 'How are critical actions identified, and does preference optimization improve process quality beyond extra MCTS-generated data?',
    coverage: ['METHOD_WORK', 'TRAINING_WORK'], eval: ['SWE_BENCH_FAMILY', 'HUMANEVALFIX'],
    full: open('https://arxiv.org/pdf/2503.18455', 'targeted arXiv exact-title query / HTTP HEAD 200 application/pdf'),
  },
  {
    id: 'ISSTA2026_swe-pdb-teaching-llms-to-leverage-debugging-tools-via-agentic-training', cluster: 'TRAINING_PROCESS_SUPERVISION_POLICY_OPTIMIZATION', batch: 2,
    reason: 'Trains a stateful, long-horizon debugger policy using filtered interactive trajectories, SFT, and rule-reward RL.',
    mechanism: 'Synthesizes structured debugger trajectories, filters and refines them, then applies agentic SFT followed by RL for strategic tool use.',
    role: 'Training counterpart to inference-time debugger-interface methods.',
    check: 'Do rule rewards favor meaningful debugging state transitions or merely shorter successful command sequences?',
    coverage: ['METHOD_WORK', 'TRAINING_WORK'], eval: ['SWE_BENCH_FAMILY'],
    full: notLocated('official links + normalized exact-title OpenAlex lookup + targeted arXiv query'),
  },
  {
    id: 'ASE2025_mcts-refined-cot-high-quality-fine-tuning-data-for-llm-based-repository-', cluster: 'TRAINING_PROCESS_SUPERVISION_POLICY_OPTIMIZATION', batch: 1,
    reason: 'Makes intermediate step validation and rejection sampling explicit in repository-level reasoning-data construction.',
    mechanism: 'Uses MCTS, reflection, and ground-truth criteria for localization and patch steps to refine CoT trajectories before fine-tuning.',
    role: 'Process-supervision data method with strict intermediate acceptance rules.',
    check: 'Does exact agreement with developer patches reject valid alternative reasoning paths and teach benchmark-specific shortcuts?',
    coverage: ['METHOD_WORK', 'TRAINING_WORK'], eval: ['SWE_BENCH_FAMILY'],
    full: open('https://arxiv.org/pdf/2506.12728', 'OpenAlex exact-title match / HTTP HEAD 200 application/pdf'),
  },
  {
    id: 'ICSE2026_seer-enhancing-chain-of-thought-code-generation-through-self-exploring-d', cluster: 'TRAINING_PROCESS_SUPERVISION_POLICY_OPTIMIZATION', batch: 1,
    reason: 'Trains separate policy and value models over intermediate code-reasoning steps and adapts whether to reason deeply.',
    mechanism: 'Explores diverse paths, annotates step quality, trains policy/value models, and dynamically selects direct versus stepwise generation.',
    role: 'Value-guided process optimization outside repository repair.',
    check: 'How are intermediate quality labels obtained without circular self-evaluation, and does the value model detect overthinking?',
    coverage: ['METHOD_WORK', 'TRAINING_WORK'], eval: ['CODE_GENERATION_BENCHMARKS'],
    full: open('https://arxiv.org/pdf/2510.17130', 'OpenAlex exact-title match / HTTP HEAD 200 application/pdf'),
  },
  {
    id: 'ISSTA2026_seer-self-enhancing-chain-of-thought-compression-for-reasoning-models', cluster: 'TRAINING_PROCESS_SUPERVISION_POLICY_OPTIMIZATION', batch: 2,
    reason: 'Uses observed repetition, truncation, and failure-length relationships to filter self-generated traces before fine-tuning concise behavior.',
    mechanism: 'Detects degenerate loops, samples and filters concise correct CoTs, and fine-tunes the model on the filtered trajectories.',
    role: 'Training method plus counterexample to assuming longer reasoning is better.',
    check: 'Does n-gram filtering remove necessary iterative reasoning, and do concision gains persist on long repository tasks?',
    coverage: ['EMPIRICAL_STUDY', 'METHOD_WORK', 'TRAINING_WORK', 'COUNTEREXAMPLE_OR_CONTRADICTORY_EVIDENCE'], eval: ['CODE_GENERATION_BENCHMARKS'],
    full: notLocated('official links + normalized exact-title OpenAlex lookup + targeted arXiv query'),
  },
];

const exclusions = [
  ['ASE2025_why-ai-agents-still-need-you-findings-from-developer-agent-collaboration', 'OUT_OF_SCOPE_HUMAN_STUDY', 'Focuses on in-the-wild human-agent collaboration rather than agent mechanism control.'],
  ['ISSTA2026_unpacking-ai-agent-participation-in-issue-centered-collaboration-in-open', 'OUT_OF_SCOPE_HUMAN_ORGANIZATIONAL', 'Studies participation in open-source collaboration, outside the requested technical mechanism focus.'],
  ['FSE2026_spectrum-based-failure-attribution-for-multi-agent-systems', 'MULTI_AGENT_ORGANIZATION', 'Failure attribution is specific to multi-agent activation and action allocation; excluded despite topical failure language.'],
  ['ISSTA2026_cam-a-causality-based-analysis-framework-for-multi-agent-code-generation', 'MULTI_AGENT_ORGANIZATION', 'Centers on causal importance of intermediate outputs in multi-agent code-generation architectures.'],
  ['ICSE2026_swe-debate-competitive-multi-agent-debate-for-software-issue-resolution', 'MULTI_AGENT_ORGANIZATION', 'Contribution is competitive multi-agent debate and orchestration, which the research preference excludes.'],
  ['ISSTA2026_tracedev-a-traceability-driven-multi-agent-framework-for-requirement-to-', 'MULTI_AGENT_ORGANIZATION', 'Traceability is relevant, but five-role organization dominates and state coverage is supplied by more mechanism-isolating papers.'],
  ['ICSE2026_agentspec-customizable-runtime-enforcement-for-safe-and-reliable-llm-age', 'PURE_SAFETY', 'Runtime constraints are evaluated chiefly as cross-domain safety enforcement, outside the selected general SE-control evidence.'],
  ['FSE2026_agentbound-securing-execution-boundaries-of-ai-agents', 'PURE_SECURITY', 'Focuses on securing agent execution boundaries rather than general decision-control behavior.'],
  ['ISSTA2026_red-teaming-coding-agents-from-a-tool-invocation-perspective-an-empirica', 'PURE_SECURITY', 'Tool-invocation analysis is framed as an adversarial security assessment.'],
  ['ISSTA2026_datura-progressive-red-teaming-testing-for-tool-invocation-chain-in-llm-', 'PURE_SECURITY', 'Progressive tool-chain testing targets attacks and guardrail bypass rather than general failure recovery.'],
  ['FSE2026_reducing-cost-of-llm-agents-with-trajectory-reduction', 'EFFICIENCY_ONLY', 'Optimizes token and monetary cost while preserving final performance; no distinct state-quality or decision signal is evaluated.'],
  ['ISSTA2026_an-empirical-study-of-speculative-decoding-on-software-engineering-tasks', 'EFFICIENCY_ONLY', 'Studies decoding speed/cost rather than agent policy or process correctness.'],
  ['ASE2025_longcodezip-compress-long-context-for-code-language-models', 'EFFICIENCY_AND_CONTEXT_ONLY', 'Non-agent long-context compression is efficiency-first and adds less trajectory-state evidence than AttnCompress.'],
  ['ICSE2026_freshbrew-a-benchmark-for-evaluating-ai-agents-on-java-code-migration', 'PURE_BENCHMARK', 'Valuable benchmark but does not itself isolate a control mechanism; omitted to prevent benchmark-led selection.'],
  ['FSE2026_backportbench-a-multilingual-benchmark-for-automated-patch-backporting', 'PURE_BENCHMARK', 'Benchmark construction without a distinct trajectory-control mechanism.'],
  ['ICSE2026_proxywar-dynamic-assessment-of-llm-code-generation-in-game-arenas', 'BENCHMARK_EVALUATION_ONLY', 'Dynamic evaluation is interesting but focuses on arena scoring rather than a software-agent control loop.'],
  ['FSE2026_one-size-does-not-fit-all-revisiting-code-context-engineering-for-reposi', 'PROMPT_OR_CONTEXT_ENGINEERING', 'Primarily compares repository context engineering, which is outside the stated preference.'],
  ['ISSTA2026_better-call-grep-evaluating-and-improving-grep-like-lexical-retrieval-fo', 'PURE_RETRIEVAL', 'Lexical retrieval improvement is outside scope unless tied to a broader decision-control mechanism.'],
  ['ICSE2026_llm-based-agents-for-automated-bug-fixing-how-far-are-we', 'REDUNDANT_SWE_BENCH_EMPIRICAL', 'Relevant comparison, but the selected trajectory and traceability studies provide deeper process evidence without adding another overlapping SWE-bench slot.'],
  ['FSE2026_spectrum-based-failure-attribution-for-multi-agent-systems', 'BENCHMARK_CONCENTRATION', 'Also omitted to avoid further concentration on the Who&When multi-agent benchmark.'],
];

function claim(claimType, statement, sourceLocator) {
  return { claim_type: claimType, source_locator: sourceLocator, statement };
}

const selectedPapers = selected.map((item) => {
  const paper = corpusById.get(item.id);
  const assignment = assignmentById.get(item.id);
  if (!paper || !assignment) throw new Error(`Unknown selected paper: ${item.id}`);
  const sourceLocator = assignment.evidence.source_locator;
  return {
    paper_id: item.id,
    title: paper.title,
    authors: paper.authors,
    venue_id: paper.venue.venue_id,
    primary_mechanism_cluster: item.cluster,
    secondary_mechanism_clusters: item.secondary || [],
    reading_batch: `DEEP_READING_BATCH_${item.batch}`,
    selection_reason: claim('agent_inference', item.reason, sourceLocator),
    main_mechanism: claim('author_claim', item.mechanism, sourceLocator),
    topic_role: claim('agent_inference', item.role, sourceLocator),
    deep_read_questions: [item.check, ...mechanisms[item.cluster].questions],
    coverage_roles: item.coverage,
    evaluation_families: item.eval,
    mapped_topic_clusters: assignment.classification.topic_clusters,
    full_text: item.full,
    selection_basis: {
      status: 'SUFFICIENT_FROM_TITLE_AND_ABSTRACT',
      claim_type: 'agent_inference',
      source_locator: sourceLocator,
      statement: 'The official title and abstract state enough about the mechanism and evaluation role for reading-plan selection; no systematic full-paper reading was performed.',
    },
  };
});

const importantExclusions = [];
const seenExclusions = new Set();
for (const [paperId, category, statement] of exclusions) {
  if (seenExclusions.has(paperId)) continue;
  seenExclusions.add(paperId);
  const paper = corpusById.get(paperId);
  const assignment = assignmentById.get(paperId);
  if (!paper || !assignment) throw new Error(`Unknown excluded paper: ${paperId}`);
  importantExclusions.push({
    paper_id: paperId,
    title: paper.title,
    venue_id: paper.venue.venue_id,
    exclusion_category: category,
    reason: claim('agent_inference', statement, assignment.evidence.source_locator),
  });
}

const countBy = (values) => values.reduce((counts, value) => {
  counts[value] = (counts[value] || 0) + 1;
  return counts;
}, {});

const mechanismClusters = Object.fromEntries(Object.entries(mechanisms).map(([id, value]) => [id, {
  label: value.label,
  selection_goal: claim('agent_inference', value.selection_goal, 'user research preferences + field-mapping title/abstract assignments'),
  primary_selected_count: selectedPapers.filter((paper) => paper.primary_mechanism_cluster === id).length,
  selected_paper_ids: selectedPapers.filter((paper) => paper.primary_mechanism_cluster === id).map((paper) => paper.paper_id),
}]));

const roleNames = ['EMPIRICAL_STUDY', 'METHOD_WORK', 'TRAINING_WORK', 'COUNTEREXAMPLE_OR_CONTRADICTORY_EVIDENCE'];
const coverageRoleCounts = Object.fromEntries(roleNames.map((role) => [role, selectedPapers.filter((paper) => paper.coverage_roles.includes(role)).length]));
const fullTextStatusCounts = countBy(selectedPapers.map((paper) => paper.full_text.status));
const venueCounts = countBy(selectedPapers.map((paper) => paper.venue_id));
const batchCounts = countBy(selectedPapers.map((paper) => paper.reading_batch));

const output = {
  schema_version: 1,
  phase: 'DEEP_READING_SELECTION',
  status: 'DEEP_READING_SELECTED',
  generated_at: checkedAt,
  input: {
    record_count: corpus.length,
    corpus: 'corpus/cross-venue-research-paper-index.jsonl',
    assignments: 'synthesis/field-mapping-paper-assignments.jsonl',
    taxonomy: 'synthesis/field-mapping-taxonomy.yaml',
    topic_matrix: 'synthesis/cross-venue-topic-matrix.csv',
    candidate_report: 'synthesis/deep-reading-topic-clusters.md',
    evidence: claim('direct_evidence', 'The candidate universe contains 988 in-scope papers with official titles, abstracts, authors, venues, and source locators.', 'field-mapping-paper-assignments.jsonl / all 988 records'),
  },
  scope_boundary: {
    claim_type: 'agent_inference',
    statement: 'Selection favors general LLM, agent, and code-agent mechanisms for SE; human studies, multi-agent organization, pure benchmarks, pure security/safety/retrieval, prompt engineering, and efficiency-only work are excluded unless a paper supplies a distinct mechanism or counterexample needed by the plan.',
    source_locator: 'user-specified research preferences',
  },
  mechanism_clusters: mechanismClusters,
  selected_papers: selectedPapers,
  important_exclusions: importantExclusions,
  summary: {
    selected_count: selectedPapers.length,
    mechanism_primary_counts: Object.fromEntries(Object.entries(mechanismClusters).map(([id, value]) => [id, value.primary_selected_count])),
    batch_counts: batchCounts,
    venue_counts: venueCounts,
    coverage_role_counts: coverageRoleCounts,
    full_text_status_counts: fullTextStatusCounts,
    important_exclusion_count: importantExclusions.length,
    swe_bench_family_count: selectedPapers.filter((paper) => paper.evaluation_families.includes('SWE_BENCH_FAMILY')).length,
  },
  selection_self_check: {
    claim_type: 'direct_evidence',
    source_locator: 'scripts/build_deep_reading_selection.test.js',
    statement: 'The executable phase check enforces 42 unique corpus papers, seven six-paper mechanism clusters, 3+3 per cluster across two 21-paper batches, role coverage minima, author and SWE-bench concentration limits, per-paper evidence/questions/access status, and an exclusion ledger.',
  },
  human_decisions_pending: [],
  phase_boundary: {
    claim_type: 'agent_inference',
    source_locator: 'AGENTS.md / Phase Discipline + user phase instructions',
    statement: 'This artifact is a reading plan only. It does not contain complete paper readings, candidate research ideas, novelty claims, or a confirmed direction.',
  },
};

fs.writeFileSync('synthesis/deep-reading-selection.json', `${JSON.stringify(output, null, 2)}\n`);

const roleLabels = {
  EMPIRICAL_STUDY: 'Empirical studies',
  METHOD_WORK: 'Method papers',
  TRAINING_WORK: 'Training/process-optimization papers',
  COUNTEREXAMPLE_OR_CONTRADICTORY_EVIDENCE: 'Counterexample or contradictory-evidence papers',
};

const representativeIds = [
  'ASE2025_understanding-software-engineering-agents-a-study-of-thought-action-resu',
  'ISSTA2026_to-run-or-not-to-run-analyzing-the-cost-effectiveness-of-code-execution-',
  'ICSE2026_are-solved-issues-in-swe-bench-really-solved-correctly-an-empirical-stud',
  'FSE2026_agentic-verification-of-software-systems',
  'ISSTA2026_evident-an-evidence-preserving-framework-for-iterative-system-level-pack',
  'ICSE2026_on-llms-internal-representation-of-code-correctness',
  'ICSE2026_repair-ingredients-are-all-you-need-improving-large-language-model-based',
  'ISSTA2026_swe-pdb-teaching-llms-to-leverage-debugging-tools-via-agentic-training',
];

const lines = [
  '# Deep-Reading Selection Report',
  '',
  '## Scope and phase boundary',
  '',
  '- `[direct_evidence]` The selection universe is the 988-paper cross-venue corpus and its FIELD_MAPPING assignments. Source: `synthesis/deep-reading-selection.json / input`.',
  '- `[agent_inference]` The final plan selects 42 papers and excludes out-of-preference work using the boundary recorded in `scope_boundary`.',
  '- No full-paper deep reading, research-idea generation, or direction confirmation was performed.',
  '',
  '## Mechanism coverage and batches',
  '',
  '| Mechanism cluster | Selected | Batch 1 | Batch 2 |',
  '|---|---:|---:|---:|',
];

for (const [id, mechanism] of Object.entries(mechanismClusters)) {
  const papers = selectedPapers.filter((paper) => paper.primary_mechanism_cluster === id);
  lines.push(`| ${mechanism.label} | ${papers.length} | ${papers.filter((paper) => paper.reading_batch.endsWith('_1')).length} | ${papers.filter((paper) => paper.reading_batch.endsWith('_2')).length} |`);
}

lines.push('', '## Viewpoint coverage', '', '| Role | Papers |', '|---|---:|');
for (const role of roleNames) lines.push(`| ${roleLabels[role]} | ${coverageRoleCounts[role]} |`);
lines.push('', `[direct_evidence] SWE-bench-family evaluations occur in ${output.summary.swe_bench_family_count} of 42 selections; the remaining papers diversify formal verification, agent-framework testing, fuzzing, build failures, industrial troubleshooting, static analysis, and code-generation settings. No author appears on more than two selected papers.`, '');

for (const batch of ['DEEP_READING_BATCH_1', 'DEEP_READING_BATCH_2']) {
  lines.push(`## ${batch.replaceAll('_', ' ')}`, '', '| Paper | Venue | Primary mechanism | Roles | Full text |', '|---|---|---|---|---|');
  for (const paper of selectedPapers.filter((item) => item.reading_batch === batch)) {
    lines.push(`| ${paper.title.replaceAll('|', '\\|')} | ${paper.venue_id} | ${mechanisms[paper.primary_mechanism_cluster].label} | ${paper.coverage_roles.join(', ')} | ${paper.full_text.status} |`);
  }
  lines.push('');
}

lines.push('## Representative anchors', '');
for (const id of representativeIds) {
  const paper = selectedPapers.find((item) => item.paper_id === id);
  lines.push(`- **${paper.title}**: \`[agent_inference]\` ${paper.selection_reason.statement} Source: \`${paper.selection_reason.source_locator}\`.`);
}

lines.push('', '## Important exclusions', '', '| Paper | Category | Reason |', '|---|---|---|');
for (const paper of importantExclusions) {
  lines.push(`| ${paper.title.replaceAll('|', '\\|')} | ${paper.exclusion_category} | \`[agent_inference]\` ${paper.reason.statement} |`);
}

lines.push(
  '',
  '## Access and uncertainty',
  '',
  `- \`[direct_evidence]\` Full-text status: ${fullTextStatusCounts.OPEN_FULL_TEXT_CONFIRMED || 0} open full texts confirmed, ${fullTextStatusCounts.PUBLISHER_RECORD_ONLY || 0} publisher-record-only papers, and ${fullTextStatusCounts.NOT_LOCATED_AFTER_TARGETED_SEARCH || 0} papers not located after targeted search.`,
  '- `[direct_evidence]` Every Batch 1 paper has `OPEN_FULL_TEXT_CONFIRMED` status and a checked URL. Batch 2 intentionally carries access uncertainty so availability does not distort mechanism representation.',
  '- `[agent_inference]` Title and official abstract were sufficient for every inclusion decision. The plan does not rely on unverified method-detail claims from a full-paper skim.',
  '- `[agent_inference]` No human decision is pending. Batch 1 can start without resolving Batch 2 access gaps.',
  '',
  '## Readiness',
  '',
  '- `[agent_inference]` The two batches are exactly balanced by mechanism (three papers per mechanism per batch) and comparably cover empirical, method, training, and contradictory evidence. The phase is ready to hand off to `DEEP_READING_BATCH_1`.',
  '- `[agent_inference]` “State understanding and decision control as a closed loop” remains only a cross-paper relationship to observe; it was not used as a required conclusion or research direction.',
  '',
);

fs.writeFileSync('reports/deep-reading-selection-report.md', `${lines.join('\n')}\n`);

console.log(`Generated deep-reading selection: ${selectedPapers.length} papers, ${batchCounts.DEEP_READING_BATCH_1}/${batchCounts.DEEP_READING_BATCH_2} batches, ${importantExclusions.length} important exclusions.`);
