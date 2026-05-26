
import axios from 'axios';

/**
 * 定义响应拦截
 * 可以给响应结果附加结果，也可以进行错误统一处理
 */
axios.interceptors.response.use((response) => {
  const { config, data } = response;
  const { url='' } = config||{};
  if(url.includes('/api/workflow/list/total/getMineListTotal') && data?.code===200){
    //执行相关操作
  }

  return response;
}, function (error) {
  console.info('接口请求出错啦', error);
  return Promise.reject(error);
});