import { Dialog } from '@weapp/ui';
import { setTheme } from '@weapp/utils';
import { LayoutSDK } from '@weapp/layout';

import { CONFIG } from '../config/config';

export const loadThemeConfig = () => {
 
  // 设置自定义样式
  const asideBackgroundColor = CONFIG.asideBackgroundColor || '#2162C6';
  const asideMenuActiveBackgroundColor = CONFIG.asideMenuActiveBackgroundColor || '#003D88';
  const asideMenuHoverBackgroundColor = CONFIG.asideMenuHoverBackgroundColor || '#86B6EC';
  const customStyleCss = `
    .app-737142488378564608-aside {
      background-color: ${asideBackgroundColor} !important;
    }
    .app-737142488378564608-asidemenu .ui-menu-menu .ui-menu-list-item:hover,
    .app-737142488378564608-asidemenu .ui-menu-menu .ui-menu-list-subitem-title:hover,
    .app-737142488378564608-asidemenu .ui-menu-menu .ui-menu-list-item-active-hover {
      background-color: ${asideMenuHoverBackgroundColor} !important;
    }
    .app-737142488378564608-asidemenu .ui-menu-menu .ui-menu-list-item-active {
      background-color: ${asideMenuActiveBackgroundColor};
    }
  `;
  const customStyle = document.getElementById('app-737142488378564608-style');
  if (!customStyle) {
    const style = document.createElement('style');
    style.id = 'app-737142488378564608-style';
    style.type = 'text/css';
    style.innerHTML = customStyleCss;
    document.head.appendChild(style);
  }
  // 设置EM高度
  const emContainerDiv = document.getElementById('emContainerDiv');
  if (emContainerDiv) {
    emContainerDiv.style.top = '60px';
    emContainerDiv.style.height = 'calc(100% - 60px)';
  }
  // 设置右侧展开的弹窗顶部位置
  Dialog.dialogConfig = { top: CONFIG.dialogTop || 0, placement: 'right' };
  // 隐藏标准左侧菜单
  LayoutSDK && LayoutSDK.setAsideHidden(true);
};