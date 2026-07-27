# PF1-PF5 与 dLLM seed 人类反馈记录

- [direct_evidence] 本表记录 HUMAN_FEEDBACK_SYNTHESIS 阶段收到的人工判断；它取代此前空白反馈表，但不生成 idea card、授权 pilot 或选择最终方向。来源：本阶段人类评审指令 / PF1-PF5 与 HUMAN_NEW_SEED 处置。
- [direct_evidence] 本轮禁止新的文献检索、实验、训练、skill 变更、Git 提交与推送。来源：本阶段人类评审指令 / 阶段边界。

## 审查记录

| 字段 | 填写内容 |
|---|---|
| 审查者 | [direct_evidence] 人类研究者，通过 HUMAN_FEEDBACK_SYNTHESIS 阶段指令提供判断。来源：本阶段人类评审指令。 |
| 日期 | [direct_evidence] 2026-07-26。来源：本阶段环境日期。 |
| 参考材料版本 | [direct_evidence] HUMAN_REVIEW_READY。来源：state/checkpoint.yaml / current_phase（综合前）。 |
| 全局约束或新证据 | [direct_evidence] 本轮只综合人工判断；没有提供新的论文证据，也不允许开展检索或实验。来源：本阶段人类评审指令 / 阶段边界。 |

## PF1：Evidence provenance and replay validity

决定（只选一项）：[ ] RETAIN  [ ] REWRITE  [x] MERGE  [ ] SPLIT  [ ] PIVOT  [ ] CLOSE  [ ] HUMAN_NEW_SEED

| 字段 | 填写内容 |
|---|---|
| 问题重要性（1–5） | [direct_evidence] 未评分。来源：本阶段人类评审指令 / PF1。 |
| 最不可信假设 | [direct_evidence] 未单独评分或指定。来源：本阶段人类评审指令 / PF1。 |
| 建议研究对象 | [direct_evidence] 后续研究实际消费 evidence 的 provenance、revision alignment 与 replay validity。来源：本阶段人类评审指令 / PF1。 |
| 可能的新表述 | [direct_evidence] 不再作为独立研究主线，而作为后续研究的准入协议。来源：本阶段人类评审指令 / PF1。 |
| 若 MERGE/SPLIT，关联 PF 或对象 | [direct_evidence] MERGE 到跨方向的 evidence-admission protocol，而不是并入一个新的独立问题族。来源：本阶段人类评审指令 / PF1。 |
| 必须保留的 code-semantic relation | [direct_evidence] evidence provenance、active-revision alignment 与 replay validity。来源：本阶段人类评审指令 / PF1。 |
| 必须避免的第一轮重包装 | [agent_inference] 不得复活 decision-theoretic evidence routing、通用 provenance benchmark 或 E/S/A/V oracle assistance。来源：human-review/dossiers/PF1-evidence-provenance-and-replay-validity.md / 第一轮已淘汰、不得重新包装的方向；本阶段 PF1 MERGE 判断。 |

## PF2：Derived-state truth at active revision

决定（只选一项）：[ ] RETAIN  [ ] REWRITE  [x] MERGE  [ ] SPLIT  [ ] PIVOT  [ ] CLOSE  [ ] HUMAN_NEW_SEED

| 字段 | 填写内容 |
|---|---|
| 问题重要性（1–5） | [direct_evidence] 未评分。来源：本阶段人类评审指令 / PF2。 |
| 最不可信假设 | [direct_evidence] 未单独评分或指定。来源：本阶段人类评审指令 / PF2。 |
| 建议研究对象 | [direct_evidence] PF3 所研究 state 的 truth status。来源：本阶段人类评审指令 / PF2。 |
| 可能的新表述 | [direct_evidence] 作为独立测量维度，区分 false、unsupported、stale 与 true state。来源：本阶段人类评审指令 / PF2。 |
| 若 MERGE/SPLIT，关联 PF 或对象 | [direct_evidence] MERGE 到 PF3，但不把 truth 与 action support 合并成同一个测量量。来源：本阶段人类评审指令 / PF2。 |
| 必须保留的 code-semantic relation | [direct_evidence] 显式 state claim 与 active repository revision 之间的真值关系。来源：本阶段人类评审指令 / PF2。 |
| 必须避免的第一轮重包装 | [agent_inference] 不得复活通用 factuality、truth-maintenance controller、per-item memory control 或 truthful-diagnosis gate。来源：human-review/dossiers/PF2-derived-state-truth-at-active-revision.md / 第一轮已淘汰、不得重新包装的方向；本阶段 PF2 MERGE 判断。 |

## PF3：Information sufficiency for later executable actions

决定（人工扩展项）：[x] RETAIN_AND_REWRITE

| 字段 | 填写内容 |
|---|---|
| 问题重要性（1–5） | [direct_evidence] 未评分。来源：本阶段人类评审指令 / PF3。 |
| 最不可信假设 | [direct_evidence] 现有方法是否能够建立可靠的 action-support relation 尚未审计。来源：本阶段人类评审指令 / PF3。 |
| 建议研究对象 | [direct_evidence] true but action-incomplete state。来源：本阶段人类评审指令 / PF3。 |
| 可能的新表述 | [direct_evidence] 一个在 active revision 上为真的 intermediate state，是否仍缺失支持后续 executable action 所必需的 program-semantic relation。来源：本阶段人类评审指令 / PF3；PF2 MERGE 判断。 |
| 若 MERGE/SPLIT，关联 PF 或对象 | [direct_evidence] 吸收 PF2 的 truth-status 测量维度，并受 PF1 admission protocol 约束。来源：本阶段人类评审指令 / PF1-PF3。 |
| 必须保留的 code-semantic relation | [direct_evidence] true state 与 later executable action 之间可审计的 action-support relation。来源：本阶段人类评审指令 / PF3。 |
| 必须避免的第一轮重包装 | [agent_inference] 不得复活 item-removal memory attribution、ContextCite 式 response attribution、rationale gate、VOI routing 或 stagewise oracle assistance。来源：human-review/dossiers/PF3-information-sufficiency-for-later-actions.md / 第一轮已淘汰、不得重新包装的方向。 |

- [direct_evidence] PF3 暂不得生成 idea；必须先审计现有 truth、attribution、replay 与 trajectory-sufficiency 方法能否建立可靠的 action-support relation。来源：本阶段人类评审指令 / PF3。

## PF4：Wrong but self-consistent executable acceptance

决定（人工扩展项）：[x] RETAIN_PENDING_AUDIT

| 字段 | 填写内容 |
|---|---|
| 问题重要性（1–5） | [direct_evidence] 未评分。来源：本阶段人类评审指令 / PF4。 |
| 最不可信假设 | [direct_evidence] reward hacking、test/evaluator tampering、false acceptance 与 held-out behavior 文献是否已基本覆盖该问题尚未审计。来源：本阶段人类评审指令 / PF4。 |
| 建议研究对象 | [direct_evidence] agent-induced validation-surface drift。来源：本阶段人类评审指令 / PF4。 |
| 可能的新表述 | [direct_evidence] agent action 是否改变 repository 内 validation surface，使可见验证接受但 held-out behavior 或独立意图证据拒绝。来源：本阶段人类评审指令 / PF4。 |
| 若 MERGE/SPLIT，关联 PF 或对象 | [direct_evidence] 不合并；仅在 coverage audit 后决定保留、收窄或关闭。来源：本阶段人类评审指令 / PF4。 |
| 必须保留的 code-semantic relation | [agent_inference] agent-induced repository transition 与 tests/evaluator/configuration/reachability 等 validation surface 变化之间的关系。来源：human-review/dossiers/PF4-wrong-but-self-consistent-acceptance.md / 代码门槛；本阶段 PF4 重写判断。 |
| 必须避免的第一轮重包装 | [agent_inference] 不得复活 correlated-judge aggregation、validator diversity、通用 test adequacy、通用 reward hacking 或 V-stage oracle assistance。来源：human-review/dossiers/PF4-wrong-but-self-consistent-acceptance.md / 第一轮已淘汰、不得重新包装的方向。 |

## PF5：Endpoint-trained process fidelity across scaffold encodings

决定（只选一项）：[ ] RETAIN  [ ] REWRITE  [ ] MERGE  [ ] SPLIT  [ ] PIVOT  [x] CLOSE  [ ] HUMAN_NEW_SEED

| 字段 | 填写内容 |
|---|---|
| 问题重要性（1–5） | [direct_evidence] 未评分。来源：本阶段人类评审指令 / PF5。 |
| 最不可信假设 | [direct_evidence] repository-transition equivalence 可稳定定义。来源：本阶段人类评审指令 / PF5。 |
| 建议研究对象 | [direct_evidence] 无；当前表述关闭。来源：本阶段人类评审指令 / PF5。 |
| 可能的新表述 | [direct_evidence] 无；不得在本轮改名保留。来源：本阶段人类评审指令 / PF5。 |
| 若 MERGE/SPLIT，关联 PF 或对象 | [direct_evidence] 不适用。来源：本阶段人类评审指令 / PF5。 |
| 必须保留的 code-semantic relation | [direct_evidence] 无；该关系当前不稳定，不能支持独立方向。来源：本阶段人类评审指令 / PF5。 |
| 必须避免的第一轮重包装 | [direct_evidence] 不得把密集的直接 prior art 或不稳定的 repository-transition equivalence 重新包装为独立方向。来源：本阶段人类评审指令 / PF5。 |

## HUMAN_NEW_SEED：dLLM program-semantic commitment sufficiency

决定（只选一项）：[x] HUMAN_NEW_SEED

| 字段 | 填写内容 |
|---|---|
| seed 名称 | [direct_evidence] dLLM program-semantic commitment sufficiency。来源：本阶段人类评审指令 / HUMAN_NEW_SEED。 |
| 当前状态 | [direct_evidence] QUALIFICATION_REQUIRED；尚不生成 idea。来源：本阶段人类评审指令 / HUMAN_NEW_SEED；阶段边界。 |
| 条件 1 | [direct_evidence] 现有代码 dLLM 必须确实展现非左到右生成。来源：本阶段人类评审指令 / HUMAN_NEW_SEED。 |
| 条件 2 | [direct_evidence] 现有代码 dLLM 必须展现有意义的 revision。来源：本阶段人类评审指令 / HUMAN_NEW_SEED。 |
| 条件 3 | [direct_evidence] 现有代码 dLLM 必须展现与程序结构相关的 commitment 行为。来源：本阶段人类评审指令 / HUMAN_NEW_SEED。 |
| 资格规则 | [direct_evidence] 三项条件必须同时成立才保留；任一项不成立或证据不足即不进入后续 idea 生成。来源：本阶段人类评审指令 / HUMAN_NEW_SEED。 |
| 必须避免的第一轮重包装 | [agent_inference] 不得复活 IDEA_FEEDBACK_DRIVEN_DIFFUSION_REPAIR 的 external-feedback-selected remasking、diffusion repair 或 dLLM 优越性主张。来源：ideas/prior-art/IDEA_FEEDBACK_DRIVEN_DIFFUSION_REPAIR.yaml / decision；本阶段 HUMAN_NEW_SEED 资格边界。 |

## 跨族反馈

| 字段 | 填写内容 |
|---|---|
| 应合并的 PF，以及共同 estimand | [direct_evidence] PF1 MERGE 为跨方向准入协议；PF2 MERGE 到 PF3，但保留 false/unsupported/stale/true 的独立测量维度。来源：本阶段人类评审指令 / PF1-PF3。 |
| 应拆分的 PF，以及各自可证伪对象 | [direct_evidence] 本轮没有 SPLIT 决定。来源：本阶段人类评审指令 / PF1-PF5。 |
| 应关闭的成熟概念或应用迁移 | [direct_evidence] PF5 当前表述关闭；第一轮所有已淘汰方向不得重新包装。来源：本阶段人类评审指令 / PF5；第一轮淘汰边界。 |
| HUMAN_NEW_SEED 的来源、边界和证据 | [direct_evidence] dLLM seed 来自人工新增判断，仅以已有代码 dLLM 的非左到右生成、有意义 revision 和 program-structure-related commitment 三项资格证据为准。来源：本阶段人类评审指令 / HUMAN_NEW_SEED。 |
| 允许进入下一阶段前必须补齐的证据 | [direct_evidence] 依次完成 action-support foundation、validation-surface coverage 与 dLLM commitment qualification 三项前提审计；第一项为紧邻下一阶段。来源：本阶段人类评审指令 / PF3、PF4、HUMAN_NEW_SEED；state/checkpoint.yaml / next_phase。 |
