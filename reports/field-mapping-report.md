# Cross-Venue Field Map: ICSE 2026, FSE 2026, ISSTA 2026, and ASE 2025

## Scope and method

- `[direct_evidence]` The input contains 988 unique in-scope papers: ICSE 2026 = 321, FSE 2026 = 211, ISSTA 2026 = 210, and ASE 2025 = 246. Every record has an official title, official abstract, and official-detail locator. Source: `reports/cross-venue-corpus-audit-report.json / total, per_venue, phase_gate`.
- `[direct_evidence]` This phase used only `corpus/cross-venue-research-paper-index.jsonl / all records / title and abstract`; it did not fetch official pages again or read PDFs at scale. Source: `synthesis/field-mapping-summary.json / input, method`.
- `[agent_inference]` Each paper has one primary SE problem domain, zero or more secondary domains, and independent multi-label dimensions for research object, method/mechanism, evaluation, and resource/artifact contribution. Exact semantics and boundary rules are in `synthesis/field-mapping-taxonomy.yaml / classification_policy`.
- `[agent_inference]` Automatic rules supplied a consistent first pass; ambiguous records and the three prior ASE unclassified records were reviewed against their complete official abstracts. All paper assignments remain agent inferences, not author-provided subject labels.

## Primary-domain matrix

`[direct_evidence]` Counts and within-venue percentages below come from `synthesis/field-mapping-summary.json / primary_domain_counts` and `venue_record_counts`. Primary-domain rows are mutually exclusive; the uncertainty row is a state, not a twelfth theme.

| Primary domain | ICSE 2026 | FSE 2026 | ISSTA 2026 | ASE 2025 | Total |
|---|---:|---:|---:|---:|---:|
| Testing and quality assurance | 61 (19.0%) | 49 (23.2%) | 61 (29.0%) | 63 (25.6%) | 234 (23.7%) |
| Security, privacy, and safety | 50 (15.6%) | 31 (14.7%) | 37 (17.6%) | 42 (17.1%) | 160 (16.2%) |
| Debugging, localization, and repair | 38 (11.8%) | 33 (15.6%) | 32 (15.2%) | 32 (13.0%) | 135 (13.7%) |
| Code intelligence, generation, and transformation | 31 (9.7%) | 28 (13.3%) | 25 (11.9%) | 29 (11.8%) | 113 (11.4%) |
| Program analysis and formal methods | 33 (10.3%) | 21 (10.0%) | 19 (9.0%) | 24 (9.8%) | 97 (9.8%) |
| Maintenance, evolution, and quality | 27 (8.4%) | 12 (5.7%) | 11 (5.2%) | 14 (5.7%) | 64 (6.5%) |
| Build, release, operations, and performance | 24 (7.5%) | 14 (6.6%) | 7 (3.3%) | 17 (6.9%) | 62 (6.3%) |
| Human, social, organizational, and educational SE | 23 (7.2%) | 4 (1.9%) | 2 (1.0%) | 8 (3.3%) | 37 (3.7%) |
| Requirements, design, architecture, and specification | 14 (4.4%) | 7 (3.3%) | 6 (2.9%) | 8 (3.3%) | 35 (3.5%) |
| Engineering of ML/DL/LLM-enabled systems | 11 (3.4%) | 6 (2.8%) | 5 (2.4%) | 6 (2.4%) | 28 (2.8%) |
| Empirical methods, benchmarks, and reproducibility | 8 (2.5%) | 6 (2.8%) | 5 (2.4%) | 3 (1.2%) | 22 (2.2%) |
| Cross-cutting or uncertain | 1 (0.3%) | 0 | 0 | 0 | 1 (0.1%) |

## Venue differences

- `[agent_inference]` ICSE has the broadest human/organizational and lifecycle profile: human/social SE is 7.2%, maintenance/evolution 8.4%, and operations/performance 7.5%, each the highest share among the four venues. Supporting counts: matrix rows for those three primary domains.
- `[agent_inference]` ISSTA is the most test-centered: testing is 29.0%, agentic SE is 13.8%, and LLM-enabled testing is 13.3%; human/social SE (1.0%) and operations (3.3%) are least represented. Supporting counts: `field-mapping-summary.json / primary_domain_counts, topic_cluster_counts`.
- `[agent_inference]` FSE has the highest relative shares for code intelligence/generation (13.3%), fuzzing (12.3%), and GUI/web/mobile automation (4.7%), alongside 15.6% debugging/repair. Supporting counts: the same matrix rows.
- `[agent_inference]` ASE combines high testing (25.6%) and security (17.1%) with the highest LLM-debugging/repair share (8.5%) and LLM-reliability/evaluation share (7.7%). This is a venue-profile comparison, not a claim that ASE is temporally earlier or later than the 2026 venues.

## Concentration and diffusion signals

- `[direct_evidence]` Testing (234), security (160), and debugging/repair (135) account for 529 of 988 primary assignments (53.5%). Fuzzing (93), agentic SE (90), LLM-enabled testing (89), and LLM debugging/repair (72) are the largest overlapping mechanism/topic clusters. Source: `field-mapping-summary.json / primary_domain_counts, topic_cluster_counts`.
- `[agent_inference]` These are paper-concentrated and therefore potentially crowded areas. Concentration alone does not establish saturation, direct competition, or lack of research opportunity; those judgments require later deep reading and prior-art inspection.
- `[direct_evidence]` Agentic SE is 14/246 (5.7%) at ASE 2025 versus 76/742 (10.2%) across the three 2026 programs; LLM-enabled testing is 18/246 (7.3%) versus 71/742 (9.6%). The broader LLM mechanism is comparatively stable: 96/246 (39.0%) versus 303/742 (40.8%). Source: `cross-venue-topic-matrix.csv / AGENTIC_SOFTWARE_ENGINEERING, LLM_ENABLED_TEST_ENGINEERING, LLM_CODE_MODEL`.
- `[agent_inference]` Agentic orchestration is the clearest recent expansion signal in this corpus, and LLM testing shows diffusion particularly into FSE and ISSTA. Because the comparison uses one 2025 venue and three different 2026 venues, it is not a controlled longitudinal growth estimate.
- `[author_claim]` The official abstracts illustrate the spread from repository-level issue resolution (E03), formal proof agents (E04), requirement-to-code development (E05), and crash reproduction (E06). Source: `synthesis/field-mapping-evidence-index.json / papers / E03-E06`.

## Benchmarks, datasets, and artifacts

- `[direct_evidence]` Titles/abstracts explicitly state 50 new benchmark/test-suite contributions and 45 new dataset/corpus contributions. New benchmarks concentrate most in code intelligence/transformation (13), cross-cutting empirical infrastructure (10), and debugging/repair (7); new datasets concentrate in security (11), testing (7), and empirical infrastructure (7). Source: `field-mapping-summary.json / resource_artifact_type_counts, intersections.resource_to_primary_domain`.
- `[direct_evidence]` At cluster level, 10 new benchmarks intersect LLM reliability/evaluation; new datasets intersect agentic SE (8), LLM security (6), and LLM testing (6). Source: `field-mapping-summary.json / intersections.resource_to_topic_cluster`.
- `[author_claim]` Representative resource contributions include FreshBrew for Java migration agents (E41), FORGE for smart-contract vulnerability data (E42), AsyncLeakBench for asynchronous resource leaks (E43), SWR-Bench for code-review comment generation (E16), and Defects4C for C/C++ repair evaluation (E18).
- `[direct_evidence]` The abstracts also explicitly state 279 framework/platform, 239 method/algorithm, and 82 tool/prototype contributions. These tags record contribution language, not release or reproducibility. The official program metadata lists zero links explicitly labeled artifact, code, or data across all four venues. Source: `field-mapping-summary.json / resource_artifact_type_counts`; `reports/cross-venue-corpus-audit-report.json / links_and_follow_up.by_venue`.
- `[agent_inference]` Artifact availability and executability therefore remain unresolved and should be checked only for papers selected for deep reading.

## Shared mechanisms across different SE problems

- `[direct_evidence]` LLM/code-model mechanisms appear in 399 papers and span all 11 problem domains: testing 89, debugging/repair 72, code intelligence 63, security 57, maintenance 29, formal methods 29, operations 21, requirements 20, human/social 8, empirical infrastructure 7, and ML-enabled systems 4. Source: `field-mapping-summary.json / intersections.method_to_primary_domain.LLM_CODE_MODEL`.
- `[direct_evidence]` Agent mechanisms span debugging (21), testing (17), security (15), code intelligence (9), formal methods and operations (6 each), and five other domains. Static program analysis likewise spans formal methods (33), security (24), debugging (22), testing (22), and six other domains. Source: `intersections.method_to_primary_domain.LLM_AGENT_OR_MULTI_AGENT, STATIC_PROGRAM_ANALYSIS`.
- `[direct_evidence]` Symbolic/constraint solving appears in formal methods (22), security (7), testing (6), and debugging (2). Source: `intersections.method_to_primary_domain.SYMBOLIC_CONSTRAINT_SOLVING`.
- `[author_claim]` NLSAT solver improvement (E25), SMT-backed cloud access-control acceleration (E44), and differential symbolic testing of transpiled Rust (E45) use related formal machinery for solver engineering, security-policy analysis, and testing respectively.
- `[agent_inference]` Mechanism-level similarity is therefore not sufficient to treat papers as direct competitors; the problem definition, software unit, and evaluation contract must also match.

## Similar labels, different problems or evaluations

- `[author_claim]` “Formal/specification” covers NL-to-LTL translation (E23), proof-producing agents (E04), SMT solver performance (E25), cloud-policy analysis speed (E44), and transpilation testing (E45). Their outputs and evaluation evidence are not interchangeable.
- `[author_claim]` “GUI/mobile” covers real-world GUI agent testing (E30), UI-language migration (E31), obsolete-test repair (E32), adaptive GUI testing (E33), and screen-reader accessibility detection (E46).
- `[author_claim]` “LLM benchmark” covers migration agents (E41), code-review generation (E16), repair capability (E18), and test-suite metric validity (E17), each with a different unit of analysis and success criterion.
- `[author_claim]` “Vulnerability/LLM” covers detection reasoning (E12), prompt-injection risk evaluation (E13), agentic access-control taint analysis (E14), vulnerability dataset construction (E42), and intent-based repair (E47).
- `[agent_inference]` These boundaries should govern later representative-paper selection so that a surface keyword does not substitute for a matched research question and evaluation setting.

## Uncertainty and boundary audit

- `[direct_evidence]` Mapping confidence is high for 718 records, medium for 104, and low for 166; 84 retain a tied primary-signal note. Evaluation type is explicitly `NOT_STATED_CLEARLY_IN_ABSTRACT` for 252 records. Source: `field-mapping-summary.json / classification_confidence_counts, uncertainty`.
- `[agent_inference]` Confidence measures title/abstract sufficiency and rule agreement, not paper quality. Low-confidence mappings and absent evaluation descriptions are carried forward for selective checking rather than forcibly resolved.
- `[agent_inference]` The three prior ASE unclassified records are reconciled as follows: NLSAT -> program analysis/formal methods (E25); programmer visual attention -> human/social SE with code-intelligence secondary (E49); RELIA -> security with formal-methods and operations secondary (E44).
- `[agent_inference]` One paper remains `CROSS_CUTTING_OR_UNCERTAIN`: *Boosting Gas Revenues of Ethereum Miners* (E48), because its official abstract centers on blockchain miner-revenue optimization and does not reliably map to one SE problem domain.
- `[agent_inference]` The largest persistent boundary is objective versus mechanism: security testing, vulnerability repair, formalized requirements, ML-system testing, and human evaluation can each plausibly carry two domains. Primary/secondary labels preserve that distinction, while method and evaluation tags preserve the alternative view.

## Reusable outputs

- `[direct_evidence]` Taxonomy and boundaries: `synthesis/field-mapping-taxonomy.yaml`.
- `[direct_evidence]` One record per paper with evidence, dimensions, confidence, and uncertainty: `synthesis/field-mapping-paper-assignments.jsonl` (988 records).
- `[direct_evidence]` Machine-readable totals and intersections: `synthesis/field-mapping-summary.json`.
- `[direct_evidence]` Count/percentage matrix: `synthesis/cross-venue-topic-matrix.csv`.
- `[direct_evidence]` Representative paper evidence: `synthesis/field-mapping-evidence-index.json`.
- `[direct_evidence]` Deep-reading candidates without ideas or gap claims: `synthesis/deep-reading-topic-clusters.md`.
