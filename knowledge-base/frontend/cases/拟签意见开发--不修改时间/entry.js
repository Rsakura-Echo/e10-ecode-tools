import axios from 'axios';

let {pathname} = window.location;

// if(pathname.indexOf("/flowpage/view") > -1 || pathname.indexOf("/flowpage/rightView") > -1){
  axios.interceptors.request.use(function (config) {
    if (config.url.indexOf('api/workflow/core/draftopinion/saveOrUpdateOpinion') > -1 ) {
      
      console.log("config",config);
      const id = config.data.draftOpinionContent.id;

      if(id != ''){//id不为空的时候，表示更新
        config.data.noUpdateTime = 1;
      }
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
// }