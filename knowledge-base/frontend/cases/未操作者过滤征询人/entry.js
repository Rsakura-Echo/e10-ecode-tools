  import axios from 'axios';
  // 增加请求参数
  axios.interceptors.request.use(function (config) {
    if (config.url.indexOf('api/workflow/list/data/getUnOperator') > -1 || config.url.indexOf('api/workflow/list/data/getSingleUnOperator') > -1) {
      
      //console.log("config",config);
      config.data.excludeIsremarkType = [120,121,130,131];
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });