---
name: ecode-knowledge-maintainer
description: 泛微 E10 知识库维护。当用户需要更新 knowledge-base/ 文档时使用 — 包括用户提供URL/本地文件自动入库、抓取在线组件文档、更新已有内容、重建搜索索引。触发场景："更新知识库"、"新增文档"、"抓取组件文档"、"重建索引"、"这份新文档加到知识库"、"把这个网址的内容入库"。
type: project
---

# E10 ecode 知识库维护

## 概述

此技能用于维护 `knowledge-base/` 下的 Markdown 技术文档和 `doc/texts/` + `doc/embeddings.npy` 语义向量索引。

**核心能力：用户给一个 URL 或本地文件，自动完成分类→转换→入库→重建索引→同步更新 skill 的全流程。**

## 知识库结构

```
knowledge-base/
├── frontend/   → 前端开发文档（平台概述、组件复写、页面开发、模块系统、SDK等）
├── backend/    → 后端开发文档（API、数据库、ESB、缓存、消息队列等）
├── other/      → 问题排查、版本历史等其他文档
├── README.md   → 索引
```

**目录语义**：

| 目录 | 内容范围 | 涉及 skill |
|------|---------|-----------|
| `frontend/` | ecode 前端二开（JS/React/SDK） | `ecode-developer`、`ecode-solution` |
| `backend/` | ecode 后端二开（Java/SpringBoot） | `ecode-backend-developer`、`ecode-solution` |
| `other/` | 跨端/通用/元信息 | 不绑定特定 skill |

## 知识源三层架构

```
第一层：knowledge-base/ (SKILL.md 引用的核心开发文档)
         ↑ grep 检索
第二层：doc/texts/ + doc/embeddings.npy (语义向量搜索)
         ↑ search_semantic.py
第三层：doc/extracted/ (原始 HTML，含截图，浏览器查看)
```

---

## 执行流程

### 入口判断

根据用户输入类型选择流程：

| 输入类型 | 特征 | 走哪个流程 |
|---------|------|-----------|
| **URL** | `http://` 或 `https://` 开头 | → 流程 A：URL 入库 |
| **本地文件** | 文件路径，`.md`/`.doc`/`.docx`/`.pdf`/`.html` | → 流程 B：本地文件入库 |
| **weapp.eteams.cn 组件页** | URL 含 `weapp.eteams.cn/ui/` | → 流程 C：组件文档抓取 |
| **HTML 导出包 (ZIP)** | `.zip` 文件，内含 HTML | → 流程 D：批量导入 |
| **纯文本/口述** | 用户直接描述内容 | → 流程 E：手动录入 |

---

### 流程 A：URL 入库（用户给网址）

**适用**：泛微官方文档、技术博客、API 参考等任何网页。

#### 第 1 步：抓取内容

使用 Claude Code 内置 WebFetch 抓取网页内容：

```
WebFetch(url, prompt="提取页面中的全部技术文档内容，包括代码示例、API说明、配置步骤。保留标题层级结构。")
```

**注意**：
- 如果一次抓取不完整（内容过长），分页或分段抓取
- 如果页面需要 JS 渲染，使用 `tools/scrape_js_page.py` 替代

#### 第 2 步：判断内容分类

分析抓取到的内容，判断属于哪个目录：

| 内容特征 | 分类 | 示例 |
|---------|------|------|
| React/JS/前端 SDK/组件/页面/路由 | `frontend/` | 流程 JS-SDK、UI 组件库、ecode 前端 |
| Java/SpringBoot/API/数据库/ESB | `backend/` | 后端接口、ESB Action、定时任务 |
| 问题排查/版本/浏览器兼容 | `other/` | 故障手册、版本历史 |

**不确定时直接问用户选哪个分类。**

#### 第 3 步：对比现有知识库（去重）

在对应分类目录下用 grep 搜索关键术语，确认是否已有覆盖：

```bash
grep -rni "关键术语" knowledge-base/前端或后端或other/ --include="*.md"
```

**去重判断**：
- 高度重叠且无新信息 → **放弃，告知用户已有**
- 新内容更准确/更完整 → **替换旧章节**
- 全新内容 → **创建新文件或章节**

#### 第 4 步：写入 knowledge-base/

**创建新文件时**：
- 文件名：`knowledge-base/{分类}/{序号}-{英文名}.md`（序号取该目录最大值+1）
- 格式遵循现有文档风格：`##` 标题、代码块标注语言、表格清晰
- 尾部追加：`> 更新于 YYYY-MM-DD，来源：[URL]`

**补充已有文件时**：
- 在对应文件中追加 `###` 子章节
- 如果内容修正了旧内容，直接替换并标注

#### 第 5 步：同步更新 doc/texts/（如需搜索覆盖）

如果新内容有独立价值需要被语义搜索覆盖：

1. 将 Markdown 保存一份纯文本副本到 `doc/texts/{分类}/data/{文件名}.md.txt`
2. 重建向量索引：
```bash
tools/venv/bin/python tools/build_embeddings.py
```

**如果只是小补充，不需要这步。** 只有独立成篇的新文档才加入搜索索引。

#### 第 6 步：同步更新 skill 文件

检查新文档是否影响现有 skill。根据分类：

| 分类 | 需检查的 skill |
|------|---------------|
| `frontend/` | `ecode-developer`、`ecode-solution` |
| `backend/` | `ecode-backend-developer`、`ecode-solution` |
| `other/` | 通常不需要更新 skill |

**检查方式**：读取对应 skill 的 SKILL.md，看"核心文件速查"表格是否缺少新文档。如果缺少，添加一行。

**更新格式**：遵循 skill 表格格式，例如：
```markdown
| `knowledge-base/frontend/27-xxx.md` | 内容说明 |
```

---

### 流程 B：本地文件入库

**适用**：用户提供 `.md` / `.doc` / `.docx` / `.pdf` / `.html` 文件路径。

#### 第 1 步：格式识别与转换

```bash
# 识别文件类型
file --mime-type "用户提供的文件路径"
```

| 格式 | 转换方式 |
|------|---------|
| `.md` | 直接阅读，无需转换 |
| `.doc` / `.docx` | `pandoc input.docx -t gfm -o output.md` 或 `./tools/convert-doc.sh input.doc` |
| `.pdf` | `pandoc input.pdf -t gfm -o output.md`（需 LaTeX）或用 WebFetch 处理 |
| `.html` | 用 Python 提取文本：`python3 -c "from tools.extract_texts import extract_text_from_html; ..."` |

#### 第 2-6 步

同流程 A 的第 2-6 步（分类 → 去重 → 写入 → 重建索引 → 更新 skill）。

---

### 流程 C：weapp.eteams.cn 组件文档抓取

**适用**：E10 UI 组件库在线文档。

```bash
# 抓取单个组件文档
python3 tools/scrape_js_page.py --component breadcrumb --out doc/scraped/

# 批量抓取（URL 列表文件，每行一个）
python3 tools/scrape_js_page.py --urls urls.txt --out doc/scraped/
```

抓取后，内容通常合并到 `knowledge-base/frontend/07-ui-components.md` 的对应组件章节下。然后走流程 A 的第 5-6 步。

**需要先安装 Playwright（仅首次）**：
```bash
pip3 install playwright && playwright install chromium
```

---

### 流程 D：HTML 导出包批量导入

**适用**：泛微官方提供的 HTML 文档 ZIP 包。

```bash
# 1. 解压
python3 tools/step1_extract.py  # ZIP → doc/extracted/

# 2. HTML → 纯文本
python3 tools/step2_extract_text.py  # → doc/texts/

# 3. 重建向量索引
tools/venv/bin/python tools/build_embeddings.py
```

**注意**：
- 这是重型操作，仅官方文档大版本更新时才需要
- `step2_extract_text.py` 中的路径是硬编码的，其他机器上需修改或使用 `tools/extract_texts.py` 替代
- 批量导入后需要检查 knowledge-base/ 的 README.md 是否需要更新模块列表

---

### 流程 E：手动录入

用户口述或粘贴内容。直接按流程 A 的第 2-6 步执行（跳过抓取）。

---

## 更新后验证

每次入库后验证：

```bash
# 1. 验证语义搜索能查到新内容
python3 tools/search_semantic.py "新文档的关键词" -n 3

# 2. 验证 grep 能查到
grep -rni "关键术语" knowledge-base/ --include="*.md"

# 3. 如涉及 skill 更新，检查 skill 文件中新文档路径是否正确
grep "新文件名" .claude/skills/*/SKILL.md
```

---

## Skill 引用关系速查

更新 knowledge-base 后，按此表检查需要更新哪些 skill：

| knowledge-base 变更 | 需检查的 skill |
|---------------------|---------------|
| `frontend/` 新增/修改 | `ecode-developer`（核心文件速查表）、`ecode-solution`（检索命令 + 参考列表） |
| `backend/` 新增/修改 | `ecode-backend-developer`（核心文件速查表）、`ecode-solution`（检索命令 + 参考列表） |
| `other/` 新增/修改 | 通常不需要，除非新文档是开发参考 |
| README.md | 每次新增/修改文件后更新 |

---

## 其他常用操作

| 操作 | 命令 |
|------|------|
| 语义搜索 | `python3 tools/search_semantic.py "关键词" -n 10` |
| 模块限定搜索 | `python3 tools/search_semantic.py -m "模块名" "关键词"` |
| 全文搜索知识库 | `./tools/search-doc.sh "关键词"` |
| 转换文档格式 | `./tools/convert-doc.sh <文件>` |
| 重建向量索引 | `tools/venv/bin/python tools/build_embeddings.py` |
| 启动搜索服务 | `tools/venv/bin/python tools/search_server.py --port 9876 &` |
| 检查搜索服务 | `curl -s localhost:9876/health` |

## 注意事项

1. **去重优先**：入库前必须用 grep 搜索已有内容，避免重复
2. **分类准确**：不确定时问用户，不要猜
3. **增量更新**：如果只加了一篇新文档到 `doc/texts/`，不需要全量重建——但当前工具只支持全量重建（约 2 分钟），少量更新可以接受
4. **skill 更新要及时**：新文档入库后立即检查并更新相关 skill，否则 skill 不会引用新内容
5. **原始来源保留**：每篇入库文档尾部标注来源 URL 或文件路径，方便溯源
6. **截图不可丢**：`doc/extracted/` 的 HTML 包含截图，是用户验证配置的关键视觉参考，不要删除
7. **LLM Wiki 桌面应用**（`/Applications/LLM Wiki.app`）可用于可视化浏览知识图谱
