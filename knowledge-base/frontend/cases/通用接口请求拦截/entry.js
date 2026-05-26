
import axios from 'axios';

const appendParams = { // key 为url的前缀匹配，按次序往下匹配，匹配到一个就停止
  '/api/esearch/search/fullsearch/searchByModule': {
    data: { // 附加的data参数
      appendData: 'ecode附加的data参数'
    },
    params: { // 附加的路径参数
      appendData: 'ecode附加的params参数'
    }
  }
}

/**
 * 定义请求拦截
 */
axios.interceptors.request.use((config) => {
  try {
    const { url, data, params } = config;
    for (const k of Object.keys(appendParams)) {
      if (url.startsWith(k)) { // 路径前缀匹配
        if (appendParams[k].data) {
          config.data = Object.assign(data, appendParams[k].data || {});
          console.info('添加data数据 => ', config.data);
        }
        if (appendParams[k].params) {
          config.params = Object.assign(params || {}, appendParams[k].params || {});
        }
        return config;
      }
    }
  } catch (e) {
    console.error('通用全局请求拦截异常 => ', e);
  }
  return config;
});
