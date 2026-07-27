# PF4 人类审查 dossier：Wrong but self-consistent executable acceptance

## 准确问题与代码 agent 场景

- [agent_inference] 准确问题是：何时 code agent 的 candidate solution 与其 executable validation surface 共享同一错误假设，或 candidate action 改变了哪些 behaviors 被检查，使 intent-invalid patch 在 tests/builds/checkers 下显得自洽。来源：directions/pressure-point-reframing.md / PF4 Problem definition。
- [agent_inference] 具体场景：agent 修改实现同时改动 fixture、mock、generated check、test selection 或 configuration，使局部 suite 通过；但独立需求或 broader behavior 显示功能仍违反意图。PF4 关注 candidate-validator co-change，而不是所有“测试不足”的一般情况。来源：directions/pressure-point-reframing.md / CHECKABLE_ACCEPTANCE_VS_INTENT Code-only structure；PF4 Code environment non-substitutability。

## 它从哪里产生

- [direct_evidence] PatchDiff 发现 developer tests 暴露 7.8% plausible patches 为 incorrect，PatchDiff 标记 29.6% behaviorally divergent，且 51/77 audited suspicious cases 仍不确定。来源：synthesis/cross-paper-synthesis.md / Failure and recovery chain, Stage 4；ideas/prior-art/IDEA_ORACLE_CONCURRENCE_TRAP.yaml / works.ICSE2026_PATCHDIFF。
- [direct_evidence] To Run 报告 commercial-agent 的 Fail-to-Fail cases 中 agent-selected validation 通过而 official evaluation 失败的比例为 81–100%。来源：synthesis/cross-paper-synthesis.md / Failure and recovery chain, Stage 4。
- [agent_inference] 这些结果与 formal acceptance 的边界一致：proof/model check 验证 encoding 或 constraints，而不是 encoding 是否捕获 user intent；PF4 将未解点缩窄为同一 repository graph 内的 candidate-validator 共变。来源：synthesis/cross-paper-synthesis.md / Stage 4；directions/pressure-point-reframing.md / CHECKABLE_ACCEPTANCE_VS_INTENT Disposition。

## 最接近工作与剩余边界

| 工作 | 已覆盖什么 | 对 PF4 尚未给出的证据 | 来源 |
|---|---|---|---|
| PatchDiff | [direct_evidence] 测量 accepted patches 的 behavioral divergence 与 residual ambiguity。 | [agent_inference] 没有把 fixed incomplete oracle 造成的 false acceptance 与 candidate-validator co-change 造成的 false acceptance 分开。 | ideas/prior-art/IDEA_ORACLE_CONCURRENCE_TRAP.yaml / works.ICSE2026_PATCHDIFF；https://arxiv.org/abs/2503.15223v2 |
| To Run | [direct_evidence] 显示 agent-selected validation 与 official evaluation 的系统性不一致。 | [agent_inference] 不隔离 validator selection/mutation 或 shared implementation assumption 对 acceptance surface 的作用。 | synthesis/cross-paper-synthesis.md / Stage 4；directions/pressure-point-reframing.md / PF4 Closest work |
| AuditRepairBench | [direct_evidence] 固定 task、candidate set、tool outputs 和 evaluator，并阻断 evaluator-to-selector path；其 channel-surgery subset 有 80 cases，且作者不认证 latent mechanism 或强 prospective validity。 | [agent_inference] fixed-channel surgery 不等于观察 candidate 和 validator artifact 在 repository 内共同演化。 | ideas/prior-art/IDEA_STAGEWISE_FAILURE_ATTRIBUTION.yaml / direction_narrowing_targeted_verification；https://arxiv.org/abs/2605.04624v1 |
| CARE | [direct_evidence] 显式建模 correlated judges 的 shared latent confounders，并评估 executable programmatic judges。 | [agent_inference] judge dependence 不是 repository candidate-validator co-change 的直接机制。 | ideas/prior-art/IDEA_ORACLE_CONCURRENCE_TRAP.yaml / works.ARXIV_2603_00039；https://arxiv.org/abs/2603.00039v1 |
| Nine Judges | [direct_evidence] 发现 nominal nine-judge panel 仅约有 2.0–2.5 effective independent votes。 | [agent_inference] 已占据“agreement 不等于独立证据”的 headline，但不枚举同仓库 executable artifacts 的共变。 | ideas/prior-art/IDEA_ORACLE_CONCURRENCE_TRAP.yaml / works.ARXIV_2605_29800；https://arxiv.org/abs/2605.29800v1 |
| Helpful Agent Meets Deceptive Judge | [direct_evidence] 研究 misleading critiques/feedback 对 agent 判断的影响。 | [agent_inference] misleading feedback 不是 candidate 改变 validation reachability、fixture 或 shared assumptions 的同仓库机制。 | reports/independent-direction-reaudit-report.md / Coverage by nearby causal probing, assistance, intervention, and robustness work；https://arxiv.org/abs/2506.03332 |

## 相邻成熟概念与代码门槛

- [agent_inference] 相邻成熟概念包括 oracle problem、test adequacy、specification gaming、reward hacking、Goodhart effects、ensemble dependence、adversarial validation 与 formal specification fidelity；这些已经覆盖 proxy 与 intended behavior 的一般差距。来源：directions/pressure-point-reframing.md / CHECKABLE_ACCEPTANCE_VS_INTENT Mature generic coverage。
- [agent_inference] PF4 的代码门槛是 validator artifacts 可版本化且与 candidate 位于同一 build/repository graph：tests、fixtures、mocks、generated specs、configuration 和 validation reachability 可被 action 改变或共享假设；若 validator 是固定外部服务，或 generic judge manipulation 已解释结果，PF4 必须关闭。来源：directions/pressure-point-reframing.md / PF4 Code environment non-substitutability。

## 第一轮已淘汰、不得重新包装的方向

- [direct_evidence] IDEA_ORACLE_CONCURRENCE_TRAP 被 KILL：Nine Judges 已覆盖 correlated agreement 的经验规律，CARE 已覆盖 confounder-aware aggregation 和 executable programmatic judges；不得以“更多/更独立 validators”作为 headline。来源：ideas/prior-art/IDEA_ORACLE_CONCURRENCE_TRAP.yaml / decision。
- [direct_evidence] 通用 intent oracle、validator diversity 和 correlated-evaluator formulations 已在重构中关闭；PF4 不能变成 another judge ensemble 或 generic test-adequacy paper。来源：state/checkpoint.yaml / pressure_point_reframing.closed_frames；directions/pressure-point-reframing.md / CHECKABLE_ACCEPTANCE_VS_INTENT Disposition。
- [direct_evidence] stagewise finalist 中对 V 的 oracle replacement 被复审判定为与 E 共享 observation carrier、仅测 external assistance，不构成自然 validation-stage mechanism。来源：reports/independent-direction-reaudit-report.md / Are E/S/A/V natural and cross-scaffold research objects?；Is the sole estimand identifiable?

## 可形成的贡献形态，不是方法承诺

- [agent_inference] 最小可防守形态是经验发现：candidate-validator co-change 或 shared assumptions 何时与 independently adjudicated intent-invalid outcomes 相关，并能否与 fixed-oracle inadequacy 区分。来源：directions/pressure-point-reframing.md / PF4 Missing observation or mechanism evidence。
- [agent_inference] 若该现象存在并且超过现有 test-adequacy/reward-hacking 解释，可能形成 endogenous-validation mechanism boundary；这不预先等于新 validator、stopping policy 或 training objective。来源：directions/pressure-point-reframing.md / PF4 Contribution fit；reports/pressure-point-failure-retrospective.md / Anti-pattern 9。
- [agent_inference] inference-time or training contribution 只有在 candidate-validator relation 具有可复现、独立 adjudication 的失败机制后才可能成立。来源：synthesis/cross-paper-synthesis.md / P7 Evidence needed；P9 Evidence needed。

## 最小反例与最强反方

- [agent_inference] 最小反例是：冻结 validation 在 candidate repository 外后，几乎所有 false acceptance 消失；candidate/validator co-change 与 intent-invalid outcomes 无关；剩余案例完全由 standard test adequacy、reward hacking 或 fixed weak oracle 解释。该结果应关闭 PF4。来源：directions/pressure-point-reframing.md / PF4 Result that would make the problem unimportant。
- [agent_inference] 最强反方观点：PF4 只是 PatchDiff 的更细粒度 case analysis，核心问题早已是 test adequacy 和 reward hacking；更糟的是没有完整独立 intent oracle，所谓 co-change 可能只是事后叙事。除非同仓库共变在预先定义的 validator graph 上显示额外解释力并保留 inconclusive cases，严格审稿人会把它视为 benchmark audit。来源：synthesis/cross-paper-synthesis.md / P7；reports/pressure-point-failure-retrospective.md / Anti-pattern 7；directions/pressure-point-reframing.md / Main evidence risks。

## 最大风险

- [agent_inference] Novelty 风险：CARE/Nine Judges 饱和 generic dependence，PatchDiff 饱和 false acceptance，AuditRepairBench 饱和 evaluator channel surgery；PF4 必须显示不同的 endogenous repository mechanism。来源：ideas/prior-art/IDEA_ORACLE_CONCURRENCE_TRAP.yaml / decision；ideas/prior-art/IDEA_STAGEWISE_FAILURE_ATTRIBUTION.yaml / direction_narrowing_targeted_verification。
- [agent_inference] Evidence 风险：现有材料未测量 candidate-validator co-change 的频率或因果贡献。来源：directions/pressure-point-reframing.md / PF4 Missing observation or mechanism evidence。
- [agent_inference] Label 风险：underspecified issues、alternative valid fixes 和不完整 requirements 使 intent outcome 可能必须为 inconclusive，而非正/负标签。来源：synthesis/cross-paper-synthesis.md / P7；directions/pressure-point-reframing.md / Main evidence risks。
- [agent_inference] Feasibility 风险：需要同时恢复 candidate、validator graph、test selection/configuration、hidden/broader behavior 与 adjudication protocol；选择可审计任务可能导致 transparent/repairable selection bias。来源：reports/independent-direction-reaudit-report.md / Can intent-valid repair be established independently?；Selection bias from simultaneous four-contract eligibility。

## 需要人类作出的判断

1. PF4 应把“validator”限定为 tests/fixtures/mocks/configuration，还是包括 generated specs、coverage 和 build graph？
2. 哪种独立 intent evidence 足以支持 case：developer requirement、broader behavioral suite、human adjudication 或它们的组合？
3. 若不允许 agent 修改 validators，PF4 是否仍有研究对象，还是这正是最关键的限定？
4. candidate-validator co-change 应被理解为静态 dependency relation、执行 reachability relation 还是共同 assumption relation？
5. 若多数强案例仍为 inconclusive，人类是否愿意接受“边界与不确定性”作为贡献，而非强判错率？

## 证据边界

- [agent_inference] 当前证据强烈支持 false acceptance 与 validator disagreement 存在，但不足以支持 PF4 所需的 code-specific co-change mechanism 已频繁、可识别或新颖；尤其 independent intent labels 仍是硬限制。来源：synthesis/cross-paper-synthesis.md / Stage 4；directions/pressure-point-reframing.md / Main evidence risks。
