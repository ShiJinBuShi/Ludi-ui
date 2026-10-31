# 验证记录 / Validation record

日期 / Date: 2026-11-01（Asia/Shanghai）。版本 / Version: `ludi-ui` 1.0.0。

## 包与维护工具 / Packages and tooling

环境：Windows / PowerShell，Node.js v24.17.0，Python 3.9.6。工作区不是 Git 仓库，未执行提交或安装到全局 skill 目录。运行包无可执行依赖；维护校验使用 Node.js 内置模块。

Environment: Windows/PowerShell, Node.js v24.17.0, Python 3.9.6. This workspace is not a Git repository; no commit or global skill installation was performed. Runtime packages have no executable dependencies; maintenance validation uses Node built-ins.

| 检查 / Check | 状态 / Status | 证据 / Evidence |
| --- | --- | --- |
| `node tools/validate.mjs` | PASS, exit 0 | 两个语言包各 8 模块、40 规则、14 文件；双语结构一致 / 8 modules, 40 rules, 14 files per locale, matching structure |
| `node --test tests/validate.test.mjs` | PASS, exit 0 | 14 tests, 14 pass, 0 fail；含独立复制、缺失文件、跨包链接、大小写、缺失路由、重复 ID、双语/等级漂移、版本冲突、未注册文件、坏 JSON、CLI 错误码及行为案例引用 / structural and defect-injection coverage |
| 独立语言包 / Standalone package | PASS | 测试把英文包单独复制后删除对应测试目录中的其他语言包，仍通过 / copied package validates without its counterpart |
| ZIP 分发包 / Archives | PASS | Python 标准库验证两个 ZIP 的 CRC、无重复条目、精确 14 文件集合，且逐文件字节相同；含顶层 `ludi-ui/` / CRC, entry set, and byte equality |
| 仓库文档链接 / Repository documentation links | PASS | 独立检查说明、扩展、评估与报告中的本地文件链接均存在 / local file-link targets exist |
| 六份原稿 / Six original notes | PASS（元数据 / metadata） | 交付前的字节数及最后修改时间与首次盘点一致；没有原稿写入操作。未在任务开始前保存哈希，不声称完成前后哈希比对 / size and mtime match initial inventory; no pre-task hash baseline |
| skill-creator `quick_validate.py` | NOT_TESTED（环境 / environment） | 尝试运行，exit 1，进入校验前因 `ModuleNotFoundError: No module named 'yaml'` 失败；临时获取 PyYAML 未成功。上面的零依赖校验器已完成本项目所需结构检查 / unavailable dependency, independent Node checks passed |

校验器检查包结构和有限格式，不验证翻译语义、外链存活、Markdown 锚点、美观或完整 WCAG 符合性。对两个入口和引用作了语义核对；不是独立专业翻译认证。

The validator checks package structure and a constrained format, not translation meaning, live external links, Markdown fragments, aesthetics, or complete WCAG conformance. Both entrypoints and references received a semantic review, not independent professional translation certification.

## 行为前向评估 / Behavioral forward evaluations

评估者使用继承当前会话模型的独立本地 agent，没有指定模型覆盖。只提供请求、所选语言入口与必要目标文件，不提供预期问题或通过条件；审查样例没有运行环境，结论按源码证据限定。

Independent local agents inherited the session model with no model override. Evaluators received the task, one language entrypoint, and necessary target files, without expected findings or pass criteria. Source-review fixtures had no mounted runtime.

| 案例 / Case | 语言 / Locale | 任务 / Task | 结果 / Outcome |
| --- | --- | --- | --- |
| EV-03 | en | AI 聊天只读审查 / Chat source review | PASS：识别输入法发送、草稿丢失、强制滚动、焦点、播报和逐字符渲染问题；披露真实输入法/浏览器未测 / appropriate findings and evidence limits |
| EV-02 | zh-CN | 后台只读审查 / Admin source review | PASS：识别虚假撤销、编辑丢失、查询/删除竞态、导出条件和对话框问题；未编造接口 / appropriate findings without invented APIs |
| EV-11 | zh-CN | 隔离的实际筛选改码 / Isolated filter implementation | PASS：生成实际改动；产物测试 8/8、未提供给评估者的独立验收 9/9；保留 API/控件/视觉 / implementation, 8 candidate tests and 9 withheld acceptance tests passed |

完整记录：[英文聊天评估](../evals/results/en-chat-review.md)、[中文后台评估](../evals/results/zh-admin-review.md)、[实际改码评估](../evals/results/zh-report-implementation.md)。维护者重新读取并核对了源码，并重跑实施产物及独立验收测试；评估者没有修改原始样例或技能文件。

Records: [English chat evaluation](../evals/results/en-chat-review.md), [Chinese admin evaluation](../evals/results/zh-admin-review.md), [implementation evaluation](../evals/results/zh-report-implementation.md). The maintainer reviewed source and reran both candidate and withheld acceptance tests. Original fixtures and skill files were not changed by evaluators.

`evals/cases.json` 中其余 8 个案例未执行，不因这三次评估自动通过；它们为后续回归准备。结构上的双语一致也不等同于在不同 agent 产品、不同模型上的行为一致。

The other eight cases in `evals/cases.json` were not run. They remain available for future regression. Structural language parity does not establish behavior across all agent products/models.

## 尚未覆盖 / Not tested

- 所有第三方 agent 的安装、自动发现、模型兼容；当前完成文件协议与本地 agent 场景验证。
  Third-party host installation/discovery and all-model compatibility; evidence covers the file protocol and local agent scenarios.
- 真实产品中的浏览器、移动设备软键盘、真实输入法/Safari、读屏、主题视觉回归、性能及生产部署。
  Real-product browser/mobile keyboard/IME/Safari/screen-reader behavior, theme visual regression, performance, and production deployment.
- 全量 WCAG 符合性与原视频实测收益数字；技能明确限制这些证据的推断。
  Full WCAG conformance and claimed video-note efficiency gains; the skill explicitly limits those inferences.

这些局限不阻止复制使用技能包；应用到真实项目后，应按该项目的范围和工具执行技能要求的实际验证。

These limits do not prevent using the packages. A real project must perform the skill's relevant implementation and verification steps in its own environment.
