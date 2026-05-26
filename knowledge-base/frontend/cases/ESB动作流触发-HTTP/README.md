# ESB 动作流触发 — HTTP 方式（ecode/JS 通用）

## 场景
在 ecode 前端或 JS 代码中通过 HTTP 接口触发自定义动作流。

## 接口
```
POST /api/esb/server/event/triggerActionFlow
Content-Type: application/json
```
需要 E10 登录验证（eteamsId）。

## 触发参数结构
```json
{
    "customParams": {
        "mainTable": {
            "dataId": "#可选",
            "docType": "#可选"
        }
    },
    "moduleSource": "ecode",
    "esbFlowId": "1764943003169984583"
}
```

## 关键点
- 成功判断：`res.resultCode == '200'`
- 获取动作流 ID：在 ESB 动作流管理页面获取，或通过 SQL 查询唯一值

## 标签
ESB动作流, triggerActionFlow, request, 接口调用
