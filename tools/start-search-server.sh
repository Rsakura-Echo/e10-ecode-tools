#!/bin/bash
# E10 知识库搜索服务启动脚本
# 在 Claude Code 会话开始时自动执行，确保语义搜索可用

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
VENV_PYTHON="$PROJECT_DIR/tools/venv/bin/python"
SERVER_SCRIPT="$PROJECT_DIR/tools/search_server.py"
PORT=9876

# 检查服务是否已在运行
if curl -s "localhost:$PORT/health" > /dev/null 2>&1; then
    echo "[esearch] 服务已运行"
    exit 0
fi

# 检查 venv 是否存在
if [ ! -x "$VENV_PYTHON" ]; then
    echo "[esearch] 错误: venv 未安装，请先运行 setup"
    exit 1
fi

# 启动服务（后台运行）
echo -n "[esearch] 启动搜索服务..."
nohup "$VENV_PYTHON" "$SERVER_SCRIPT" --port "$PORT" > /tmp/esearch-server.log 2>&1 &

# 等待就绪，最多 30 秒（首次模型加载 ~10s）
for i in $(seq 1 60); do
    sleep 0.5
    if curl -s "localhost:$PORT/health" > /dev/null 2>&1; then
        echo " 就绪"
        exit 0
    fi
done

echo " 超时，查看 /tmp/esearch-server.log"
exit 1
