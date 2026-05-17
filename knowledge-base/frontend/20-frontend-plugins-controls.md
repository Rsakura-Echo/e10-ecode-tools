# 20 - 前端公共插件、代码控制与调试

## 概述

本文档涵盖前端公共插件开发与复用、第三方库集成、代码生效范围控制、调试工具和监控管理。

---

## 一、公共插件（2.3.4）

### 概念

公共插件机制允许开发一些公共方法或公共组件，供其他二开项目或业务开发使用。

### 开发公共插件

按照正常模块从 `entry.js` 导出需要开发的组件或方法：

**entry.js** - 导出公共方法和组件：

```js
import React from 'react';
import { asyncImport } from '@weapp/ecodesdk';

const Circle = React.lazy(() => asyncImport('${appId}', 'RedCircle'));

function RedCircle(props) {
  return (
    <React.Suspense fallback={() => {}}>
      <Circle {...props} />
    </React.Suspense>
  );
}

// 导出组件
export { RedCircle };

// 导出公共方法 - 用于注册 Route 子组件
export function regReactChildren(props, element, index = 0) {
  if (React.Children.count(props.children) > 0) {
    React.Children.toArray(props.children);
    props.children.splice(index, 0, element);
  } else {
    props.children = [element];
  }
}
```

**RedCircle.js** - 公共组件实现：

```js
import React from 'react';

const defaultStyle = {
  backgroundColor: '#f00',
  width: 100,
  height: 100,
  borderRadius: 50,
};

export default function RedCircle(props) {
  return (
    <div style={{ ...defaultStyle, ...props.style }} />
  );
}
```

### 使用公共插件

通过 `@weapp/ecodesdk` 的 `jsonp.require` 方法引用：

```js
import { jsonp } from '@weapp/ecodesdk';

// 引入其他应用的公共插件
const { regReactChildren, RedCircle } = jsonp.require('652535876106272768', 'entry.js');
```

---

## 二、加载第三方 JS 库（2.3.5）

**注意：一般不建议自行引入其他三方资源**，标准依赖已经十分完善，尽量在标准支持范围内完成需求。

### 使用 loadjs 加载

```js
import loadjs from 'loadjs';

// 选中 resources/vue.js 右键，复制资源地址
// 严禁使用外部在线资源，包括 CDN 地址！
loadjs('/ecodestatic/test/resources/652532173878018049/vue.js', {
    success: () => {
        // do something
    }
});
```

### 安全规范

> **严禁直接加载外部在线资源**（包括 CDN 地址）。请下载在线资源到本地并上传到 `resources` 目录下引用。

---

## 三、e-code 集成 Vue（2.3.6）

ecode 支持在项目中使用 Vue 框架，详见 [e-code集成Vue说明文档](相关链接)。

基本步骤：
1. 将 Vue.js 生产文件上传到应用的 `resources` 目录
2. 通过 `loadjs` 加载 Vue
3. 在前置加载文件中初始化 Vue 实例

---

## 四、组件复写限定判断（2.3.8）

组件复写时需要通过条件判断限定生效范围，避免污染全局。提供以下几种判断方式：

### 1. 通过 weId 判断

```js
// weId 示例："1ya7y7_5xscdt_bw3fqs_5v7elm"
// 推荐使用 endsWith 进行后缀匹配
if (props.weId && props.weId.endsWith("_5v7elm")) {
    // 逻辑处理
}
```

**weId 的层级规则**：
- A 组件 (weId: `5xscdt`) > B 子组件 (weId: `5xscdt_bw3fqs`) > C 孙组件 (weId: `5xscdt_bw3fqs_5v7elm`)
- 实际页面上渲染的 weId = 父组件weId + "_" + 子组件weId

**正确姿势**：使用 `endsWith` 做后缀匹配
**错误姿势**：使用 `===` 做全量匹配（前面部分可能会变化）

### 2. 通过 URL 路径判断

```js
// 判断是否在特定页面
if (window.location.pathname.includes('/sp/workflow/list')) {
    // 逻辑处理
}

// 精确匹配
if (window.location.pathname === '/sp/workflow/list') {
    // 逻辑处理
}
```

### 3. 通过 URL 参数判断

```js
let urlParams = weappUtils.qs.parse(window.location.search, { ignoreQueryPrefix: true });

if (window.location.pathname.includes('/sp/workflow/list') && urlParams.hideLeftTree === 'true') {
    // 逻辑处理
}
```

### 4. 通过组件 props 属性判断

```js
// 通过组件 id
if (props.id === 'xxx') {
    // 逻辑处理
}

// 通过表单字段 fieldId
if (props.fieldId === 'xxx') {
    // 逻辑处理
}
```

### 5. 在 EB 页面或流程页面中

可根据对应模块提供的 SDK 获取相关参数判断，具体根据业务模块的 SDK 使用。

---

## 五、控制代码块的生效范围（2.6）

> **注意**：生效范围仅对**租户应用**生效，对公共应用不生效。

### 5.1 指定人员或角色（2.6.1）

在代码块上配置生效范围：
- **按人员**：指定具体人员生效
- **按角色**：指定角色下的所有人员生效

在编辑器中通过代码块属性面板配置。

### 5.2 区分 PC 和移动（2.6.2）

- **PC**：仅在 PC 端生效（Pad 按 PC 处理）
- **Mobile**：仅在移动端生效

通过代码块属性面板选择目标平台。

### 5.3 公共应用和租户应用（2.6.3）

| 类型 | 生效范围 | 说明 |
|------|---------|------|
| **公共应用** | 所有租户 | 对所有租户都生效 |
| **租户应用** | 当前租户 | 只对当前租户生效 |
| **指定租户** | 特定租户 | 可选择指定租户生效 |

---

## 六、如何调试（2.7）

### 6.1 PC 端调试（2.7.1）

1. 打开浏览器开发者工具（F12）
2. 安装 React Developer Tools 插件
3. 在 **Components** 页签中查看组件树
4. 使用左上角小箭头从页面上选取内容，查看组件 props
5. 在 **Console** 页签查看日志输出

**查找可开发组件**：组件库 `@weapp/ui` 中的基础组件、或调试工具中组件名以 `weapp` 开头、格式为 `[库名]` 的组件，基本都支持通过 `@weapp/utils` 注册复写工具处理。

### 6.2 移动端调试（2.7.2）

使用 **vConsole** 移动端调试面板，在移动端页面上提供类似 PC 开发者工具的控制台功能。

---

## 七、前端二开监控管理平台（2.8）

主团队管理员访问：`/ecode/monitor/react/applist`

功能：
- 查看所有二开前端应用的运行状态
- 监控应用加载性能
- 查看应用错误日志

---

## 八、代码屏蔽调试（2.9）

当需要排查某个二开代码块是否导致页面异常时，可以通过**代码屏蔽**功能快速禁用特定代码块：

- 在编辑器中右键代码块，选择"屏蔽"
- 或通过授权码调试模式控制代码块启用/禁用
- 屏蔽后重新发布即可生效

参考：[e-code 二开代码屏蔽调试说明文档](相关链接)

---

## 快速参考

| 功能 | 关键方法/地址 | 说明 |
|------|-------------|------|
| 公共插件开发 | `export { ... }` from entry.js | 导出方法和组件 |
| 公共插件引用 | `jsonp.require(appId, file)` | 跨应用引用 |
| 第三方JS | `loadjs(resPath, callback)` | 仅限 resources 本地文件 |
| weId 判断 | `props.weId.endsWith('_xxx')` | 后缀匹配，不用全量匹配 |
| URL 判断 | `window.location.pathname` | 页面路径匹配 |
| PC 调试 | React Developer Tools | Components 页签 |
| 移动调试 | vConsole | 移动端控制台 |
| 监控平台 | `/ecode/monitor/react/applist` | 前端应用监控 |
| 代码屏蔽 | 编辑器右键 → 屏蔽 | 快速排查异常 |
