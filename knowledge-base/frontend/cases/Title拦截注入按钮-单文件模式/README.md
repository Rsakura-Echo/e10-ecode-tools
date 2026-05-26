# Title 组件拦截 + 注入自定义按钮（单文件模式）

## 场景
在页面标题栏（Title 组件）右侧添加自定义按钮，点击弹出含 Input + DatePicker 的 Dialog。

## 关键点
- 使用 `regOvProps`（不是 `regOvComponent`）拦截 Title
- 通过 `props.buttons` 注入按钮
- Title 的 weId 匹配用 `===` 全等（不是 `endsWith`）
- entry.js 中通过 `window.weappUi` 访问所有 UI 组件（不能 import `@weapp/ui`）
- Dialog 没有 `.show()` 静态方法，使用 `ReactDOM.render` 命令式挂载
- Input/DatePicker 取值用闭包变量，简单场景无需 useState
- 销毁时必须 `unmountComponentAtNode` + `removeChild`

## 适用场景
弹窗逻辑简单（1-2 个字段），不需要复杂的表单校验和状态管理。

## 标签
regOvProps, Title拦截, Dialog弹窗, ReactDOM.render, window.weappUi, 单文件模式
