

import React from 'react';
import { regOvProps, regReactChildren, appInfo } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';
import { Route } from 'react-router-dom';
const { publicUrl } = appInfo('@weapp/ecodesdk');

const AsyncPage = React.lazy(() => asyncImport('${appId}', 'index'));

const PageRoute = <Route path={`${publicUrl}/sp/custom/report-page`}>
  <React.Suspense fallback={() => {}}>
    <AsyncPage />
  </React.Suspense>
</Route>

regOvProps('weappEcodesdk', 'Switch', props => {
  regReactChildren(props, PageRoute);
  return props;
});

