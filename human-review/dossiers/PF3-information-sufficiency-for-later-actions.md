# PF3 人类审查 dossier：Information sufficiency for later executable actions

## 准确问题与代码 agent 场景

- [agent_inference] 准确问题是：agent 创建的 intermediate state 是否保留了在后续可执行 action 之间选择所需的 program facts 和 relations；即使 state 中每条 retained statement 都真实，它仍可能遗漏必要 dependency、constraint、counterexample 或 negative finding。来源：directions/pressure-point-reframing.md / PF3 Problem definition。
- [agent_inference] 具体场景：agent 的 diagnosis summary 真实地指出 parser 在输入格式 X 上失败，却省略该 parser 与 downstream compatibility check、configuration flag 和 negative experiment 的关系；据此生成的 edit 可编译并针对局部错误“合理”，但在执行后违反另一个必需前置条件。PF3 的对象是遗漏 relation 对后续 repository transition 的后果，而非 summary 文本是否流畅。来源：directions/pressure-point-reframing.md / PF3 Code environment non-substitutability。

## 它从哪里产生

- [direct_evidence] ExpeRepair 的 retrieval 在 top-3 达峰且更多 memories 会退化；AttnCompress 的 53.17% average 低于其未压缩 artifact 的 55.17%；EvidenT 则从显式 current/historical/negative evidence 中获益。来源：synthesis/cross-paper-synthesis.md / Cross-paper contradictions 4。
- [agent_inference] 这些相反结果说明 retention/compression 的 endpoint 并不能判明“保留的 state 是否足以支持以后 action”；更多 context、较短 context 与正确 action 都不是同一对象。来源：synthesis/cross-paper-synthesis.md / P3；P4；Principal evidence weaknesses。
- [direct_evidence] Plans Don't Persist 在固定 actions/observations 的 replay 中移除 plan，观测 hidden-state divergence，并报告重新呈现 stale plan 不会恢复工作状态。来源：ideas/prior-art/IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY.yaml / works.ARXIV_2606_22953。
- [agent_inference] PF3 因而从 P3 中单独提出“true but insufficient”的 possibility，不再主张 memory policy、per-item utility 或 rationale gate。来源：directions/pressure-point-reframing.md / DERIVED_STATE_FIDELITY Disposition；PF3 Difference from eliminated frames。

## 最接近工作与剩余边界

| 工作 | 已覆盖什么 | 对 PF3 尚未给出的证据 | 来源 |
|---|---|---|---|
| Plans Don't Persist | [direct_evidence] 用 replay pairing 检查 plan removal、hidden-state divergence 与 stale-plan resurfacing。 | [agent_inference] 其主要结论是 representational/context-management；没有以 executable later action 与 hidden behavioral correctness 定义 program-relation sufficiency。 | ideas/prior-art/IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY.yaml / works.ARXIV_2606_22953；https://arxiv.org/abs/2606.22953v1 |
| ContextCite | [direct_evidence] 用 random subset ablations、sparse surrogate、top-k deletion 和 LDS 做 context attribution、pruning 与 poison detection。 | [agent_inference] target 是 response probability/QA quality，不是 revision-bound state 对后续 repository action 前置条件的充分性。 | ideas/prior-art/IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY.yaml / closest_cross_field_works.ARXIV2024_CONTEXTCITE；https://arxiv.org/abs/2409.00729v2 |
| ERASER | [direct_evidence] 定义 rationale deletion 的 comprehensiveness 与 retain-only 的 sufficiency。 | [agent_inference] 其 endpoint 是 NLP prediction/rationale agreement，不是 action-dependent program semantics。 | ideas/prior-art/IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY.yaml / closest_cross_field_works.ACL2020_ERASER；https://doi.org/10.18653/v1/2020.acl-main.408 |
| ReduceFix | [direct_evidence] 保留 failure predicate 来缩减 repair context。 | [agent_inference] 保留一个 predicate 未证明 self-generated state 保留了所有 later action relations，也未分离 omission、length 与 style。 | synthesis/cross-paper-synthesis.md / P3；directions/pressure-point-reframing.md / PF3 Closest work |
| AttnCompress | [direct_evidence] 动态调整 memory attention 并比较 compression quality。 | [agent_inference] endpoint-quality comparison 不证明哪些 omitted program relations 对具体 future action 必要。 | synthesis/cross-paper-synthesis.md / Cross-paper contradictions 4；ideas/IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY.yaml / closest_existing_work |

## 相邻成熟概念与代码门槛

- [agent_inference] 相邻成熟概念包括 belief-state sufficiency、sufficient statistics、information bottleneck、necessity/sufficiency、removal attribution、context/data attribution 与 truth maintenance；它们已经定义 abstract state compression 或 source influence。来源：directions/pressure-point-reframing.md / PF3 Why this is not a direct mature-concept application；ideas/prior-art/IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY.yaml / cross_field_attack.maturity。
- [agent_inference] PF3 只在 later code action 有可检查 preconditions/effects，而缺失 relation 能在 known revision 上由 failed transition 或 behavioral counterexample 暴露时保持代码特异性；若只以模型 response probability 判定 sufficiency，必须关闭为 context attribution。来源：directions/pressure-point-reframing.md / PF3 Code environment non-substitutability。

## 第一轮已淘汰、不得重新包装的方向

- [direct_evidence] IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY 已被判定为 ContextCite、necessity/sufficiency、belief update、truth maintenance、memory poisoning 和 provenance lineage 的应用组合；不得以“按 item 删除/腐蚀/恢复”或 cold store 复活。来源：ideas/prior-art/IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY.yaml / direction_narrowing_targeted_verification.disposition。
- [direct_evidence] IDEA_CAUSAL_DIAGNOSIS_ACTION_GATE 的 paraphrase/substitution/action-mediation framing 被并入后续已失败的 finalist；不得把 PF3 改写为 rationale invariance gate。来源：ideas/prior-art/IDEA_CAUSAL_DIAGNOSIS_ACTION_GATE.yaml / decision；directions/independent-direction-reaudit-decision-package.md / Scientific contribution judgment。
- [direct_evidence] IDEA_DECISION_VALUE_EVIDENCE_ROUTING 已被判为 VOI/active sensing 的直接迁移；PF3 不应改成决定“还需要请求哪条 observation”。来源：ideas/prior-art/IDEA_DECISION_VALUE_EVIDENCE_ROUTING.yaml / cross_field_attack.decision。

## 可形成的贡献形态，不是方法承诺

- [agent_inference] 首选形态是经验发现：在哪些 repository transitions 中，truth-aligned state 仍因遗漏特定 program relation 而导致错误 action，且该现象超出 token length、wording 与普通 attribution 分数。来源：directions/pressure-point-reframing.md / PF3 Contribution fit。
- [agent_inference] 若该现象重复出现，可能形成 action-dependent state-sufficiency measurement 或跨域机制比较；这不是预先承诺一个 memory controller、context compressor 或 training objective。来源：directions/pressure-point-reframing.md / PF3 Contribution fit；reports/pressure-point-failure-retrospective.md / Anti-pattern 9。
- [agent_inference] inference-time 或 training 贡献只能在已证明 omitted relation 的独立效果后讨论；否则会重犯“先建控制器、后找现象”的失败。来源：reports/pressure-point-failure-retrospective.md / Retrospective conclusion。

## 最小反例与最强反方

- [agent_inference] 最小反例是：在实际压缩水平下 truth-aligned state 已保留所有 action-relevant information，ContextCite 类 attribution 能识别每个 consequential omission，或省略 program relations 在控制预算和 wording 后不改变 action。该结果应关闭 PF3。来源：directions/pressure-point-reframing.md / PF3 Result that would make the problem unimportant。
- [agent_inference] 最强反方观点：PF3 是信息瓶颈/充分统计/ERASER/ContextCite 的又一个代码 benchmark；“later executable action”只改变 outcome measure，版本化 repo 并没有产生新的 sufficiency definition。该反方成立，除非同样的 context-attribution score 在程序前置条件或 transition 关系上系统性失效，而非仅仅少了 token 或模型改变措辞。来源：ideas/prior-art/IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY.yaml / cross_field_attack.transfer_assessment；directions/pressure-point-reframing.md / PF3 Why this is not a direct mature-concept application。

## 最大风险

- [agent_inference] Novelty 风险：被归为 ContextCite + ERASER + versioned code；成熟 removal/necessity 机制已经覆盖。来源：ideas/prior-art/IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY.yaml / cross_field_attack.decision；direction_narrowing_targeted_verification.disposition。
- [agent_inference] Evidence 风险：已有文献显示 compression/retention tension，却没有 direct frequency/effect evidence 证明 omitted relation 是原因而非 correlated context quality。来源：synthesis/cross-paper-synthesis.md / Principal evidence weaknesses；directions/pressure-point-reframing.md / Main evidence risks。
- [agent_inference] Label 风险：充分性是 action、policy、budget 和可选正确 actions 依赖的，multiple weak facts 还可能产生 interaction；没有唯一 minimal sufficient state。来源：ideas/prior-art/IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY.yaml / decision.unverified_information；directions/pressure-point-reframing.md / Main evidence risks。
- [agent_inference] Feasibility 风险：需要将 state、revision、later action、counterfactual valid alternative 与 hidden behavior 对齐；重放和 intent adjudication 都可能将结果留在 inconclusive。来源：synthesis/cross-paper-synthesis.md / P3 Evidence needed；P7 Evidence needed。

## 需要人类作出的判断

1. PF3 的“later action”应限定为 edit、test choice、tool call、rollback 还是某一类 repository transition？
2. 哪一种遗漏 relation 最可能构成非替代性的 program-semantic object：dependency、invariant、negative finding、configuration 或 behavioral counterexample？
3. 是否接受 policy/budget-dependent sufficiency，还是只研究可定义的 restricted action class？
4. ContextCite/ERASER 达到何种预测能力时应关闭 PF3，而不是继续加代码专用特征？
5. PF2 与 PF3 是否共享数据但保持两个独立的 human decisions，还是有一个更清晰的拆分方式？

## 证据边界

- [agent_inference] 当前记录支持 PF3 是对“true but insufficient state”的可证伪问题，不支持它在真实 code agents 中常见、能超出 context attribution 或足以支持后续方法。来源：directions/pressure-point-reframing.md / PF3；Main evidence risks。
