

import { asyncImport } from '@weapp/ecodesdk';
import { regOvProps, regReactChildren, appInfo } from '@weapp/utils';
import { Route } from 'react-router-dom';

const { publicUrl } = appInfo('@weapp/ecodesdk');

const PageCom = React.lazy(() => {
  return asyncImport('${appId}', 'page.js');
});



const PageComRoute = (
  <Route path={`${publicUrl}/sp/custom/com/notification`}>
    <React.Suspense fallback= {() => { }}>
      <PageCom />
    </React.Suspense>
  </Route>
);

// 注册多级动态路由
regOvProps('weappEcodesdk', 'Switch', (props) => {
  regReactChildren(props, PageComRoute);
  console.info('注册Notification通知组件 => ', props);
  return props;
}, 0);



// weappEcodesdk.asyncImport('758884759464861696', 'index').then(esm => esm.default.info({ title: '通知标题', content: '通知内容' }))