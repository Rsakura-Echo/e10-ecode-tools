# E10 ecode 开发工具包

泛微 E10 ecode 低代码二开工具包 — 集成 **5 个 Claude Code Skill** + **26 篇前后端开发文档** + **82 模块 5700+ 篇实施文档语义搜索**，覆盖"配置查询 → 前端二开 → 后端二开 → 知识库维护"全流程。

**核心原则：能配置不二开，能前端不后端。**

## 使用前提

本工具包基于 Claude Code，使用 DeepSeek V4 Pro 作为后端模型。

### 1. 安装 Node.js（推荐 nvm）

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.zshrc
nvm install 23
nvm use 23
node --version   # 确认安装成功
```

### 2. 安装 Claude Code

```bash
npm install -g @anthropic-ai/claude-code
claude --version  # 确认安装成功
```

### 3. 配置 DeepSeek V4 Pro

创建或编辑 `~/.claude/settings.json`：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-你的deepseek-api-key",
    "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-v4-pro",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-v4-pro",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-v4-pro",
    "API_TIMEOUT_MS": "300000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"
  }
}
```

> DeepSeek API Key 在 https://platform.deepseek.com/api_keys 创建。

### 4. 验证

```bash
cd e10-ecode-tools
claude
```

进入 Claude Code 后，输入 `/help` 确认正常启动，然后直接描述你的 E10 开发需求。

## 快速开始

```bash
# 1. 克隆仓库
git clone https://github.com/Rsakura-Echo/e10-ecode-tools.git
cd e10-ecode-tools

# 2. 安装 Python 依赖（自动创建 venv）
bash setup.sh

# 3. 在工具包根目录启动 Claude Code
claude
```

Skill 首次搜索时会自动启动后台搜索服务（模型加载 ~7s），之后每次查询 <50ms。

> 所有 skill 和工具使用相对路径，**必须在工具包根目录下启动 Claude Code**。

## 五个 Skill

### 1. `ecode-lookup` — 功能配置字典

查系统有没有某个功能、在哪配置、怎么设置。纯配置查询，不涉及二开。

```
触发示例：
  "E10 有没有跨天排班功能"
  "工作流超时提醒在哪配置"
  "怎么设置表单字段查重"
```

**工作流**：语义搜索 5700+ 篇实施文档 → 返回配置入口路径 + 原始文档链接。

### 2. `ecode-developer` — 前端二开代码生成

根据需求直接生成完整 ecode 前端代码。支持组件复写、新页面开发、接口调用、ESB 动作流触发、Workflow JSSDK、EB dfpageSDK。

```
触发示例：
  "在流程提交按钮旁边加一个自定义按钮"
  "新建一个数据统计页面"
  "流程提交前校验表单日期字段"
  "EB 表格视图自定义列渲染"
```

**工作流**：分析需求 → 检索前端知识库 → 生成 entry.js + 组件 + CSS 完整代码。

### 3. `ecode-backend-developer` — 后端二开代码生成

根据需求直接生成完整 Java 后端代码。支持 API/SAPI 接口、ESB Action、数据库操作、缓存、消息队列、定时任务。

```
触发示例：
  "写一个查询用户信息的 API 接口"
  "新增一个 ESB 动作流 Action"
  "写一个每天早上8点执行的定时任务"
```

**工作流**：分析需求 → 检索后端知识库 → 生成完整 Java 代码 + Dubbo XML 配置。

### 4. `ecode-solution` — 完整需求实现

描述一个完整功能需求，自动判断实现方式，给出整合方案。

```
触发示例：
  "我想在 CRM 模块加一个客户跟进提醒功能"
  "怎么实现员工请假流程的重复日期校验"
```

**工作流**：需求拆解 → 查实施文档（能配置？）→ 查前端知识库（要二开？）→ 查后端项目（写代码？）→ 输出分层方案。

### 5. `ecode-knowledge-maintainer` — 知识库维护

用户提供 URL 或本地文件，自动入库并同步更新 skill 引用。

```
触发示例：
  "把这份文档加到知识库 https://xxx.com/doc.html"
  "把本地这个 PDF 入库 /path/to/file.pdf"
  "抓取 breadcrumb 组件的在线文档"
```

**工作流**：

```
URL  →  WebFetch 抓取  →  判断分类(frontend/backend/other)
文件 →  自动转 Markdown →  对比去重
                              ↓
                         写入 knowledge-base/
                              ↓
                         重建向量索引
                              ↓
                         检查并更新相关 skill 的引用表
```

## 内置工具

### 语义搜索

搜索 82 个模块 5700+ 篇泛微 E10 实施文档。基于 bge-small-zh-v1.5 (512维) 向量模型。

```bash
# 全局搜索
python3 tools/search_semantic.py "跨天排班" -n 10

# 限定模块搜索
python3 tools/search_semantic.py -m "工作流程" "审批超时" -n 5

# 仅列文件名
python3 tools/search_semantic.py -l "按钮复写"

# 启动搜索 HTTP 服务（推荐，首次加载 ~7s，之后每次 <50ms）
tools/venv/bin/python tools/search_server.py --port 9876 &

# 检查服务状态
curl localhost:9876/health
```

| 工具 | 用法 |
|------|------|
| `tools/search_semantic.py` | 语义搜索 CLI（自动优先走 HTTP 服务，服务未启动时回退直接模式） |
| `tools/search_server.py` | 搜索 HTTP 服务（`/search` 接口，JSON 格式） |

### 文档转换

```bash
# DOC/DOCX/PDF → Markdown
./tools/convert-doc.sh /path/to/document.docx

# 需要先安装 pandoc
brew install pandoc
```

### 文档抓取

```bash
# 抓取 E10 UI 组件在线文档（需要 Playwright）
pip3 install playwright && playwright install chromium

# 抓取单个组件
python3 tools/scrape_js_page.py --component breadcrumb --out doc/scraped/

# 批量抓取
python3 tools/scrape_js_page.py --urls urls.txt --out doc/scraped/
```

### 索引管理

```bash
# 重建向量索引（doc/texts/ 内容变更后）
tools/venv/bin/python tools/build_embeddings.py

# 从 HTML 导出包提取文本（批量导入官方文档时使用）
python3 tools/step1_extract.py   # ZIP → doc/extracted/
python3 tools/step2_extract_text.py  # HTML → doc/texts/

# 全文关键词搜索（SQLite FTS5，回退方案）
./tools/search-doc.sh "关键词"
```

## 知识库结构

```
knowledge-base/
├── frontend/                    # 前端二开文档 (01-26)
│   ├── 01-ecode-overview.md     # 平台概述
│   ├── 02-project-structure.md  # 项目结构、入口文件
│   ├── 03-component-override.md # 组件复写
│   ├── 04-new-page-development.md # 新页面开发
│   ├── 05-api-request.md        # 接口请求
│   ├── 06-utils-library.md      # @weapp/utils 工具库
│   ├── 07-ui-components.md      # UI 组件库参考
│   ├── 08-esb-serverless.md     # ESB 动作流
│   ├── cases/                    # 真实案例库
│   ├── 19-frontend-module-system.md # 模块系统
│   ├── 20-frontend-plugins-controls.md # 公共插件、调试
│   ├── 25-workflow-js-sdk.md    # 流程详情 JS-SDK
│   └── 26-eb-dfpage-sdk.md      # EB 表单 dfpageSDK
├── backend/                     # 后端二开文档 (10-22)
│   ├── 10-backend-overview.md   # 后端概述
│   ├── 11-backend-api-controller.md # API/SAPI 接口
│   ├── 12-backend-database.md   # 数据库操作
│   ├── 13-backend-esb-action.md # ESB Action 开发
│   ├── 14-backend-cache.md      # 缓存
│   ├── 15-backend-mq.md         # 消息队列
│   ├── 16-backend-scheduler.md  # 定时任务
│   ├── 17-backend-config.md     # 配置管理
│   ├── 18-backend-rpc.md        # RPC/SAPI 调用
│   ├── 21-backend-openplatform-utils.md # 开放平台
│   └── 22-backend-debug-monitor.md # 调试监控
└── other/                       # 其他文档
    ├── 09-troubleshooting-guide.md # 排查手册
    ├── 23-custom-browser-button.md # 自定义浏览按钮
    └── 24-version-history.md       # 版本历史
```

## 目录结构

```
e10-ecode-tools/
├── .claude-plugin/plugin.json    # CC 插件元数据
├── .claude/skills/               # 5 个 skill 定义
│   ├── ecode-lookup/
│   ├── ecode-developer/
│   ├── ecode-backend-developer/
│   ├── ecode-solution/
│   └── ecode-knowledge-maintainer/
├── knowledge-base/               # 前后端开发文档（grep 检索）
│   ├── frontend/
│   ├── backend/
│   ├── other/
│   └── README.md
├── doc/
│   ├── texts/                    # 5700+ 纯文本（语义搜索源）
│   ├── embeddings.npy            # 预构建向量索引 (12MB)
│   └── files.json                # 文件路径映射
├── tools/                        # Python/Bash 工具脚本
│   ├── search_semantic.py        # 语义搜索 CLI
│   ├── search_server.py          # 搜索 HTTP 服务
│   ├── build_embeddings.py       # 重建向量索引
│   ├── extract_texts.py          # HTML → 纯文本提取
│   ├── scrape_js_page.py         # JS 动态页面抓取
│   ├── convert-doc.sh            # 文档格式转换
│   ├── search-doc.sh             # 关键词搜索 (FTS5)
│   └── requirements.txt          # Python 依赖
├── CLAUDE.md                     # Claude Code 项目指令
├── setup.sh                      # 一键安装脚本
└── README.md                     # 本文件
```

## 技术栈

| 层 | 技术 |
|----|------|
| 前端二开 | React 17, react-router-dom 5, mobx 4, axios, @weapp/ui, @weapp/utils, @weapp/ecodesdk |
| 后端二开 | Java, SpringBoot, SpringCloud, Dubbo, Nacos, Redis |
| 语义搜索 | Python, SentenceTransformers, bge-small-zh-v1.5 (512维), Flask |

## 维护与更新

工具包支持持续更新知识库。三种方式：

1. **URL 入库**：给 `ecode-knowledge-maintainer` skill 一个网址，自动抓取分类入库
2. **本地文件**：给 skill 一个本地 doc/pdf/md 文件路径，自动转换入库
3. **批量导入**：将官方 HTML 文档 ZIP 放入 `doc/html版/`，执行 `step1 → step2 → build_embeddings`

每次入库后自动：
- 更新 `knowledge-base/` 对应文档
- 重建向量索引
- 同步更新相关 skill 的文件引用表

## License

MIT
