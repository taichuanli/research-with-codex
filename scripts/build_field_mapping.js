const fs = require('node:fs');

const INPUT_PATH = 'corpus/cross-venue-research-paper-index.jsonl';
const ASSIGNMENTS_PATH = 'synthesis/field-mapping-paper-assignments.jsonl';
const SUMMARY_PATH = 'synthesis/field-mapping-summary.json';
const MATRIX_PATH = 'synthesis/cross-venue-topic-matrix.csv';
const EVIDENCE_PATH = 'synthesis/field-mapping-evidence-index.json';

const VENUES = ['ICSE2026', 'FSE2026', 'ISSTA2026', 'ASE2025'];
const PRIMARY_DOMAIN_ORDER = [
  'TESTING_QUALITY_ASSURANCE',
  'DEBUGGING_FAULT_LOCALIZATION_REPAIR',
  'PROGRAM_ANALYSIS_FORMAL_METHODS',
  'SECURITY_PRIVACY_SAFETY',
  'CODE_INTELLIGENCE_GENERATION_TRANSFORMATION',
  'MAINTENANCE_EVOLUTION_QUALITY',
  'REQUIREMENTS_DESIGN_ARCHITECTURE',
  'BUILD_RELEASE_OPERATIONS_PERFORMANCE',
  'ML_ENABLED_SYSTEMS_ENGINEERING',
  'HUMAN_SOCIAL_EDUCATION',
  'EMPIRICAL_BENCHMARKS_REPRODUCIBILITY',
  'CROSS_CUTTING_OR_UNCERTAIN',
];

const DOMAIN_LABELS = {
  TESTING_QUALITY_ASSURANCE: 'Testing and quality assurance',
  DEBUGGING_FAULT_LOCALIZATION_REPAIR: 'Debugging, fault localization, and repair',
  PROGRAM_ANALYSIS_FORMAL_METHODS: 'Program analysis and formal methods',
  SECURITY_PRIVACY_SAFETY: 'Security, privacy, and safety',
  CODE_INTELLIGENCE_GENERATION_TRANSFORMATION: 'Code intelligence, generation, and transformation',
  MAINTENANCE_EVOLUTION_QUALITY: 'Maintenance, evolution, and code quality',
  REQUIREMENTS_DESIGN_ARCHITECTURE: 'Requirements, design, architecture, and specification',
  BUILD_RELEASE_OPERATIONS_PERFORMANCE: 'Build, release, operations, configuration, and performance',
  ML_ENABLED_SYSTEMS_ENGINEERING: 'Engineering of ML-, DL-, and LLM-enabled systems',
  HUMAN_SOCIAL_EDUCATION: 'Human, social, organizational, and educational SE',
  EMPIRICAL_BENCHMARKS_REPRODUCIBILITY: 'Empirical methods, benchmarks, datasets, and reproducibility',
  CROSS_CUTTING_OR_UNCERTAIN: 'Cross-cutting or not reliable from title and abstract',
};

const EVIDENCE_PAPER_IDS = [
  'ICSE2026_game-changer-or-overenthusiastic-drunk-acquaintance-generative-ai-use-by',
  'ICSE2026_knowledge-matters-injecting-project-and-testing-knowledge-into-llm-based',
  'ICSE2026_evaluating-and-improving-automated-repository-level-rust-issue-resolutio',
  'FSE2026_agentic-verification-of-software-systems',
  'ISSTA2026_tracedev-a-traceability-driven-multi-agent-framework-for-requirement-to-',
  'ASE2025_agents-in-the-sandbox-end-to-end-crash-bug-reproduction-for-minecraft',
  'FSE2026_evaluating-llm-based-regression-test-generation',
  'ISSTA2026_context-matters-improving-the-practical-reliability-of-llm-based-unit-te',
  'ASE2025_do-llms-generate-useful-test-oracles-an-empirical-study-with-an-unbiased',
  'FSE2026_empowering-autonomous-debugging-agents-with-efficient-dynamic-analysis',
  'ISSTA2026_causalrepair-bridging-the-causality-gap-in-large-language-model-based-au',
  'FSE2026_vulinstruct-teaching-llms-root-cause-reasoning-for-vulnerability-detecti',
  'ISSTA2026_agentbreaker-evaluating-context-aware-indirect-prompt-injection-risks-in',
  'ASE2025_actaint-agent-based-taint-analysis-for-access-control-vulnerabilities-in',
  'ICSE2026_are-solved-issues-in-swe-bench-really-solved-correctly-an-empirical-stud',
  'FSE2026_swr-bench-assessing-llm-performance-in-real-world-code-review-comment-ge',
  'ISSTA2026_do-coverage-and-mutation-scores-of-llm-generated-test-suites-correlate-w',
  'ASE2025_defects4c-benchmarking-large-language-model-repair-capability-with-c-c-b',
  'ICSE2026_configuration-sensitive-linux-kernel-fuzzing',
  'FSE2026_adaptive-mutation-scheduling-with-deep-reinforcement-learning-for-smart-',
  'ISSTA2026_belobog-move-language-fuzzing-framework-for-real-world-smart-contracts',
  'ASE2025_guifuzz-unleashing-grey-box-fuzzing-on-desktop-graphical-user-interfacin',
  'ICSE2026_adarule-llm-driven-natural-language-to-ltl-conversion-via-pattern-adapti',
  'ISSTA2026_kapilot-llm-assisted-generation-of-kani-specifications-for-unsafe-rust-v',
  'ASE2025_improving-nlsat-for-nonlinear-real-arithmetic',
  'ICSE2026_a-comprehensive-study-of-deep-learning-model-fixing-approaches',
  'FSE2026_verifying-structural-robustness-of-deep-neural-network',
  'ISSTA2026_spectradl-a-historical-issue-driven-test-specification-assisted-transfer',
  'ASE2025_destabilizing-neurons-to-generate-challenging-neural-network-verificatio',
  'ICSE2026_specops-a-fully-automated-ai-agent-testing-framework-in-real-world-gui-e',
  'FSE2026_guimigrator-semantics-preserving-transpilation-from-android-xml-to-compo',
  'ISSTA2026_characterizing-and-repairing-obsolete-android-gui-tests-under-ui-evoluti',
  'ASE2025_beyond-static-gui-agent-evolving-llm-based-gui-testing-via-dynamic-memor',
  'ICSE2026_a-first-look-at-model-supply-chain-from-the-risk-perspective',
  'FSE2026_break-to-adapt-knowledge-based-updates-of-breaking-dependencies-in-javas',
  'ISSTA2026_deepsca-dependency-aware-software-composition-analysis-for-c-c-based-on-',
  'ASE2025_an-empirical-study-of-python-library-migration-using-large-language-mode',
  'FSE2026_how-do-developers-interact-with-ai-an-exploratory-study-on-modeling-deve',
  'ISSTA2026_unpacking-ai-agent-participation-in-issue-centered-collaboration-in-open',
  'ASE2025_an-empirical-study-of-knowledge-transfer-in-ai-pair-programming',
  'ICSE2026_freshbrew-a-benchmark-for-evaluating-ai-agents-on-java-code-migration',
  'ICSE2026_forge-an-llm-driven-framework-for-large-scale-smart-contract-vulnerabili',
  'ISSTA2026_asyncleakbench-a-curated-benchmark-of-asynchronous-resource-leaks-in-ope',
  'ASE2025_relia-accelerating-analysis-of-cloud-access-control-policies',
  'ASE2025_rustassure-differential-symbolic-testing-for-llm-transpiled-c-to-rust-co',
  'FSE2026_accessdroid-detecting-screen-reader-accessibility-issues-in-android-appl',
  'ICSE2026_intentfix-automated-logic-vulnerability-repair-via-llm-driven-intent-mod',
  'ICSE2026_boosting-gas-revenues-of-ethereum-miners',
  'ASE2025_programmers-visual-attention-on-function-call-graphs-during-code-summari',
];

function readJsonl(filePath) {
  return fs.readFileSync(filePath, 'utf8').trim().split('\n').filter(Boolean).map(JSON.parse);
}

function normalize(text) {
  return String(text || '').toLowerCase().replace(/\s+/g, ' ');
}

function matches(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function countMatches(text, patterns) {
  return patterns.reduce((count, pattern) => count + (pattern.test(text) ? 1 : 0), 0);
}

function sortedUnique(values) {
  return [...new Set(values)].sort();
}

function addIf(target, condition, value) {
  if (condition) target.push(value);
}

function objectTags(text) {
  const tags = [];
  addIf(tags, matches(text, [/\b(repository|repositories|project-level|project context|github)\b/, /issue[- ]to[- ]commit/, /pull request/]), 'REPOSITORY_PROJECT');
  addIf(tags, matches(text, [/\b(issue report|bug report|pull request|commit message|commit history|code review)\b/]), 'ISSUE_PULL_REQUEST_COMMIT_REVIEW');
  addIf(tags, matches(text, [/\b(source code|codebase|method|function|class|program)\b/]), 'SOURCE_CODE_PROGRAM_UNIT');
  addIf(tags, matches(text, [/\b(test suite|test case|test input|test oracle|assertion|mutant|mutation testing)\b/]), 'TEST_ASSET');
  addIf(tags, matches(text, [/\b(binary|bytecode|executable|firmware)\b/]), 'BINARY_BYTECODE_EXECUTABLE');
  addIf(tags, matches(text, [/\b(api|library|dependency|package|npm|maven|crate|third-party)\b/]), 'API_LIBRARY_DEPENDENCY_PACKAGE');
  addIf(tags, matches(text, [/\b(requirement|specification|formal specification|ltl|property|feature model|uml|modeling)\b/]), 'REQUIREMENT_SPECIFICATION_MODEL');
  addIf(tags, matches(text, [/\b(configuration|dockerfile|build system|build dependency|deployment|ci\/cd|continuous integration)\b/]), 'BUILD_CONFIGURATION_DEPLOYMENT');
  addIf(tags, matches(text, [/\b(log|trace|runtime|execution trace|monitoring|observability)\b/]), 'RUNTIME_LOG_TRACE');
  addIf(tags, matches(text, [/\b(compiler|interpreter|programming language|language server|runtime)\b/]), 'COMPILER_LANGUAGE_RUNTIME');
  addIf(tags, matches(text, [/\b(database|sql|query|dataframe)\b/]), 'DATABASE_DATA_SYSTEM');
  addIf(tags, matches(text, [/\b(gui|user interface|web application|web page|mobile app|android|ios|browser|layout)\b/]), 'GUI_WEB_MOBILE_INTERFACE');
  addIf(tags, matches(text, [/\b(microservice|distributed system|network|protocol|rpc|service mesh)\b/]), 'DISTRIBUTED_NETWORKED_SYSTEM');
  addIf(tags, matches(text, [/\b(cloud|container|kubernetes|docker|serverless)\b/]), 'CLOUD_CONTAINER_INFRASTRUCTURE');
  addIf(tags, matches(text, [/\b(embedded|iot|robot|autonomous driving|vehicle|ros)\b/]), 'EMBEDDED_CYBER_PHYSICAL_SYSTEM');
  addIf(tags, matches(text, [/\b(smart contract|blockchain|ethereum|defi|web3)\b/]), 'SMART_CONTRACT_BLOCKCHAIN');
  addIf(tags, matches(text, [/\b(deep learning|neural network|machine learning model|ml model|foundation model|language model|llm)\b/]), 'ML_DL_LLM_MODEL');
  addIf(tags, matches(text, [/\b(developer|programmer|engineer|practitioner|participant|team|community|student)\b/]), 'DEVELOPER_TEAM_COMMUNITY');
  addIf(tags, matches(text, [/\b(dataset|benchmark|corpus)\b/]), 'DATASET_BENCHMARK');
  return sortedUnique(tags);
}

function methodTags(text, title) {
  const tags = [];
  const llmNamedInTitle = matches(title, [/\b(large language model|llm|code language model|generative ai|genai|chatgpt)\b/]);
  const llmCentralInAbstract = matches(text, [
    /\b(we|our (approach|framework|method|system|technique))[^.]{0,180}\b(use|uses|using|employ|leverage|fine-tune|train|prompt|guide|integrat)[^.]{0,100}\b(large language model|llms?|code language model|generative ai|genai|chatgpt)\b/,
    /\b(large language model|llm|code language model)[- ](based|driven|assisted|powered|guided)[^.]{0,100}\b(approach|framework|method|technique|system|agent|generation|repair|test|analysis|detection|model|pipeline|tool)\b/,
    /\b(guide|guided by|using|via|with|leverage|leveraging|employ|integrat)[^.]{0,80}\b(llms?|large language models?|code language models?)\b/,
  ]);
  addIf(tags, llmNamedInTitle || llmCentralInAbstract, 'LLM_CODE_MODEL');
  addIf(tags, matches(text, [/\b(ai coding assistant|ai-assisted programming|ai pair programming|github copilot|developer-facing ai)\b/, /\bdevelopers?.{0,80}\bai\b/, /\bai\b.{0,80}\bdevelopers?\b/]), 'AI_CODING_ASSISTANT');
  addIf(tags, matches(text, [/\b(agentic|llm agents?|ai agents?|software development agents?|software engineering agents?|multi-agent|autonomous agents?)\b/]), 'LLM_AGENT_OR_MULTI_AGENT');
  addIf(tags, matches(text, [/\b(prompt|prompting|in-context|rag\b|retrieval-augmented|retrieval augmented|context retrieval)\b/]), 'PROMPTING_RETRIEVAL_CONTEXT_ENGINEERING');
  addIf(tags, matches(text, [/\b(machine learning|deep learning|neural network|transformer|reinforcement learning|knowledge distillation|embedding)\b/]), 'STATISTICAL_ML_DEEP_LEARNING');
  addIf(tags, matches(text, [/\b(static analysis|dataflow|taint|slicing|abstract interpretation|call graph|program dependence)\b/]), 'STATIC_PROGRAM_ANALYSIS');
  addIf(tags, matches(text, [/\b(dynamic analysis|runtime verification|runtime monitoring|instrumentation|profiling|tracing)\b/]), 'DYNAMIC_RUNTIME_ANALYSIS');
  addIf(tags, matches(text, [/\b(symbolic execution|smt|sat solver|constraint solving|constraint-guided|constraint guided|nlsat|model-constructing satisfiability)\b/]), 'SYMBOLIC_CONSTRAINT_SOLVING');
  addIf(tags, matches(text, [/\b(formal verification|model checking|theorem proving|proof|formal semantics|ltl|temporal logic)\b/]), 'FORMAL_VERIFICATION_PROOF');
  addIf(tags, matches(text, [/\b(search-based|search based|optimization|evolutionary|simulated annealing|reinforcement learning|bandit)\b/]), 'SEARCH_OPTIMIZATION_REINFORCEMENT_LEARNING');
  addIf(tags, matches(text, [/\bfuzz(ing|er)?\b/]), 'FUZZING_INPUT_EXPLORATION');
  addIf(tags, matches(text, [/\b(mutation testing|differential testing|metamorphic testing|combinatorial testing|fault injection)\b/]), 'TESTING_TRANSFORMATION_ORACLE');
  addIf(tags, matches(text, [/\b(graph[- ]based|knowledge graph|program graph|call graph|graph neural)\b/]), 'GRAPH_KNOWLEDGE_REPRESENTATION');
  addIf(tags, matches(text, [/\b(empirical study|empirical analysis|mining|longitudinal|quasi-experiment|causal|statistical analysis)\b/]), 'EMPIRICAL_MINING_STATISTICAL_ANALYSIS');
  addIf(tags, matches(text, [/\b(interview|survey|user study|participants|think-aloud|think aloud|eye[- ]tracking|qualitative study|grounded theory)\b/]), 'HUMAN_SUBJECTS_QUALITATIVE_METHOD');
  addIf(tags, matches(text, [/\b(benchmark|dataset|corpus|data collection)\b/]), 'BENCHMARK_DATASET_CONSTRUCTION_OR_USE');
  addIf(tags, matches(text, [/\b(refactor|migration|transformation|translat|synthesi[sz]e|synthesis)\b/]), 'PROGRAM_TRANSFORMATION_SYNTHESIS');
  return sortedUnique(tags);
}

function evaluationTags(text) {
  const tags = [];
  addIf(tags, matches(text, [/\b(user study|participants|interview|survey|think-aloud|think aloud|eye[- ]tracking|practitioner)\b/]), 'HUMAN_SUBJECTS_STUDY');
  addIf(tags, matches(text, [/\b(case study|case studies|real-world system|industrial|in the wild|production)\b/]), 'REAL_WORLD_OR_INDUSTRIAL_CASE_STUDY');
  addIf(tags, matches(text, [/\b(experiment|experiments|evaluat|compare|outperform|baseline|performance)\b/]), 'AUTOMATED_EXPERIMENT_OR_COMPARISON');
  addIf(tags, matches(text, [/\b(benchmark|dataset|corpus)\b/]), 'BENCHMARK_OR_DATASET_EVALUATION');
  addIf(tags, matches(text, [/\b(prove|proof|soundness|formal semantics|theorem)\b/]), 'FORMAL_ARGUMENT_OR_PROOF');
  addIf(tags, matches(text, [/\b(simulation|synthetic|generated program|random program)\b/]), 'SIMULATION_OR_SYNTHETIC_EVALUATION');
  addIf(tags, matches(text, [/\b(replication|re-evaluation|reproducib)\b/]), 'REPLICATION_OR_REEVALUATION');
  if (!tags.length) tags.push('NOT_STATED_CLEARLY_IN_ABSTRACT');
  return sortedUnique(tags);
}

function resourceTags(text, record) {
  const tags = [];
  const title = normalize(record.title);
  addIf(tags, /\bbenchmark\b/.test(title) || matches(text, [/\bwe (introduce|present|construct|create|release|curate)[^.]{0,180}\bbenchmark\b/]), 'NEW_BENCHMARK_OR_TEST_SUITE');
  addIf(tags, /\b(dataset|corpus)\b/.test(title) || matches(text, [/\bwe (introduce|present|construct|create|release|curate)[^.]{0,180}\b(dataset|corpus)\b/, /\b(new dataset|new corpus)\b/]), 'NEW_DATASET_OR_CORPUS');
  addIf(tags, matches(text, [/\bwe (implement|develop|build|present|introduce)[^.]{0,180}\b(tool|system|prototype|analyzer|fuzzer|solver)\b/]), 'NEW_TOOL_OR_PROTOTYPE');
  addIf(tags, matches(text, [/\bwe (present|introduce|propose)[^.]{0,180}\b(framework|platform|pipeline|library)\b/]), 'NEW_FRAMEWORK_OR_PLATFORM');
  addIf(tags, matches(text, [/\bwe (present|introduce|propose)[^.]{0,180}\b(model|approach|method|algorithm|technique)\b/]), 'NEW_METHOD_OR_ALGORITHM');
  if (record.publication?.artifact_url || (record.publication?.code_urls || []).length || (record.publication?.data_urls || []).length) {
    tags.push('OFFICIAL_ARTIFACT_CODE_OR_DATA_LINK_LISTED');
  }
  if (!tags.length) tags.push('NO_RESOURCE_CONTRIBUTION_STATED_IN_ABSTRACT');
  return sortedUnique(tags);
}

function subtopicTags(text, primary) {
  const tags = [];
  const rules = {
    TEST_GENERATION_AUGMENTATION: [/\b(test generation|generate.*test|test augmentation|unit test)\b/],
    REGRESSION_TESTING_SELECTION: [/\b(regression test|test selection|test prioritization)\b/],
    FUZZING: [/\bfuzz(ing|er)?\b/],
    TEST_ORACLES_ASSERTIONS: [/\b(test oracle|assertion|property[- ]based|metamorphic)\b/],
    MUTATION_TESTING: [/\b(mutation testing|mutant)\b/],
    BUG_DETECTION_LOCALIZATION: [/\b(fault locali[sz]|bug detection|defect detection|issue localization)\b/],
    PROGRAM_REPAIR: [/\b(program repair|bug fix|bug fixing|repairing|automated repair|patch generation)\b/],
    BUG_REPRODUCTION_ROOT_CAUSE: [/\b(reproduc.*bug|root cause|crash dedup|failure diagnos)\b/],
    STATIC_DYNAMIC_ANALYSIS: [/\b(static analysis|dynamic analysis|dataflow|taint|slicing|runtime verification)\b/],
    SYMBOLIC_FORMAL_VERIFICATION: [/\b(symbolic execution|formal verification|model checking|smt|sat solver|theorem proving|proof)\b/],
    VULNERABILITY_SECURITY_ANALYSIS: [/\b(vulnerab|security testing|malware|exploit|attack|cve)\b/],
    PRIVACY_ACCESS_CONTROL: [/\b(privacy|access control|permission|policy)\b/],
    SUPPLY_CHAIN_DEPENDENCY: [/\b(supply chain|dependency|package confusion|malicious package|third-party library)\b/],
    CODE_GENERATION_COMPLETION: [/\b(code generation|code completion|automatic programming|program synthesis|generate code)\b/],
    CODE_UNDERSTANDING_RETRIEVAL: [/\b(code understanding|code summarization|code search|code retrieval|code representation)\b/],
    CODE_TRANSFORMATION_MIGRATION: [/\b(refactor|migration|code transformation|moderni[sz])\b/],
    TRACEABILITY_DOCUMENTATION: [/\b(traceability|issue-commit|documentation|commit message|code review)\b/],
    CODE_QUALITY_SMELLS: [/\b(code smell|technical debt|code quality|maintainab)\b/],
    EVOLUTION_CHANGE_IMPACT: [/\b(evolution|change impact|history|version|co-evolution)\b/],
    REQUIREMENTS_SPECIFICATION: [/\b(requirement|specification|natural language to ltl|formalization)\b/],
    ARCHITECTURE_DESIGN_MODELING: [/\b(architecture|design model|feature model|microservice)\b/],
    BUILD_CONFIGURATION_DEPLOYMENT: [/\b(build|configuration|deployment|dockerfile|ci\/cd)\b/],
    PERFORMANCE_ENERGY_OBSERVABILITY: [/\b(performance|energy|log parsing|observability|tracing|latency)\b/],
    ML_MODEL_TESTING_REPAIR: [/\b(deep learning model|neural network|ml model|model fixing|dnn)\b/],
    LLM_SYSTEM_RELIABILITY_SAFETY: [/\b(llm.*(reliab|safety|hallucin|jailbreak|robust|fairness)|language model.*(reliab|safety|hallucin|jailbreak|robust|fairness))\b/],
    DEVELOPER_AI_ADOPTION_WORKFLOW: [/\b(developer.*(genai|llm|ai)|genai.*developer|ai-assisted software development|conversational ai)\b/],
    OSS_COMMUNITY_COLLABORATION: [/\b(open source|oss|community|contributor|collaboration|code of conduct)\b/],
    EDUCATION_ACCESSIBILITY_INCLUSION: [/\b(education|student|accessibility|blind|visual attention|gender|inclusion)\b/],
    BENCHMARK_DATASET_REPRODUCIBILITY: [/\b(benchmark|dataset|corpus|reproducib|replication)\b/],
  };
  for (const [tag, patterns] of Object.entries(rules)) addIf(tags, matches(text, patterns), tag);
  const allowedByPrimary = {
    TESTING_QUALITY_ASSURANCE: ['TEST_GENERATION_AUGMENTATION', 'REGRESSION_TESTING_SELECTION', 'FUZZING', 'TEST_ORACLES_ASSERTIONS', 'MUTATION_TESTING'],
    DEBUGGING_FAULT_LOCALIZATION_REPAIR: ['BUG_DETECTION_LOCALIZATION', 'PROGRAM_REPAIR', 'BUG_REPRODUCTION_ROOT_CAUSE'],
    PROGRAM_ANALYSIS_FORMAL_METHODS: ['STATIC_DYNAMIC_ANALYSIS', 'SYMBOLIC_FORMAL_VERIFICATION'],
    SECURITY_PRIVACY_SAFETY: ['VULNERABILITY_SECURITY_ANALYSIS', 'PRIVACY_ACCESS_CONTROL', 'SUPPLY_CHAIN_DEPENDENCY'],
    CODE_INTELLIGENCE_GENERATION_TRANSFORMATION: ['CODE_GENERATION_COMPLETION', 'CODE_UNDERSTANDING_RETRIEVAL', 'CODE_TRANSFORMATION_MIGRATION', 'TRACEABILITY_DOCUMENTATION'],
    MAINTENANCE_EVOLUTION_QUALITY: ['CODE_QUALITY_SMELLS', 'EVOLUTION_CHANGE_IMPACT', 'CODE_TRANSFORMATION_MIGRATION', 'TRACEABILITY_DOCUMENTATION', 'SUPPLY_CHAIN_DEPENDENCY'],
    REQUIREMENTS_DESIGN_ARCHITECTURE: ['REQUIREMENTS_SPECIFICATION', 'ARCHITECTURE_DESIGN_MODELING'],
    BUILD_RELEASE_OPERATIONS_PERFORMANCE: ['BUILD_CONFIGURATION_DEPLOYMENT', 'PERFORMANCE_ENERGY_OBSERVABILITY'],
    ML_ENABLED_SYSTEMS_ENGINEERING: ['ML_MODEL_TESTING_REPAIR', 'LLM_SYSTEM_RELIABILITY_SAFETY'],
    HUMAN_SOCIAL_EDUCATION: ['DEVELOPER_AI_ADOPTION_WORKFLOW', 'OSS_COMMUNITY_COLLABORATION', 'EDUCATION_ACCESSIBILITY_INCLUSION'],
    EMPIRICAL_BENCHMARKS_REPRODUCIBILITY: ['BENCHMARK_DATASET_REPRODUCIBILITY'],
    CROSS_CUTTING_OR_UNCERTAIN: [],
  };
  const filtered = tags.filter((tag) => (allowedByPrimary[primary] || []).includes(tag));
  if (!filtered.length) filtered.push(`GENERAL_${primary}`);
  return sortedUnique(filtered);
}

function domainScores(text, title) {
  const score = Object.fromEntries(PRIMARY_DOMAIN_ORDER.map((domain) => [domain, 0]));
  const apply = (domain, patterns, weight = 1) => { score[domain] += countMatches(text, patterns) * weight; };
  const applyTitle = (domain, patterns, weight = 20) => { score[domain] += countMatches(title, patterns) * weight; };

  applyTitle('SECURITY_PRIVACY_SAFETY', [/\bsecurity\b/, /vulnerab/, /\bprivacy\b/, /\bmalware\b/, /\bexploit/, /\battack/, /\bcve\b/, /access control/, /information leakage/, /secret[- ]key/, /package confusion/, /supply chain/, /jailbreak/, /prompt injection/]);
  apply('SECURITY_PRIVACY_SAFETY', [/\bsecurity\b/, /vulnerab/, /\bprivacy\b/, /\bmalware\b/, /\bexploit/, /\battack/, /\bcve\b/, /access control/, /package confusion/, /supply chain/]);

  applyTitle('TESTING_QUALITY_ASSURANCE', [/\btest/, /fuzz/, /mutation testing/, /\bmutant/, /\boracle/, /\bassertion/, /fault injection/, /metamorphic/, /differential testing/, /test coverage/]);
  apply('TESTING_QUALITY_ASSURANCE', [/test generation/, /test suite/, /test case/, /test selection/, /\bfuzzing\b/, /\bfuzzer\b/, /mutation testing/, /test oracle/, /fault injection/, /metamorphic testing/, /differential testing/]);

  applyTitle('DEBUGGING_FAULT_LOCALIZATION_REPAIR', [/\bdebug/, /\brepair/, /\bfixing\b/, /\bbugs?\b/, /bug fix/, /\bbug detection/, /finding bugs?/, /defect diagnos/, /fault locali[sz]/, /root cause/, /bug reproduction/, /reproducing bugs?/, /patch generation/, /issue localization/, /issue resolution/, /incident triage/, /program reduction/, /resource leak/, /floating[- ]point errors?/]);
  apply('DEBUGGING_FAULT_LOCALIZATION_REPAIR', [/\bdebugging\b/, /program repair/, /bug fix/, /defect repair/, /fault locali[sz]/, /root cause/, /bug reproduction/, /failure diagnos/, /patch generation/, /issue resolution/]);

  applyTitle('PROGRAM_ANALYSIS_FORMAL_METHODS', [/program analysis/, /static analysis/, /dynamic analysis/, /pointer analysis/, /symbolic/, /formal verification/, /\bverification\b/, /model checking/, /theorem prov/, /\bproof/, /\bsmt\b/, /\bsat solver/, /\bic3\b/, /termination/, /data[- ]?flow/, /abstract interpretation/, /type inference/, /taint analysis/, /program slicing/, /invariant inference/]);
  apply('PROGRAM_ANALYSIS_FORMAL_METHODS', [/program analysis/, /static analysis/, /dynamic analysis/, /symbolic execution/, /formal verification/, /model checking/, /theorem proving/, /\bsmt\b/, /\bsat solver/, /constraint solving/, /abstract interpretation/, /data[- ]?flow analysis/]);

  applyTitle('REQUIREMENTS_DESIGN_ARCHITECTURE', [/\brequirement/, /\bspecification/, /formalization/, /\barchitecture/, /\bdesign model/, /feature model/, /\bmodeling\b/, /model generation/, /user stor/]);
  apply('REQUIREMENTS_DESIGN_ARCHITECTURE', [/requirements engineering/, /formal specification/, /requirements? formalization/, /software architecture/, /feature model/, /design model/]);

  applyTitle('BUILD_RELEASE_OPERATIONS_PERFORMANCE', [/\bbuild/, /deploy/, /docker/, /infrastructure[- ]as[- ]code/, /\bconfiguration/, /\bperformance/, /\benergy/, /\blog(s|ging)?\b/, /observability/, /tracing/, /microservice/, /cloud operations?/, /on-call/, /incident diagnos/, /serverless/, /latency/]);
  apply('BUILD_RELEASE_OPERATIONS_PERFORMANCE', [/build system/, /build dependency/, /deployment/, /dockerfile/, /configuration performance/, /energy consumption/, /log parsing/, /observability/, /distributed tracing/, /site reliability/, /\bdevops\b/, /microservice/]);

  applyTitle('MAINTENANCE_EVOLUTION_QUALITY', [/maintain/, /evolution/, /refactor/, /migration/, /moderni[sz]/, /code smell/, /technical debt/, /change impact/, /dependenc/, /code review/, /\bcommit/, /version identification/, /software merge/, /technical lag/, /code adaptation/]);
  apply('MAINTENANCE_EVOLUTION_QUALITY', [/software maintenance/, /code evolution/, /refactor/, /code migration/, /code smell/, /technical debt/, /change impact/, /dependency update/, /code review/, /commit untangling/, /issue[- ]commit/]);

  applyTitle('CODE_INTELLIGENCE_GENERATION_TRANSFORMATION', [/code generation/, /code completion/, /program synthesis/, /automatic programming/, /code understanding/, /code summarization/, /code search/, /code retrieval/, /code representation/, /documentation/, /code translation/, /transpil/, /decompil/, /code transformation/, /code adaptation/, /code optimization/, /code editing/, /merge conflict/, /semantic clone/, /clone detection/]);
  apply('CODE_INTELLIGENCE_GENERATION_TRANSFORMATION', [/code generation/, /code completion/, /program synthesis/, /automatic programming/, /code understanding/, /code summarization/, /code search/, /code retrieval/, /api documentation/, /code translation/, /code transformation/]);

  applyTitle('ML_ENABLED_SYSTEMS_ENGINEERING', [/deep learning/, /neural network/, /\bdnn\b/, /machine learning model/, /\bml model/, /model fixing/, /model supply chain/, /llm[- ]enabled software/, /language model (safety|robustness|fairness)/]);
  apply('ML_ENABLED_SYSTEMS_ENGINEERING', [/deep learning model/, /neural network/, /machine learning model/, /ml system/, /model fixing/, /model supply chain/, /llm-enabled software/]);

  applyTitle('HUMAN_SOCIAL_EDUCATION', [/developer(s|’)? (use|behavior|practice|experience|perception|workflow|collaboration|retention|interact)/, /developer[- ]agent/, /programmers?\b/, /pair programming/, /ai-assisted programming/, /users?.*perception/, /\bcommunity\b/, /\beducation\b/, /\bstudent/, /accessibility/, /\bblind\b/, /\bgender\b/, /\bcareer/, /\btoil\b/, /visual attention/, /eye[- ]tracking/, /cognitive bias/, /human[- ]centered/, /practitioner/]);
  apply('HUMAN_SOCIAL_EDUCATION', [/semi-structured interview/, /qualitative study/, /developer adoption/, /developer behavior/, /practitioner/, /open.source community/, /software engineering education/, /accessibility/, /visual attention/, /well-being/]);

  applyTitle('EMPIRICAL_BENCHMARKS_REPRODUCIBILITY', [/\bbenchmark/, /\bdataset\b/, /\bcorpus\b/, /reproducib/, /\breplication\b/]);
  apply('EMPIRICAL_BENCHMARKS_REPRODUCIBILITY', [/new benchmark/, /benchmark dataset/, /we (introduce|present|construct|create|release|curate)[^.]{0,180}\b(benchmark|dataset|corpus)\b/, /reproducibility study/, /replication study/, /systematic literature/, /mapping study/]);

  if (matches(title, [/\b(security|privacy|vulnerab|malware|exploit|attack|access control|supply chain|jailbreak)\b/])) {
    score.SECURITY_PRIVACY_SAFETY += 3;
  }

  // A benchmark stays a cross-cutting evaluation contribution when its stated target is clear.
  if (score.EMPIRICAL_BENCHMARKS_REPRODUCIBILITY > 0) {
    const targeted = PRIMARY_DOMAIN_ORDER.filter((domain) => !['EMPIRICAL_BENCHMARKS_REPRODUCIBILITY', 'CROSS_CUTTING_OR_UNCERTAIN'].includes(domain) && score[domain] >= 3);
    if (targeted.length) score.EMPIRICAL_BENCHMARKS_REPRODUCIBILITY -= 2;
  }
  return score;
}

const MANUAL_OVERRIDES = {
  'ASE2025_improving-nlsat-for-nonlinear-real-arithmetic': {
    primary_domain: 'PROGRAM_ANALYSIS_FORMAL_METHODS',
    secondary_domains: [],
    subtopics: ['SYMBOLIC_FORMAL_VERIFICATION'],
    objects: ['REQUIREMENT_SPECIFICATION_MODEL'],
    methods: ['SYMBOLIC_CONSTRAINT_SOLVING', 'FORMAL_VERIFICATION_PROOF'],
    evaluation: ['AUTOMATED_EXPERIMENT_OR_COMPARISON', 'BENCHMARK_OR_DATASET_EVALUATION'],
    resources: ['NEW_TOOL_OR_PROTOTYPE', 'NEW_METHOD_OR_ALGORITHM'],
    note: 'Manual reconciliation of the prior UNCLASSIFIED_TITLE_AND_ABSTRACT sentinel: the abstract explicitly describes an SMT solver and comparison on SMT-LIB QF_NRA instances.',
  },
  'ASE2025_programmers-visual-attention-on-function-call-graphs-during-code-summari': {
    primary_domain: 'HUMAN_SOCIAL_EDUCATION',
    secondary_domains: ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION'],
    subtopics: ['CODE_UNDERSTANDING_RETRIEVAL', 'EDUCATION_ACCESSIBILITY_INCLUSION'],
    objects: ['SOURCE_CODE_PROGRAM_UNIT', 'DEVELOPER_TEAM_COMMUNITY', 'DATASET_BENCHMARK'],
    methods: ['HUMAN_SUBJECTS_QUALITATIVE_METHOD', 'GRAPH_KNOWLEDGE_REPRESENTATION', 'BENCHMARK_DATASET_CONSTRUCTION_OR_USE'],
    evaluation: ['HUMAN_SUBJECTS_STUDY', 'BENCHMARK_OR_DATASET_EVALUATION'],
    resources: ['NEW_DATASET_OR_CORPUS'],
    note: 'Manual reconciliation of the prior UNCLASSIFIED_TITLE_AND_ABSTRACT sentinel: the abstract reports a new eye-tracking dataset and analysis of programmer attention during code summarization.',
  },
  'ASE2025_relia-accelerating-analysis-of-cloud-access-control-policies': {
    primary_domain: 'SECURITY_PRIVACY_SAFETY',
    secondary_domains: ['PROGRAM_ANALYSIS_FORMAL_METHODS', 'BUILD_RELEASE_OPERATIONS_PERFORMANCE'],
    subtopics: ['PRIVACY_ACCESS_CONTROL', 'SYMBOLIC_FORMAL_VERIFICATION'],
    objects: ['CLOUD_CONTAINER_INFRASTRUCTURE', 'REQUIREMENT_SPECIFICATION_MODEL'],
    methods: ['SYMBOLIC_CONSTRAINT_SOLVING', 'FORMAL_VERIFICATION_PROOF'],
    evaluation: ['AUTOMATED_EXPERIMENT_OR_COMPARISON', 'REAL_WORLD_OR_INDUSTRIAL_CASE_STUDY'],
    resources: ['NEW_TOOL_OR_PROTOTYPE', 'NEW_METHOD_OR_ALGORITHM'],
    note: 'Manual reconciliation of the prior UNCLASSIFIED_TITLE_AND_ABSTRACT sentinel: the abstract describes SMT-based analysis of cloud access-control policies and a real-policy speed evaluation.',
  },
};

// These records had no sufficiently specific lexical rule hit in the first pass.
// Their primary/secondary domains were reviewed against the complete official abstract.
const REVIEWED_DOMAIN_OVERRIDES = {
  'ICSE2026_write-in-english-nobody-understands-your-language-here-a-study-of-non-en': ['HUMAN_SOCIAL_EDUCATION', ['MAINTENANCE_EVOLUTION_QUALITY']],
  'ICSE2026_how-does-core-contributor-disengagement-impact-open-source-project-activ': ['HUMAN_SOCIAL_EDUCATION', ['MAINTENANCE_EVOLUTION_QUALITY']],
  'ICSE2026_evolving-with-ai-a-longitudinal-analysis-of-developer-logs': ['HUMAN_SOCIAL_EDUCATION', ['ML_ENABLED_SYSTEMS_ENGINEERING']],
  'ICSE2026_an-empirical-study-of-webassembly-usage-in-node-js': ['EMPIRICAL_BENCHMARKS_REPRODUCIBILITY', ['MAINTENANCE_EVOLUTION_QUALITY']],
  'ICSE2026_fast-flow-sensitive-c-program-partitioning-via-iterative-value-flow-refi': ['PROGRAM_ANALYSIS_FORMAL_METHODS', []],
  'ICSE2026_on-llms-internal-representation-of-code-correctness': ['ML_ENABLED_SYSTEMS_ENGINEERING', ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION']],
  'ICSE2026_3d-software-synthesis-driven-by-constraint-expressive-intermediate-repre': ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION', ['REQUIREMENTS_DESIGN_ARCHITECTURE']],
  'ICSE2026_a-comparison-of-conversational-models-and-humans-in-answering-technical-': ['HUMAN_SOCIAL_EDUCATION', ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION']],
  'ICSE2026_a-comprehensive-study-of-concurrency-bugs-in-the-linux-kernel': ['DEBUGGING_FAULT_LOCALIZATION_REPAIR', ['EMPIRICAL_BENCHMARKS_REPRODUCIBILITY']],
  'ICSE2026_adarule-llm-driven-natural-language-to-ltl-conversion-via-pattern-adapti': ['REQUIREMENTS_DESIGN_ARCHITECTURE', ['PROGRAM_ANALYSIS_FORMAL_METHODS']],
  'ICSE2026_are-humans-and-llms-confused-by-the-same-code-an-empirical-study-on-fixa': ['HUMAN_SOCIAL_EDUCATION', ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION']],
  'ICSE2026_automating-just-in-time-python-type-annotation-updating': ['MAINTENANCE_EVOLUTION_QUALITY', ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION']],
  'ICSE2026_cclinsight-unveiling-insights-in-gpu-collective-communication-libraries-': ['BUILD_RELEASE_OPERATIONS_PERFORMANCE', []],
  'ICSE2026_context-free-grammar-inference-for-complex-programming-languages-in-blac': ['PROGRAM_ANALYSIS_FORMAL_METHODS', []],
  'ICSE2026_evaluating-the-effectiveness-of-llm-based-interoperability': ['REQUIREMENTS_DESIGN_ARCHITECTURE', ['ML_ENABLED_SYSTEMS_ENGINEERING']],
  'ICSE2026_filtering-before-tuning-robust-fine-tuning-of-large-code-models-under-no': ['ML_ENABLED_SYSTEMS_ENGINEERING', []],
  'ICSE2026_is-call-graph-pruning-really-effective-an-empirical-re-evaluation': ['PROGRAM_ANALYSIS_FORMAL_METHODS', ['EMPIRICAL_BENCHMARKS_REPRODUCIBILITY']],
  'ICSE2026_learning-from-software-failures-a-case-study-at-a-national-space-researc': ['HUMAN_SOCIAL_EDUCATION', ['BUILD_RELEASE_OPERATIONS_PERFORMANCE']],
  'ICSE2026_likethis-empowering-app-users-to-submit-ui-improvement-suggestions-inste': ['REQUIREMENTS_DESIGN_ARCHITECTURE', ['HUMAN_SOCIAL_EDUCATION']],
  'ICSE2026_no-shot-in-the-dark-efficient-context-free-language-reachability-via-con': ['PROGRAM_ANALYSIS_FORMAL_METHODS', []],
  'ICSE2026_panoptes-a-profile-clustering-framework-for-context-aware-binary-optimiz': ['BUILD_RELEASE_OPERATIONS_PERFORMANCE', ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION']],
  'ICSE2026_predicting-failures-in-smart-human-centric-ecosystems': ['TESTING_QUALITY_ASSURANCE', ['BUILD_RELEASE_OPERATIONS_PERFORMANCE']],
  'ICSE2026_preserve-intelligent-management-for-lmaas-systems-via-hierarchical-predi': ['BUILD_RELEASE_OPERATIONS_PERFORMANCE', ['ML_ENABLED_SYSTEMS_ENGINEERING']],
  'ICSE2026_realitycraft-automated-synthesis-of-extended-reality-device-interaction-': ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION', ['TESTING_QUALITY_ASSURANCE']],
  'ICSE2026_rise-rule-driven-sql-dialect-translation-via-query-reduction': ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION', ['MAINTENANCE_EVOLUTION_QUALITY']],
  'ICSE2026_sapling-quantifying-and-measuring-the-maturity-of-the-risc-v-software-ec': ['MAINTENANCE_EVOLUTION_QUALITY', ['EMPIRICAL_BENCHMARKS_REPRODUCIBILITY']],
  'ICSE2026_small-changes-big-trouble-demystifying-and-parsing-license-variants-for-': ['SECURITY_PRIVACY_SAFETY', ['MAINTENANCE_EVOLUTION_QUALITY']],
  'ICSE2026_staying-or-leaving-how-job-satisfaction-embeddedness-and-antecedents-pre': ['HUMAN_SOCIAL_EDUCATION', []],
  'ICSE2026_tacos-generated-context-summaries-for-task-resumption': ['HUMAN_SOCIAL_EDUCATION', ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION']],
  'ICSE2026_the-software-infrastructure-attitude-scale-sias-a-questionnaire-instrume': ['HUMAN_SOCIAL_EDUCATION', ['EMPIRICAL_BENCHMARKS_REPRODUCIBILITY']],
  'ICSE2026_the-state-of-open-science-in-software-engineering-research-a-case-study-': ['EMPIRICAL_BENCHMARKS_REPRODUCIBILITY', []],
  'ICSE2026_toward-efficient-package-maintenance-an-empirical-study-of-patch-sharing': ['MAINTENANCE_EVOLUTION_QUALITY', []],
  'ICSE2026_validating-mixed-integer-programming-solvers': ['TESTING_QUALITY_ASSURANCE', ['PROGRAM_ANALYSIS_FORMAL_METHODS']],
  'ICSE2026_views-on-internal-and-external-validity-in-empirical-software-engineerin': ['EMPIRICAL_BENCHMARKS_REPRODUCIBILITY', ['HUMAN_SOCIAL_EDUCATION']],
  'FSE2026_a-tuple-oriented-sampling-method-for-generating-small-pairwise-covering-': ['TESTING_QUALITY_ASSURANCE', []],
  'FSE2026_accelerating-policy-synthesis-in-large-scale-mdps-via-hierarchical-adapt': ['PROGRAM_ANALYSIS_FORMAL_METHODS', ['REQUIREMENTS_DESIGN_ARCHITECTURE']],
  'FSE2026_feature-slice-matching-for-precise-bug-detection': ['DEBUGGING_FAULT_LOCALIZATION_REPAIR', []],
  'FSE2026_compiling-code-llms-into-lightweight-executables': ['ML_ENABLED_SYSTEMS_ENGINEERING', ['BUILD_RELEASE_OPERATIONS_PERFORMANCE']],
  'FSE2026_crossfit-demystifying-vm-callback-bugs-in-interpreters': ['DEBUGGING_FAULT_LOCALIZATION_REPAIR', ['PROGRAM_ANALYSIS_FORMAL_METHODS']],
  'FSE2026_detecting-bugs-in-rust-compiler-fix-suggestions-via-constraint-violation': ['DEBUGGING_FAULT_LOCALIZATION_REPAIR', ['TESTING_QUALITY_ASSURANCE']],
  'FSE2026_gpu-accelerated-flow-sensitive-pointer-analysis-for-c-c-programs': ['PROGRAM_ANALYSIS_FORMAL_METHODS', ['BUILD_RELEASE_OPERATIONS_PERFORMANCE']],
  'FSE2026_one-size-does-fit-all-exploring-model-fusion-for-software-engineering-ta': ['ML_ENABLED_SYSTEMS_ENGINEERING', ['EMPIRICAL_BENCHMARKS_REPRODUCIBILITY']],
  'FSE2026_how-do-developers-interact-with-ai-an-exploratory-study-on-modeling-deve': ['HUMAN_SOCIAL_EDUCATION', ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION']],
  'FSE2026_graphqlify-automated-and-type-safety-preserving-graphql-api-adoption': ['MAINTENANCE_EVOLUTION_QUALITY', ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION']],
  'FSE2026_how-low-can-you-go-the-data-light-se-challenge': ['EMPIRICAL_BENCHMARKS_REPRODUCIBILITY', []],
  'FSE2026_mining-long-tail-bugs-identifying-rare-and-overlooked-issues-in-code': ['DEBUGGING_FAULT_LOCALIZATION_REPAIR', []],
  'FSE2026_recommending-usability-improvements-with-multimodal-large-language-model': ['REQUIREMENTS_DESIGN_ARCHITECTURE', ['HUMAN_SOCIAL_EDUCATION']],
  'FSE2026_reducing-cost-of-llm-agents-with-trajectory-reduction': ['ML_ENABLED_SYSTEMS_ENGINEERING', ['BUILD_RELEASE_OPERATIONS_PERFORMANCE']],
  'FSE2026_satisfiability-solving-with-llms': ['PROGRAM_ANALYSIS_FORMAL_METHODS', ['EMPIRICAL_BENCHMARKS_REPRODUCIBILITY']],
  'FSE2026_tsguard-automated-user-centric-incident-diagnosis-for-ai-workloads-in-th': ['BUILD_RELEASE_OPERATIONS_PERFORMANCE', ['DEBUGGING_FAULT_LOCALIZATION_REPAIR']],
  'FSE2026_understanding-and-predicting-accepted-code-suggestions-in-ai-assisted-pr': ['HUMAN_SOCIAL_EDUCATION', ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION']],
  'ISSTA2026_applying-system-call-filtering-to-real-world-binaries-experience-paper': ['SECURITY_PRIVACY_SAFETY', ['PROGRAM_ANALYSIS_FORMAL_METHODS']],
  'ISSTA2026_bashcoder-r1-towards-robust-and-explainable-bash-script-generation-with-': ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION', ['ML_ENABLED_SYSTEMS_ENGINEERING']],
  'ISSTA2026_code-mue-measuring-code-llm-uncertainty-through-execution-based-semantic': ['ML_ENABLED_SYSTEMS_ENGINEERING', ['EMPIRICAL_BENCHMARKS_REPRODUCIBILITY']],
  'ISSTA2026_deprecated-but-not-abandoned-a-large-scale-empirical-study-on-growing-us': ['MAINTENANCE_EVOLUTION_QUALITY', ['HUMAN_SOCIAL_EDUCATION']],
  'ISSTA2026_efficient-predictive-monitoring-of-message-passing-interface-programs': ['PROGRAM_ANALYSIS_FORMAL_METHODS', ['BUILD_RELEASE_OPERATIONS_PERFORMANCE']],
  'ISSTA2026_mathematically-guided-detection-of-floating-point-errors': ['DEBUGGING_FAULT_LOCALIZATION_REPAIR', ['PROGRAM_ANALYSIS_FORMAL_METHODS']],
  'ISSTA2026_mind-the-gap-an-empirical-study-of-synchronization-gaps-delays-and-misse': ['MAINTENANCE_EVOLUTION_QUALITY', ['EMPIRICAL_BENCHMARKS_REPRODUCIBILITY']],
  'ISSTA2026_attncompress-dynamic-attention-guided-trajectory-compression-for-softwar': ['ML_ENABLED_SYSTEMS_ENGINEERING', ['BUILD_RELEASE_OPERATIONS_PERFORMANCE']],
  'ISSTA2026_cracking-query-bottlenecks-towards-efficiency-oriented-text-to-sql-gener': ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION', ['BUILD_RELEASE_OPERATIONS_PERFORMANCE']],
  'ISSTA2026_do-large-language-models-understand-code-like-humans': ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION', ['HUMAN_SOCIAL_EDUCATION', 'EMPIRICAL_BENCHMARKS_REPRODUCIBILITY']],
  'ISSTA2026_efficient-grammar-constrained-decoding-via-parser-stack-classification': ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION', ['PROGRAM_ANALYSIS_FORMAL_METHODS']],
  'ISSTA2026_guarding-the-lifeline-a-first-look-and-automated-defect-diagnosis-for-ro': ['DEBUGGING_FAULT_LOCALIZATION_REPAIR', ['MAINTENANCE_EVOLUTION_QUALITY']],
  'ISSTA2026_lookahead-then-verify-reliable-constrained-decoding-for-diffusion-llms-u': ['ML_ENABLED_SYSTEMS_ENGINEERING', ['PROGRAM_ANALYSIS_FORMAL_METHODS']],
  'ISSTA2026_nsync-automated-cloud-infrastructure-as-code-reconciliation-with-ai-agen': ['BUILD_RELEASE_OPERATIONS_PERFORMANCE', ['MAINTENANCE_EVOLUTION_QUALITY']],
  'ISSTA2026_rust-s-type-checker-implementation-is-unsound-an-empirical-study-on-soun': ['DEBUGGING_FAULT_LOCALIZATION_REPAIR', ['PROGRAM_ANALYSIS_FORMAL_METHODS']],
  'ISSTA2026_the-discreet-charm-of-the-bugeoisie-a-first-look-at-bug-reports-created-': ['EMPIRICAL_BENCHMARKS_REPRODUCIBILITY', ['HUMAN_SOCIAL_EDUCATION']],
  'ISSTA2026_unpacking-ai-agent-participation-in-issue-centered-collaboration-in-open': ['HUMAN_SOCIAL_EDUCATION', ['MAINTENANCE_EVOLUTION_QUALITY']],
  'ISSTA2026_towards-explorative-irbl-combining-semantic-retrieval-with-llm-driven-it': ['DEBUGGING_FAULT_LOCALIZATION_REPAIR', ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION']],
  'ISSTA2026_towards-iterative-end-to-end-software-development-a-feature-driven-multi': ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION', ['REQUIREMENTS_DESIGN_ARCHITECTURE']],
  'ISSTA2026_vbox-efficient-black-box-serializability-verification': ['PROGRAM_ANALYSIS_FORMAL_METHODS', ['TESTING_QUALITY_ASSURANCE']],
  'ISSTA2026_you-are-deceived-in-the-pocket-intrusive-advertisements-in-mobile-applic': ['SECURITY_PRIVACY_SAFETY', ['HUMAN_SOCIAL_EDUCATION']],
  'ASE2025_my-productivity-is-boosted-but-demystifying-users-perception-on-ai-codin': ['HUMAN_SOCIAL_EDUCATION', []],
  'ASE2025_a-multi-modality-evaluation-of-the-reality-gap-in-autonomous-driving-sys': ['TESTING_QUALITY_ASSURANCE', ['ML_ENABLED_SYSTEMS_ENGINEERING']],
  'ASE2025_advancing-automated-ethical-profiling-in-se-a-zero-shot-evaluation-of-ll': ['HUMAN_SOCIAL_EDUCATION', ['ML_ENABLED_SYSTEMS_ENGINEERING']],
  'ASE2025_an-empirical-study-of-knowledge-transfer-in-ai-pair-programming': ['HUMAN_SOCIAL_EDUCATION', []],
  'ASE2025_argus-resilience-oriented-safety-assurance-framework-for-end-to-end-adss': ['SECURITY_PRIVACY_SAFETY', ['ML_ENABLED_SYSTEMS_ENGINEERING']],
  'ASE2025_detecting-semantic-clones-of-unseen-functionality': ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION', []],
  'ASE2025_epso-a-caching-based-efficient-superoptimizer-for-bpf-bytecode': ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION', ['BUILD_RELEASE_OPERATIONS_PERFORMANCE']],
  'ASE2025_finding-bugs-in-mlir-compiler-infrastructure-via-lowering-space-explorat': ['TESTING_QUALITY_ASSURANCE', ['DEBUGGING_FAULT_LOCALIZATION_REPAIR']],
  'ASE2025_from-characters-to-structure-rethinking-real-time-collaborative-programm': ['REQUIREMENTS_DESIGN_ARCHITECTURE', ['HUMAN_SOCIAL_EDUCATION']],
  'ASE2025_rechecking-recheck-requests-in-continuous-integration-an-empirical-study': ['BUILD_RELEASE_OPERATIONS_PERFORMANCE', ['TESTING_QUALITY_ASSURANCE']],
  'ASE2025_tensorguard-gradient-based-model-fingerprinting-for-llm-similarity-detec': ['SECURITY_PRIVACY_SAFETY', ['ML_ENABLED_SYSTEMS_ENGINEERING']],
  'ASE2025_llmport-cross-file-patch-porting-via-task-decomposition-and-self-correct': ['MAINTENANCE_EVOLUTION_QUALITY', ['DEBUGGING_FAULT_LOCALIZATION_REPAIR']],
  'ASE2025_lspfuzz-hunting-bugs-in-language-servers': ['TESTING_QUALITY_ASSURANCE', ['DEBUGGING_FAULT_LOCALIZATION_REPAIR']],
  'ASE2025_promfuzz-leveraging-llm-driven-and-bug-oriented-composite-analysis-for-d': ['TESTING_QUALITY_ASSURANCE', ['DEBUGGING_FAULT_LOCALIZATION_REPAIR']],
  'ASE2025_scalecirc-scaling-the-analysis-over-circom-circuits': ['PROGRAM_ANALYSIS_FORMAL_METHODS', []],
  'ASE2025_why-ai-agents-still-need-you-findings-from-developer-agent-collaboration': ['HUMAN_SOCIAL_EDUCATION', ['CODE_INTELLIGENCE_GENERATION_TRANSFORMATION']],
  'ASE2025_the-fault-in-our-stats': ['PROGRAM_ANALYSIS_FORMAL_METHODS', []],
  'ASE2025_understanding-feature-request-practice-on-github-via-a-large-scale-empir': ['REQUIREMENTS_DESIGN_ARCHITECTURE', ['HUMAN_SOCIAL_EDUCATION']],
};

function topicClusters(text, title, classification) {
  const tags = [];
  const has = (tag) => classification.methods.includes(tag) || classification.objects.includes(tag) || classification.subtopics.includes(tag);
  const primary = classification.primary_domain;
  const agent = has('LLM_AGENT_OR_MULTI_AGENT');
  const llm = has('LLM_CODE_MODEL');
  const aiAssistant = has('AI_CODING_ASSISTANT');
  const formal = has('FORMAL_VERIFICATION_PROOF') || has('SYMBOLIC_CONSTRAINT_SOLVING');
  addIf(tags, agent, 'AGENTIC_SOFTWARE_ENGINEERING');
  addIf(tags, agent && matches(title, [/\b(repository[- ]level|repository issue|swe[- ]?bench|software (development|engineering) agent|coding agent|issue resolution|issue localization|code adaptation)\b/]), 'REPOSITORY_LEVEL_LLM_AGENTS');
  addIf(tags, primary === 'TESTING_QUALITY_ASSURANCE' && llm, 'LLM_ENABLED_TEST_ENGINEERING');
  addIf(tags, primary === 'DEBUGGING_FAULT_LOCALIZATION_REPAIR' && llm, 'LLM_DEBUGGING_REPAIR');
  addIf(tags, primary === 'SECURITY_PRIVACY_SAFETY' && llm, 'LLM_SECURITY_ASSURANCE');
  const llmEvaluationTitle = matches(title, [/\b(evaluat|assess|benchmark|do |can |how |are |on ).*\b(llm|large language model|code language model)/, /\b(llm|large language model|code language model).*\b(evaluat|reason|understand|correctness|reliab|robust|safety|hallucin|jailbreak|fairness)/]);
  addIf(tags, llm && (has('LLM_SYSTEM_RELIABILITY_SAFETY') || llmEvaluationTitle), 'LLM_RELIABILITY_EVALUATION');
  addIf(tags, has('FUZZING_INPUT_EXPLORATION'), 'FUZZING_AND_INPUT_EXPLORATION');
  addIf(tags, formal && ['PROGRAM_ANALYSIS_FORMAL_METHODS', 'REQUIREMENTS_DESIGN_ARCHITECTURE', 'SECURITY_PRIVACY_SAFETY'].includes(primary), 'FORMAL_AND_SPEC_DRIVEN_ASSURANCE');
  addIf(tags, has('ML_DL_LLM_MODEL') && (primary === 'ML_ENABLED_SYSTEMS_ENGINEERING' || matches(title, [/\b(deep learning|neural network|machine learning|ml system|ml model|dnn)\b/])), 'ML_DL_SYSTEM_RELIABILITY');
  addIf(tags, has('GUI_WEB_MOBILE_INTERFACE') && matches(title, [/\b(gui|ui\b|user interface|web|mobile|android|ios|browser|layout|virtual reality|extended reality|vr\b|xr\b)/]) && ['TESTING_QUALITY_ASSURANCE', 'CODE_INTELLIGENCE_GENERATION_TRANSFORMATION', 'REQUIREMENTS_DESIGN_ARCHITECTURE'].includes(primary), 'GUI_WEB_MOBILE_AUTOMATION');
  const dependencyTarget = matches(text, [/\b(software supply chain|model supply chain|dependenc(y|ies)|package confusion|malicious package|third-party librar|package manager|package maintenance|library migration|api migration|npm|pypi|maven)\b/]);
  addIf(tags, dependencyTarget && ['SECURITY_PRIVACY_SAFETY', 'MAINTENANCE_EVOLUTION_QUALITY', 'BUILD_RELEASE_OPERATIONS_PERFORMANCE'].includes(primary), 'SUPPLY_CHAIN_AND_DEPENDENCY_ASSURANCE');
  addIf(tags, matches(text, [/\b(refactor|migration|moderni[sz]|code evolution|change impact)\b/]) && ['MAINTENANCE_EVOLUTION_QUALITY', 'CODE_INTELLIGENCE_GENERATION_TRANSFORMATION'].includes(primary), 'EVOLUTION_MIGRATION_REFACTORING');
  const humanAiTitle = matches(title, [/\b(developer|programmer|coding|pair programming|software professional|users?.*perception).*\b(ai|llm|genai|agent|copilot)/, /\b(ai|llm|genai|agent|copilot).*\b(developer|programmer|coding|pair programming|software professional|software development)/, /ai agent participation/]);
  addIf(tags, primary === 'HUMAN_SOCIAL_EDUCATION' && (llm || aiAssistant || agent) && humanAiTitle, 'HUMAN_AI_DEVELOPER_WORK');
  return sortedUnique(tags);
}

function classify(record) {
  const title = normalize(record.title);
  const text = `${title} ${normalize(record.abstract)}`;
  const score = domainScores(text, title);
  const ranked = [...PRIMARY_DOMAIN_ORDER]
    .filter((domain) => domain !== 'CROSS_CUTTING_OR_UNCERTAIN')
    .sort((left, right) => score[right] - score[left] || PRIMARY_DOMAIN_ORDER.indexOf(left) - PRIMARY_DOMAIN_ORDER.indexOf(right));
  const primary = score[ranked[0]] > 0 ? ranked[0] : 'CROSS_CUTTING_OR_UNCERTAIN';
  const runnerUp = ranked[1];
  const secondary = primary === 'CROSS_CUTTING_OR_UNCERTAIN'
    ? []
    : ranked.filter((domain) => domain !== primary && score[domain] >= 4 && score[domain] >= score[primary] * 0.55).slice(0, 3);
  const classification = {
    primary_domain: primary,
    secondary_domains: secondary,
    subtopics: subtopicTags(text, primary),
    objects: objectTags(text),
    methods: methodTags(text, title),
    evaluation: evaluationTags(text),
    resources: resourceTags(text, record),
    score,
    note: null,
  };
  const override = MANUAL_OVERRIDES[record.paper_id];
  if (override) {
    Object.assign(classification, {
      primary_domain: override.primary_domain,
      secondary_domains: override.secondary_domains,
      subtopics: override.subtopics,
      objects: override.objects,
      methods: override.methods,
      evaluation: override.evaluation,
      resources: override.resources,
      note: override.note,
    });
  } else if (REVIEWED_DOMAIN_OVERRIDES[record.paper_id]) {
    const [reviewedPrimary, reviewedSecondary] = REVIEWED_DOMAIN_OVERRIDES[record.paper_id];
    classification.primary_domain = reviewedPrimary;
    classification.secondary_domains = reviewedSecondary;
    classification.subtopics = subtopicTags(text, reviewedPrimary);
    classification.note = 'Primary and secondary domains manually reconciled against the complete official abstract after first-pass ambiguity review.';
  }
  if (!classification.objects.length) classification.objects = ['NOT_SPECIFIED_FROM_TITLE_AND_ABSTRACT'];
  if (!classification.methods.length) classification.methods = ['NOT_SPECIFIED_FROM_TITLE_AND_ABSTRACT'];
  const reviewed = Boolean(REVIEWED_DOMAIN_OVERRIDES[record.paper_id]);
  const resolvedPrimary = classification.primary_domain;
  const margin = resolvedPrimary === 'CROSS_CUTTING_OR_UNCERTAIN' ? 0 : score[resolvedPrimary] - score[runnerUp];
  const uncertainty = [];
  if (resolvedPrimary === 'CROSS_CUTTING_OR_UNCERTAIN') uncertainty.push('No primary SE problem domain reached the rule threshold from the title and official abstract.');
  if (!override && !reviewed && score[resolvedPrimary] <= 3) uncertainty.push('Primary-domain signal is weak; retain this mapping as provisional for later deep reading.');
  if (!override && !reviewed && margin <= 0 && resolvedPrimary !== 'CROSS_CUTTING_OR_UNCERTAIN') uncertainty.push(`Primary domain tied with ${runnerUp}; secondary-domain tag preserves the ambiguity.`);
  if (classification.evaluation.includes('NOT_STATED_CLEARLY_IN_ABSTRACT')) uncertainty.push('The abstract does not state a specific evaluation setting.');
  const confidence = override || reviewed || (score[resolvedPrimary] >= 6 && margin >= 2) ? 'high' : (score[resolvedPrimary] >= 4 ? 'medium' : 'low');
  classification.topic_clusters = topicClusters(text, title, classification);
  classification.confidence = confidence;
  classification.uncertainty = uncertainty;
  delete classification.score;
  return classification;
}

function countBy(records, selector) {
  const output = {};
  for (const record of records) {
    const values = selector(record);
    for (const value of values) {
      output[value] ||= Object.fromEntries(VENUES.map((venue) => [venue, 0]));
      output[value][record.venue.venue_id] += 1;
    }
  }
  for (const counts of Object.values(output)) counts.total = VENUES.reduce((sum, venue) => sum + counts[venue], 0);
  return Object.fromEntries(Object.entries(output).sort(([left], [right]) => left.localeCompare(right)));
}

function crossCount(records, rowSelector, columnSelector) {
  const output = {};
  for (const record of records) {
    for (const row of rowSelector(record)) {
      output[row] ||= {};
      for (const column of columnSelector(record)) output[row][column] = (output[row][column] || 0) + 1;
    }
  }
  return Object.fromEntries(Object.entries(output)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([row, columns]) => [row, Object.fromEntries(Object.entries(columns).sort(([, left], [, right]) => right - left))]));
}

function csvEscape(value) {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function buildMatrixCsv(primaryCounts, clusterCounts, mechanismCounts, venueTotals) {
  const allTotal = VENUES.reduce((sum, venue) => sum + venueTotals[venue], 0);
  const lines = [`matrix,row_id,${VENUES.flatMap((venue) => [`${venue}_count`, `${venue}_percent`]).join(',')},total,total_percent`];
  const append = (matrix, key, counts) => lines.push([
    matrix,
    key,
    ...VENUES.flatMap((venue) => [counts[venue], (100 * counts[venue] / venueTotals[venue]).toFixed(2)]),
    counts.total,
    (100 * counts.total / allTotal).toFixed(2),
  ].map(csvEscape).join(','));
  for (const [key, counts] of Object.entries(primaryCounts)) append('primary_domain', key, counts);
  for (const [key, counts] of Object.entries(clusterCounts)) append('topic_cluster', key, counts);
  for (const [key, counts] of Object.entries(mechanismCounts)) append('method_mechanism', key, counts);
  return `${lines.join('\n')}\n`;
}

function main() {
  const input = readJsonl(INPUT_PATH);
  const assignments = input.map((record) => {
    const detail = (record.source_records || []).find((source) => source.source_type === 'official_detail');
    const classification = classify(record);
    return {
      schema_version: 1,
      phase: 'FIELD_MAPPING',
      paper_id: record.paper_id,
      title: record.title,
      venue: record.venue,
      evidence: {
        claim_type: 'agent_inference',
        source: INPUT_PATH,
        source_locator: detail ? `${detail.source_locator} / event description abstract` : `${record.paper_id} / abstract`,
        statement: 'Classification inferred from the official title and abstract only; no PDF or external target was fetched.',
      },
      classification,
    };
  });
  const primaryCounts = countBy(assignments, (record) => [record.classification.primary_domain]);
  const secondaryCounts = countBy(assignments, (record) => record.classification.secondary_domains);
  const subtopicCounts = countBy(assignments, (record) => record.classification.subtopics);
  const objectCounts = countBy(assignments, (record) => record.classification.objects);
  const mechanismCounts = countBy(assignments, (record) => record.classification.methods);
  const evaluationCounts = countBy(assignments, (record) => record.classification.evaluation);
  const resourceCounts = countBy(assignments, (record) => record.classification.resources);
  const clusterCounts = countBy(assignments, (record) => record.classification.topic_clusters);
  const uncertainty = assignments.filter((record) => record.classification.uncertainty.length).map((record) => ({
    paper_id: record.paper_id,
    title: record.title,
    venue_id: record.venue.venue_id,
    confidence: record.classification.confidence,
    uncertainty: record.classification.uncertainty,
  }));
  const inputByPaperId = new Map(input.map((record) => [record.paper_id, record]));
  const assignmentByPaperId = new Map(assignments.map((record) => [record.paper_id, record]));
  const missingEvidenceIds = EVIDENCE_PAPER_IDS.filter((paperId) => !inputByPaperId.has(paperId));
  if (missingEvidenceIds.length) throw new Error(`Evidence paper IDs not found: ${missingEvidenceIds.join(', ')}`);
  const evidenceIndex = {
    schema_version: 1,
    phase: 'FIELD_MAPPING',
    claim_type: 'direct_evidence',
    source: INPUT_PATH,
    source_locator: 'selected records / title and official_detail event description abstract',
    papers: EVIDENCE_PAPER_IDS.map((paperId, index) => {
      const sourceRecord = inputByPaperId.get(paperId);
      const assignment = assignmentByPaperId.get(paperId);
      const detail = sourceRecord.source_records.find((source) => source.source_type === 'official_detail');
      return {
        evidence_id: `E${String(index + 1).padStart(2, '0')}`,
        paper_id: paperId,
        title: sourceRecord.title,
        venue_id: sourceRecord.venue.venue_id,
        official_detail_url: detail.url,
        source_locator: `${detail.source_locator} / event description abstract`,
        mapped_primary_domain: assignment.classification.primary_domain,
        mapped_topic_clusters: assignment.classification.topic_clusters,
      };
    }),
  };
  const summary = {
    schema_version: 1,
    phase: 'FIELD_MAPPING',
    claim_type: 'direct_evidence',
    input: {
      path: INPUT_PATH,
      record_count: input.length,
      content_basis: 'official title and abstract fields only',
    },
    method: {
      claim_type: 'agent_inference',
      statement: 'Applied the versioned field-mapping taxonomy and deterministic rules in scripts/build_field_mapping.js. The three ASE records carrying the earlier UNCLASSIFIED_TITLE_AND_ABSTRACT sentinel received full manual reconciliation. Ambiguous first-pass records were reviewed against their complete official abstracts; one remains without a reliable problem-domain assignment. All assignments are agent inferences from the same official title-and-abstract evidence.',
      manual_reconciliation_paper_ids: Object.keys(MANUAL_OVERRIDES).sort(),
      reviewed_domain_override_paper_ids: Object.keys(REVIEWED_DOMAIN_OVERRIDES).sort(),
    },
    venue_record_counts: Object.fromEntries(VENUES.map((venue) => [venue, assignments.filter((record) => record.venue.venue_id === venue).length])),
    primary_domain_counts: primaryCounts,
    secondary_domain_counts: secondaryCounts,
    subtopic_counts: subtopicCounts,
    research_object_counts: objectCounts,
    method_mechanism_counts: mechanismCounts,
    evaluation_type_counts: evaluationCounts,
    resource_artifact_type_counts: resourceCounts,
    topic_cluster_counts: clusterCounts,
    intersections: {
      primary_to_secondary_domain: crossCount(assignments, (record) => [record.classification.primary_domain], (record) => record.classification.secondary_domains),
      method_to_primary_domain: crossCount(assignments, (record) => record.classification.methods, (record) => [record.classification.primary_domain]),
      resource_to_primary_domain: crossCount(assignments, (record) => record.classification.resources, (record) => [record.classification.primary_domain]),
      resource_to_topic_cluster: crossCount(assignments, (record) => record.classification.resources, (record) => record.classification.topic_clusters),
    },
    uncertainty: {
      record_count: uncertainty.length,
      primary_domain_uncertainty_count: assignments.filter((record) => record.classification.primary_domain === 'CROSS_CUTTING_OR_UNCERTAIN').length,
      low_confidence_count: assignments.filter((record) => record.classification.confidence === 'low').length,
      tied_primary_signal_count: assignments.filter((record) => record.classification.uncertainty.some((note) => note.includes('tied with'))).length,
      evaluation_not_stated_count: assignments.filter((record) => record.classification.evaluation.includes('NOT_STATED_CLEARLY_IN_ABSTRACT')).length,
      records: uncertainty,
    },
    classification_confidence_counts: Object.fromEntries(['high', 'medium', 'low'].map((confidence) => [confidence, assignments.filter((record) => record.classification.confidence === confidence).length])),
    generated_files: {
      assignments_path: ASSIGNMENTS_PATH,
      matrix_path: MATRIX_PATH,
      taxonomy_path: 'synthesis/field-mapping-taxonomy.yaml',
      evidence_index_path: EVIDENCE_PATH,
    },
  };
  fs.writeFileSync(ASSIGNMENTS_PATH, `${assignments.map((record) => JSON.stringify(record)).join('\n')}\n`);
  fs.writeFileSync(SUMMARY_PATH, `${JSON.stringify(summary, null, 2)}\n`);
  fs.writeFileSync(MATRIX_PATH, buildMatrixCsv(primaryCounts, clusterCounts, mechanismCounts, summary.venue_record_counts));
  fs.writeFileSync(EVIDENCE_PATH, `${JSON.stringify(evidenceIndex, null, 2)}\n`);
  console.log(JSON.stringify({ record_count: assignments.length, uncertainty_count: uncertainty.length, primary_domain_counts: primaryCounts, topic_cluster_counts: clusterCounts }, null, 2));
}

main();
