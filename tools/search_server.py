#!/usr/bin/env python3
"""E10 语义搜索服务 — 持久化进程，避免重复加载模型

启动: tools/venv/bin/python tools/search_server.py --port 9876 &
查询: curl -s -X POST localhost:9876/search -H "Content-Type: application/json" -d '{"query":"排班"}'

首次加载模型 ~4s，之后每次查询 ~50-100ms。
"""

import os, sys, json, time, argparse
from http.server import HTTPServer, BaseHTTPRequestHandler
import numpy as np

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EMB_PATH = os.path.join(PROJECT_DIR, "doc", "embeddings.npy")
FILES_PATH = os.path.join(PROJECT_DIR, "doc", "files.json")
TEXT_DIR = os.path.join(PROJECT_DIR, "doc", "texts")
MODEL_NAME = "BAAI/bge-small-zh-v1.5"

# 全局状态
model = None
embeddings = None
files = None


def load_index():
    global embeddings, files, model
    from sentence_transformers import SentenceTransformer

    if not os.path.exists(EMB_PATH):
        print(f"错误: {EMB_PATH} 不存在，请先运行 build_embeddings.py", file=sys.stderr)
        sys.exit(1)

    print(f"加载嵌入索引 ({os.path.getsize(EMB_PATH)/1024/1024:.1f} MB) ...", file=sys.stderr)
    t0 = time.time()
    embeddings = np.load(EMB_PATH)
    with open(FILES_PATH, "r", encoding="utf-8") as f:
        files = json.load(f)
    print(f"  索引 {embeddings.shape[0]} 篇文档, 维度 {embeddings.shape[1]} ({time.time()-t0:.1f}s)", file=sys.stderr)

    print(f"加载模型 {MODEL_NAME} ...", file=sys.stderr)
    t0 = time.time()
    model = SentenceTransformer(MODEL_NAME)
    print(f"  模型就绪 ({time.time()-t0:.1f}s)", file=sys.stderr)


def search(query, top_k=10, module_filter=None):
    t0 = time.time()

    # BGE 查询前缀
    query_vec = model.encode([query], normalize_embeddings=True)[0]
    scores = np.dot(embeddings, query_vec)

    if module_filter:
        mask = np.array([module_filter in f for f in files])
        if not mask.any():
            return [], time.time() - t0
        indices = np.where(mask)[0]
        top_local = np.argsort(scores[indices])[::-1][:top_k]
        top_indices = indices[top_local]
    else:
        top_indices = np.argsort(scores)[::-1][:top_k]

    results = []
    for idx in top_indices:
        score = float(scores[idx])
        if score < 0.3:
            continue
        rel_path = files[idx]
        parts = rel_path.replace("\\", "/").split("/")
        module = parts[0] if parts else "unknown"

        # 读取原文片段
        snippet = ""
        for suffix in (".html.txt", ".htm.txt"):
            txt_path = os.path.join(TEXT_DIR, rel_path + suffix)
            if os.path.exists(txt_path):
                try:
                    with open(txt_path, "r", encoding="utf-8", errors="ignore") as f:
                        snippet = f.read()[:300].replace("\n", " ").strip()
                except Exception:
                    pass
                break

        results.append({
            "score": round(score, 4),
            "module": module,
            "file": rel_path,
            "snippet": snippet,
        })

    elapsed = time.time() - t0
    return results, elapsed


class SearchHandler(BaseHTTPRequestHandler):

    def do_POST(self):
        if self.path != "/search":
            self.send_error(404)
            return

        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length)
        try:
            data = json.loads(body)
        except json.JSONDecodeError:
            self.send_error(400)
            return

        query = data.get("query", "")
        top_k = data.get("n", 10)
        module_filter = data.get("module")

        if not query:
            self.send_error(400, "Missing 'query' field")
            return

        results, elapsed = search(query, top_k, module_filter)

        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.end_headers()
        resp = {"results": results, "count": len(results), "time_ms": round(elapsed * 1000)}
        self.wfile.write(json.dumps(resp, ensure_ascii=False).encode("utf-8"))

    def do_GET(self):
        if self.path == "/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "ok", "docs": len(files)}).encode())
        else:
            self.send_error(404)

    def log_message(self, format, *args):
        # 静默日志
        pass


def main():
    parser = argparse.ArgumentParser(description="E10 语义搜索服务")
    parser.add_argument("--port", type=int, default=9876)
    parser.add_argument("--host", default="127.0.0.1")
    args = parser.parse_args()

    load_index()

    server = HTTPServer((args.host, args.port), SearchHandler)
    print(f"E10 语义搜索服务已启动: http://{args.host}:{args.port}", file=sys.stderr)
    print(f"查询示例: curl -s -X POST localhost:{args.port}/search -H 'Content-Type: application/json' -d '{{\"query\":\"排班\"}}'", file=sys.stderr)
    sys.stderr.flush()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n服务已停止", file=sys.stderr)
        server.shutdown()


if __name__ == "__main__":
    main()
