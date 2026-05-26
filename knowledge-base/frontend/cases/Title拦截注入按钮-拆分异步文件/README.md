# Title 注入 + 拆分异步文件（分工模式）

## 场景
弹窗内容复杂（多字段、复杂校验、富文本等），不能全写在 entry.js 中，需要拆分为 entry.js + 异步文件的模式。

## 关键点
- **`asyncImport` 必须在 entry.js 顶层调用**，不能放在 onClick 等事件回调中动态调用
- onClick 回调内调用 `asyncImport` 会报错：`Ecode async import() failed`
- 正确做法：在 entry.js 顶部 `const promise = asyncImport(...)` 预加载，onClick 中 `.then(mod => mod.fn())`
- 异步文件中可以 import `@weapp/ui`（entry.js 不行，只能用 `window.weappUi`）
- 异步文件导出命名函数（`export function`），通过 Promise 的 `.then()` 调用

## 与单文件模式对比

| 维度 | 单文件模式 | 拆分文件模式 |
|------|-----------|-------------|
| 代码位置 | 全部在 entry.js | entry.js + 异步文件 |
| 组件访问 | `window.weappUi` | `import { ... } from '@weapp/ui'` |
| 适用场景 | 简单弹窗（1-2 字段） | 复杂弹窗（多字段、富文本、复杂校验） |
| entry.js 体积 | 较大 | 较小（入口更轻量） |
| asyncImport | 不需要 | 必须在**顶层**预加载 |

## 标签
regOvProps, Title拦截, Dialog弹窗, asyncImport, 拆分异步文件, forwardRef
