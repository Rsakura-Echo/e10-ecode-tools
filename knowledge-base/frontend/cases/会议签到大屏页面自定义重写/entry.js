

import React from 'react';
import { regOvProps, regReactChildren, appInfo } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';
import { Route } from 'react-router-dom';
const { publicUrl } = appInfo('@weapp/ecodesdk');

const AsyncPage = React.lazy(() => asyncImport('${appId}', 'index'));

const PageRoute = <Route path={`${publicUrl}/sp/custom/meetingSign/:meetingId`}>
  <React.Suspense fallback={() => {}}>
    <AsyncPage />
  </React.Suspense>
</Route>

regOvProps('weappEcodesdk', 'Switch', props => {
  regReactChildren(props, PageRoute);
  console.info('注册会议签到大屏')
  return props;
});

