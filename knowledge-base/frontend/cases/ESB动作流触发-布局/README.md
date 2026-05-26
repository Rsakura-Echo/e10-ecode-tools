# ESB 动作流触发 — 布局动作流（含表单数据）

## 场景
触发布局中的动作流事件，适用于需要传递表单数据的场景（新建布局等）。

## 接口
```
POST /api/ebuilder/form/esb/runVerifyEsb
```

## 参数结构
```json
{
    "esbActionIds": "1167723740175081475",
    "objId": "1078896094132166672",
    "formData": {
        "dataDetails": [
            {
                "content": "文本值",
                "formField": { "id": "1078896094132166687" }
            }
        ]
    }
}
```

## 获取表单数据
- **方式 A**：`ebSdk.getPageSDK().getFormFieldVal("组件ID")`
- **方式 B**：`ebdfpageSDK.getCardSDK().getCardStore().formStore.getFormDataDetail()`

## 标签
ESB动作流, runVerifyEsb, eb表单, 布局, formData
