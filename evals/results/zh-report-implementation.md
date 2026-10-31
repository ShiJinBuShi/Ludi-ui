# 中文前向评估：实际筛选改造

日期：2026-11-01。评估者：独立本地 agent `/root/forward_eval_zh`，继承会话模型，无模型覆盖；在完成另一场只读审查后接收本次独立实施任务。任务对应 EV-11。

## 请求与隔离

要求把小型报表改为点击 Apply 才查询，快速切换条件时不混淆结果；导出对应可见的成功查询结果，查询等待/失败时不能导出。保留原生 Select、既有视觉、公开控制器方法与 `{ status }` API 载荷，处理查询/导出失败，不部署、不安装依赖。

评估者得到中文技能及必要原始项目，未得到预期实现、验收测试或其他语言包。实施目录位于独立临时目录，不允许修改本仓库。完成后由维护者检查并把产物复制到 [report-app/](report-app/)保存；原始带缺陷样例仍在 [fixtures/report-app/](../fixtures/report-app/)中。

## 交付行为

- `setDraft` 只更新草稿；Apply 捕获请求快照，旧成功/失败响应不能覆盖较新状态。
- `applied` 与可见成功结果一致；新草稿不改变导出条件。
- 无成功结果、查询等待/失败及导出执行中均禁止发起导出；空但成功的结果可导出。
- 查询失败保留旧成功结果并标记，支持 Apply 重试；导出失败有独立状态和重试。
- 原生 Select、CSS、API 形状及四个公开控制器方法保留；新增状态与两处状态播报。

产物共五个文件：`controller.mjs`、`main.mjs`、`index.html`、新增 `controller.test.mjs` 以及未修改的 `package.json`。它们是保留的评估样例，不随 skill 分发，也不是生产应用。

## 验证

评估者执行并报告 `npm.cmd test` 退出码 0，8/8 通过；`node --check main.mjs` 退出码 0。维护者读取全部改动文件，并独立重跑测试。以下命令使用仓库中保留的产物，可重复执行：

```powershell
Set-Location -LiteralPath E:/dev/Ludi-ui/evals/results/report-app
npm.cmd test
node --check main.mjs

Set-Location -LiteralPath E:/dev/Ludi-ui
$env:LUDI_UI_EVAL_TARGET = 'E:/dev/Ludi-ui/evals/results/report-app/controller.mjs'
node --test evals/report-contract.test.mjs
```

- 产物自带行为测试：8/8 PASS，exit 0。
- 维护者在看到实现前编写、未提供给评估者的验收测试：9/9 PASS，exit 0。覆盖草稿无请求、Apply 快照、旧成功/失败竞态、可见条件导出、等待/错态守卫、恢复与重复导出。
- 对原始缺陷控制器只运行“draft edits publish”验收项：预期 FAIL，exit 1，实际查询次数 `2 !== 0`。证明该项能检测即时查询问题，不把有意失败的样例记为交付缺陷。
- 模块语法检查：PASS，exit 0。

## 证据边界

`NOT_TESTED`：真实浏览器、键盘/读屏、窄屏和视觉。评估者尝试初始化 CUA，因 kernel assets 路径缺失而失败；未安装额外浏览器依赖。服务依然是本地模拟，真实授权、网络及下载内容未验证。这里通过的是样例的代码行为与交付流程，不能推广为所有 agent 或真实产品已通过验收。

本轮沿用先前已读取的中文入口，以及工程、无障碍、数据后台和选择控件引用；没有读取不相关的其他模块或本次预期答案。

---

English summary: EV-11 passed an isolated implementation forward test. The candidate preserved native controls, styling, controller/API contracts, implemented Apply-only snapshots and stale-response protection, and bound export to successful visible results. Its eight tests and nine withheld maintainer acceptance tests passed; the original baseline fails the draft-query check as intended. Browser/accessibility rendering and real-service behavior remain untested. Saved artifacts above are evaluation material, outside the runtime skill package.
