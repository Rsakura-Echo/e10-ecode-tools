## 通用接口响应拦截
---
```
/**
 * 定义响应拦截
 * 可以给响应结果附加结果，也可以进行错误统一处理
 */
axios.interceptors.response.use((response) => {
  const { config } = response;
  const { data, url } = config;
  for (const k of Object.keys(appendResponseData)) {
    if (url.startsWith(k)) { // 路径前缀匹配
      if (appendResponseData[k]) {
        console.info(response.data);
        response.data = Object.assign(response.data, appendResponseData[k]);
        console.info('添加resp data数据 => ', response.data);
      }
    }
  }
  return response;
}, function (error) {
  console.info('接口请求出错啦', error);
  return Promise.reject(error);
});