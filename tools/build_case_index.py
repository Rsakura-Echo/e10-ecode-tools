#!/usr/bin/env python3
"""
智能案例索引生成器 - 扫描所有案例目录，提取描述和技术标签，按场景分类重新生成 INDEX.md
"""

import os
import re
from pathlib import Path
from collections import defaultdict

CASES_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "knowledge-base", "frontend", "cases")

# 场景分类规则：按优先级匹配
CATEGORY_RULES = [
    ("按钮/操作复写", ["按钮", "Button", "操作按钮", "批准按钮", "提交按钮", "点击事件", "增加操作", "操作菜单",
                       "自定义按钮", "按钮组件"]),
    ("Title/标题栏", ["Title", "标题栏", "标题", "操作栏", "操作按钮位置"]),
    ("Dialog/弹窗", ["Dialog", "弹窗", "弹框", "对话框", "弹出", "弹出框"]),
    ("流程/Workflow", ["流程", "审批", "workflow", "节点", "自由流", "干预", "流转", "征询", "抄送", "加签",
                        "拟签", "预测", "流程图", "子流程", "分叉", "操作者", "数据冲突", "流程列表",
                        "流程表单", "流程干预", "提交确认", "审批表单"]),
    ("表单字段", ["表单", "字段", "明细表", "主表", "浏览框", "下拉", "多行文本", "评分", "单选", "联动",
                  "校验", "验证", "字数", "合计", "同步", "隐藏", "显示属性"]),
    ("列表/搜索", ["列表", "搜索", "过滤", "待办", "高级搜索", "排序", "批量", "显示列", "列表视图",
                    "默认展开"]),
    ("ESB/动作流", ["ESB", "动作流", "esb", "triggerActionFlow", "runVerifyEsb", "callEsbFlow"]),
    ("附件/上传", ["附件", "上传", "拍照", "下载", "Upload"]),
    ("移动端", ["移动", "Mobile", "mobile", "手机", "移动端"]),
    ("接口/拦截", ["接口", "axios", "拦截", "request", "后端", "响应拦截", "接口拦截"]),
    ("UI/样式/布局", ["UI", "样式", "布局", "css", "多语言", "门户", "登录页", "主题", "颜色", "打印", "二维码",
                      "国际化", "快捷应用", "首页", "退出系统", "背景色", "商务蓝", "粽情", "快捷菜单",
                      "登录信息", "人员卡片", "页面改造", "小球浮窗"]),
    ("会议管理", ["会议", "会议室", "日历"]),
    ("工具/方案", ["焦点锁定", "白名单", "环境检测", "浏览器", "信息获取", "二级域名", "密码修改",
                    "静默保存", "线程池", "whiteList", "whitelist"]),
    ("端到端方案", ["端到端", "EB表单", "eb表单", "业务组件", "CusEB", "门户考勤"]),
    ("其他", []),
]


def extract_description(case_dir):
    """从 README.md 提取描述"""
    readme = os.path.join(case_dir, "README.md")
    if not os.path.exists(readme):
        return ""

    with open(readme, "r", encoding="utf-8") as f:
        content = f.read()[:2000]

    # 尝试提取第一段有意义的内容
    lines = content.strip().split("\n")
    desc_lines = []
    for line in lines:
        line = line.strip()
        if not line or line.startswith("#") or line.startswith("![") or line.startswith("---"):
            if desc_lines:
                break
            continue
        if line.startswith("!["):
            continue
        desc_lines.append(line)
        if len(" ".join(desc_lines)) > 80:
            break

    return " ".join(desc_lines)[:200]


def extract_tech_tags(case_dir):
    """从代码文件中提取技术标签"""
    tags = set()
    js_files = list(Path(case_dir).glob("*.js")) + list(Path(case_dir).glob("*.jsx"))

    for jsf in js_files[:10]:  # 最多读10个文件
        try:
            with open(jsf, "r", encoding="utf-8") as f:
                content = f.read()
        except Exception:
            continue

        patterns = {
            "regOvProps": r"\bregOvProps\b",
            "regOvComponent": r"\bregOvComponent\b",
            "asyncImport": r"\basyncImport\b",
            "forwardRef": r"\bforwardRef\b",
            "ReactDOM.render": r"\bReactDOM\.render\b",
            "useState": r"\buseState\b",
            "useEffect": r"\buseEffect\b",
            "useImperativeHandle": r"\buseImperativeHandle\b",
            "Dialog": r"\bDialog\b",
            "request(": r"\brequest\s*\(",
            "axios": r"\baxios\b",
            "window.weappUi": r"\bwindow\.weappUi\b",
            "ebdfpageSDK": r"\bebdfpageSDK\b",
            "ebuilderSDK": r"\bebuilderSDK\b",
            "triggerActionFlow": r"\btriggerActionFlow\b",
            "callEsbFlow": r"\bcallEsbFlow\b",
            "React.lazy": r"\bReact\.lazy\b",
            "React.Suspense": r"\bReact\.Suspense\b",
        }
        for tag, pattern in patterns.items():
            if re.search(pattern, content):
                tags.add(tag)

    return tags


def classify_case(name, description, tags):
    """根据案例名和描述分类"""
    combined = name + " " + description

    for category, keywords in CATEGORY_RULES:
        if category == "其他":
            continue
        for kw in keywords:
            if kw.lower() in combined.lower():
                return category

    # 根据技术标签推断
    if "triggerActionFlow" in tags or "callEsbFlow" in tags:
        return "ESB/动作流"

    if "regOvComponent" in tags:
        return "组件复写"
    if "regOvProps" in tags:
        return "组件复写"

    return "其他"


def scan_cases():
    """扫描所有案例目录"""
    cases = []

    for entry in sorted(os.listdir(CASES_DIR)):
        case_dir = os.path.join(CASES_DIR, entry)
        if not os.path.isdir(case_dir) or entry.startswith("."):
            continue

        name = entry
        description = extract_description(case_dir)
        tags = extract_tech_tags(case_dir)

        # 统计文件
        js_files = list(Path(case_dir).glob("*.js")) + list(Path(case_dir).glob("*.jsx"))
        css_files = list(Path(case_dir).glob("*.css"))
        png_files = list(Path(case_dir).glob("*.png"))

        file_list = [f.name for f in js_files[:6]]  # 最多列6个
        if css_files:
            file_list.extend(f.name for f in css_files[:2])

        category = classify_case(name, description, tags)

        cases.append({
            "name": name,
            "directory": entry,
            "description": description,
            "tags": tags,
            "category": category,
            "files": file_list,
            "file_count": len(js_files) + len(css_files) + len(png_files),
        })

    return cases


def generate_index(cases):
    """生成 INDEX.md"""
    # 按分类分组
    grouped = defaultdict(list)
    for c in cases:
        grouped[c["category"]].append(c)

    # 确保分类顺序
    category_order = [
        "组件复写",
        "按钮/操作复写",
        "Title/标题栏",
        "Dialog/弹窗",
        "流程/Workflow",
        "表单字段",
        "列表/搜索",
        "ESB/动作流",
        "附件/上传",
        "移动端",
        "接口/拦截",
        "UI/样式/布局",
        "会议管理",
        "端到端方案",
        "工具/方案",
        "其他",
    ]

    lines = []
    lines.append("# E10 ecode 真实案例库\n")
    lines.append(f"> **{len(cases)} 个案例**，按场景分类，快速定位可参考的代码模板。\n")
    lines.append("> 参考速查：[REFERENCE.md](./REFERENCE.md) — 全局变量、常见陷阱、ESB 触发方式对比\n")
    lines.append("> 导入新案例：`/ecode-case-parser` 或 `python3 tools/parse_case_zip.py <zip>`\n")
    lines.append("\n---\n")

    for cat in category_order:
        items = grouped.get(cat, [])
        if not items:
            continue

        lines.append(f"\n## {cat}（{len(items)} 个案例）\n\n")

        for c in items:
            tags_str = "、".join(sorted(c["tags"])) if c["tags"] else "-"
            desc = c["description"][:120] if c["description"] else ""
            files_str = "、".join(f"`{f}`" for f in c["files"][:4])

            lines.append(f"### {c['name']}\n")
            lines.append(f"- **场景**: {desc}\n" if desc else "")
            lines.append(f"- **技术点**: {tags_str}\n")
            lines.append(f"- **文件** ({c['file_count']}个): {files_str}\n")
            lines.append(f"- **路径**: [`{c['directory']}/`]({c['directory']}/)\n")
            lines.append("\n")

    lines.append(f"\n---\n")
    lines.append(f"> 索引生成时间: {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

    return "".join(lines)


def main():
    print("扫描案例目录...")
    cases = scan_cases()
    print(f"找到 {len(cases)} 个案例")

    # 统计分类
    grouped = defaultdict(list)
    for c in cases:
        grouped[c["category"]].append(c)

    print("\n分类统计:")
    for cat, items in sorted(grouped.items(), key=lambda x: -len(x[1])):
        print(f"  {cat}: {len(items)} 个")

    # 未分类/其他
    uncategorized = [c for c in cases if c["category"] == "其他"]
    if uncategorized:
        print(f"\n'其他'分类案例 ({len(uncategorized)} 个):")
        for c in uncategorized:
            print(f"  - {c['name']}")

    # 生成索引
    index_content = generate_index(cases)
    index_path = os.path.join(CASES_DIR, "INDEX.md")

    with open(index_path, "w", encoding="utf-8") as f:
        f.write(index_content)

    print(f"\n索引已写入: {index_path}")
    print(f"文件大小: {len(index_content)} 字符")


if __name__ == "__main__":
    main()
