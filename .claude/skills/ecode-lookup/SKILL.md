---
name: ecode-lookup
description: 泛微 E10 功能配置字典。仅检索实施知识库，回答系统功能、配置入口、操作步骤。触发场景："有没有XX功能"、"XX在哪配置"、"XX怎么设置"、"XX的入口在哪"。纯配置查询，不涉及二开。
type: project
---

# 泛微 E10 功能配置字典

## 知识源

检索 `doc/texts/` 下 **85 个模块 / 6208 篇文档**，通过语义向量索引（bge-small-zh-v1.5, 512维）。

不涉及 `knowledge-base/`（前端二开）和 `secondev/`（后端项目，已移至 `/Users/sakura/work/secondev/`）。

## 前置条件

搜索服务须已启动（Claude Code 会话开始时自动检查）：
```bash
# 检查服务是否存活
curl -s localhost:9876/health || tools/venv/bin/python tools/search_server.py --port 9876 &
```

## 执行流程（最多 2 轮）

### 第 1 轮：语义搜索（合并为一次并行）

根据用户关键词，查映射表获得模块名，发起语义搜索：

```bash
# 主搜索：在主要目标模块内搜索
python3 tools/search_semantic.py -m "模块名" "关键词" -n 5

# 如果有关联模块，同步搜索（并行执行）
python3 tools/search_semantic.py -m "关联模块名" "关键词" -n 5
```

**如果没有明确的模块映射，直接用全局搜索：**
```bash
python3 tools/search_semantic.py "关键词" -n 10
```

### 关键词 → 模块 filepath 映射

| 用户关键词 | 模块名 (用于 -m 过滤) |
|-----------|---------------------|
| EB表单 / ebuilder / 建模 / 低代码 / 页面设计器 | `低代码平台e-builder` |
| 表单 / 表单引擎 / 字段 / 明细表 | `表单引擎` |
| 流程 / 工作流 / 审批 | `工作流程` |
| 公文 | `公文管理` |
| 排班 / 值班 | `值班值守` |
| 出勤 / 考勤 | `出勤` |
| 权限 | `权限管理中心` |
| ESB / 接口 / 集成 / 连接器 | `ESB中心` |
| 门户 | `门户引擎` |
| 人事 / 入职 / 组织 | `人事档案` |
| CRM / 客户 / 商机 / 线索 | `CRM` |

### 第 2 轮：深度阅读（按需）
仅当第 1 轮摘要不足以回答时，Read 对应文档全文。

**文本内容：** `doc/texts/{模块名}/data/{文档ID}.html.txt`
**原始 HTML（含截图，浏览器打开）：** `doc/extracted/{模块名}/data/{文档ID}.html`

### 回答格式（严格简洁）
```
## 是否有此功能
[有/没有/需要二开，一句话]

## 配置入口
[菜单路径，1-2 句话]

## 参考文档
（每行一条，方便逐行复制）

file:///Users/sakura/work/E10/doc/extracted/{模块名}/data/{文档ID}.html  — {内容说明}
file:///Users/sakura/work/E10/doc/extracted/{模块名}/data/{文档ID}.html  — {内容说明}
```

参考文档**必须**使用 `file://` 绝对路径格式，每行一条，不嵌套在表格中。用户可直接逐行复制，浏览器打开可查看含截图的完整文档。

禁止输出：模块名、功能说明、使用场景、代码示例、二开建议。

### 诚实原则
- 找不到 → "当前实施文档中未找到关于 [XXX] 的内容"
- 不编造菜单路径
