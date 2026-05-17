#!/usr/bin/env python3
"""
JS 动态渲染页面抓取工具。
用于抓取 weapp.eteams.cn 等 SPA 页面中的组件文档、API 说明、示例代码。
需要 Playwright：pip3 install playwright && playwright install chromium

用法:
  python3 tools/scrape_js_page.py "https://weapp.eteams.cn/ui/breadcrumb/freepass"
  python3 tools/scrape_js_page.py --urls urls.txt --out doc/scraped/
  python3 tools/scrape_js_page.py --component breadcrumb --out knowledge-base/
"""

import argparse, os, sys, time, re, json

def check_deps():
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("❌ 缺少 playwright，请先安装：")
        print("   pip3 install playwright && playwright install chromium")
        sys.exit(1)

def extract_text_from_html(html):
    """从 HTML 提取纯文本（简化版，保留换行结构）"""
    # 移除 script/style
    for tag in ('script', 'style', 'nav', 'header', 'footer'):
        html = re.sub(rf'<{tag}[\s>].*?</{tag}>', '', html, flags=re.DOTALL | re.IGNORECASE)
        html = re.sub(rf'<{tag}>.*?</{tag}>', '', html, flags=re.DOTALL | re.IGNORECASE)

    # 换行标签
    for tag in ('br', 'p/', '/p', 'li/', '/li', 'h1', 'h2', 'h3', 'h4',
                '/h1', '/h2', '/h3', '/h4', 'tr', '/tr', 'pre', '/pre'):
        html = re.sub(rf'<{tag}[^>]*>', '\n', html, flags=re.IGNORECASE)

    # code 块保留标记
    html = re.sub(r'<code[^>]*>', '`', html, flags=re.IGNORECASE)
    html = re.sub(r'</code>', '`', html, flags=re.IGNORECASE)

    # 去标签
    html = re.sub(r'<[^>]+>', ' ', html)

    # 实体解码
    html = html.replace('&nbsp;', ' ').replace('&lt;', '<').replace('&gt;', '>')
    html = html.replace('&amp;', '&').replace('&quot;', '"').replace('&#39;', "'")
    html = re.sub(r'&#\d+;', ' ', html)
    html = re.sub(r'&[a-z]+;', ' ', html)

    # 清理空白
    html = re.sub(r'[ \t]+', ' ', html)
    html = re.sub(r'\n{3,}', '\n\n', html)
    return html.strip()

def scrape_page(url, wait_sec=3, selector=None):
    """抓取单个 JS 渲染页面，返回纯文本内容"""
    from playwright.sync_api import sync_playwright

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url, wait_until='networkidle', timeout=30000)

        # 等待内容渲染（默认等 3 秒，或等待指定 selector 出现）
        if selector:
            try:
                page.wait_for_selector(selector, timeout=15000)
            except:
                pass
        else:
            time.sleep(wait_sec)

        # 尝试关闭可能的遮罩/弹窗
        try:
            page.evaluate("""() => {
                document.querySelectorAll('.dialog-mask, .modal-mask, .overlay')
                    .forEach(el => el.remove());
            }""")
        except:
            pass

        html = page.content()
        title = page.title()
        browser.close()

    text = extract_text_from_html(html)
    return title, text

def scrape_component_doc(url, component_name):
    """
    抓取 weapp.eteams.cn 组件文档页面。
    已知 URL 模式：https://weapp.eteams.cn/ui/{component}/freepass
    """
    title, text = scrape_page(url, wait_sec=5)

    # 清理常见噪音
    noise_patterns = [
        r'window\.publicDomainstatic.*?(;|\n)',
        r'你需要启用 JavaScript.*',
        r'You need to enable JavaScript.*',
        r'loading.*?spinner',
    ]
    for pat in noise_patterns:
        text = re.sub(pat, '', text, flags=re.IGNORECASE)

    # 压缩空白
    text = re.sub(r'\n{4,}', '\n\n\n', text)
    text = text.strip()

    return title, text

def main():
    parser = argparse.ArgumentParser(description='抓取 JS 动态渲染页面')
    parser.add_argument('url', nargs='?', help='目标 URL')
    parser.add_argument('--urls', help='URL 列表文件（每行一个）')
    parser.add_argument('--component', help='组件名（自动拼接 URL）')
    parser.add_argument('--out', default='doc/scraped', help='输出目录（默认 doc/scraped）')
    parser.add_argument('--selector', help='等待此 CSS 选择器出现后再抓取')
    parser.add_argument('--wait', type=int, default=3, help='等待秒数（默认 3）')
    parser.add_argument('--stdout', action='store_true', help='直接输出到终端')

    args = parser.parse_args()
    check_deps()

    urls = []
    if args.component:
        urls.append(f'https://weapp.eteams.cn/ui/{args.component}/freepass')
    elif args.urls:
        with open(args.urls) as f:
            urls = [line.strip() for line in f if line.strip() and not line.startswith('#')]
    elif args.url:
        urls.append(args.url)
    else:
        parser.print_help()
        sys.exit(1)

    for url in urls:
        comp = args.component or url.rstrip('/').split('/')[-2]
        print(f'\n抓取: {url}')

        try:
            title, text = scrape_page(url, wait_sec=args.wait, selector=args.selector)
        except Exception as e:
            print(f'  ❌ 失败: {e}')
            continue

        if args.stdout:
            print(f'\n=== {title} ===\n')
            print(text)
        else:
            os.makedirs(args.out, exist_ok=True)
            out_path = os.path.join(args.out, f'{comp}.md')
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(f'# {title}\n\n')
                f.write(f'> 来源: {url}\n\n')
                f.write(text)
            lines = text.count('\n') + 1
            print(f'  ✅ 已保存: {out_path} ({lines} 行)')

    print('\n完成！')

if __name__ == '__main__':
    main()
