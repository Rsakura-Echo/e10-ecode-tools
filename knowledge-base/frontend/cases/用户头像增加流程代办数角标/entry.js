


import { regOvComponent } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';
import React from 'react';

const AsyncCom = React.lazy(() => asyncImport('${appId}', 'index'));

const AvatarCom = React.forwardRef((props, ref) => {
  return <React.Suspense fallback={() => {}}>
    <AsyncCom {...props} ref={ref} />
  </React.Suspense>
})

regOvComponent('weappUi', 'Avatar', Com => {

  return React.forwardRef((props, ref) => {

    if (props.weId === 'bgdcna_3k0k6d_uqw08v_y5moki') {
      return <AvatarCom {...props} ref={ref} OriginCom={Com} />
    }
    return <Com {...props} ref={ref} />

  })

})

