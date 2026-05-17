---
name: ecode-solution
description: 泛微 E10 完整需求实现。用户描述一个完整的功能需求，自动判断实现方式（配置 > 前端二开 > 后端二开），给出整合方案。触发场景："帮我做一个XX功能"、"我想在XX模块加一个XX"、"怎么实现XX需求"等。
type: project
---

# 泛微 E10 完整需求实现

## 三级能力栈

| 优先级 | 知识源 | 检索方式 | 能力 |
|--------|--------|----------|------|
| 1️⃣ | `doc/texts/`（实施文档） | 语义向量搜索 | 系统自带功能？配置入口、操作步骤 |
| 2️⃣ | `knowledge-base/frontend/` `knowledge-base/backend/`（二开文档） | Grep | 前端：组件复写、新页面、ESB动作流、API调用；后端：API/SAPI、数据库、缓存等 |
| 3️⃣ | `secondev/workspace/`（后端项目） | Grep Java | API/SAPI 接口、ESB Action、数据库操作 |

## 核心原则

**能配置不二开，能前端不后端。**

```
需求 → 查实施文档 → 配置能搞定？→ 给配置方案 ✅
                    ↓ 不够
                  查前端知识库 → 复写/新页面/ESB够？→ 给前端方案 🛠
                    ↓ 不够
                  查后端项目 → 写 Java → 给后端方案 🔧
```

## 执行流程

### 第一步：需求拆解
把用户需求拆成子需求：
- 数据录入 / 流程审批 / 列表展示 / 报表统计 / 消息通知 / 权限控制 / 外部集成

### 第二步：三级检索

**1️⃣ 实施配置**
```bash
python3 tools/search_semantic.py "关键词" -n 10
```
→ 系统自带？给配置方案 + 入口路径
→ 如需限定模块：`python3 tools/search_semantic.py -m "模块名" "关键词"`

**2️⃣ 前端二开（配置不够时）**
```bash
grep -rni "关键词" knowledge-base/frontend/ --include="*.md"
grep -rni "关键词" knowledge-base/other/ --include="*.md"
```
关键参考：
- `frontend/03-component-override.md` / `frontend/04-new-page-development.md` / `frontend/05-api-request.md`
- `frontend/08-esb-serverless.md` / `frontend/10-real-world-patterns.md`（实战案例）
- `frontend/19-frontend-module-system.md`（模块系统）/ `frontend/20-frontend-plugins-controls.md`（公共插件/调试）
- `frontend/25-workflow-js-sdk.md`（流程详情 SDK）/ `frontend/26-eb-dfpage-sdk.md`（EB 表单建模 SDK）

**3️⃣ 后端二开（前端不够时）**
```bash
grep -rni "关键词" knowledge-base/backend/ --include="*.md"
grep -rni "关键词" secondev/workspace/ --include="*.java"
```

### 第三步：输出整合方案
```
## 需求分析
[需求拆解]

## 方案总览
| 子需求 | 实现方式 | 说明 |
|--------|----------|------|
| XXX | ✅ 配置 | 入口：xxx |
| YYY | 🛠 前端二开 | 复写组件 xxx |
| ZZZ | 🔧 后端二开 | 新建 API xxx |

## 配置实现
[步骤 + 入口 + 原始 HTML: `doc/extracted/{模块名}/data/{文档ID}.html`]

## 前端二开实现（如有）
[完整代码 + 参考案例]

## 后端二开实现（如有）
[完整代码 + 接口规范]

## 参考来源
[所有引用的文档和代码位置 + 原始 HTML 路径（浏览器查看截图）]
```
