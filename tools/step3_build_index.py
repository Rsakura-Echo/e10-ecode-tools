#!/usr/bin/env python3
"""Step 3: 构建 SQLite FTS5 全文索引"""
import os, sys, sqlite3, re
from pathlib import Path

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOC = os.path.join(PROJECT_DIR, 'doc')
TEXT_DIR = os.path.join(DOC, 'texts')
INDEX_DB = os.path.join(DOC, 'kb_index.db')

def main():
    print(f'构建索引: {INDEX_DB}')
    print(f'文本目录: {TEXT_DIR}\n')

    # 删除旧索引
    if os.path.exists(INDEX_DB):
        os.remove(INDEX_DB)

    conn = sqlite3.connect(INDEX_DB)
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA synchronous=OFF")

    # 创建 FTS5 表（支持中文）
    conn.execute("""
        CREATE VIRTUAL TABLE IF NOT EXISTS docs USING fts5(
            module,
            title,
            content,
            filepath,
            tokenize='unicode61 remove_diacritics 2'
        )
    """)

    # 收集所有 txt 文件
    txt_files = []
    for root, dirs, files in os.walk(TEXT_DIR):
        for f in files:
            if f.endswith('.txt'):
                txt_files.append(os.path.join(root, f))

    total = len(txt_files)
    print(f'索引 {total} 个文本文件\n')

    conn.execute("BEGIN TRANSACTION")

    for i, filepath in enumerate(txt_files):
        rel = os.path.relpath(filepath, TEXT_DIR)

        # 解析路径提取模块名: extracted/<模块名>/data/<file_id>.html.txt
        parts = rel.split(os.sep)
        module = parts[1] if len(parts) > 1 else 'unknown'
        filename = os.path.basename(filepath)
        # 去掉 .html.txt 后缀得到原始 HTML ID
        file_id = filename.replace('.html.txt', '').replace('.htm.txt', '')

        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            continue

        if len(content.strip()) < 50:
            continue

        # 用前200字符作为标题（通常是文档开头摘要）
        title = content[:200].replace('\n', ' ').strip()

        conn.execute(
            "INSERT INTO docs (module, title, content, filepath) VALUES (?, ?, ?, ?)",
            (module, title, content, rel)
        )

        if (i+1) % 1000 == 0 or i == total-1:
            print(f'[{i+1}/{total}] 已索引')

    conn.execute("COMMIT")

    # 统计
    count = conn.execute("SELECT COUNT(*) FROM docs").fetchone()[0]
    print(f'\n索引完成: {count} 条文档')

    # 优化
    print('优化索引...')
    conn.execute("INSERT INTO docs(docs) VALUES('optimize')")
    conn.close()

    size_mb = os.path.getsize(INDEX_DB) / 1024 / 1024
    print(f'索引文件: {size_mb:.1f} MB')

if __name__ == '__main__':
    main()
