# 02 - 项目结构与模块系统

## 文件类型

ecode 编辑器支持新建以下文件类型：
- **文件夹**：组织代码结构
- **.js 文件**：JavaScript/JSX/ES6 代码
- **.css 文件**：样式文件
- **.md 文件**：Markdown 文档

## 入口文件（entry.js）

```js
// entry.js - 入口文件，默认前置加载
// 用于前置注册，不应写大体积业务逻辑
// 不要在此文件中直接使用 @weapp/ui 组件库

import { regOvProps, regOvComponent } from '@weapp/utils';
// 在此做注册...
```

## 前置加载文件

- 右键文件 → 设置为前置加载
- .js 文件编译进 `/ecodestatic/dev/init.js`
- .css 文件合并到 `/ecodestatic/dev/init.css`
- 前置文件可以被其他文件导入
- **注意：不要在前置文件中直接使用 UI 组件库，会找不到组件报错**

## 异步加载文件

- 不设置前置加载即为异步
- 使用 `asyncImport` 按需引入

```js
import { asyncImport } from '@weapp/ecodesdk';

// 加载异步组件
const Todo = React.lazy(() => asyncImport('${appId}', 'Todo'));
```

## 模块导入导出

### 同一应用内导入
```js
// 导入前置文件（同应用）
import defaultExport, * as fileExportsJs from "./exports";
import { a, b } from "./exports";

// 导入异步文件（同应用）
import { asyncImport } from '@weapp/ecodesdk';
asyncImport('${appId}', 'component/index').then(esmodule => { 
  // ...
});
```

### 跨应用导入
```js
// 导入其他应用的前置文件
import { jsonp } from '@weapp/ecodesdk';
const { pre } = jsonp.require('目标应用AppId', 'pre.js');

// 导入其他应用的异步组件
const App2Main = React.lazy(() => asyncImport('652535876106272768', 'Main.js'));
```

## 模块化规则

1. 以 .js 文件为单位进行模块化编译
2. 使用 `export` 导出，使用 `import` 静态导入
3. 不支持 ES6 动态 `import()`，需使用 `asyncImport`
4. **不要引用入口文件**，可能找不到模块
5. **避免循环引用**
6. **不支持在 js 文件中引用其他类型文件**

## 样式处理

```js
// className 中使用模板变量
<div className={`app-$\{appId\}-myClass`}>

// CSS 文件（需设为前置加载）
// .app-${appId}-myClass {
//   color: red;
// }
```

- `className` 不能使用 `weId` 做样式限定
- `${appId}` 变量支持基线版本：10.0.2408.01

## 加载第三方 JS 库

**严禁直接加载外部在线资源！** 必须下载到本地并上传到 resources 目录下。

```js
import loadjs from 'loadjs';

loadjs('${appRes}/vue.js', {
  success: () => {
    // do something
  }
});
```
