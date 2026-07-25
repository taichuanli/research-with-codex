# Diffusion Language Model Adjacent Watchlist

## Scope and evidence standard

- `[agent_inference]` Diffusion language models (dLLMs) are tracked here as a cross-domain observation axis, not an eighth mechanism cluster and not an expansion of the four-venue SE corpus. Source: requested `DEEP_READING_BATCH_1` phase boundary.
- `[direct_evidence]` This watchlist contains nine works. Version identifiers, titles, dates, venue comments, and abstracts were checked against the arXiv API on 24 July 2026. Source: `https://export.arxiv.org/api/query?id_list=2310.17680,2402.07754,2502.09992,2503.09573,2504.12216,2505.22618,2506.20639,2508.02193,2508.15487`.
- `[direct_evidence]` During Batch 2, six works were read in full: CodeFusion, Block Diffusion, d1, Fast-dLLM, DiffuCoder, and Dream 7B. Diffusion of Thoughts, LLaDA, and Seed Diffusion remain abstract-level reconnaissance. Source: the checked manuscripts and targeted-reading ledger below.
- `[agent_inference]` `existing experimental evidence` means the dLLM paper evaluates the relevant behavior in code or a named target domain; it does not mean it has been tested in a repository SE agent. `method-transfer candidate` means the mechanism could be instantiated and tested against a 42-paper control question. `surface analogy` means only conceptual resemblance is currently supported.
- `[agent_inference]` No entry supports a general claim that dLLMs outperform autoregressive (AR) models. Reported comparisons differ in model size, training data, task, inference budget, and baseline construction. Source: the nine abstract records and the evidence gaps below.

## Overview

- `[direct_evidence]` The checked-version column is transcribed from the nine arXiv API records. `[agent_inference]` The primary-watch-role and relationship columns are this stage's routing judgments. Source: the API query in the evidence standard and the paper entries below.

| Work | Checked version | Primary watch role | Strongest relationship to the seven SE clusters |
|---|---|---|---|
| CodeFusion | `[direct_evidence]` arXiv:2310.17680v3 | `[agent_inference]` Earlier code-specific anchor | `[agent_inference]` `existing experimental evidence` for whole-program iterative denoising in code generation; no agent evidence |
| Diffusion of Thoughts | `[direct_evidence]` arXiv:2402.07754v3, NeurIPS 2024 | `[agent_inference]` Reasoning/self-correction | `[agent_inference]` `method-transfer candidate` for failure recovery and process supervision; experiments are math/logic, not SE |
| LLaDA | `[direct_evidence]` arXiv:2502.09992v3 | `[agent_inference]` From-scratch large dLLM | `[agent_inference]` `method-transfer candidate` for non-left-to-right state revision; code evaluation is aggregate capability evidence |
| Block Diffusion | `[direct_evidence]` arXiv:2503.09573v3, ICLR 2025 Oral | `[agent_inference]` Blockwise generation/control | `[agent_inference]` `method-transfer candidate` for action granularity, state blocks, and stopping |
| d1 | `[direct_evidence]` arXiv:2504.12216v2 | `[agent_inference]` Diffusion-native SFT/RL | `[agent_inference]` `method-transfer candidate` for policy optimization; evidence is math and planning |
| Fast-dLLM | `[direct_evidence]` arXiv:2505.22618v3 | `[agent_inference]` Confidence-aware parallel decoding | `[agent_inference]` `method-transfer candidate` for uncertainty-triggered action commitment; primary contribution is efficiency |
| DiffuCoder | `[direct_evidence]` arXiv:2506.20639v2 | `[agent_inference]` Code-native dLLM and RL | `[agent_inference]` `existing experimental evidence` for code generation order and diffusion-native RL |
| Seed Diffusion | `[direct_evidence]` arXiv:2508.02193v1 | `[agent_inference]` Code speed-quality frontier | `[agent_inference]` `existing experimental evidence` for code benchmarks, but mostly efficiency-adjacent |
| Dream 7B | `[direct_evidence]` arXiv:2508.15487v1 | `[agent_inference]` Arbitrary order, infilling, speed/quality control | `[agent_inference]` `existing experimental evidence` on coding tasks; agent/repair link remains untested |

## 1. CodeFusion

- `[direct_evidence]` Stable source: `https://arxiv.org/abs/2310.17680v3`.
- `[author_claim]` CodeFusion is a 75M-parameter diffusion model that conditions on natural language and iteratively denoises a complete program rather than committing left-to-right. On Bash, Python, and Excel conditional-formatting generation, the authors report top-1 accuracy comparable to much larger AR systems and better top-3/top-5 accuracy. Source: arXiv:2310.17680v3 abstract.
- `[agent_inference]` Intersection with `STATE_MEMORY_SPEC_CONSTRAINT_PRESERVATION`: the whole partially denoised program is an editable state rather than an append-only transcript. Relationship: `existing experimental evidence` for code generation, but only `method-transfer candidate` for preserving repository constraints. Supporting evidence: CodeFusion abstract; Batch 1 state-cluster synthesis.
- `[agent_inference]` Intersection with `FAILURE_LOOPS_RECOVERY`: revising earlier tokens resembles recovery from premature commitments. Relationship: `surface analogy`; the abstract does not identify failures, consume tests, or measure recovery trajectories. Supporting evidence: CodeFusion abstract; ADI and Understanding Agents cards.
- `[agent_inference]` Follow-up deep-read checks: whether every denoising step can revise every token; what conditions/length limits apply; whether gains survive matched parameter/training comparisons; whether partial programs remain syntactically executable; and whether external constraints can be injected between steps.
- `[agent_inference]` Watchlist note: retained as the earlier code-specific anchor despite its 2023 date; it is not counted as evidence about current large dLLMs or agents.

## 2. Diffusion of Thoughts

- `[direct_evidence]` Stable source: `https://arxiv.org/abs/2402.07754v3`; arXiv comment identifies NeurIPS 2024.
- `[author_claim]` Diffusion of Thoughts lets reasoning steps evolve through diffusion rather than fixed left-to-right CoT, trades additional computation for reasoning performance, and reports self-correction plus benefits from self-consistency on multiplication, Boolean logic, and grade-school math. Source: arXiv:2402.07754v3 abstract and venue comment.
- `[agent_inference]` Intersection with `FAILURE_LOOPS_RECOVERY`: revision during denoising could provide a recovery primitive. Relationship: `surface analogy`, because the evidence is not code, tool use, or an observed agent failure loop. Supporting evidence: DoT abstract; Batch 1 failure-cluster synthesis.
- `[agent_inference]` Intersection with `TRAINING_PROCESS_SUPERVISION_POLICY_OPTIMIZATION`: evolving multiple reasoning states could be compared with SEER's value-guided step search. Relationship: `method-transfer candidate`; no SE process-supervision result is reported. Supporting evidence: DoT abstract; SEER Sections 3 and 5.
- `[agent_inference]` Follow-up deep-read checks: what is actually revised at each step; whether apparent self-correction is measured per trajectory; compute-matched AR and self-refinement baselines; stop criteria; and whether intermediate state quality is observed independently of the final answer.

## 3. LLaDA

- `[direct_evidence]` Stable source: `https://arxiv.org/abs/2502.09992v3`.
- `[author_claim]` LLaDA is trained from scratch with forward masking and a reverse masked-token prediction process under pretraining and SFT; the authors report scaling and performance comparable to self-constructed AR baselines across general, math, and code tasks. Source: arXiv:2502.09992v3 abstract.
- `[agent_inference]` Intersection with `STATE_MEMORY_SPEC_CONSTRAINT_PRESERVATION`: bidirectional masked reconstruction may allow a structured artifact to be revised away from a fixed left-to-right frontier. Relationship: `method-transfer candidate`; aggregate code scores do not demonstrate constraint preservation. Supporting evidence: LLaDA abstract; MSG and StepFly cards.
- `[agent_inference]` Intersection with `OUTCOME_PROGRESS_UNCERTAINTY_SIGNALS`: mask confidence and denoising state could expose progress signals. Relationship: `surface analogy` until calibration and action-consumption evidence exists. Supporting evidence: LLaDA abstract; LAT/Clotho/AdaDec synthesis.
- `[agent_inference]` Follow-up deep-read checks: exact code benchmarks and matched AR construction; length and infilling behavior; token-selection schedule; whether confidence is calibrated across denoising steps; and whether partial outputs support executable validation.

## 4. Block Diffusion

- `[direct_evidence]` Stable source: `https://arxiv.org/abs/2503.09573v3`; arXiv comment identifies ICLR 2025 Oral.
- `[author_claim]` Block Diffusion generates autoregressively between blocks and diffusively within blocks, supports arbitrary-length output, and adds KV caching and parallel token sampling; the authors report state-of-the-art likelihood among diffusion language models. Source: arXiv:2503.09573v3 abstract and venue comment.
- `[agent_inference]` Intersection with `PLANNING_ACTION_TOOL_STOPPING`: block size creates an explicit action-commitment granularity between token-level AdaDec and whole-artifact revision. Relationship: `method-transfer candidate`; the paper's abstract does not evaluate agent actions or stopping. Supporting evidence: Block Diffusion abstract; Batch 1 planning and uncertainty clusters.
- `[agent_inference]` Intersection with `STATE_MEMORY_SPEC_CONSTRAINT_PRESERVATION`: completed blocks resemble committed state while the active block remains revisable. Relationship: `surface analogy` until cross-block constraint violations and repair are measured. Supporting evidence: Block Diffusion abstract; state-cluster synthesis.
- `[agent_inference]` Follow-up deep-read checks: block-boundary selection, reversibility of completed blocks, arbitrary-length stop policy, effect of block size on long-range code dependencies, and whether tests or analyzers can intervene between blocks.

## 5. d1

- `[direct_evidence]` Stable source: `https://arxiv.org/abs/2504.12216v2`.
- `[author_claim]` d1 combines masked SFT with diffu-GRPO, a critic-free policy-gradient algorithm for masked dLLMs, and reports improvements on mathematical and planning benchmarks. Source: arXiv:2504.12216v2 abstract.
- `[agent_inference]` Intersection with `TRAINING_PROCESS_SUPERVISION_POLICY_OPTIMIZATION`: diffu-GRPO is a diffusion-native alternative to ToolTrain's terminal nDCG RL and SEER's policy/value training. Relationship: `method-transfer candidate`; no code or SE-agent experiment is stated in the abstract. Supporting evidence: d1 abstract; Batch 1 training-cluster synthesis.
- `[agent_inference]` Intersection with `PLANNING_ACTION_TOOL_STOPPING`: coarse-to-fine policy updates may support non-left-to-right planning. Relationship: `surface analogy`, because the named planning benchmarks are not software-agent plans or tool trajectories. Supporting evidence: d1 abstract; planning-cluster synthesis.
- `[agent_inference]` Follow-up deep-read checks: reward definition and credit assignment across masks; whether intermediate states are supervised; comparison with AR GRPO under matched data/compute; stability; and applicability to tool calls or executable code rewards.

## 6. Fast-dLLM

- `[direct_evidence]` Stable source: `https://arxiv.org/abs/2505.22618v3`.
- `[author_claim]` Fast-dLLM introduces blockwise approximate KV caching and confidence-aware parallel decoding that commits only tokens above a threshold; on LLaDA and Dream benchmarks it reports up to 27.6x throughput with minimal accuracy loss. Source: arXiv:2505.22618v3 abstract.
- `[agent_inference]` Intersection with `OUTCOME_PROGRESS_UNCERTAINTY_SIGNALS`: confidence directly controls how many tokens are committed in parallel, a close structural analogue to AdaDec's entropy-triggered lookahead. Relationship: `method-transfer candidate`; the abstract emphasizes accuracy preservation and speed, not error prevention or code correctness. Supporting evidence: Fast-dLLM abstract; AdaDec Sections 3-4.
- `[agent_inference]` Intersection with `PLANNING_ACTION_TOOL_STOPPING`: adaptive parallel width is a possible action-granularity control. Relationship: `surface analogy` for SE agents, whose actions are heterogeneous and externally stateful rather than masked tokens. Supporting evidence: Fast-dLLM abstract; planning-cluster synthesis.
- `[agent_inference]` Follow-up deep-read checks: confidence calibration, threshold tuning leakage, which accuracy tasks include code, failures from conditional-independence violations, and whether slower selective commitment improves semantic rather than token-level correctness.

## 7. DiffuCoder

- `[direct_evidence]` Stable source: `https://arxiv.org/abs/2506.20639v2`.
- `[author_claim]` DiffuCoder is a 7B masked dLLM trained on 130B code tokens. The authors report that temperature changes both token choice and generation order and that complementary-mask coupled-GRPO improves EvalPlus by 4.4%. Source: arXiv:2506.20639v2 abstract.
- `[agent_inference]` Intersection with `TRAINING_PROCESS_SUPERVISION_POLICY_OPTIMIZATION`: coupled-GRPO is directly evaluated on code and offers diffusion-native rollout diversity. Relationship: `existing experimental evidence` for code generation, not for repository-agent policy learning. Supporting evidence: DiffuCoder abstract; Batch 1 training-cluster synthesis.
- `[agent_inference]` Intersection with `PLANNING_ACTION_TOOL_STOPPING`: learned generation order could be treated as an action-selection policy over code locations. Relationship: `existing experimental evidence` that order varies in code generation, but only `method-transfer candidate` for tool/action order. Supporting evidence: DiffuCoder abstract; planning-cluster synthesis.
- `[agent_inference]` Intersection with `OUTCOME_PROGRESS_UNCERTAINTY_SIGNALS`: the mask/order schedule may expose where the model is ready to commit. Relationship: `method-transfer candidate`; no calibrated progress signal is claimed in the abstract. Supporting evidence: DiffuCoder abstract; uncertainty-cluster synthesis.
- `[agent_inference]` Follow-up deep-read checks: exact EvalPlus absolute scores and AR controls; causal versus incidental generation-order effects; coupled-GRPO reward/variance evidence; infilling/repair benchmarks; and whether tests can revise already unmasked regions.

## 8. Seed Diffusion

- `[direct_evidence]` Stable source: `https://arxiv.org/abs/2508.02193v1`.
- `[author_claim]` Seed Diffusion Preview uses discrete-state parallel generation and reports 2,146 tokens/s on H20 GPUs while remaining competitive across standard code benchmarks and improving the reported speed-quality Pareto frontier. Source: arXiv:2508.02193v1 abstract.
- `[agent_inference]` Intersection with `PLANNING_ACTION_TOOL_STOPPING`: high-throughput generation could make broader candidate exploration affordable. Relationship: `surface analogy`; speed alone does not show better action choice, stopping, or recovery. Supporting evidence: Seed Diffusion abstract; Batch 1 planning-cluster synthesis.
- `[agent_inference]` Intersection with `OUTCOME_PROGRESS_UNCERTAINTY_SIGNALS`: a speed-quality control may interact with selective verification budgets. Relationship: `method-transfer candidate`; no uncertainty-calibrated controller is described in the abstract. Supporting evidence: Seed Diffusion abstract; uncertainty-cluster synthesis.
- `[agent_inference]` Follow-up deep-read checks: hardware/batch/sequence-length conditions behind 2,146 tokens/s; exact code tasks and quality deltas; matched AR and other diffusion baselines; generated-token accounting; and whether parallelism helps iterative test-and-repair latency.

## 9. Dream 7B

- `[direct_evidence]` Stable source: `https://arxiv.org/abs/2508.15487v1`.
- `[author_claim]` Dream 7B initializes from an AR model, applies context-adaptive token-level noise rescheduling, and reports arbitrary-order generation, infilling, tunable quality-speed trade-offs, and results on general, mathematical, and coding tasks. Source: arXiv:2508.15487v1 abstract.
- `[agent_inference]` Intersection with `DEBUGGING_ROOT_CAUSE_REPAIR_DECISIONS`: infilling and arbitrary-order revision are directly relevant to localized code editing. Relationship: `existing experimental evidence` for coding capability, but only `method-transfer candidate` for bug repair because the abstract does not name repair or tests. Supporting evidence: Dream 7B abstract; Batch 1 debugging-cluster synthesis.
- `[agent_inference]` Intersection with `STATE_MEMORY_SPEC_CONSTRAINT_PRESERVATION`: context-adaptive corruption/reconstruction may let unchanged regions act as constraints. Relationship: `method-transfer candidate`; preservation guarantees and long-repository state are not evidenced. Supporting evidence: Dream 7B abstract; state-cluster synthesis.
- `[agent_inference]` Intersection with `OUTCOME_PROGRESS_UNCERTAINTY_SIGNALS`: tunable denoising schedules may supply a commitment/progress control. Relationship: `surface analogy` pending calibration or downstream decision evidence. Supporting evidence: Dream 7B abstract; uncertainty-cluster synthesis.
- `[agent_inference]` Follow-up deep-read checks: coding benchmark details; AR-initialization contribution; infilling correctness under tests; edit preservation outside masks; schedule selection; and quality-speed comparisons under matched inference budgets.

## Cross-watchlist intersections

- `[agent_inference]` The strongest existing SE-adjacent evidence is code generation, not agents: CodeFusion, DiffuCoder, Seed Diffusion, Dream 7B, and LLaDA report code-task results, but none of the checked abstracts demonstrates repository navigation, tool use, test feedback, incident recovery, or formal proof control. Sources: the five arXiv abstracts.
- `[agent_inference]` Generation order is the most important mechanistic intersection. Whole-sequence denoising, blockwise commitment, arbitrary-order unmasking, and confidence-aware parallelism could be compared with Batch 1's token, reasoning-step, and tool-action controllers. Sources: CodeFusion, Block Diffusion, Fast-dLLM, DiffuCoder, and Dream 7B abstracts; AdaDec and SEER cards.
- `[agent_inference]` Iterative revision is promising but currently easy to overstate. A denoising trajectory is not automatically failure recovery unless an observable error or external feedback causes a targeted revision and the revision improves a validated outcome. Sources: DoT and CodeFusion abstracts; Batch 1 failure and feedback synthesis.
- `[agent_inference]` Diffusion-native RL is the clearest training intersection: d1 and DiffuCoder give methods worth comparing with terminal-reward ToolTrain and value-guided SEER, while MCTS-Refine warns that endpoint correctness alone does not validate intermediate reasoning. Sources: d1 and DiffuCoder abstracts; ToolTrain, SEER, and MCTS-Refine cards.
- `[agent_inference]` Constraint generation remains a transfer question, not evidence. Arbitrary-order or infilling capability does not establish preservation of tests, specifications, untouched code, build state, or user intent. Sources: LLaDA, Block Diffusion, and Dream 7B abstracts; Batch 1 state and formal-method findings.

## Batch 2 targeted full reading

### Reading set and axes

- `[direct_evidence]` The six full manuscripts are CodeFusion (EMNLP 2023 / arXiv:2310.17680v3), Block Diffusion (ICLR 2025 / arXiv:2503.09573v3), d1 (arXiv:2504.12216v2), Fast-dLLM (arXiv:2505.22618v3), DiffuCoder (arXiv:2506.20639v2), and Dream 7B (arXiv:2508.15487v1). Source: manuscript title/version pages; CodeFusion published version `https://aclanthology.org/2023.emnlp-main.716.pdf`.
- `[agent_inference]` These six were selected to cover generation order, iterative revision, confidence-controlled commitment, diffusion-native SFT/RL, and constrained/infilling generation. They are an adjacent reading axis, not additions to the 42-paper SE corpus. Source: requested Batch 2 dLLM axes.

### CodeFusion: whole-latent refinement is not feedback-driven repair

- `[direct_evidence]` CodeFusion conditions a continuous latent representation on English intent, denoises the entire fixed 128-token program for 1,200 steps, and invokes its decoder only after denoising; intermediate states are decoded only for analysis. Source: CodeFusion Sections 3.1-3.3 and 4.2.
- `[direct_evidence]` On Python/Bash/Excel-CF, its top-1 scores are 80.7/66.7/72.8 and top-5 scores 90.3/72.0/78.5; Python is measured by CodeBERTScore, Bash by template match, and only CF by execution match. Source: CodeFusion Table 1 and Section 4.4.
- `[direct_evidence]` Removing code-generation pretraining lowers the three top-1 scores to 70.9/52.3/64.2; removing code-specific denoising lowers them to 76.7/61.1/68.2. The model struggles with longer programs and long-range dependencies, and the paper states latency rises quadratically with target length. Source: CodeFusion Table 4 and Section 7.
- `[agent_inference]` Real intersection: a complete artifact remains globally editable before final decoding, which is evidence for non-left-to-right code construction. Non-intersection: no test, analyzer, failure label, or agent state enters between denoising steps, so the trajectory is not evidence of failure recovery or online state control. Supporting source: Sections 3 and 5.3.
- `[agent_inference]` The comparison does not establish dLLM superiority over AR code models: systems differ by size, pretraining, prompting/fine-tuning, and metric, and CodeFusion's Python metric is not functional correctness. Supporting source: Sections 4.2-4.4 and Table 1.

### Block Diffusion: explicit commitment granularity, but completed blocks are not revisable

- `[direct_evidence]` BD3-LM is autoregressive across blocks and diffusively denoises only the active block; clean prior blocks are cached and condition later blocks. It supports EOS-based variable length and parallel token sampling inside each block. Source: Block Diffusion Sections 3.1-3.2 and Algorithms 1-2.
- `[direct_evidence]` On OpenWebText, AR perplexity is 17.54 versus the best BD3-LM bound of 20.73; for 1,024-token generation, AR generative perplexity is 14.1 versus 25.7 for the best reported BD3-LM. BD3-LM improves over other diffusion systems, not over AR generally. Source: Tables 4 and 7.
- `[direct_evidence]` Smaller blocks improve perplexity but become more sequential; optimal masking schedules vary by block size, and training remains below but near twice ordinary diffusion cost after vectorization. Source: Sections 5-7 and Tables 3-8.
- `[agent_inference]` Real intersection: block size is a concrete commitment-granularity control and provides an explicit time at which validation could theoretically occur. Current evidence does not test such validation, and once a block is committed the method does not revise it; it therefore resembles bounded action batching more than agent recovery. Supporting source: Sections 3.2 and 7.
- `[agent_inference]` The paper contains no code, tool-use, state-estimation, constraint-preservation, or agent benchmark, so all SE-agent transfer remains a method-transfer candidate. Supporting source: Section 6 datasets and metrics.

### d1: diffusion-native policy optimization exists, but its probability signal is approximate

- `[direct_evidence]` d1 applies masked SFT to 1,000 curated reasoning traces, then diffu-GRPO. Because a masked dLLM lacks AR factorization, it uses a mean-field sequence probability and a one-forward-pass, fully masked-completion estimate; random prompt masking regularizes repeated policy updates. Source: d1 Sections 3.1-3.3 and Algorithm 1.
- `[direct_evidence]` On math/planning, diffu-GRPO improves all 12 reported base configurations and SFT+RL wins 11/12 over RL alone. On code, gains are mixed: base+RL changes HumanEval by +1.9/+3.7/-3.0 at lengths 128/256/512, while math-only s1k SFT initially lowers several code scores. Source: d1 Tables 1-3.
- `[direct_evidence]` Longer generation is not monotonically useful: Sudoku performance falls as sequence length grows across all variants, and higher prompt masking (0.5/0.7) destabilizes training. Fixed-length LLaDA generation is the paper's stated limitation. Source: d1 Sections 4.3-4.4, Figure 6, and Appendix A.
- `[agent_inference]` Real intersection: diffusion-native RL can optimize code or planning outcomes and random masking can improve sample efficiency. The transfer risk is central: the policy ratio and token credit depend on mean-field/one-step estimates rather than the actual multi-step denoising likelihood, analogous to endpoint-derived intermediate credit in SEAlign and SEER. Supporting source: Sections 3.1-3.2; 42-paper training-cluster synthesis.
- `[agent_inference]` Qualitative 'aha moments' do not establish that denoising itself caused self-correction; they appear after SFT on traces that already contain verification/backtracking, with no per-trajectory causal revision measure. Supporting source: Section 4.3 and Appendix E.

### Fast-dLLM: confidence controls token commitment, not task-level correctness

- `[direct_evidence]` Fast-dLLM commits masked tokens whose maximum softmax probability exceeds a threshold, reconsidering the rest; factor decoding selects the largest parallel set satisfying a confidence-derived bound. Prefix/DualCache reuse approximate attention states across block steps. Source: Fast-dLLM Section 3.2-3.3 and Algorithm 1.
- `[direct_evidence]` A theorem gives conditions under which high-confidence marginal greedy decoding equals sequential joint greedy decoding, but its premise is a marginal confidence bound rather than empirical calibration to semantic correctness. Source: Section 3.3, Theorem 1 and proof appendix.
- `[direct_evidence]` The default threshold is tuned to 0.9; combined caching/parallelism reaches up to 27.6x throughput on long few-shot generation, typically within 1-2 accuracy points of the backbone. Block size and threshold create accuracy-speed trade-offs, and large-batch diffusion still trails AR caching efficiency. Source: Sections 4.1-4.3, Tables 1-5, and Decoding Efficiency Analysis.
- `[agent_inference]` Real intersection: confidence directly controls how much state is committed at one step, a genuine adaptive granularity mechanism. It is not evidence for agent confidence control because tokens are homogeneous/reversible only while masked, whereas tool actions modify an external environment and confidence is not validated against task success. Supporting source: Section 3; 42-paper planning/uncertainty synthesis.

### DiffuCoder: generation order is measured, but its benefit is not causally isolated

- `[direct_evidence]` DiffuCoder adapts Qwen2.5-Coder with 65B Stage-1 and 65B repeated mid-training tokens after a 700B Stage-1 run degraded validation; it then uses 436K SFT examples and 21K test-verifiable RL tasks. Source: DiffuCoder Section 3 and Appendix B.1.
- `[direct_evidence]` The base model averages 52.6 versus Qwen2.5-Coder 52.2, but instruction tuning raises DiffuCoder by only 1.1 average point versus 9.1 for Qwen+SFT; several BigCodeBench cells decline. Coupled-GRPO raises the DiffuCoder average to 56.5, with mixed cells including a decline on BigCodeBench-Complete-Hard. Source: Tables 1-2.
- `[direct_evidence]` Local/global AR-ness measures show that code decoding selects later masked positions more often and with higher variance than math; higher temperature reduces AR-ness while increasing pass@k diversity. Training stage, data quality, temperature, and RL all alter order. Source: Sections 4.1-4.3 and Figures 3-6.
- `[direct_evidence]` Coupled-GRPO uses complementary mask pairs so every completion token is scored in a realistic partial context; it outperforms full-mask and de-coupled variants in reward stability, but rollout temperature is critical. Source: Section 5, Equation 4, Figure 7, and Table 2.
- `[agent_inference]` Real intersection: this is direct evidence that a code dLLM has a measurable, controllable generation-order distribution and diffusion-specific RL machinery. Missing evidence: no intervention holds tokens/content constant while changing order, so lower AR-ness is correlated with training/performance rather than shown to cause better code or agent action ordering. Supporting source: Sections 4-5.
- `[agent_inference]` Execution reward trains completed code, not intermediate state judgment; repository edits, tests between denoising steps, and tool actions remain unevaluated. Supporting source: Sections 3 and 5 reward design.

### Dream 7B: infilling and planning are real capabilities, not constraint-preservation proof

- `[direct_evidence]` Dream initializes from Qwen2.5-7B using a shifted prediction layout, switches to full attention, and trains on 580B text/math/code tokens. CART reweights masked-token loss from the amount and distance of visible context. Source: Dream Sections 4.1-4.3.
- `[direct_evidence]` Dream Base scores 57.9 HumanEval and 56.2 MBPP versus Qwen2.5 Base 56.7/63.6; Dream Instruct scores 55.5/58.8 versus Qwen2.5 Instruct 84.8/79.2. It strongly exceeds the listed similarly sized AR models on Countdown/Sudoku/Trip planning, but the 7B study does not isolate CART or diffusion from the extra adaptation data. Source: Dream Tables 1-2 and Sections 5.2-5.4.
- `[direct_evidence]` Timestep sweeps demonstrate a speed-quality curve on Countdown. Completion, fixed-suffix infilling, and configurable order are shown as demonstrations, not benchmarked preservation tests. Source: Sections 5.5.2-5.5.3 and project demos.
- `[agent_inference]` Real intersection: native infilling makes fixed left/right context available as a generation constraint, and timestep count is an explicit compute control. Missing evidence: no tests measure preservation outside the mask, constraint satisfaction in code repair, external feedback between steps, or calibrated stopping. Supporting source: Section 5.5.
- `[agent_inference]` The planning results do not justify a general dLLM advantage: Dream inherits an AR model, receives additional training, compares against differently trained baselines, and remains far behind Qwen's SFT+RL model on instruction/code tasks. Supporting source: Sections 4-5 and Tables 1-2.

### Cross-paper verdict on the five dLLM axes

- `[agent_inference]` Generation order has the strongest real mechanism evidence. DiffuCoder measures order changes by modality, temperature, and training; Block Diffusion and Fast-dLLM explicitly choose block/parallel commitment granularity. None shows that those token-order choices improve repository-agent action ordering. Sources: DiffuCoder Sections 4-5; Block Diffusion Section 3; Fast-dLLM Section 3.
- `[agent_inference]` Iterative revision is mostly overstated by surface analogy. CodeFusion revises a continuous whole-program latent, while common masked samplers reconsider uncommitted masks; Block Diffusion freezes completed blocks. No paper observes a test/tool failure and then targets a revision, which is the operative recovery mechanism in TraceCoder or EvidenT. Sources: the six method sections; TraceCoder and EvidenT cards.
- `[agent_inference]` Confidence control is real at token granularity but not calibrated agent state judgment. Fast-dLLM's theorem concerns marginal-vs-joint greedy decoding, and DiffuCoder documents an entropy sink; neither maps confidence to external correctness, action cost, or recoverability. Sources: Fast-dLLM Section 3.3; DiffuCoder Section 4.2.
- `[agent_inference]` Diffusion-native training has genuine evidence. d1 and DiffuCoder introduce workable GRPO variants and code/unit-test rewards, but both approximate multi-step likelihood and inherit the same endpoint-credit limitations found in the 42-paper training cluster. Sources: d1 Sections 3-4; DiffuCoder Section 5; complete synthesis training section.
- `[agent_inference]` Constrained generation remains the weakest transfer claim. Dream infilling and block/whole-sequence conditioning demonstrate controllable text/code construction, not preservation of tests, repository state, untouched code, specifications, or user intent. Sources: Dream Section 5.5.3; Block Diffusion Section 3; CodeFusion Section 3.
- `[agent_inference]` No general advantage over AR models is supported. CodeFusion and Dream use unmatched training/model conditions; Block Diffusion reports worse AR perplexity; d1 has mixed code gains; DiffuCoder's SFT gains trail its AR base; Fast-dLLM primarily improves diffusion efficiency. Sources: tables and limitations cited above.
- `[agent_inference]` The most defensible agent intersections for later comparison are narrow: adaptive commitment granularity, arbitrary-location code infilling, and diffusion-native outcome training. These are testable mechanism correspondences, not a method proposal or claim that dLLMs should replace AR agents. Sources: all six full readings and requested phase boundary.

## Watch status

- `[direct_evidence]` Watchlist size remains nine. Six are now full-read and three remain abstract-read; checked versions are unchanged. Source: overview table and Batch 2 targeted full reading section.
- `[agent_inference]` Targeted-reading status is complete for generation order, commitment granularity, confidence control, diffusion-native training, code denoising, and infilling. Agent-level transfer evidence remains absent, so no dLLM item is promoted into the seven SE mechanism clusters.
- `[agent_inference]` No superiority claim over AR generation is carried forward; the full papers add several explicit counterexamples to such a claim.
