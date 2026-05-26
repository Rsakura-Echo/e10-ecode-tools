

import axios from 'axios';


const searchApi = '/api/esearch/search/recentquery/queryHotKeys';
const moduleSearchApi = '/api/esearch/search/fullsearch/searchByModule';
const token = 'FIL2M0K5NL342N0432G';
const funcId = '736403298671452161';

const record = (recordType, searchKey) => {
  // 请求云函数进行数据记录
  axios.post('/api/ecode/serverless/func/exec', {
    funcId, token, params: {
      type: recordType, searchKey
    }
  });
}

/**
 * 拦截全文检索接口请求，进行检索数据采集
 */
axios.interceptors.request.use(config => {
  try {

    const { url, params, data } = config;
    if (url.startsWith(searchApi)) {
      const { type = '', value = '' } = params;
      record(type, value);
    } else if (url.startsWith(moduleSearchApi)) {
      const { searchModule = '', keyword = '' } = data;
      record(searchModule, keyword);
    }
   
  } catch (e) {
    console.error('全文检索接口拦截异常 => ', e);
  }
  return config;

});
