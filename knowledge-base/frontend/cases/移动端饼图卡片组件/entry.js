



import { asyncImport } from '@weapp/ecodesdk';
import { Route } from 'react-router-dom';
import { regOvProps, regReactChildren, appInfo } from '@weapp/utils';
import React from 'react';

const { publicUrl } = appInfo('@weapp/ecodesdk');

const PageAsync = React.lazy(() => asyncImport('${appId}', 'page'));

const PageRoute = (
  <Route path={`${publicUrl}/mobile/custom/com/pie-card`}> 
    <React.Suspense fallback={() => {}}>
      <PageAsync/>
    </React.Suspense>
  </Route>
)

regOvProps('weappEcodesdk', 'Switch', props => {
  regReactChildren(props, PageRoute);
  return props;
});




