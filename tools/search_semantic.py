#!/usr/bin/env python3
"""E10 语义搜索 CLI

优先通过 HTTP 查询本地服务 (快速, ~50ms)，服务未启动时回退直接加载模型 (慢, ~9s)。

用法:
  python3 tools/search_semantic.py "跨天排班"           # 默认返回前10条
  python3 tools/search_semantic.py -n 20 "表单权限"     # 返回前20条
  python3 tools/search_semantic.py -l "按钮复写"        # 仅列文件名
  python3 tools/search_semantic.py -m "CRM" "客户"      # 限定模块

服务端:
  tools/venv/bin/python tools/search_server.py --port 9876 &
"""

import os, sys, json, argparse, urllib.request, urllib.error

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SERVER_URL = "http://127.0.0.1:9876/search"

# ANSI
C = {"CYAN": "\033[0;36m", "YELLOW": "\033[1;33m", "GREEN": "\033[0;32m",
     "RED": "\033[0;31m", "BOLD": "\033[1m", "NC": "\033[0m"}


def query_server(query, top_k=10, module_filter=None):
    """通过 HTTP 查询搜索服务"""
    body = json.dumps({"query": query, "n": top_k, "module": module_filter})
    req = urllib.request.Request(
        SERVER_URL,
        data=body.encode("utf-8"),
        headers={"Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return json.loads(resp.read())
    except urllib.error.URLError:
        return None


def query_direct(query, top_k=10, module_filter=None):
    """直接加载模型查询 (回退方案，较慢)"""
    import numpy as np
    from sentence_transformers import SentenceTransformer

    emb_path = os.path.join(PROJECT_DIR, "doc", "embeddings.npy")
    files_path = os.path.join(PROJECT_DIR, "doc", "files.json")
    text_dir = os.path.join(PROJECT_DIR, "doc", "texts")

    embeddings = np.load(emb_path)
    with open(files_path, "r", encoding="utf-8") as f:
        files = json.load(f)

    model = SentenceTransformer("BAAI/bge-small-zh-v1.5")
    query_vec = model.encode([query], normalize_embeddings=True)[0]
    scores = np.dot(embeddings, query_vec)

    if module_filter:
        mask = np.array([module_filter in f for f in files])
        if not mask.any():
            return {"results": [], "count": 0, "time_ms": 0}
        indices = np.where(mask)[0]
        top_indices = indices[np.argsort(scores[indices])[::-1][:top_k]]
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
        snippet = ""
        for suffix in (".html.txt", ".htm.txt"):
            p = os.path.join(text_dir, rel_path + suffix)
            if os.path.exists(p):
                try:
                    with open(p, "r", encoding="utf-8", errors="ignore") as f:
                        snippet = f.read()[:300].replace("\n", " ").strip()
                except Exception:
                    pass
                break
        results.append({"score": round(score, 4), "module": module, "file": rel_path, "snippet": snippet})

    return {"results": results, "count": len(results), "time_ms": 0}


def print_results(data, list_only=False):
    results = data.get("results", [])
    if not results:
        print(f"{C['RED']}  未找到语义相关的结果{C['NC']}")
        return

    ms = data.get("time_ms", 0)
    mode = "服务端" if ms > 0 else "直接模式"
    print(f"{C['GREEN']}  找到 {len(results)} 条结果 ({ms}ms, {mode}){C['NC']}\n")

    if list_only:
        for i, r in enumerate(results, 1):
            print(f"  {C['CYAN']}[{r['module']}]{C['NC']} {r['file']}")
    else:
        for i, r in enumerate(results, 1):
            pct = int(r["score"] * 100)
            bar = "█" * (pct // 10) + "░" * (10 - pct // 10)
            print(f"  {C['BOLD']}[{i}]{C['NC']} {C['CYAN']}[{r['module']}]{C['NC']} {C['YELLOW']}{bar} {pct}%{C['NC']}")
            print(f"      文件: {r['file']}")
            if r.get("snippet"):
                print(f"      片段: {r['snippet']}...")
            print()


def main():
    parser = argparse.ArgumentParser(description="E10 知识库语义搜索")
    parser.add_argument("query", help="搜索关键词")
    parser.add_argument("-n", type=int, default=10, help="返回结果数 (默认10)")
    parser.add_argument("-l", "--list-only", action="store_true", help="仅列文件名")
    parser.add_argument("-m", "--module", default=None, help="限定模块名")

    args = parser.parse_args()
    query = args.query

    print(f"{C['CYAN']}═══ E10 语义搜索: {C['YELLOW']}{query}{C['NC']}")
    print()

    # 优先使用服务端
    data = query_server(query, args.n, args.module)
    if data is None:
        print(f"{C['YELLOW']}  (搜索服务未启动，回退直接模式...){C['NC']}", file=sys.stderr)
        data = query_direct(query, args.n, args.module)

    print_results(data, args.list_only)
    print(f"{C['CYAN']}═══ 搜索完成 ═══{C['NC']}")


if __name__ == "__main__":
    main()
