


import { regHook } from '@weapp/utils';


// 注册退出登录前钩子
regHook('weappLayout', 'beforeLogout', () => {
  localStorage.clear();
  console.info('退出登录前的钩子动作');
})