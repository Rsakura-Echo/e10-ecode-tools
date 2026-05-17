#!/bin/bash
# E10 ecode 开发工具包 — 安装脚本
# 用法: bash setup.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "================================================"
echo "  E10 ecode 开发工具包 v1.0.0"
echo "================================================"
echo ""

# 1. 检查 Python
echo "[1/4] 检查 Python 环境..."
if command -v python3 &>/dev/null; then
    PYTHON=python3
elif command -v python &>/dev/null; then
    PYTHON=python
else
    echo "错误: 未找到 Python，请安装 Python 3.9+"
    exit 1
fi
echo "  Python: $($PYTHON --version)"

# 2. 创建虚拟环境
echo "[2/4] 创建虚拟环境..."
VENV_DIR="$SCRIPT_DIR/tools/venv"
if [ ! -d "$VENV_DIR" ]; then
    $PYTHON -m venv "$VENV_DIR"
    echo "  虚拟环境已创建: $VENV_DIR"
else
    echo "  虚拟环境已存在，跳过"
fi

# 3. 安装依赖
echo "[3/4] 安装 Python 依赖..."
"$VENV_DIR/bin/pip" install -r "$SCRIPT_DIR/tools/requirements.txt" -q
echo "  依赖安装完成"

# 4. 首次构建索引（如果尚未构建）
echo "[4/4] 检查搜索索引..."
if [ ! -f "$SCRIPT_DIR/doc/embeddings.npy" ]; then
    echo "  构建向量索引（首次需要下载模型 ~95MB，约2分钟）..."
    "$VENV_DIR/bin/python" "$SCRIPT_DIR/tools/build_embeddings.py"
else
    echo "  索引已存在: $(du -sh "$SCRIPT_DIR/doc/embeddings.npy" | cut -f1)"
fi

echo ""
echo "================================================"
echo "  安装完成！"
echo ""
echo "  启动搜索服务:"
echo "    $VENV_DIR/bin/python $SCRIPT_DIR/tools/search_server.py --port 9876 &"
echo ""
echo "  测试搜索:"
echo "    $VENV_DIR/bin/python $SCRIPT_DIR/tools/search_semantic.py \"排班\""
echo "================================================"
