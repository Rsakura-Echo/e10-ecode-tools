# ESB 动作流触发 — SDK 直接触发

## 场景
在 eb 表格视图或 eb 表单下直接调用动作流。

## 关键点
- `ebdfpageSDK.callEsbFlow(esbFlowId, mainParams, detailParams)`
- esbFlowId: 动作流模块创建的动作流 ID 主键
- mainParams: 主表参数对象
- detailParams: 明细参数二维数组
- **此 SDK 仅在 eb 表单内置环境中可用**

## 标签
ESB动作流, ebdfpageSDK, callEsbFlow, eb表单
