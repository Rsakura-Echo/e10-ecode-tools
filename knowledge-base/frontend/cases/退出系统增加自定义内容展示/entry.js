


import { regHook } from '@weapp/utils';

// 注册退出登录前钩子
regHook('weappLayout', 'beforeLogout', () => {
  alert('自定义弹窗内容')
});