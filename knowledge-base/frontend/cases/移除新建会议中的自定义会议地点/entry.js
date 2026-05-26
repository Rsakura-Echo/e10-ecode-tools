


import axios from 'axios';



// 通过拦截初始化表单请求

axios.interceptors.response.use(response => {
  const { config, data } = response;
  const { url } = config;
  if (response.status === 200 
    && url.startsWith('/api/meeting/detail/getMeetingDetailField')
    && response.data.code === 200) {
    // 设置会议名称
    if (data?.data?.meetingFields?.layout) {
      data.data.meetingFields.layout = data.data.meetingFields.layout.map(x => {
        if (Array.isArray(x)) {
          for (let i = 0; i < x.length; i++) {
            if (x[i]?.id == 'customizeAddress') {
              x[i].hide = true;
            }
          }
        }
        return x;
      })
      response.data = data;
    }
  }
  return response;
});
