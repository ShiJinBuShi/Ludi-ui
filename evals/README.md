# 行为验收 / Behavioral evaluations

`cases.json` 包含 11 个双语场景、规则引用与可观察通过条件。它们用于评估技能行为，不是自动化 UI 测试。`fixtures/` 的两个 React 源码片段故意保留缺陷，没有运行项目；另有 `report-app/` 原生 HTML/JS 小项目用于隔离改码。所有服务均为样例，不能部署使用。

`cases.json` contains eleven bilingual scenarios, rule references, and observable pass criteria. They are behavioral evaluation material, not automated UI tests. Two React source fixtures intentionally contain defects and have no running app; `report-app/` is a small native HTML/JS implementation target. All services are fixtures. Do not deploy them.

## 执行 / Run

1. 选一个案例和语言，给独立 agent 对应请求、该语言包入口及必要原始样例；不要给通过条件、预期问题或先前评审。
   Give an independent agent one prompt, one locale's entrypoint, and necessary raw fixtures, without expected outcomes or earlier reviews.
2. 审查案例要求只读；实施案例复制到隔离临时目录，提供适当的真实项目/测试数据和授权。缺少浏览器等能力时记录限制，不编造环境。
   Keep reviews read-only; copy implementation targets to an isolated temporary workspace with suitable project/test data and authorization. Record missing capabilities.
3. 评估者按需读取引用并完成任务。记录实际文件、命令、退出码、判断与未测试项。
   Let the evaluator choose references and execute the task. Record actual files, commands, exit codes, decisions, and untested checks.
4. 维护者对照通过条件审查产物，区分 agent 报告与已独立复核的事实。观察到规则缺陷才做定向修订，不为某次答案积累全局禁令。
   Compare artifacts with the criteria, separating evaluator reports from independently rechecked evidence. Revise only demonstrated gaps.

仅结构校验通过不能证明案例通过。当前已执行范围和结果见 [VALIDATION.md](../docs/VALIDATION.md)，原始审查记录见 `results/`。建议新增重要模块或改变契约时重跑相关案例；不要求普通措辞修订都运行全部案例。

Passing structural validation does not pass a behavioral case. See [VALIDATION.md](../docs/VALIDATION.md) for executed coverage and `results/` for review records. Re-run affected scenarios for substantial modules/contracts; wording edits do not automatically require every case.

## 实施产物验收 / Implementation artifact checks

保留的 EV-11 产物及命令见[实施记录](results/zh-report-implementation.md)。`report-contract.test.mjs` 是维护者编写的独立验收，只测试公开行为契约，不随运行包分发，也不提前提供给评估 agent。

See the [implementation record](results/zh-report-implementation.md) for saved EV-11 artifacts and commands. `report-contract.test.mjs` contains withheld maintainer checks of public behavior; it is neither runtime skill content nor part of the evaluator's input.
