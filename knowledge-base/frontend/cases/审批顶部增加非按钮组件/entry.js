


import { regOvProps } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';
import React from 'react';

const Com = React.lazy(() => asyncImport('${appId}', 'index'));

regOvProps('weappUi', 'Title', props => {
  if (props.weId === '3rdcst_oxa9w7_i8bbvp_vc1wev_kc1m3l_r1vh81_6xdqsn') {

    // 添加自定义组件
    props.buttons = [
      <React.Suspense fallback={() => {}}>
        <Com />
      </React.Suspense>,
      ...props.buttons
    ]

  }
  return props;

});
