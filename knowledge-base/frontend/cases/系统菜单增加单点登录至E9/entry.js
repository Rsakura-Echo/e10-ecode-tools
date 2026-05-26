
// import { regOvProps } from '@weapp/utils';
// import { toJS, runInAction } from 'mobx';

// console.info('系统菜单增加单点登录至E9');
// regOvProps('weappLayout', 'Navigation', props => {
  
//   if (props.weId === "bgdcna") { 
//     // 在store中添加单点登录的菜单
//     console.info(props);
//     const { headerMenuStore } = props;
//     const { moreNavMenus } = headerMenuStore;
//     const arr = toJS(moreNavMenus);
//     // 判断是否已经存在E9的菜单项
//     const find = (arr || []).find(x => x.id == '-1');
//     if (find) return props;
//     if (arr.length > 0) {
//       // 添加单点登录的接口
//       arr.splice(0, 0, {
//         createTime: 1656413719000,
//         creator: -1,
//         customI18nId: "-1",
//         defaultOrderNo: 4,
//         deleteType: 0,
//         groupType: "MORE",
//         icon: "Icon-terminal",
//         id: "-1",
//         menuEnable: 1,
//         menuKey: "quick_client",
//         i18nMenuName: '进入E9',
//         menuName: "进入E9",
//         menuType: "DEFAULT_MENU",
//         openWay: 1,
//         orderNo: 1000,
//         tenantKey: "tydpoljw5d",
//         useLimit: 0,
//         windowSize: 0
//       });
//       console.info(arr);
//       // arr[0].push({ hidden: false, module: "quick_client", name: "进入E9" });
//       runInAction(() => {
//         console.info('sssss', arr);
//         props.headerMenuStore.moreNavMenus = arr;
//       });
//     }
//   }
//   return props;
// });

// regOvProps('weappLayout', 'QuickToolbar', props => {
//   console.info('====> ', props);
//   return props;
// })

import React from 'react';
import ReactDOM from 'react-dom';
import { asyncImport } from '@weapp/ecodesdk';

const menuDom = document.createElement('div');
menuDom.setAttribute("id", "sso-wrap")
document.body.appendChild(menuDom);

const SsoButton = React.lazy(() => asyncImport('${appId}', 'index.js'));


ReactDOM.render(<React.Suspense fallback={() => {}}>
  <SsoButton />
</React.Suspense>, menuDom);
