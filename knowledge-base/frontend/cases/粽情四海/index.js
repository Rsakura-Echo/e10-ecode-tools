import { Dialog } from '@weapp/ui';
import { setTheme } from '@weapp/utils';
import { LayoutSDK } from '@weapp/layout';

import { CONFIG } from '../config/config';

export const loadThemeConfig = () => {
 
  // 设置自定义样式
  const headerBackgroundColor = CONFIG.headerBackgroundColor || '#82AA24';
  const headerBackgroundImage = CONFIG.headerBackgroundImage;
  const mainBackgroundColor = CONFIG.mainBackgroundColor || '#f6f6f6';
  const mainBackgroundImage = CONFIG.mainBackgroundImage;
  const customStyleCss = `
    .app-729087887109857281-header {
      background-color: ${headerBackgroundColor};
      ${headerBackgroundImage && `
      background-image: url('${headerBackgroundImage}'); 
      background-repeat: no-repeat; 
      background-size: 100% 100%;`} 
    }
    .app-729087887109857281-main {
      background-color: ${mainBackgroundColor};
      ${mainBackgroundImage && `
      background-image: url('${mainBackgroundImage}'); 
      background-repeat: no-repeat; 
      background-size: 100% 100%;`} 
    } 
  `;
  const customStyle = document.getElementById('app-729087887109857281-style');
  if (!customStyle) {
    const style = document.createElement('style');
    style.id = 'app-729087887109857281-style';
    style.type = 'text/css';
    style.innerHTML = customStyleCss;
    document.head.appendChild(style);
  }
  // 设置EM高度
  // const emContainerDiv = document.getElementById('emContainerDiv');
  const emContainerDiv = document.querySelector('.weapp-main-em');
  if (emContainerDiv) {
    emContainerDiv.style.top = '50px';
    emContainerDiv.style.height = 'calc(100% - 50px)';
  }
  // 设置右侧展开的弹窗顶部位置
  Dialog.dialogConfig = { top: CONFIG.dialogTop || 0, placement: 'right' };
  // 隐藏标准左侧菜单
  LayoutSDK && LayoutSDK.setAsideHidden(true);
};