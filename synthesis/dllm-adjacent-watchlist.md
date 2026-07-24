# Diffusion Language Model Adjacent Watchlist

## Scope and evidence standard

- `[agent_inference]` Diffusion language models (dLLMs) are tracked here as a cross-domain observation axis, not an eighth mechanism cluster and not an expansion of the four-venue SE corpus. Source: requested `DEEP_READING_BATCH_1` phase boundary.
- `[direct_evidence]` This watchlist contains nine works. Version identifiers, titles, dates, venue comments, and abstracts were checked against the arXiv API on 24 July 2026. Source: `https://export.arxiv.org/api/query?id_list=2310.17680,2402.07754,2502.09992,2503.09573,2504.12216,2505.22618,2506.20639,2508.02193,2508.15487`.
- `[agent_inference]` Except where noted, evidence below is abstract-level reconnaissance rather than full-paper deep reading. `existing experimental evidence` means the dLLM paper evaluates the relevant behavior in code or a named target domain; it does not mean it has been tested in a repository SE agent. `method-transfer candidate` means the mechanism could be instantiated and tested against a Batch 1 control question. `surface analogy` means only conceptual resemblance is currently supported.
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

## Watch status

- `[direct_evidence]` Watchlist size: nine papers, with all nine current arXiv versions and abstracts checked; two have a venue stated in the arXiv comment (DoT at NeurIPS 2024 and Block Diffusion at ICLR 2025 Oral). Source: arXiv API records accessed 24 July 2026.
- `[agent_inference]` Priority for later targeted full reading: DiffuCoder for code-native generation order and RL; Block Diffusion for commitment granularity; Dream 7B for infilling/state preservation; d1 for diffusion-native policy optimization; and CodeFusion as the historical whole-program code baseline. This is a reading priority, not a research direction or performance judgment.
- `[agent_inference]` No dLLM item is promoted into the seven SE mechanism clusters at this phase, and no superiority claim over AR generation is carried forward.
