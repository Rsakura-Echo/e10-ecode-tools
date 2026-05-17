# 10 - E10 ecode 实战案例库

## 概述

本文档记录在 E10 二开实践中**真实验证可用**的代码模式。与 `07-ui-components.md`（组件 API 参考）不同，此文档中的每个案例均来自实际可运行的代码。

## 案例 1：Title 组件拦截 + 注入自定义按钮（单文件模式）

### 场景
在页面标题栏（Title 组件）右侧添加自定义按钮，点击弹出含 Input + DatePicker 的 Dialog。

### 关键点
- 使用 `regOvProps`（不是 `regOvComponent`）拦截 Title
- 通过 `props.buttons` 注入按钮
- Title 的 weId 匹配用 `===` 全等（不是 `endsWith`）
- entry.js 中通过 `window.weappUi` 访问所有 UI 组件（不能 import `@weapp/ui`）
- Dialog 没有 `.show()` 静态方法，使用 `ReactDOM.render` 命令式挂载
- Input/DatePicker 取值用闭包变量，简单场景无需 useState
- 销毁时必须 `unmountComponentAtNode` + `removeChild`

### 代码（全部写在 entry.js）

```js
// entry.js（前置加载）
import React from 'react';
import ReactDOM from 'react-dom';
import { regOvProps, request } from '@weapp/utils';

const titleWeId = "实际Title的完整weId";

// 弹窗函数：直接写在 entry.js 中，通过 window.weappUi 访问组件
const showTextDateDialog = () => {
  const { Dialog, Button, Input, DatePicker } = window.weappUi;

  let textValue = '';
  let dateValue = null;

  const wrap = document.createElement('div');
  const dialogId = 'dialog-text-date-' + Date.now();
  wrap.setAttribute('id', dialogId);
  document.body.appendChild(wrap);

  const destroy = () => {
    const div = document.getElementById(dialogId);
    if (!div) return;
    ReactDOM.unmountComponentAtNode(div);
    if (div.parentNode) div.parentNode.removeChild(div);
  };

  const onOk = () => {
    if (!textValue.trim()) {
      Dialog.message({ type: 'error', content: '请输入文本内容' });
      return;
    }
    if (!dateValue) {
      Dialog.message({ type: 'error', content: '请选择日期' });
      return;
    }
    request({
      method: 'post',
      url: '/api/secondev/your-endpoint',
      data: { text: textValue.trim(), date: dateValue },
    }).then((res) => {
      if (res?.data?.status) {
        Dialog.message({ type: 'success', content: '提交成功' });
        destroy();
      }
    });
  };

  const dialog = (
    <Dialog visible title="请输入信息" placement="middle" closable
      destroyOnClose draggable maskClosable mask onClose={destroy} width={480}
      footer={[
        <Button key="cancel" onClick={destroy}>取消</Button>,
        <Button key="confirm" type="primary" onClick={onOk}>确认</Button>,
      ]}
    >
      <div>
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
          <span style={{ width: 80, flexShrink: 0 }}>文本内容：</span>
          <Input placeholder="请输入" onChange={(val) => { textValue = val; }} allowClear />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ width: 80, flexShrink: 0 }}>日期选择：</span>
          <DatePicker placeholder="请选择日期" onChange={(val) => { dateValue = val; }} />
        </div>
      </div>
    </Dialog>
  );

  ReactDOM.render(dialog, wrap);
};

regOvProps('weappUi', 'Title', (props) => {
  if (props.weId === titleWeId) {
    const Button = window.weappUi?.Button;
    if (Button) {
      const customButton = (
        <Button key="custom-btn" type="primary" onClick={showTextDateDialog}>
          自定义弹窗
        </Button>
      );
      props.buttons = [customButton, ...props.buttons];
    }
  }
  return props;
}, 0);
```

### 适用场景
弹窗逻辑简单（1-2 个字段），不需要复杂的表单校验和状态管理。

---

## 案例 2：Title 注入 + 拆分异步文件（分工模式）

### 场景
弹窗内容复杂（多字段、复杂校验、富文本等），不能全写在 entry.js 中，需要拆分为 entry.js + 异步文件的模式。

### 关键点
- **`asyncImport` 必须在 entry.js 顶层调用**，不能放在 onClick 等事件回调中动态调用
- onClick 回调内调用 `asyncImport` 会报错：`Ecode async import() failed`
- 正确做法：在 entry.js 顶部 `const promise = asyncImport(...)` 预加载，onClick 中 `.then(mod => mod.fn())`
- 异步文件中可以 import `@weapp/ui`（entry.js 不行，只能用 `window.weappUi`）
- 异步文件导出命名函数（`export function`），通过 Promise 的 `.then()` 调用

### 代码

**entry.js（前置加载）**

```js
import React from 'react';
import { regOvProps } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';

const titleWeId = "实际Title的完整weId";

// ⚠️ asyncImport 必须在顶层预加载，不能放在 onClick 回调内！
const dialogModulePromise = asyncImport('${appId}', 'DateDialog');

regOvProps('weappUi', 'Title', (props) => {
  if (props.weId === titleWeId) {
    const Button = window.weappUi?.Button;
    if (Button) {
      const customButton = (
        <Button
          key="custom-btn"
          type="primary"
          onClick={() => {
            // 模块已在顶层预加载，这里直接 .then() 取结果
            dialogModulePromise.then((mod) => {
              mod?.showTextDateDialog?.();
            });
          }}
        >
          自定义弹窗
        </Button>
      );
      props.buttons = <>{customButton}{props.buttons}</>;
    }
  }
  return props;
}, 0);
```

**DateDialog.js（异步文件，非前置加载）**

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Input, DatePicker, Dialog, Button } from '@weapp/ui';
import { request } from '@weapp/utils';

export function showTextDateDialog() {
  let textValue = '';
  let dateValue = null;

  const wrap = document.createElement('div');
  const dialogId = 'dialog-text-date-' + Date.now();
  wrap.setAttribute('id', dialogId);
  document.body.appendChild(wrap);

  const destroy = () => {
    const div = document.getElementById(dialogId);
    if (!div) return;
    ReactDOM.unmountComponentAtNode(div);
    if (div.parentNode) div.parentNode.removeChild(div);
  };

  const onOk = () => {
    if (!textValue.trim()) {
      Dialog.message({ type: 'error', content: '请输入文本内容' });
      return;
    }
    if (!dateValue) {
      Dialog.message({ type: 'error', content: '请选择日期' });
      return;
    }
    request({
      method: 'post',
      url: '/api/secondev/your-endpoint',
      data: { text: textValue.trim(), date: dateValue },
    }).then((res) => {
      if (res?.data?.status) {
        Dialog.message({ type: 'success', content: '提交成功' });
        destroy();
      }
    });
  };

  const dialog = (
    <Dialog visible title="请输入信息" placement="middle" closable
      destroyOnClose draggable maskClosable mask onClose={destroy} width={480}
      footer={[
        <Button key="cancel" onClick={destroy}>取消</Button>,
        <Button key="confirm" type="primary" onClick={onOk}>确认</Button>,
      ]}
    >
      <div>
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
          <span style={{ width: 80, flexShrink: 0 }}>文本内容：</span>
          <Input placeholder="请输入" onChange={(val) => { textValue = val; }} allowClear />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ width: 80, flexShrink: 0 }}>日期选择：</span>
          <DatePicker placeholder="请选择日期" onChange={(val) => { dateValue = val; }} />
        </div>
      </div>
    </Dialog>
  );

  ReactDOM.render(dialog, wrap);
}
```

### 两种模式对比

| 维度 | 案例 1（单文件） | 案例 2（拆分文件） |
|------|-----------------|---------------------|
| 代码位置 | 全部在 entry.js | entry.js + 异步文件 |
| 组件访问 | `window.weappUi` | `import { ... } from '@weapp/ui'` |
| 适用场景 | 简单弹窗（1-2 字段） | 复杂弹窗（多字段、富文本、复杂校验） |
| entry.js 体积 | 较大 | 较小（入口更轻量） |
| asyncImport | 不需要 | 必须在**顶层**预加载 |

---

---

## 案例 3：Dialog 弹窗（命令式，ReactDOM.render 模式）

### 场景
通过命令式 API 弹出 Dialog，而不是 `<Dialog visible={...}>` 声明式使用。

### 关键点
- **Dialog 没有 `.show()` 静态方法！** 不能用 `Dialog.show()`
- 正确方式：`ReactDOM.render(<Dialog visible ...>, 动态创建的 div)`
- 关闭时必须：`unmountComponentAtNode` + `removeChild`
- **简单场景不需要 `useState`**：DatePicker/Input 用闭包变量捕获值即可
- **复杂场景**（需要联动校验、动态 UI）才用 `forwardRef` + `useImperativeHandle`

### 写法 A：闭包变量（推荐，最简单）

适用于只需要取值、简单校验的场景。

```js
const showDialog = () => {
  const { Dialog, Button, DatePicker } = window.weappUi;

  let field1 = null;
  let field2 = null;

  const wrap = document.createElement('div');
  wrap.setAttribute('id', 'my-dialog');
  document.body.appendChild(wrap);

  const destroy = () => {
    const div = document.getElementById('my-dialog');
    if (!div) return;
    ReactDOM.unmountComponentAtNode(div);
    if (div.parentNode) div.parentNode.removeChild(div);
  };

  const onOk = () => {
    if (!field1 || !field2) {
      window.weappUi.Dialog.message({ type: 'error', content: '请填写完整' });
      return;
    }
    // 调用接口...
    destroy();
  };

  const dlg = (
    <Dialog
      visible
      title="标题"
      placement="middle"
      closable
      destroyOnClose
      draggable
      maskClosable
      mask
      onClose={destroy}
      width={500}
      footer={[
        <Button key="cancel" onClick={destroy}>取消</Button>,
        <Button key="confirm" type="primary" onClick={onOk}>确认</Button>,
      ]}
    >
      <div>
        <div style={{ marginBottom: 16 }}>
          <span>字段1：</span>
          <DatePicker onChange={(val) => { field1 = val; }} placeholder="请选择" />
        </div>
        <div>
          <span>字段2：</span>
          <DatePicker onChange={(val) => { field2 = val; }} placeholder="请选择" />
        </div>
      </div>
    </Dialog>
  );

  ReactDOM.render(dlg, wrap);
};
```

### 写法 B：forwardRef + useImperativeHandle（复杂场景）

适用于表单校验复杂、需要 loading 状态、动态错误提示的场景。

### 代码
```js
// DateDialog.js（异步加载）
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';

// 弹窗内部表单（管理自己的状态）
const DialogForm = forwardRef((props, ref) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { DatePicker } = window.weappUi;

  const handleConfirm = async () => {
    // 验证...
    // ESB 调用...
    props.onOk?.();
  };

  // 暴露 handleConfirm 给父级的 footer 按钮
  useImperativeHandle(ref, () => ({ handleConfirm }));

  return (
    <div>
      <DatePicker value={startDate} onChange={(v) => setStartDate(v)} placeholder="起始时间" />
      <DatePicker value={endDate} onChange={(v) => setEndDate(v)} placeholder="结束时间" />
      {error && <div className="...error">{error}</div>}
    </div>
  );
});

DialogForm.displayName = 'DialogForm';

// 命令式 API
export function showDateRangeDialog() {
  const { Dialog, Button } = window.weappUi;

  const wrap = document.createElement('div');
  wrap.setAttribute('id', 'dialog-' + Date.now());
  document.body.appendChild(wrap);

  const formRef = React.createRef();

  const destroy = () => {
    const div = document.getElementById(wrap.id);
    if (!div) return;
    ReactDOM.unmountComponentAtNode(div);
    if (div.parentNode) div.parentNode.removeChild(div);
  };

  const dlg = (
    <Dialog
      visible
      title="请输入条件"
      placement="middle"
      closable
      destroyOnClose
      draggable
      maskClosable
      mask
      onClose={destroy}
      width={500}
      footer={[
        <Button key="cancel" onClick={destroy}>取消</Button>,
        <Button key="confirm" type="primary" onClick={() => formRef.current?.handleConfirm()}>
          确认
        </Button>,
      ]}
    >
      <DialogForm ref={formRef} onOk={destroy} />
    </Dialog>
  );

  ReactDOM.render(dlg, wrap);
}
```

---

## 案例 4：ESB 动作流触发 — 方式一（eb 表单按钮事件）

### 场景
通过 HTTP 接口触发 ESB 动作流，适用于 eb 表单按钮配置的事件。

### 接口
```
POST /api/ebuilder/form/esb/runEsb
```

### 代码
```js
window.weappUtils.request({
  url: '/api/ebuilder/form/esb/runEsb',
  method: 'POST',
  data: {
    dataIds: '',              // 数据 ID，多个用逗号分隔
    esbActionIds: '',         // 动作流 ID，多个用逗号分隔（此为 eb 按钮事件中的动作 ID）
    params: {                 // 可选：传递给动作流的参数
      startTime: '2024-01-01',
      endTime: '2024-12-31',
    },
  },
}).then(res => {
  if (res?.data?.status) {
    // 成功
  }
});
```

### 获取动作流 ID
在 eb 表单设计器中，找到按钮 → 事件配置 → 动作流 ID。

---

## 案例 5：ESB 动作流触发 — 方式二（SDK 直接触发）

### 场景
在 eb 表格视图或 eb 表单下直接调用动作流。

### 代码
```js
/**
 * callEsbFlow(esbFlowId, mainParams, detailParams)
 *
 * esbFlowId: 动作流模块创建的动作流 ID 主键
 * mainParams: 主表参数对象
 * detailParams: 明细参数二维数组
 */
const esbFlowId = "1586999223341314049";

const mainParams = {
  name: "张三",
  sex: "男",
  idCardNumber: "340123198503625026"
};

const detailParams = [
  [{ learningExperience: "1996/09/01-1999/07/30就读于清华大学附属中学-初中部" }], // 明细1
  [{ learningExperience: "1999/09/01-2002/07/30就读于清华大学附属中学-高中部" }], // 明细2
];

ebdfpageSDK.callEsbFlow(esbFlowId, mainParams, detailParams).then(res => {
  // ...
});
```

**注意**：此 SDK 仅在 eb 表单内置环境中可用。

---

## 案例 6：ESB 动作流触发 — 方式三（布局动作流，含表单数据）

### 场景
触发布局中的动作流事件，适用于需要传递表单数据的场景（新建布局等）。

### 接口
```
POST /api/ebuilder/form/esb/runVerifyEsb
```

### 代码
```js
window.weappUtils.request({
  url: '/api/ebuilder/form/esb/runVerifyEsb',
  method: 'POST',
  data: {
    esbActionIds: '1167723740175081475', // eb 表单事件动作 ID
    objId: '1078896094132166672',        // eb 表单 ID
    formData: {
      dataDetails: [
        {
          content: '文本值',                   // 字段值
          formField: { id: '1078896094132166687' }, // 字段 ID
        },
        {
          dataText: { content: '多行文本值' },
          formField: { id: '1078896094132166688' },
        },
        {
          content: '123',
          formField: { id: '1078896094132166689' },
          type: 'number',
        },
      ],
    },
  },
});
```

### 获取表单数据

**方式 A：页面布局下获取字段值**
```js
const ebSdk = window.ebuilderSDK;
const pageSdk = ebSdk.getPageSDK();
const val = pageSdk.getFormFieldVal("ce067a377e6e4c88bb66226c640fa17b"); // 组件 ID
```

**方式 B：eb 表单获取全部数据**
```js
const dataDetails = ebdfpageSDK.getCardSDK().getCardStore().formStore.getFormDataDetail();
// 返回的 dataDetails 可直接作为 formData.dataDetails
```

### 获取 eb 表单 ID
页面布局下：URL 参数中查找或在布局设计器中查看。

---

## 案例 7：eb 表单按钮 → 自定义弹窗 → ESB 工作流（端到端）

### 场景
在 eb 表单设计器中配置一个按钮，点击后弹出自定义 Dialog（含 DatePicker），用户选择日期后确认，触发 ESB 工作流。

### 完整流程
```
eb 表单设计器 → 按钮事件 → window.Cutsom_createDialog()
                            └─ Dialog 弹窗（DatePicker × 2）
                                 └─ 确认 → /api/ebuilder/form/esb/runEsb
                                      └─ ESB 工作流
```

### 关键点
- 弹窗函数注册到 `window` 对象，供 eb 表单按钮事件调用
- Dialog 使用 `ReactDOM.render` 命令式挂载（非 `Dialog.show()`）
- DatePicker 取值用闭包变量，无需 React 状态管理
- 按钮事件配置在 eb 表单设计器中完成（自定义脚本）

### entry.js 完整代码
```js
// ==========================================
// 业务表单自定义按钮 → 自定义弹窗 → ESB 工作流
// ==========================================

const showCustomDialog = () => {
  const { Dialog, Button, DatePicker } = window.weappUi;

  let startDate = null;
  let endDate = null;

  // 创建挂载点
  const wrap = document.createElement('div');
  wrap.setAttribute('id', 'dialogid_0001');
  document.body.appendChild(wrap);

  // 销毁函数
  const destroy = () => {
    const _div = document.getElementById('dialogid_0001');
    if (!_div) return false;
    const unmount = ReactDOM.unmountComponentAtNode(_div);
    if (unmount && _div.parentNode) {
      _div.parentNode.removeChild(_div);
    }
    return true;
  };

  // 确认回调：校验 → 触发工作流 → 关闭
  const onOk = () => {
    if (!startDate || !endDate) {
      window.weappUi.Dialog.message({ type: 'error', content: '请选择时间范围' });
      return;
    }
    triggerWorkflow(startDate, endDate);
    destroy();
  };

  const dlg = (
    <Dialog
      visible
      title="请输入条件"
      placement="middle"
      closable
      destroyOnClose
      draggable
      maskClosable
      mask
      onClose={destroy}
      width={500}
      footer={[
        <Button key="cancel" onClick={destroy}>取消</Button>,
        <Button key="confirm" type="primary" onClick={onOk}>确认</Button>,
      ]}
    >
      <div>
        <div style={{ marginBottom: 16 }}>
          <span>起始时间：</span>
          <DatePicker
            onChange={(date) => { startDate = date; }}
            placeholder="请选择起始时间"
          />
        </div>
        <div>
          <span>结束时间：</span>
          <DatePicker
            onChange={(date) => { endDate = date; }}
            placeholder="请选择结束时间"
          />
        </div>
      </div>
    </Dialog>
  );

  ReactDOM.render(dlg, wrap);
};

// ESB 工作流触发
const triggerWorkflow = (startTime, endTime) => {
  weappUtils.request({
    url: '/api/ebuilder/form/esb/runEsb',
    method: 'POST',
    data: {
      dataIds: '',
      esbActionIds: 'your_workflow_id', // 替换为实际工作流 ID
      params: { startTime, endTime },
    },
  }).then((res) => {
    if (res.data.status) {
      window.weappUi.Dialog.message({ type: 'success', content: '工作流触发成功' });
    } else {
      window.weappUi.Dialog.message({ type: 'error', content: '工作流触发失败' });
    }
  });
};

// 注册到 window，供 eb 表单按钮事件调用
window.Cutsom_createDialog = showCustomDialog;
```

### eb 表单按钮配置

在 eb 表单设计器中：
1. 放置按钮 → 事件配置 → 自定义脚本
2. 填入：
```js
window.Cutsom_createDialog()
```

### 部署
1. ecode 开发平台 → 新建 React 项目
2. 创建 `entry.js`（前置加载）→ 粘贴代码
3. 发布
4. 在目标表单设计器中配置按钮调用 `window.Cutsom_createDialog()`

---

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

---

## 常见陷阱

| 陷阱 | 错误写法 | 正确写法 |
|------|---------|---------|
| asyncImport 调用位置 | 在 `onClick` 等事件回调中动态调用 | **必须在 entry.js 顶层预加载**，回调中 `.then()` 取结果 |
| Dialog 命令式调用 | `Dialog.show({...})` | `ReactDOM.render(<Dialog visible ...>, div)` |
| Dialog 关闭 | 只移除 div | `unmountComponentAtNode` + `removeChild` |
| Title weId 匹配 | `weId.endsWith('_xxx')` | `weId === '完整weId'` |
| 入口文件引用 UI | `import { Button } from '@weapp/ui'` | `const Button = window.weappUi?.Button` |
| ESB 接口路径 | `/api/secondev/...` 或其他 | `/api/ebuilder/form/esb/runEsb` |
