# 05 - 前端接口请求与拦截

## 使用 @weapp/utils 的 request 方法

```js
import { request } from '@weapp/utils';

// GET 请求
request({
  method: 'get',
  url: '/api/secondev/demo/hello',
  params: {
    msg: 'hello'
  },
}).then(res => {
  console.log(res);
});

// POST 请求
request({
  method: 'post',
  url: '/api/secondev/demo/save',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone',
  },
}).then(res => {
  console.log(res);
});
```

## 使用 axios

```js
import axios from 'axios';

// GET 请求
axios.get('/api/secondev/demo/hello', {
  params: { msg: 'hello' }
}).then(res => {
  console.log(res.data);
});

// POST 请求
axios.post('/api/secondev/demo/save', {
  firstName: 'Fred',
  lastName: 'Flintstone'
}).then(res => {
  console.log(res.data);
});
```

## 接口前缀规范

| 前缀 | 说明 |
|------|------|
| `/api/secondev/` | 用户需登录才能访问 |
| `/sapi/secondev/` | 服务间调用接口，需通过开放平台 |
| `/papi/` | **严禁二开随意声明！** 需统一使用 /sapi |

## 请求拦截二开

支持通过 ecode 对前端 request 和 axios 请求进行拦截和准入控制（需 10.0.2509.01 基线及以上）。

相关功能文档参考官方：e-code前端接口请求和拦截说明。

## 请求示例：调用后端二开接口

```js
import axios from 'axios';

// 调用后端发布的 /api/secondev 接口
export async function fetchData(params) {
  const res = await axios.get('/api/secondev/mymodule/query', { params });
  return res.data;
}

// 提交数据
export async function saveData(data) {
  const res = await axios.post('/api/secondev/mymodule/save', data);
  return res.data;
}
```

## 服务端调用 SAPI 接口（后端）

```java
// 二开服务中调用标准 SAPI 接口
@Autowired
SecondSapiUtil secondSapiUtil;

public void callSapi() {
    String url = "/sapi/demo/geturl";
    Map<String, Object> params = new HashMap<>();
    params.put("param1", "1111");
    params.put("param2", 22222L);

    Map result = (Map) secondSapiUtil.getSapiForObj(
        url, params, MediaType.APPLICATION_JSON, Map.class
    );
}
```
