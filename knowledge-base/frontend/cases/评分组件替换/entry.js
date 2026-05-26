


import { regOvComponent } from '@weapp/utils';
import React from 'react';
import { asyncImport } from '@weapp/ecodesdk';

const AsyncCom = React.lazy(() => asyncImport('${appId}', 'index'));

regOvComponent('weappUi', 'Rate', Com => {

  return React.forwardRef((props, ref) => {
    
    if (props.weId === "3rdcst_oxa9w7_i8bbvp_vc1wev_kc1m3l_r1vh81_snhw9p_3r9w93_g28s4n_6k3ebq_sr72m5") {
      return <React.Suspense fallback={() => {}}>
        <AsyncCom {...props} ref={ref} OriginCom={Com} />
      </React.Suspense>
    }

    return <Com {...props} ref={ref} />
  });

});


