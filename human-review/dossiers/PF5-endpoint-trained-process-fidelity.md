# PF5 人类审查 dossier：Endpoint-trained process fidelity across scaffold encodings

## 准确问题与代码 agent 场景

- [agent_inference] 准确问题是：对从 endpoint success/failure 派生的 process labels 或 policies，所学偏好究竟追踪可跨 scaffold 检查的 repository transition，还是只追踪 scaffold-specific transcript fields、tool/action serialization、policy occupancy 或 validator exposure。来源：directions/pressure-point-reframing.md / PF5 Problem definition。
- [agent_inference] 具体场景：两个 agent scaffolds 面对同一 issue，使用不同 thought/tool schema、命令序列和 context serialization，却产生同一可检查 diff、dependency state 和 behavioral outcome；一个 endpoint-trained model 在 scaffold A 学到的“critical action”在 scaffold B 上失效。PF5 问失败是否来自标签依附编码而非语义 transition。来源：directions/pressure-point-reframing.md / ENDPOINT_CREDIT_PROCESS_FIDELITY_TRANSFER Code-only structure；PF5 Code environment non-substitutability。

## 它从哪里产生

- [direct_evidence] SEAlign 的 critical-action training 在 OpenHands 上达到 17.7%，迁移至 AutoCodeRover 降至 5.7%，表明 process supervision 与 scaffold 的关联是可观察问题。来源：ideas/prior-art/IDEA_SCAFFOLD_INVARIANT_COUNTERFACTUAL_CREDIT.yaml / works.ICSE2026_SEALIGN；synthesis/cross-paper-synthesis.md / P9。
- [agent_inference] 跨论文综合同时发现 ToolTrain、SEER、MCTS-Refine、SWE-PDB 等多从 tests、gold patches 或 terminal success 导出 intermediate supervision；endpoint improvement 不自动证明 process fidelity 或 transfer。来源：synthesis/cross-paper-synthesis.md / Cross-paper contradictions 6；P9。
- [agent_inference] PF5 因此保留的是“label 指向什么外部语义对象”的经验机制问题，而不是另一种 counterfactual credit estimator、cross-scaffold sign filter 或训练算法。来源：directions/pressure-point-reframing.md / PF5 Why this is not a direct mature-concept application；PF5 Difference from eliminated frames。

## 最接近工作与剩余边界

| 工作 | 已覆盖什么 | 对 PF5 尚未给出的证据 | 来源 |
|---|---|---|---|
| SEAlign | [direct_evidence] 用 sibling critical pairs 做 process training，并报告 OpenHands 到 AutoCodeRover 的显著 transfer degradation。 | [agent_inference] 已显示 degradation，但不判断 labels 是否对应同一 executable repository transition 或只是 transcript/policy shift。 | ideas/prior-art/IDEA_SCAFFOLD_INVARIANT_COUNTERFACTUAL_CREDIT.yaml / works.ICSE2026_SEALIGN；https://arxiv.org/abs/2503.18455 |
| CVT-RL | [direct_evidence] 用 deletion、semantic、evidence、tool-output interventions 和 frozen continuation 做 policy-conditioned local credit，并有 validity gating/correction。 | [agent_inference] 不以 repository-transition equivalence 解释跨 scaffold 的 label fidelity。 | ideas/prior-art/IDEA_SCAFFOLD_INVARIANT_COUNTERFACTUAL_CREDIT.yaml / works.ARXIV_2606_05263；https://arxiv.org/abs/2606.05263v1 |
| C3 | [direct_evidence] 固定完整 history、恢复 checkpoint、采样 alternative actions 并计算 leave-one-out advantages，报告跨 benchmarks/models/topologies gains。 | [agent_inference] 其 exactness 依赖可见 deterministic text history，且明确排除 hidden external state；不回答 repository semantic anchor。 | ideas/prior-art/IDEA_SCAFFOLD_INVARIANT_COUNTERFACTUAL_CREDIT.yaml / works.ARXIV_2603_06859；https://arxiv.org/abs/2603.06859v2 |
| CRAFT | [direct_evidence] 从 sibling rollout advantages 估计 signed token importance，并报告多个 agentic environments 和模型规模上的 gains。 | [agent_inference] 已占据 generic sibling-rollout credit，不测试 scaffold encoding 是否脱离外部 transition。 | ideas/prior-art/IDEA_SCAFFOLD_INVARIANT_COUNTERFACTUAL_CREDIT.yaml / works.ARXIV_2606_29476；https://arxiv.org/abs/2606.29476v1 |
| CSO | [direct_evidence] 在 failed decision points 分支 expert alternatives，保留可验证 outcome flip 的 action pairs 用于训练。 | [agent_inference] verified flips 不等于 labels 在两种 code-agent serialization 下指向同一 semantic transition。 | ideas/prior-art/IDEA_SCAFFOLD_INVARIANT_COUNTERFACTUAL_CREDIT.yaml / works.ARXIV_2602_03412；https://arxiv.org/abs/2602.03412v2 |

## 相邻成熟概念与代码门槛

- [agent_inference] 相邻成熟概念包括 temporal/counterfactual credit assignment、process reward models、shortcut learning、reward hacking、imitation、invariant prediction、representation shift 与 domain adaptation；这些已覆盖 generic process supervision 与 transfer。来源：directions/pressure-point-reframing.md / ENDPOINT_CREDIT_PROCESS_FIDELITY_TRANSFER Mature generic coverage。
- [agent_inference] PF5 只有在不同 transcript/tool schemas 可映射到 externally inspectable repository transition（diff、command effect、dependency state、behavioral outcome），且这种语义锚点比 transcript normalization 更能解释 label/transfer failure 时才保留；否则它只是普通 representation shift。来源：directions/pressure-point-reframing.md / PF5 Code environment non-substitutability。

## 第一轮已淘汰、不得重新包装的方向

- [direct_evidence] IDEA_SCAFFOLD_INVARIANT_COUNTERFACTUAL_CREDIT 被 KILL：CVT-RL、C3、CRAFT、CSO 已覆盖 counterfactual local credit、frozen continuations、exact restoration、verified flips；cross-scaffold sign filtering 被判为显然的数据筛选规则。来源：ideas/prior-art/IDEA_SCAFFOLD_INVARIANT_COUNTERFACTUAL_CREDIT.yaml / decision。
- [direct_evidence] IDEA_CAUSAL_RECOVERABILITY_REPRESENTATION 被 KILL：TACT、Multi-Head Latent Control、Doomed from the Start、ASA 已覆盖 coding/tool agents 的 latent probe、action heads、activation steering 和 stop/rescue control；不能把 PF5 改为新的 hidden-state training/control proposal。来源：ideas/prior-art/IDEA_CAUSAL_RECOVERABILITY_REPRESENTATION.yaml / decision。
- [direct_evidence] 先前 finalist 的跨 scaffold E/S/A/V profile 被复审判定为不稳定 construct；不得以不同 scaffold field 的表面对齐来宣称 universal transfer。来源：directions/independent-direction-reaudit-decision-package.md / Contract, estimand, and intent judgment。

## 可形成的贡献形态，不是方法承诺

- [agent_inference] 最小可防守形态是经验机制：endpoint-derived labels 在何时与 executable transition 对齐、何时附着于 scaffold encoding，以及这是否解释 controlled transfer failure。来源：directions/pressure-point-reframing.md / PF5 Contribution fit。
- [agent_inference] 若存在超出普通 policy/representation shift 的稳定机制，可能形成 cross-domain mechanism 或 label-fidelity measurement boundary；训练贡献必须等到该机制独立建立后。来源：directions/pressure-point-reframing.md / PF5 Contribution fit；reports/pressure-point-failure-retrospective.md / Anti-pattern 9。
- [agent_inference] 任何“新 credit algorithm”“sign-stable data filter”或“直接训练优于 baseline”的形态均被第一轮 prior art 覆盖，不能作为 PF5 的预设输出。来源：ideas/prior-art/IDEA_SCAFFOLD_INVARIANT_COUNTERFACTUAL_CREDIT.yaml / decision。

## 最小反例与最强反方

- [agent_inference] 最小反例是：在 executable semantic normalization 后 process labels 稳定，controlled cross-scaffold transfer 与 same-scaffold performance 相当，或所有失配都由普通 policy occupancy、action-schema/representation shift、数据量和 endpoint-oracle artifacts 解释。该结果应关闭 PF5。来源：directions/pressure-point-reframing.md / PF5 Result that would make the problem unimportant。
- [agent_inference] 最强反方观点：PF5 只是 domain adaptation/credit assignment 的代码实例；“等价 transition”并非天然对象，不同 command paths、intermediate states 和 tool effects 可能都具有真实语义，所以 normalization 本身会制造假等价。加上 CVT-RL/C3/CRAFT/CSO 已占据 credit machinery，严格审稿人会把任何 positive result 视为 data selection 或 representation ablation。来源：ideas/prior-art/IDEA_SCAFFOLD_INVARIANT_COUNTERFACTUAL_CREDIT.yaml / decision.reviewer_rejection；reports/independent-direction-reaudit-report.md / Are E/S/A/V natural and cross-scaffold research objects?

## 最大风险

- [agent_inference] Novelty 风险：最近的直接 work 已密集覆盖 local credit、exact restoration、verified flips 和 training；PF5 只能靠不同的 empirical mechanism，而不能靠重组这些组件。来源：ideas/prior-art/IDEA_SCAFFOLD_INVARIANT_COUNTERFACTUAL_CREDIT.yaml / decision。
- [agent_inference] Evidence 风险：目前只有 SEAlign 的 transfer degradation 等信号，尚无证据把 failure 分解为 label error、policy occupancy、schema mismatch 或 endpoint artifact。来源：directions/pressure-point-reframing.md / ENDPOINT_CREDIT_PROCESS_FIDELITY_TRANSFER Missing observation or mechanism evidence。
- [agent_inference] Label 风险：external transition equivalence、process label、endpoint success 与 alternative valid endpoints 都可能多对多；对齐规则本身可能泄漏 gold information 或选择透明 tasks。来源：directions/pressure-point-reframing.md / Main evidence risks；reports/independent-direction-reaudit-report.md / Selection bias from simultaneous four-contract eligibility。
- [agent_inference] Feasibility 风险：需要共享 task/repository、可比 model/data、两种独立 scaffolds、semantic transition audit 和足够跨配置样本；这比单一 scaffold endpoint training 显著昂贵。来源：reports/independent-direction-audit-report.md / Reproducibility and transfer；ideas/prior-art/IDEA_SCAFFOLD_INVARIANT_COUNTERFACTUAL_CREDIT.yaml / requirements。

## 需要人类作出的判断

1. 什么构成“同一 executable repository transition”：相同 diff、相同 command effects、相同 behavioral outcome，还是它们的受限组合？
2. 人类是否认为 transition equivalence 的不可判定性足以关闭 PF5，还是可接受只研究窄任务类别？
3. SEAlign 式 transfer degradation 最可能来自 labels、scaffold policy、action schema、data shift 还是 endpoint oracle；哪一种解释值得优先排除？
4. PF5 是否应在没有任何训练计划的情况下先以 descriptive mechanism 问题保留，还是训练语境本身使它不可避免地落入已覆盖的 credit literature？
5. 哪一个 cross-field baseline 的成功会足以认定这只是 ordinary representation shift？

## 证据边界

- [agent_inference] 当前材料支持 endpoint-derived process supervision 可能 scaffold-dependent，但不足以支持 repository-transition fidelity 是主因、可稳定测量或比成熟 counterfactual credit 更有科学贡献。来源：synthesis/cross-paper-synthesis.md / P9；directions/pressure-point-reframing.md / Main evidence risks。
