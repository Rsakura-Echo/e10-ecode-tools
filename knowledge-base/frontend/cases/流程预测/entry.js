import React from 'react';
import { Route } from 'react-router-dom';
import { regOvProps, appInfo, regReactChildren } from '@weapp/utils';
import { asyncImport, jsonp } from '@weapp/ecodesdk';

const CustomPage = React.lazy(() => asyncImport('${appId}', 'CustomPage'));

const { publicUrl } = appInfo('@weapp/ecodesdk');

const customPage = (
  <Route path={`${publicUrl}/sp/custom/` + '${appId}/customRequestStatusPage'}>
    <React.Suspense fallback= {() => { }}>
      <CustomPage />
    </React.Suspense>
  </Route>
);


regOvProps('weappEcodesdk', 'Switch', (props) => {
  regReactChildren(props, customPage);
  return props;
}, 0);