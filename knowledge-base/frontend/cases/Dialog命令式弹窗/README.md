# Dialog 弹窗（命令式，ReactDOM.render 模式）

## 场景
通过命令式 API 弹出 Dialog，而不是 `<Dialog visible={...}>` 声明式使用。

## 关键点
- **Dialog 没有 `.show()` 静态方法！** 不能用 `Dialog.show()`
- 正确方式：`ReactDOM.render(<Dialog visible ...>, 动态创建的 div)`
- 关闭时必须：`unmountComponentAtNode` + `removeChild`
- **简单场景不需要 `useState`**：DatePicker/Input 用闭包变量捕获值即可
- **复杂场景**（需要联动校验、动态 UI）才用 `forwardRef` + `useImperativeHandle`

## 两种写法

### 写法 A：闭包变量（推荐，最简单）
适用于只需要取值、简单校验的场景。用闭包变量捕获 DatePicker/Input 的值。

### 写法 B：forwardRef + useImperativeHandle（复杂场景）
适用于表单校验复杂、需要 loading 状态、动态错误提示的场景。

## 标签
Dialog弹窗, ReactDOM.render, 闭包变量, forwardRef, useImperativeHandle, window.weappUi
