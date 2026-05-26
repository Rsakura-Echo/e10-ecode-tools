
import axios from 'axios';


/**
 * 通过拦截修改密码接口，控制每日的修改次数
 */
axios.interceptors.request.use(config => {
  const { url } = config;
  if (url.indexOf('/api/basicserver/changePassword') < 0) return config;
  return new Promise((resolve, reject) => {
    axios({
      url: '/api/ecode/serverless/func/exec', method: 'post', data: {
        funcId: '808173001190645761', token: 'FK1K34K0023M12N152G', params: {}
      }
    }).then(res => {
      if (res.status === 200 && res.data?.code === 200) {
        // 判断次数
        if (res.status === 200 && res.data.code === 200) {
          
          if (res.data?.data?.data?.length > 0) {
            window.weappUi.Dialog.message({ content: '今天已修改过密码', type: 'error' });
            reject();
          } else {
            resolve(config);
          }
        } else {
          resolve(config)  
        }
      } else {
        resolve(config)
      }
    }).catch(err => {
      resolve(config)
    });
  });
}, err => {
  return Promise.reject();
})


/**
 * 响应
 */
axios.interceptors.response.use(response => {

  const { url } = response.config;
  if (url.indexOf('/api/basicserver/changePassword') < 0) return response;
  const { data } = response;
  if (!data.message) { // 说明修改成功
    axios({
      url: '/api/ecode/serverless/func/exec', method: 'post', data: {
        funcId: '808173129913835521', token: 'FK1K34K25NM2LKL104G', params: {}
      }
    })
  }
  return response
}, err => {
  return Promise.reject();
})
