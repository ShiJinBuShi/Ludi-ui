# 来源与工程化修订

核对日期：2026-11-01。本技能综合用户提供的六份视频学习笔记，并补充工程指导。未提供原视频作者、链接、源码及测量材料。“183 项标准”“覆盖 90%”“步骤减少 58%”“提速 40%”等属于未经核实的原稿主张，不构成产品性能证据或效果承诺，也不表示本技能与相关公司存在隶属关系。

## 来源映射

原文件名作为来源标识保留，技能运行不依赖原稿文件。

| 来源 | 仓库根目录原稿 | 对应规则 |
| --- | --- | --- |
| S01 | 下拉组件选型与设计规范Skill.md | SEL-01–05；DATA-03 |
| S02 | 弹出层交互设计选型与避坑skill.md | OVR-01–05 |
| S03 | 移动端浮层组件开发规范Skill.md | MOB-01–04；OVR-02/04/05；A11Y-04 |
| S04 | 大厂AI界面设计规范skill.md | AI-01/02/04/05；VIS-01/02/04 |
| S05 | 大厂AI客户端UI质感优化Skill.md | VIS-01–05；AI-03；OVR-04 |
| S06 | 数据后台四刀优化法.md | DATA-01–05；SEL-05 |

ENG 规则、跨模块无障碍、异步归属、证据等级及双语/包维护为工程补充，不归因给未具名博主。模块 ID 与规则等级属于本项目的编写约定。

## 对原稿有意作出的修订

| 原稿建议 | 工程化解释及原因 |
| --- | --- |
| 禁用 outline，轻微阴影足够 | VIS-02 保留可见焦点及强制颜色模式，质感不能静默移除键盘操作线索 |
| 危险弹窗必须禁用 Esc | OVR-02 将 Esc 视为安全取消，与模态键盘指南一致；取消从不执行破坏操作 |
| 输入法结束后统一拦截 0.5 秒 Enter | AI-01 使用输入法状态与有证据的定向兼容，避免固定延迟吞掉有意发送 |
| 每个字符必须模糊动画 | AI-03/VIS-05 改为可选、有界、尊重减少动态效果，保留渲染与文字能力 |
| 固定字重、圆角、比例、数量、时长 | 按字体、几何、视口、延迟和任务决策，示例不升级为全局常量 |
| 所有表单必须自动保存；删除都可撤销 | OVR-03/05 要求真实的持久化/恢复能力和明确数据语义 |
| 超十项必须搜索；两项禁止 Select | SEL-02/03 按可发现性、空间与操作成本判断，不僵化按数量选型 |
| 电话号码用数字输入框 | SEL-02 保留字符串语义、前导零与国际区号 |
| 灯箱必须纯黑；禁止独立页面看图 | MOB-04 保留平台/产品选择及可访问操作 |
| 所有看板都加入对比、联动和导出 | DATA 按用户任务与服务能力引入，不编造数据或业务能力 |

## 一手参考与边界

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)：含适用范围和例外的规范性准则，本技能的针对性检查不是完整符合性评估。
- [APG 模态对话框](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)及[警报对话框](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/)：键盘、焦点和角色指南，警报对话框继承模态键盘行为。
- [APG Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)：自定义选择语义和键盘模型。
- [APG Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)与 [Window Splitter](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/)：带有状态说明的工作中模式，不能单独证明符合性。
- [UI Events](https://www.w3.org/TR/uievents/#events-compositionevents)：工作草案中的组合输入模型；真实浏览器/输入法序列仍需实测。
- [MDN isComposing](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/isComposing)及[减少动态效果](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)：平台行为与兼容参考，不规定产品统一时限。

新增规则应记录来源、适用条件、核对日期和不确定性。当前项目证据及一手实现/标准文档优先于无条件的“大厂标准”说法。
