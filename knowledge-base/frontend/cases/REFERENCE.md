# E10 ecode 参考速查

## 全局变量速查

| 变量 | 类型 | 说明 |
|------|------|------|
| `window.weappUi` | 对象 | @weapp/ui 运行时全局实例。包含 `Button`、`Dialog`、`DatePicker`、`Input` 等所有组件 |
| `window.weappUtils` | 对象 | @weapp/utils 运行时全局实例。包含 `request`、`regOvProps`、`regOvComponent` 等 |
| `window.ebuilderSDK` | 对象 | eb 表单全局 SDK，用于获取页面/表单数据 |
| `window.ebdfpageSDK` | 对象 | eb 表单页面 SDK，包含 `callEsbFlow`、`getCardSDK` 等 |

### 组件访问方式

```js
// 在 entry.js 中（不能 import @weapp/ui）
const { Button, Dialog, DatePicker } = window.weappUi;

// 在异步组件中（可以直接 import）
import { Button, Dialog, DatePicker } from '@weapp/ui';
```

## 常见陷阱

| 陷阱 | 错误写法 | 正确写法 |
|------|---------|---------|
| asyncImport 调用位置 | 在 `onClick` 等事件回调中动态调用 | **必须在 entry.js 顶层预加载**，回调中 `.then()` 取结果 |
| Dialog 命令式调用 | `Dialog.show({...})` | `ReactDOM.render(<Dialog visible ...>, div)` |
| Dialog 关闭 | 只移除 div | `unmountComponentAtNode` + `removeChild` |
| Title weId 匹配 | `weId.endsWith('_xxx')` | `weId === '完整weId'` |
| 入口文件引用 UI | `import { Button } from '@weapp/ui'` | `const Button = window.weappUi?.Button` |
| ESB 接口路径 | `/api/secondev/...` 或 `/api/ebuilder/form/esb/runEsb` | `/api/esb/server/event/triggerActionFlow` |

## ESB 触发方式速查

| 方式 | 接口 | 环境要求 |
|------|------|---------|
| HTTP（通用） | `POST /api/esb/server/event/triggerActionFlow` | ecode/JS 通用，需登录 |
| SDK（eb 专用） | `ebdfpageSDK.callEsbFlow(id, main, detail)` | 仅 eb 表单环境 |
| 布局动作流 | `POST /api/ebuilder/form/esb/runVerifyEsb` | eb 布局，含表单数据 |
