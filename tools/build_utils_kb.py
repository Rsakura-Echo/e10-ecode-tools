#!/usr/bin/env python3
import re, os

SCRAPED = 'doc/scraped/utils/'
OUT = 'knowledge-base/06-utils-library.md'

utils = {}
for fname in sorted(os.listdir(SCRAPED)):
    if fname.endswith('.txt'):
        with open(os.path.join(SCRAPED, fname)) as f:
            utils[fname.replace('.txt', '')] = f.read()

categories = {
    '基础工具': ['appInfo', 'classnames', 'ua', 'camelcase', 'copy', 'base64', 'qs',
                'classUseMemo', 'errorBoundary', 'moduleSignToModule', 'webOpenSDK',
                'sparkMD5', 'baseConfig', 'softKeyboardFunc'],
    '异步请求': ['request', 'doSensitiveScan'],
    '路由': ['history', 'shouldRouteJump'],
    '调试': ['vconsole'],
    '二次开发': ['regReactChildren', 'overwriteFn'],
    '跨模块': ['corsImport', 'moduleRouter'],
    '日期时间': ['date', 'dayjs'],
    '国际化': ['locale'],
    '数据校验': ['validator'],
    'App对接': ['weappSDK', 'convertWechatData', 'needConvertWechatData'],
    '样式主题': ['replaceCss', 'setTheme', 'setTitle'],
    '事件与基础API': ['eventEmitter', 'jsApi'],
    '性能监控': ['weappMonitorInstance'],
    '底层注入': ['aLink', 'aLinkIntercept', 'checkWeId', 'documentTitle', 'fastclick',
                'getNameFromUrl', 'getReactPlugin', 'regReactPlugin', 'historyPlugin',
                'historyUtil', 'middleware', 'prefixSecondPath'],
}

descriptions = {
    'appInfo': '应用信息', 'classnames': '类名处理', 'ua': '用户代理',
    'camelcase': '驼峰转换', 'copy': '复制', 'base64': '加密解密',
    'qs': '字符串处理工具', 'classUseMemo': '类组件缓存数据',
    'errorBoundary': '错误边界', 'moduleSignToModule': '模块列表',
    'webOpenSDK': '统一打开方法', 'sparkMD5': 'MD5加密',
    'baseConfig': '个人配置获取', 'softKeyboardFunc': '软键盘弹起监听',
    'request': '接口请求', 'doSensitiveScan': '敏感词校验',
    'history': '全局路由工具', 'shouldRouteJump': 'PC移动互跳',
    'vconsole': '移动端调试面板', 'regReactChildren': 'React子元素注入',
    'overwriteFn': '函数处理', 'corsImport': '跨应用异步导入',
    'moduleRouter': '跨模块调用', 'date': '日期时间处理', 'dayjs': '日期时间处理库',
    'locale': '多语言处理', 'validator': '字符串验证工具',
    'weappSDK': 'SDK', 'convertWechatData': '企业微信canvas转译',
    'needConvertWechatData': '企业微信转译判断',
    'replaceCss': 'IE替换主题', 'setTheme': '设置主题',
    'setTitle': '设置页面标题', 'eventEmitter': '事件处理', 'jsApi': '基础工具',
    'weappMonitorInstance': '性能监控', 'aLink': 'A链接',
    'aLinkIntercept': 'A链接拦截', 'checkWeId': 'WeId校验',
    'documentTitle': '文档标题', 'fastclick': '快速点击',
    'getNameFromUrl': 'URL获取名称', 'getReactPlugin': 'React插件获取',
    'regReactPlugin': 'React插件注册', 'historyPlugin': '历史插件',
    'historyUtil': '历史工具', 'middleware': '中间件',
    'prefixSecondPath': '二级路径前缀',
}

def clean_content(text, util_name):
    lines = text.split('\n')
    for i in range(len(lines) - 2):
        if lines[i].strip() == util_name:
            for j in range(i+1, min(i+5, len(lines))):
                if lines[j].strip() == '简介' and i > 30:
                    return '\n'.join(lines[i:])
    for i in range(len(lines) - 1, len(lines) // 2, -1):
        if lines[i].strip() == '简介':
            for j in range(i-1, max(i-5, 0), -1):
                if lines[j].strip():
                    if lines[j].strip() == util_name[:len(lines[j].strip())]:
                        return '\n'.join(lines[j:])
            return '\n'.join(lines[i:])
    return ''

def format_section(text, util_name):
    text = clean_content(text, util_name)
    if not text:
        return '*文档暂无内容*\n'

    lines = text.split('\n')
    result = []
    prev_empty = False
    noise_prefixes = ('@weapp/', '搜索工具', '组件库', '模版站', '业务组件文档',
                      'CHANGELOG', '总览', '三方App能力对接')
    noise_exact = {'工具', '异步请求', '路由', '调试', '二次开发', '跨模块',
                   '日期时间', '国际化', '数据校验', 'app对接', '样式主题相关',
                   'jsAPI基础工具', '性能监控', '底层注入', '底层注入 (慎用)'}
    subsections = {'简介', '基本使用', '使用场景', '参数说明', '结果说明',
                   '内部实现', '默认配置', '注意事项', '接口数据默认格式', '执行结果'}

    for line_num, line in enumerate(lines):
        stripped = line.strip()
        if not stripped:
            if not prev_empty:
                result.append('')
                prev_empty = True
            continue
        if any(stripped.startswith(p) for p in noise_prefixes):
            continue
        if stripped in noise_exact:
            continue
        if line_num < 10:
            skip = False
            for item_name in descriptions:
                if stripped.startswith(item_name + ' ') and len(stripped) < 40:
                    skip = True
                    break
            if skip:
                continue
        if stripped in subsections:
            result.append('\n#### ' + stripped + '\n')
            prev_empty = True
            continue

        # Code line detection
        code_starts = ('import ', 'const ', 'export ', 'function ', 'class ',
                      'let ', 'var ', '{', '}', 'return ', '// ', '/* ', '* ',
                      'if (', 'else', 'try', 'catch', 'finally', 'throw',
                      'new ', 'this.', 'console.', 'Dialog.', 'window.',
                      'eventEmitter.', 'request(', 'axios.', 'async ',
                      'await ', 'Promise', '.then(', '.catch(', 'document.',
                      'module.', 'require(', '<', '/>', 'for (')
        is_code = any(stripped.startswith(cs) for cs in code_starts)
        if not is_code:
            is_code = bool(re.match(r'^\s*(import|const|export|function|class|let|var)\s', stripped))
        if not is_code:
            is_code = bool(re.match(r'^\s*[A-Z]\w*\s*\.', stripped))
        if not is_code:
            is_code = bool(re.match(r'^\s*\}', stripped))
        if not is_code:
            is_code = bool(re.match(r'^\s*//', stripped))

        if is_code:
            result.append('  ' + stripped)
            prev_empty = False
        else:
            result.append(stripped)
            prev_empty = False

    return '\n'.join(result)

# Build output
output = []
output.append('# 06 - @weapp/utils 工具库 API 参考\n')
output.append('## 概述\n')
output.append('`@weapp/utils` 是 E10 平台的前端工具库，提供 **49 个工具函数**，覆盖应用信息获取、HTTP 请求、路由、事件处理、日期时间、国际化、样式主题、性能监控等。\n')
output.append('```js\nimport { appInfo, request, history, eventEmitter } from \'@weapp/utils\';\n```\n')

output.append('## 工具速查\n')
output.append('| 分类 | 工具 | 说明 |')
output.append('|------|------|------|')
for cat, items in categories.items():
    for item in items:
        desc = descriptions.get(item, '')
        output.append(f'| {cat} | `{item}` | {desc} |')
output.append('')

important = ['appInfo', 'request', 'history', 'eventEmitter', 'regReactChildren',
             'corsImport', 'baseConfig', 'replaceCss', 'setTheme', 'locale',
             'doSensitiveScan', 'date', 'dayjs', 'classnames', 'qs', 'base64',
             'validator', 'overwriteFn', 'moduleRouter', 'errorBoundary',
             'webOpenSDK', 'jsApi', 'weappMonitorInstance', 'vconsole']

output.append('## 核心工具详解\n')
for util_name in important:
    if util_name in utils:
        desc = descriptions.get(util_name, '')
        output.append(f'### {util_name} — {desc}\n')
        formatted = format_section(utils[util_name], util_name)
        output.append(formatted)
        output.append('')

output.append('## 其他工具简要说明\n')
processed = set(important)
for cat, items in categories.items():
    remaining = [i for i in items if i not in processed and i in utils]
    if remaining:
        output.append(f'### {cat}\n')
        for util_name in remaining:
            desc = descriptions.get(util_name, '')
            content = format_section(utils[util_name], util_name)
            intro_match = re.search(r'#### 简介\s*\n+(.*?)(?:\n####|\n$)', content, re.DOTALL)
            intro = intro_match.group(1).strip() if intro_match else (content[:200] if len(content) > 50 else '')
            if intro and len(intro) > 5:
                output.append(f'**`{util_name}`** — {desc}\n\n{intro}\n')
            else:
                output.append(f'**`{util_name}`** — {desc}\n')
        output.append('')

with open(OUT, 'w') as f:
    f.write('\n'.join(output))

with open(OUT) as f:
    content_file = f.read()
    lines = content_file.count('\n') + 1
    size_kb = os.path.getsize(OUT) / 1024
print(f'Written: {OUT} ({lines} lines, {size_kb:.1f} KB)')
for name in ['appInfo', 'request', 'history', 'eventEmitter', 'regReactChildren', 'corsImport']:
    idx = content_file.find(f'### {name} \u2014')
    if idx > 0:
        snippet = content_file[idx:idx+400]
        ok = '简介' in snippet and '基本使用' in snippet
        print(f'  {name}: {"OK" if ok else "INCOMPLETE"}')
    else:
        print(f'  {name}: NOT FOUND')
