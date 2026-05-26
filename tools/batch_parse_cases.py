#!/usr/bin/env python3
"""批量解析 E10 ecode 案例 ZIP 文件"""

import os
import subprocess
import sys
import time
from pathlib import Path

def main():
    zip_dir = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser("~/Downloads")
    script_dir = os.path.dirname(os.path.abspath(__file__))
    parser = os.path.join(script_dir, "parse_case_zip.py")

    zip_files = sorted(Path(zip_dir).glob("*.zip"))
    total = len(zip_files)
    print(f"找到 {total} 个 ZIP 文件\n")

    success = 0
    failed = 0
    skipped = 0
    failures = []

    start_time = time.time()

    for i, zip_path in enumerate(zip_files, 1):
        name = zip_path.name
        print(f"[{i}/{total}] {name} ... ", end="", flush=True)

        try:
            result = subprocess.run(
                ["python3", parser, str(zip_path)],
                capture_output=True, text=True, timeout=30
            )
            if result.returncode == 0:
                # 检查是否有案例被解析
                if "共处理 1 个案例" in result.stdout or "共处理 0 个案例" in result.stdout:
                    print("OK")
                    success += 1
                elif "索引已是最新" in result.stdout:
                    print("SKIP (已存在)")
                    skipped += 1
                else:
                    print("OK")
                    success += 1
            else:
                print(f"FAIL (rc={result.returncode})")
                failed += 1
                failures.append((name, result.stderr.strip()[-200:]))
        except subprocess.TimeoutExpired:
            print("TIMEOUT")
            failed += 1
            failures.append((name, "timeout"))
        except Exception as e:
            print(f"ERROR: {e}")
            failed += 1
            failures.append((name, str(e)))

    elapsed = time.time() - start_time

    print(f"\n{'='*60}")
    print(f"批量解析完成!")
    print(f"  总计: {total}  成功: {success}  跳过: {skipped}  失败: {failed}")
    print(f"  耗时: {elapsed:.1f}s")
    if failures:
        print(f"\n失败列表 ({len(failures)}):")
        for name, err in failures:
            print(f"  - {name}: {err}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
