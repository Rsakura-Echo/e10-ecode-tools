# CLAUDE.md

## 项目说明

此目录为泛微 E10 ecode 开发工具包，包含前后端开发知识库、语义搜索和 5 个开发 skill。

**所有 skill 和工具使用相对路径，请在工具包根目录下启动 Claude Code。**

## 可用技能

| 技能 | 用途 |
|------|------|
| `ecode-lookup` | 功能配置字典 — 查系统有没有XX功能、在哪配置、怎么设置（纯配置） |
| `ecode-developer` | 前端二开需求 → 生成完整 ecode 前端代码（组件复写、新页面、SDK） |
| `ecode-backend-developer` | 后端二开需求 → 生成完整 Java 代码（API、ESB Action、定时任务等） |
| `ecode-solution` | 完整需求实现 → 配置优先 > 前端二开 > 后端二开（全栈） |
| `ecode-knowledge-maintainer` | 知识库维护 → URL/本地文件自动入库，同步更新 skill 引用 |

## 知识库

```
knowledge-base/
├── frontend/   # 01-26：前端开发（概述 → SDK）
├── backend/    # 10-22：后端开发（概述 → 调试）
├── other/      # 09-24：排查手册、版本历史
└── README.md   # 完整索引
```

## 语义搜索

搜索 82 模块 5700+ 篇实施文档：

```bash
python3 tools/search_semantic.py "关键词" -n 10          # 全局搜索
python3 tools/search_semantic.py -m "模块名" "关键词"     # 限定模块
```

建议启动搜索服务：
```bash
tools/venv/bin/python tools/search_server.py --port 9876 &
```

## 知识库工具

| 工具 | 用法 |
|------|------|
| `search_semantic.py` | `python3 tools/search_semantic.py "关键词"` |
| `search-doc.sh` | `./tools/search-doc.sh "关键词"` |
| `convert-doc.sh` | `./tools/convert-doc.sh <文件>` |
| `build_embeddings.py` | `tools/venv/bin/python tools/build_embeddings.py` |

## 项目空间

| 目录 | 用途 |
|------|------|
| `/Users/sakura/work/secondev/workspace/frontend-projects/` | 前端二开子项目（独立目录） |
| `/Users/sakura/work/secondev/workspace/secondev-2601/` | 后端二开 Gradle 项目（独立目录） |

> `secondev/` 已移出为 E10 的同级独立目录 `/Users/sakura/work/secondev/`。
> `doc/extracted/`（11GB 原始 HTML）不随插件分发。
