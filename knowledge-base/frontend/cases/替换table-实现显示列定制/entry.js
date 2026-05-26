
import { regOvComponent } from '@weapp/utils';
import React from 'react';
import { asyncImport } from '@weapp/ecodesdk';

const CustTableAsync = React.lazy(() => asyncImport('${appId}', 'index'));

regOvComponent('weappUi', 'Table', (Com) => {
  return React.forwardRef((props, ref) => {
    if (props.weId === 'f56o40_9d1m87_ktrfwy_su9cgs_8d2ywu_i83sct') {
      return <React.Suspense fallback={() => {}}>
        <CustTableAsync ref={ref} Com={Com} {...props} />
      </React.Suspense>
    }
    return <Com ref={ref} {...props}/>
  })
});
