#!/usr/bin/env python3
"""
E10 ecode 真实案例 ZIP 解析工具

用法:
    python3 tools/parse_case_zip.py <zip文件路径> [--output <输出目录>] [--dry-run]

示例:
    python3 tools/parse_case_zip.py ~/Downloads/case.zip
    python3 tools/parse_case_zip.py ~/Downloads/case.zip --output knowledge-base/frontend/cases/
    python3 tools/parse_case_zip.py ~/Downloads/case.zip --dry-run
"""

import argparse
import base64
import json
import os
import shutil
import subprocess
import sys
import tempfile
import zipfile


def decode_base64(b64_str):
    """解码 base64 字符串为 UTF-8 文本"""
    if not b64_str:
        return ""
    try:
        return base64.b64decode(b64_str).decode("utf-8")
    except Exception as e:
        print(f"  [WARN] base64 解码失败: {e}")
        return ""


def parse_ecode_json(json_path, zip_dir, output_base, dry_run=False):
    """
    解析 ecode.json 并输出案例文件。

    ecode.json 结构:
    - rootFolders[].name: 案例名称
    - codes[]:
        - attribute: NC=普通代码, GC=系统配置(跳过), MD=文档
        - name + extension: 文件名
        - content: base64 编码的源文件内容
        - compiledContent: base64 编码的编译后内容(可选)
    - resources[]: 附件文件(图片等), 实际文件在 ZIP 子目录中
    """
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    results = []

    for rf in data.get("rootFolders", []):
        case_name = rf["name"].strip()
        case_id = rf["id"]

        # 清理案例名称，用作目录名
        safe_name = case_name.replace("/", "-").replace("\\", "-")
        case_dir = os.path.join(output_base, safe_name)

        print(f"\n{'='*60}")
        print(f"案例: {case_name}")
        print(f"输出: {case_dir}")
        print(f"{'='*60}")

        case_files = []

        if not dry_run:
            os.makedirs(case_dir, exist_ok=True)

        # 处理 codes
        for code in data.get("codes", []):
            # 只处理用户代码(NC)和文档(MD)，跳过系统配置(GC)
            attr = code.get("attribute", "")
            if attr == "GC":
                continue

            filename = code["name"] + code["extension"]
            content_b64 = code.get("content", "")
            compiled_b64 = code.get("compiledContent", "")

            source = decode_base64(content_b64)
            compiled = decode_base64(compiled_b64) if compiled_b64 else ""

            # 文档文件统一命名为 README.md
            if attr == "MD":
                filename = "README.md"

            filepath = os.path.join(case_dir, filename)

            print(f"  [{attr}] {filename}  (source: {len(source)} chars, compiled: {len(compiled)} chars)")

            if not dry_run:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(source)

            case_files.append({
                "filename": filename,
                "attribute": attr,
                "source": source,
                "compiled": compiled,
            })

        # 处理 resources (复制附件)
        resources = data.get("resources", [])
        if resources:
            print(f"  附件: {len(resources)} 个")
            for res in resources:
                ext = res.get("extension", "")
                raw_name = res["name"]
                # name 可能已包含扩展名，避免重复
                if ext and raw_name.endswith("." + ext):
                    res_name = raw_name
                    dst_name = raw_name
                else:
                    res_name = f"{raw_name}.{ext}" if ext else raw_name
                    dst_name = res_name
                # 在 ZIP 目录中查找实际文件
                found = False
                for root, dirs, files in os.walk(zip_dir):
                    if res_name in files:
                        src = os.path.join(root, res_name)
                        dst = os.path.join(case_dir, dst_name)
                        print(f"  复制附件: {res_name}")
                        if not dry_run:
                            shutil.copy2(src, dst)
                        found = True
                        break
                if not found:
                    print(f"  [WARN] 未找到附件文件: {res_name}")

        results.append({
            "name": case_name,
            "directory": safe_name,
            "files": case_files,
            "resource_count": len(resources),
        })

    return results


def update_index(output_base, results, dry_run=False):
    """更新案例索引 INDEX.md"""
    index_path = os.path.join(output_base, "INDEX.md")

    # 读取已有索引
    existing_entries = set()
    if os.path.exists(index_path):
        with open(index_path, "r", encoding="utf-8") as f:
            for line in f:
                if line.startswith("### "):
                    existing_entries.add(line.strip("# ").strip())

    # 生成新条目
    new_lines = []
    for r in results:
        if r["name"] not in existing_entries:
            # 提取技术关键词
            keywords = set()
            for f in r["files"]:
                src = f.get("source", "")
                if "regOvComponent" in src:
                    keywords.add("regOvComponent")
                if "regOvProps" in src:
                    keywords.add("regOvProps")
                if "ReactDOM.render" in src or "Dialog" in src:
                    keywords.add("Dialog弹窗")
                if "asyncImport" in src:
                    keywords.add("asyncImport")
                if "esbFlowId" in src or "triggerActionFlow" in src:
                    keywords.add("ESB动作流")
                if "forwardRef" in src:
                    keywords.add("forwardRef")
                if "request(" in src:
                    keywords.add("接口调用")
                if "ebdfpageSDK" in src:
                    keywords.add("eb表单")
                if "Title" in src:
                    keywords.add("Title拦截")
                if "window.weappUi" in src:
                    keywords.add("window.weappUi")

            tag_str = " ".join(sorted(keywords)) if keywords else "未分类"

            files_str = ", ".join(
                f"`{f['filename']}`" for f in r["files"] if f["attribute"] != "MD"
            )

            new_lines.append(f"### {r['name']}\n")
            new_lines.append(f"- **目录**: [{r['directory']}](./{r['directory']}/)\n")
            new_lines.append(f"- **标签**: {tag_str}\n")
            new_lines.append(f"- **文件**: {files_str}\n")
            if any(f["attribute"] == "MD" for f in r["files"]):
                new_lines.append(f"- **说明**: [README.md](./{r['directory']}/README.md)\n")
            new_lines.append("\n")

    if not new_lines:
        print("\n索引已是最新，无需更新。")
        return

    if dry_run:
        print(f"\n[DRY-RUN] 将追加 {len(new_lines)//4} 个条目到 INDEX.md")
        return

    # 追加到索引
    mode = "a" if os.path.exists(index_path) else "w"
    with open(index_path, mode, encoding="utf-8") as f:
        if mode == "w":
            f.write("# E10 ecode 真实案例库\n\n")
            f.write("> 案例来源：E10 ecode 平台真实项目导出 + 实战验证的代码模式。\n")
            f.write("> 参考速查：[REFERENCE.md](./REFERENCE.md)\n\n")
            f.write("---\n\n")
        f.writelines(new_lines)

    print(f"\n已更新索引: {index_path}")


def main():
    parser = argparse.ArgumentParser(
        description="E10 ecode 真实案例 ZIP 解析工具",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  python3 tools/parse_case_zip.py ~/Downloads/case.zip
  python3 tools/parse_case_zip.py ~/Downloads/case.zip --dry-run
  python3 tools/parse_case_zip.py case.zip -o knowledge-base/frontend/cases/
        """,
    )
    parser.add_argument("zipfile", help="案例 ZIP 文件路径")
    parser.add_argument(
        "-o", "--output",
        default="knowledge-base/frontend/cases",
        help="输出目录 (默认: knowledge-base/frontend/cases)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="仅预览，不实际写入文件",
    )
    args = parser.parse_args()

    if not os.path.exists(args.zipfile):
        print(f"错误: 文件不存在: {args.zipfile}")
        sys.exit(1)

    # 确保输出目录基于项目根目录
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    output_base = os.path.join(project_root, args.output)

    print(f"解析文件: {args.zipfile}")
    print(f"输出目录: {output_base}")
    if args.dry_run:
        print("[DRY-RUN 模式，不会实际写入文件]")

    # 解压到临时目录
    with tempfile.TemporaryDirectory(prefix="ecode_case_") as tmpdir:
        print(f"\n解压到临时目录: {tmpdir}")

        with zipfile.ZipFile(args.zipfile, "r") as zf:
            zf.extractall(tmpdir)

        # 查找 ecode.json
        json_path = None
        for root, dirs, files in os.walk(tmpdir):
            if "ecode.json" in files:
                json_path = os.path.join(root, "ecode.json")
                break

        if not json_path:
            print("错误: ZIP 中未找到 ecode.json 文件")
            sys.exit(1)

        print(f"找到 ecode.json: {json_path}")

        # 解析
        results = parse_ecode_json(json_path, tmpdir, output_base, dry_run=args.dry_run)

        print(f"\n{'='*60}")
        print(f"解析完成! 共处理 {len(results)} 个案例")
        if not args.dry_run:
            print(f"文件已输出到: {output_base}")
            # 自动重建智能索引
            indexer = os.path.join(script_dir, "build_case_index.py")
            if os.path.exists(indexer):
                print(f"\n重建智能索引...")
                subprocess.run(["python3", indexer], capture_output=True)
                print(f"索引已更新: {output_base}/INDEX.md")
        print(f"{'='*60}")


if __name__ == "__main__":
    main()
