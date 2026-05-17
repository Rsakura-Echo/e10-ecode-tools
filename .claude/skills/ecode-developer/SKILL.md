---
name: ecode-developer
description: 泛微 E10 ecode 前端开发助手。当用户描述一个前端二开需求时（如复写按钮、弹出页面、表单交互、调用接口/ESB动作流等），根据需求直接生成完整的 ecode 开发代码。
type: project
---

# E10 ecode 前端开发技能

## 概述

此技能用于辅助 E10 ecode 平台的前端二开开发。用户用自然语言描述需求，此技能负责生成符合 ecode 规范的完整代码。

## 知识库

前端开发文档位于 `knowledge-base/frontend/`，排查手册位于 `knowledge-base/other/`，使用 Grep 按需检索：

```bash
grep -rni "关键词" knowledge-base/frontend/ --include="*.md"
grep -rni "关键词" knowledge-base/other/ --include="*.md"
```

**核心文件速查**：

| 文档 | 内容 |
|------|------|
| `knowledge-base/frontend/01-ecode-overview.md` | 平台概述、核心概念、调试方法 |
| `knowledge-base/frontend/02-project-structure.md` | 项目结构、模块系统、样式处理 |
| `knowledge-base/frontend/03-component-override.md` | regOvProps / regOvComponent 组件复写 |
| `knowledge-base/frontend/04-new-page-development.md` | 新页面开发、路由注册 |
| `knowledge-base/frontend/05-api-request.md` | 前端接口请求与拦截 |
| `knowledge-base/frontend/06-utils-library.md` | @weapp/utils 工具库 API |
| `knowledge-base/frontend/07-ui-components.md` | UI 组件库参考（PC/Mobile） |
| `knowledge-base/frontend/08-esb-serverless.md` | ESB 动作流、Serverless Action |
| `knowledge-base/frontend/10-real-world-patterns.md` | **实战案例库（真实验证可用）** — Dialog 弹窗、Title 拦截、ESB 触发3种方式、全局变量速查、常见陷阱 |
| `knowledge-base/frontend/19-frontend-module-system.md` | 模块导入导出、前置/异步加载、开发依赖、模板变量 |
| `knowledge-base/frontend/20-frontend-plugins-controls.md` | 公共插件、第三方JS、weId判断、调试、代码屏蔽 |
| `knowledge-base/frontend/25-workflow-js-sdk.md` | **流程详情 JS-SDK** — 拦截事件、钩子事件、操作菜单、系统字段、页签扩展、实战模式 |
| `knowledge-base/frontend/26-eb-dfpage-sdk.md` | **EB 表单建模 dfpageSDK** — 表格视图/表单视图 SDK、保存前校验、批量操作、自定义弹框 |
| `knowledge-base/other/09-troubleshooting-guide.md` | 常见问题排查手册 |

## 核心开发模型

### 应用结构
```
项目/
├── entry.js          # 入口文件（前置加载，只做注册）
├── MyComponent.js    # 异步组件（非前置加载）
├── MyPage.js         # 页面组件
└── index.css         # 样式文件（前置加载）
```

### 核心依赖
```js
import React from 'react';                                    // react@17
import ReactDOM from 'react-dom';                            // react-dom@17
import axios from 'axios';                                   // axios@0.21
import { Route, Link, withRouter } from 'react-router-dom';   // react-router-dom@5
import { regOvProps, regOvComponent, appInfo, regReactChildren, request } from '@weapp/utils';
import { asyncImport, jsonp } from '@weapp/ecodesdk';
import { Button, Input, DatePicker, Dialog, Select } from '@weapp/ui'; // @weapp/ui 组件（仅异步文件）
```

### 模板变量
- `${appId}` - 应用 AppId（编译时自动替换）
- `${appRes}` - 应用 resources 目录地址

## 代码生成规则

### 规则 1：入口文件只做注册
entry.js 只包含注册逻辑（regOvProps / regOvComponent），使用 `React.lazy(() => asyncImport(...))` 异步引入实际组件。

### 规则 2：组件替换必须转发 ref
```js
regOvComponent('weappUi', 'ComponentName', (Com) => {
  return React.forwardRef((props, ref) => {
    // 判断逻辑...
    return <Com {...props} ref={ref} />;
  });
}, 0);
```

### 规则 3：限定生效范围
- weId：`props.weId.endsWith("_xxx")`
- URL：`window.location.pathname.includes('/path')`
- 字段：`props.fieldId === 'xxx'`

### 规则 4：新页面路由
- PC：`/sp/custom/${appId}/your-path`
- Mobile：`/mobile/custom/${appId}/your-path`

### 规则 5：异步引入（asyncImport 必须在顶层预加载）

**关键约束：`asyncImport` 必须在 entry.js 顶层调用，不能放在 onClick 等事件回调中！**
在事件回调中动态调用会导致 `Ecode async import() failed` 错误。

**加载组件：**
```js
const MyComponent = React.lazy(() => asyncImport('${appId}', 'MyComponent'));
// 使用时包裹 Suspense
<React.Suspense fallback={() => {}}>
  <MyComponent {...props} />
</React.Suspense>
```

**加载模块函数（命令式弹窗等场景）：**
```js
// ✅ 正确：在顶层预加载，回调中 .then() 取结果
const dialogModulePromise = asyncImport('${appId}', 'DateDialog');

// 按钮 onClick 中：
onClick={() => {
  dialogModulePromise.then((mod) => {
    mod?.showDialog?.();
  });
}}

// ❌ 错误：在回调中动态调用 asyncImport
onClick={() => {
  asyncImport('${appId}', 'DateDialog').then(...); // 运行时报错！
}}
```

### 规则 6：禁止直接加载外部 CDN
所有第三方资源必须下载到 resources 目录，通过 `${appRes}/file.js` 引用。

### 规则 7：接口调用
```js
// 方式1：使用 @weapp/utils（优先推荐）
import { request } from '@weapp/utils';
request({ method: 'post', url: '/api/secondev/xxx', data: {...} });

// 方式2：使用 axios
import axios from 'axios';
axios.post('/api/secondev/xxx', {...});
```

### 规则 8：优先使用 @weapp/ui 组件，避免原生 HTML 元素

在异步（非前置）文件中，**必须优先使用 `@weapp/ui` 组件库**，禁止使用原生 HTML 表单元素：

| 场景 | ❌ 禁止（原生） | ✅ 必须使用（@weapp/ui） |
|------|----------------|------------------------|
| 按钮 | `<button>` / `<input type="button">` | `<Button>` |
| 文本输入 | `<input type="text">` / `<textarea>` | `<Input>` / `<Input.TextArea>` |
| 日期选择 | `<input type="date">` | `<DatePicker>` |
| 日期时间 | `<input type="datetime-local">` | `<DateTimePicker>` |
| 下拉选择 | `<select>` / `<option>` | `<Select>` |
| 弹窗 | 手写 div 弹窗 | `<Dialog>` / `<Modal>` |
| 表格 | `<table>` / 手写表格 | `<Table>` |
| 表单 | `<form>` + 手写校验 | `<Form>` |
| 复选框 | `<input type="checkbox">` | `<Checkbox>` |
| 单选框 | `<input type="radio">` | `<Radio>` |
| 开关 | 手写 toggle | `<Switch>` |
| 上传 | `<input type="file">` | `<Upload>` |

**原因**：@weapp/ui 组件与 E10 平台主题、权限、国际化、数据联动等能力深度集成，原生元素无法享受这些能力。

**接口调用同样优先使用 `request` from `@weapp/utils`**，而非 axios。

**注意**：
- @weapp/ui 组件**仅在异步（非前置）文件中使用**，entry.js 中不可用
- 组件完整列表参考 `knowledge-base/07-ui-components.md`
- 内联样式（`style={{...}}`）也应尽量替换为 index.css 中的 className，使用 `${appId}` 做样式隔离

## 需求分析流程

当用户描述需求时，按以下步骤分析：

1. **识别需求类型**：
   - 组件复写（修改已有功能）→ 使用 regOvProps / regOvComponent
   - 新页面（独立功能）→ 使用 Switch 路由注册
   - 接口调用 → 使用 axios 或 request
   - 混合型 → 组合使用

2. **确定生效范围**：
   - 通过 weId 限定具体组件
   - 通过 URL 限定具体页面
   - 全局生效（不推荐）

3. **选择技术方案**：
   - 修改按钮行为 → regOvComponent 替换按钮
   - 修改表单字段 → regOvProps 修改 props
   - 弹出页面 → 组件内实现弹窗 或 注册新路由
   - 调用接口 → axios / request
   - ESB 动作流 → 调用后端接口触发

4. **生成文件清单**：
   - entry.js（注册逻辑）
   - 各功能组件文件（异步加载）
   - CSS 文件（如需）

5. **输出代码**：
   - 用 `${appId}` 模板变量
   - 遵循 ecode 规范
   - 包含 import 语句
   - 注释说明关键逻辑

## 输出格式

生成代码时按以下格式组织：

```
## 需求分析
- 需求类型：[复写/新页面/接口调用]
- 生效范围：[描述]
- 技术方案：[描述]

## 文件结构
- entry.js - [说明]
- Xxx.js - [说明]
- ...

## 代码

### entry.js
\`\`\`js
// 完整代码
\`\`\`

### Xxx.js
\`\`\`js
// 完整代码
\`\`\`
```

## 关键注意事项

1. **优先使用 @weapp/ui 组件**：异步文件中禁止使用原生 HTML 表单元素（`<input>`、`<button>`、`<select>` 等），必须使用 @weapp/ui 对应组件。详见规则 8。
2. 只在异步（非前置）文件中使用 `@weapp/ui` 组件库
3. **入口文件中通过 `window.weappUi` 访问组件**：entry.js 不能 import `@weapp/ui`，但在运行时可通过 `window.weappUi.Button` 等全局变量访问
4. **Dialog 没有 `.show()` 静态方法**：`@weapp/ui` 的 Dialog 是声明式组件（`<Dialog visible={...}>`），没有命令式 API。需要命令式弹窗时，使用 `ReactDOM.render` 将自定义弹窗组件挂载到 `document.body`，关闭时 `unmountComponentAtNode` 销毁
5. **优先使用 `request` from `@weapp/utils`** 发送接口请求，而非 axios
6. 入口文件不要被其他文件引用
7. 避免循环引用
8. className 使用 `${appId}` 变量做样式隔离，不用 weId
9. 使用 `endsWith` 匹配 weId 末端，不要用 `===` 全等匹配（Title 组件拦截除外，需用 weId 全等匹配）
10. ESB Action 需要后端 Java 代码 + XML 配置，前端通过 API 调用触发
11. 内联样式（`style={{...}}`）应尽量替换为 index.css 中的 className
12. ESB 触发接口：`/api/ebuilder/form/esb/runEsb`，参数 `{ dataIds, esbActionIds, params }`
13. **asyncImport 必须在 entry.js 顶层调用**：不能放在 onClick/onChange 等事件回调中动态调用，会报 `Ecode async import() failed`。正确做法：顶层 `const p = asyncImport(...)` 预加载，回调中 `p.then(mod => mod.fn())` 取结果
