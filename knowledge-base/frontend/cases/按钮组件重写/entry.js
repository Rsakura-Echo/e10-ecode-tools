import React from 'react';
import { regOvComponent } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';

const NewButton = React.lazy(() => asyncImport('${appId}', 'NewButton'));

regOvComponent('weappUi', 'Button', (Com) => {
  return React.forwardRef((props, ref) => {
    if(props.weId !== "f56o40_9d1m87_yqqr5r_i2ubc9_cihdnd_6n3gm4_t03ihg@0_xomsa1@0") return <Com {...props} />;

    return (
      <React.Suspense fallback={() => {}}>
        <NewButton ref={ref} {...props} OriginCom={Com} />
      </React.Suspense>
    )
  });
}, 1)