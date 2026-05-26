


import React from 'react';





import { regOvProps, regOvComponent } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';

const CustTabBtn = React.lazy(() => asyncImport('${appId}', 'index'));

regOvProps('weappUi', 'Menu', props => {
  if (props.weId === 'f56o40_9d1m87_xk40pb_q3zd39_bryhr2_pnhv5o_4d6brw') {
    let menuData = [...props.data || [], {
		  id: 'cust', content: <React.Suspense fallback={() => {}}>
        <CustTabBtn />
      </React.Suspense>,
    }];
  	props.data = menuData;
  }
  return props;
})
