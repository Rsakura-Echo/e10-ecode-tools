



import { regOvComponent } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';
import React from 'react';

const AsyncCom = React.lazy(() => asyncImport('${appId}', 'index'));

const CustCom = React.forwardRef((props, ref) => {
  return <React.Suspense fallback={() => {}}>
    <AsyncCom {...props} ref={ref}/>
  </React.Suspense>
})

regOvComponent('weappUi', 'DatePicker', Com => {
  return React.forwardRef((props, ref) => {
    return <CustCom {...props} ref={ref} OriginCom={Com} />
  })
});
