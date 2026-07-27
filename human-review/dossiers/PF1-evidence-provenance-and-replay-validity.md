# PF1 人类审查 dossier：Evidence provenance and replay validity

## 准确问题与代码 agent 场景

- [agent_inference] 准确问题是：对于 code agent 实际消费的一条 evidence，能否从记录的 provenance 在该 evidence 影响决策时的精确 repository revision、dirty diff、依赖/进程环境、命令或工具版本中重新生成，并确认其指向的行为或程序实体与 agent 据此理解的对象相同。来源：directions/pressure-point-reframing.md / PF1 Problem definition。
- [agent_inference] 具体场景：agent 在 revision R 运行一个失败测试并据 stack trace 修改函数 F；在下一次编辑前，工作树、依赖锁文件或测试选择已变化，或 trace 实际来自另一条路径。问题不是“测试是否失败”，而是 agent 消费的“F 在 R 上导致此行为”的 observation 是否仍可重演且语义对齐。来源：directions/pressure-point-reframing.md / REPRODUCIBLE_EVIDENCE_BEFORE_STATE Code-only structure。

## 它从哪里产生

- [direct_evidence] 跨论文综合记录了 evidence acquisition 在推理前即可失败：APR Traceability 的生成 reproducers 只触发 41–57% 的 bugs，IssueExec 报告即使完整 suites 仍有 33.30% ground-truth functions 未覆盖，EvidenT 报告 unusable 或 inconsistent evidence。来源：synthesis/cross-paper-synthesis.md / Failure and recovery chain, Stage 1。
- [agent_inference] 这与“更多反馈总更好”相矛盾：限定的 runtime state 或迭代可改善结果，但 To Run 中 execution 对 29 个配对案例有帮助、对 24 个有害，且 unrestricted access 没有显著总体收益；因此应先问被消费的 observation 是否有效，而不是先设计选择器。来源：synthesis/cross-paper-synthesis.md / Cross-paper contradictions 1；P2。
- [agent_inference] P2 的未解点是区分“没有获得可重放/可覆盖 evidence”与“有有效 evidence 但定位或后续动作错误”；PF1 仅保留前者及其 provenance/use-time 语义，不保留 evidence routing。来源：synthesis/cross-paper-synthesis.md / P2；directions/pressure-point-reframing.md / REPRODUCIBLE_EVIDENCE_BEFORE_STATE Disposition。

## 最接近工作与剩余边界

| 工作 | 已覆盖什么 | 对 PF1 尚未给出的证据 | 来源 |
|---|---|---|---|
| APR Traceability | [direct_evidence] 量化 reproducers 无法触发目标 bug 的比例。 | [agent_inference] 没有建立 agent 已消费 observation 在 active revision 上的 provenance-complete re-execution 审计。 | synthesis/cross-paper-synthesis.md / Stage 1；P2 |
| EvidenT | [direct_evidence] 报告 unusable/inconsistent evidence，并在迭代包修复中保留显式 evidence。 | [agent_inference] 不区分 later failure 是 invalid/stale/mis-scoped evidence 还是 valid evidence 的误用。 | synthesis/cross-paper-synthesis.md / Stage 1；directions/pressure-point-reframing.md / PF1 Closest work |
| AgentCheck | [direct_evidence] 记录并扰动 tool responses，以检验 failure 在 agent 行为中的可见性。 | [agent_inference] tool-response fault sensitivity 不是 source-tree/revision/referent 对齐的 use-time validity。 | directions/pressure-point-reframing.md / REPRODUCIBLE_EVIDENCE_BEFORE_STATE Already covered；https://arxiv.org/abs/2607.11098 |
| Datura | [direct_evidence] 研究 tool outputs 和 metadata 的操控。 | [agent_inference] 操控鲁棒性不等于证明一条未操控 evidence 在消费时可再生且指向正确代码实体。 | directions/pressure-point-reframing.md / REPRODUCIBLE_EVIDENCE_BEFORE_STATE Already covered |
| Auditing Provenance Sensitivity | [direct_evidence] 在固定 proposition 和 policy 时改变 source authority。 | [agent_inference] source-authority sensitivity 不足以检查 execution result 与具体 repository transition 的对应关系。 | reports/independent-direction-reaudit-report.md / Coverage by nearby causal probing, assistance, intervention, and robustness work；https://arxiv.org/abs/2607.20827 |

## 相邻成熟概念与代码门槛

- [agent_inference] 邻近成熟概念包括 data provenance、measurement error/noisy observations、fault injection/robustness、active sensing 及 decision-theoretic value of information；它们已覆盖 lineage、可靠性、成本和 acquisition 的抽象对象。来源：directions/pressure-point-reframing.md / REPRODUCIBLE_EVIDENCE_BEFORE_STATE Mature generic coverage。
- [agent_inference] PF1 只有在“recorded command/test/analyzer 于 exact source tree 与 environment 上重新执行，并把结果映射到 agent 引用的 symbol/behavior”改变问题时才是代码问题；若 source authority 或普通 lineage 足以解释，必须关闭为应用迁移。来源：directions/pressure-point-reframing.md / PF1 Why this is not a direct mature-concept application；Code environment non-substitutability。

## 第一轮已淘汰、不得重新包装的方向

- [direct_evidence] IDEA_DECISION_VALUE_EVIDENCE_ROUTING 被跨领域攻击为 decision-theoretic VOI/active sensing 的直接迁移；paired replay 只是估计或评估设计，不是新问题。来源：ideas/prior-art/IDEA_DECISION_VALUE_EVIDENCE_ROUTING.yaml / cross_field_attack.decision。
- [direct_evidence] FINALIST_STAGEWISE_CAUSAL_RESCUE_PROFILES 经复审后被退回，因为 E/S/A/V oracle 替换只测到 total external assistance，且缩窄后不超过 component benchmarking。来源：directions/independent-direction-reaudit-decision-package.md / Mandatory pass-gate audit。
- [direct_evidence] IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY 被杀死为 provenance、truth maintenance、removal attribution、memory corruption 和 action gating 的应用组合。来源：ideas/prior-art/IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY.yaml / direction_narrowing_targeted_verification.disposition。

## 可形成的贡献形态，不是方法承诺

- [agent_inference] 最小且可防守的形态是经验发现：invalid、stale、mis-scoped 或 provenance-incomplete evidence 被实际消费的频率、条件和与后续错误的关联。来源：directions/pressure-point-reframing.md / PF1 Contribution fit。
- [agent_inference] 只有在该现象独立成立后，才可能形成 replay-validity/provenance measurement boundary；任何 inference-time validity check 都必须作为该 boundary 的后续可能性，而不是先验方法贡献。来源：reports/pressure-point-failure-retrospective.md / Anti-pattern 9；directions/pressure-point-reframing.md / PF1 Contribution fit。
- [agent_inference] 本问题不自然地产生训练贡献；若训练标签仍来自未审计 endpoint 或 tool output，PF1 的前提尚未满足。来源：synthesis/cross-paper-synthesis.md / Shared hidden assumptions 1 and 5。

## 最小反例与最强反方

- [agent_inference] 最小反例是：provenance-complete re-execution 显示 invalid/stale/mis-scoped consumed evidence 很少见，控制 state quality 后它们与错误动作无关，且普通 tool-fault/provenance 模型解释剩余案例。该结果应关闭 PF1，而不是改名为 router。来源：directions/pressure-point-reframing.md / PF1 Result that would make the problem unimportant。
- [agent_inference] 最强反方观点：PF1 只是已有 provenance 与 noisy-observation robustness 的软件实例；repository hash、command log 和重跑是工程 hygiene，不会构成科学现象，任何 observed error 都可归因于 tool flakiness 或 agent misuse。该反方成立，除非 use-time program-reference validity 比普通 lineage 或 fault injection 提供额外、可证伪的解释。来源：reports/pressure-point-failure-retrospective.md / Common causes of failure 3；directions/pressure-point-reframing.md / PF1 Why this is not a direct mature-concept application。

## 最大风险

- [agent_inference] Novelty 风险：被审稿人重述为 provenance logging、tool robustness 或 VOI 的软件 benchmark。来源：ideas/prior-art/IDEA_DECISION_VALUE_EVIDENCE_ROUTING.yaml / cross_field_attack.decision；PF1 mature-concept boundary。
- [agent_inference] Evidence 风险：现有材料没有直接 frequency/effect evidence，且部分 corpus papers 只有 artifact-plus-abstract 或 abstract-level access。来源：directions/pressure-point-reframing.md / Main evidence risks。
- [agent_inference] Label 风险：同一 observation 的“语义正确 referent”可能涉及 alias、非确定执行、环境漂移或多条合理解释。来源：synthesis/cross-paper-synthesis.md / P2 Evidence needed；reports/independent-direction-audit-report.md / Reproducibility and transfer。
- [agent_inference] Feasibility 风险：exact replay 会受到 provider drift、dependencies、asynchronous tools 和 dirty state 影响；hash 相同不保证 continuation 或 evidence 等价。来源：directions/pressure-point-reframing.md / Main evidence risks；reports/independent-direction-reaudit-report.md / Untouched replay stability。

## 需要人类作出的判断

1. 最值得审查的 evidence 类型应是 test/build/analyzer/reproducer 中的哪一种，且它是否有明确的程序 referent？
2. “semantic validity”应要求什么最低标准：只重跑，还是还要 symbol/behavior-level 对齐？
3. 若 invalid evidence 很少，但 high-impact cases 很集中，这仍是有价值的问题还是 operational hygiene？
4. 哪一种普通 provenance/robustness baseline 一旦解释相同现象，就应立即关闭 PF1？
5. PF1 是否应保持独立，还是只作为 PF2/PF3 的 admission criterion 而非独立贡献？

## 证据边界

- [agent_inference] 现有证据支持 PF1 是一个待验证的 evidence-deficit question，不支持它频繁、因果重要、可发表或新颖；最近预印本的 citation/replication record 仍不成熟。来源：directions/pressure-point-reframing.md / Main evidence risks；AGENTS.md / Evidence and Claims。
