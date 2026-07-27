# PF2 人类审查 dossier：Derived-state truth at the active repository revision

## 准确问题与代码 agent 场景

- [agent_inference] 准确问题是：对 code agent 将要消费的显式 plan、diagnosis、summary、localization、invariant 或 working hypothesis，哪些 claims 在当前 repository revision 与 executable environment 上为真、为假、无支撑或已过时。来源：directions/pressure-point-reframing.md / PF2 Problem definition。
- [agent_inference] 具体场景：agent 在 revision R 的 summary 中写“模块 A 不调用 B，失败由 C 引起”；随后它或工具修改了 dependency/configuration，agent 仍依据该 summary 选择 edit。PF2 只问各 explicit claim 在 R' 是否可由 source、analysis 或 execution 检查，不把“答案最后成功”当作 truth label。来源：directions/pressure-point-reframing.md / DERIVED_STATE_FIDELITY Code-only structure；PF2 Why this is not a direct mature-concept application。

## 它从哪里产生

- [direct_evidence] Watson 在相同答案的 307 个案例中发现 95 个 native 与 reconstructed traces 不同，说明看似合理的派生 state 不能自动视为 faithful。来源：synthesis/cross-paper-synthesis.md / Failure and recovery chain, Stage 2。
- [agent_inference] 跨论文综合指出 summaries、slices、reduced inputs、generated specifications、reconstructed reasoning 和 latent scores 可以改善 endpoint，同时遗漏或编造下一决策所需事实；现有 endpoint 结果通常没有验证 state 本身。来源：synthesis/cross-paper-synthesis.md / P3；Principal evidence weaknesses。
- [agent_inference] PF2 从 P3 的“derived state fidelity”中拆出 version-aligned truth，刻意与 PF3 的 action sufficiency 分离；一个 state 可完全真实但仍不足以支持后续动作。来源：directions/pressure-point-reframing.md / DERIVED_STATE_FIDELITY Disposition；Fundamental-question check。

## 最接近工作与剩余边界

| 工作 | 已覆盖什么 | 对 PF2 尚未给出的证据 | 来源 |
|---|---|---|---|
| Watson | [direct_evidence] 测量 reconstructed reasoning 与 native trace 的非唯一性。 | [agent_inference] 不把混合 agent state 的每个 program-grounded claim 在 active revision 上分类为真/假/无支撑/过时。 | synthesis/cross-paper-synthesis.md / Stage 2；P3 |
| ReduceFix | [direct_evidence] 保留 failure predicate 以缩减 repair context。 | [agent_inference] 一个 preserved predicate 不是对 plan/diagnosis/summary 中所有 claims 的 revision-aligned truth audit。 | directions/pressure-point-reframing.md / DERIVED_STATE_FIDELITY Already covered；PF2 Closest work |
| SpecGuru | [direct_evidence] 对 generated summaries 进行 differential checking。 | [agent_inference] summary check 不等于对多类 state claim、版本变化和实际消费时间的整体真值判断。 | synthesis/cross-paper-synthesis.md / P3；directions/pressure-point-reframing.md / PF2 Closest work |
| CausalRepair | [direct_evidence] 提供 program slices 作为 repair context。 | [agent_inference] 已提供的 slice 不独立证明 root-cause/diagnosis truth，也不覆盖 stale claims。 | synthesis/cross-paper-synthesis.md / Stage 2；Principal evidence weaknesses |
| Truth maintenance 与 belief update | [direct_evidence] 已覆盖 justification、retraction、alternative support、changed-world facts 和 time-indexed propositions。 | [agent_inference] 它们不是 PF2 的新机制；PF2 只有在 program-grounded revision checks 产生不同现象时才可保留。 | ideas/prior-art/IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY.yaml / direction_narrowing_targeted_verification；https://www.cse.buffalo.edu/~shapiro/Papers/br-overview.pdf；https://plato.stanford.edu/entries/logic-belief-revision/ |

## 相邻成熟概念与代码门槛

- [agent_inference] 相邻成熟概念包括 rationale faithfulness、factuality、truth maintenance、belief revision/update、provenance、causal representation 与 state estimation；它们已覆盖抽象的 truth、support、retraction 和 changed-world 问题。来源：directions/pressure-point-reframing.md / DERIVED_STATE_FIDELITY Mature generic coverage。
- [agent_inference] PF2 只在 claim 指向 symbol、dependency、path condition、failure、configuration、side effect 或 candidate diff 等可被特定 revision 的 source/analysis/execution 检查的对象时保留；自由文本计划或不可检查意图属于通用 factuality。来源：directions/pressure-point-reframing.md / PF2 Code environment non-substitutability。

## 第一轮已淘汰、不得重新包装的方向

- [direct_evidence] IDEA_CAUSAL_DIAGNOSIS_ACTION_GATE 被并入后续 finalist，因为 standalone rationale/action invariance 被 causal/actionable explanation、rationale perturbation 和 counterfactual credit 覆盖；它不能以“truthful diagnosis gate”复活。来源：ideas/prior-art/IDEA_CAUSAL_DIAGNOSIS_ACTION_GATE.yaml / decision。
- [direct_evidence] IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY 的 version-indexed memory、provenance、removal/corruption/restore 与 truth-maintenance framing 最终被定为 only_application_transfer。来源：ideas/prior-art/IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY.yaml / direction_narrowing_targeted_verification.disposition。
- [direct_evidence] 四阶段 E/S/A/V state substitution 的最终残余被复审判定为 controlled assistance benchmarking，而非 endogenous state truth 或 bottleneck 研究。来源：directions/independent-direction-reaudit-decision-package.md / Scientific contribution judgment；Contract, estimand, and intent judgment。

## 可形成的贡献形态，不是方法承诺

- [agent_inference] 最可防守的形态是经验发现：哪些类别的 explicit code-agent claims 会在 active revision 上变为 false、unsupported 或 stale，以及这些类别是否超出普通 context quality。来源：directions/pressure-point-reframing.md / PF2 Contribution fit。
- [agent_inference] 若先出现稳定、可检查的 failure pattern，可能形成 state-truth measurement method；直接提出训练、controller 或 rationale gate 会重复第一轮“方法先于现象”的失败。来源：reports/pressure-point-failure-retrospective.md / Common causes of failure 4；Anti-pattern 9。
- [agent_inference] inference-time checking 只能是后续可能形态，且必须证明其检查的 program truth 比现有 factuality/TMS baselines 增加解释或预测价值。来源：directions/pressure-point-reframing.md / PF2 Result that would make the problem unimportant。

## 最小反例与最强反方

- [agent_inference] 最小反例是：独立可检查的 state claims 通常真实且 revision-aligned，false/stale claims 在控制 context quality 后不预测后续错误，或现有 factuality/truth-maintenance 检查已经恢复同样区分。该结果应关闭 PF2。来源：directions/pressure-point-reframing.md / PF2 Result that would make the problem unimportant。
- [agent_inference] 最强反方观点：PF2 只是“把 facts 加上 Git timestamp”的 truth-maintenance 或 factuality 迁移；claim segmentation 和变化检测并不形成新的 SE object，endpoint 以外的检查只是工程 instrumentation。该反方成立，除非 revision-bound program claims 显示出通用 belief update 无法解释的、与 executable action 相关的 failure pattern。来源：reports/pressure-point-failure-retrospective.md / Common causes of failure 1 and 3；directions/pressure-point-reframing.md / PF2 Why this is not a direct mature-concept application。

## 最大风险

- [agent_inference] Novelty 风险：审稿人可将其归为 factuality、rationale faithfulness 或 TMS 的 repository application。来源：ideas/prior-art/IDEA_CAUSAL_DIAGNOSIS_ACTION_GATE.yaml / decision；ideas/prior-art/IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY.yaml / direction_narrowing_targeted_verification。
- [agent_inference] Evidence 风险：现有文献显示 state fidelity tension，但没有 PF2 所需的 direct frequency/effect evidence。来源：synthesis/cross-paper-synthesis.md / P3 Evidence needed；directions/pressure-point-reframing.md / Main evidence risks。
- [agent_inference] Label 风险：真实 diagnosis、plan 或 explanation 可能非唯一；同一 statement 的 truth 也可能依赖 action semantics、configuration 与未显式环境。来源：directions/pressure-point-reframing.md / Main evidence risks；ideas/prior-art/IDEA_CAUSAL_DIAGNOSIS_ACTION_GATE.yaml / decision.unverified_information。
- [agent_inference] Feasibility 风险：需要以足够细的 claim unit 对齐 state、revision、check 与实际使用点；过粗会把 state 质量混为文本风格，过细会使审计不可扩展。来源：synthesis/cross-paper-synthesis.md / P3 Evidence needed；PF2 missing-observation boundary。

## 需要人类作出的判断

1. 哪一类 explicit state 最值得作为对象：diagnosis、summary、plan、localization、invariant 还是 candidate-diff hypothesis？
2. “active revision truth”应以 source、static analysis、execution 还是多种证据的何种关系判定？
3. 对同一 bug 存在多个正确 explanation 时，PF2 是否仍有稳定 label，还是必须只保留可判定 claim 类型？
4. PF2 是独立问题，还是应作为 PF3 的 measurement prerequisite；两者共享 artifact 时如何保持 estimand 分离？
5. 哪个 factuality/TMS baseline 的成功会足以关闭 PF2？

## 证据边界

- [agent_inference] 当前材料支持“state truth at use time 是未充分测量的可能缺口”，但不支持其频率、效应量或不可替代性；若没有 program-semantic residual，PF2 必须关闭。来源：directions/pressure-point-reframing.md / Main evidence risks；Status and interpretation rule。
