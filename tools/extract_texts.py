#!/usr/bin/env python3
"""从 doc/extracted/ 的 HTML 文件中提取文本，保存为 doc/texts/ 下的 .txt 文件。

用法:
  python3 tools/extract_texts.py
"""

import os, sys, re, json
from pathlib import Path

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXTRACTED_DIR = os.path.join(PROJECT_DIR, "doc", "extracted")
TEXTS_DIR = os.path.join(PROJECT_DIR, "doc", "texts")


def extract_text_from_html(html_content):
    """从 HTML 内容中提取纯文本"""
    # 移除 script 和 style 标签及其内容
    html = re.sub(r'<script[^>]*>.*?</script>', '', html_content, flags=re.DOTALL | re.IGNORECASE)
    html = re.sub(r'<style[^>]*>.*?</style>', '', html, flags=re.DOTALL | re.IGNORECASE)
    html = re.sub(r'<noscript[^>]*>.*?</noscript>', '', html, flags=re.DOTALL | re.IGNORECASE)

    # 移除 head 部分
    html = re.sub(r'<head[^>]*>.*?</head>', '', html, flags=re.DOTALL | re.IGNORECASE)

    # 将块级元素替换为换行，以便保留段落结构
    html = re.sub(r'</?(?:div|p|h[1-6]|li|tr|br|main|section|article|header|footer)[^>]*>', '\n', html, flags=re.IGNORECASE)

    # 移除所有剩余的 HTML 标签
    html = re.sub(r'<[^>]+>', '', html)

    # 解码 HTML 实体
    html = html.replace('&nbsp;', ' ')
    html = html.replace('&lt;', '<')
    html = html.replace('&gt;', '>')
    html = html.replace('&amp;', '&')
    html = html.replace('&quot;', '"')
    html = html.replace('&#39;', "'")
    html = re.sub(r'&#x?[0-9a-fA-F]+;', '', html)

    # 清理空白行
    lines = []
    for line in html.splitlines():
        stripped = line.strip()
        if stripped:
            lines.append(stripped)

    text = '\n'.join(lines)

    # 压缩多个连续换行为最多两个
    text = re.sub(r'\n{3,}', '\n\n', text)

    return text.strip()


def main():
    if not os.path.exists(EXTRACTED_DIR):
        print(f"错误: extracted 目录不存在: {EXTRACTED_DIR}")
        sys.exit(1)

    print(f"源目录: {EXTRACTED_DIR}")
    print(f"目标目录: {TEXTS_DIR}")

    total = 0
    skipped = 0
    errors = 0

    for root, dirs, filenames in os.walk(EXTRACTED_DIR):
        for fn in filenames:
            if fn.endswith(('.html', '.htm')):
                html_path = os.path.join(root, fn)
                rel_path = os.path.relpath(html_path, EXTRACTED_DIR)

                # 目标路径: moduleName/data/docId.html.txt
                txt_path = os.path.join(TEXTS_DIR, rel_path + '.txt')
                txt_dir = os.path.dirname(txt_path)

                try:
                    file_size = os.path.getsize(html_path)
                    # 跳过太小或太大的文件
                    if file_size < 100:
                        skipped += 1
                        continue
                    if file_size > 5 * 1024 * 1024:
                        skipped += 1
                        continue

                    with open(html_path, 'r', encoding='utf-8', errors='ignore') as f:
                        html_content = f.read()

                    text = extract_text_from_html(html_content)

                    if len(text) < 50:
                        skipped += 1
                        continue

                    os.makedirs(txt_dir, exist_ok=True)
                    with open(txt_path, 'w', encoding='utf-8') as f:
                        f.write(text)

                    total += 1
                    if total % 500 == 0:
                        print(f"  已处理 {total} 个文件...")

                except Exception as e:
                    errors += 1
                    if errors <= 10:
                        print(f"  错误 ({rel_path}): {e}")

    print(f"\n完成！")
    print(f"  提取成功: {total}")
    print(f"  跳过: {skipped}")
    print(f"  错误: {errors}")


if __name__ == "__main__":
    main()
