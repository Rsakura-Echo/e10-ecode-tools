
import { regOvProps, regReactChildren, appInfo } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';
import { Route } from 'react-router-dom';
import React from 'react';

const { publicUrl } = appInfo('@weapp/ecodesdk');

const IndexAsync = React.lazy(() => asyncImport('${appId}', 'index'));

const IndexRoute = <Route path={`${publicUrl}/sp/custom/datadic`}>
  <React.Suspense fallback={() => {}}>
    <IndexAsync />
  </React.Suspense>
</Route>

regOvProps('weappEcodesdk', 'Switch', props => {

  regReactChildren(props, IndexRoute);
  console.info('注册数据字典类页面 => ', props);

  return props;
});
