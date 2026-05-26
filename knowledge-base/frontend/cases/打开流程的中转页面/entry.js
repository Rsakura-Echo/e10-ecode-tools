import React from 'react';
import { Route } from 'react-router-dom';
import { regOvProps, appInfo, regReactChildren } from '@weapp/utils';
import { asyncImport, jsonp } from '@weapp/ecodesdk';

const Todo = React.lazy(() => asyncImport('${appId}', 'Todo'));

const { publicUrl } = appInfo('@weapp/ecodesdk');

const pcTransferPage = (
  <Route path={`${publicUrl}/sp/custom/` + '${appId}/todo'}>
    <React.Suspense fallback= {() => { }}>
      <Todo />
    </React.Suspense>
  </Route>
);

const emTransferPage = (
  <Route path={`${publicUrl}/mobile/custom/` + '${appId}/todo'}>
    <React.Suspense fallback= {() => { }}>
      <Todo />
    </React.Suspense>
  </Route>
);

regOvProps('weappEcodesdk', 'Switch', (props) => {
  regReactChildren(props, pcTransferPage);
  regReactChildren(props, emTransferPage);
  return props;
}, 0);