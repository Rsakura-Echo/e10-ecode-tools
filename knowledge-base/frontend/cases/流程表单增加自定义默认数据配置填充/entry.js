

import { regOvProps } from '@weapp/utils';
import React from 'react';
import { asyncImport } from '@weapp/ecodesdk';
const FillBallAsync = React.lazy(() => asyncImport('${appId}', 'index'));
import ReactDOM from 'react-dom';


regOvProps('weappUi', 'Title', props => {

  if (props.weId === '3rdcst_oxa9w7_i8bbvp_vc1wev_kc1m3l_r1vh81_6xdqsn') {
    // 判断节点是否已经存在
    let fillBall = document.getElementById('ecode-wf-fill-ball');
    if (fillBall) return props; // 说明已经添加过了
    fillBall = document.createElement('div');
    fillBall.setAttribute('id', 'ecode-wf-fill-ball');
    document.body.appendChild(fillBall);
    ReactDOM.render(<React.Suspense fallback={() => {}}>
      <FillBallAsync />
    </React.Suspense>, fillBall);

  }

  return props;
});


