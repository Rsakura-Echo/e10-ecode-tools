# 04 - 新页面开发与路由注册

## 核心路由

- PC端：`/sp/custom/${appId}/your-path`
- 移动端：`/mobile/custom/${appId}/your-path`

## 新页面开发完整模式

新页面开发的核心是通过 `regOvProps` 复写 `weappEcodesdk` 库的 `Switch` 组件，向其注册 `Route`。

### 函数签名
```js
regOvProps('weappEcodesdk', 'Switch', overwriteFunction, order)
```

### 完整示例

**entry.js - 路由注册:**
```js
import React from 'react';
import { Route } from 'react-router-dom';
import { regOvProps, appInfo, regReactChildren } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';

const Todo = React.lazy(() => asyncImport('${appId}', 'Todo'));
const Mine = React.lazy(() => asyncImport('${appId}', 'Mine'));

const { publicUrl } = appInfo('@weapp/ecodesdk');

const todoRoute = (
  <Route path={`${publicUrl}/sp/custom/` + '${appId}/todo'}>
    <React.Suspense fallback={() => {}}>
      <Todo />
    </React.Suspense>
  </Route>
);

const mineRoute = (
  <Route path={`${publicUrl}/sp/custom/` + '${appId}/mine'}>
    <React.Suspense fallback={() => {}}>
      <Mine />
    </React.Suspense>
  </Route>
);

regOvProps('weappEcodesdk', 'Switch', (props) => {
  regReactChildren(props, todoRoute);
  regReactChildren(props, mineRoute);
  return props;
}, 0);
```

**Todo.js - 页面组件:**
```js
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { appInfo } from '@weapp/utils';

const { publicUrl } = appInfo('@weapp/ecodesdk');

class Todo extends React.Component {
  render() {
    return (
      <>
        <h1>Todo 页面</h1>
        <Link to={`${publicUrl}/sp/custom/` + '${appId}/mine'}>
          跳转到 Mine
        </Link>
      </>
    );
  }
}

export default withRouter(Todo);
```

**Mine.js - 页面组件:**
```js
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { appInfo } from '@weapp/utils';

const { publicUrl } = appInfo('@weapp/ecodesdk');

class Mine extends React.Component {
  render() {
    return (
      <>
        <h1>Mine 页面</h1>
        <Link to={`${publicUrl}/sp/custom/` + '${appId}/todo'}>
          跳转到 Todo
        </Link>
      </>
    );
  }
}

export default withRouter(Mine);
```

## regReactChildren 工具函数

用于向 Switch 的 children 中插入 Route 元素。

```js
import React from 'react';

export function regReactChildren(props, element, index = 0) {
  if (React.Children.count(props.children) > 0) {
    React.Children.toArray(props.children);
    props.children.splice(index, 0, element);
  } else {
    props.children = [element];
  }
}
```

## 页面跳转

```js
import { Link, withRouter } from 'react-router-dom';
import { appInfo } from '@weapp/utils';

const { publicUrl } = appInfo('@weapp/ecodesdk');

// Link 跳转
<Link to={`${publicUrl}/sp/custom/` + '${appId}/target-path'}>
  跳转
</Link>

// 编程式跳转
this.props.history.push(`${publicUrl}/sp/custom/${appId}/target-path`);
```

## 移动端新页面

移动端使用 `/mobile/custom` 前缀，其他模式与 PC 端一致：

```js
const mobileRoute = (
  <Route path={`${publicUrl}/mobile/custom/` + '${appId}/myPage'}>
    <React.Suspense fallback={() => {}}>
      <MyPage />
    </React.Suspense>
  </Route>
);
```
