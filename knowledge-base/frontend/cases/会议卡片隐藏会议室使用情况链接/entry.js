// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。

  if (response && response.config && (response.config.url == '/api/meeting/detail/getMeetingDetailField' ||
    response.config.url == '/api/app/meeting/detail/getMeetingDetailField')) {
    if (response.data && response.data.data &&
      response.data.data.meetingFields &&
      response.data.data.meetingFields.items) {
      const items = response.data.data.meetingFields.items
      delete items.roomUsageLink
      response.data.data.meetingFields.items = items
    }
  }
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});