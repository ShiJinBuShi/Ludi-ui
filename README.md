# Ludi UI

[English](README.en.md)

面向编码 agent 的前端 UI 工程技能。以根目录六份视频学习笔记为基础，覆盖场景判断、代码实施、交互与视觉质量、验证和交付。框架无关，不绑定特定组件库、MCP 或商业模型。

## 两个版本

| 版本 | 入口 | 使用方式 |
| --- | --- | --- |
| 简体中文 | [skills/zh-CN/ludi-ui/SKILL.md](skills/zh-CN/ludi-ui/SKILL.md) | 中文规则与工作流 |
| English | [skills/en/ludi-ui/SKILL.md](skills/en/ludi-ui/SKILL.md) | Equivalent English rules and workflow |

两者都是 `ludi-ui` v1.0.0，可分别独立复制使用。每个包含 8 个场景/工程模块、40 条稳定 ID 规则、来源修订、两个模板及可选宿主展示元数据。规则分为契约、默认建议与可选效果；固定像素、比例、时长等不是全局硬约束。

分发包：[简体中文 ZIP](dist/ludi-ui-1.0.0-zh-CN.zip) · [English ZIP](dist/ludi-ui-1.0.0-en.zip) · [SHA-256 校验值](dist/SHA256SUMS)。解压后即为完整 `ludi-ui` 目录。

## 接入不同 agent

支持 `SKILL.md` 的工具：选择一种语言，将对应的完整 `ludi-ui` 文件夹放入该工具实际支持的 skill 搜索目录，或通过其本地技能导入功能加载。搜索路径和自动发现行为以当前工具配置为准。不要只复制入口，也不要把两个同名版本同时装入同一搜索范围。

没有原生 skill 功能的工具：直接给出入口文件绝对路径，要求先读取入口，再按路由读取相关引用。例如：

```text
先读取 E:/dev/Ludi-ui/skills/zh-CN/ludi-ui/SKILL.md，按其中的工作流修改当前项目的用户管理页。
目标：筛选改为统一查询，保留既有 API、权限和视觉风格；完成代码后验证受影响的流程。
```

新建界面的调用示例：

```text
使用 ludi-ui 创建当前技术栈下的团队设置页，包含成员列表、邀请表单、加载/空/错状态。
优先复用现有组件和 token；先明确主要操作与状态，再实施并给出真实验证结果。
```

只审查时明确说“只读审查”；技能会给出有文件/行号证据的优先级问题。技能语言与产品文案语言相互独立，不能因为加载英文版就翻译产品界面。

`agents/openai.yaml` 是可选的宿主 UI 元数据；核心指令不依赖它。不支持自动加载引用的工具需要自行读取相对文件；缺少文件/浏览器能力时应披露验证局限。这里交付的是可移植文件协议，不宣称已经在所有 agent 产品中完成兼容实测。

## 工程结构

```text
skills/{zh-CN,en}/ludi-ui/
  SKILL.md                  触发边界、任务流程、场景路由
  manifest.json             版本、模块、规则 ID 与等级
  references/               8 个模块与来源修订，按需加载
  templates/                改动简报、知识模块模板
  agents/openai.yaml        可选展示元数据
docs/                       计划、扩展约定、验证报告
evals/                      行为案例与只读评估样例，不随运行包加载
tools/validate.mjs          零依赖结构与双语对齐校验
tests/validate.test.mjs     校验器的缺陷注入测试
```

模块包括：选择控件、浮层反馈、移动端、AI 聊天、数据后台、视觉系统、无障碍、工程实施。小任务只读取相关模块；不把全部知识拼成巨型系统提示词。

## 新知识如何加入

按[扩展约定](docs/EXTENDING.zh-CN.md)处理新笔记：归入已有模块或新增模块，编写有条件、有证据、有验收的规则，补齐双语、清单和路由后运行校验。稳定 ID 不因标题翻译或段落移动而变化。

[来源与修订](skills/zh-CN/ludi-ui/references/sources.md)映射了六份原稿，并解释为什么调整部分绝对规则。原稿保留在根目录；未提供视频作者/链接及版权授权信息，因此没有擅自替原稿指定开源许可证。

## 本地校验

仅维护工具需要 Node.js 20+；agent 读取技能不需要 Node 或 Python。在仓库根目录运行：

```powershell
node tools/validate.mjs
node --test tests/validate.test.mjs
```

校验一个已复制的独立包：

```powershell
node tools/validate.mjs --package "D:/my-skills/ludi-ui"
```

检查 frontmatter/清单一致、文件和相对链接、包内可达性、路由注册、规则 ID/等级、元数据及双语结构一致性。失败退出码为 1，命令用法错误为 2。校验器只支持本项目使用的简单单行 YAML 标量格式，不是通用 YAML/Markdown/外链检查器，不验证外链可用性、锚点或双语语义。

行为验收方式见 [evals/README.md](evals/README.md)，实际执行结果与未测试内容见[验证报告](docs/VALIDATION.md)。目录内提供的是运行包与维护材料；复制使用时只需要所选语言的 `ludi-ui` 文件夹。
