axios.interceptors.request.use((config) => {
    
  let { url, data } = config;  
      
     //拦截创建流程接口
     if(url == '/api/workflow/list/newflow/getNewFlowListData'){
       //将真实接口地址，作为参数传递给后台
       data.realUrl = url;

       //将本次调用的接口，调整为二开发布的接口
       config.url = '/api/secondev/apiProxy/getNewFlowListData';
     }
   
  return config;
});