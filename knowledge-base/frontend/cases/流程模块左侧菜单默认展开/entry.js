

import React from 'react';
import { regOvProps, regOvComponent } from '@weapp/utils';

import { asyncImport } from '@weapp/ecodesdk';

const AyncCom = React.lazy(() => asyncImport('${appId}', 'index'));

regOvComponent('weappUi', 'Menu', Com => {
  return React.forwardRef((props, ref) => {
    if (props._norewrite || props.weId !== "d9sm55_5v07gi_5hmdy9_f87fud_i7fovh_42nxrx_39u13z") {
      return <Com {...props} ref={ref} />
    }
    return <React.Suspense fallback={() => {}}>
      <AyncCom Com={Com} _norewrite={true} {...props} ref={ref} />
    </React.Suspense>
  })
})


// regOvProps('weappUi', 'Menu', props => {


//   if (props.weId === "d9sm55_5v07gi_5hmdy9_f87fud_i7fovh_42nxrx_39u13z") {
//     const { data = [] } = props;
//     const etKeys = [];

//     for (let i = 0; i < data.length; i++) {
//       if (Array.isArray(data[i].children) && data[i].children.length > 0) {
//         etKeys.push(data[i].id);
//       }
//     }
//     console.info('keys => ', etKeys);
//     props.expandKeys = etKeys;
//   }
//   return props;
// });