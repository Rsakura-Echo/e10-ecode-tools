#!/usr/bin/env python3
"""Step 1: 解压所有 ZIP 到 doc/extracted/"""
import zipfile, os, sys

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOC = os.path.join(PROJECT_DIR, 'doc')
SRC = os.path.join(DOC, 'html版')
DST = os.path.join(DOC, 'extracted')
os.makedirs(DST, exist_ok=True)

zips = sorted([f for f in os.listdir(SRC) if f.endswith('.zip')])
total = len(zips)
print(f'解压 {total} 个 ZIP 到 {DST}/ ...\n')

ok = fail = 0
for i, fname in enumerate(zips):
    path = os.path.join(SRC, fname)
    dirname = fname[:-4]
    dest = os.path.join(DST, dirname)
    os.makedirs(dest, exist_ok=True)
    try:
        with zipfile.ZipFile(path, 'r') as z:
            n = len(z.infolist())
            z.extractall(dest)
        ok += 1
        if (i+1) % 10 == 0 or i == total-1:
            print(f'[{i+1}/{total}] OK (累计:{ok} 失败:{fail})  {fname}  ({n}文件)')
    except Exception as e:
        fail += 1
        print(f'[{i+1}/{total}] FAIL  {fname}: {e}')

print(f'\n完成: {ok}/{total} 成功, {fail} 失败')
