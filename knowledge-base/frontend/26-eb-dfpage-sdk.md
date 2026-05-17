# 26 - EB 表单建模 JS-dfpageSDK

## 概述

`window.ebdfpageSDK` 是 E10 e-builder 建模页面的前端 JS-SDK，用于在 EB 表单视图（卡片）和 EB 表格视图（列表）中进行二开操作。适用于 ecode 项目、表单布局代码块、按钮动作中的 JavaScript 动作等场景。

---

## 一、基础 SDK

### 1.1 获取当前用户

```js
var user = ebdfpageSDK.getCurrUser();
// 或
window?.TEAMS?.currentUser
```

### 1.2 API 请求

```js
var request = window.weappUtils.request;
request({
  url: 'xxx',
  method: 'POST',
  data: {},
}).then(res => console.log(res));
```

### 1.3 全局遮罩 Spin

```js
var { globalSpin } = window.weappUi.Spin;
globalSpin.start();                           // 打开
globalSpin.start({ text: 'loading...' });    // 带文字
globalSpin.end();                             // 关闭
```

### 1.4 消息提示 message

```js
var { Dialog, MDialog } = window.weappUi;
// PC
Dialog.message({ type: 'success', content: '操作成功', delay: 3000 });
var dlg = Dialog.message({ type: 'success', content: 'xxx', delay: 0 });
dlg.destroy(); // 关闭

// Mobile
MDialog.toast({ type: 'success', content: '提示信息', mask: true });
```

### 1.5 确认框 Dialog.confirm

```js
// PC
Dialog.confirm({ type: 'success', content: '确认删除？', width: 600, height: 400 });

// Mobile
MDialog.prompt({
  title: "确认操作",
  message: "辅助信息",
  description: "说明文字",
  onOk: (value) => { console.log(value); },
  footer: [{ key: 'cancel', text: '关闭', onPress: () => { instance?.onClose?.(); } }]
});
```

### 1.6 获取 URL 参数

```js
var search = location.search.split('?')[1];
var urlParams = weappUtils.qs.parse(search);
```

### 1.7 内置 events 事件

```js
// 绑定事件
ebdfpageSDK.on('myFuncName', handlerFn, 'demo');

// 触发事件
ebdfpageSDK.emit('myFuncName', { aaa: '111' }, 'demo');

// 解绑事件
ebdfpageSDK.off('myFuncName');                          // 无 id
ebdfpageSDK.off('myFuncName', handlerFn, 'demo');       // 有 id
ebdfpageSDK.off('myFuncName', undefined, 'demo');       // 有 id 不解绑函数
```

### 1.8 拦截复写页面跳转

```js
ebdfpageSDK.registerJumpLinkRewrite((fn, info, props) => {
  // 修改跳转参数
  var params = (info?.params || []).map((p) => {
    if (p.name === 'a') return { ...p, value: 222 };
    return p;
  });
  fn({ ...info, params }, props);
});
```

### 1.9 拦截消息提示框

```js
window.ebdfpageSDK?.registerConfirmAction((isOkBtn, continueFn, breakFn) => {
  if (isOkBtn) {
    console.log('OK button click');
    continueFn();
  } else {
    breakFn();
  }
});
```

### 1.10 拦截批量弹出框保存/确定

```js
window.ebdfpageSDK.registerBeforeBatchOptSave((okFn, cancelFn, props) => {
  console.log(props);
  if (/* 校验通过 */) {
    okFn();
  } else {
    cancelFn();
  }
});
```

### 1.11 表格/表单按钮控制

```js
var sdk = window.ebdfpageSDK.getCardSDK(); // 表单
// 或
var sdk = window.ebdfpageSDK.getListSDK(); // 表格

// 触发按钮点击
sdk.triggerTopButton('762820349675487278'); // 按钮 data-id
sdk.triggerTopButton('edit');               // 系统按钮名称

// 隐藏/显示按钮
sdk.controlBtnHidden(true, '762820349675487278');
sdk.controlBtnHidden(false, '762820349675487278');
sdk.controlBtnHidden(true); // 全部隐藏

// 禁用/启用按钮
sdk.controlBtnDisabled(true);
sdk.controlBtnDisabled(false);
```

### 1.12 打开自定义弹框

```js
var dialogProps = {
  title: '自定义弹框',
  style: { width: 300, height: 600 },
  url: '/sp/ebdfpage/list/886379180080168972',
};

var buttons = [
  { id: 'btn1', content: '保存', callfun: () => { console.log('保存'); } },
  { id: 'btn2', content: '刷新', callfun: 'ebdfListSdk.reloadTable' },
  { id: 'btn3', content: '关闭', callfun: 'base.ebdfpageSDK.closeCustomDialog' },
];

var dlg = window.ebdfpageSDK.openCustomDialog(dialogProps, buttons);
dlg.destroy(); // 关闭
ebdfpageSDK.closeCustomDialog(); // 方式2关闭

// 右侧滑出
ebdfpageSDK.slideOpenModal(dialogProps, buttons);

// 多弹框（通过 id 区分）
var dlg1 = ebdfpageSDK.openCustomDialog({ ...dialogProps, id: 'ebDialog1' });
var dlg2 = ebdfpageSDK.openCustomDialog({ ...dialogProps, id: 'ebDialog2' });
ebdfpageSDK.closeCustomDialog('ebDialog2'); // 关闭指定弹框
```

---

## 二、EB 表格视图 SDK（getListSDK）

### 2.1 获取 SDK 实例

```js
var ebdfListSdk = window.ebdfpageSDK.getListSDK();           // 当前表格
var ebdfListSdk = window.ebdfpageSDK.getListSDK(viewId);     // 指定表格
// 单表格可直接用
window.ebdfListSDK
```

### 2.2 基本信息

```js
ebdfListSdk.getViewID();        // 表格视图 ID
ebdfListSdk.getObjID();         // EB 表单 ID
ebdfListSdk.getAppID();         // 应用 ID
ebdfListSdk.getBaseFormID();    // 表单模块 ID（不常用）
ebdfListSdk.getAppObjViewID();  // { appId, objId, viewId }
ebdfListSdk.isMobileList();     // 是否移动端列表
ebdfListSdk.getUrlParams();     // URL 参数
```

### 2.3 数据获取

```js
ebdfListSdk.getListData();         // 获取当前页 JSON 数据（不含显示格式）
ebdfListSdk.getListDisplayData();  // 获取当前页展示数据（含显示格式）
ebdfListSdk.getListStore();        // 获取 tableViewStore
```

### 2.4 选中操作

```js
ebdfListSdk.getCheckedID();              // 获取选中数据 ID 数组
ebdfListSdk.getUnCheckedID();            // 获取未选中数据 ID
ebdfListSdk.clearChecked();              // 清除选中
ebdfListSdk.setAllChecked();             // 当前页全选
ebdfListSdk.setCheckedKeys(['id1','id2']); // 设置选中
ebdfListSdk.getListCheckedData();         // 获取选中数据
ebdfListSdk.getListCheckedData(false);    // 获取原始格式选中数据
```

### 2.5 列表刷新

```js
ebdfListSdk.reloadTable();
```

### 2.6 自定义渲染

```js
// 自定义数据显示
ebdfListSdk.customRenderData((fieldId, value, type, otherInfo) => {
    if (type === 'table' && fieldId === 'field_1') {
        return '自定义显示值';
    }
    return value;
});

// 自定义 HTML 渲染
ebdfListSdk.customRenderHTML((fieldId, value, type, dom, otherInfo) => {
    if (type === 'table' && fieldId === 'field_1') {
        return <div className='custom-cls'>{dom}</div>;
    }
    return dom;
});
```

**推荐方式**：通过 ecode 的 regOvProps 配合使用：

```js
weappUtils.regOvProps('weappEbdfpage', 'TList', (props) => {
    if (props.tableViewStore.viewId === '1126869989796036609') {
        ebdfListSdk.customRenderHTML(() => '自定义内容');
    }
    return props;
});
```

### 2.7 导出

```js
var apis = ebdfListSdk.getExportApi();
apis.doInitExport('excel1'); // 导出
```

### 2.8 搜索与筛选

```js
// 触发搜索（代码块中使用）
var listStore = ebdfListSdk.getListStore();
var datas = listStore.viewHeaderStore.searchAdvancedStore.getSearchValue();
listStore.onSearch(datas, 'fromSearchPanel');
listStore.viewHeaderStore.onVisibleChange(false);
listStore.filterSearch();

// 搜索参数注入
listStore.setState({
  searchParams: { ...params, "aaa": "111" }
});

// 获取筛选条件值
ebdfListSdk.getFilterSearchDatas();
ebdfListSdk.getAdQuickSearchDatas();
```

### 2.9 触发按钮

```js
ebdfListSdk.triggerButtonAction(buttonId);
```

### 2.10 获取批量弹出框数据

```js
var { batchOperationStore } = listSDK.getListStore();
var selectedRows = batchOperationStore.selectedRows.slice();
var ids = batchOperationStore.getSelectedIds;
```

---

## 三、EB 表单视图 SDK（getCardSDK）

### 3.1 获取 SDK 实例

```js
var cardSDK = window.ebdfpageSDK.getCardSDK();
var cardSDK = window.ebdfpageSDK.getCardSDK(dataId); // 指定数据
// 单表单可直接用
window.ebdFormSdk
```

### 3.2 基本信息

```js
cardSDK.getObjID();     // EB 表单 ID
cardSDK.getBaseInfo();  // 表单基本信息
/* 返回示例：
{
  objid: "833320528434774016",
  type: "0",          // 0:显示布局 1:新建布局 2:编辑布局
  dataid: "839933725816045568",
  isFlow: false,      // 是否流程表单
  requestId: "0",
  workflowId: "0"
}
*/
```

### 3.3 表单操作 API

```js
var weformApi = cardSDK.getFormApi();  // 底层表单 API（参考表单代码块文档）
var cardStore = cardSDK.getCardStore(); // CardStore 实例
```

### 3.4 保存操作

```js
// 保存
cardSDK.doCardSave(
    () => console.log('success'),
    () => console.log('fail'),
    true  // refreshCard
);
// 跳过必填校验（250801 基线起）
cardSDK.doCardSave(successFn, failFn, true, { isRequired: false });

// 暂存
cardSDK.doCardTempSave(successFn, failFn, true);
// 保存并新建
cardSDK.doCardSaveAndCreate(successFn, failFn, true);
// 保存并复制
cardSDK.doCardSaveAndCopy(successFn, failFn, true);
```

### 3.5 其他操作

```js
cardSDK.doCardEdit();          // 触发编辑
cardSDK.doCopyNew();           // 触发复制
cardSDK.doCardDelete();        // 触发删除
cardSDK.closePageBySlide();    // 关闭滑动窗口
cardSDK.reloadCard();          // 刷新卡片
cardSDK.triggerButtonAction(buttonId); // 触发按钮
```

### 3.6 权限校验

```js
cardSDK.checkRight(rightType, objId, dataId);
// rightType: '0'新建保存 '2'编辑保存 '3'删除 '6'流程编辑 '7'流程删除
```

### 3.7 保存前校验（核心！）

```js
cardSDK.checkCustomize((resolve, info) => {
    console.log(info); // 按钮和保存类型信息
    weappUtils.request({
        url: '/api/xxx',
        method: 'post',
        data: {}
    }).then((res) => {
        if (res?.flag === true) {
            resolve(true);  // 继续保存
        } else {
            resolve(false); // 阻止保存
        }
    }).catch(() => {
        resolve(false);
    });
});
```

### 3.8 设置属性

```js
// 设置快捷按钮数量
cardSDK.setProps({ quickButtonNumberLimit: 2 });

// 设置分享链接参数（2404+）
cardSDK.setExternalShareUrlProps({ subLayoutMultiId: 'xxx' });
```

---

## 四、JavaScript 动作 API

用于按钮动作、行列动作中的 JavaScript 动作设置，**无法在控制台中直接执行**。

### 4.1 确认框

```js
// 简单模式
getConfirmMessage('要提示的信息');

// 完整模式
getConfirmMessage({
    title: '标题',
    content: '弹框内容',
    okText: '确认',
    onOk: () => { /* 确定回调 */ },
    cancelText: '取消',
    onCancel: () => { /* 取消回调 */ },
});
```

### 4.2 异步放行 asyncFn（2312.02+）

```js
asyncFn((resolve, reject) => {
    weappUtils.request({
        url: '/url',
        method: 'POST',
        data: {}
    }).then((res) => {
        if (res && res.flag) {
            resolve();  // 通知执行下一个动作
        } else {
            reject();   // 中断后续动作
        }
    }).catch(() => {
        reject();
    });
});

// 配合表单保存
asyncFn((resolve, reject) => {
    var cardSDK = window.ebdfpageSDK.getCardSDK();
    cardSDK.doCardSave(
        () => resolve(),  // 成功继续
        () => reject(),   // 失败中断
        true
    );
});
```

### 4.3 中断动作 throw 'break'

低版本兼容方案，在 JavaScript 动作中抛出 `throw 'break'` 阻止后续动作执行。1.12.0 后建议用 asyncFn 替代。

### 4.4 执行 EB 的 ESB 接口

```js
weappUtils.request({
    url: '/api/ebuilder/form/esb/runEsb',
    method: 'POST',
    data: {
        dataIds: '',         // 数据 ID
        esbActionIds: '',    // EB 按钮配置的动作 ID
    },
});
```

### 4.5 执行标准 ESB 接口

```js
ebdfpageSDK.callEsbFlow("1586999223341314049", mainParams, detailParams).then(res => {
    // ...
});
// mainParams: 主表参数对象
// detailParams: 明细数组 [[明细1行数组], [明细2行数组], ...]
```

---

## 五、常用实战模式

### 模式 1：EB 表单保存前校验

```js
var cardSDK = window.ebdfpageSDK.getCardSDK();

cardSDK.checkCustomize((resolve, info) => {
    var weformApi = cardSDK.getFormApi();
    var fieldVal = weformApi.getFormFieldVal('field_date_id');

    if (!fieldVal) {
        Dialog.message({ type: 'error', content: '请填写日期', delay: 3000 });
        resolve(false);
        return;
    }

    var selectedDate = new Date(fieldVal);
    var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);

    if (selectedDate > maxDate) {
        Dialog.message({ type: 'error', content: '日期不能超过7天', delay: 3000 });
        resolve(false);
        return;
    }

    resolve(true);
});
```

### 模式 2：表格视图自定义列渲染

```js
var listSdk = window.ebdfpageSDK.getListSDK();

listSdk.customRenderHTML((fieldId, value, type, dom, otherInfo) => {
    if (type === 'table' && fieldId === 'field_status') {
        var color = value === '已完成' ? 'green' : 'red';
        return React.createElement('span', { style: { color } }, value);
    }
    return dom;
});
```

### 模式 3：表格批量操作前校验

```js
window.ebdfpageSDK.registerBeforeBatchOptSave((okFn, cancelFn, props) => {
    var listSdk = window.ebdfpageSDK.getListSDK();
    var selectedIds = listSdk.getCheckedID();

    if (selectedIds.length === 0) {
        Dialog.message({ type: 'warning', content: '请至少选择一条数据' });
        cancelFn();
        return;
    }
    okFn();
});
```
