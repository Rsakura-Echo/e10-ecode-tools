

import { regOvProps, regOvComponent } from '@weapp/utils';

import React from 'react';
import { asyncImport } from '@weapp/ecodesdk';


const AsyncCom = React.lazy(() => asyncImport('${appId}', 'index'));

regOvComponent('weappUi', 'Textarea', Com => {
  return React.forwardRef((props, ref) => {
    if (props.weId === "f56o40_9d1m87_xk40pb_86j9zh_l62wzb_6n3gm4_snhw9p_3r9w93_g28s4n_6k3ebq_oeghnb") {
      return <React.Suspense fallback={() => {}}>
        <AsyncCom {...props} ref={ref} OriginCom={Com} />
      </React.Suspense>
    } else {
      return <Com {...props} ref={ref} />
    }
  })
});