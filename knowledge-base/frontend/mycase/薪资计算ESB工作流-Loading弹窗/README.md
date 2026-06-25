# 薪资计算 — ESB 工作流 + Loading 弹窗

## 业务场景

**薪资计算触发**：HR 在 EB 表单页面通过自定义按钮一键触发薪资计算流程。操作分为三个步骤：

1. **选择计薪周期** — 弹出日期选择弹窗，选择起始日期和结束日期，校验日期范围合法性
2. **确认执行** — 弹出确认弹窗，展示当前计薪周期、假勤数据维护提示和维护地址链接，用户确认后开始计算
3. **等待结果** — ESB 工作流执行期间，页面居中展示 loading 遮罩（"薪资计算中...请稍后" + 旋转圆环动画），防止用户重复点击或误操作；ESB 返回后自动关闭 loading 并弹出成功/失败提示

## 技术实现

### 整体架构

```
EB 表单按钮（设计器中配置自定义脚本 window.Cutsom_createDialog()）
  │
  ├─ showCustomDialog()          ← 第一步：日期选择弹窗
  │   └─ DatePicker × 2 + 校验 → showConfirmDialog()
  │
  ├─ showConfirmDialog()         ← 第二步：确认计算弹窗
  │   └─ 点击"开始计算" → showLoading() + triggerWorkflow()
  │
  ├─ showLoading()               ← Loading 遮罩层
  │   └─ 纯 DOM innerHTML + <style> CSS 动画注入（去重）
  │
  └─ triggerWorkflow()           ← ESB 调用
      └─ POST /api/esb/server/event/triggerActionFlow
         └─ .then() / .catch() → hideLoading() → 结果提示
```

### 技术要点

| 要点 | 说明 |
|------|------|
| **弹窗方式** | ReactDOM.render 命令式挂载到 `document.body`，关闭时 unmountComponentAtNode + removeChild |
| **组件来源** | `window.weappUi` 全局变量（entry.js 前置加载，不能 import @weapp/ui） |
| **日期取值** | 闭包变量 `startDate` / `endDate`，DatePicker onChange 赋值，无需 React state |
| **Loading 实现** | 纯 DOM 操作 + innerHTML + CSS `@keyframes`，不依赖 React/weappUi；注入 `<style>` 时通过 id 去重 |
| **CSS 动画** | `border-top-color: #1890ff` 圆环旋转，`animation: ecodeSpin 0.8s linear infinite` |
| **ESB 接口** | `POST /api/esb/server/event/triggerActionFlow`，参数 `{ customParams, moduleSource, esbFlowId }` |
| **成功判断** | `res.resultCode == '200'` → 成功；否则 → 失败；`.catch()` → 网络异常 |
| **异常安全** | `.then()` 和 `.catch()` 均先调用 `hideLoading()` 再弹结果，确保 loading 一定关闭 |

### 弹窗链状态管理

三个弹窗采用**独立函数 + 顺序调用**模式，而非单一组件内状态机：

- 每个弹窗是独立函数，职责单一
- 前一个弹窗 destroy 后再调用下一个，避免 DOM 残留
- `showCustomDialog → showConfirmDialog → triggerWorkflow` 单向链式调用

## 使用方式

1. 将 `entry.js` 代码放入 ecode 项目的 entry.js（前置加载）
2. 在 EB 表单设计器中配置按钮，事件 → 自定义脚本 → `window.Cutsom_createDialog()`
3. 修改 `esbFlowId` 为目标工作流 ID
4. 修改确认弹窗中的维护地址和文案

## 标签

`EB表单` `按钮触发` `Dialog命令式弹窗` `DatePicker日期选择` `ESB动作流` `Loading遮罩` `CSS旋转动画` `ReactDOM.render` `triggerActionFlow` `多步弹窗链` `异常安全`
