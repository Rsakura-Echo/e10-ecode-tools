#!/bin/bash
# 泛微实施文档格式转换工具
# 将 HTML/DOC 文件转换为 Markdown，适合导入知识库
#
# 用法:
#   ./tools/convert-doc.sh ./doc/实施文档.html          # 单个文件
#   ./tools/convert-doc.sh --batch ./raw-docs/ ./kb/    # 批量转换目录

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

convert_file() {
    local input="$1"
    local output="${2:-${input%.*}.md}"

    if [ ! -f "$input" ]; then
        echo -e "${RED}文件不存在: $input${NC}"
        return 1
    fi

    local ext="${input##*.}"
    local tmp=""

    echo -e "${YELLOW}转换: $input → $output${NC}"

    case "$ext" in
        html|htm)
            # HTML → Markdown (pandoc 原生支持)
            pandoc "$input" -f html -t gfm --wrap=none -o "$output" \
                && echo -e "${GREEN}  ✓ HTML → Markdown 完成${NC}"
            ;;
        doc)
            # DOC → DOCX → Markdown (需 LibreOffice)
            echo -e "${YELLOW}  ⚠ DOC 为旧版二进制格式，正在用 textutil 转换...${NC}"
            # macOS 自带 textutil，可处理 .doc
            tmp="${input}.tmp.txt"
            textutil -convert txt "$input" -output "$tmp" 2>/dev/null \
                && mv "$tmp" "$output" \
                && echo -e "${GREEN}  ✓ DOC → Markdown 完成${NC}" \
                || echo -e "${RED}  ✗ 转换失败，请尝试用 Word 另存为 .docx 格式${NC}"
            ;;
        docx)
            # DOCX → Markdown (pandoc 原生支持)
            pandoc "$input" -f docx -t gfm --wrap=none -o "$output" \
                && echo -e "${GREEN}  ✓ DOCX → Markdown 完成${NC}"
            ;;
        pdf)
            # PDF → Markdown (pandoc + pdftotext)
            echo -e "${YELLOW}  ⚠ PDF 转换可能丢失格式...${NC}"
            pandoc "$input" -f pdf -t gfm --wrap=none -o "$output" 2>/dev/null \
                && echo -e "${GREEN}  ✓ PDF → Markdown 完成${NC}" \
                || {
                    # 尝试 pdftotext 作为备选
                    tmp="${input}.tmp.txt"
                    pdftotext "$input" "$tmp" 2>/dev/null \
                        && mv "$tmp" "$output" \
                        && echo -e "${GREEN}  ✓ PDF → 纯文本完成（建议人工补充标题结构）${NC}" \
                        || echo -e "${RED}  ✗ 转换失败${NC}"
                }
            ;;
        *)
            echo -e "${RED}不支持的格式: $ext${NC}"
            echo "支持的格式: html, doc, docx, pdf"
            return 1
            ;;
    esac
}

case "${1:-}" in
    --batch|-b)
        src_dir="${2:-.}"
        out_dir="${3:-./kb-output}"
        if [ ! -d "$src_dir" ]; then
            echo -e "${RED}源目录不存在: $src_dir${NC}"
            exit 1
        fi
        mkdir -p "$out_dir"
        find "$src_dir" -type f \( -name "*.html" -o -name "*.htm" -o -name "*.doc" -o -name "*.docx" -o -name "*.pdf" \) | while read -r f; do
            rel="${f#$src_dir/}"
            out="$out_dir/${rel%.*}.md"
            mkdir -p "$(dirname "$out")"
            convert_file "$f" "$out"
        done
        echo ""
        echo -e "${GREEN}批量转换完成！输出目录: $out_dir${NC}"
        ;;
    -h|--help)
        echo "用法:"
        echo "  $0 <文件>               转换单个文件"
        echo "  $0 --batch <源目录> <输出目录>  批量转换目录"
        echo ""
        echo "支持格式: HTML, DOC, DOCX, PDF"
        echo "输出格式: Markdown (GitHub Flavored)"
        ;;
    *)
        if [ $# -eq 0 ]; then
            echo "用法: $0 <文件>  或  $0 --batch <源目录> <输出目录>"
            exit 1
        fi
        convert_file "$1" "${2:-}"
        ;;
esac
