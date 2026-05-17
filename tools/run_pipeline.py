#!/usr/bin/env python3
"""主流程: Step2 → Step3 → Step4"""
import subprocess, sys, os

SCRIPTS = os.path.dirname(os.path.abspath(__file__))

steps = [
    ('step2_extract_text.py', 'HTML → 纯文本提取'),
    ('step3_build_index.py', '构建 FTS5 全文索引'),
    ('step4_test.py',     '检索效果测试'),
]

for script, desc in steps:
    print(f'\n{"="*60}')
    print(f'  {desc}')
    print(f'{"="*60}\n')
    path = os.path.join(SCRIPTS, script)
    result = subprocess.run([sys.executable, path], capture_output=False)
    if result.returncode != 0:
        print(f'\n❌ {desc} 失败 (exit={result.returncode})')
        sys.exit(1)

print(f'\n{"="*60}')
print('  知识库构建完成！')
print(f'{"="*60}')
print(f'  文本: doc/texts/')
print(f'  索引: doc/kb_index.db')
print(f'  测试: python3 tools/step4_test.py')
print(f'  Skill: /ask-knowledge "你的问题"')
