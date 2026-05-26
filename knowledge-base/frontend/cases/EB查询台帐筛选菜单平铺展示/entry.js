


import { regOvProps, regOvComponent } from '@weapp/utils';
import React from 'react';
import { asyncImport } from '@weapp/ecodesdk';

const AsyncCom = React.lazy(() => asyncImport('${appId}', 'index'));


regOvComponent('weappEbdfpage', 'SelectOverlay', Com => {

  return React.forwardRef((props, ref) => {

    if (props.weId === "9dqne8_opqir6_eysuc9_dx6z41_ah4987_wtr8as_1o0fwv_5260nw_xw6sa8@field_3_2npzs2") {
      return <React.Suspense fallback={() => {}}>
        <AsyncCom {...props} ref={ref} OriginCom={Com} />
      </React.Suspense>
    }

    return <Com {...props} ref={ref}/>

  });

});
