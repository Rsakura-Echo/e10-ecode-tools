#!/usr/bin/env python3
"""Step 4: 测试检索效果"""
import sqlite3, os, sys

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOC = os.path.join(PROJECT_DIR, 'doc')
INDEX_DB = os.path.join(DOC, 'kb_index.db')

def search(query, limit=10):
    """搜索 FTS5 索引"""
    conn = sqlite3.connect(INDEX_DB)

    # FTS5 查询（对英文/数字有效，中文通常返回空）
    rows = conn.execute(
        "SELECT module, title, filepath, snippet(docs, 2, '<b>', '</b>', '...', 40) "
        "FROM docs WHERE docs MATCH ? ORDER BY rank LIMIT ?",
        (query, limit)
    ).fetchall()

    # FTS5 MATCH 对中文返回空但不抛异常 → 降级到 LIKE
    if not rows:
        rows = conn.execute(
            "SELECT module, title, filepath, substr(content, 1, 300) "
            "FROM docs WHERE content LIKE ? LIMIT ?",
            (f'%{query}%', limit)
        ).fetchall()

    conn.close()
    return rows

def main():
    if not os.path.exists(INDEX_DB):
        print(f'索引文件不存在: {INDEX_DB}')
        print('请先运行 step3_build_index.py')
        sys.exit(1)

    queries = [
        "排班",
        "跨天",
        "ESB",
        "工作流",
        "表单引擎",
        "数据库",
        "权限",
    ]

    print('=' * 60)
    print('知识库检索测试')
    print('=' * 60)

    for q in queries:
        print(f'\n--- 搜索: "{q}" ---')
        results = search(q, limit=5)
        if results:
            for i, (mod, title, path, snippet) in enumerate(results):
                print(f'\n  [{i+1}] {mod}')
                print(f'      文件: {path}')
                print(f'      片段: {snippet[:150]}...')
        else:
            print(f'  未找到结果')
        print()

if __name__ == '__main__':
    main()
