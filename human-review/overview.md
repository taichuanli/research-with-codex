# PF1–PF5 人类审查概览

## 用途与边界

- [direct_evidence] 本交接包基于 42 篇论文的跨论文综合、第一轮 10 个 idea 与 10 份 prior-art ledger、两次独立方向审查、失败复盘以及 PF1–PF5 重构记录；没有新增检索、idea card、方法方案、训练或实验。来源：state/checkpoint.yaml / pressure_point_reframing.evidence_basis；reports/pressure-point-failure-retrospective.md / Phase contract and evidence basis。
- [agent_inference] PF1–PF5 是待人类判断的研究问题族，不是已确认的新颖性主张、候选方法或优先级排序；每一族均可能因普通成熟概念足以解释而关闭。来源：directions/pressure-point-reframing.md / Status and interpretation rule；reports/pressure-point-failure-retrospective.md / Anti-patterns。

## 五个问题在同一链条中的位置

| 位置 | 问题族 | 它要求先确认什么 | 与下一环的关系 |
|---|---|---|---|
| [agent_inference] 进入状态之前 | PF1：证据来源与回放有效性 | [agent_inference] 被 agent 实际消费的观察在当时的仓库和环境中可重现、可追溯且语义对齐 | [agent_inference] 若 PF1 失败，后续状态真值、动作归因和过程标签都可能建立在无效观察上 |
| [agent_inference] 派生状态 | PF2：活跃 revision 上的状态真值 | [agent_inference] 显式计划、诊断、摘要或假设在使用时为真、假、无支撑还是已过时 | [agent_inference] PF2 回答“状态说了什么是否仍真” |
| [agent_inference] 派生状态 | PF3：后续可执行动作的信息充分性 | [agent_inference] 即使每一条保留陈述都为真，状态是否遗漏了动作所需的关系、约束或反例 | [agent_inference] PF3 回答“真状态是否足以支持下一次 repository transition” |
| [agent_inference] 终点验证 | PF4：错误但自洽的可执行接受 | [agent_inference] 候选补丁与同仓库验证物是否共享错误假设或共同改变接受面 | [agent_inference] PF4 约束何时 tests/builds/validators 不能代表意图 |
| [agent_inference] 训练与过程标签 | PF5：跨 scaffold 编码的过程忠实度 | [agent_inference] endpoint 派生的过程标签是否对应可执行仓库转移，还是只对应 transcript/tool schema | [agent_inference] PF5 检查训练过程是否学到语义转移而非 scaffold 序列化 |

- [agent_inference] PF1 是进入状态前的证据问题；PF2/PF3 是同一派生状态分别关于真实性与充分性的拆分；PF4 是终点接受问题；PF5 是从 endpoint 到训练过程标签的忠实度问题。来源：directions/pressure-point-reframing.md / Fundamental-question check；Reframed problem families。
- [agent_inference] 这不是已验证的单向因果图：例如 PF4 的错误接受可反过来污染 PF5 的 endpoint 标签，而 PF3 的不足状态可导致 PF4 中的错误补丁；表中的顺序仅用于审查依赖。来源：synthesis/cross-paper-synthesis.md / Failure and recovery chain；Shared hidden assumptions 1, 3, and 5。

## 为什么必须保留代码语义这一关

- [agent_inference] 五族都只能在保留一个不可替代的程序语义关系时继续：PF1 是 observation 到特定 revision/环境/代码实体的关系；PF2 是显式 claim 到 revision 的关系；PF3 是 state 到动作前置条件和效果的关系；PF4 是候选与 validator 在同一 repository graph 中的共同演化；PF5 是不同 transcript 到同一可执行 transition 的关系。来源：directions/pressure-point-reframing.md / PF1–PF5 Code environment non-substitutability。
- [agent_inference] 版本化、provenance、checkpoint 或 replay 本身不足以使问题成为软件工程问题；若普通事务系统、POMDP、文本上下文或成熟的训练/归因框架保留全部研究对象，必须按应用迁移关闭。来源：reports/pressure-point-failure-retrospective.md / Common causes of failure 3；directions/pressure-point-reframing.md / Status and interpretation rule。

## 第一轮留下的硬边界

- [direct_evidence] 通用决策价值/VOI evidence routing、通用可恢复性、通用 per-item memory attribution/control、通用 correlated-oracle aggregation、四阶段 oracle assistance、通用 counterfactual credit、latent rescue steering、reversibility control 和 diffusion feedback repair 均已被 prior-art 攻击为成熟对象、明显组合或仅应用迁移。来源：reports/pressure-point-failure-retrospective.md / Disposition of the ten seeds；Anti-patterns。
- [agent_inference] 因此 human review 应判断“有没有 code-specific observable phenomenon 值得建立”，而不是挑选一个已知机制换到代码数据上。来源：reports/pressure-point-failure-retrospective.md / Retrospective conclusion。

## 审查时应先回答的共同问题

1. 研究对象是否有一个可检查且不可由普通系统替代的程序语义锚点？
2. 最小反例是什么，且负结果是否会产生可解释的结论，而不是只暴露工程失败？
3. 关键标签能否独立于 endpoint、gold patch 或同一 validator 得到，还是应保留 inconclusive？
4. 最近工作是否已经覆盖核心现象，而不是仅覆盖某个名字或实验组件？
5. 若将问题改写、合并、拆分或关闭，新的表述是否避开第一轮已否决的成熟机制？

- [agent_inference] 这些问题来自首次方向审查对可识别性、回放、意图判定和样本选择的批评，以及复审对“缩窄后只剩 assistance benchmarking”的结论。来源：reports/independent-direction-audit-report.md / Core claim audit, Reproducibility and transfer；directions/independent-direction-reaudit-decision-package.md / Mandatory pass-gate audit。

## 阅读入口

- PF1 dossier：dossiers/PF1-evidence-provenance-and-replay-validity.md
- PF2 dossier：dossiers/PF2-derived-state-truth-at-active-revision.md
- PF3 dossier：dossiers/PF3-information-sufficiency-for-later-actions.md
- PF4 dossier：dossiers/PF4-wrong-but-self-consistent-acceptance.md
- PF5 dossier：dossiers/PF5-endpoint-trained-process-fidelity.md
- 跨族比较：problem-family-comparison.md
- 可填写反馈：researcher-feedback-form.md
