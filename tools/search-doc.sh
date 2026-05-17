#!/bin/bash
# 泛微 E10 知识库命令行搜索工具（语义搜索 + FTS5 回退）
# 用法: ./tools/search-doc.sh "排班"
#      ./tools/search-doc.sh -l "排班"         # 仅列出文件名
#      ./tools/search-doc.sh -n 20 "排班"      # 显示前20条
#      ./tools/search-doc.sh -f "排班"         # FTS5 精确匹配回退
#      ./tools/search-doc.sh -m "CRM" "客户"   # 限定模块搜索

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
KB_DIR="$PROJECT_DIR/knowledge-base"
INDEX_DB="$PROJECT_DIR/doc/kb_index.db"
VENV_PYTHON="$PROJECT_DIR/tools/venv/bin/python"
SEARCH_PY="$PROJECT_DIR/tools/search_semantic.py"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

limit=10
list_only=false
use_fts5=false
module_filter=""

usage() {
    echo "用法: $0 [选项] <关键词>"
    echo ""
    echo "选项:"
    echo "  -l           仅列出命中的文件名和模块"
    echo "  -n N         显示前 N 条结果（默认 10）"
    echo "  -f           使用 FTS5 精确匹配（回退模式）"
    echo "  -m MODULE    限定搜索模块"
    echo "  -h           显示此帮助"
    echo ""
    echo "示例:"
    echo "  $0 排班                        # 语义搜索"
    echo "  $0 -l 排班                     # 仅列文件名"
    echo "  $0 -n 20 跨天排班              # 显示前20条"
    echo "  $0 -f 排班                     # FTS5 精确匹配"
    echo "  $0 -m \"CRM\" 客户               # 限定模块"
    exit 0
}

while getopts "ln:fm:h" opt; do
    case $opt in
        l) list_only=true ;;
        n) limit="$OPTARG" ;;
        f) use_fts5=true ;;
        m) module_filter="$OPTARG" ;;
        h) usage ;;
        *) usage ;;
    esac
done
shift $((OPTIND - 1))

if [ $# -eq 0 ]; then
    usage
fi

query="$1"

echo -e "${BOLD}${CYAN}════════════════════════════════════════════════════════${NC}"
echo -e "${BOLD}${CYAN}  E10 知识库检索: ${YELLOW}$query${NC}"
if [ -n "$module_filter" ]; then
    echo -e "${BOLD}${CYAN}  限定模块: ${YELLOW}$module_filter${NC}"
fi
echo -e "${BOLD}${CYAN}════════════════════════════════════════════════════════${NC}"
echo ""

# ---- 语义搜索 (主) ----
if ! $use_fts5; then
    echo -e "${GREEN}▸ 语义搜索 (doc/texts/) ...${NC}"

    if [ -x "$VENV_PYTHON" ] && [ -f "$SEARCH_PY" ]; then
        # 构建参数数组（避免 eval 注入风险）
        args=(-n "$limit")
        $list_only && args+=(-l)
        [ -n "$module_filter" ] && args+=(-m "$module_filter")
        args+=("$query")

        if "$VENV_PYTHON" "$SEARCH_PY" "${args[@]}" 2>/dev/null; then
            true
        else
            echo -e "  ${RED}语义搜索服务未启动，使用 -f 回退 FTS5${NC}"
            echo ""
            use_fts5=true
        fi
    else
        echo -e "  ${RED}语义搜索未安装 (venv 缺失)，使用 FTS5 回退${NC}"
        echo ""
        use_fts5=true
    fi
    echo ""
fi

# ---- FTS5 回退 ----
if $use_fts5 && [ -f "$INDEX_DB" ]; then
    echo -e "${GREEN}▸ FTS5 精确搜索 ...${NC}"

    result=$(sqlite3 "$INDEX_DB" \
        "SELECT module, filepath, substr(content, 1, 300)
         FROM docs WHERE content LIKE '%$query%'
         LIMIT $limit;" 2>/dev/null || true)

    if [ -n "$result" ]; then
        count=$(echo "$result" | grep -c '|' || echo 0)
        echo -e "${YELLOW}  找到 $count 条匹配${NC}"
        echo ""

        if $list_only; then
            echo "$result" | while IFS='|' read -r mod path snippet; do
                echo -e "  ${CYAN}[$mod]${NC} $path"
            done
        else
            idx=1
            echo "$result" | while IFS='|' read -r mod path snippet; do
                echo -e "  ${BOLD}[$idx]${NC} ${CYAN}[$mod]${NC}"
                echo -e "      文件: $path"
                clean=$(echo "$snippet" | sed 's/>>>/\x1b[1;33m/g; s/<<</\x1b[0m/g')
                echo -e "      片段: $clean"
                echo ""
                idx=$((idx+1))
            done
        fi
    else
        echo -e "  ${RED}FTS5 索引中未找到匹配${NC}"
    fi
    echo ""
fi

# ---- knowledge-base/ grep 搜索 ----
if [ -d "$KB_DIR" ]; then
    echo -e "${GREEN}▸ 搜索 knowledge-base/ ...${NC}"
    results=$(grep -rni --color=always "$query" "$KB_DIR/" --include="*.md" 2>/dev/null | head -5 || true)

    if [ -n "$results" ]; then
        kb_count=$(echo "$results" | wc -l | tr -d ' ')
        echo -e "${YELLOW}  找到 $kb_count 条匹配${NC}"
        echo ""

        if ! $list_only; then
            prev_file=""
            echo "$results" | while IFS=: read -r file line content; do
                rel=$(echo "$file" | sed "s|$PROJECT_DIR/||")
                if [ "$file" != "$prev_file" ]; then
                    echo -e "  ${BOLD}${CYAN}  $rel${NC}"
                    prev_file="$file"
                fi
                echo -e "     ${GREEN}行 $line:${NC} $content"
            done
        fi
    else
        echo -e "  ${RED}未找到匹配${NC}"
    fi
    echo ""
fi

echo -e "${BOLD}${CYAN}════════════════════════════════════════════════════════${NC}"
if ! $use_fts5; then
    echo -e "${BOLD}提示:${NC} 使用 ${YELLOW}-f${NC} 回退 FTS5 精确匹配  |  ${YELLOW}-m${NC} 限定模块"
else
    echo -e "${BOLD}提示:${NC} 启动搜索服务以获得语义检索: ${YELLOW}tools/venv/bin/python tools/search_server.py &${NC}"
fi
