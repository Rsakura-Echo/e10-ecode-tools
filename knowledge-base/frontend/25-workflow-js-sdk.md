# 25 - 流程详情前端 JS-SDK

## 概述

流程详情前端 JS-SDK（`window.weappWorkflow`）用于在流程审批详情页面进行前端二开，支持在 ecode 平台、表单布局设计器代码块、流程 ecode 自定义开发中使用。**对 EB 流程同样生效**。

### 获取 SDK 实例

```js
const wffpSdk = window.weappWorkflow.getFlowPageSDK();
```

**重要**：页面可能存在多个流程详情（弹窗叠加），`getFlowPageSDK()` 获取的是当前活动窗口的实例。如需操作非活动窗口，需要持有之前的实例引用。

### 开发入口

| 入口 | 生效范围 |
|------|---------|
| ecode 开发平台 | 代码内控制生效范围 |
| 表单设计器布局 → 插入代码块 | 对当前布局生效 |
| 工作流管理 → 功能设置 → 自定义 ecode 开发 | 对当前工作流所有节点布局生效（PC+移动） |
| 应用设置 → 自定义 ecode 开发 | 对当前租户所有审批流生效 |

### ecode 中开发样例（24.0401 基线以上）

```js
import { regHook } from '@weapp/utils';

const flowPageLoadFn = (params) => {
    const { baseParam } = params;
    const { isCreate, workflowId, requestId, apiModule } = baseParam || {};

    if (workflowId == '731260655157936133') {
        const wffpSdk = window.weappWorkflow.getFlowPageSDK();
        wffpSdk.onceReady(() => {
            const weFormSdk = window.WeFormSDK.getWeFormInstance();
        });
    }
}

// PC端
regHook('weappWorkflow', 'FPMainTabWillMount', flowPageLoadFn);
// 移动端
regHook('weappWorkflow', 'MFPMainTabWillMount', flowPageLoadFn);
// 打印布局
regHook('weappWorkflow', 'FPPrintCompWillMonut', flowPageLoadFn);
```

---

## 一、获取常用参数及编码

### 1.1 基础参数 getBaseParam()

```js
const params = wffpSdk.getBaseParam();
```

| 参数 | 类型 | 说明 |
|------|------|------|
| workflowId | long | 工作流 ID |
| requestId | long | 流程 ID（非新建有效） |
| isCreate | boolean | true 表示新建流程 |
| isAgent | boolean | true 表示代理处理 |
| userCurrentNodeId | long | 当前打开身份节点（负数表示自由节点） |
| fixedNodeId | long | 对应工作流固定节点 |

### 1.2 常用参数 getCommonParam()（24.0601+）

```js
const commonParam = wffpSdk.getCommonParam();
```

| 参数 | 类型 | 说明 |
|------|------|------|
| isTodo | boolean | true 表示待办身份打开 |
| isDraft | boolean | true 表示草稿流程 |
| userCurrentNodeType | int | 0:发起 1:审批 2:确认 3:结束 |
| wfSymbol | string | 工作流编码 |
| nodeSymbol | string | 节点编码 |

### 1.3 获取工作流/节点编码（24.0601+）

```js
const wfSymbol = wffpSdk.getWfSymbol();     // 工作流编码
const nodeSymbol = wffpSdk.getNodeSymbol();  // 节点编码
```

编码用于二开代码解耦和复用。在工作流基础信息、节点基础信息中配置编码。

---

## 二、事件机制

### 2.1 拦截事件 registerInterceptEvent

指定动作执行前触发，可阻断/放行后续操作。

```js
wffpSdk.registerInterceptEvent(types, fn, order?, fnNameCover?)
```

| 参数 | 说明 |
|------|------|
| types | 事件类型枚举，逗号分隔或数组 |
| fn | 接收 successFn、failFn，放行则调用 successFn()，阻断则调用 failFn() |
| order | 默认 0，值越小越先执行 |
| fnNameCover | **推荐自定义命名**，保障事件仅注册一次（如 `custom_savedev_20250901`） |

**事件类型**：

| type | 用途 |
|------|------|
| `SaveData` | 表单数据保存时触发（2504 基线后 order<1 保存前触发，order>1 保存后触发） |
| `BeforeSubmit` | 表单保存成功后，流程提交动作前触发 |
| `AfterOperate` | 操作完成后 & 页面跳转/关闭前 |
| `BeforeClickOperBtn\|${menutype}` | 操作按钮点击前触发 |
| `BeforeOperate\|${menutype}` | 转发/退回等弹窗确认前 |
| `ClosePageIntercept` | 页面关闭时触发 |

**常用 menutype**：

| menutype | 描述 |
|----------|------|
| SAVE_DATA | 保存 |
| SUBMIT | 提交 |
| AGREE | 批准 |
| VERIFY | 确认 |
| REJECT | 退回 |
| TAKE_BACK | 强制收回 |
| TURNTODO | 转办 |
| FORWARD | 转发 |
| REMARKADVICE | 意见征询 |

```js
// 查看当前流程操作按钮清单
console.log(window.weappWorkflow.getFlowPageSDK().baseStore.operMenus);
```

**示例 1：表单保存前校验（如日期校验）**

```js
wffpSdk.registerInterceptEvent("SaveData", (successFn, failFn) => {
    // TODO 自定义校验逻辑
    if (/* 校验通过 */) {
        successFn();
    } else {
        failFn(); // 阻断保存
    }
}, -1, 'custom_savedev_20250901');
```

**示例 2：拦截提交按钮**

```js
wffpSdk.registerInterceptEvent("BeforeClickOperBtn|SUBMIT", (successFn, failFn, params) => {
    const menutype = params?.btn?.menutype;
    if (/* 校验通过 */) {
        successFn();
    } else {
        failFn();
    }
}, 0, 'custom_submitdev_20250901');
```

### 2.2 钩子事件 registerHookEvent

注册函数在指定动作下触发，函数内异常不影响原逻辑。

```js
wffpSdk.registerHookEvent(types, fn, autoJudgeExecute?, order?, fnNameCover?)
```

| 参数 | 说明 |
|------|------|
| autoJudgeExecute | 默认 false，true 表示不论何时注册都会执行一次 |
| fnNameCover | 推荐命名，实现始终注册一次 |

**事件类型**：

| type | 用途 |
|------|------|
| `ReloadList` | 提交后刷新源列表时触发 |
| `FormRenderComplete` | 新建 & 表单渲染完成后（仅本地表单） |
| `DestroyPage` | 页面销毁时触发 |
| `LoadRenderComplete` | 表单加载完成后触发 |
| `CreateRequestComplete` | 创建流程成功后触发（参数含 requestId） |
| `AfterOperateHook` | 操作成功后执行 |
| `DraftOperateHook` | 草稿状态操作后执行 |
| `SwitchTabHook` | 切换页签后执行 |
| `AfterSubmitHook` | 提交/批准/确认后执行（成功失败都触发） |
| `ChangeSysFieldEvent` | 系统字段值变更触发 |

### 2.3 Ready 加载事件（不推荐）

| 方法 | 触发时机 |
|------|---------|
| `.ready` | 首次打开 + 页面二次 Render 触发 |
| `.preReady` | 首次打开 + 页面二次 Render（不可获取 baseParam） |
| `.onceReady` | 仅首次打开 |
| `.preOnceReady` | 仅首次打开（不可获取 baseParam） |

---

## 三、操作菜单/事件控制

### 3.1 添加操作菜单 addOperMenu

```js
wffpSdk.addOperMenu({
    id: '-101',
    menutype: 'custombtn_1',
    title: '紧急申请',
    istop: true,
    pcIcon: '...',
    mobileIcon: '...',
}, 'Third'); // First/Second/Third/Last
```

### 3.2 复写按钮点击事件

```js
wffpSdk.registerInterceptEvent('BeforeClickOperBtn|custombtn_1', (successFn, failFn, params) => {
    // 自定义按钮点击逻辑
});
```

### 3.3 触发按钮事件

```js
wffpSdk.doTriggerRightBtn(menuType);  // 触发指定按钮
wffpSdk.doSave();                      // 触发保存（会刷新页面）
wffpSdk.doSilentSave(() => {...});   // 静默保存（不刷页面，仅刷组件）
```

### 3.4 操作成功后复写

```js
wffpSdk.registerInterceptEvent('AfterOperate', (successFn, failFn, triggerParams) => {
    const { menuType } = triggerParams;
    if (menuType === 'SUBMIT' || menuType === 'AGREE') {
        // 提交/审批后自定义逻辑
    }
    successFn(); // 继续后续流程
});
```

### 3.5 修改/隐藏按钮

```js
wffpSdk.modifyOperMenu('MATTERS_FORWARD', '分享');           // 改名
wffpSdk.modifyOperMenu('MATTERS_FORWARD', '', false);        // 隐藏
```

### 3.6 按钮置灰 controlBtnDisable

```js
wffpSdk.controlBtnDisable('all', true);     // 置灰全部
wffpSdk.controlBtnDisable('REJECT', true);  // 置灰指定按钮
```

### 3.7 移动端追加悬浮按钮

```js
wffpSdk.appendQuickMenuBtn({
    btnKey: 'customBtn',
    iconName: 'Icon-Approval-process-o',
    onClick: () => { console.log('点击'); },
    desc: '自定义按钮',
});
```

---

## 四、框架控制

### 4.1 切换页签

```js
wffpSdk.switchTab('chart'); // 切换到流程图
```

### 4.2 页签切换拦截/钩子

```js
// 切换前拦截
wffpSdk.registerInterceptEvent('SwitchTabIntercept', (successFn, failFn, params) => {
    const { oldTabKey, newTabKey } = params;
    if (newTabKey === 'custom_1') { successFn(); }
});

// 切换后钩子
wffpSdk.registerHookEvent('SwitchTabHook', (params) => {
    const { oldTabKey, newTabKey } = params;
});
```

### 4.3 扩展添加页签

```js
wffpSdk.appendTab('custom_1', '统计结果查询', 'Last');
```

---

## 五、系统字段

### 5.1 获取系统字段值

```js
wffpSdk.getSysFieldValue('RequestName');      // 流程标题
wffpSdk.getSysFieldValue('RequestLevel');     // 紧急程度
wffpSdk.getSysFieldValue('RequestMark');      // 流程编号
wffpSdk.getSysFieldValue('RequestSecLevel');  // 密级
```

### 5.2 修改系统字段值

```js
wffpSdk.changeSysFieldValue('RequestName', '新标题');
wffpSdk.changeSysFieldValue('RequestLevel', 1); // 1/2/3
wffpSdk.changeSecLevel('40', '20年');
```

### 5.3 修改系统字段属性

```js
wffpSdk.changeSysFieldAttr('RequestName', 1);      // 1:只读 2:编辑 3:必填
wffpSdk.changeSysFieldAttr('RequestLevel', 2);
wffpSdk.changeSysFieldAttr('RequestSecLevel', 3);
```

### 5.4 系统字段值变更事件

```js
wffpSdk.registerHookEvent('ChangeSysFieldEvent', (params) => {
    const { fieldType, data } = params;
    if (fieldType === 'REQ_REQUEST_NAME') { /* 标题变更 */ }
});
```

---

## 六、签字意见

```js
// 修改意见
wffpSdk.changeRemark('同意');
wffpSdk.changeRemark('你好', false, false, false);  // 头部追加

// 获取意见
const remark = wffpSdk.getSignRemark();      // 去除 HTML
const rawRemark = wffpSdk.getSignRemark(false); // 含 HTML
```

---

## 七、通用方法

### 7.1 提示框 showMessage

```js
wffpSdk.showMessage('警告提示', 1, 3); // type: 1警告 2错误 3成功 4加载 5普通
```

### 7.2 确认框 showConfirm

```js
wffpSdk.showConfirm("确认内容？",
    () => { /* 确定 */ },
    () => { /* 取消 */ },
    { title: "标题", okText: "确定", cancelText: "取消" }
);
```

### 7.3 关闭页面

```js
wffpSdk.closePage();       // 有变更时弹提示
wffpSdk.closePage(false);  // 不弹提示
```

---

## 八、URL 地址与参数

| 场景 | 地址 |
|------|------|
| PC 新建 | `/sp/workflow/flowpage/create/:workflowId` |
| PC 查看 | `/sp/workflow/flowpage/view/:requestId` |
| 移动端新建 | `/mobile/workflow/flowpage/create/:workflowId` |
| 移动端查看 | `/mobile/workflow/flowpage/view/:requestId` |
| 自适应分发 | `/sp/workflow/adapter/flowpage/view/:requestId` |

### 新建时 URL 参数给表单字段赋值

```
# 按字段 ID 赋值
/sp/workflow/flowpage/create/{workflowId}?{fieldId}={value}

# 按 fieldName 赋值
/sp/workflow/flowpage/create/{workflowId}?{fieldName}={value}

# 大量参数需加 fieldAssignKeys
/sp/workflow/flowpage/create/{workflowId}?field1=11&field2=22&fieldAssignKeys=field1,field2
```

### 移动端打开详情

```js
import { weappSDK } from '@weapp/utils';
weappSDK.openLink({
    url: "/sp/workflow/adapter/flowpage/view/:requestId",
});
```

---

## 九、常用实战模式

### 模式 1：提交流程前校验表单字段

```js
import { regHook } from '@weapp/utils';

regHook('weappWorkflow', 'FPMainTabWillMount', (params) => {
    const { baseParam } = params;
    const wffpSdk = window.weappWorkflow.getFlowPageSDK();

    wffpSdk.onceReady(() => {
        const weFormSdk = window.WeFormSDK.getWeFormInstance();

        wffpSdk.registerInterceptEvent('BeforeClickOperBtn|SUBMIT', (successFn, failFn) => {
            // 获取表单字段值
            const fieldData = weFormSdk.getFormFieldVal('dateFieldId');
            const selectedDate = new Date(fieldData);

            // 校验：日期不能超过当前日期 7 天
            const maxDate = new Date();
            maxDate.setDate(maxDate.getDate() + 7);

            if (selectedDate > maxDate) {
                wffpSdk.showMessage('日期不能超过当前日期 7 天', 2, 3);
                failFn();
                return;
            }
            successFn();
        }, 0, 'custom_submit_date_check');
    });
});
```

### 模式 2：新建时自动修改流程标题

```js
wffpSdk.registerHookEvent('FormRenderComplete', () => {
    if (wffpSdk.getBaseParam().isCreate) {
        const user = window.TEAMS?.currentUser;
        wffpSdk.changeSysFieldValue('RequestName',
            `${user.name}-${new Date().toLocaleDateString()}`);
    }
});
```

### 模式 3：审批后发消息

```js
wffpSdk.registerInterceptEvent('AfterOperate', (successFn, failFn, triggerParams) => {
    if (triggerParams.menuType === 'AGREE') {
        // 自定义消息发送逻辑
    }
    successFn();
});
```
