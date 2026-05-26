# E10 ecode 真实案例 ZIP 解析入库

## 概述

此技能用于将 E10 ecode 平台导出的真实案例 ZIP 文件解析并入库到 `knowledge-base/frontend/cases/` 目录中。

## 使用方式

当用户提供一个案例 ZIP 文件路径时：

```
python3 tools/parse_case_zip.py <zip文件路径>
```

### 参数说明

| 参数 | 说明 |
|------|------|
| `<zip文件路径>` | 必填，案例 ZIP 文件的绝对路径 |
| `--output <目录>` | 可选，输出目录（默认 `knowledge-base/frontend/cases`） |
| `--dry-run` | 可选，仅预览不实际写入 |

## 工作原理

### ZIP 文件结构

导出的 ZIP 文件包含：
```
ZIP根目录/
├── {caseUUID}/
│   ├── ecode.json          # 案例元数据和代码（base64 编码）
│   └── {appId}/
│       └── ${resources/
│           └── *.png       # 附件图片
```

### ecode.json 结构

```json
{
  "rootFolders": [
    {
      "name": "案例名称"     // ← 作为案例目录名
    }
  ],
  "codes": [
    {
      "attribute": "NC",    // NC=用户代码, GC=系统配置(跳过), MD=文档
      "name": "entry",      // 文件名（不含扩展名）
      "extension": ".js",   // 扩展名
      "content": "base64...",          // base64 编码的源文件内容
      "compiledContent": "base64..."   // base64 编码的编译后内容
    }
  ],
  "resources": [
    {
      "name": "xxx.png",
      "extension": "png"
    }
  ]
}
```

### 解析规则

1. 读取 `rootFolders[].name` 作为案例名，创建同名子目录
2. 遍历 `codes[]`：
   - `attribute="NC"` → 解码 `content` 为源文件，解码 `compiledContent` 为编译后文件
   - `attribute="MD"` → 解码为 `README.md`
   - `attribute="GC"` → 跳过（系统配置文件）
3. 复制 `resources[]` 中的附件到案例目录
4. 更新 `INDEX.md` 索引（自动提取技术标签）
5. **重建智能索引**：导入完成后自动运行 `python3 tools/build_case_index.py` 按场景重新分类

### 输出结构

```
knowledge-base/frontend/cases/
├── INDEX.md                  # 智能索引（按场景分类 + 技术标签 + 描述）
├── REFERENCE.md              # 参考速查（全局变量、陷阱、ESB 方式对比）
├── 案例名称1/
│   ├── entry.js
│   ├── XxxComponent.js
│   ├── README.md
│   └── *.png
└── 案例名称2/
    └── ...
```

## 执行步骤

1. **确认文件路径**：用户提供的 ZIP 文件路径必须存在
2. **运行解析脚本**：
   ```bash
   python3 tools/parse_case_zip.py "<zip文件路径>"
   ```
3. **检查输出**：查看控制台输出，确认案例名称、文件数量、是否有警告
4. **验证结果**：
   ```bash
   ls -la "knowledge-base/frontend/cases/<案例名称>/"
   ```
5. **如有警告**：
   - 附件未找到：检查 ZIP 内文件名是否与 ecode.json 中记录的一致
   - base64 解码失败：原始内容可能损坏，标记跳过

## 注意事项

- 脚本自动跳过 `attribute="GC"` 的系统配置文件
- 案例名会被清理（`/` `\` 替换为 `-`）作为目录名
- 重复运行同一 ZIP 不会覆盖已有文件（会更新），但 INDEX.md 不会重复添加已存在的条目
- 临时解压目录在脚本结束后自动清理
