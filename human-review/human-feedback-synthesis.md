# HUMAN_FEEDBACK_SYNTHESIS：人工评审结论

## 阶段边界与记录依据

- [direct_evidence] 本 synthesis 记录 PF1-PF5 与一个 HUMAN_NEW_SEED 的人工处置；不生成 idea card，不授权 pilot，也不执行下一阶段的前提审计。来源：human-review/researcher-feedback-form.md / 审查记录、PF1-PF5、HUMAN_NEW_SEED；本阶段人类评审指令 / 阶段边界。
- [direct_evidence] 本轮没有开展新的文献检索、模型训练、正式实验、skill 安装或修改、Git 提交或推送。来源：本阶段执行边界；human-review/researcher-feedback-form.md / 审查记录。
- [agent_inference] 下述“保留”均表示有资格接受前提审计，不表示 novelty、重要性、可发表性、方法或 idea 已成立。来源：human-review/overview.md / 用途与边界；human-review/researcher-feedback-form.md / PF3、PF4、HUMAN_NEW_SEED。

## 最终人工处置

| 对象 | 最终处置 | 综合后的研究地位 |
|---|---|---|
| PF1 | [direct_evidence] MERGE。来源：human-review/researcher-feedback-form.md / PF1。 | [direct_evidence] 不作为独立研究主线；保留为后续研究的 evidence provenance、revision alignment 与 replay-validity 准入协议。来源：human-review/researcher-feedback-form.md / PF1。 |
| PF2 | [direct_evidence] MERGE 到 PF3。来源：human-review/researcher-feedback-form.md / PF2。 | [direct_evidence] 保留独立 truth-status 测量维度，用于区分 false、unsupported、stale 与 true state；不与 action support 混为一个量。来源：human-review/researcher-feedback-form.md / PF2。 |
| PF3 | [direct_evidence] RETAIN_AND_REWRITE。来源：human-review/researcher-feedback-form.md / PF3。 | [direct_evidence] 重写为 true but action-incomplete state；在 action-support foundation audit 通过前不得生成 idea。来源：human-review/researcher-feedback-form.md / PF3。 |
| PF4 | [direct_evidence] RETAIN_PENDING_AUDIT。来源：human-review/researcher-feedback-form.md / PF4。 | [direct_evidence] 暂重写为 agent-induced validation-surface drift；只有直接覆盖审计未基本覆盖该问题时才可继续。来源：human-review/researcher-feedback-form.md / PF4。 |
| PF5 | [direct_evidence] CLOSE。来源：human-review/researcher-feedback-form.md / PF5。 | [direct_evidence] repository-transition equivalence 不稳定且直接 prior art 密集，当前表述不足以支持独立方向。来源：human-review/researcher-feedback-form.md / PF5。 |
| dLLM seed | [direct_evidence] HUMAN_NEW_SEED，QUALIFICATION_REQUIRED。来源：human-review/researcher-feedback-form.md / HUMAN_NEW_SEED。 | [direct_evidence] 仅在三项资格条件同时成立时保留；本轮不是 idea。来源：human-review/researcher-feedback-form.md / HUMAN_NEW_SEED。 |

## 进入后续研究前的三个前提审计

### 1. ACTION_SUPPORT_FOUNDATION_AUDIT

- [direct_evidence] 审计对象是现有 truth、attribution、replay 与 trajectory-sufficiency 方法能否建立可靠的 action-support relation。来源：human-review/researcher-feedback-form.md / PF3。
- [agent_inference] 审计必须保持两个不同维度：PF2 的 revision-aligned truth status，以及 true state 对 later executable action 的 support/completeness；共享 artifact 不得成为合并测量量的理由。来源：human-review/researcher-feedback-form.md / PF2-PF3；human-review/problem-family-comparison.md / 不能从表中推出的结论。
- [agent_inference] 只有在现有方法不能充分建立该关系、且剩余对象保留可检查的 program-semantic relation 时，PF3 才能进入后续构想；若现有方法已基本覆盖，必须关闭或进一步收窄。来源：human-review/researcher-feedback-form.md / PF3；AGENTS.md / Prior-Art Discipline。

### 2. VALIDATION_SURFACE_COVERAGE_AUDIT

- [direct_evidence] 审计 reward hacking、test/evaluator tampering、false acceptance 与 held-out behavior 文献是否已基本覆盖 agent-induced validation-surface drift。来源：human-review/researcher-feedback-form.md / PF4。
- [agent_inference] 审计必须区分 agent 引发的 validation surface 变化与固定 weak oracle、普通 test inadequacy、generic judge dependence 或通用 reward hacking；若前者没有独立剩余，PF4 关闭。来源：human-review/dossiers/PF4-wrong-but-self-consistent-acceptance.md / 相邻成熟概念与代码门槛、最小反例；human-review/researcher-feedback-form.md / PF4。

### 3. DLLM_COMMITMENT_QUALIFICATION_AUDIT

- [direct_evidence] 审计现有代码 dLLM 是否同时展现非左到右生成、有意义 revision，以及与程序结构相关的 commitment 行为。来源：human-review/researcher-feedback-form.md / HUMAN_NEW_SEED。
- [direct_evidence] 三项资格条件为合取关系；任一项不成立或证据不足，seed 即不得保留或进入 idea 生成。来源：human-review/researcher-feedback-form.md / HUMAN_NEW_SEED。

## 第一轮已淘汰且不得重新包装

- [direct_evidence] `IDEA_STAGEWISE_FAILURE_ATTRIBUTION`：不得复活为 E/S/A/V stagewise oracle assistance、rescue profile 或 bottleneck attribution。来源：directions/independent-direction-reaudit-decision-package.md / Mandatory pass-gate audit；human-review/dossiers/PF1-evidence-provenance-and-replay-validity.md / 第一轮已淘汰、不得重新包装的方向。
- [direct_evidence] `IDEA_ORACLE_CONCURRENCE_TRAP`：不得复活为 correlated-oracle aggregation、validator diversity 或 judge independence。来源：ideas/prior-art/IDEA_ORACLE_CONCURRENCE_TRAP.yaml / decision；human-review/dossiers/PF4-wrong-but-self-consistent-acceptance.md / 第一轮已淘汰、不得重新包装的方向。
- [direct_evidence] `IDEA_ACTIONABLE_RECOVERABILITY_CALIBRATION`：不得复活为通用 recoverability、reachability 或 rescue-margin calibration。来源：ideas/prior-art/IDEA_ACTIONABLE_RECOVERABILITY_CALIBRATION.yaml / cross_field_attack.decision；reports/pressure-point-failure-retrospective.md / Disposition of the ten seeds。
- [direct_evidence] `IDEA_DECISION_VALUE_EVIDENCE_ROUTING`：不得复活为 VOI、active sensing 或 evidence routing。来源：ideas/prior-art/IDEA_DECISION_VALUE_EVIDENCE_ROUTING.yaml / cross_field_attack.decision。
- [direct_evidence] `IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY`：不得复活为 per-item remove/corrupt/restore、truth-maintenance 或 memory control。来源：ideas/prior-art/IDEA_COUNTERFACTUAL_EVIDENCE_MEMORY.yaml / direction_narrowing_targeted_verification.disposition。
- [direct_evidence] `IDEA_CAUSAL_DIAGNOSIS_ACTION_GATE`：不得复活为 rationale invariance、truthful-diagnosis gate 或 diagnosis/action mediation。来源：ideas/prior-art/IDEA_CAUSAL_DIAGNOSIS_ACTION_GATE.yaml / decision；human-review/dossiers/PF2-derived-state-truth-at-active-revision.md / 第一轮已淘汰、不得重新包装的方向。
- [direct_evidence] `IDEA_REVERSIBILITY_AWARE_COMMIT_CONTROL`：不得复活为 reversibility-aware action/commit controller。来源：ideas/prior-art/IDEA_REVERSIBILITY_AWARE_COMMIT_CONTROL.yaml / decision；reports/pressure-point-failure-retrospective.md / Disposition of the ten seeds。
- [direct_evidence] `IDEA_SCAFFOLD_INVARIANT_COUNTERFACTUAL_CREDIT`：不得复活为 generic counterfactual credit、cross-scaffold sign filtering 或 data filtering。来源：ideas/prior-art/IDEA_SCAFFOLD_INVARIANT_COUNTERFACTUAL_CREDIT.yaml / decision。
- [direct_evidence] `IDEA_CAUSAL_RECOVERABILITY_REPRESENTATION`：不得复活为 latent recoverability probe、activation steering 或 rescue control。来源：ideas/prior-art/IDEA_CAUSAL_RECOVERABILITY_REPRESENTATION.yaml / decision。
- [direct_evidence] `IDEA_FEEDBACK_DRIVEN_DIFFUSION_REPAIR`：不得复活为 external-feedback-selected remasking、diffusion repair 或 dLLM superiority；新增 seed 不能以改名方式绕过该关闭决定。来源：ideas/prior-art/IDEA_FEEDBACK_DRIVEN_DIFFUSION_REPAIR.yaml / decision；human-review/researcher-feedback-form.md / HUMAN_NEW_SEED。
- [direct_evidence] PF5 的 repository-transition equivalence 当前表述也已关闭，不得作为上述 counterfactual-credit 或 transfer 方向的替代包装。来源：human-review/researcher-feedback-form.md / PF5。

## PF1 与 PF2 的后续辅助角色

- [direct_evidence] PF1 是准入协议：后续任何 state、action-support 或 validation-surface 判断，必须先满足 evidence provenance、revision alignment 与 replay validity；PF1 本身不形成独立研究主线。来源：human-review/researcher-feedback-form.md / PF1。
- [direct_evidence] PF2 是 PF3 内的独立测量维度：先把 state 分类为 false、unsupported、stale 或 true，再只对 true state 审查 action completeness；PF2 本身不形成独立研究主线。来源：human-review/researcher-feedback-form.md / PF2-PF3。
- [agent_inference] PF1/PF2 的辅助地位不授权把 provenance、factuality 或 truth maintenance 本身重新包装为贡献。来源：human-review/researcher-feedback-form.md / PF1-PF2；reports/pressure-point-failure-retrospective.md / Anti-patterns。

## dLLM seed 的资格条件

- [direct_evidence] 条件一：已有代码 dLLM 必须实际执行非左到右生成，而不是仅由名称或架构标签推定。来源：human-review/researcher-feedback-form.md / HUMAN_NEW_SEED。
- [direct_evidence] 条件二：生成过程中必须存在有意义的 revision。来源：human-review/researcher-feedback-form.md / HUMAN_NEW_SEED。
- [direct_evidence] 条件三：commitment 行为必须与程序结构相关。来源：human-review/researcher-feedback-form.md / HUMAN_NEW_SEED。
- [agent_inference] 资格审计只判断 seed 是否有保留资格，不比较 dLLM 与 autoregressive 模型优劣，也不预设 feedback-driven repair、训练目标或方法贡献。来源：synthesis/dllm-adjacent-watchlist.md / Watch status；ideas/prior-art/IDEA_FEEDBACK_DRIVEN_DIFFUSION_REPAIR.yaml / decision；本阶段边界。

## 阶段结论

- [direct_evidence] 人工处置已覆盖 PF1-PF5 和 dLLM seed，没有遗留需要本阶段补充的人类决定。来源：human-review/researcher-feedback-form.md / PF1-PF5、HUMAN_NEW_SEED、跨族反馈。
- [agent_inference] 工作区可进入 `ACTION_SUPPORT_FOUNDATION_AUDIT`，但 pilot 仍未授权，另两项前提审计仍为 pending；不得直接进入 idea seeding。来源：state/checkpoint.yaml / current_phase、next_phase、human_feedback_synthesis；本 synthesis / 三个前提审计。
