

import { regOvProps } from '@weapp/utils';
import React from 'react';
import { asyncImport } from '@weapp/ecodesdk';

const AsyncCom = React.lazy(() => asyncImport('${appId}', 'index'));


regOvProps('weappUi', 'Title', props => {

  if (props.weId === "3rdcst_oxa9w7_i8bbvp_vc1wev_kc1m3l_r1vh81_6xdqsn") {
    if (Array.isArray(props.buttons)) {
      props.buttons.push(<window.weappUi.Button
        onClick={() => {
          window.changeMsgModal(true);
        }}
      >
        展示
        <React.Suspense fallback={() => {}}>
          <AsyncCom />
        </React.Suspense>
      </window.weappUi.Button>)
    }
  }

  return props;

});
