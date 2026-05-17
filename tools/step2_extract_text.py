#!/usr/bin/env python3
"""Step 2: 从 HTML 文件中提取纯文本，丢弃 base64 图片 (regex版，更鲁棒)"""
import os, sys, re

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOC = os.path.join(PROJECT_DIR, 'doc')
SRC = os.path.join(DOC, 'extracted')
DST = os.path.join(DOC, 'texts')

def extract_text(html):
    """Regex-based text extraction, more robust than HTMLParser for bulk files."""
    # 1. 移除 head/script/style/svg/noscript 整块
    for tag in ('head', 'script', 'style', 'svg', 'noscript'):
        html = re.sub(rf'<{tag}[\s>].*?</{tag}>', '', html, flags=re.DOTALL | re.IGNORECASE)
        html = re.sub(rf'<{tag}>.*?</{tag}>', '', html, flags=re.DOTALL | re.IGNORECASE)

    # 2. 移除 base64 内联图片（大段无用数据）
    html = re.sub(r'data:image/[^;"]+;base64,[A-Za-z0-9+/=]{200,}', '[图片]', html)

    # 3. 移除注释
    html = re.sub(r'<!--.*?-->', '', html, flags=re.DOTALL)

    # 4. 换行标签前加换行
    for tag in ('br', 'p/', '/p', 'li/', '/li', 'h1', 'h2', 'h3', 'h4', '/h1', '/h2', '/h3', '/h4',
                'tr', '/tr', 'div', '/div', 'table', '/table'):
        html = re.sub(rf'<{tag}[^>]*>', '\n', html, flags=re.IGNORECASE)

    # 5. 去除所有剩余的 HTML 标签
    html = re.sub(r'<[^>]+>', ' ', html)

    # 6. HTML 实体解码
    html = html.replace('&nbsp;', ' ').replace('&lt;', '<').replace('&gt;', '>')
    html = html.replace('&amp;', '&').replace('&quot;', '"').replace('&#39;', "'")
    html = re.sub(r'&#\d+;', ' ', html)
    html = re.sub(r'&[a-z]+;', ' ', html)

    # 7. 清理空白
    html = re.sub(r'[ \t]+', ' ', html)        # 压缩空格
    html = re.sub(r'\n{3,}', '\n\n', html)      # 压缩空行
    html = re.sub(r'^[ \n]+', '', html)          # 去开头空白
    html = re.sub(r'[ \n]+$', '', html)          # 去结尾空白

    return html.strip()

def main():
    os.makedirs(DST, exist_ok=True)

    # 收集所有 HTML 文件
    html_files = []
    for root, dirs, files in os.walk(SRC):
        for f in files:
            if f.endswith('.html') or f.endswith('.htm'):
                html_files.append(os.path.join(root, f))

    total = len(html_files)
    print(f'找到 {total} 个 HTML 文件\n')

    ok = fail = empty = 0
    total_chars = 0

    for i, filepath in enumerate(html_files):
        rel = os.path.relpath(filepath, SRC)
        out_path = os.path.join(DST, rel + '.txt')
        os.makedirs(os.path.dirname(out_path), exist_ok=True)

        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                html = f.read()
            text = extract_text(html)
        except Exception as e:
            fail += 1
            continue

        if len(text) < 50:
            empty += 1

        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(text)

        ok += 1
        total_chars += len(text)

        if (i+1) % 500 == 0 or i == total-1:
            mb = total_chars / 1024 / 1024
            print(f'[{i+1}/{total}] 已提取 {mb:.1f} MB 文本 (OK:{ok} 空:{empty} 失败:{fail})')

    mb = total_chars / 1024 / 1024
    print(f'\n完成: {ok} 文件 → {mb:.1f} MB 纯文本 ({DST}/)')
    print(f'空文件(<50字符): {empty}, 失败: {fail}')

if __name__ == '__main__':
    main()
