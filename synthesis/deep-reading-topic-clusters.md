# Deep-Reading Topic-Cluster Candidates

## Evidence contract

- `[direct_evidence]` Cluster membership and counts are aggregations of the 988 title-and-official-abstract assignments in `field-mapping-paper-assignments.jsonl`; exact venue counts are in `field-mapping-summary.json / topic_cluster_counts` and `cross-venue-topic-matrix.csv / matrix=topic_cluster`.
- `[author_claim]` The representative-paper descriptions come from the authors' official abstracts. `field-mapping-evidence-index.json` resolves every `E##` identifier to a paper ID, official detail URL, and exact event-description locator.
- `[agent_inference]` “Worth deep reading” means that the cluster has substantial cross-paper variation, evaluation comparability questions, an unusual venue distribution, or concentrated resource contributions. It is not a research-gap or novelty claim.
- `[agent_inference]` Counts overlap because a paper may belong to several clusters. They must not be summed as unique-paper totals.

## Selected clusters

| Cluster | ICSE / FSE / ISSTA / ASE | Total | Why it is worth deep reading | Paper evidence |
|---|---:|---:|---|---|
| Agentic software engineering | 28 / 19 / 29 / 14 | 90 | `[agent_inference]` Agent orchestration now spans repository issue resolution, proof construction, testing, security, and human collaboration; the common “agent” label may hide incompatible autonomy and evaluation units. | E03-E06, E39 |
| LLM-enabled test engineering | 20 / 23 / 28 / 18 | 89 | `[agent_inference]` This is both large and test-diverse: unit tests, regression tests, oracles, mutation, GUI tests, and fuzzing use different notions of usefulness and correctness. | E02, E07-E09 |
| LLM debugging and repair | 21 / 14 / 16 / 21 | 72 | `[agent_inference]` Papers combine LLMs with dynamic analysis, slicing, test feedback, repository context, and causal reasoning, making patch correctness and diagnosis quality important comparison boundaries. | E06, E10-E11, E18 |
| LLM security assurance | 20 / 9 / 15 / 13 | 57 | `[agent_inference]` The cluster mixes vulnerability detection, security-rule generation, repair, exploit/attack analysis, and protection of LLM-enabled applications; these are distinct threat models despite a shared mechanism. | E12-E14, E42, E47 |
| LLM reliability and evaluation | 17 / 7 / 15 / 19 | 58 | `[agent_inference]` Benchmark validity, judge/reference choice, test adequacy, reasoning consistency, and real-task correctness recur, but their outcome variables are not interchangeable. | E15-E18 |
| Fuzzing and input exploration | 28 / 26 / 16 / 23 | 93 | `[agent_inference]` The highest-count mechanism cluster covers kernels, compilers, smart contracts, GUI programs, protocols, and cyber-physical systems; target semantics and feedback signals require separate comparison. | E19-E22 |
| Formal and specification-driven assurance | 19 / 15 / 13 / 10 | 57 | `[agent_inference]` The shared formal vocabulary covers NL-to-LTL, solver engineering, proof agents, verification-harness generation, and SMT-backed policy analysis; proof obligations and evaluation evidence differ sharply. | E04, E23-E25, E44-E45 |
| ML/DL-system reliability | 11 / 5 / 3 / 8 | 27 | `[agent_inference]` Model fixing, DNN verification, transfer testing, data leakage, notebook modernization, and model evolution cross model/code boundaries that title-level mapping cannot fully resolve. | E26-E29 |
| GUI, web, and mobile automation | 1 / 10 / 4 / 7 | 22 | `[agent_inference]` FSE is unusually prominent, while the cluster itself spans GUI testing, UI migration, accessibility, browser fuzzing, and agent security; visual and interaction evaluation settings need separation. | E30-E33, E46 |
| Supply-chain and dependency assurance | 21 / 7 / 12 / 14 | 54 | `[agent_inference]` Model supply chains, package vulnerabilities, dependency updates, library migration, and software composition analysis share ecosystem objects but not the same risk or maintenance objective. | E34-E37 |
| Human-AI developer work | 5 / 1 / 1 / 3 | 10 | `[agent_inference]` The smaller cluster has distinctive evidence types (interviews, behavioral traces, surveys, and in-the-wild collaboration) and is concentrated at ICSE; it should not be collapsed into tool-effectiveness studies. | E01, E38-E40 |

## Selection boundary

- `[agent_inference]` `EVOLUTION_MIGRATION_REFACTORING` (12 papers) remains visible in the matrix but is not a separate candidate because much of its evidence is already covered by agentic SE and supply-chain/dependency assurance.
- `[agent_inference]` `REPOSITORY_LEVEL_LLM_AGENTS` (6 papers) is retained as a narrow machine-readable subcluster, but the broader agentic cluster is the more reliable deep-reading entry point.
- `[agent_inference]` No candidate is labeled novel, underexplored, or a gap. Direct competitors and prior art have not yet been examined in this phase.
