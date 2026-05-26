


/**
 * 请求流程中的请假类型根据人员过滤
 */
import axios from 'axios';

const filterArr = {
  '4185033700327153289': [
    '2525033688888434950'
  ]
}

axios.interceptors.response.use((response) => {
  const { config } = response;
  const { data, url } = config;
  if (url.startsWith('/api/attend/web/common/browser/complete/vacationTypeBrowser')) {
    if (response.status === 200 && response.data?.code === 200) {
      response.data.data.data = response.data.data.data.filter(x => {
        if (Array.isArray(filterArr[window.TEAMS.currentUser.id])) {
          return !filterArr[window.TEAMS.currentUser.id].includes(x.id);
        }
        return true;
      })
    }
  }
  return response;
}, function (error) {
  console.info('接口请求出错啦', error);
});


