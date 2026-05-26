# eb 表单按钮 → 自定义弹窗 → ESB 工作流（端到端）

## 场景
在 eb 表单设计器中配置一个按钮，点击后弹出自定义 Dialog（含 DatePicker），用户选择日期后确认，触发 ESB 工作流。

## 完整流程
```
eb 表单设计器 → 按钮事件 → window.Cutsom_createDialog()
                            └─ Dialog 弹窗（DatePicker × 2）
                                 └─ 确认 → /api/esb/server/event/triggerActionFlow
                                      └─ ESB 工作流
```

## 关键点
- 弹窗函数注册到 `window` 对象，供 eb 表单按钮事件调用
- Dialog 使用 `ReactDOM.render` 命令式挂载（非 `Dialog.show()`）
- DatePicker 取值用闭包变量，无需 React 状态管理
- 按钮事件配置在 eb 表单设计器中完成（自定义脚本）

## eb 表单按钮配置
在 eb 表单设计器中：
1. 放置按钮 → 事件配置 → 自定义脚本
2. 填入：`window.Cutsom_createDialog()`

## 部署
1. ecode 开发平台 → 新建 React 项目
2. 创建 `entry.js`（前置加载）→ 粘贴代码
3. 发布
4. 在目标表单设计器中配置按钮调用 `window.Cutsom_createDialog()`

## 标签
eb表单, Dialog弹窗, ESB动作流, ReactDOM.render, triggerActionFlow, 端到端
