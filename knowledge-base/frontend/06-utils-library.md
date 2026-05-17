# 06 - @weapp/utils 工具库 API 参考

## 概述

`@weapp/utils` 是 E10 平台的前端工具库，提供 **49 个工具函数**，覆盖应用信息获取、HTTP 请求、路由、事件处理、日期时间、国际化、样式主题、性能监控等。

```js
import { appInfo, request, history, eventEmitter } from '@weapp/utils';
```

## 工具速查

| 分类 | 工具 | 说明 |
|------|------|------|
| 基础工具 | `appInfo` | 应用信息 |
| 基础工具 | `classnames` | 类名处理 |
| 基础工具 | `ua` | 用户代理 |
| 基础工具 | `camelcase` | 驼峰转换 |
| 基础工具 | `copy` | 复制 |
| 基础工具 | `base64` | 加密解密 |
| 基础工具 | `qs` | 字符串处理工具 |
| 基础工具 | `classUseMemo` | 类组件缓存数据 |
| 基础工具 | `errorBoundary` | 错误边界 |
| 基础工具 | `moduleSignToModule` | 模块列表 |
| 基础工具 | `webOpenSDK` | 统一打开方法 |
| 基础工具 | `sparkMD5` | MD5加密 |
| 基础工具 | `baseConfig` | 个人配置获取 |
| 基础工具 | `softKeyboardFunc` | 软键盘弹起监听 |
| 异步请求 | `request` | 接口请求 |
| 异步请求 | `doSensitiveScan` | 敏感词校验 |
| 路由 | `history` | 全局路由工具 |
| 路由 | `shouldRouteJump` | PC移动互跳 |
| 调试 | `vconsole` | 移动端调试面板 |
| 二次开发 | `regReactChildren` | React子元素注入 |
| 二次开发 | `overwriteFn` | 函数处理 |
| 跨模块 | `corsImport` | 跨应用异步导入 |
| 跨模块 | `moduleRouter` | 跨模块调用 |
| 日期时间 | `date` | 日期时间处理 |
| 日期时间 | `dayjs` | 日期时间处理库 |
| 国际化 | `locale` | 多语言处理 |
| 数据校验 | `validator` | 字符串验证工具 |
| App对接 | `weappSDK` | SDK |
| App对接 | `convertWechatData` | 企业微信canvas转译 |
| App对接 | `needConvertWechatData` | 企业微信转译判断 |
| 样式主题 | `replaceCss` | IE替换主题 |
| 样式主题 | `setTheme` | 设置主题 |
| 样式主题 | `setTitle` | 设置页面标题 |
| 事件与基础API | `eventEmitter` | 事件处理 |
| 事件与基础API | `jsApi` | 基础工具 |
| 性能监控 | `weappMonitorInstance` | 性能监控 |
| 底层注入 | `aLink` | A链接 |
| 底层注入 | `aLinkIntercept` | A链接拦截 |
| 底层注入 | `checkWeId` | WeId校验 |
| 底层注入 | `documentTitle` | 文档标题 |
| 底层注入 | `fastclick` | 快速点击 |
| 底层注入 | `getNameFromUrl` | URL获取名称 |
| 底层注入 | `getReactPlugin` | React插件获取 |
| 底层注入 | `regReactPlugin` | React插件注册 |
| 底层注入 | `historyPlugin` | 历史插件 |
| 底层注入 | `historyUtil` | 历史工具 |
| 底层注入 | `middleware` | 中间件 |
| 底层注入 | `prefixSecondPath` | 二级路径前缀 |

## 核心工具详解

### appInfo — 应用信息


#### 简介

用于获取标准一平台 weapp 前端项目的基础信息解析，参照一平台前端开发规范及开发手册 四、应用命名规范


#### 基本使用

以组件库为例

  import { appInfo } from '@weapp/utils';

  const uiInfo = appInfo('@weapp/ui');
  console.log(uiInfo);


#### 执行结果

  {
"name": "ui",
"libraryName": "weappUi",
"publicUrlVar": "publicUrlweappUi",
"publicUrl": "",
"publicDomainVar": "publicDomainweappUi",
"publicDomain": "",
"buildFolder": "/build/ui"
  }

#### 使用场景

使用 appInfo 获取模块信息, 导出并设置应用路由前缀

  import { appInfo } from '@weapp/utils';

  export const uiAppName = appInfo('@weapp/ui').libraryName;

  const info = appInfo('@weapp/ui');
  /* 根由根路径，可能有多级路径 */
  export const root = info.publicUrl;

  /* pc端根路由, 根据应用信息设置对应路由前缀 */
  export const uiRoot = `${root}/ui`;

  /* 移动端根路由 */
  export const uiMRoot = `${root}/ui/mobile`;

  /* 移动端根 demo 路由 */
  export const uiMIframe = `${root}/ui/demo`;

#### 参数说明

appInfo(npmName: string)

参数	说明	类型
npmName	npm 包名，格式为 @weapp/应用名	string

#### 结果说明

属性	说明
name	应用名
libraryName	应用库导出全局变量名，一般为 weapp-name 通过camelcase驼峰转换后的 weappName
publicUrlVar	全局路径前缀的变量，参考一平台前端开发规范及开发手册 （三）多级路径注意事项
publicUrl	全局路径前缀计算值，比如二级路径、单独域名等，可用于拼接 build 目录下自定义的媒体文件地址等
publicDomainVar	二级域名变量
publicDomain	二级域名
buildFolder	打包和服务路径（内部已默认拼接 publicUrl、不用考虑单独处理）

### request — 接口请求

*文档暂无内容*


### history — 全局路由工具

*文档暂无内容*


### eventEmitter — 事件处理

*文档暂无内容*


### regReactChildren — React子元素注入


#### 简介

给已有 children 属性注入新的 ReactNode


#### 基本使用

默认将 props 中的 children 通过 React.Children.toArray 转成数组之后,通过 index 下标注入对应的 ReactNode 元素, 从而做到修改对应渲染内容

  import { regReactChildren } from "@weapp/utils"

regReactChildren(props: any, element: ReactNode, index = 0);

#### 参数说明

regReactChildren(props: any, element: ReactNode, index: number);

参数	说明	类型
props	组件对应 props 参数	props
element	需要注入的 ReactNode 内容	ReactNode
index	需要注入的索引下标	number

#### 内部实现

通过 React.Children.toArray 将对应子元素数组化,通过 splice 注入新元素

  import React, { ReactNode } from 'react'
  export function regReactChildren(props: any, element: ReactNode, index = 0) {
props.children = React.Children.toArray(props.children)
props.children.splice(index, 0, element)
  }

### corsImport — 跨应用异步导入


#### 简介

跨模块异步导入,导入由另一个模块导出的绑定结果

使用方法

打印 @weapp/workflow 模块导出内容

  import { corsImport } from '@weapp/utils';

corsImport('@weapp/workflow').then((weappWorkflow) => {
  console.log(weappWorkflow);
  });

#### 使用场景

当前业务模块代码中, 由于业务场景需要使用其它模块导出的工具方法或者组件信息

onClick = () => {
  const { btn, id, showSms, showPassword, onVisibleChange } = this.props;
  if (btn.id === 'message') {
corsImport(`@weapp/em`).then((em) => {
em?.openChat({
type: 1, // 打开的目标类型，1表示普通内部人员，2表示群组，3表示外部联系人
uid: id, // 人员ID，当type为1或3时使用
  });
onVisibleChange?.(false);
  });
  } else if (btn.id === 'edit') {
  //他人信息编辑sdk
weappSDK.openLink({
url: `/sp/hrm/profileInfo/${id}`,
  });
  } else if (btn.id === 'password') {
showPassword?.();
  } else if (btn.id === 'messageCenter') {
showSms?.();
  }
  };

#### 参数说明

corsImport(npmName:string)

options 属性	说明	类型	默认值
npmName	npm 包名，格式为 @weapp/应用名	string

#### 结果说明

执行结果为 Promise

  Promise 的返回结果为当前模块的默认导出


#### 内部实现

类似 ES 标准的 import 语句用于导入由另一个模块导出的绑定，还有一个类似函数的动态 import()，主要用于按需异步加载，但标准的 ES module 目前浏览器支持度低。使用 webpack 进行摇树分析也仅限于单个项目内，为了实现跨应用异步导入其他独立项目，就有了 weapp 专用的 corsImport。

参考 前端技术架构图

对于在 html 默认同步加载的应用 @weapp/vendor @weapp/utils @weapp/ui 以及项目本身，此方法不适用。

应用会先请求 appInfo('@weapp/应用名').buildFolder 生产打包目录地址下的 asset-manifest.json 获取项目生产文件信息，然后使用 loadjs  请求对应的导出库 lib.js 和 lib.css 文件，操作机制和 chunk 一样。

默认会同时请求异步应用的多语言 json 文件，不用考虑单独加载。

### baseConfig — 个人配置获取

*文档暂无内容*


### replaceCss — IE替换主题

*文档暂无内容*


### setTheme — 设置主题


#### 简介

设置对应主题样式内容


#### 基本使用

点击 demo 案例中控制台执行 icon 按钮,可以切换当前页面主题颜色, @weapp/utils 标题变成黑色

  import { setTheme } from '@weapp/utils';

setTheme(false, {
primaryColor: 'black',
  });

#### 参数说明

属性值说明:

fontSize: 'small','medium','big'. 对应的 css4 变量值为

fontSize = small --font-size-12 -> 12px, --font-size-14 -> 14px,--font-size-16 -> 16px

fontSize = medium --font-size-12 -> 14px, --font-size-14 -> 16px,--font-size-16 -> 16px

fontSize = big , --font-size-12 -> 16px, --font-size-16 -> 16px,--font-size-16 -> 16px

fontColor: 'deep','medium','light' 对应的 css4 变量值为

light --main-fc -> #666666

medium --main-fc -> #111111

deep --main-fc -> #000000

bubbleColor: --bubble-color -> bubbleColor

primaryColor: --primary -> primaryColor


#### 结果说明

通过设置 css4 变量值实现主体的替换从而达到对应页面的样式修改


#### 内部实现

通过设置 css4 变量值实现主体的替换 document.documentElement.style.setProperty('--font-size-12', '12px');

二开案例补充说明
全局设置字体大小

通过ecode 全局修改设置字体大小(仅PC端生效)

  import { setFontSize } from "@weapp/utils"
setFontSize({
small: '16',
medium: '18',
big: '20',
  })

#### 参数说明

默认情况下 对应参数对应的字体变量以及字体变量的值如下

small --font-size-12 -> 12px

medium --font-size-14 -> 14px

big --font-size-16 -> 16px

### locale — 多语言处理

*文档暂无内容*


### doSensitiveScan — 敏感词校验

*文档暂无内容*


### date — 日期时间处理

*文档暂无内容*


### dayjs — 日期时间处理库

*文档暂无内容*


### classnames — 类名处理


#### 简介

一个简单的实用工具，用于有条件地将 classNames 连接在一起


#### 基本使用

直接函数传参执行

  import { classnames } from '@weapp/utils';

  const cls1 = classnames('foo', 'bar'); // => 'foo bar'
  console.log(cls1);
  const cls2 = classnames('foo', { bar: true }); // => 'foo bar'
  console.log(cls2);
  const cls3 = classnames({ 'foo-bar': true }); // => 'foo-bar'
  console.log(cls3);
  const cls4 = classnames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'
  console.log(cls4);
  const cls5 = classnames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
  console.log(cls5);

#### 使用场景

组件可通过状态或者属性动态控制标签的类名增加删除

  import { classnames } from '@weapp/utils';
render() {
  const { prefixCls, className, style, multiple, customRender } = this.props;
  const cls = classnames(prefixCls, {
[`${prefixCls}-output-panel`]: true,
'is-multiple': multiple,
'is-single': !multiple,
  }, className);

  const content = (
  <div className={cls} style={style}></div>
);

  return content;
  }

#### 参数说明

classnames 函数接受任意数量的参数，可以是字符串或对象


#### 结果说明

classnames 函数执行结果为对 应的连接结果的字符串

### qs — 字符串处理工具


#### 简介

一个将数据字符串解析和字符串化工具


#### 基本使用

字符串解析

  import { qs } from '@weapp/utils';

  // 基本使用
  const parseStr = qs.parse('name=xpy&age=18&sex=female');
  console.log(parseStr); // {name: 'xpy', age: '18', sex: 'female'}

  // 忽略问号
  const parseStr1 = qs.parse('?a=b&c=d', { ignoreQueryPrefix: true });
  console.log(parseStr1); // {a: 'b', c: 'd'}

对象字符串化

  import { qs } from '@weapp/utils';

  const str = qs.stringify({ name: 'xpy', age: '18', sex: 'female' });
  console.log(str); // name=xpy&age=18&sex=female

#### 使用场景

处理上传数据为对象时，字符串化

  import { qs } from '@weapp/utils';
  const handle = () => {
  const url = `/api/file/chunkUpCheck`;
  const options = qs.stringify({
module: 'weapp',
size: 1025,
fileName: '文件信息',
  }); // module=weapp&size=1025&fileName=%E6%96%87%E4%BB%B6%E4%BF%A1%E6%81%AF
  const handleUrl = `${url}?${options}`; //  /api/file/chunkUpCheck?module=weapp&size=1025&fileName=%E6%96%87%E4%BB%B6%E4%BF%A1%E6%81%AF
  return handleUrl;
  };

获取地址栏参数转对象信息

  import { qs } from '@weapp/utils';
  const search = window?.location?.search;
  const paramStr = qs.parse(search, { ignoreQueryPrefix: true });

#### 参数说明

qs.parse(str:string, options?:object);

参数	说明	类型
str	需要解析的字符串	string
options	其它配置详见 qs 	object

qs.stringify(object:object, options?:object);

参数	说明	类型
object	需要字符串化的对象	object
options	其它配置详见 qs 	object

#### 结果说明

qs.parse 字符串解析 解析返回一个对象信息, 以 key,value 形式直观取值.

qs.stringify 可以将对象字符串化.

### base64 — 加密解密

*文档暂无内容*


### validator — 字符串验证工具

*文档暂无内容*


### overwriteFn — 函数处理


#### 简介

返回一个新函数,队列函数倒序执行执行,将当前函数的执行结果作为下一个函数的入参


#### 基本使用

overwriteFn 传递两个函数 fn1,fn2 返回一个新函数,新函数执行为 fn2 执行的返回结果作为 f1 函数执行的参数。

  import { overwriteFn } from '@weapp/utils';
/**
  * @param oldFn  Function
  * @param newFn  Function
  * @returns  Function
*/
  const fn1 = (num) => {
  return num * 2;
  };
  const fn2 = (num) => {
  return num + 1;
  };

  const fn3 = overwriteFn(fn1, fn2);
  const fn4 = overwriteFn(fn2, fn1);
  console.log(fn3(2)); // 先执行fn2,并且将f2的执行结果传递给fn1的参数 (2+1) * 2 = 6
  console.log(fn4(2)); // 先执行fn1,并且将f2的执行结果传递给fn2的参数 (2*2) +1 = 5

#### 参数说明

overwriteFn(oldFn: Function, newFn: Function) => Function

参数	说明	类型
oldFn	后执行的函数	Function
newFn	先执行的函数	Function

#### 结果说明

执行结果返回一个新函数

新函数的特征为, 入参的两个函数, 第二个参数函数执行结果作为第一个参数函数的入参进行执行


#### 内部实现

通过函数嵌套, 将返回值作为下个执行函数的入参

  export default function overwriteFn(oldFn: Function, newFn: Function) {
  if (!newFn || !oldFn) return newFn || oldFn;

  return (argv: any) => {
  return oldFn(newFn(argv));
  };
  }

### moduleRouter — 跨模块调用

*文档暂无内容*


### errorBoundary — 错误边界

*文档暂无内容*


### webOpenSDK — 统一打开方法

*文档暂无内容*


### jsApi — 基础工具

*文档暂无内容*


### weappMonitorInstance — 性能监控

*文档暂无内容*


### vconsole — 移动端调试面板


#### 简介

一个轻量、可拓展、针对手机网页的前端开发者调试面板


#### 基本使用

1、【推荐】默认当前 URL 地址 search 参数包含 wea_link_keep_vconsole 就会开启调试面板方便调试

/ui/mobile/button/demo-0?wea_link_keep_vconsole=true

2、通过代码激活,点击下方执行按钮，即可激活。通过 destroy 方法销毁实例

  import { vconsole } from '@weapp/utils';
vconsole().then((m) => {
  const vConsole = new m.default();
vConsole.show();
  });

#### 使用场景

移动端在调试程序的时候,需要打印对应信息时。可以通过 vconsole 按钮激活显示对应控制台,输出对应信息

创建实例

  import { vconsole } from '@weapp/utils';
  let vConsole = null;
vconsole().then((m) => {
vConsole = new m.default();
  });

创建实例后，一段时间销毁

  import { vconsole } from '@weapp/utils';
  let vConsole = null;
vconsole().then((m) => {
vConsole = new m.default();
setTimeout(() => {
if(window.__vConsole){
  window.__vConsole.destroy();
  }
vConsole.destroy();
  }, 5000);
  });

主题设置,可选参数 light,dark

  import { vconsole } from '@weapp/utils';
vconsole().then((m) => new m.default({ theme: 'light' }));

#### 参数说明

vconsole().then((m) => new m.default()); 创建对应 vConsole 实例 其中创建实例中的参数

设置主题vconsole().then((m) => new m.default({ theme: 'dark' }))

销毁实例vConsole.destroy();


#### 内部实现

基于 vconsole

  export default function vconsole() {
  return import(
  /* webpackChunkName: "vconsole" */
'vconsole'
);
  }

## 其他工具简要说明

### 基础工具

**`ua`** — 用户代理

对 navigator.userAgent 信息进行统一分类解析，以方便进行客户端判断

**`camelcase`** — 驼峰转换

处理字符串转换成驼峰格式工具方法

**`copy`** — 复制

将内容从浏览器复制到剪贴板

**`classUseMemo`** — 类组件缓存数据

**`moduleSignToModule`** — 模块列表

工具库内部维护的一个模块信息对象

**`sparkMD5`** — MD5加密

**`softKeyboardFunc`** — 软键盘弹起监听

监听移动端软键盘弹起的全局事件，用于处理软键盘遮挡相关问题


### 路由

**`shouldRouteJump`** — PC移动互跳


### App对接

**`weappSDK`** — SDK

**`convertWechatData`** — 企业微信canvas转译

**`needConvertWechatData`** — 企业微信转译判断

判断是否需要企业微信转译, 返回 boolean


### 样式主题

**`setTitle`** — 设置页面标题

在需要设置 title 的地方调用 setTitle 方法，修改当前页面的标题。


### 底层注入

**`aLink`** — A链接

**`aLinkIntercept`** — A链接拦截

**`checkWeId`** — WeId校验

#### 基本使用

直接导入 checkWeId 方法进行校验

  import { checkWeId } from '@weapp/utils';
checkWeId(dom);

**`documentTitle`** — 文档标题

**`fastclick`** — 快速点击

**`getNameFromUrl`** — URL获取名称

**`getReactPlugin`** — React插件获取

**`regReactPlugin`** — React插件注册

**`historyPlugin`** — 历史插件

**`historyUtil`** — 历史工具

**`middleware`** — 中间件

**`prefixSecondPath`** — 二级路径前缀

