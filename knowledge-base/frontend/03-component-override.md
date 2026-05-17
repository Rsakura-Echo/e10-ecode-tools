# 03 - 组件参数复写与组件替换

## 组件参数复写 regOvProps

用于修改已有组件的 props 参数。

### 函数签名
```js
regOvProps(libName, componentName, overwriteFunction, order)
```

### 参数说明
| 参数 | 说明 | 类型 |
|------|------|------|
| libName | 组件的库名（通过 `appInfo('@weapp/name').libraryName` 获取） | string |
| componentName | 组件名称 | string |
| overwriteFunction | 复写 props 的回调，需返回修改后的 props | (props) => props |
| order | 优先级，链式按序调用 | number |

### 示例：修改 Button 字体颜色

```js
import { regOvProps } from '@weapp/utils';

regOvProps('weappUi', 'Button', (props) => {
  props.style = {
    ...props.style,
    color: '#f00'
  };
  return props;
}, 0);
```

### 示例：注册路由（新页面开发核心模式）

```js
import React from 'react';
import { Route } from 'react-router-dom';
import { regOvProps, appInfo, regReactChildren } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';

const Todo = React.lazy(() => asyncImport('${appId}', 'Todo'));
const Mine = React.lazy(() => asyncImport('${appId}', 'Mine'));

const { publicUrl } = appInfo('@weapp/ecodesdk');

const todo = (
  <Route path={`${publicUrl}/sp/custom/` + '${appId}/todo'}>
    <React.Suspense fallback={() => {}}>
      <Todo />
    </React.Suspense>
  </Route>
);

regOvProps('weappEcodesdk', 'Switch', (props) => {
  regReactChildren(props, todo);
  return props;
}, 0);
```

## 组件替换 regOvComponent

用于完全替换已有组件。

### 函数签名
```js
regOvComponent(libName, componentName, overwriteFunction, order)
```

### 参数说明
| 参数 | 说明 | 类型 |
|------|------|------|
| libName | 组件的库名 | string |
| componentName | 组件名称 | string |
| overwriteFunction | 替换组件的方法 | (originCom) => React.Component |
| order | 优先级 | number |

### 示例：替换 Button 组件

**entry.js:**
```js
import React from 'react';
import { regOvComponent } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';

const NewButton = React.lazy(() => asyncImport('${appId}', 'NewButton'));

regOvComponent('weappUi', 'Button', (Com) => {
  return React.forwardRef((props, ref) => {
    const { weId } = props;
    if (weId && weId.endsWith('_hvf5bo@newFlow_rrt9fb')) {
      return (
        <React.Suspense fallback={() => {}}>
          <NewButton {...props} ref={ref} OriginCom={Com} />
        </React.Suspense>
      );
    }
    return <Com {...props} ref={ref} />;
  });
}, 0);
```

**NewButton.js (函数组件方式):**
```js
const NewButton = React.forwardRef((props, ref) => {
  const { OriginCom } = props;
  return (
    <span className="app-$\{appId\}-newButton">
      <span className="app-$\{appId\}-newButton-point" />
      <OriginCom {...props} ref={ref} />
    </span>
  );
});
export default NewButton;
```

**NewButton.js (类组件方式):**
```js
export default class NewButton extends React.Component {
  render() {
    const { OriginCom, forwardedRef } = this.props;
    return (
      <span className="app-$\{appId\}-newButton">
        <span className="app-$\{appId\}-newButton-point" />
        <OriginCom {...this.props} ref={forwardedRef} />
      </span>
    );
  }
}
```

### 注意事项
- 组件替换时**必须转发 ref**（使用 `React.forwardRef`）
- 使用 `asyncImport` 异步引入组件，配合 `Suspense` 加载
- 入口文件只做注册，减小体积
- 不要在**前置加载**文件中直接使用组件库
- 需要保持原组件功能的，通过 props 传递下去

## 限定生效范围

### 1. 通过 weId 判断
```js
// weId 由父组件 weId + "_" + 子组件 weId 链式组成
// 建议使用 endsWith 匹配末端 weId
if (weId && weId.endsWith("_5v7elm")) {
  // 只对特定组件生效
}
```

### 2. 通过 URL 判断
```js
if (window.location.pathname.includes('/sp/workflow/list')) {
  // 只在特定页面生效
}
```

### 3. 通过 URL 参数判断
```js
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('hideLeftTree') === 'true') {
  // 根据参数判断
}
```

### 4. 通过组件 props 属性判断
```js
if (props.fieldId === 'xxx') {
  // 根据表单字段判断
}
```
