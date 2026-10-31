# Ludi UI skill 工程计划 / Engineering plan

日期 / Date: 2026-11-01

## 目标 / Goal

把工作区六份视频学习笔记转成可被不同编码 agent 使用的、框架无关的 UI 工程技能。交付两个自包含语言包，支持按需读取知识、持续扩展和可重复校验。

Turn the six video notes into a framework-independent UI engineering skill for coding agents. Deliver two self-contained language packages with selective loading, an extension contract, and repeatable validation.

## 工作项 / Tasks

1. 盘点六份原稿，保留原文件；区分经验建议、产品决策与可验证的交互要求。
   Inventory and preserve the six originals; distinguish heuristics, product choices, and testable interaction requirements.
2. 建立精简入口、场景引用、稳定规则 ID、模块清单与任务模板。
   Build a concise entrypoint, scenario references, stable rule IDs, a module manifest, and task templates.
3. 补齐修改/新建/审查工作流、可访问性、状态与数据契约、验证与证据边界。
   Add change/build/review workflows, accessibility, state and data contracts, verification, and evidence limits.
4. 提供同名同版本的中文、英文独立技能包，说明单语言安装与无原生 skill 功能时的调用方式。
   Deliver equivalent Chinese and English packages; document single-locale installation and direct-file invocation.
5. 提供扩展说明、来源修订记录、结构校验器与行为验收案例。
   Add extension guidance, provenance and normalization notes, a structural validator, and behavioral cases.
6. 执行结构校验、损坏样本检测及隔离场景验证，记录实际结果与未覆盖内容。
   Run structural checks, corrupted-package checks, and isolated behavioral evaluations; record results and gaps.

## 验收标准 / Acceptance

- 六个源文件保持不变；其关键主题均能找到对应模块。
  The six originals remain unchanged and every source topic has a destination.
- 每个语言包独立可用，入口不依赖另一语言目录或当前机器上的工具。
  Each locale works alone, without cross-locale or machine-specific dependencies.
- 入口只包含必要流程与路由；条件知识按任务读取。
  The entrypoint stays focused and conditional knowledge is loaded only as needed.
- 两版本模块、规则 ID、等级、模板与版本一致，语义由人工/行为评审补充。
  Module IDs, rule IDs, levels, templates, and version match; semantic parity also receives review.
- 固定数值有适用条件；视觉规则不得隐式移除可见焦点、取消出口或真实数据语义。
  Numerical heuristics have conditions; visual guidance does not silently remove focus, cancellation, or data semantics.
- 提供可执行校验命令；失败退出码非零；损坏样本证明校验器能发现实际结构缺陷。
  Validation is executable, returns a nonzero status on failure, and detects meaningful package defects.
- 通过与未测试的证据分开报告；不宣称已验证所有 agent、浏览器或 WCAG 全面符合性。
  Passed and untested evidence are separated; no blanket claim covers all agents, browsers, or WCAG conformance.

## 完成记录 / Completion

六项工作已完成。交付两个自包含语言包及 ZIP、扩展与来源文档、零依赖校验器、14 项维护测试、11 个行为案例。完成两次只读前向评估及一次隔离实施评估，实施产物的 8 项测试与 9 项独立验收通过。环境限制与未执行案例见 [VALIDATION.md](VALIDATION.md)。

All six tasks are complete. Deliverables include two standalone locale packages and ZIPs, extension/provenance documentation, a dependency-free validator, 14 maintainer tests, and 11 behavioral cases. Two source-review evaluations and one isolated implementation evaluation ran; eight candidate tests and nine independent acceptance tests passed. See [VALIDATION.md](VALIDATION.md) for environment limits and unrun cases.
