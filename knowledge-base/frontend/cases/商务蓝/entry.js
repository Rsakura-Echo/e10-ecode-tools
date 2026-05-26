import React from 'react';
import { regOvComponent } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';

if (window.TEAMS && window.TEAMS.theme && window.TEAMS.theme.appId === '${appId}') {
  const Main = React.lazy(() => asyncImport('${appId}', 'Main'));
  const fn = () => {
    return React.forwardRef((props, ref) => {
      return (
        <React.Suspense fallback={() => { }}>
          <Main ref={ref} {...props} />
        </React.Suspense>
      );
    });
  }
  regOvComponent('weappUi', 'MainLayout', fn, 0);
}
