#!/usr/bin/env python3
"""构建 E10 文档向量索引

遍历 doc/texts/ 下所有 .txt 文件，用 bge-small-zh-v1.5 生成 384 维嵌入向量，
保存为 doc/embeddings.npy + doc/files.json。

首次运行会下载模型 (~95MB)，之后缓存于本地。
"""

import os, sys, json, time
from pathlib import Path
import numpy as np

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEXT_DIR = os.path.join(PROJECT_DIR, "doc", "texts")
OUT_EMB = os.path.join(PROJECT_DIR, "doc", "embeddings.npy")
OUT_FILES = os.path.join(PROJECT_DIR, "doc", "files.json")

BATCH_SIZE = 64
MODEL_NAME = "BAAI/bge-small-zh-v1.5"


def collect_files():
    """收集所有 txt 文件，返回 (路径列表, 内容列表)"""
    files, contents = [], []
    for root, dirs, filenames in os.walk(TEXT_DIR):
        for fn in filenames:
            if fn.endswith(".txt"):
                filepath = os.path.join(root, fn)
                try:
                    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                        text = f.read().strip()
                except Exception:
                    continue
                if len(text) < 50:
                    continue
                # 相对路径，去掉 .html.txt 后缀
                rel = os.path.relpath(filepath, TEXT_DIR).replace(".html.txt", "").replace(".htm.txt", "")
                files.append(rel)
                contents.append(text)
    return files, contents


def main():
    from sentence_transformers import SentenceTransformer

    print(f"文本目录: {TEXT_DIR}")
    files, contents = collect_files()
    print(f"收集到 {len(files)} 篇文档")

    if len(files) == 0:
        print("错误: 没有找到文档")
        sys.exit(1)

    total_chars = sum(len(c) for c in contents)
    print(f"总字符数: {total_chars:,} ({total_chars / 1024 / 1024:.1f} MB)")

    # 加载模型
    print(f"\n加载模型 {MODEL_NAME} ...")
    t0 = time.time()
    model = SentenceTransformer(MODEL_NAME)
    print(f"模型加载完成 ({time.time() - t0:.1f}s), 向量维度: {model.get_sentence_embedding_dimension()}")

    # BGE 模型需要给查询加前缀，但文档不需要
    # 分批编码
    print(f"\n编码中 (batch={BATCH_SIZE}) ...")
    t0 = time.time()
    embeddings = model.encode(
        contents,
        batch_size=BATCH_SIZE,
        show_progress_bar=True,
        normalize_embeddings=True,  # L2 归一化，后续用内积代替余弦相似度
    )

    elapsed = time.time() - t0
    print(f"编码完成 ({elapsed:.1f}s, {len(files) / elapsed:.0f} docs/s)")
    print(f"嵌入矩阵: {embeddings.shape}, dtype={embeddings.dtype}")

    # 保存
    np.save(OUT_EMB, embeddings)
    with open(OUT_FILES, "w", encoding="utf-8") as f:
        json.dump(files, f, ensure_ascii=False)

    emb_mb = os.path.getsize(OUT_EMB) / 1024 / 1024
    idx_mb = os.path.getsize(OUT_FILES) / 1024 / 1024
    print(f"\n保存完成:")
    print(f"  {OUT_EMB} ({emb_mb:.1f} MB)")
    print(f"  {OUT_FILES} ({idx_mb:.1f} MB)")


if __name__ == "__main__":
    main()
